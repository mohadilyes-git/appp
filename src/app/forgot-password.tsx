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

const C = {
  blue: '#2f6fed',
  blueLight: '#6f9dff',
  blueFocus: '#4a86ff',
  headline: '#eef1f6',
  textSecondary: 'rgba(255,255,255,.6)',
  textTertiary: 'rgba(255,255,255,.55)',
  label: 'rgba(255,255,255,.5)',
  switchLine: 'rgba(255,255,255,.45)',
  placeholder: 'rgba(255,255,255,.34)',
  field: 'rgba(255,255,255,.06)',
  fieldFocus: 'rgba(74,134,255,.08)',
  chip: 'rgba(255,255,255,.08)',
  borderSubtle: 'rgba(255,255,255,.14)',
};

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState<Country>(
    COUNTRIES.find((c) => c.iso === 'US') ?? COUNTRIES[0],
  );
  const [pickerOpen, setPickerOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/login');
  }

  function submit() {
    if (method === 'email') {
      if (!email.trim() || !email.includes('@')) {
        Alert.alert('Check the email', 'Enter a valid email address.');
        return;
      }
      Alert.alert(
        'Check your inbox',
        "If an account exists for that email, we've sent a reset link.",
      );
    } else {
      if (phone.trim().length < 7) {
        Alert.alert('Check the number', 'Enter a valid phone number.');
        return;
      }
      router.push({
        pathname: '/verify-code',
        params: { dial: country.dial, phone: phone.trim(), flow: 'recovery' },
      });
    }
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
            {method === 'email' ? (
              <Text style={styles.headline}>
                <Text style={{ color: C.headline }}>Forgot your </Text>
                <Text style={{ color: C.blueLight }}>password?</Text>
              </Text>
            ) : (
              <Text style={styles.headline}>
                <Text style={{ color: C.headline }}>Enter your </Text>
                <Text style={{ color: C.blueLight }}>number</Text>
              </Text>
            )}
            <Text style={styles.subhead}>
              {method === 'email'
                ? "Enter your account email and we'll send you a reset link."
                : "We'll text you a code to reset your password."}
            </Text>
          </View>

          {/* form */}
          <View style={styles.form}>
            {method === 'email' ? (
              <>
                <Text style={styles.fieldLabel}>Email</Text>
                <TextInput
                  style={[styles.input, focused && styles.inputFocused]}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  placeholder="you@email.com"
                  placeholderTextColor={C.placeholder}
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
              </>
            ) : (
              <>
                <Text style={styles.fieldLabel}>Phone number</Text>
                <View style={[styles.phoneField, focused && styles.inputFocused]}>
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
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                  />
                </View>
              </>
            )}

            <Pressable
              style={styles.switchLine}
              onPress={() => {
                setFocused(false);
                setMethod((m) => (m === 'email' ? 'phone' : 'email'));
              }}
              hitSlop={6}>
              <Text style={styles.switchText}>
                <Text style={styles.switchLink}>
                  {method === 'email' ? 'Use mobile number instead' : 'Use your email instead'}
                </Text>
              </Text>
            </Pressable>
          </View>

          {/* actions */}
          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
              onPress={submit}>
              <Text style={styles.primaryBtnText}>
                {method === 'email' ? 'Send reset link' : 'Send code'}
              </Text>
            </Pressable>

            <Pressable style={styles.textBtn} onPress={() => router.replace('/login')} hitSlop={6}>
              <Text style={styles.textBtnLabel}>
                Back to <Text style={styles.textBtnLink}>Log in</Text>
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
    minHeight: 40,
  },

  form: { paddingHorizontal: 26, paddingTop: 26, gap: 12 },
  fieldLabel: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11.5,
    letterSpacing: 11.5 * 0.08,
    textTransform: 'uppercase',
    color: C.label,
    marginBottom: -6,
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
    marginTop: 6,
  },
  inputFocused: { borderColor: C.blueFocus, backgroundColor: C.fieldFocus },
  phoneField: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.borderSubtle,
    backgroundColor: C.field,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
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
  switchLine: { alignItems: 'center', marginTop: 2 },
  switchText: { fontFamily: 'Manrope_400Regular', fontSize: 12.5, color: C.switchLine },
  switchLink: { fontFamily: 'Manrope_700Bold', color: C.blueLight },

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
  textBtn: { alignItems: 'center', padding: 6 },
  textBtnLabel: { fontFamily: 'Manrope_600SemiBold', fontSize: 13.5, color: C.textSecondary },
  textBtnLink: { fontFamily: 'Manrope_800ExtraBold', color: C.blueLight },
  pressed: { opacity: 0.85, transform: [{ translateY: -1 }] },
});
