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
import { CloseIcon } from '@/components/icons';
import { WizardBar, WizardHeader } from '@/components/wizard-chrome';
import { CheckIcon, SearchIcon } from '@/components/wizard-icons';
import {
  BRAND_HEADERS,
  brandById,
  CAR_HEADERS,
  CUSTOM_GROUP,
  CUSTOM_LINE,
  displayName,
  modelKey,
  productById,
  trimTypedModel,
  withCustom,
  type ModelGroup,
} from '@/lib/catalogue';
import { font, radius, tracking } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';
import { stepTotal, useWizard } from '@/lib/wizard-context';

// consoles introduce themselves by name, phones share one line.
// the electronics brands bring their own headers from the catalogue
const HEADERS: Record<string, { title: string; accent: string; subtitle: string }> = {
  ...BRAND_HEADERS,
  ...CAR_HEADERS,
  playstation: {
    title: 'Which PlayStation',
    accent: 'models?',
    subtitle: 'Consoles and handhelds, grouped by generation.',
  },
  xbox: { title: 'Which Xbox', accent: 'models?', subtitle: 'Two generations, four current SKUs.' },
  nintendo: {
    title: 'Which Nintendo',
    accent: 'models?',
    subtitle: 'Switch first, then the retro handhelds that still move.',
  },
  steamdeck: { title: 'Which Steam Deck', accent: 'models?', subtitle: 'LCD and OLED, split by storage.' },
  ipad: { title: 'Which iPad', accent: 'models?', subtitle: 'No brand step — iPad is already one maker.' },
  macbook: {
    title: 'Which MacBook',
    accent: 'models?',
    subtitle: 'Apple silicon first, older Intel bodies at the bottom.',
  },
  airpods: { title: 'Which AirPods', accent: 'models?', subtitle: 'Standard, Pro and Max — grouped by family.' },
  applewatch: { title: 'Which Watch', accent: 'models?', subtitle: 'Older bodies, current Series, and Ultra.' },
  gopro: { title: 'Which GoPro', accent: 'models?', subtitle: 'Hero generations plus the 360 bodies.' },
  dell: { title: 'Which Dell', accent: 'models?', subtitle: 'Grouped by line — pick the ones that actually resell.' },
  canon: { title: 'Which Canon', accent: 'models?', subtitle: 'Mirrorless, DSLR and compacts kept apart.' },
};

export default function ModelsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const { colors, shadows } = useTheme();
  const { state, patch } = useWizard();
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState('');

  const found = brandById(state.brandId);
  // whatever the user typed in becomes one more group of chips
  const brand = found ? withCustom(found, state.customModels[found.id]) : undefined;
  // landing here without a brand (deep link, web refresh) would be a blank screen
  if (!brand) return <Redirect href="/new-search" />;

  // the laptop and camera detours add a brand step, stretching the trail to six
  const detour = Boolean(productById(state.productId)?.brandStep);
  const total = stepTotal(state);
  const header = HEADERS[brand.id] ?? {
    title: 'Pick the',
    accent: 'models',
    subtitle: brand.lines
      ? 'Switch lines up top — your picks carry across all of them.'
      : 'Tap the ones worth flipping. Series headers select the whole row.',
  };

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


  const addCustom = () => {
    setDraft('');
    if (!brand) return;
    const name = trimTypedModel(brand, draft);
    if (!name) return;
    const already = brand.groups.some((g) => g.chips.some((c) => c.toLowerCase() === name.toLowerCase()));
    if (already) return;
    patch((s) => ({
      customModels: { ...s.customModels, [brand.id]: [...(s.customModels[brand.id] ?? []), name] },
      // a model you went to the trouble of typing is one you want
      models: { ...s.models, [`${brand.id}:${CUSTOM_GROUP}:${name}`]: true },
      // and on a brand with line pills, show the one holding it
      ...(found?.lines ? { line: CUSTOM_LINE } : {}),
    }));
  };

  const dropCustom = (name: string) => {
    if (!brand) return;
    patch((s) => {
      const models = { ...s.models };
      delete models[`${brand.id}:${CUSTOM_GROUP}:${name}`];
      return {
        models,
        customModels: {
          ...s.customModels,
          [brand.id]: (s.customModels[brand.id] ?? []).filter((n) => n !== name),
        },
      };
    });
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
              eyebrow={`Step ${detour ? 4 : 3} of ${total}`}
              step={{ filled: detour ? 4 : 3, total }}
              title={header.title}
              accent={header.accent}
              subtitle={header.subtitle}
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
                {group.title === 'Models' ? null : group.title === 'No series' ||
                  group.title === CUSTOM_GROUP ? (
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
                        {group.title === CUSTOM_GROUP ? (
                          <Pressable
                            onPress={() => dropCustom(chip)}
                            hitSlop={8}
                            accessibilityRole="button"
                            accessibilityLabel={`Remove ${chip}`}>
                            <CloseIcon color={on ? '#fff' : colors.textMuted} size={9} />
                          </Pressable>
                        ) : null}
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            );
          })}
          <View style={[styles.addCard, { backgroundColor: colors.accentFaint, borderColor: colors.accentChip }]}>
            <Text style={[styles.addTitle, { color: colors.textPrimary }]}>Model not listed?</Text>
            <Text style={[styles.addSub, { color: colors.textTertiary }]}>
              Type it and it joins this search like any other model.
            </Text>
            <View style={styles.addRow}>
              <TextInput
                value={draft}
                onChangeText={setDraft}
                onSubmitEditing={addCustom}
                submitBehavior="submit"
                returnKeyType="done"
                placeholder="e.g. Focus RS"
                placeholderTextColor={colors.textPlaceholder}
                autoCorrect={false}
                style={[styles.addInput, { backgroundColor: colors.surfaceCard, borderColor: colors.borderField, color: colors.textPrimary }]}
              />
              <Pressable
                onPress={addCustom}
                disabled={!draft.trim()}
                style={({ pressed }) => [
                  styles.addBtn,
                  { backgroundColor: colors.accentBrand, opacity: draft.trim() ? (pressed ? 0.85 : 1) : 0.4 },
                ]}>
                <Text style={styles.addBtnText}>Add</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>

      <WizardBar
        label="Set prices"
        onPress={() =>
          router.navigate(state.category === 'cars' ? '/new-search/car-details' : '/new-search/prices')
        }
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
  addCard: { borderRadius: radius.button, borderWidth: 1, padding: 13, gap: 4, marginTop: 4 },
  addTitle: { fontFamily: font.heavy, fontSize: 13 },
  addSub: { fontFamily: font.body, fontSize: 11, lineHeight: 16 },
  addRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 5 },
  addInput: {
    flex: 1,
    height: 42,
    borderRadius: radius.tile,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontFamily: font.bold,
    fontSize: 13.5,
  },
  addBtn: { paddingVertical: 11, paddingHorizontal: 16, borderRadius: radius.tile },
  addBtnText: { fontFamily: font.heavy, fontSize: 12.5, color: '#fff' },

  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
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
