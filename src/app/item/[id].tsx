import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import AppBackground from '@/components/app-background';
import { ChevronLeftIcon } from '@/components/icons';
import SheetShell, { SHEET_OUT_MS } from '@/components/sheet-shell';
import {
  STATUS_LABEL,
  heldLabel,
  itemById,
  money,
  profitOf,
  removeItem,
  signedMoney,
  timelineOf,
} from '@/lib/inventory';
import { font, radius, tracking } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';

const PHOTO_HEIGHT = 280;

export default function ItemDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width, height } = useWindowDimensions();
  const { colors, shadows, resolved } = useTheme();

  const item = itemById(id);
  const [menuOpen, setMenuOpen] = useState(false);

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/inventory');
  }

  // the alert can't come up while the sheet is still on screen
  function confirmDelete() {
    setMenuOpen(false);
    setTimeout(() => {
      Alert.alert('Delete this item?', 'It goes for good, along with its photos.', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            removeItem(id);
            goBack();
          },
        },
      ]);
    }, SHEET_OUT_MS + 60);
  }

  if (!item) {
    return (
      <View style={styles.root}>
        <AppBackground width={width} height={height} />
        <View style={styles.missing}>
          <Text style={[styles.missingText, { color: colors.textTertiary }]}>
            That item is no longer here.
          </Text>
          <Pressable onPress={goBack} hitSlop={10}>
            <Text style={[styles.missingLink, { color: colors.accentText }]}>Back to inventory</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const profit = profitOf(item);
  const steps = timelineOf(item);
  const sold = item.status === 'sold';

  // the chip sits on the photo, so it gets an edge rather than a shadow
  const chipTone =
    item.status === 'listed'
      ? { bg: colors.accentTint, fg: colors.accentText, border: 'transparent' }
      : sold
        ? { bg: colors.positiveTint, fg: colors.positive, border: 'transparent' }
        : { bg: colors.surfaceCard, fg: colors.textTag, border: colors.borderCard };

  const floating = {
    backgroundColor: resolved === 'dark' ? 'rgba(9,12,18,.72)' : 'rgba(255,255,255,.9)',
    borderColor: resolved === 'dark' ? 'rgba(255,255,255,.14)' : 'rgba(14,17,22,.1)',
  };

  const card = {
    backgroundColor: colors.surfaceCard,
    borderColor: colors.borderCard,
  };

  return (
    <View style={styles.root}>
      <StatusBar style={resolved === 'dark' ? 'light' : 'dark'} />
      <AppBackground width={width} height={height} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.photo, { backgroundColor: colors.photoEmpty }]}>
          {item.photo ? (
            <Image source={{ uri: item.photo }} style={StyleSheet.absoluteFill} contentFit="cover" />
          ) : null}
          {/* the fade blends the photo into the page so the content can sit over it */}
          <LinearGradient
            colors={[colors.bgMidFade, colors.bgMid]}
            style={styles.photoFade}
            pointerEvents="none"
          />
          <Pressable
            onPress={goBack}
            accessibilityRole="button"
            accessibilityLabel="Back"
            hitSlop={8}
            style={({ pressed }) => [styles.round, styles.roundLeft, floating, pressed && { opacity: 0.7 }]}>
            <ChevronLeftIcon color={colors.textPrimary} />
          </Pressable>
          <Pressable
            onPress={() => setMenuOpen(true)}
            accessibilityRole="button"
            accessibilityLabel="More"
            hitSlop={8}
            style={({ pressed }) => [styles.round, styles.roundRight, floating, pressed && { opacity: 0.7 }]}>
            <Text style={[styles.more, { color: colors.textPrimary }]}>···</Text>
          </Pressable>
        </View>

        <View style={styles.content}>
          <View style={styles.head}>
            <View style={styles.statusRow}>
              <View style={[styles.chip, { backgroundColor: chipTone.bg, borderColor: chipTone.border }]}>
                <Text style={[styles.chipText, { color: chipTone.fg }]}>{STATUS_LABEL[item.status]}</Text>
              </View>
              <Text style={[styles.meta, { color: colors.textLabel }]}>
                {heldLabel(item)} · {item.boughtFrom}
              </Text>
            </View>
            <Text style={[styles.title, { color: colors.textPrimary }]}>{item.name}</Text>
          </View>

          <View style={[styles.panel, card, shadows.panel]}>
            <Stat label="Paid" value={money(item.paid)} />
            <View style={[styles.divider, { backgroundColor: colors.borderCard }]} />
            <Stat label={sold ? 'Sold for' : 'Target'} value={money(item.soldFor ?? item.target)} />
            <View style={[styles.divider, { backgroundColor: colors.borderCard }]} />
            <Stat label="Profit" value={signedMoney(profit)} tone={colors.positive} />
          </View>

          <View style={[styles.block, card, shadows.card]}>
            <Text style={[styles.blockLabel, { color: colors.textLabel }]}>Timeline</Text>
            {steps.map((step) => (
              <View key={step.label} style={styles.step}>
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: step.done ? colors.accentFill : colors.dotPaused },
                  ]}
                />
                <Text
                  style={[
                    styles.stepLabel,
                    { color: step.done ? colors.textPrimary : colors.textTertiary },
                  ]}>
                  {step.label}
                </Text>
                <Text style={[styles.stepDate, { color: step.done ? colors.textHint : colors.textFaint }]}>
                  {step.date}
                </Text>
              </View>
            ))}
          </View>

          {item.notes ? (
            <View style={[styles.block, card, shadows.card]}>
              <Text style={[styles.blockLabel, { color: colors.textLabel }]}>Notes</Text>
              <Text style={[styles.notes, { color: colors.textBody }]}>{item.notes}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>

      {/* a sold item has nowhere left to go, so the bar goes away with it */}
      {sold ? null : (
        <View style={styles.bar}>
          <LinearGradient
            colors={[colors.barFadeFrom, colors.barFadeTo]}
            locations={[0, 0.34]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.barRow}>
            {item.status === 'inhand' ? (
              <Pressable
                style={({ pressed }) => [
                  styles.action,
                  { backgroundColor: colors.secondaryButton, borderColor: colors.borderField },
                  pressed && { opacity: 0.8 },
                ]}>
                <Text style={[styles.actionText, { color: colors.textPrimary }]}>Mark listed</Text>
              </Pressable>
            ) : null}
            <Pressable
              style={({ pressed }) => [
                styles.action,
                styles.soldAction,
                { backgroundColor: colors.positive },
                shadows.sold,
                pressed && { opacity: 0.9 },
              ]}>
              <Text style={[styles.actionText, { color: colors.onPositive }]}>Mark sold</Text>
            </Pressable>
          </View>
        </View>
      )}

      <SheetShell
        visible={menuOpen}
        title={item.name}
        subtitle={`${money(item.paid)} → ${money(item.soldFor ?? item.target)}`}
        onClose={() => setMenuOpen(false)}>
        <Pressable
          onPress={confirmDelete}
          style={({ pressed }) => [styles.menuRow, pressed && { backgroundColor: colors.negativeTint }]}>
          <Text style={[styles.menuText, { color: colors.negative }]}>Delete item</Text>
        </Pressable>
      </SheetShell>
    </View>
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

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingBottom: 112 },

  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  missingText: { fontFamily: font.body, fontSize: 14 },
  missingLink: { fontFamily: font.heavy, fontSize: 14 },

  photo: { height: PHOTO_HEIGHT },
  photoFade: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 110 },
  round: {
    position: 'absolute',
    top: 52,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundLeft: { left: 18 },
  roundRight: { right: 18 },
  more: { fontFamily: font.heavy, fontSize: 13, letterSpacing: tracking(13, 0.1) },

  // pulled up so the first block overlaps the photo's fade
  content: { paddingHorizontal: 18, gap: 16, marginTop: -16 },

  head: { gap: 9 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  chip: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: radius.pill, borderWidth: 1 },
  chipText: { fontFamily: font.heavy, fontSize: 10, letterSpacing: tracking(10, 0.04) },
  meta: { fontFamily: font.bold, fontSize: 11.5 },
  title: {
    fontFamily: font.display,
    fontSize: 26,
    lineHeight: 30,
    letterSpacing: tracking(26, -0.02),
  },

  panel: { flexDirection: 'row', borderRadius: radius.panel, borderWidth: 1, padding: 16 },
  divider: { width: 1, marginHorizontal: 12 },
  stat: { flex: 1, gap: 4 },
  statLabel: {
    fontFamily: font.heavy,
    fontSize: 10.5,
    letterSpacing: tracking(10.5, 0.08),
    textTransform: 'uppercase',
  },
  statValue: { fontFamily: font.displayBold, fontSize: 20 },

  block: { borderRadius: 20, borderWidth: 1, paddingVertical: 15, paddingHorizontal: 16, gap: 10 },
  blockLabel: {
    fontFamily: font.heavy,
    fontSize: 10.5,
    letterSpacing: tracking(10.5, 0.08),
    textTransform: 'uppercase',
  },
  step: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  dot: { width: 9, height: 9, borderRadius: 4.5 },
  stepLabel: { flex: 1, fontFamily: font.bold, fontSize: 13 },
  stepDate: { fontFamily: font.body, fontSize: 11.5 },
  notes: { fontFamily: font.body, fontSize: 13.5, lineHeight: 20.25 },

  bar: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingTop: 14, paddingBottom: 26 },
  barRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 18 },
  action: {
    flex: 1,
    height: 52,
    borderRadius: radius.button,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  soldAction: { borderWidth: 0 },
  actionText: { fontFamily: font.heavy, fontSize: 14.5 },

  menuRow: { paddingHorizontal: 16, paddingVertical: 16, alignItems: 'center' },
  menuText: { fontFamily: font.heavy, fontSize: 14.5 },
});
