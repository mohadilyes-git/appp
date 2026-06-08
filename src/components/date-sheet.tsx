import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import SheetShell from '@/components/sheet-shell';
import { font } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';

type Props = {
  visible: boolean;
  value: Date;
  onChange: (date: Date) => void;
  onClose: () => void;
};

// android opens its own dialog, ios needs the spinner put somewhere
export default function DateSheet({ visible, value, onChange, onClose }: Props) {
  const { colors, resolved } = useTheme();

  if (Platform.OS !== 'ios') {
    if (!visible) return null;
    return (
      <DateTimePicker
        value={value}
        mode="date"
        maximumDate={new Date()}
        onChange={(_event, picked) => {
          onClose();
          if (picked) onChange(picked);
        }}
      />
    );
  }

  return (
    <SheetShell visible={visible} title="Date bought" cancelLabel="Done" onClose={onClose}>
      <View style={styles.wrap}>
        <DateTimePicker
          value={value}
          mode="date"
          display="spinner"
          maximumDate={new Date()}
          themeVariant={resolved}
          textColor={colors.textPrimary}
          onChange={(_event, picked) => {
            if (picked) onChange(picked);
          }}
        />
      </View>
      <Pressable
        onPress={() => onChange(new Date())}
        style={({ pressed }) => [styles.today, pressed && { backgroundColor: colors.accentFaint }]}>
        <Text style={[styles.todayText, { color: colors.accentText }]}>Today</Text>
      </Pressable>
    </SheetShell>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 8 },
  today: { alignItems: 'center', paddingVertical: 13 },
  todayText: { fontFamily: font.heavy, fontSize: 14 },
});
