import Slider from '@react-native-community/slider';
import { Redirect, useNavigation, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
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
import { ChevronRightIcon, CloseIcon } from '@/components/icons';
import { WizardBar, WizardHeader } from '@/components/wizard-chrome';
import { CheckIcon, PinIcon } from '@/components/wizard-icons';
import { compileWizard } from '@/lib/search-compiler';
import { createSearches, deleteSearches } from '@/lib/searches-db';
import { font, radius, tracking } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';
import { stepTotal, useStaging, useWizard } from '@/lib/wizard-context';
import { screenName, wizardTrail } from '@/lib/wizard-trail';

const RADIUS_CHOICES = [5, 10, 25, 50, 60];
const MAX_MILES = 60;

// only the marketplaces the scrapers actually cover, one per search
const PLATFORMS = [
  { id: 'facebook', name: 'Facebook Marketplace', sub: 'Local pickup, fastest alerts' },
  { id: 'ebay', name: 'eBay', sub: 'Buy it now and auctions' },
  { id: 'gumtree', name: 'Gumtree', sub: 'Local, UK only' },
];

type Suggestion = { label: string; lat: number; lng: number };

// free openstreetmap geocoder, no key, covers everywhere
async function geocode(query: string): Promise<Suggestion[]> {
  const res = await fetch(
    `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=6&lang=en`,
  );
  const json = await res.json();
  const seen = new Set<string>();
  const out: Suggestion[] = [];
  for (const f of json.features ?? []) {
    const p = f.properties ?? {};
    const label = [p.name, p.city ?? p.state, p.country].filter(Boolean).join(', ');
    const [lng, lat] = f.geometry?.coordinates ?? [];
    if (!label || lat == null || seen.has(label)) continue;
    seen.add(label);
    out.push({ label, lat, lng });
  }
  return out;
}

export default function FiltersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const { colors, shadows, resolved } = useTheme();
  const { state, patch } = useWizard();
  const { staging, setStaging } = useStaging();
  const scrollRef = useRef<ScrollView>(null);
  const navigation = useNavigation();

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  // remembers the label the user tapped, so it doesn't re-trigger the search
  const pickedRef = useRef(state.lat != null ? state.location : '');
  const requestRef = useRef(0);

  // the slider redraws on its own while dragging, the draft only takes the final value
  const [miles, setMiles] = useState(state.radiusMiles);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const query = state.location.trim();
    if (query.length < 2 || query === pickedRef.current) {
      setSuggestions([]);
      return;
    }
    const id = ++requestRef.current;
    const timer = setTimeout(() => {
      geocode(query)
        .then((found) => {
          if (requestRef.current === id) setSuggestions(found);
        })
        .catch(() => {
          if (requestRef.current === id) setSuggestions([]);
        });
    }, 350);
    return () => clearTimeout(timer);
  }, [state.location]);

  // a reopened search arrives here as one push, and the run it came from is
  // slotted in behind this screen so Back walks the steps like a fresh one.
  // inserting beats pushing them one at a time: expo-router works out every
  // queued push against the state before the first of them lands, so a loop
  // of pushes stacks whole wizards on the root instead of steps inside this
  useEffect(() => {
    if (!staging) return;
    setStaging(false);
    const behind = wizardTrail(state).slice(0, -1).map(screenName);
    const stack = navigation.getState();
    if (!stack || behind.length === 0) return;
    // the screen already up keeps its key, so it is never rebuilt underneath us
    const here = stack.routes[stack.index] ?? stack.routes[stack.routes.length - 1];
    // typed routes want literal screen names, and these are read off the trail
    navigation.reset({
      ...stack,
      index: behind.length,
      routes: [...behind.map((name) => ({ name })), here],
    } as Parameters<typeof navigation.reset>[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // landing here cold (deep link, web refresh) means the wizard never started
  if (state.mode === 'models' ? !state.brandId : !state.keyword.text.trim()) {
    return <Redirect href="/new-search" />;
  }

  const pickPlace = (s: Suggestion) => {
    pickedRef.current = s.label;
    patch({ location: s.label, lat: s.lat, lng: s.lng });
    setSuggestions([]);
    Keyboard.dismiss();
  };

  const closePlatforms = () => setPlatformOpen(false);
  // a tap on nothing means "I'm done here": shut the list and drop the keyboard
  const dismissAll = () => {
    setPlatformOpen(false);
    setSuggestions([]);
    Keyboard.dismiss();
  };

  const setRadius = (value: number) => {
    closePlatforms();
    setMiles(value);
    patch({ radiusMiles: value });
  };

  // a fresh chip row pushes the input down, follow it so typing stays visible
  const keepInputVisible = () => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);
  };

  const startSearch = async () => {
    // no coordinates means no radius filter, the search has to know where to look
    if (state.lat == null) {
      Alert.alert('Where should we look?', 'Search for your area and pick it from the list.');
      return;
    }
    const built = compileWizard(state);
    if (!built) {
      Alert.alert('Nothing to save', 'None of those models were made in the years you picked.');
      return;
    }
    setSaving(true);
    try {
      await createSearches(built.rows);
      // the replacement is in before the original goes, so a failure loses nothing
      if (state.editingIds?.length) await deleteSearches(state.editingIds);
      if (built.skipped.length) {
        Alert.alert(
          'Some models were left out',
          `${built.skipped.join(', ')} was never made in the years you picked, so it was skipped.`,
        );
      }
      // home refetches on focus, the new card is already there. dismissTo pops
      // back to the home already in the stack, replace would stack a second one
      router.dismissTo('/');
    } catch (e) {
      Alert.alert("Couldn't start the search", e instanceof Error ? e.message : 'Try again in a moment.');
      setSaving(false);
    }
  };

  const editing = Boolean(state.editingIds?.length);
  const currentPlatform = PLATFORMS.find((p) => p.id === state.platform) ?? PLATFORMS[0];
  // a list has to lift off whatever it covers or it reads as part of it
  const listSkin = {
    backgroundColor: resolved === 'dark' ? colors.surfaceRaised : colors.surfaceCard,
    borderColor: colors.accentFill,
  };

  return (
    <View style={styles.screen}>
      <AppBackground width={width} height={height} />

      <View style={styles.content}>
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={[styles.scrollPad, { paddingTop: insets.top + 8 }]}>
          <Pressable onPress={dismissAll} accessible={false} style={styles.listContent}>
          <View style={styles.headerWrap}>
            <WizardHeader
              here="/new-search/filters"
              eyebrow={editing ? 'Edit search' : 'Last step'}
              step={{ filled: stepTotal(state), total: stepTotal(state) }}
              title="Where and"
              accent="what to skip"
              subtitle={
                editing
                  ? 'Change anything here, or step back for the models and prices.'
                  : 'Last step — this part is the same for every category.'
              }
              onBack={() => router.back()}
            />
          </View>

          <View style={[styles.section, styles.zLocation]}>
            <Text style={[styles.label, { color: colors.textLabel }]}>Location</Text>
            <View style={styles.anchor}>
            <View
              style={[styles.locationField, { backgroundColor: colors.surfaceField, borderColor: colors.borderField }]}>
              <PinIcon color={colors.accentText} />
              <TextInput
                value={state.location}
                onChangeText={(v) => {
                  // editing means the pick is stale, so the geocoder may run again
                  pickedRef.current = '';
                  patch({ location: v, lat: null, lng: null });
                }}
                onFocus={closePlatforms}
                placeholder="Search any city or area"
                placeholderTextColor={colors.textPlaceholder}
                autoCorrect={false}
                style={[styles.locationInput, { color: colors.textPrimary }]}
              />
              {state.lat != null ? <CheckIcon color={colors.accentText} size={13} /> : null}
            </View>
            {suggestions.length > 0 ? (
              <View style={[styles.suggestCard, styles.floatingPlace, listSkin, shadows.panel]}>
                {suggestions.map((s, i) => (
                  <Pressable
                    key={s.label}
                    onPress={() => pickPlace(s)}
                    style={({ pressed }) => [
                      styles.suggestRow,
                      i > 0 && { borderTopWidth: 1, borderTopColor: colors.surfaceWash },
                      pressed && { backgroundColor: colors.surfaceWash },
                    ]}>
                    <PinIcon color={colors.textMuted} size={13} />
                    <Text style={[styles.suggestText, { color: colors.textPrimary }]} numberOfLines={1}>
                      {s.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ) : null}
            </View>
          </View>

          <View style={[styles.section, styles.zRadius]}>
            <View style={styles.labelRow}>
              <Text style={[styles.label, { color: colors.textLabel }]}>Radius</Text>
              <Text style={[styles.radiusValue, { color: colors.accentText }]}>{miles} miles</Text>
            </View>
            <Slider
              value={state.radiusMiles}
              minimumValue={1}
              maximumValue={MAX_MILES}
              step={1}
              onValueChange={setMiles}
              onSlidingComplete={(v) => patch({ radiusMiles: v })}
              minimumTrackTintColor={colors.accentBrand}
              maximumTrackTintColor={colors.toggleOff}
              thumbTintColor={colors.accentBrand}
              style={styles.slider}
            />
            <View style={styles.radiusRow}>
              {RADIUS_CHOICES.map((choice) => {
                const on = miles === choice;
                return (
                  <Pressable
                    key={choice}
                    onPress={() => setRadius(choice)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: on }}
                    style={[
                      styles.radiusPill,
                      on
                        ? { backgroundColor: colors.accentBrand, borderColor: colors.accentBrand }
                        : { backgroundColor: colors.surfaceCard, borderColor: colors.borderButton },
                    ]}>
                    <Text style={[styles.radiusPillText, { color: on ? '#fff' : colors.textSecondary }]}>
                      {choice} mi
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={[styles.section, styles.zPlatform]}>
            <Text style={[styles.label, { color: colors.textLabel }]}>Platform</Text>
            <View style={styles.anchor}>
            <Pressable
              onPress={() => {
                Keyboard.dismiss();
                setSuggestions([]);
                setPlatformOpen((open) => !open);
              }}
              accessibilityRole="button"
              accessibilityState={{ expanded: platformOpen }}
              style={[styles.platformTrigger, { backgroundColor: colors.surfaceField, borderColor: colors.borderField }]}>
              <Text style={[styles.platformName, { color: colors.textPrimary }]}>
                {currentPlatform.name}
              </Text>
              <View style={platformOpen ? styles.chevronUp : styles.chevronDown}>
                <ChevronRightIcon color={colors.textMuted} size={13} />
              </View>
            </Pressable>
            {platformOpen ? (
              <View style={[styles.platformCard, styles.floating, listSkin, shadows.panel]}>
                {PLATFORMS.map((p, i) => {
                  const on = state.platform === p.id;
                  return (
                    <Pressable
                      key={p.id}
                      onPress={() => {
                        patch({ platform: p.id });
                        setPlatformOpen(false);
                      }}
                      accessibilityRole="button"
                      accessibilityState={{ selected: on }}
                      style={[styles.platformRow, i > 0 && { borderTopWidth: 1, borderTopColor: colors.surfaceWash }]}>
                      <View style={styles.platformText}>
                        <Text style={[styles.platformName, { color: colors.textPrimary }]}>{p.name}</Text>
                        <Text style={[styles.platformSub, { color: colors.textLabel }]}>{p.sub}</Text>
                      </View>
                      <View
                        style={[
                          styles.checkRing,
                          on
                            ? { backgroundColor: colors.accentBrand, borderColor: colors.accentBrand }
                            : { borderColor: colors.toggleOff },
                        ]}>
                        {on ? <CheckIcon color="#fff" size={11} /> : null}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            ) : null}
            </View>
          </View>

          <WordSection
            label="Title must include"
            words={state.includeWords}
            onChange={(words) => patch({ includeWords: words })}
            onAdded={keepInputVisible}
            helper="Listings without every word are ignored."
            tone="include"
          />

          <WordSection
            label="Don't show listings with"
            words={state.excludeWords}
            onChange={(words) => patch({ excludeWords: words })}
            onAdded={keepInputVisible}
            tone="exclude"
          />
          </Pressable>
        </ScrollView>
      </View>

      <WizardBar
        label={
          saving
            ? 'Saving…'
            : state.editingIds?.length
              ? 'Save this search'
              : 'Start this search'
        }
        onPress={startSearch}
        disabled={saving}
        hero
      />
    </View>
  );
}

type WordSectionProps = {
  label: string;
  words: string[];
  onChange: (words: string[]) => void;
  onAdded: () => void;
  helper?: string;
  tone: 'include' | 'exclude';
};

function WordSection({ label, words, onChange, onAdded, helper, tone }: WordSectionProps) {
  const { colors, resolved } = useTheme();
  const [draft, setDraft] = useState('');

  // the blue chip tints sit between theme tokens, so the design values are spelled out
  const chipColors =
    tone === 'include'
      ? {
          backgroundColor: resolved === 'dark' ? 'rgba(122,162,255,.14)' : colors.accentTint,
          borderColor: resolved === 'dark' ? colors.accentChip : 'rgba(47,111,237,.22)',
          text: colors.accentText,
        }
      : { backgroundColor: colors.negativeTint, borderColor: colors.negativeBorder, text: colors.negative };

  const add = () => {
    const word = draft.trim().toLowerCase();
    setDraft('');
    if (!word || words.includes(word)) return;
    onChange([...words, word]);
    onAdded();
  };

  return (
    <View style={styles.section}>
      <Text style={[styles.label, { color: colors.textLabel }]}>{label}</Text>
      {words.length > 0 ? (
        <View style={styles.chips}>
          {words.map((word) => (
            <View
              key={word}
              style={[styles.chip, { backgroundColor: chipColors.backgroundColor, borderColor: chipColors.borderColor }]}>
              <Text style={[styles.chipText, { color: chipColors.text }]}>{word}</Text>
              <Pressable
                onPress={() => onChange(words.filter((w) => w !== word))}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${word}`}
                style={styles.chipRemove}>
                <CloseIcon color={chipColors.text} size={10} />
              </Pressable>
            </View>
          ))}
        </View>
      ) : null}
      <TextInput
        value={draft}
        onChangeText={setDraft}
        onSubmitEditing={add}
        submitBehavior="submit"
        returnKeyType="done"
        placeholder="Add a word and press enter"
        placeholderTextColor={colors.textPlaceholder}
        autoCapitalize="none"
        autoCorrect={false}
        style={[
          styles.wordInput,
          { backgroundColor: colors.surfaceField, borderColor: colors.borderField, color: colors.textPrimary },
        ]}
      />
      {helper ? <Text style={[styles.helper, { color: colors.textHint }]}>{helper}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 18 },
  scrollPad: { paddingBottom: 110 },
  anchor: { position: 'relative', zIndex: 30 },
  // a section holding a floating list has to outrank the sections drawn after it
  zLocation: { zIndex: 40 },
  zRadius: { zIndex: 30 },
  zPlatform: { zIndex: 20 },
  floating: { position: 'absolute', top: 56, left: 0, right: 0, zIndex: 30, elevation: 8, borderWidth: 1.5 },
  floatingPlace: { position: 'absolute', top: 56, left: 0, right: 0, zIndex: 30, elevation: 8, borderWidth: 1.5 },
  listContent: { gap: 16 },
  headerWrap: { marginBottom: 0 },

  section: { gap: 8 },
  label: {
    fontFamily: font.heavy,
    fontSize: 10.5,
    letterSpacing: tracking(10.5, 0.08),
    textTransform: 'uppercase',
  },
  labelRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },

  locationField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    height: 50,
    borderRadius: radius.thumb,
    borderWidth: 1,
    paddingHorizontal: 14,
  },
  locationInput: { flex: 1, fontFamily: font.bold, fontSize: 14.5, paddingVertical: 0 },
  suggestCard: { borderRadius: radius.thumb, borderWidth: 1, overflow: 'hidden' },
  suggestRow: { flexDirection: 'row', alignItems: 'center', gap: 9, paddingVertical: 12, paddingHorizontal: 13 },
  suggestText: { flex: 1, fontFamily: font.bold, fontSize: 13 },

  radiusValue: { fontFamily: font.displayBold, fontSize: 15 },
  slider: { width: '100%', height: 34 },
  radiusRow: { flexDirection: 'row', gap: 7 },
  radiusPill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  radiusPillText: { fontFamily: font.heavy, fontSize: 11.5 },

  platformTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderRadius: radius.thumb,
    borderWidth: 1,
    paddingHorizontal: 14,
  },
  chevronDown: { transform: [{ rotate: '90deg' }] },
  chevronUp: { transform: [{ rotate: '270deg' }] },
  platformCard: { borderRadius: radius.card, borderWidth: 1, overflow: 'hidden' },
  platformRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13, paddingHorizontal: 14 },
  platformText: { flex: 1, gap: 2, minWidth: 0 },
  platformName: { fontFamily: font.heavy, fontSize: 13.5 },
  platformSub: { fontFamily: font.body, fontSize: 11 },
  checkRing: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 7,
    paddingLeft: 12,
    paddingRight: 9,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  chipText: { fontFamily: font.heavy, fontSize: 12 },
  chipRemove: { opacity: 0.65 },

  wordInput: {
    height: 46,
    borderRadius: radius.thumb,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontFamily: font.body,
    fontSize: 13.5,
  },
  helper: { fontFamily: font.body, fontSize: 11, lineHeight: 16 },
});
