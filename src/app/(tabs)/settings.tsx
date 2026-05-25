import { Pressable, StyleSheet, Text, View } from 'react-native';

import { supabase } from '@/lib/supabase';
import { font, radius, tracking } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';

// nothing designed here yet, but log out has to live somewhere while we build
export default function SettingsScreen() {
  const { colors, shadows, resolved, setPreference } = useTheme();
  const options = ['light', 'dark'] as const;

  return (
    <View style={styles.wrap}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Settings</Text>

      <View style={styles.row}>
        {options.map((option) => {
          // match on what's actually showing, so first launch isn't blank
          const on = resolved === option;
          return (
            <Pressable
              key={option}
              onPress={() => setPreference(option)}
              style={[
                styles.option,
                {
                  backgroundColor: on ? colors.accentTint : colors.surfaceWash,
                  borderColor: on ? colors.accentFill : 'transparent',
                },
              ]}>
              <Text style={[styles.optionText, { color: on ? colors.accentText : colors.textTertiary }]}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={() => supabase.auth.signOut()}
        style={[
          styles.logout,
          { backgroundColor: colors.surfaceCard, borderColor: colors.borderButton },
          shadows.button,
        ]}>
        <Text style={[styles.logoutText, { color: colors.textPrimary }]}>Log out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 18, paddingHorizontal: 24 },
  title: { fontFamily: font.display, fontSize: 22, letterSpacing: tracking(22, -0.02) },
  row: { flexDirection: 'row', gap: 8 },
  option: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: radius.segment,
    borderWidth: 1,
  },
  optionText: { fontFamily: font.heavy, fontSize: 12.5, textTransform: 'capitalize' },
  logout: {
    paddingVertical: 13,
    paddingHorizontal: 26,
    borderRadius: radius.button,
    borderWidth: 1,
  },
  logoutText: { fontFamily: font.bold, fontSize: 14.5 },
});
