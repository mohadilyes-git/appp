import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ArrowUpIcon, ChevronRightIcon } from '@/components/icons';
import { type ProfitSummary } from '@/lib/inventory';
import { font, gradients, radius, tracking } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';

type Props = {
  summary: ProfitSummary;
  onPress?: () => void;
};

// the design's alphas wash out on device, these read like the mock does
const INK = {
  label: 'rgba(255,255,255,.82)',
  link: 'rgba(255,255,255,.95)',
  statLabel: 'rgba(255,255,255,.78)',
  rule: 'rgba(255,255,255,.2)',
  pill: 'rgba(255,255,255,.18)',
  barDim: 'rgba(255,255,255,.22)',
};

function money(n: number) {
  return `$${n.toLocaleString('en-US')}`;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

export default function ProfitCard({ summary, onPress }: Props) {
  const { shadows } = useTheme();
  const { history } = summary;
  const current = history.length - 1;

  const [picked, setPicked] = useState(current);

  const point = history[picked];
  const tallest = Math.max(...history.map((p) => p.amount), 1);

  // how it moved against the month before, nothing to compare on the first one
  const before = picked > 0 ? history[picked - 1].amount : null;
  const delta = before && before > 0 ? Math.round(((point.amount - before) / before) * 100) : null;
  const up = (delta ?? 0) >= 0;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Profit, open inventory"
      style={({ pressed }) => [styles.lift, shadows.hero, pressed && styles.pressed]}>
      <LinearGradient
        colors={gradients.hero}
        locations={gradients.heroStops}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={styles.card}>
        <View style={styles.topRow}>
          <Text style={styles.label}>
            {picked === current ? 'Profit this month' : `Profit in ${point.label}`}
          </Text>
          <View style={styles.link}>
            <Text style={styles.linkText}>Inventory</Text>
            <ChevronRightIcon color={INK.link} size={13} />
          </View>
        </View>

        <View style={styles.amountRow}>
          <Text style={styles.amount}>{money(point.amount)}</Text>
          {delta !== null ? (
            <View style={styles.delta}>
              <View style={up ? undefined : styles.flipped}>
                <ArrowUpIcon color="#fff" size={11} />
              </View>
              <Text style={styles.deltaText}>{Math.abs(delta)}%</Text>
            </View>
          ) : null}
        </View>

        {/* each column is tappable full height, the short months are hard to hit otherwise */}
        <View style={styles.spark}>
          {history.map((p, i) => (
            <Pressable
              key={p.label}
              style={styles.slot}
              onPress={() => setPicked(i)}
              accessibilityRole="button"
              accessibilityLabel={`${p.label}, ${money(p.amount)}`}>
              <View
                style={[
                  styles.bar,
                  {
                    height: `${Math.max((p.amount / tallest) * 100, 6)}%`,
                    backgroundColor: i === picked ? '#ffffff' : INK.barDim,
                  },
                ]}
              />
            </Pressable>
          ))}
        </View>

        <View style={styles.footer}>
          <Stat label="Invested" value={money(summary.invested)} />
          <Stat label="Est. value" value={money(summary.estValue)} />
          <Stat label="Items" value={String(summary.itemCount)} />
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // the shadow sits out here, the clipped gradient below would eat it
  lift: { borderRadius: radius.hero },
  pressed: { transform: [{ translateY: -2 }] },
  card: { borderRadius: radius.hero, overflow: 'hidden', padding: 20 },

  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: {
    fontFamily: font.heavy,
    fontSize: 11,
    letterSpacing: tracking(11, 0.14),
    textTransform: 'uppercase',
    color: INK.label,
  },
  link: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  // without room for the line the y in Inventory gets its tail clipped
  linkText: { fontFamily: font.heavy, fontSize: 12, lineHeight: 17, color: INK.link },

  amountRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 10, marginTop: 10 },
  amount: {
    // manrope 800 was heavy at this size, 700 sits between that and space grotesk
    fontFamily: font.bold,
    fontSize: 42,
    // manrope sits taller than space grotesk, a 42 line box cuts the tops off
    lineHeight: 50,
    letterSpacing: tracking(42, -0.02),
    color: '#fff',
  },
  delta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: INK.pill,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: radius.pill,
    marginBottom: 5,
  },
  flipped: { transform: [{ rotate: '180deg' }] },
  deltaText: { fontFamily: font.heavy, fontSize: 12, color: '#fff' },

  spark: { flexDirection: 'row', alignItems: 'flex-end', gap: 7, height: 52, marginTop: 18 },
  slot: { flex: 1, height: '100%', justifyContent: 'flex-end' },
  bar: { borderRadius: 5 },

  footer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: INK.rule,
  },
  stat: { flex: 1, gap: 3 },
  statLabel: {
    fontFamily: font.heavy,
    fontSize: 10.5,
    letterSpacing: tracking(10.5, 0.06),
    textTransform: 'uppercase',
    color: INK.statLabel,
  },
  statValue: { fontFamily: font.displayBold, fontSize: 17, color: '#fff' },
});
