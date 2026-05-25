import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { font, radius, tracking } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';

export default function HomeScreen() {
  const { colors, shadows } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 8 }]}
      showsVerticalScrollIndicator={false}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Home</Text>

      {/* placeholders so we can see the shell working before the real content lands */}
      {[220, 90, 150].map((height, i) => (
        <View
          key={i}
          style={[
            styles.block,
            { height, backgroundColor: colors.surfaceCard, borderColor: colors.borderCard },
            shadows.card,
          ]}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // 112 at the bottom keeps the last card clear of the floating dock
  scroll: { paddingHorizontal: 18, paddingBottom: 112, gap: 18 },
  title: { fontFamily: font.display, fontSize: 22, letterSpacing: tracking(22, -0.02) },
  block: { borderRadius: radius.card, borderWidth: 1 },
});
