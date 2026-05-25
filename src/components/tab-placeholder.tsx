import { StyleSheet, Text, View } from 'react-native';

import { font, tracking } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';

type Props = {
  title: string;
};

// stand-in for the tabs that have no design yet
export default function TabPlaceholder({ title }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.wrap}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      <Text style={[styles.note, { color: colors.textTertiary }]}>Not built yet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6 },
  title: { fontFamily: font.display, fontSize: 22, letterSpacing: tracking(22, -0.02) },
  note: { fontFamily: font.body, fontSize: 13 },
});
