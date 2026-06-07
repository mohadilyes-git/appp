import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { CameraIcon, ChevronRightIcon, PhotosIcon } from '@/components/icons';
import { font, radius } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';

const IN_MS = 280;
const OUT_MS = 190;

type Props = {
  visible: boolean;
  slot: number;
  onTakePhoto: () => void;
  onChooseLibrary: () => void;
  onClose: () => void;
};

export default function PhotoSourceSheet({
  visible,
  slot,
  onTakePhoto,
  onChooseLibrary,
  onClose,
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
        duration: IN_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
      return;
    }
    Animated.timing(anim, {
      toValue: 0,
      duration: OUT_MS,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setMounted(false);
    });
  }, [visible, anim]);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [420, 0] });
  const scrim = resolved === 'dark' ? 'rgba(4,6,10,.62)' : 'rgba(9,12,18,.5)';

  const card = { backgroundColor: colors.surfaceCard, borderColor: colors.borderCard };

  return (
    <Modal visible={mounted} transparent animationType="none" onRequestClose={onClose}>
      <View style={StyleSheet.absoluteFill}>
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: scrim, opacity: anim }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close" />
        </Animated.View>

        <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
          <View style={[styles.options, card]}>
            <View style={[styles.titleBlock, { borderBottomColor: colors.borderCard }]}>
              <Text style={[styles.title, { color: colors.textPrimary }]}>Add a photo</Text>
              <Text style={[styles.subtitle, { color: colors.textTertiary }]}>
                Slot {slot} of 6{slot === 1 ? ' — this one becomes the cover' : ''}
              </Text>
            </View>

            <SheetRow
              title="Take a photo"
              sub="Use the camera"
              icon={<CameraIcon color={colors.accentText} />}
              onPress={onTakePhoto}
            />
            <View style={[styles.rowDivider, { backgroundColor: colors.borderCard }]} />
            <SheetRow
              title="Choose from library"
              sub="Pick up to 6 at once"
              icon={<PhotosIcon color={colors.accentText} />}
              onPress={onChooseLibrary}
            />
          </View>

          <Pressable
            onPress={onClose}
            style={({ pressed }) => [styles.cancel, card, pressed && { opacity: 0.8 }]}>
            <Text style={[styles.cancelText, { color: colors.textPrimary }]}>Cancel</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

function SheetRow({
  title,
  sub,
  icon,
  onPress,
}: {
  title: string;
  sub: string;
  icon: React.ReactNode;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && { backgroundColor: colors.accentFaint }]}>
      <View style={[styles.rowTile, { backgroundColor: colors.accentTint }]}>{icon}</View>
      <View style={styles.rowText}>
        <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>{title}</Text>
        <Text style={[styles.rowSub, { color: colors.textTertiary }]}>{sub}</Text>
      </View>
      <ChevronRightIcon color={colors.textFaint} size={15} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sheet: { position: 'absolute', left: 10, right: 10, bottom: 10, gap: 8 },

  options: { borderRadius: radius.panel, borderWidth: 1, overflow: 'hidden' },
  titleBlock: { paddingHorizontal: 16, paddingTop: 15, paddingBottom: 11, borderBottomWidth: 1 },
  title: { fontFamily: font.display, fontSize: 16 },
  subtitle: { fontFamily: font.body, fontSize: 11.5, marginTop: 2 },

  row: { flexDirection: 'row', alignItems: 'center', gap: 13, paddingHorizontal: 16, paddingVertical: 15 },
  // inset so it lines up with the text, not the icon
  rowDivider: { height: 1, marginLeft: 69 },
  rowTile: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  rowText: { flex: 1, gap: 1, minWidth: 0 },
  rowTitle: { fontFamily: font.heavy, fontSize: 14.5 },
  rowSub: { fontFamily: font.body, fontSize: 11.5 },

  cancel: { height: 54, borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  cancelText: { fontFamily: font.heavy, fontSize: 15 },
});
