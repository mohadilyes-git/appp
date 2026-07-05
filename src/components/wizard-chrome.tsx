import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ChevronLeftIcon, CloseIcon } from '@/components/icons';
import { font, radius, tracking } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';

// the saturated blue stays the same in both themes, white text sits on it either way
const WIZARD_BLUE = '#2f6fed';

type HeaderProps = {
  eyebrow: string;
  step: { filled: number; total: number };
  title: string;
  accent: string;
  subtitle: string;
  onBack: () => void;
  // the first screen closes the wizard instead of stepping back
  close?: boolean;
};

export function WizardHeader({ eyebrow, step, title, accent, subtitle, onBack, close }: HeaderProps) {
  const { colors, shadows } = useTheme();

  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel={close ? 'Close' : 'Back'}
          hitSlop={8}
          style={({ pressed }) => [
            styles.backBtn,
            { backgroundColor: colors.surfaceCard, borderColor: colors.borderButton },
            shadows.button,
            pressed && { opacity: 0.7 },
          ]}>
          {close ? (
            <CloseIcon color={colors.textMuted} size={14} />
          ) : (
            <ChevronLeftIcon color={colors.textPrimary} />
          )}
        </Pressable>
        <Text style={[styles.eyebrow, { color: colors.textMuted }]}>{eyebrow}</Text>
      </View>

      <View style={styles.progress}>
        {Array.from({ length: step.total }, (_, i) => (
          <View
            key={i}
            style={[
              styles.segment,
              { backgroundColor: i < step.filled ? colors.accentBrand : colors.surfaceWashStrong },
            ]}
          />
        ))}
      </View>

      <View style={styles.titleBlock}>
        <Text style={styles.titleLine}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>{title} </Text>
          <Text style={[styles.title, { color: colors.accentText }]}>{accent}</Text>
        </Text>
        <Text style={[styles.subtitle, { color: colors.textTertiary }]}>{subtitle}</Text>
      </View>
    </View>
  );
}

type BarProps = {
  label?: string;
  onPress: () => void;
  disabled?: boolean;
  onSkip?: () => void;
};

export function WizardBar({ label = 'Continue', onPress, disabled, onSkip }: BarProps) {
  const { colors, shadows } = useTheme();

  return (
    <View style={styles.bar}>
      {/* the fade reaches full opacity before the button starts, a long ramp ghosts */}
      <LinearGradient
        colors={[colors.barFadeFrom, colors.barFadeTo]}
        locations={[0, 0.14]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.barRow}>
        {onSkip ? (
          <Pressable onPress={onSkip} hitSlop={8} style={({ pressed }) => [styles.skip, pressed && { opacity: 0.7 }]}>
            <Text style={[styles.skipText, { color: colors.textTertiary }]}>Skip</Text>
          </Pressable>
        ) : null}
        <Pressable
          onPress={onPress}
          disabled={disabled}
          style={({ pressed }) => [
            styles.continue,
            { opacity: disabled ? 0.45 : 1 },
            shadows.cta,
            pressed && !disabled && styles.lifted,
          ]}>
          <Text style={styles.continueText}>{label}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { gap: 14 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyebrow: {
    fontFamily: font.heavy,
    fontSize: 11,
    letterSpacing: tracking(11, 0.12),
    textTransform: 'uppercase',
  },

  progress: { flexDirection: 'row', gap: 5, marginTop: 2 },
  segment: { flex: 1, height: 4, borderRadius: 2 },

  titleBlock: { gap: 5, marginTop: 6 },
  titleLine: { lineHeight: 28 },
  title: {
    fontFamily: font.display,
    fontSize: 25,
    letterSpacing: tracking(25, -0.02),
  },
  subtitle: { fontFamily: font.body, fontSize: 12.5, lineHeight: 18.75 },

  bar: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingTop: 14, paddingBottom: 26 },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 18 },
  skip: { height: 52, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'center' },
  skipText: { fontFamily: font.heavy, fontSize: 14.5 },
  continue: {
    flex: 1,
    height: 52,
    borderRadius: radius.button,
    backgroundColor: WIZARD_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: { fontFamily: font.heavy, fontSize: 15.5, color: '#fff' },
  lifted: { transform: [{ translateY: -1 }] },
});
