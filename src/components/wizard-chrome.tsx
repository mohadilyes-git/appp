import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Keyboard, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { ChevronLeftIcon, CloseIcon } from '@/components/icons';
import { font, gradients, radius, tracking } from '@/lib/theme';
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
        <Text style={[styles.eyebrow, { color: colors.textHint }]}>{eyebrow}</Text>
      </View>

      {/* an edit is one screen, not a run, so it has no progress to show */}
      {step.total > 0 ? (
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
      ) : null}

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
  // the last step's button gets the hero gradient instead of the flat blue
  hero?: boolean;
};

export function WizardBar({ label = 'Continue', onPress, disabled, hero }: BarProps) {
  const { colors, shadows } = useTheme();
  const [keyboardUp, setKeyboardUp] = useState(false);

  // android resizes the window, which would park this bar on top of the
  // focused input. ios slides the keyboard over it instead, nothing to do.
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardUp(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardUp(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  if (keyboardUp) return null;

  return (
    // box-none keeps the empty parts of the band scrollable and tappable
    <View style={styles.bar} pointerEvents="box-none">
      {/* the fade reaches full opacity before the button starts, a long ramp ghosts */}
      <LinearGradient
        colors={[colors.barFadeFrom, colors.barFadeTo]}
        locations={[0, 0.14]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <View style={styles.barRow}>
        <Pressable
          onPress={onPress}
          disabled={disabled}
          style={({ pressed }) => [
            styles.continue,
            hero && styles.continueHero,
            { opacity: disabled ? 0.45 : 1 },
            shadows.cta,
            pressed && !disabled && styles.lifted,
          ]}>
          {hero ? (
            <LinearGradient
              colors={gradients.hero}
              locations={gradients.heroStops}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.8, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
          ) : null}
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
  barRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18 },
  continue: {
    flex: 1,
    height: 52,
    borderRadius: radius.button,
    backgroundColor: WIZARD_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  continueHero: { height: 54, borderRadius: radius.card },
  continueText: { fontFamily: font.heavy, fontSize: 15.5, color: '#fff' },
  lifted: { transform: [{ translateY: -1 }] },
});
