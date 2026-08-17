import { useRouter } from 'expo-router';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import GreetingRow from '@/components/greeting-row';
import { PlusIcon } from '@/components/icons';
import NudgeRow from '@/components/nudge-row';
import ProfitCard from '@/components/profit-card';
import SearchRow from '@/components/search-row';
import { font, radius, tracking } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';
import { useHomeSummary } from '@/lib/use-inventory';
import { draftFromRows } from '@/lib/search-to-draft';
import { useSearches } from '@/lib/use-searches';
import { useWizard } from '@/lib/wizard-context';

export default function HomeScreen() {
  const { colors, shadows } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { summary, nudge } = useHomeSummary();
  const { groups, loading, error, toggle, remove } = useSearches();
  const { patch, reset } = useWizard();

  // editing opens the last step with the search already filled in: location,
  // radius, platform and the word filters are what people come back to change
  const editSearch = (key: string) => {
    const group = groups.find((g) => g.key === key);
    if (!group) return;
    reset();
    patch((draft) => draftFromRows(group.rows, draft));
    router.push('/new-search/filters');
  };

  const confirmDelete = (key: string) => {
    const group = groups.find((g) => g.key === key);
    if (!group) return;
    Alert.alert(
      `Delete ${group.label}?`,
      group.count > 1
        ? `All ${group.count} models in this search stop being watched.`
        : 'This search stops being watched.',
      [
        { text: 'Keep', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            remove(key).catch((e) =>
              Alert.alert("Couldn't delete", e instanceof Error ? e.message : 'Try again in a moment.'),
            ),
        },
      ],
    );
  };

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
        <Pressable
          onPress={() => {
            // the draft outlives the wizard now, so a new search starts clean
            reset();
            router.push('/new-search');
          }}
          style={({ pressed }) => [
            styles.newPill,
            { backgroundColor: colors.accentFill },
            shadows.pill,
            pressed && { opacity: 0.85 },
          ]}>
          <PlusIcon color="#fff" size={13} />
          <Text style={styles.newText}>New</Text>
        </Pressable>
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
        groups.map((group) => (
          <SearchRow
            key={group.key}
            group={group}
            onToggle={toggle}
            onEdit={editSearch}
            onDelete={confirmDelete}
          />
        ))
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
