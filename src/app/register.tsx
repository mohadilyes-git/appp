import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppleLogo, GoogleLogo } from '@/components/brand-logos';
import GlowBackground from '@/components/glow-background';
import PulseDot from '@/components/pulse-dot';

const C = {
  blue: '#2f6fed',
  blueLight: '#6f9dff',
  blueFocus: '#4a86ff',
  headline: '#eef1f6',
  appleText: '#0a0a0a',
  textSecondary: 'rgba(255,255,255,.6)',
  textTertiary: 'rgba(255,255,255,.55)',
  label: 'rgba(255,255,255,.5)',
  muted: 'rgba(255,255,255,.4)',
  legal: 'rgba(255,255,255,.35)',
  placeholder: 'rgba(255,255,255,.34)',
  field: 'rgba(255,255,255,.06)',
  fieldFocus: 'rgba(74,134,255,.08)',
  chip: 'rgba(255,255,255,.08)',
  borderSubtle: 'rgba(255,255,255,.14)',
  borderRule: 'rgba(255,255,255,.12)',
};

export default function RegisterScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/welcome');
  }

  function field(key: string) {
    return {
      onFocus: () => setFocused(key),
      onBlur: () => setFocused(null),
      style: [styles.input, focused === key && styles.inputFocused] as any,
      placeholderTextColor: C.placeholder,
    };
  }

  return (
    <View style={styles.root}>
      <GlowBackground width={width} height={height} topGlow={0.4} bottomGlow={0.6} halo={false} />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={styles.safe}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
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
                <Text style={{ color: C.headline }}>Create your </Text>
                <Text style={{ color: C.blueLight }}>account</Text>
              </Text>
              <Text style={styles.subhead}>Start catching deals in under a minute.</Text>
            </View>

            {/* form */}
            <View style={styles.form}>
              <View>
                <Text style={styles.fieldLabel}>Name</Text>
                <TextInput
                  {...field('name')}
                  autoComplete="name"
                  placeholder="Alex Carter"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View>
                <Text style={styles.fieldLabel}>Email</Text>
                <TextInput
                  {...field('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  placeholder="you@email.com"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View>
                <Text style={styles.fieldLabel}>Confirm email</Text>
                <TextInput
                  {...field('confirm')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Repeat your email"
                  value={confirmEmail}
                  onChangeText={setConfirmEmail}
                />
              </View>

              <View>
                <Text style={styles.fieldLabel}>Password</Text>
                <View>
                  <TextInput
                    {...field('password')}
                    style={[
                      styles.input,
                      styles.passwordInput,
                      focused === 'password' && styles.inputFocused,
                    ]}
                    secureTextEntry={!showPassword}
                    autoComplete="new-password"
                    placeholder="8+ characters"
                    value={password}
                    onChangeText={setPassword}
                  />
                  <Pressable
                    style={styles.showToggle}
                    onPress={() => setShowPassword((v) => !v)}
                    hitSlop={8}>
                    <Text style={styles.showToggleText}>{showPassword ? 'Hide' : 'Show'}</Text>
                  </Pressable>
                </View>
              </View>
            </View>

            {/* actions */}
            <View style={styles.actions}>
              <Pressable
                style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
                onPress={() => router.push('/verify-phone')}>
                <Text style={styles.primaryBtnText}>Create account</Text>
              </Pressable>

              <View style={styles.orRow}>
                <View style={styles.orRule} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.orRule} />
              </View>

              {Platform.OS === 'ios' ? (
                <Pressable style={({ pressed }) => [styles.socialBtn, pressed && styles.pressed]}>
                  <AppleLogo />
                  <Text style={styles.socialBtnText}>Continue with Apple</Text>
                </Pressable>
              ) : (
                <Pressable style={({ pressed }) => [styles.socialBtn, pressed && styles.pressed]}>
                  <GoogleLogo />
                  <Text style={styles.socialBtnText}>Continue with Google</Text>
                </Pressable>
              )}

              <Pressable
                style={styles.textBtn}
                onPress={() => router.replace('/login')}
                hitSlop={6}>
                <Text style={styles.textBtnLabel}>
                  Already have an account? <Text style={styles.textBtnLink}>Log in</Text>
                </Text>
              </Pressable>

              <Text style={styles.legal}>
                By continuing you agree to our <Text style={styles.legalLink}>Terms</Text> &{' '}
                <Text style={styles.legalLink}>Privacy Policy</Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#07080c' },
  safe: { flex: 1 },
  scroll: { flexGrow: 1 },

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

  form: { paddingHorizontal: 26, paddingTop: 24, gap: 14 },
  fieldLabel: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11.5,
    letterSpacing: 11.5 * 0.08,
    textTransform: 'uppercase',
    color: C.label,
    marginBottom: 6,
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
  orRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 4, paddingVertical: 2 },
  orRule: { flex: 1, height: 1, backgroundColor: C.borderRule },
  orText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    letterSpacing: 11 * 0.1,
    color: C.muted,
  },
  socialBtn: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  socialBtnText: { fontFamily: 'Manrope_700Bold', fontSize: 15.5, color: C.appleText },
  textBtn: { alignItems: 'center', padding: 6 },
  textBtnLabel: { fontFamily: 'Manrope_600SemiBold', fontSize: 13.5, color: C.textSecondary },
  textBtnLink: { fontFamily: 'Manrope_800ExtraBold', color: C.blueLight },
  legal: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 11,
    lineHeight: 16.5,
    color: C.legal,
    textAlign: 'center',
  },
  legalLink: { color: C.textTertiary },
  pressed: { opacity: 0.85, transform: [{ translateY: -1 }] },
});
