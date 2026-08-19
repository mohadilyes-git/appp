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
import { CloseIcon } from '@/components/icons';
import { WizardBar, WizardHeader } from '@/components/wizard-chrome';
import { font, radius, tracking } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';
import { stepTotal, useWizard } from '@/lib/wizard-context';

export default function KeywordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const { colors } = useTheme();
  const { state, patch } = useWizard();
  const [focused, setFocused] = useState(false);

  const set = (part: Partial<typeof state.keyword>) =>
    patch((s) => ({ keyword: { ...s.keyword, ...part } }));

  const money = (v: string) => v.replace(/[^0-9]/g, '').slice(0, 6);

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
          <WizardHeader
            here="/new-search/keyword"
            eyebrow="Keyword"
            step={{ filled: stepTotal(state) - 1, total: stepTotal(state) }}
            title="Search in"
            accent="your own words"
            subtitle="Nothing in our lists fits? Type it and we will watch every marketplace for it."
            onBack={() => router.back()}
          />

          <View style={styles.section}>
            <Text style={[styles.label, { color: colors.textLabel }]}>Your keyword</Text>
            <View>
              <TextInput
                value={state.keyword.text}
                onChangeText={(text) => set({ text })}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="dyson v8 cordless"
                placeholderTextColor={colors.textPlaceholder}
                autoCorrect={false}
                autoCapitalize="none"
                autoFocus
                style={[
                  styles.keywordInput,
                  {
                    backgroundColor: focused ? colors.accentFaint : colors.surfaceField,
                    borderColor: focused ? colors.accentFill : colors.borderField,
                    color: colors.textPrimary,
                  },
                ]}
              />
              {state.keyword.text ? (
                <Pressable
                  onPress={() => set({ text: '' })}
                  hitSlop={10}
                  accessibilityRole="button"
                  accessibilityLabel="Clear"
                  style={[styles.clear, { backgroundColor: colors.textMuted }]}>
                  <CloseIcon color="#fff" size={10} />
                </Pressable>
              ) : null}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.label, { color: colors.textLabel }]}>Price range</Text>
            <View style={styles.rangeRow}>
              <TextInput
                value={state.keyword.min}
                onChangeText={(v) => set({ min: money(v) })}
                placeholder="0"
                placeholderTextColor={colors.textPlaceholder}
                keyboardType="number-pad"
                style={[styles.priceInput, { backgroundColor: colors.surfaceField, borderColor: colors.borderField, color: colors.textPrimary }]}
              />
              <Text style={[styles.to, { color: colors.textMuted }]}>to</Text>
              <TextInput
                value={state.keyword.max}
                onChangeText={(v) => set({ max: money(v) })}
                placeholder="Any price"
                placeholderTextColor={colors.textPlaceholder}
                keyboardType="number-pad"
                style={[styles.priceInput, { backgroundColor: colors.surfaceField, borderColor: colors.borderField, color: colors.textPrimary }]}
              />
            </View>
            <Text style={[styles.helper, { color: colors.textHint }]}>
              Keyword searches skip the per-model price step — one range covers it.
            </Text>
          </View>
        </ScrollView>
      </View>

      <WizardBar
        onPress={() => router.navigate('/new-search/filters')}
        disabled={!state.keyword.text.trim()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 18 },
  list: { gap: 18, paddingBottom: 110 },

  section: { gap: 8 },
  label: {
    fontFamily: font.heavy,
    fontSize: 10.5,
    letterSpacing: tracking(10.5, 0.08),
    textTransform: 'uppercase',
  },

  keywordInput: {
    height: 56,
    borderRadius: radius.button,
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 44,
    fontFamily: font.displayBold,
    fontSize: 17,
  },
  clear: {
    position: 'absolute',
    right: 12,
    top: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rangeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  to: { fontFamily: font.bold, fontSize: 12.5 },
  priceInput: {
    flex: 1,
    height: 46,
    borderRadius: radius.thumb,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontFamily: font.displayBold,
    fontSize: 15,
  },
  helper: { fontFamily: font.body, fontSize: 11, lineHeight: 16 },
});
