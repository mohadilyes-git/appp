import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CameraIcon, ChevronRightIcon, PhotosIcon } from '@/components/icons';
import SheetShell from '@/components/sheet-shell';
import { font } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';

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
  const { colors } = useTheme();

  return (
    <SheetShell
      visible={visible}
      title="Add a photo"
      subtitle={`Slot ${slot} of 6${slot === 1 ? ' — this one becomes the cover' : ''}`}
      onClose={onClose}>
      <SheetRow
        title="Take a photo"
        sub="Use the camera"
        icon={<CameraIcon color={colors.accentText} />}
        onPress={onTakePhoto}
      />
      <View style={[styles.divider, { backgroundColor: colors.borderCard }]} />
      <SheetRow
        title="Choose from library"
        sub="Pick up to 6 at once"
        icon={<PhotosIcon color={colors.accentText} />}
        onPress={onChooseLibrary}
      />
    </SheetShell>
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
      <View style={[styles.tile, { backgroundColor: colors.accentTint }]}>{icon}</View>
      <View style={styles.text}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
        <Text style={[styles.sub, { color: colors.textTertiary }]}>{sub}</Text>
      </View>
      <ChevronRightIcon color={colors.textFaint} size={15} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  // inset so it lines up with the text, not the icon
  divider: { height: 1, marginLeft: 69 },
  tile: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  text: { flex: 1, gap: 1, minWidth: 0 },
  title: { fontFamily: font.heavy, fontSize: 14.5 },
  sub: { fontFamily: font.body, fontSize: 11.5 },
});
