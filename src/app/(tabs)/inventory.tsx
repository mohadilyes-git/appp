import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BoltIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@/components/icons';
import {
  heldLabel,
  money,
  signedMoney,
  SAMPLE_ITEMS,
  SEGMENTS,
  STATUS_LABEL,
  totalsOf,
  type InventoryItem,
  type ItemStatus,
} from '@/lib/inventory';
import { font, gradients, radius, tracking } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';

export default function InventoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, shadows } = useTheme();

  const [segment, setSegment] = useState<ItemStatus>('inhand');

  const items = SAMPLE_ITEMS;
  const totals = totalsOf(items);
  const shown = items.filter((i) => i.status === segment);

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 8 }]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Pressable
          onPress={goBack}
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={8}
          style={({ pressed }) => [
            styles.backBtn,
            { backgroundColor: colors.surfaceCard, borderColor: colors.borderButton },
            shadows.button,
            pressed && { opacity: 0.7 },
          ]}>
          <ChevronLeftIcon color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Inventory &amp; profit</Text>
      </View>

      {/* add actions go first, before the summary */}
      <Pressable style={({ pressed }) => [shadows.cta, pressed && styles.lifted]}>
        <LinearGradient
          colors={gradients.hero}
          locations={gradients.heroStops}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          style={styles.cta}>
          <PlusIcon color="#fff" />
          <Text style={styles.ctaText}>Add item</Text>
        </LinearGradient>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.shortcut,
          { backgroundColor: colors.surfaceCard, borderColor: colors.borderCard },
          shadows.card,
          pressed && { borderColor: colors.accentPressBorder },
        ]}>
        <View style={[styles.shortcutTile, { backgroundColor: colors.accentTint }]}>
          <BoltIcon color={colors.accentText} size={18} />
        </View>
        <View style={styles.shortcutText}>
          <Text style={[styles.shortcutTitle, { color: colors.textPrimary }]}>
            Bought something from an alert?
          </Text>
          <Text style={[styles.shortcutSub, { color: colors.textTertiary }]}>
            Add it straight from a saved listing
          </Text>
        </View>
        <ChevronRightIcon color={colors.textFaint} size={15} />
      </Pressable>

      <View
        style={[
          styles.panel,
          { backgroundColor: colors.surfaceCard, borderColor: colors.borderCard },
          shadows.panel,
        ]}>
        <Stat label="Invested" value={money(totals.invested)} />
        <View style={[styles.divider, { backgroundColor: colors.borderCard }]} />
        <Stat label="Est. profit" value={money(totals.estProfit)} tone={colors.positive} />
        <View style={[styles.divider, { backgroundColor: colors.borderCard }]} />
        <Stat label="ROI" value={`${totals.roi}%`} />
      </View>

      <View style={[styles.track, { backgroundColor: colors.surfaceWash }]}>
        {SEGMENTS.map((s) => {
          const on = s.key === segment;
          return (
            <Pressable
              key={s.key}
              onPress={() => setSegment(s.key)}
              style={[
                styles.segment,
                on && { backgroundColor: colors.surfaceCard },
                on && shadows.button,
              ]}>
              <Text
                style={[styles.segmentText, { color: on ? colors.textPrimary : colors.textTertiary }]}>
                {s.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.rows}>
        {shown.length === 0 ? (
          <Text style={[styles.empty, { color: colors.textTertiary }]}>
            Nothing here yet. Add an item to start tracking it.
          </Text>
        ) : (
          shown.map((item) => <ItemRow key={item.id} item={item} />)
        )}
      </View>
    </ScrollView>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: string }) {
  const { colors } = useTheme();
  return (
    <View style={styles.stat}>
      <Text style={[styles.statLabel, { color: colors.textLabel }]}>{label}</Text>
      <Text style={[styles.statValue, { color: tone ?? colors.textPrimary }]}>{value}</Text>
    </View>
  );
}

function ItemRow({ item }: { item: InventoryItem }) {
  const { colors, shadows } = useTheme();
  const profit = item.target - item.paid;

  const chipTone =
    item.status === 'listed'
      ? { bg: colors.accentTint, fg: colors.accentText }
      : item.status === 'sold'
        ? { bg: colors.positiveTint, fg: colors.positive }
        : { bg: colors.surfaceWashStrong, fg: colors.textTag };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: colors.surfaceCard, borderColor: colors.borderCard },
        shadows.card,
        pressed && styles.lifted,
      ]}>
      {/* a flat tile until real photos land */}
      <View style={[styles.thumb, { backgroundColor: colors.photoEmpty }]} />

      <View style={styles.rowMiddle}>
        <View style={styles.rowTop}>
          <Text style={[styles.rowName, { color: colors.textPrimary }]} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={[styles.chip, { backgroundColor: chipTone.bg }]}>
            <Text style={[styles.chipText, { color: chipTone.fg }]}>{STATUS_LABEL[item.status]}</Text>
          </View>
        </View>
        <Text style={[styles.rowMeta, { color: colors.textSecondary }]}>
          {money(item.paid)} → {money(item.target)} · {heldLabel(item)}
        </Text>
      </View>

      <Text style={[styles.rowProfit, { color: colors.positive }]}>{signedMoney(profit)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 18, paddingBottom: 112, gap: 14 },
  lifted: { transform: [{ translateY: -2 }] },

  header: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontFamily: font.display, fontSize: 22, letterSpacing: tracking(22, -0.02) },

  cta: {
    height: 54,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ctaText: { fontFamily: font.heavy, fontSize: 15.5, color: '#fff' },

  shortcut: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    borderRadius: radius.button,
    borderWidth: 1,
    padding: 13,
    paddingHorizontal: 15,
  },
  shortcutTile: {
    width: 34,
    height: 34,
    borderRadius: radius.tile,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortcutText: { flex: 1, gap: 1, minWidth: 0 },
  shortcutTitle: { fontFamily: font.heavy, fontSize: 13.5 },
  shortcutSub: { fontFamily: font.body, fontSize: 11.5 },

  panel: {
    flexDirection: 'row',
    borderRadius: radius.panel,
    borderWidth: 1,
    padding: 16,
    marginTop: 2,
  },
  divider: { width: 1, marginHorizontal: 12 },
  stat: { flex: 1, gap: 4 },
  statLabel: {
    fontFamily: font.heavy,
    fontSize: 10.5,
    letterSpacing: tracking(10.5, 0.08),
    textTransform: 'uppercase',
  },
  statValue: { fontFamily: font.displayBold, fontSize: 20 },

  track: { flexDirection: 'row', gap: 4, borderRadius: radius.thumb, padding: 4 },
  segment: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: radius.segment },
  segmentText: { fontFamily: font.heavy, fontSize: 12.5 },

  rows: { gap: 10 },
  empty: { fontFamily: font.body, fontSize: 13, textAlign: 'center', paddingVertical: 26 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: radius.card,
    borderWidth: 1,
    padding: 12,
  },
  thumb: { width: 52, height: 52, borderRadius: radius.thumb },
  rowMiddle: { flex: 1, gap: 4, minWidth: 0 },
  rowTop: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  rowName: { fontFamily: font.heavy, fontSize: 13.5, flexShrink: 1 },
  chip: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: radius.pill },
  chipText: { fontFamily: font.heavy, fontSize: 10, letterSpacing: tracking(10, 0.04) },
  rowMeta: { fontFamily: font.body, fontSize: 11.5 },
  rowProfit: { fontFamily: font.displayBold, fontSize: 15.5 },
});
