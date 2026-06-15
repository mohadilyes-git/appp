import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import { getItem, listItems, signPhotos } from './inventory-db';
import type { InventoryItem } from './inventory';

function messageOf(error: unknown) {
  return error instanceof Error ? error.message : 'Something went wrong.';
}

type ListState = {
  items: InventoryItem[];
  covers: Record<string, string>;
  loading: boolean;
  error: string;
  reload: () => void;
};

// the whole inventory, re-read whenever the screen comes back into view
export function useInventory(): ListState {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [covers, setCovers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    listItems()
      .then(async (rows) => {
        setItems(rows);
        setError('');
        // one signing call for every cover rather than one per row
        const first = rows.map((r) => r.photos[0]).filter(Boolean);
        setCovers(await signPhotos(first));
      })
      .catch((e) => setError(messageOf(e)))
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(load);

  return { items, covers, loading, error, reload: load };
}

type ItemState = {
  item: InventoryItem | null;
  photoUrls: string[];
  loading: boolean;
  error: string;
  reload: () => void;
};

export function useItem(id: string): ItemState {
  const [item, setItem] = useState<InventoryItem | null>(null);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    if (!id) return;
    getItem(id)
      .then(async (found) => {
        setItem(found);
        setError('');
        if (found) {
          const signed = await signPhotos(found.photos);
          setPhotoUrls(found.photos.map((p) => signed[p]).filter(Boolean));
        }
      })
      .catch((e) => setError(messageOf(e)))
      .finally(() => setLoading(false));
  }, [id]);

  useFocusEffect(load);

  return { item, photoUrls, loading, error, reload: load };
}
