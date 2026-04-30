import { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { supabase } from '@/lib/supabase';

type Search = {
  id: number;
  keyword: string;
  location: string | null;
  price_min: number | null;
  price_max: number | null;
};

export default function SearchesScreen() {
  const [searches, setSearches] = useState<Search[]>([]);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from('searches')
      .select('id, keyword, location, price_min, price_max')
      .order('created_at', { ascending: false });
    if (error) Alert.alert('Could not load searches', error.message);
    else setSearches(data ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function addSearch() {
    if (!keyword.trim()) {
      Alert.alert('Keyword required', 'Type what you want to watch for (e.g. iphone).');
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from('searches')
      .insert({ keyword: keyword.trim(), location: location.trim() || null });
    setLoading(false);
    if (error) Alert.alert('Could not add search', error.message);
    else {
      setKeyword('');
      setLocation('');
      load();
    }
  }

  async function deleteSearch(id: number) {
    const { error } = await supabase.from('searches').delete().eq('id', id);
    if (error) Alert.alert('Could not delete', error.message);
    else load();
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>My searches</Text>
        <Pressable onPress={() => supabase.auth.signOut()} hitSlop={10}>
          <Text style={styles.logout}>Log out</Text>
        </Pressable>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Keyword (e.g. iphone)"
          placeholderTextColor="#999"
          autoCapitalize="none"
          value={keyword}
          onChangeText={setKeyword}
        />
        <TextInput
          style={styles.input}
          placeholder="Location (optional, e.g. London)"
          placeholderTextColor="#999"
          value={location}
          onChangeText={setLocation}
        />
        <Pressable style={styles.addBtn} onPress={addSearch} disabled={loading}>
          <Text style={styles.addBtnText}>{loading ? 'Adding…' : 'Add search'}</Text>
        </Pressable>
      </View>

      <FlatList
        data={searches}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No searches yet. Add one above.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardKeyword}>{item.keyword}</Text>
              {item.location ? <Text style={styles.cardMeta}>{item.location}</Text> : null}
            </View>
            <Pressable onPress={() => deleteSearch(item.id)} hitSlop={10}>
              <Text style={styles.delete}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  title: { fontSize: 26, fontWeight: '700', color: '#111' },
  logout: { color: '#5B4AE0', fontSize: 15, fontWeight: '600' },
  form: { padding: 16, gap: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 13,
    fontSize: 16,
    color: '#111',
  },
  addBtn: { backgroundColor: '#5B4AE0', padding: 14, borderRadius: 10, alignItems: 'center' },
  addBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  list: { padding: 16, gap: 10 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f8',
    borderRadius: 12,
    padding: 16,
  },
  cardKeyword: { fontSize: 17, fontWeight: '600', color: '#111' },
  cardMeta: { fontSize: 14, color: '#666', marginTop: 2 },
  delete: { color: '#c0392b', fontSize: 14, fontWeight: '600' },
  empty: { textAlign: 'center', color: '#999', marginTop: 40, fontSize: 15 },
});
