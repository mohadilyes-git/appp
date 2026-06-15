import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import SheetShell from '@/components/sheet-shell';
import { money } from '@/lib/inventory';
import { font, radius } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';

type Props = {
  visible: boolean;
  target: number;
  busy?: boolean;
  onConfirm: (soldFor: number) => void;
  onClose: () => void;
};

// the target was a guess, this is the number that makes the profit real
export default function SoldSheet({ visible, target, busy, onConfirm, onClose }: Props) {
  const { colors, shadows } = useTheme();
  const [value, setValue] = useState('');

  // start from the target each time it opens, most sales land near it
  useEffect(() => {
    if (visible) setValue(String(target));
  }, [visible, target]);

  const amount = Number.parseFloat(value);
  const valid = Number.isFinite(amount) && amount >= 0;

  return (
    <SheetShell
      visible={visible}
      title="What did it sell for?"
      subtitle={`You were asking ${money(target)}`}
      onClose={onClose}>
      <View style={styles.body}>
        <View>
          <Text style={[styles.currency, { color: colors.textHint }]}>$</Text>
          <TextInput
            style={[
              styles.input,
              {
                color: colors.textPrimary,
                backgroundColor: colors.surfaceField,
                borderColor: colors.borderField,
              },
            ]}
            keyboardType="decimal-pad"
            value={value}
            onChangeText={setValue}
            selectTextOnFocus
            autoFocus
          />
        </View>

        <Pressable
          onPress={() => onConfirm(amount)}
          disabled={!valid || busy}
          style={({ pressed }) => [
            styles.confirm,
            { backgroundColor: colors.positive, opacity: valid && !busy ? 1 : 0.45 },
            shadows.sold,
            pressed && { opacity: 0.9 },
          ]}>
          <Text style={[styles.confirmText, { color: colors.onPositive }]}>
            {busy ? 'Saving…' : 'Mark sold'}
          </Text>
        </Pressable>
      </View>
    </SheetShell>
  );
}

const styles = StyleSheet.create({
  body: { padding: 16, gap: 12 },
  currency: {
    position: 'absolute',
    left: 14,
    top: 16,
    zIndex: 1,
    fontFamily: font.displayBold,
    fontSize: 15,
  },
  input: {
    height: 52,
    borderRadius: radius.thumb,
    borderWidth: 1,
    paddingLeft: 30,
    paddingRight: 14,
    fontFamily: font.displayBold,
    fontSize: 19,
  },
  confirm: {
    height: 52,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: { fontFamily: font.heavy, fontSize: 14.5 },
});
