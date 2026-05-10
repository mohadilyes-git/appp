import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GlowBackground from '@/components/glow-background';
import PulseDot from '@/components/pulse-dot';

const RESEND_SECONDS = 24;

const C = {
  blue: '#2f6fed',
  blueLight: '#6f9dff',
  blueFocus: '#4a86ff',
  headline: '#eef1f6',
  textSecondary: 'rgba(255,255,255,.6)',
  textTertiary: 'rgba(255,255,255,.55)',
  resend: 'rgba(255,255,255,.45)',
  muted: 'rgba(255,255,255,.4)',
  helper: 'rgba(255,255,255,.35)',
  field: 'rgba(255,255,255,.06)',
  fieldFocus: 'rgba(74,134,255,.08)',
  chip: 'rgba(255,255,255,.08)',
  borderSubtle: 'rgba(255,255,255,.14)',
  borderFilled: 'rgba(255,255,255,.35)',
};

export default function VerifyCodeScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const { dial, phone } = useLocalSearchParams<{ dial?: string; phone?: string }>();

  const [code, setCode] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const inputRef = useRef<TextInput>(null);

  const isComplete = code.length === 6;
  const activeIndex = code.length;

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/verify-phone');
  }

  function resend() {
    if (secondsLeft > 0) return;
    setSecondsLeft(RESEND_SECONDS);
  }

  const sentTo = dial && phone ? `${dial} ${phone}` : 'your number';

  return (
    <View style={styles.root}>
      <GlowBackground width={width} height={height} topGlow={0.4} bottomGlow={0.6} halo={false} />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={styles.safe}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {/* top row */}
          <View style={styles.topRow}>
            <Pressable
              style={({ pressed }) => [styles.backBtn, pressed && styles.backBtnPressed]}
              onPress={goBack}
              accessibilityLabel="Back"
              hitSlop={8}>
              <Text style={styles.backGlyph}>‹</Text>
            </Pressable>
            <Text style={styles.step}>Step 3 of 3</Text>
          </View>

          {/* header */}
          <View style={styles.header}>
            <View style={styles.brandRow}>
              <PulseDot />
              <Text style={styles.brandLabel}>AlertsFlip</Text>
            </View>
            <Text style={styles.headline}>
              <Text style={{ color: C.headline }}>Enter the </Text>
              <Text style={{ color: C.blueLight }}>code</Text>
            </Text>
            <Text style={styles.subhead}>
              Sent to {sentTo} ·{' '}
              <Text style={styles.editLink} onPress={goBack}>
                Edit
              </Text>
            </Text>
          </View>

          {/* code boxes with one hidden input over them */}
          <View style={styles.codeArea}>
            <Pressable style={styles.codeRow} onPress={() => inputRef.current?.focus()}>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <View
                  key={i}
                  style={[
                    styles.codeBox,
                    code[i] != null && styles.codeBoxFilled,
                    i === activeIndex && !isComplete && styles.codeBoxActive,
                  ]}>
                  <Text style={styles.codeDigit}>{code[i] ?? ''}</Text>
                </View>
              ))}
              <TextInput
                ref={inputRef}
                style={styles.hiddenInput}
                value={code}
                onChangeText={(v) => setCode(v.replace(/\D/g, '').slice(0, 6))}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoComplete="sms-otp"
                caretHidden
                autoFocus
              />
            </Pressable>

            <Text style={styles.resendLine}>
              Didn't get it?{' '}
              <Text style={secondsLeft > 0 ? styles.resendWaiting : styles.resendLink} onPress={resend}>
                Resend
              </Text>
              {secondsLeft > 0 ? (
                <Text style={styles.countdown}>
                  {'  '}(0:{String(secondsLeft).padStart(2, '0')})
                </Text>
              ) : null}
            </Text>
          </View>

          {/* action */}
          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [
                styles.primaryBtn,
                { opacity: isComplete ? 1 : 0.45 },
                pressed && isComplete && styles.pressed,
              ]}
              disabled={!isComplete}>
              <Text style={styles.primaryBtnText}>Verify</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#07080c' },
  safe: { flex: 1 },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.borderSubtle,
    backgroundColor: C.chip,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnPressed: { backgroundColor: 'rgba(255,255,255,.16)' },
  backGlyph: { color: '#fff', fontSize: 18, marginTop: -2 },
  step: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11.5,
    letterSpacing: 11.5 * 0.1,
    textTransform: 'uppercase',
    color: C.muted,
  },

  header: { paddingHorizontal: 26, paddingTop: 14 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  brandLabel: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    letterSpacing: 11 * 0.22,
    textTransform: 'uppercase',
    color: C.textSecondary,
  },
  headline: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 31,
    lineHeight: 35,
    letterSpacing: -0.62,
    marginTop: 10,
  },
  subhead: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13.5,
    lineHeight: 20,
    color: C.textTertiary,
    marginTop: 6,
  },
  editLink: { fontFamily: 'Manrope_700Bold', color: C.blueLight },

  codeArea: { paddingHorizontal: 26, paddingTop: 30 },
  codeRow: { flexDirection: 'row', gap: 9, justifyContent: 'center' },
  codeBox: {
    width: 44,
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.borderSubtle,
    backgroundColor: C.field,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeBoxFilled: { borderColor: C.borderFilled },
  codeBoxActive: { borderColor: C.blueFocus, backgroundColor: C.fieldFocus },
  codeDigit: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 22, color: '#fff' },
  hiddenInput: { ...StyleSheet.absoluteFillObject, opacity: 0 },

  resendLine: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12.5,
    color: C.resend,
    textAlign: 'center',
    marginTop: 18,
  },
  resendLink: { fontFamily: 'Manrope_700Bold', color: C.blueLight },
  resendWaiting: { fontFamily: 'Manrope_700Bold', color: C.resend },
  countdown: { color: C.helper },

  actions: { marginTop: 'auto', paddingHorizontal: 22, paddingTop: 16, paddingBottom: 8 },
  primaryBtn: {
    height: 52,
    borderRadius: 16,
    backgroundColor: C.blue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2f6fff',
    shadowOpacity: 0.35,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  primaryBtnText: { fontFamily: 'Manrope_700Bold', fontSize: 15.5, color: '#fff' },
  pressed: { opacity: 0.85, transform: [{ translateY: -1 }] },
});
