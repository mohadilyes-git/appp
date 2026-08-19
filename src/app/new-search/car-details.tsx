import { Redirect, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Keyboard,
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
import { allowedFor, allowedForModel, lastYear, specFor, THIS_YEAR as NOW } from '@/lib/car-specs';
import { brandById, modelKey, withCustom } from '@/lib/catalogue';
import { font, radius, tracking } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';
import { useWizard } from '@/lib/wizard-context';


export default function CarDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const { colors } = useTheme();
  const { state, patch } = useWizard();
  // '' when shut, otherwise 'all:from' or '<model>:to'
  const [openYear, setOpenYear] = useState('');

  const found = brandById(state.brandId);
  const brand = found ? withCustom(found, state.customModels[found.id]) : undefined;
  // only the models actually ticked decide what this screen may offer
  const picked = brand
    ? brand.groups.flatMap((g) => g.chips.filter((c) => state.models[modelKey(brand, g, c)]))
    : [];
  const allowed = allowedFor(brand?.id, picked);

  // going back and changing models can strip a spec this search still holds
  useEffect(() => {
    const drop: Record<string, string> = {};
    if (state.transmission !== 'Any' && !allowed.transmissions.includes(state.transmission)) drop.transmission = 'Any';
    if (state.fuel !== 'Any' && !allowed.fuels.includes(state.fuel)) drop.fuel = 'Any';
    if (state.body !== 'Any' && !allowed.bodies.includes(state.body)) drop.body = 'Any';
    const from = Number(state.yearFrom);
    const to = Number(state.yearTo);
    if (from && (from < allowed.yearMin || from > allowed.yearMax)) drop.yearFrom = String(allowed.yearMin);
    if (to && (to > allowed.yearMax || to < allowed.yearMin)) drop.yearTo = String(allowed.yearMax);
    if (Object.keys(drop).length) patch(drop);
  }, [allowed, state.transmission, state.fuel, state.body, state.yearFrom, state.yearTo, patch]);

  if (state.category !== 'cars' || !brand) return <Redirect href="/new-search" />;
  const YEARS = Array.from(
    { length: allowed.yearMax - allowed.yearMin + 1 },
    (_, i) => String(allowed.yearMax - i),
  );
  const THIS_YEAR = allowed.yearMax;

  const yearPreset = (from: string, to: string) => {
    const clamp = (y: string) =>
      y ? String(Math.min(Math.max(Number(y), allowed.yearMin), allowed.yearMax)) : '';
    patch({ yearFrom: clamp(from), yearTo: clamp(to) });
    setOpenYear('');
  };

  const closeYear = () => setOpenYear('');
  // the keyboard would sit over a list that opens below its field
  const openList = (id: string) => {
    Keyboard.dismiss();
    setOpenYear((current) => (current === id ? '' : id));
  };
  // one model means the shared rows already are per model
  const showAll = state.carScope === 'all' || picked.length < 2;
  const milesPreset = (max: string) => {
    closeYear();
    patch({ mileageMin: '', mileageMax: max });
  };

  return (
    <View style={styles.screen}>
      <AppBackground width={width} height={height} />

      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={[styles.scrollPad, { paddingTop: insets.top + 8 }]}>
          <Pressable onPress={closeYear} accessible={false} style={styles.list}>
          <View style={styles.headerWrap}>
            <WizardHeader
              here="/new-search/car-details"
              eyebrow="Step 4 of 6"
              step={{ filled: 4, total: 6 }}
              title="Year and"
              accent="condition"
              subtitle="Everything that separates a flip from someone else's problem."
              onBack={() => router.back()}
            />
          </View>

          {picked.length > 1 ? (
            <View style={styles.scopeRow}>
              {(['all', 'model'] as const).map((scope) => {
                const on = state.carScope === scope;
                return (
                  <Pressable
                    key={scope}
                    onPress={() => {
                      closeYear();
                      patch({ carScope: scope });
                    }}
                    accessibilityRole="button"
                    accessibilityState={{ selected: on }}
                    style={[
                      styles.scopeTab,
                      on
                        ? { backgroundColor: colors.accentBrand, borderColor: colors.accentBrand }
                        : { backgroundColor: colors.surfaceCard, borderColor: colors.borderButton },
                    ]}>
                    <Text style={[styles.scopeText, { color: on ? '#fff' : colors.textSecondary }]}>
                      {scope === 'all' ? 'All models' : 'Per model'}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ) : null}

          {showAll ? (
          <>
          <View style={[styles.section, styles.lifted]}>
            <Text style={[styles.label, { color: colors.textLabel }]}>Year range</Text>
            <View style={styles.anchor}>
            <View style={styles.rangeRow}>
              <YearField
                value={state.yearFrom}
                placeholder="From"
                open={openYear === 'all:from'}
                onPress={() => openList('all:from')}
              />
              <Text style={[styles.to, { color: colors.textMuted }]}>to</Text>
              <YearField
                value={state.yearTo}
                placeholder="To"
                open={openYear === 'all:to'}
                onPress={() => openList('all:to')}
              />
            </View>

            {openYear.startsWith('all:') ? (
              <YearList
                years={YEARS}
                onPick={(y) => {
                  patch(openYear.endsWith(':from') ? { yearFrom: y } : { yearTo: y });
                  setOpenYear('');
                }}
              />
            ) : null}
            </View>

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
                onFocus={closeYear}
                placeholder="0"
                placeholderTextColor={colors.textPlaceholder}
                keyboardType="number-pad"
                style={[styles.milesInput, { backgroundColor: colors.surfaceField, borderColor: colors.borderField, color: colors.textPrimary }]}
              />
              <Text style={[styles.to, { color: colors.textMuted }]}>to</Text>
              <TextInput
                value={state.mileageMax}
                onChangeText={(v) => patch({ mileageMax: digits(v, 6) })}
                onFocus={closeYear}
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
              <Pill label="Any" on={!state.mileageMax && !state.mileageMin} onPress={() => milesPreset('')} />
            </View>
          </View>
          </>
          ) : null}

          {showAll ? (
            <>
              <Choice label="Transmission" options={['Any', ...allowed.transmissions]} value={state.transmission} onPick={(v) => { closeYear(); patch({ transmission: v }); }} />
              <Choice label="Fuel" options={['Any', ...allowed.fuels]} value={state.fuel} onPick={(v) => { closeYear(); patch({ fuel: v }); }} />
              <Choice label="Body" options={['Any', ...allowed.bodies]} value={state.body} onPick={(v) => { closeYear(); patch({ body: v }); }} />
            </>
          ) : (
            <View style={styles.section}>
              {picked.map((model, i) => (
                <ModelRow
                  key={model}
                  model={model}
                  depth={picked.length - i}
                  row={state.carRows[`${brand.id}:${model}`] ?? BLANK_ROW}
                  mine={allowedForModel(brand.id, model)}
                  span={spanOf(brand.id, model, allowed)}
                  openYear={openYear}
                  setOpenYear={setOpenYear}
                  onSet={(part) =>
                    patch((s) => ({
                      carRows: {
                        ...s.carRows,
                        // keyed by make too, or a SEAT Leon's answers show up on a Cupra Leon
                        [`${brand.id}:${model}`]: { ...(s.carRows[`${brand.id}:${model}`] ?? BLANK_ROW), ...part },
                      },
                    }))
                  }
                />
              ))}
            </View>
          )}

          <View style={[styles.note, { backgroundColor: colors.accentFaint, borderColor: colors.accentChip }]}>
            <Text style={[styles.noteTitle, { color: colors.textPrimary }]}>Sellers leave fields blank</Text>
            <Text style={[styles.noteBody, { color: colors.textTertiary }]}>
              Only the years and specs your picked models were actually sold with are offered, and each
              model saves clamped to its own life.
            </Text>
          </View>
          </Pressable>
        </ScrollView>
      </View>

      <WizardBar label="Set prices" onPress={() => router.navigate('/new-search/prices')} />
    </View>
  );

}

type CarRow = {
  yearFrom: string;
  yearTo: string;
  mileageMin: string;
  mileageMax: string;
  transmission: string;
  fuel: string;
  body: string;
};

const BLANK_ROW: CarRow = {
  yearFrom: '',
  yearTo: '',
  mileageMin: '',
  mileageMax: '',
  transmission: '',
  fuel: '',
  body: '',
};

function digits(v: string, len: number) {
  return v.replace(/[^0-9]/g, '').slice(0, len);
}

function spanOf(brandId: string, model: string, wide: { yearMin: number; yearMax: number }) {
  const spec = specFor(brandId, model);
  return spec ? { from: spec.y, to: lastYear(spec) } : { from: wide.yearMin, to: wide.yearMax };
}

// a floating list has to stand out from whatever card it covers
function useListSkin() {
  const { colors, resolved } = useTheme();
  return {
    backgroundColor: resolved === 'dark' ? colors.surfaceRaised : colors.surfaceCard,
    borderColor: colors.accentFill,
  };
}

function YearField({
  value,
  placeholder,
  open,
  onPress,
}: {
  value: string;
  placeholder: string;
  open: boolean;
  onPress: () => void;
}) {
  const { colors } = useTheme();
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

function YearList({ years, onPick }: { years: string[]; onPick: (y: string) => void }) {
  const { colors, shadows } = useTheme();
  const skin = useListSkin();
  return (
    <View style={[styles.yearList, styles.floating, skin, shadows.panel]}>
      <ScrollView style={styles.yearScroll} nestedScrollEnabled>
        {years.map((y, i) => (
          <Pressable
            key={y}
            onPress={() => onPick(y)}
            style={({ pressed }) => [
              styles.yearRow,
              i > 0 && { borderTopWidth: 1, borderTopColor: colors.surfaceWash },
              pressed && { backgroundColor: colors.surfaceWash },
            ]}>
            <Text style={[styles.yearText, { color: colors.textPrimary }]}>{y}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

function Pill({ label, on, onPress }: { label: string; on: boolean; onPress: () => void }) {
  const { colors } = useTheme();
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

function Choice({
  label,
  options,
  value,
  onPick,
}: {
  label: string;
  options: string[];
  value: string;
  onPick: (v: string) => void;
}) {
  const { colors } = useTheme();
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

function SpecField({
  label,
  options,
  value,
  open,
  onOpen,
  onPick,
}: {
  label: string;
  options: string[];
  value: string;
  open: boolean;
  onOpen: () => void;
  onPick: (v: string) => void;
}) {
  const { colors, shadows } = useTheme();
  const skin = useListSkin();
  return (
    <View style={styles.specCol}>
      <Text style={[styles.miniLabel, styles.specLabel, { color: colors.textLabel }]}>{label}</Text>
      <Pressable
        onPress={onOpen}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        style={[
          styles.specField,
          { backgroundColor: colors.surfaceField, borderColor: open ? colors.accentFill : colors.borderField },
        ]}>
        <Text
          style={[styles.specText, { color: value ? colors.textPrimary : colors.textPlaceholder }]}
          numberOfLines={1}>
          {value || 'Any'}
        </Text>
      </Pressable>
      {open ? (
        <View style={[styles.specList, styles.floatingSpec, skin, shadows.panel]}>
          {['Any', ...options].map((o, i) => (
            <Pressable
              key={o}
              onPress={() => onPick(o)}
              style={({ pressed }) => [
                styles.specOption,
                i > 0 && { borderTopWidth: 1, borderTopColor: colors.surfaceWash },
                pressed && { backgroundColor: colors.surfaceWash },
              ]}>
              <Text style={[styles.specText, { color: colors.textPrimary }]}>{o}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function ModelRow({
  model,
  depth,
  row,
  mine,
  span,
  openYear,
  setOpenYear,
  onSet,
}: {
  model: string;
  depth: number;
  row: CarRow;
  mine: { fuels: string[]; transmissions: string[]; bodies: string[] };
  span: { from: number; to: number };
  openYear: string;
  setOpenYear: (v: string) => void;
  onSet: (part: Partial<CarRow>) => void;
}) {
  const { colors, shadows } = useTheme();
  const years = Array.from({ length: span.to - span.from + 1 }, (_, i) => String(span.to - i));
  const close = () => setOpenYear('');
  const toggle = (id: string) => {
    // same reason: never open a list into the space the keyboard is holding
    Keyboard.dismiss();
    setOpenYear(openYear === id ? '' : id);
  };

  return (
    <View
      style={[
        styles.modelCard,
        { backgroundColor: colors.surfaceCard, borderColor: colors.borderCard },
        shadows.card,
        { zIndex: depth },
      ]}>
      <View style={styles.modelHead}>
        <Text style={[styles.modelName, { color: colors.textPrimary }]} numberOfLines={1}>
          {model}
        </Text>
        <Text style={[styles.modelLife, { color: colors.textFaint }]}>
          {span.from}–{span.to === NOW ? 'now' : span.to}
        </Text>
      </View>

      <Text style={[styles.miniLabel, { color: colors.textLabel }]}>Years</Text>
      <View style={styles.anchor}>
        <View style={styles.rangeRow}>
          <YearField
            value={row.yearFrom}
            placeholder="From"
            open={openYear === `${model}:from`}
            onPress={() => toggle(`${model}:from`)}
          />
          <Text style={[styles.to, { color: colors.textMuted }]}>to</Text>
          <YearField
            value={row.yearTo}
            placeholder="To"
            open={openYear === `${model}:to`}
            onPress={() => toggle(`${model}:to`)}
          />
        </View>
        {openYear === `${model}:from` || openYear === `${model}:to` ? (
          <YearList
            years={years}
            onPick={(y) => {
              onSet(openYear.endsWith(':from') ? { yearFrom: y } : { yearTo: y });
              close();
            }}
          />
        ) : null}
      </View>

      <Text style={[styles.miniLabel, { color: colors.textLabel }]}>Mileage</Text>
      <View style={styles.rangeRow}>
        <TextInput
          value={row.mileageMin}
          onChangeText={(v) => onSet({ mileageMin: digits(v, 6) })}
          onFocus={close}
          placeholder="0"
          placeholderTextColor={colors.textPlaceholder}
          keyboardType="number-pad"
          style={[styles.milesInput, styles.milesSmall, { backgroundColor: colors.surfaceField, borderColor: colors.borderField, color: colors.textPrimary }]}
        />
        <Text style={[styles.to, { color: colors.textMuted }]}>to</Text>
        <TextInput
          value={row.mileageMax}
          onChangeText={(v) => onSet({ mileageMax: digits(v, 6) })}
          onFocus={close}
          placeholder="Any miles"
          placeholderTextColor={colors.textPlaceholder}
          keyboardType="number-pad"
          style={[styles.milesInput, styles.milesSmall, { backgroundColor: colors.surfaceField, borderColor: colors.borderField, color: colors.textPrimary }]}
        />
      </View>

      <View style={styles.specRow}>
        {([
          ['Gearbox', 'transmission', mine.transmissions, row.transmission],
          ['Fuel', 'fuel', mine.fuels, row.fuel],
          ['Body', 'body', mine.bodies, row.body],
        ] as const).map(([label, field, options, value]) => (
          <SpecField
            key={field}
            label={label}
            options={options}
            value={value}
            open={openYear === `${model}:${field}`}
            onOpen={() => toggle(`${model}:${field}`)}
            onPick={(v) => {
              onSet({ [field]: v === 'Any' ? '' : v });
              close();
            }}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 18 },
  scrollPad: { paddingBottom: 110 },
  list: { gap: 16 },
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
  yearList: { borderRadius: radius.thumb, borderWidth: 1.5, overflow: 'hidden' },
  // the lists hang over what is under them, so closing one never moves the page
  // and never steals the keyboard from a field you just tapped
  anchor: { position: 'relative', zIndex: 30 },
  // whatever holds an open list has to sit above the cards drawn after it
  lifted: { zIndex: 50 },
  floating: { position: 'absolute', top: 52, left: 0, right: 0, zIndex: 30, elevation: 8 },
  floatingSpec: { position: 'absolute', top: 60, left: 0, right: 0, zIndex: 30, elevation: 8 },
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

  miniLabel: {
    fontFamily: font.heavy,
    fontSize: 9.5,
    letterSpacing: tracking(9.5, 0.07),
    textTransform: 'uppercase',
    marginBottom: -3,
  },

  scopeRow: { flexDirection: 'row', gap: 7 },
  scopeTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: radius.tile,
    borderWidth: 1,
    alignItems: 'center',
  },
  scopeText: { fontFamily: font.heavy, fontSize: 12.5 },

  specRow: { flexDirection: 'row', gap: 7, marginTop: 2 },
  specCol: { flex: 1, gap: 5, position: 'relative', zIndex: 20 },
  specLabel: { marginBottom: 0 },
  specField: {
    height: 38,
    borderRadius: radius.tile,
    borderWidth: 1,
    paddingHorizontal: 9,
    justifyContent: 'center',
  },
  specText: { fontFamily: font.bold, fontSize: 12 },
  specList: { borderRadius: radius.tile, borderWidth: 1.5, overflow: 'hidden' },
  specOption: { paddingVertical: 9, paddingHorizontal: 9 },

  modelCard: { borderRadius: radius.button, borderWidth: 1, padding: 12, gap: 8, overflow: 'visible' },
  modelHead: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
  modelName: { fontFamily: font.heavy, fontSize: 13, flex: 1, minWidth: 0 },
  modelLife: { fontFamily: font.bold, fontSize: 11 },
  milesSmall: { height: 42, fontSize: 14 },

  note: { borderRadius: radius.button, borderWidth: 1, padding: 13, gap: 3 },
  noteTitle: { fontFamily: font.heavy, fontSize: 12.5 },
  noteBody: { fontFamily: font.body, fontSize: 11, lineHeight: 16 },
});
