import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import SheetShell from '@/components/sheet-shell';
import { font } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';

type Props = {
  visible: boolean;
  title: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  onClose: () => void;
};

export default function ChoiceSheet({
  visible,
  title,
  options,
  selected,
  onSelect,
  onClose,
}: Props) {
  const { colors } = useTheme();

  return (
    <SheetShell visible={visible} title={title} onClose={onClose}>
      <ScrollView bounces={false} style={styles.list}>
        {options.map((option, i) => {
          const on = option === selected;
          return (
            <View key={option}>
              {i > 0 ? <View style={[styles.divider, { backgroundColor: colors.borderCard }]} /> : null}
              <Pressable
                onPress={() => onSelect(option)}
                style={({ pressed }) => [styles.row, pressed && { backgroundColor: colors.accentFaint }]}>
                <Text
                  style={[
                    styles.label,
                    { color: on ? colors.accentText : colors.textPrimary },
                    on && { fontFamily: font.heavy },
                  ]}>
                  {option}
                </Text>
                {on ? <Text style={[styles.tick, { color: colors.accentText }]}>✓</Text> : null}
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </SheetShell>
  );
}

const styles = StyleSheet.create({
  // capped so a long list can't push the cancel bar off screen
  list: { maxHeight: 320 },
  divider: { height: 1, marginLeft: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  label: { fontFamily: font.bold, fontSize: 14.5 },
  tick: { fontFamily: font.heavy, fontSize: 14 },
});
