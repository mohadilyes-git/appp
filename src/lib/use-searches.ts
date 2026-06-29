import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { listSearches, setSearchesActive, type Search } from './searches-db';

// what home actually renders: one card per wizard run, solo rows are a group of one
export type SearchGroup = {
  key: string;
  label: string;
  count: number;
  active: boolean;
  hits: number;
  location?: string;
  radiusKm?: number;
  includeShipping: boolean;
  priceMax?: number;
  ids: number[];
};

function groupOf(rows: Search[]): SearchGroup {
  const first = rows[0];
  const maxes = rows.map((r) => r.priceMax).filter((n): n is number => n != null);
  return {
    key: first.groupId ?? `solo-${first.id}`,
    label: first.groupId ? first.keyword : (first.label ?? first.keyword),
    count: rows.length,
    // rows in a group are paused together, but tolerate a half-toggled one
    active: rows.some((r) => r.active),
    hits: rows.reduce((sum, r) => sum + r.hits, 0),
    location: first.location,
    radiusKm: first.radiusKm,
    includeShipping: first.includeShipping,
    priceMax: maxes.length > 0 ? Math.max(...maxes) : undefined,
    ids: rows.map((r) => r.id),
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

  return { groups, loading, error, toggle };
}
