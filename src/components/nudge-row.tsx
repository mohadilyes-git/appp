import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ChevronRightIcon, PlusIcon, WarningIcon } from '@/components/icons';
import { type Nudge } from '@/lib/inventory';
import { font, radius } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';

type Props = {
  nudge: Nudge;
};

export default function NudgeRow({ nudge }: Props) {
  const { colors, shadows } = useTheme();
  const router = useRouter();

  const empty = nudge.kind === 'empty';
  const one = !empty && nudge.count === 1;

  const copy = empty
    ? {
        title: 'Your inventory is empty',
        sub: 'Add your first item to start tracking profit',
      }
    : {
        title: one
          ? '1 item sitting in your inventory'
          : `${nudge.count} items sitting in your inventory`,
        sub: one ? 'List it to get it sold' : 'List them to get them sold',
      };

  return (
    <Pressable
      onPress={() => router.push(empty ? '/add-item' : '/inventory')}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: colors.surfaceCard, borderColor: colors.borderCard },
        shadows.card,
        pressed && { borderColor: colors.accentPressBorder },
      ]}>
      {/* amber is an advisory, the empty state is an invitation so it goes blue */}
      <View style={[styles.tile, { backgroundColor: empty ? colors.accentTint : colors.warningTint }]}>
        {empty ? (
          <PlusIcon color={colors.accentText} size={18} />
        ) : (
          <WarningIcon color={colors.warning} size={18} />
        )}
      </View>

      <View style={styles.text}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{copy.title}</Text>
        <Text style={[styles.sub, { color: colors.textSecondary }]}>{copy.sub}</Text>
      </View>

      <ChevronRightIcon color={colors.textFaint} size={15} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    borderRadius: radius.button,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  tile: {
    width: 34,
    height: 34,
    borderRadius: radius.tile,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1, gap: 1, minWidth: 0 },
  title: { fontFamily: font.heavy, fontSize: 13.5 },
  sub: { fontFamily: font.body, fontSize: 11.5 },
});
