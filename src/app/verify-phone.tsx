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
  muted: 'rgba(255,255,255,.4)',
  helper: 'rgba(255,255,255,.35)',
  placeholder: 'rgba(255,255,255,.34)',
  field: 'rgba(255,255,255,.06)',
  fieldFocus: 'rgba(74,134,255,.08)',
  chip: 'rgba(255,255,255,.08)',
  borderSubtle: 'rgba(255,255,255,.14)',
};

export default function VerifyPhoneScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState<Country>(
    COUNTRIES.find((c) => c.iso === 'US') ?? COUNTRIES[0],
  );
  const [pickerOpen, setPickerOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/register');
  }

  function sendCode() {
    if (phone.trim().length < 7) {
      Alert.alert('Check the number', 'Enter a valid phone number.');
      return;
    }
    router.push({
      pathname: '/verify-code',
      params: { dial: country.dial, phone: phone.trim() },
    });
  }

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
            <Text style={styles.step}>Step 2 of 3</Text>
          </View>

          {/* header */}
          <View style={styles.header}>
            <View style={styles.brandRow}>
              <PulseDot />
              <Text style={styles.brandLabel}>AlertsFlip</Text>
            </View>
            <Text style={styles.headline}>
              <Text style={{ color: C.headline }}>Verify your </Text>
              <Text style={{ color: C.blueLight }}>phone</Text>
            </Text>
            <Text style={styles.subhead}>
              We'll text you a 6-digit code to keep your account secure.
            </Text>
          </View>

          {/* form */}
          <View style={styles.form}>
            <Text style={styles.fieldLabel}>Phone number</Text>
            <View style={[styles.phoneField, focused && styles.phoneFieldFocused]}>
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
            <Text style={styles.helper}>
              Only used for verification and deal alerts — never shared.
            </Text>
          </View>

          {/* action */}
          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
              onPress={sendCode}>
              <Text style={styles.primaryBtnText}>Send code</Text>
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
  phoneFieldFocused: { borderColor: C.blueFocus, backgroundColor: C.fieldFocus },
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
  helper: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 11.5,
    lineHeight: 17,
    color: C.helper,
    marginTop: 10,
  },

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
