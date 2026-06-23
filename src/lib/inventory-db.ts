import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

import { supabase } from './supabase';
import type { InventoryItem, ItemStatus } from './inventory';

const BUCKET = 'item-photos';
const SIGNED_URL_SECONDS = 60 * 60;
// plenty for a full-screen photo, a fraction of what the camera produces
const UPLOAD_WIDTH = 1600;

// what the table actually stores, before it's turned into an InventoryItem
type Row = {
  id: string;
  name: string;
  paid: string | number;
  target: string | number;
  sold_for: string | number | null;
  status: ItemStatus;
  bought_from: string | null;
  notes: string | null;
  photos: string[] | null;
  bought_at: string;
  listed_at: string | null;
  sold_at: string | null;
};

const COLUMNS =
  'id, name, paid, target, sold_for, status, bought_from, notes, photos, bought_at, listed_at, sold_at';

// numeric comes back as a string so the decimals survive the trip
function toItem(row: Row): InventoryItem {
  return {
    id: row.id,
    name: row.name,
    paid: Number(row.paid),
    target: Number(row.target),
    soldFor: row.sold_for == null ? undefined : Number(row.sold_for),
    status: row.status,
    boughtFrom: row.bought_from ?? '',
    notes: row.notes ?? undefined,
    photos: row.photos ?? [],
    boughtAt: new Date(row.bought_at),
    listedAt: row.listed_at ? new Date(row.listed_at) : undefined,
    soldAt: row.sold_at ? new Date(row.sold_at) : undefined,
  };
}

export async function listItems() {
  const { data, error } = await supabase
    .from('inventory_items')
    .select(COLUMNS)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data as Row[]).map(toItem);
}

export async function getItem(id: string) {
  const { data, error } = await supabase
    .from('inventory_items')
    .select(COLUMNS)
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data ? toItem(data as Row) : null;
}

export type NewItem = {
  name: string;
  paid: number;
  target: number;
  status: ItemStatus;
  boughtFrom: string;
  notes?: string;
  boughtAt: Date;
};

export async function createItem(input: NewItem) {
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth.user?.id;
  if (!userId) throw new Error('You need to be signed in to save an item.');

  const { data, error } = await supabase
    .from('inventory_items')
    .insert({
      user_id: userId,
      name: input.name,
      paid: input.paid,
      target: input.target,
      status: input.status,
      bought_from: input.boughtFrom,
      notes: input.notes || null,
      bought_at: input.boughtAt.toISOString(),
      // saving straight to listed or sold still needs those dates filled in
      listed_at: input.status === 'inhand' ? null : new Date().toISOString(),
      sold_at: input.status === 'sold' ? new Date().toISOString() : null,
    })
    .select(COLUMNS)
    .single();

  if (error) throw error;
  return toItem(data as Row);
}

export async function updateItem(id: string, patch: NewItem) {
  const current = await getItem(id);
  if (!current) throw new Error('That item is no longer here.');

  const now = new Date().toISOString();
  const { error } = await supabase
    .from('inventory_items')
    .update({
      name: patch.name,
      paid: patch.paid,
      target: patch.target,
      status: patch.status,
      bought_from: patch.boughtFrom,
      notes: patch.notes || null,
      bought_at: patch.boughtAt.toISOString(),
      // moving forward keeps the original dates, moving back clears them
      listed_at:
        patch.status === 'inhand' ? null : (current.listedAt?.toISOString() ?? now),
      sold_at: patch.status === 'sold' ? (current.soldAt?.toISOString() ?? now) : null,
      sold_for: patch.status === 'sold' ? (current.soldFor ?? null) : null,
    })
    .eq('id', id);
  if (error) throw error;
}

export async function removePhotos(paths: string[]) {
  if (paths.length === 0) return;
  await supabase.storage.from(BUCKET).remove(paths);
}

export async function markListed(id: string) {
  const { error } = await supabase
    .from('inventory_items')
    .update({ status: 'listed', listed_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function markSold(id: string, soldFor: number) {
  const { error } = await supabase
    .from('inventory_items')
    .update({ status: 'sold', sold_at: new Date().toISOString(), sold_for: soldFor })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteItem(id: string, photos: string[]) {
  // the row goes either way, a leftover photo is tidier than a blocked delete
  if (photos.length > 0) await supabase.storage.from(BUCKET).remove(photos);
  const { error } = await supabase.from('inventory_items').delete().eq('id', id);
  if (error) throw error;
}

// the path's first folder is the user id, which is what the storage policy checks
export async function uploadPhoto(itemId: string, uri: string, index: number) {
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth.user?.id;
  if (!userId) throw new Error('You need to be signed in to upload photos.');

  // shrink before it leaves the phone, a camera shot is megabytes for no reason
  const shrunk = await manipulateAsync(uri, [{ resize: { width: UPLOAD_WIDTH } }], {
    compress: 0.7,
    format: SaveFormat.JPEG,
  });

  const bytes = await (await fetch(shrunk.uri)).arrayBuffer();
  const path = `${userId}/${itemId}/${Date.now()}-${index}.jpg`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, bytes, { contentType: 'image/jpeg', upsert: false });
  if (error) throw error;

  return path;
}

export async function attachPhotos(itemId: string, paths: string[]) {
  const { error } = await supabase
    .from('inventory_items')
    .update({ photos: paths })
    .eq('id', itemId);
  if (error) throw error;
}

// a private bucket has no public urls, so every path needs signing before it renders
export async function signPhotos(paths: string[]) {
  const map: Record<string, string> = {};
  if (paths.length === 0) return map;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrls(paths, SIGNED_URL_SECONDS);
  if (error) return map;

  for (const entry of data ?? []) {
    if (entry.path && entry.signedUrl) map[entry.path] = entry.signedUrl;
  }
  return map;
}
