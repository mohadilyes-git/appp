import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { listSearches, setSearchActive, type Search } from './searches-db';

export function useSearches() {
  const [searches, setSearches] = useState<Search[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    listSearches()
      .then((rows) => {
        setSearches(rows);
        setError('');
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Something went wrong.'))
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(load);

  // the switch flips on screen first, the database catches up behind it
  const toggle = useCallback(
    (id: number) => {
      const target = searches.find((s) => s.id === id);
      if (!target) return;

      // flipping twice puts a row back, so the same map both applies and reverts
      const flip = (list: Search[]) =>
        list.map((s) => (s.id === id ? { ...s, active: !s.active } : s));

      setSearches(flip);
      setSearchActive(id, !target.active).catch(() => {
        setSearches(flip);
        Alert.alert('Could not update', 'Check your connection and try again.');
      });
    },
    [searches],
  );

  return { searches, loading, error, toggle };
}
