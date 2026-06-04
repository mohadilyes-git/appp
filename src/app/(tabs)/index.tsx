import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import GreetingRow from '@/components/greeting-row';
import ProfitCard, { type ProfitSummary } from '@/components/profit-card';
import { radius } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// the last seven month names, ending on the one we're in
function recentMonths(count: number) {
  const now = new Date();
  const out: string[] = [];
  for (let back = count - 1; back >= 0; back--) {
    out.push(MONTHS[new Date(now.getFullYear(), now.getMonth() - back, 1).getMonth()]);
  }
  return out;
}

// stand-in numbers until inventory is real
const AMOUNTS = [940, 1290, 840, 1640, 1440, 1930, 2480];

const SAMPLE: ProfitSummary = {
  invested: 6140,
  estValue: 9400,
  itemCount: 12,
  history: recentMonths(AMOUNTS.length).map((label, i) => ({ label, amount: AMOUNTS[i] })),
};

export default function HomeScreen() {
  const { colors, shadows } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView
      contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 8 }]}
      showsVerticalScrollIndicator={false}>
      <GreetingRow unread />
      <ProfitCard summary={SAMPLE} onPress={() => router.push('/inventory')} />

      {/* still placeholders, the nudge row and searches come next */}
      {[90, 150].map((height, i) => (
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
  block: { borderRadius: radius.card, borderWidth: 1 },
});
