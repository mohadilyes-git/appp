import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { deleteSearches, listSearches, setSearchesActive, type Search } from './searches-db';

// what home actually renders: one card per wizard run, solo rows are a group of one
export type SearchGroup = {
  key: string;
  label: string;
  count: number;
  active: boolean;
  hits: number;
  location?: string;
  lat?: number | null;
  lng?: number | null;
  radiusKm?: number;
  platforms: string[];
  includeShipping: boolean;
  priceMax?: number;
  ids: number[];
  rows: Search[];
};

// "iPhone 13" and "iPhone 15 Pro" share a name, and that is the card's title.
// the raw keyword is the machine's word, it reads badly on screen
function sharedName(rows: Search[]) {
  const names = rows.map((r) => r.label ?? r.keyword).filter(Boolean) as string[];
  if (names.length === 0) return '';
  if (names.length === 1) return names[0];
  const words = names[0].split(' ');
  let shared = 0;
  // the whole of the shortest name can be the title: PS5 and PS5 Pro share "PS5"
  while (shared < words.length) {
    const candidate = words.slice(0, shared + 1).join(' ');
    if (!names.every((n) => n === candidate || n.startsWith(candidate + ' '))) break;
    shared += 1;
  }
  return words.slice(0, shared).join(' ');
}

function groupOf(rows: Search[]): SearchGroup {
  const first = rows[0];
  const maxes = rows.map((r) => r.priceMax).filter((n): n is number => n != null);
  return {
    key: first.groupId ?? `solo-${first.id}`,
    label: (first.groupId ? sharedName(rows) : first.label) || first.keyword,
    count: rows.length,
    // rows in a group are paused together, but tolerate a half-toggled one
    active: rows.some((r) => r.active),
    hits: rows.reduce((sum, r) => sum + r.hits, 0),
    location: first.location,
    lat: first.lat,
    lng: first.lng,
    radiusKm: first.radiusKm,
    platforms: first.platforms,
    includeShipping: first.includeShipping,
    priceMax: maxes.length > 0 ? Math.max(...maxes) : undefined,
    ids: rows.map((r) => r.id),
    rows,
  };
}

function toGroups(rows: Search[]): SearchGroup[] {
  const buckets = new Map<string, Search[]>();
  for (const row of rows) {
    const key = row.groupId ?? `solo-${row.id}`;
    const bucket = buckets.get(key);
    if (bucket) bucket.push(row);
    else buckets.set(key, [row]);
  }
  return [...buckets.values()].map(groupOf);
}

export function useSearches() {
  const [groups, setGroups] = useState<SearchGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    listSearches()
      .then((rows) => {
        setGroups(toGroups(rows));
        setError('');
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Something went wrong.'))
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(load);

  // the switch flips on screen first, the database catches up behind it
  const toggle = useCallback(
    (key: string) => {
      const target = groups.find((g) => g.key === key);
      if (!target) return;

      // flipping twice puts a group back, so the same map both applies and reverts
      const flip = (list: SearchGroup[]) =>
        list.map((g) => (g.key === key ? { ...g, active: !g.active } : g));

      setGroups(flip);
      setSearchesActive(target.ids, !target.active).catch(() => {
        setGroups(flip);
        Alert.alert('Could not update', 'Check your connection and try again.');
      });
    },
    [groups],
  );

  // the delete hits the database first: a card that vanishes and comes back
  // is worse than waiting a beat for it to go
  const remove = useCallback(async (key: string) => {
    const target = groups.find((g) => g.key === key);
    if (!target) return;
    await deleteSearches(target.ids);
    setGroups((list) => list.filter((g) => g.key !== key));
  }, [groups]);


  return { groups, loading, error, toggle, remove };
}
