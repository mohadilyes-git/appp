import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import GreetingRow from '@/components/greeting-row';
import NudgeRow from '@/components/nudge-row';
import ProfitCard from '@/components/profit-card';
import { radius } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';
import { useHomeSummary } from '@/lib/use-inventory';

export default function HomeScreen() {
  const { colors, shadows } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { summary, nudge } = useHomeSummary();

  return (
    <ScrollView
      contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 8 }]}
      showsVerticalScrollIndicator={false}>
      <GreetingRow unread />
      <ProfitCard summary={summary} onPress={() => router.push('/inventory')} />
      {nudge ? <NudgeRow nudge={nudge} /> : null}

      {/* still a placeholder, the searches list comes next */}
      <View
        style={[
          styles.block,
          { height: 150, backgroundColor: colors.surfaceCard, borderColor: colors.borderCard },
          shadows.card,
        ]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // 112 at the bottom keeps the last card clear of the floating dock
  scroll: { paddingHorizontal: 18, paddingBottom: 112, gap: 18 },
  block: { borderRadius: radius.card, borderWidth: 1 },
});
