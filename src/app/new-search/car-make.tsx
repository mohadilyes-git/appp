import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppBackground from '@/components/app-background';
import { WizardBar, WizardHeader } from '@/components/wizard-chrome';
import { CheckIcon, SearchIcon } from '@/components/wizard-icons';
import { CAR_MAKES } from '@/lib/catalogue';
import { font, radius } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';
import { useWizard } from '@/lib/wizard-context';

export default function CarMakeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const { colors, shadows } = useTheme();
  const { state, patch } = useWizard();
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const shown = q ? CAR_MAKES.filter((m) => m.name.toLowerCase().includes(q)) : CAR_MAKES;

  const keywordInstead = () => {
    patch({ mode: 'keyword' });
    router.navigate('/new-search/keyword');
  };

  return (
    <View style={styles.screen}>
      <AppBackground width={width} height={height} />

      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={[styles.list, { paddingTop: insets.top + 8 }]}>
          <View style={styles.headerWrap}>
            <WizardHeader
              here="/new-search/car-make"
              eyebrow="Step 2 of 6"
              step={{ filled: 2, total: 6 }}
              title="Which"
              accent="make?"
              subtitle="Then model, year range, and the price that makes it a flip."
              onBack={() => router.back()}
            />
          </View>

          <View style={[styles.search, { backgroundColor: colors.surfaceField, borderColor: colors.borderField }]}>
            <SearchIcon color={colors.textPlaceholder} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search makes"
              placeholderTextColor={colors.textPlaceholder}
              autoCorrect={false}
              style={[styles.searchInput, { color: colors.textPrimary }]}
            />
          </View>

          {shown.map(({ name, brand, subline }) => {
            const selected = brand.id === state.brandId;
            return (
              <Pressable
                key={brand.id}
                onPress={() => patch({ brandId: brand.id, mode: 'models' })}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                style={[
                  styles.card,
                  { backgroundColor: colors.surfaceCard, borderColor: colors.borderCard },
                  shadows.card,
                  selected && [styles.cardSelected, { borderColor: colors.accentFill, shadowColor: colors.accentFill }],
                ]}>
                <View
                  style={[
                    styles.badge,
                    selected ? { backgroundColor: colors.accentBrand } : { backgroundColor: colors.surfaceWash },
                  ]}>
                  <Text style={[styles.badgeLetter, { color: selected ? '#fff' : colors.textSecondary }]}>
                    {name[0]}
                  </Text>
                </View>
                <View style={styles.cardText}>
                  <Text style={[styles.cardName, { color: colors.textPrimary }]}>{name}</Text>
                  <Text style={[styles.cardSub, { color: colors.textTertiary }]} numberOfLines={1}>
                    {subline}
                  </Text>
                </View>
                <View
                  style={[
                    styles.checkRing,
                    selected
                      ? { backgroundColor: colors.accentBrand, borderColor: colors.accentBrand }
                      : { borderColor: colors.toggleOff },
                  ]}>
                  {selected ? <CheckIcon color="#fff" /> : null}
                </View>
              </Pressable>
            );
          })}

          {shown.length === 0 ? (
            <Text style={[styles.empty, { color: colors.textMuted }]}>
              No make matches “{query.trim()}”.
            </Text>
          ) : null}

          <View style={[styles.keywordCard, { backgroundColor: colors.accentFaint, borderColor: colors.accentChip }]}>
            <View style={styles.cardText}>
              <Text style={[styles.keywordTitle, { color: colors.textPrimary }]}>Make not listed?</Text>
              <Text style={[styles.cardSub, { color: colors.textTertiary }]}>
                Search by your own keyword instead
              </Text>
            </View>
            <Pressable
              onPress={keywordInstead}
              style={({ pressed }) => [
                styles.keywordBtn,
                { backgroundColor: colors.accentBrand },
                pressed && { opacity: 0.85 },
              ]}>
              <Text style={styles.keywordBtnText}>Keyword</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      <WizardBar
        onPress={() => router.navigate('/new-search/models')}
        disabled={!CAR_MAKES.some((m) => m.brand.id === state.brandId)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 18 },
  list: { gap: 9, paddingBottom: 110 },
  headerWrap: { marginBottom: 5 },

  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    height: 46,
    borderRadius: radius.thumb,
    borderWidth: 1,
    paddingHorizontal: 14,
    marginBottom: 3,
  },
  searchInput: { flex: 1, fontFamily: font.medium, fontSize: 14, paddingVertical: 0 },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: radius.button,
    borderWidth: 1,
    padding: 13,
  },
  cardSelected: {
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 6,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLetter: { fontFamily: font.displayBold, fontSize: 14 },
  cardText: { flex: 1, gap: 2, minWidth: 0 },
  cardName: { fontFamily: font.heavy, fontSize: 14 },
  cardSub: { fontFamily: font.body, fontSize: 11 },
  checkRing: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: { fontFamily: font.bold, fontSize: 12.5, textAlign: 'center', marginTop: 18 },

  keywordCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: radius.button,
    borderWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 14,
    marginTop: 2,
  },
  keywordTitle: { fontFamily: font.heavy, fontSize: 13 },
  keywordBtn: { paddingVertical: 9, paddingHorizontal: 15, borderRadius: radius.tile },
  keywordBtnText: { fontFamily: font.heavy, fontSize: 12.5, color: '#fff' },
});
