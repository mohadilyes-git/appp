import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Animated, Easing, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { font, radius } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';

export const SHEET_OUT_MS = 190;
const SHEET_IN_MS = 280;

type Props = {
  visible: boolean;
  title: string;
  subtitle?: string;
  cancelLabel?: string;
  onClose: () => void;
  children: ReactNode;
};

// the bottom sheet the photo source and the two pickers all sit in
export default function SheetShell({
  visible,
  title,
  subtitle,
  cancelLabel = 'Cancel',
  onClose,
  children,
}: Props) {
  const { colors, resolved } = useTheme();
  const anim = useRef(new Animated.Value(0)).current;
  // the modal has to stay up while the sheet slides back down
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.timing(anim, {
        toValue: 1,
        duration: SHEET_IN_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
      return;
    }
    Animated.timing(anim, {
      toValue: 0,
      duration: SHEET_OUT_MS,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setMounted(false);
    });
  }, [visible, anim]);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [520, 0] });
  const scrim = resolved === 'dark' ? 'rgba(4,6,10,.62)' : 'rgba(9,12,18,.5)';
  const card = { backgroundColor: colors.surfaceCard, borderColor: colors.borderCard };

  return (
    <Modal visible={mounted} transparent animationType="none" onRequestClose={onClose}>
      <View style={StyleSheet.absoluteFill}>
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: scrim, opacity: anim }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close" />
        </Animated.View>

        <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
          <View style={[styles.body, card]}>
            <View style={[styles.titleBlock, { borderBottomColor: colors.borderCard }]}>
              <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
              {subtitle ? (
                <Text style={[styles.subtitle, { color: colors.textTertiary }]}>{subtitle}</Text>
              ) : null}
            </View>
            {children}
          </View>

          <Pressable
            onPress={onClose}
            style={({ pressed }) => [styles.cancel, card, pressed && { opacity: 0.8 }]}>
            <Text style={[styles.cancelText, { color: colors.textPrimary }]}>{cancelLabel}</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sheet: { position: 'absolute', left: 10, right: 10, bottom: 10, gap: 8 },
  body: { borderRadius: radius.panel, borderWidth: 1, overflow: 'hidden' },
  titleBlock: { paddingHorizontal: 16, paddingTop: 15, paddingBottom: 11, borderBottomWidth: 1 },
  title: { fontFamily: font.display, fontSize: 16 },
  subtitle: { fontFamily: font.body, fontSize: 11.5, marginTop: 2 },
  cancel: {
    height: 54,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: { fontFamily: font.heavy, fontSize: 15 },
});
