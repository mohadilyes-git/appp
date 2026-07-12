import { Redirect, useRouter } from 'expo-router';
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
import { displayName, modelKey, PHONE_BRANDS } from '@/lib/catalogue';
import { font, radius, tracking } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';
import { useWizard } from '@/lib/wizard-context';

// whole pounds only, commas and stray paste garbage stripped at the door
function cleanPrice(value: string) {
  return value.replace(/[^0-9]/g, '').slice(0, 6);
}

export default function PricesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const { colors, shadows } = useTheme();
  const { state, patch } = useWizard();
  const [allMin, setAllMin] = useState('');
  const [allMax, setAllMax] = useState('');

  // only the active brand's picks: switching brand parks the other one's models
  const brand = PHONE_BRANDS.find((b) => b.id === state.brandId)?.brand;
  const rows = brand
    ? brand.groups.flatMap((group) =>
        group.chips
          .filter((chip) => state.models[modelKey(brand, group, chip)])
          .map((chip) => ({
            key: modelKey(brand, group, chip),
            name: displayName(brand, group, chip),
          })),
      )
    : [];

  if (rows.length === 0) return <Redirect href="/new-search/brand" />;

  const priceOf = (key: string) => state.prices[key] ?? { min: '', max: '' };

  const setPrice = (key: string, side: 'min' | 'max', value: string) => {
    patch((s) => ({
      prices: { ...s.prices, [key]: { ...(s.prices[key] ?? { min: '', max: '' }), [side]: value } },
    }));
  };

  const applyAll = () => {
    // an empty strip would quietly wipe every row instead of filling it
    if (!allMin && !allMax) return;
    patch((s) => {
      const prices = { ...s.prices };
      for (const row of rows) prices[row.key] = { min: allMin, max: allMax };
      return { prices };
    });
  };

  const next = () => router.navigate('/new-search/filters');

  return (
    <View style={styles.screen}>
      <AppBackground width={width} height={height} />

      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={[styles.listContent, { paddingTop: insets.top + 8 }]}>
          <View style={styles.headerWrap}>
            <WizardHeader
              eyebrow="Prices"
              step={{ filled: 4, total: 5 }}
              title="Price"
              accent="per model"
              subtitle="A cheap iPhone 13 is not a cheap 15 Pro Max — set the ceiling that makes each one a deal."
              onBack={() => router.back()}
            />
          </View>

          <View style={[styles.applyStrip, { backgroundColor: colors.accentFaint, borderColor: colors.accentChip }]}>
            <Text style={[styles.applyLabel, { color: colors.accentText }]}>
              Fill one range,{'\n'}apply to all
            </Text>
            <PriceInput value={allMin} onChange={setAllMin} placeholder="Min" raised />
            <PriceInput value={allMax} onChange={setAllMax} placeholder="Max" raised />
            <Pressable
              onPress={applyAll}
              style={({ pressed }) => [
                styles.applyBtn,
                { backgroundColor: colors.accentBrand },
                pressed && { opacity: 0.85 },
              ]}>
              <Text style={styles.applyBtnText}>Apply</Text>
            </Pressable>
          </View>

          <View style={styles.headRow}>
            <Text style={[styles.headModels, { color: colors.textLabel }]}>Your models</Text>
            <Text style={[styles.headCol, { color: colors.textPlaceholder }]}>Min</Text>
            <Text style={[styles.headCol, { color: colors.textPlaceholder }]}>Max</Text>
          </View>

          <View style={styles.cards}>
            {rows.map((row) => (
              <View
                key={row.key}
                style={[styles.modelRow, { backgroundColor: colors.surfaceCard, borderColor: colors.borderCard }, shadows.card]}>
                <Text style={[styles.modelName, { color: colors.textPrimary }]} numberOfLines={1}>
                  {row.name}
                </Text>
                <PriceInput
                  value={priceOf(row.key).min}
                  onChange={(v) => setPrice(row.key, 'min', v)}
                  placeholder="0"
                />
                <PriceInput
                  value={priceOf(row.key).max}
                  onChange={(v) => setPrice(row.key, 'max', v)}
                  placeholder="1,000"
                />
              </View>
            ))}
          </View>

          <Text style={[styles.footnote, { color: colors.textHint }]}>
            Leave a row blank to alert on any price for that model.
          </Text>
        </ScrollView>
      </View>

      <WizardBar onPress={next} onSkip={next} />
    </View>
  );
}

type InputProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  // the strip sits on a tinted card, so its inputs stay solid white
  raised?: boolean;
};

function PriceInput({ value, onChange, placeholder, raised }: InputProps) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      value={value}
      onChangeText={(v) => onChange(cleanPrice(v))}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder={placeholder}
      placeholderTextColor={colors.textPlaceholder}
      keyboardType="number-pad"
      style={[
        styles.priceInput,
        {
          backgroundColor: focused ? colors.accentFaint : raised ? colors.surfaceCard : colors.surfaceField,
          borderColor: focused ? colors.accentFill : colors.borderField,
          color: colors.textPrimary,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 18 },
  listContent: { gap: 14, paddingBottom: 110 },
  headerWrap: { marginBottom: 2 },

  applyStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: radius.button,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 13,
  },
  applyLabel: { flex: 1, fontFamily: font.heavy, fontSize: 12.5, lineHeight: 17 },
  applyBtn: { paddingVertical: 11, paddingHorizontal: 12, borderRadius: radius.tile },
  applyBtnText: { fontFamily: font.heavy, fontSize: 12, color: '#fff' },

  headRow: { flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 12 },
  headModels: {
    flex: 1,
    fontFamily: font.heavy,
    fontSize: 10.5,
    letterSpacing: tracking(10.5, 0.08),
    textTransform: 'uppercase',
  },
  headCol: {
    width: 66,
    textAlign: 'center',
    fontFamily: font.heavy,
    fontSize: 10.5,
    letterSpacing: tracking(10.5, 0.06),
    textTransform: 'uppercase',
  },

  cards: { gap: 9 },
  modelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    borderRadius: radius.button,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  modelName: { flex: 1, fontFamily: font.heavy, fontSize: 13, minWidth: 0 },
  priceInput: {
    width: 66,
    height: 40,
    borderRadius: radius.tile,
    borderWidth: 1,
    paddingHorizontal: 10,
    fontFamily: font.displayBold,
    fontSize: 14,
  },

  footnote: { fontFamily: font.body, fontSize: 11, lineHeight: 16, paddingHorizontal: 2 },
});
