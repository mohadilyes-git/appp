import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
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

import CountryPicker from '@/components/country-picker';
import GlowBackground from '@/components/glow-background';
import PulseDot from '@/components/pulse-dot';
import { COUNTRIES, type Country } from '@/lib/countries';
import { supabase } from '@/lib/supabase';

const C = {
  blue: '#2f6fed',
  blueLight: '#6f9dff',
  blueFocus: '#4a86ff',
  headline: '#eef1f6',
  textSecondary: 'rgba(255,255,255,.6)',
  textTertiary: 'rgba(255,255,255,.55)',
  label: 'rgba(255,255,255,.5)',
  placeholder: 'rgba(255,255,255,.34)',
  field: 'rgba(255,255,255,.06)',
  fieldFocus: 'rgba(74,134,255,.08)',
  chip: 'rgba(255,255,255,.08)',
  borderSubtle: 'rgba(255,255,255,.14)',
  borderButton: 'rgba(255,255,255,.16)',
};

export default function LoginScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const [mode, setMode] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [country, setCountry] = useState<Country>(
    COUNTRIES.find((c) => c.iso === 'US') ?? COUNTRIES[0],
  );
  const [pickerOpen, setPickerOpen] = useState(false);

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/welcome');
  }

  async function logIn() {
    if (mode === 'phone') {
      // phone auth needs an SMS provider, not wired up yet
      Alert.alert('Not available yet', 'Phone login is coming soon. Use email instead.');
      return;
    }
    if (!email.trim() || !password) {
      Alert.alert('Missing details', 'Enter your email and password.');
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setSubmitting(false);
    if (error) Alert.alert('Log in failed', error.message);
  }

  return (
    <View style={styles.root}>
      <GlowBackground width={width} height={height} topGlow={0.4} bottomGlow={0.6} halo={false} />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={styles.safe}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {/* back */}
          <View style={styles.backRow}>
            <Pressable
              style={({ pressed }) => [styles.backBtn, pressed && styles.backBtnPressed]}
              onPress={goBack}
              accessibilityLabel="Back"
              hitSlop={8}>
              <Text style={styles.backGlyph}>‹</Text>
            </Pressable>
          </View>

          {/* header */}
          <View style={styles.header}>
            <View style={styles.brandRow}>
              <PulseDot />
              <Text style={styles.brandLabel}>AlertsFlip</Text>
            </View>
            <Text style={styles.headline}>
              <Text style={{ color: C.headline }}>Log in with </Text>
              <Text style={{ color: C.blueLight }}>{mode}</Text>
            </Text>
            <Text style={styles.subhead}>
              {mode === 'phone'
                ? 'Your number and password — that’s it.'
                : 'Your email and password — that’s it.'}
            </Text>
          </View>

          {/* form */}
          <View style={styles.form}>
            {mode === 'phone' ? (
              <>
                <Text style={styles.fieldLabel}>Phone number</Text>
                <View style={styles.phoneField}>
                  <Pressable style={styles.countryBtn} onPress={() => setPickerOpen(true)}>
                    <Text style={styles.countryText}>{country.dial}</Text>
                    <Text style={styles.countryCaret}>▾</Text>
                  </Pressable>
                  <View style={styles.divider} />
                  <TextInput
                    style={styles.phoneInput}
                    keyboardType="phone-pad"
                    autoComplete="tel"
                    placeholder="(555) 013-2764"
                    placeholderTextColor={C.placeholder}
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.fieldLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  placeholder="you@example.com"
                  placeholderTextColor={C.placeholder}
                  value={email}
                  onChangeText={setEmail}
                />
              </>
            )}

            <Text style={[styles.fieldLabel, { marginTop: 14 }]}>Password</Text>
            <View>
              <TextInput
                style={[styles.input, styles.passwordInput, passwordFocused && styles.inputFocused]}
                secureTextEntry={!showPassword}
                autoComplete="current-password"
                placeholder="Your password"
                placeholderTextColor={C.placeholder}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <Pressable
                style={styles.showToggle}
                onPress={() => setShowPassword((v) => !v)}
                hitSlop={8}>
                <Text style={styles.showToggleText}>{showPassword ? 'Hide' : 'Show'}</Text>
              </Pressable>
            </View>

            <Pressable
              style={styles.forgot}
              onPress={() => Alert.alert('Not available yet', 'Password recovery is coming soon.')}
              hitSlop={6}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </Pressable>
          </View>

          {/* actions, pinned to the bottom */}
          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
              onPress={logIn}
              disabled={submitting}>
              <Text style={styles.primaryBtnText}>{submitting ? 'Logging in…' : 'Log in'}</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.secondaryBtn, pressed && styles.pressed]}
              onPress={() => setMode((m) => (m === 'phone' ? 'email' : 'phone'))}>
              <Text style={styles.secondaryBtnText}>
                {mode === 'phone' ? 'Use email instead' : 'Use phone instead'}
              </Text>
            </Pressable>

            <Pressable
              style={styles.textBtn}
              onPress={() => router.replace('/register')}
              hitSlop={6}>
              <Text style={styles.textBtnLabel}>
                New here? <Text style={styles.textBtnLink}>Create account</Text>
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <CountryPicker
        visible={pickerOpen}
        selected={country}
        onSelect={(c) => {
          setCountry(c);
          setPickerOpen(false);
        }}
        onClose={() => setPickerOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#07080c' },
  safe: { flex: 1 },

  backRow: { paddingHorizontal: 20, paddingTop: 14 },
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

  form: { paddingHorizontal: 26, paddingTop: 26 },
  fieldLabel: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11.5,
    letterSpacing: 11.5 * 0.08,
    textTransform: 'uppercase',
    color: C.label,
    marginBottom: 6,
  },
  phoneField: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.borderSubtle,
    backgroundColor: C.field,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryBtn: {
    height: '100%',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  countryText: { fontFamily: 'Manrope_700Bold', fontSize: 15, color: '#fff' },
  countryCaret: { fontSize: 9, color: C.label },
  divider: { width: 1, height: 26, backgroundColor: C.borderSubtle },
  phoneInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontFamily: 'Manrope_400Regular',
    fontSize: 15,
    color: '#fff',
  },
  input: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.borderSubtle,
    backgroundColor: C.field,
    paddingHorizontal: 16,
    fontFamily: 'Manrope_400Regular',
    fontSize: 15,
    color: '#fff',
  },
  passwordInput: { paddingRight: 62 },
  inputFocused: { borderColor: C.blueFocus, backgroundColor: C.fieldFocus },
  showToggle: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    padding: 6,
  },
  showToggleText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 12.5, color: C.blueLight },
  forgot: { alignSelf: 'flex-end', marginTop: 10 },
  forgotText: { fontFamily: 'Manrope_700Bold', fontSize: 12.5, color: C.blueLight },

  actions: { marginTop: 'auto', gap: 10, paddingHorizontal: 22, paddingTop: 16, paddingBottom: 8 },
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
  secondaryBtn: {
    height: 52,
    borderRadius: 16,
    backgroundColor: C.field,
    borderWidth: 1,
    borderColor: C.borderButton,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: { fontFamily: 'Manrope_700Bold', fontSize: 15.5, color: '#fff' },
  textBtn: { alignItems: 'center', padding: 6 },
  textBtnLabel: { fontFamily: 'Manrope_600SemiBold', fontSize: 13.5, color: C.textSecondary },
  textBtnLink: { fontFamily: 'Manrope_800ExtraBold', color: C.blueLight },
  pressed: { opacity: 0.85, transform: [{ translateY: -1 }] },
});
