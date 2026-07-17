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
import { CheckIcon, SearchIcon } from '@/components/wizard-icons';
import { brandById, displayName, modelKey, type ModelGroup } from '@/lib/catalogue';
import { font, radius, tracking } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';
import { useWizard } from '@/lib/wizard-context';

export default function ModelsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const { colors, shadows } = useTheme();
  const { state, patch } = useWizard();
  const [query, setQuery] = useState('');

  const brand = brandById(state.brandId);
  // landing here without a brand (deep link, web refresh) would be a blank screen
  if (!brand) return <Redirect href="/new-search/brand" />;

  // galaxy shows one line at a time, but a search looks across all of them
  const line = brand.lines?.find((l) => l.id === state.line) ?? brand.lines?.[0];
  const lineGroups = line ? brand.groups.filter((g) => line.groupTitles.includes(g.title)) : brand.groups;

  const q = query.trim().toLowerCase();
  const visible = (q ? brand.groups : lineGroups)
    .map((group) => ({
      group,
      chips: q ? group.chips.filter((c) => displayName(brand, group, c).toLowerCase().includes(q)) : group.chips,
    }))
    .filter((g) => g.chips.length > 0);

  const picked = (group: ModelGroup, chip: string) => Boolean(state.models[modelKey(brand, group, chip)]);
  const count = Object.entries(state.models).filter(
    ([key, on]) => on && key.startsWith(`${brand.id}:`),
  ).length;

  const toggleChip = (group: ModelGroup, chip: string) => {
    const key = modelKey(brand, group, chip);
    patch({ models: { ...state.models, [key]: !state.models[key] } });
  };

  // headers and select-all only touch what's on screen, a search narrows both
  const toggleChips = (group: ModelGroup, chips: string[], on: boolean) => {
    const models = { ...state.models };
    for (const c of chips) models[modelKey(brand, group, c)] = on;
    patch({ models });
  };

  const visibleChipKeys = visible.flatMap(({ group, chips }) => chips.map((c) => modelKey(brand, group, c)));
  const allVisible = visibleChipKeys.length > 0 && visibleChipKeys.every((key) => state.models[key]);

  const toggleAll = () => {
    const models = { ...state.models };
    for (const key of visibleChipKeys) models[key] = !allVisible;
    patch({ models });
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
          contentContainerStyle={[styles.listContent, { paddingTop: insets.top + 8 }]}>
          <View style={styles.headerWrap}>
            <WizardHeader
              eyebrow="Step 3 of 5"
              step={{ filled: 3, total: 5 }}
              title="Pick the"
              accent="models"
              subtitle={
                brand.lines
                  ? 'Switch lines up top — your picks carry across all of them.'
                  : 'Tap the ones worth flipping. Series headers select the whole row.'
              }
              onBack={() => router.back()}
            />
          </View>
          <View
            style={[styles.search, { backgroundColor: colors.surfaceField, borderColor: colors.borderField }]}>
            <SearchIcon color={colors.textPlaceholder} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search models"
              placeholderTextColor={colors.textPlaceholder}
              autoCorrect={false}
              style={[styles.searchInput, { color: colors.textPrimary }]}
            />
          </View>

          {brand.lines ? (
            <View style={styles.lineRow}>
              {brand.lines.map((l) => {
                const on = l.id === line?.id;
                return (
                  <Pressable
                    key={l.id}
                    onPress={() => patch({ line: l.id })}
                    accessibilityRole="button"
                    accessibilityState={{ selected: on }}
                    style={[
                      styles.linePill,
                      on
                        ? { backgroundColor: colors.accentBrand, borderColor: colors.accentBrand }
                        : { backgroundColor: colors.surfaceCard, borderColor: colors.borderButton },
                    ]}>
                    <Text style={[styles.linePillText, { color: on ? '#fff' : colors.textSecondary }]}>
                      {l.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ) : null}

          <View style={styles.countRow}>
            <Text style={[styles.countLabel, { color: colors.textLabel }]}>Models</Text>
            <Text
              style={[
                styles.countValue,
                { color: count > 0 ? colors.accentText : colors.textFaint },
              ]}>
              {count > 0 ? `${count} selected` : 'none yet'}
            </Text>
          </View>

          <Pressable
            onPress={toggleAll}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: allVisible }}
            style={[
              styles.selectAll,
              { backgroundColor: colors.surfaceCard, borderColor: colors.borderCard },
              shadows.button,
            ]}>
            <Box checked={allVisible} size={20} />
            <Text style={[styles.selectAllText, { color: colors.textPrimary }]}>Select all models</Text>
          </Pressable>

          {visible.length === 0 ? (
            <Text style={[styles.empty, { color: colors.textMuted }]}>
              Nothing matches “{query.trim()}” — try another spelling.
            </Text>
          ) : null}

          {visible.map(({ group, chips }) => {
            const rowChecked = chips.every((c) => picked(group, c));
            return (
              <View key={group.title} style={styles.group}>
                {group.title === 'No series' ? (
                  <Text style={[styles.groupTitle, { color: colors.textTag }]}>{group.title}</Text>
                ) : (
                  <Pressable
                    onPress={() => toggleChips(group, chips, !rowChecked)}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: rowChecked }}
                    style={styles.groupHead}
                    hitSlop={6}>
                    <Box checked={rowChecked} size={19} />
                    <Text style={[styles.groupTitle, { color: colors.textTag }]}>{group.title}</Text>
                  </Pressable>
                )}
                <View style={styles.chips}>
                  {chips.map((chip) => {
                    const on = picked(group, chip);
                    return (
                      <Pressable
                        key={chip}
                        onPress={() => toggleChip(group, chip)}
                        accessibilityRole="button"
                        accessibilityState={{ selected: on }}
                        style={[
                          styles.chip,
                          on
                            ? [styles.chipOn, { backgroundColor: colors.accentBrand, borderColor: colors.accentBrand, shadowColor: colors.accentBrand }]
                            : { backgroundColor: colors.surfaceCard, borderColor: colors.borderButton },
                        ]}>
                        <Text style={[styles.chipText, { color: on ? '#fff' : colors.textTag }]}>{chip}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <WizardBar
        label="Set prices"
        onPress={() => router.navigate('/new-search/prices')}
        disabled={count === 0}
      />
    </View>
  );
}

function Box({ checked, size }: { checked: boolean; size: number }) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.box,
        { width: size, height: size },
        checked
          ? { backgroundColor: colors.accentBrand, borderColor: colors.accentBrand }
          : { backgroundColor: colors.surfaceCard, borderColor: colors.toggleOff },
      ]}>
      {checked ? <CheckIcon color="#fff" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 18 },
  listContent: { gap: 12, paddingBottom: 110 },
  headerWrap: { marginBottom: 2 },

  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    height: 46,
    borderRadius: radius.thumb,
    borderWidth: 1,
    paddingHorizontal: 14,
  },
  searchInput: { flex: 1, fontFamily: font.medium, fontSize: 14, paddingVertical: 0 },

  lineRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  linePill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  linePillText: { fontFamily: font.heavy, fontSize: 12.5 },

  countRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  countLabel: {
    fontFamily: font.heavy,
    fontSize: 10.5,
    letterSpacing: tracking(10.5, 0.08),
    textTransform: 'uppercase',
  },
  countValue: { fontFamily: font.heavy, fontSize: 11.5 },

  selectAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: radius.thumb,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  selectAllText: { fontFamily: font.heavy, fontSize: 13.5 },

  empty: { fontFamily: font.bold, fontSize: 12.5, textAlign: 'center', marginTop: 18 },

  group: { gap: 9, marginTop: 2 },
  groupHead: { flexDirection: 'row', alignItems: 'center', gap: 9, alignSelf: 'flex-start' },
  groupTitle: { fontFamily: font.heavy, fontSize: 12.5 },
  box: { borderRadius: 6, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },

  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  chip: {
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: radius.segment,
    borderWidth: 1,
  },
  chipOn: {
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 4,
  },
  chipText: { fontFamily: font.heavy, fontSize: 12.5 },
});
