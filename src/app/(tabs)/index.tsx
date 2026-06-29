import { useRouter } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import GreetingRow from '@/components/greeting-row';
import { PlusIcon } from '@/components/icons';
import NudgeRow from '@/components/nudge-row';
import ProfitCard from '@/components/profit-card';
import SearchRow from '@/components/search-row';
import { font, radius, tracking } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';
import { useHomeSummary } from '@/lib/use-inventory';
import { useSearches } from '@/lib/use-searches';

export default function HomeScreen() {
  const { colors, shadows } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { summary, nudge } = useHomeSummary();
  const { groups, loading, error, toggle } = useSearches();

  const scanning = groups.filter((g) => g.active).length;
  const paused = groups.length - scanning;

  return (
    <ScrollView
      contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 8 }]}
      showsVerticalScrollIndicator={false}>
      <GreetingRow unread />
      <ProfitCard summary={summary} onPress={() => router.push('/inventory')} />
      {nudge ? <NudgeRow nudge={nudge} /> : null}

      <View style={styles.searchesHead}>
        <View>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Your searches</Text>
          {groups.length > 0 ? (
            <Text style={[styles.sectionSub, { color: colors.textTertiary }]}>
              {scanning} scanning · {paused} paused
            </Text>
          ) : null}
        </View>
        {/* goes nowhere yet, the create form isn't designed */}
        <View style={[styles.newPill, { backgroundColor: colors.accentFill }, shadows.pill]}>
          <PlusIcon color="#fff" size={13} />
          <Text style={styles.newText}>New</Text>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator style={styles.spinner} color={colors.accentText} />
      ) : error ? (
        <Text style={[styles.empty, { color: colors.negative }]}>{error}</Text>
      ) : groups.length === 0 ? (
        <Text style={[styles.empty, { color: colors.textTertiary }]}>
          No searches yet. They&apos;ll show up here when you create them.
        </Text>
      ) : (
        groups.map((group) => <SearchRow key={group.key} group={group} onToggle={toggle} />)
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // 112 at the bottom keeps the last card clear of the floating dock
  scroll: { paddingHorizontal: 18, paddingBottom: 112, gap: 18 },

  searchesHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontFamily: font.display, fontSize: 20, letterSpacing: tracking(20, -0.01) },
  sectionSub: { fontFamily: font.body, fontSize: 11.5, marginTop: 2 },
  newPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: radius.pill,
  },
  newText: { fontFamily: font.heavy, fontSize: 12.5, color: '#fff' },

  spinner: { paddingVertical: 20 },
  empty: { fontFamily: font.body, fontSize: 13, textAlign: 'center', paddingVertical: 20 },
});
