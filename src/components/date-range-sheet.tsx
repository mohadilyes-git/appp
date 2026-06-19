import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import SheetShell from '@/components/sheet-shell';
import { type DateRange } from '@/lib/inventory';
import { font, radius } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';

type Props = {
  visible: boolean;
  title: string;
  value: DateRange;
  onApply: (range: DateRange) => void;
  onClose: () => void;
};

function label(date?: Date) {
  return date
    ? date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'Any';
}

// a window with either end open, picked inside the sheet
export default function DateRangeSheet({ visible, title, value, onApply, onClose }: Props) {
  const { colors, resolved } = useTheme();
  const [from, setFrom] = useState<Date | undefined>(value.from);
  const [to, setTo] = useState<Date | undefined>(value.to);
  const [editing, setEditing] = useState<'from' | 'to' | null>(null);

  // fresh copy of the applied range each time it opens
  useEffect(() => {
    if (visible) {
      setFrom(value.from);
      setTo(value.to);
      setEditing(null);
    }
  }, [visible, value]);

  function change(picked?: Date) {
    if (!picked) return;
    if (editing === 'from') setFrom(picked);
    if (editing === 'to') setTo(picked);
    // android's picker is a one-shot dialog, ios keeps the spinner up
    if (Platform.OS !== 'ios') setEditing(null);
  }

  function apply() {
    // a backwards window just means they picked the ends in the other order
    if (from && to && from.getTime() > to.getTime()) onApply({ from: to, to: from });
    else onApply({ from, to });
  }

  const ends: { key: 'from' | 'to'; name: string; date?: Date }[] = [
    { key: 'from', name: 'From', date: from },
    { key: 'to', name: 'To', date: to },
  ];

  return (
    <SheetShell visible={visible} title={title} onClose={onClose}>
      <View style={styles.body}>
        <View style={styles.endRow}>
          {ends.map((end) => (
            <Pressable
              key={end.key}
              onPress={() => setEditing(editing === end.key ? null : end.key)}
              style={[
                styles.end,
                {
                  backgroundColor: editing === end.key ? colors.accentFaint : colors.surfaceField,
                  borderColor: editing === end.key ? colors.accentFill : colors.borderField,
                },
              ]}>
              <Text style={[styles.endName, { color: colors.textLabel }]}>{end.name}</Text>
              <Text
                style={[styles.endValue, { color: end.date ? colors.textPrimary : colors.textTertiary }]}>
                {label(end.date)}
              </Text>
            </Pressable>
          ))}
        </View>

        {editing ? (
          <DateTimePicker
            value={(editing === 'from' ? from : to) ?? new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            maximumDate={new Date()}
            themeVariant={resolved}
            textColor={colors.textPrimary}
            onChange={(_event, picked) => change(picked ?? undefined)}
          />
        ) : null}

        <View style={styles.actions}>
          <Pressable
            onPress={() => {
              setFrom(undefined);
              setTo(undefined);
              setEditing(null);
            }}
            style={({ pressed }) => [
              styles.clear,
              { backgroundColor: colors.secondaryButton, borderColor: colors.borderField },
              pressed && { opacity: 0.8 },
            ]}>
            <Text style={[styles.actionText, { color: colors.textPrimary }]}>Clear</Text>
          </Pressable>
          <Pressable
            onPress={apply}
            style={({ pressed }) => [
              styles.apply,
              { backgroundColor: colors.accentFill },
              pressed && { opacity: 0.9 },
            ]}>
            <Text style={[styles.actionText, { color: '#fff' }]}>Apply</Text>
          </Pressable>
        </View>
      </View>
    </SheetShell>
  );
}

const styles = StyleSheet.create({
  body: { padding: 16, gap: 12 },
  endRow: { flexDirection: 'row', gap: 10 },
  end: { flex: 1, borderRadius: radius.thumb, borderWidth: 1, padding: 12, gap: 3 },
  endName: {
    fontFamily: font.heavy,
    fontSize: 10.5,
    letterSpacing: 0.84,
    textTransform: 'uppercase',
  },
  endValue: { fontFamily: font.bold, fontSize: 14 },
  actions: { flexDirection: 'row', gap: 10 },
  clear: {
    flex: 1,
    height: 48,
    borderRadius: radius.button,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  apply: {
    flex: 2,
    height: 48,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: { fontFamily: font.heavy, fontSize: 14.5 },
});
