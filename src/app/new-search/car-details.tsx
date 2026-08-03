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
import { ChevronRightIcon } from '@/components/icons';
import { WizardBar, WizardHeader } from '@/components/wizard-chrome';
import { font, radius, tracking } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';
import { useWizard } from '@/lib/wizard-context';

// a car older than this barely trades outside the classic market
const OLDEST_YEAR = 2000;
const THIS_YEAR = 2026;
const YEARS = Array.from({ length: THIS_YEAR - OLDEST_YEAR + 1 }, (_, i) => String(THIS_YEAR - i));

const TRANSMISSION = ['Any', 'Automatic', 'Manual'];
const FUEL = ['Any', 'Petrol', 'Diesel', 'Hybrid', 'Electric'];
// uk body names, an american mock said sedan and wagon
const BODY = ['Any', 'Hatchback', 'Saloon', 'Estate', 'SUV', 'Coupe', 'Convertible', 'MPV', 'Van'];

export default function CarDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const { colors, shadows } = useTheme();
  const { state, patch } = useWizard();
  const [openYear, setOpenYear] = useState<'' | 'from' | 'to'>('');

  if (state.category !== 'cars') return <Redirect href="/new-search" />;

  const yearPreset = (from: string, to: string) => {
    patch({ yearFrom: from, yearTo: to });
    setOpenYear('');
  };

  const milesPreset = (max: string) => patch({ mileageMin: '', mileageMax: max });

  const digits = (v: string, len: number) => v.replace(/[^0-9]/g, '').slice(0, len);

  return (
    <View style={styles.screen}>
      <AppBackground width={width} height={height} />

      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={[styles.list, { paddingTop: insets.top + 8 }]}>
          <View style={styles.headerWrap}>
            <WizardHeader
              eyebrow="Step 4 of 6"
              step={{ filled: 4, total: 6 }}
              title="Year and"
              accent="condition"
              subtitle="Everything that separates a flip from someone else's problem."
              onBack={() => router.back()}
            />
          </View>

          <View style={styles.section}>
            <Text style={[styles.label, { color: colors.textLabel }]}>Year range</Text>
            <View style={styles.rangeRow}>
              <YearField
                value={state.yearFrom}
                placeholder="From"
                open={openYear === 'from'}
                onPress={() => setOpenYear(openYear === 'from' ? '' : 'from')}
              />
              <Text style={[styles.to, { color: colors.textMuted }]}>to</Text>
              <YearField
                value={state.yearTo}
                placeholder="To"
                open={openYear === 'to'}
                onPress={() => setOpenYear(openYear === 'to' ? '' : 'to')}
              />
            </View>

            {openYear ? (
              <View style={[styles.yearList, { backgroundColor: colors.surfaceCard, borderColor: colors.borderCard }, shadows.card]}>
                <ScrollView style={styles.yearScroll} nestedScrollEnabled>
                  {YEARS.map((y) => (
                    <Pressable
                      key={y}
                      onPress={() => {
                        patch(openYear === 'from' ? { yearFrom: y } : { yearTo: y });
                        setOpenYear('');
                      }}
                      style={({ pressed }) => [styles.yearRow, pressed && { backgroundColor: colors.surfaceWash }]}>
                      <Text style={[styles.yearText, { color: colors.textPrimary }]}>{y}</Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            ) : null}

            <View style={styles.pillRow}>
              <Pill label="Last 5 years" on={state.yearFrom === String(THIS_YEAR - 5)} onPress={() => yearPreset(String(THIS_YEAR - 5), String(THIS_YEAR))} />
              <Pill label="Last 10 years" on={state.yearFrom === String(THIS_YEAR - 10)} onPress={() => yearPreset(String(THIS_YEAR - 10), String(THIS_YEAR))} />
              <Pill label="2015+" on={state.yearFrom === '2015'} onPress={() => yearPreset('2015', String(THIS_YEAR))} />
              <Pill label="Any year" on={!state.yearFrom && !state.yearTo} onPress={() => yearPreset('', '')} />
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.labelRow}>
              <Text style={[styles.label, { color: colors.textLabel }]}>Mileage</Text>
              <Text style={[styles.hint, { color: colors.textFaint }]}>miles on the clock</Text>
            </View>
            <View style={styles.rangeRow}>
              <TextInput
                value={state.mileageMin}
                onChangeText={(v) => patch({ mileageMin: digits(v, 6) })}
                placeholder="0"
                placeholderTextColor={colors.textPlaceholder}
                keyboardType="number-pad"
                style={[styles.milesInput, { backgroundColor: colors.surfaceField, borderColor: colors.borderField, color: colors.textPrimary }]}
              />
              <Text style={[styles.to, { color: colors.textMuted }]}>to</Text>
              <TextInput
                value={state.mileageMax}
                onChangeText={(v) => patch({ mileageMax: digits(v, 6) })}
                placeholder="120000"
                placeholderTextColor={colors.textPlaceholder}
                keyboardType="number-pad"
                style={[styles.milesInput, { backgroundColor: colors.surfaceField, borderColor: colors.borderField, color: colors.textPrimary }]}
              />
            </View>
            <View style={styles.pillRow}>
              <Pill label="Under 60k" on={state.mileageMax === '60000'} onPress={() => milesPreset('60000')} />
              <Pill label="Under 100k" on={state.mileageMax === '100000'} onPress={() => milesPreset('100000')} />
              <Pill label="Under 120k" on={state.mileageMax === '120000'} onPress={() => milesPreset('120000')} />
              <Pill label="Any" on={!state.mileageMax && !state.mileageMin} onPress={() => patch({ mileageMin: '', mileageMax: '' })} />
            </View>
          </View>

          <Choice label="Transmission" options={TRANSMISSION} value={state.transmission} onPick={(v) => patch({ transmission: v })} />
          <Choice label="Fuel" options={FUEL} value={state.fuel} onPick={(v) => patch({ fuel: v })} />
          <Choice label="Body" options={BODY} value={state.body} onPick={(v) => patch({ body: v })} />

          <View style={[styles.note, { backgroundColor: colors.accentFaint, borderColor: colors.accentChip }]}>
            <Text style={[styles.noteTitle, { color: colors.textPrimary }]}>Sellers leave fields blank</Text>
            <Text style={[styles.noteBody, { color: colors.textTertiary }]}>
              Anything you pick here has to show up in the listing title, so leave a row on Any to keep the net wide.
            </Text>
          </View>
        </ScrollView>
      </View>

      <WizardBar label="Set prices" onPress={() => router.navigate('/new-search/prices')} />
    </View>
  );

  function YearField({ value, placeholder, open, onPress }: { value: string; placeholder: string; open: boolean; onPress: () => void }) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        style={[
          styles.yearField,
          { backgroundColor: colors.surfaceField, borderColor: open ? colors.accentFill : colors.borderField },
        ]}>
        <Text style={[styles.yearValue, { color: value ? colors.textPrimary : colors.textPlaceholder }]}>
          {value || placeholder}
        </Text>
        <View style={open ? styles.chevronUp : styles.chevronDown}>
          <ChevronRightIcon color={colors.textMuted} size={12} />
        </View>
      </Pressable>
    );
  }

  function Pill({ label, on, onPress }: { label: string; on: boolean; onPress: () => void }) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityState={{ selected: on }}
        style={[
          styles.pill,
          on
            ? { backgroundColor: colors.accentBrand, borderColor: colors.accentBrand }
            : { backgroundColor: colors.surfaceCard, borderColor: colors.borderButton },
        ]}>
        <Text style={[styles.pillText, { color: on ? '#fff' : colors.textSecondary }]}>{label}</Text>
      </Pressable>
    );
  }

  function Choice({ label, options, value, onPick }: { label: string; options: string[]; value: string; onPick: (v: string) => void }) {
    return (
      <View style={styles.section}>
        <Text style={[styles.label, { color: colors.textLabel }]}>{label}</Text>
        <View style={styles.pillRow}>
          {options.map((o) => (
            <Pill key={o} label={o} on={value === o} onPress={() => onPick(o)} />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 18 },
  list: { gap: 16, paddingBottom: 110 },
  headerWrap: { marginBottom: 0 },

  section: { gap: 8 },
  label: {
    fontFamily: font.heavy,
    fontSize: 10.5,
    letterSpacing: tracking(10.5, 0.08),
    textTransform: 'uppercase',
  },
  labelRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
  hint: { fontFamily: font.body, fontSize: 11 },

  rangeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  to: { fontFamily: font.bold, fontSize: 12.5 },
  yearField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 46,
    borderRadius: radius.thumb,
    borderWidth: 1,
    paddingHorizontal: 14,
  },
  yearValue: { fontFamily: font.displayBold, fontSize: 15 },
  chevronDown: { transform: [{ rotate: '90deg' }] },
  chevronUp: { transform: [{ rotate: '270deg' }] },
  yearList: { borderRadius: radius.thumb, borderWidth: 1, overflow: 'hidden' },
  yearScroll: { maxHeight: 190 },
  yearRow: { paddingVertical: 11, paddingHorizontal: 14 },
  yearText: { fontFamily: font.bold, fontSize: 14 },

  milesInput: {
    flex: 1,
    height: 46,
    borderRadius: radius.thumb,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontFamily: font.displayBold,
    fontSize: 15,
  },

  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 10,
    borderWidth: 1,
  },
  pillText: { fontFamily: font.heavy, fontSize: 11.5 },

  note: { borderRadius: radius.button, borderWidth: 1, padding: 13, gap: 3 },
  noteTitle: { fontFamily: font.heavy, fontSize: 12.5 },
  noteBody: { fontFamily: font.body, fontSize: 11, lineHeight: 16 },
});
