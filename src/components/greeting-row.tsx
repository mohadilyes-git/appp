import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BellIcon } from '@/components/icons';
import { font, gradients, tracking } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';
import { displayNameOf, initialsOf, useSession } from '@/lib/use-session';

type Props = {
  unread?: boolean;
  onPressBell?: () => void;
};

export default function GreetingRow({ unread = false, onPressBell }: Props) {
  const { colors, shadows } = useTheme();
  const session = useSession();

  const name = displayNameOf(session);
  const initials = initialsOf(name);

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <LinearGradient
          colors={gradients.avatar}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatar}>
          <Text style={styles.initials}>{initials}</Text>
        </LinearGradient>

        <View style={styles.names}>
          <Text style={[styles.label, { color: colors.textMuted }]}>Welcome back</Text>
          <Text style={[styles.name, { color: colors.textPrimary }]} numberOfLines={1}>
            {name}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={onPressBell}
        accessibilityRole="button"
        accessibilityLabel="Notifications"
        hitSlop={8}
        style={({ pressed }) => [
          styles.bell,
          { backgroundColor: colors.surfaceCard, borderColor: colors.borderButton },
          shadows.button,
          pressed && { opacity: 0.7 },
        ]}>
        <BellIcon color={colors.textPrimary} />
        {unread ? (
          <View
            style={[styles.unread, { backgroundColor: colors.accentFill, borderColor: colors.surfaceCard }]}
          />
        ) : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  left: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 },

  // without the clip the gradient spills past the corners and reads as a square
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: { fontFamily: font.displayBold, fontSize: 13.5, color: '#fff' },

  names: { flex: 1, minWidth: 0 },
  label: {
    fontFamily: font.bold,
    fontSize: 11,
    letterSpacing: tracking(11, 0.1),
    textTransform: 'uppercase',
  },
  name: { fontFamily: font.heavy, fontSize: 15, marginTop: 1 },

  bell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unread: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
  },
});
