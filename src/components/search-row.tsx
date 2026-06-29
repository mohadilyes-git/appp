import { Pressable, StyleSheet, Text, View } from 'react-native';

import { money } from '@/lib/inventory';
import { type SearchGroup } from '@/lib/use-searches';
import { font, radius, tracking } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';

type Props = {
  group: SearchGroup;
  onToggle: (key: string) => void;
};

export default function SearchRow({ group, onToggle }: Props) {
  const { colors, shadows } = useTheme();
  const active = group.active;

  const chips: string[] = [];
  if (group.location) chips.push(group.location.toUpperCase());
  if (group.radiusKm) chips.push(`${group.radiusKm} KM`);
  if (group.includeShipping) chips.push('SHIPS');

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surfaceCard, borderColor: colors.borderCard },
        shadows.card,
        !active && styles.pausedCard,
      ]}>
      <View style={[styles.rail, { backgroundColor: active ? colors.accentFill : colors.railPaused }]} />

      <View style={styles.body}>
        <View style={styles.topLine}>
          <View style={styles.nameWrap}>
            <View style={[styles.dot, { backgroundColor: active ? colors.accentFill : colors.dotPaused }]} />
            <Text style={[styles.keyword, { color: colors.textPrimary }]} numberOfLines={1}>
              {group.label}
            </Text>
            <Text style={[styles.cap, { color: colors.textLabel }]}>
              {active
                ? group.count > 1
                  ? `· ${group.count} models`
                  : group.priceMax != null
                    ? `· under ${money(group.priceMax)}`
                    : ''
                : '· paused'}
            </Text>
          </View>
          <Toggle value={active} onPress={() => onToggle(group.key)} />
        </View>

        {/* a paused search is one quiet line, details come back when it wakes */}
        {active ? (
          <View style={styles.bottomLine}>
            <View style={styles.chips}>
              {chips.map((chip) => (
                <View key={chip} style={[styles.chip, { backgroundColor: colors.surfaceWash }]}>
                  <Text style={[styles.chipText, { color: colors.textTag }]}>{chip}</Text>
                </View>
              ))}
            </View>
            <View style={styles.hits}>
              <Text style={[styles.hitsNum, { color: colors.accentText }]}>{group.hits}</Text>
              <Text style={[styles.hitsLabel, { color: colors.textLabel }]}>hits</Text>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
}

function Toggle({ value, onPress }: { value: boolean; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      style={[styles.track, { backgroundColor: value ? colors.accentFill : colors.toggleOff }]}>
      <View style={[styles.knob, value ? styles.knobOn : styles.knobOff]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // the rail needs to reach both edges, so the card clips instead of padding
  card: { flexDirection: 'row', borderRadius: radius.card, borderWidth: 1, overflow: 'hidden' },
  pausedCard: { opacity: 0.6 },
  rail: { width: 4 },

  body: { flex: 1, paddingVertical: 13, paddingHorizontal: 14, gap: 9 },
  topLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  nameWrap: { flexDirection: 'row', alignItems: 'center', gap: 7, flex: 1, minWidth: 0 },
  dot: { width: 7, height: 7, borderRadius: 3.5 },
  keyword: { fontFamily: font.heavy, fontSize: 14, flexShrink: 1 },
  cap: { fontFamily: font.bold, fontSize: 11.5 },

  track: { width: 40, height: 23, borderRadius: radius.pill },
  knob: {
    position: 'absolute',
    top: 2.5,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#fff',
  },
  knobOn: { right: 2.5 },
  knobOff: { left: 2.5 },

  bottomLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  chips: { flexDirection: 'row', gap: 5 },
  chip: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: radius.tag },
  chipText: { fontFamily: font.heavy, fontSize: 10, letterSpacing: tracking(10, 0.03) },
  hits: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  hitsNum: { fontFamily: font.displayBold, fontSize: 16 },
  hitsLabel: { fontFamily: font.bold, fontSize: 10.5 },
});
