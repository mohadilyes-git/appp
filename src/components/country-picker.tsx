import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { COUNTRIES, flagOf, type Country } from '@/lib/countries';

type Props = {
  visible: boolean;
  selected: Country;
  onSelect: (c: Country) => void;
  onClose: () => void;
};

export default function CountryPicker({ visible, selected, onSelect, onClose }: Props) {
  const [search, setSearch] = useState('');

  const q = search.trim().toLowerCase();
  const filtered = q
    ? COUNTRIES.filter((c) => c.name.toLowerCase().includes(q) || c.dial.includes(q))
    : COUNTRIES;

  function pick(c: Country) {
    onSelect(c);
    setSearch('');
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.backdrop}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Pressable style={styles.dismiss} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>Country code</Text>
          <TextInput
            style={styles.search}
            placeholder="Search country or code"
            placeholderTextColor="rgba(255,255,255,.34)"
            value={search}
            onChangeText={setSearch}
            autoCorrect={false}
          />
          <FlatList
            data={filtered}
            keyExtractor={(c) => c.iso}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  styles.row,
                  item.iso === selected.iso && styles.rowSelected,
                  pressed && { backgroundColor: 'rgba(255,255,255,.08)' },
                ]}
                onPress={() => pick(item)}>
                <Text style={styles.flag}>{flagOf(item.iso)}</Text>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.dial}>{item.dial}</Text>
              </Pressable>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,.55)' },
  dismiss: { flex: 1 },
  sheet: {
    maxHeight: '72%',
    minHeight: 260,
    backgroundColor: '#131519',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,.14)',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,.2)',
    marginTop: 10,
  },
  title: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  search: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,.14)',
    backgroundColor: 'rgba(255,255,255,.06)',
    paddingHorizontal: 14,
    fontFamily: 'Manrope_400Regular',
    fontSize: 14.5,
    color: '#fff',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  rowSelected: { backgroundColor: 'rgba(74,134,255,.12)' },
  flag: { fontSize: 20 },
  name: { flex: 1, fontFamily: 'Manrope_600SemiBold', fontSize: 14.5, color: '#fff' },
  dial: { fontFamily: 'Manrope_700Bold', fontSize: 14.5, color: 'rgba(255,255,255,.6)' },
});
