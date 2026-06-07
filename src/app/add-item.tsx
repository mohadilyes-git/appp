import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppBackground from '@/components/app-background';
import { ChevronLeftIcon, CloseIcon, PlusIcon } from '@/components/icons';
import PhotoSourceSheet from '@/components/photo-source-sheet';
import { SEGMENTS, money, type ItemStatus } from '@/lib/inventory';
import { font, gradients, radius, tracking } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';

const MAX_PHOTOS = 6;

export default function AddItemScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const { colors, shadows, resolved } = useTheme();

  const [photos, setPhotos] = useState<string[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [name, setName] = useState('');
  const [paid, setPaid] = useState('');
  const [target, setTarget] = useState('');
  const [status, setStatus] = useState<ItemStatus>('inhand');
  const [notes, setNotes] = useState('');
  const [focused, setFocused] = useState<string | null>(null);

  const full = photos.length >= MAX_PHOTOS;
  // filled thumbs, then one add slot, then ghosts to finish the row
  const cellCount = full ? MAX_PHOTOS : Math.ceil((photos.length + 1) / 3) * 3;
  const rows: number[][] = [];
  for (let i = 0; i < cellCount; i += 3) rows.push([i, i + 1, i + 2].filter((n) => n < cellCount));

  const bothPrices = paid.trim() !== '' && target.trim() !== '';
  const paidNum = Number.parseFloat(paid) || 0;
  const targetNum = Number.parseFloat(target) || 0;
  const profit = targetNum - paidNum;
  const margin = targetNum > 0 ? Math.round((profit / targetNum) * 100) : 0;
  const good = profit >= 0;

  const tone = {
    fg: good ? colors.positive : colors.negative,
    bg: good ? colors.positiveTint : colors.negativeTint,
    border: good ? colors.positiveBorder : colors.negativeBorder,
  };

  function addPhotos(uris: string[]) {
    setPhotos((current) => [...current, ...uris].slice(0, MAX_PHOTOS));
  }

  function removePhoto(index: number) {
    setPhotos((current) => current.filter((_, i) => i !== index));
  }

  async function takePhoto() {
    setSheetOpen(false);
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 0.8 });
    if (!result.canceled) addPhotos(result.assets.map((a) => a.uri));
  }

  async function chooseFromLibrary() {
    setSheetOpen(false);
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: MAX_PHOTOS - photos.length,
      quality: 0.8,
    });
    if (!result.canceled) addPhotos(result.assets.map((a) => a.uri));
  }

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/inventory');
  }

  // fields share a look, only the focused one lights up
  function fieldStyle(key: string) {
    return {
      backgroundColor: focused === key ? colors.accentFaint : colors.surfaceField,
      borderColor: focused === key ? colors.accentFill : colors.borderField,
    };
  }

  return (
    <View style={styles.root}>
      <StatusBar style={resolved === 'dark' ? 'light' : 'dark'} />
      <AppBackground width={width} height={height} />

      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 8 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Pressable
              onPress={goBack}
              accessibilityRole="button"
              accessibilityLabel="Back"
              hitSlop={8}
              style={({ pressed }) => [
                styles.backBtn,
                { backgroundColor: colors.surfaceCard, borderColor: colors.borderButton },
                shadows.button,
                pressed && { opacity: 0.7 },
              ]}>
              <ChevronLeftIcon color={colors.textPrimary} />
            </Pressable>
            <Text style={[styles.screenTitle, { color: colors.textPrimary }]}>Add item</Text>
          </View>

          <View style={styles.block}>
            <View style={styles.photoHead}>
              <Text style={[styles.label, { color: colors.textLabel }]}>Photos</Text>
              <Text
                style={[
                  styles.count,
                  full
                    ? { color: colors.accentText, fontFamily: font.heavy }
                    : { color: colors.textFaint },
                ]}>
                {photos.length} of {MAX_PHOTOS}
              </Text>
            </View>

            {rows.map((row, r) => (
              <View key={r} style={styles.photoRow}>
                {row.map((cell) => {
                  if (cell < photos.length) {
                    return (
                      <View key={cell} style={[styles.cell, styles.thumb, { borderColor: colors.borderCard }]}>
                        <Image source={{ uri: photos[cell] }} style={StyleSheet.absoluteFill} contentFit="cover" />
                        <Pressable
                          onPress={() => removePhoto(cell)}
                          hitSlop={10}
                          accessibilityRole="button"
                          accessibilityLabel="Remove photo"
                          style={styles.remove}>
                          <CloseIcon color="#fff" />
                        </Pressable>
                        {cell === 0 ? (
                          <View style={styles.coverBadge}>
                            <Text style={styles.coverText}>COVER</Text>
                          </View>
                        ) : null}
                      </View>
                    );
                  }

                  const isAddSlot = cell === photos.length && !full;
                  return (
                    <Pressable
                      key={cell}
                      onPress={() => setSheetOpen(true)}
                      style={[
                        styles.cell,
                        isAddSlot
                          ? { backgroundColor: colors.slotBg, borderColor: colors.slotBorder, borderWidth: 1.5 }
                          : { borderColor: colors.ghostBorder, borderWidth: 1 },
                      ]}>
                      <PlusIcon
                        color={isAddSlot ? colors.accentText : colors.ghostFg}
                        size={isAddSlot ? 24 : 18}
                      />
                    </Pressable>
                  );
                })}
              </View>
            ))}

            <Text style={[styles.hint, { color: colors.textHint }]}>
              {full
                ? 'Remove one to add another. The first photo is the cover.'
                : 'Tap a square to take a photo or pick from your library. First one becomes the cover.'}
            </Text>
          </View>

          <View style={styles.block}>
            <Text style={[styles.label, { color: colors.textLabel }]}>Item name</Text>
            <TextInput
              style={[styles.input, { color: colors.textPrimary }, fieldStyle('name')]}
              placeholder="Velvet armchair"
              placeholderTextColor={colors.textPlaceholder}
              value={name}
              onChangeText={setName}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
            />
          </View>

          <View style={styles.pair}>
            <PriceField
              label="What you paid"
              placeholder="120"
              value={paid}
              onChangeText={setPaid}
              fieldKey="paid"
              focused={focused}
              setFocused={setFocused}
              style={fieldStyle('paid')}
            />
            <PriceField
              label="Target sell"
              placeholder="320"
              value={target}
              onChangeText={setTarget}
              fieldKey="target"
              focused={focused}
              setFocused={setFocused}
              style={fieldStyle('target')}
            />
          </View>

          <View style={[styles.projected, { backgroundColor: tone.bg, borderColor: tone.border }]}>
            <View style={styles.projectedLeft}>
              <Text style={[styles.label, { color: colors.textTertiary }]}>Projected profit</Text>
              <Text style={[styles.hint, { color: colors.textHint }]}>Updates as you type</Text>
            </View>
            <View style={styles.projectedRight}>
              <Text style={[styles.projectedAmount, { color: tone.fg }]}>
                {bothPrices ? `${good ? '+' : '-'}${money(Math.abs(profit))}` : '—'}
              </Text>
              {bothPrices ? (
                <Text style={[styles.projectedPct, { color: tone.fg }]}>{margin}%</Text>
              ) : null}
            </View>
          </View>

          <View style={styles.block}>
            <Text style={[styles.label, { color: colors.textLabel }]}>Status</Text>
            <View style={[styles.track, { backgroundColor: colors.surfaceWash }]}>
              {SEGMENTS.map((s) => {
                const on = s.key === status;
                return (
                  <Pressable
                    key={s.key}
                    onPress={() => setStatus(s.key)}
                    style={[styles.segment, on && { backgroundColor: colors.surfaceCard }, on && shadows.button]}>
                    <Text
                      style={[
                        styles.segmentText,
                        { color: on ? colors.textPrimary : colors.textTertiary },
                      ]}>
                      {s.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.pair}>
            <MetaField label="Bought from" value="Facebook" />
            <MetaField label="Date bought" value="Today" />
          </View>

          <View style={styles.block}>
            <Text style={[styles.label, { color: colors.textLabel }]}>
              Notes <Text style={{ color: colors.textFaint }}>· optional</Text>
            </Text>
            <TextInput
              style={[styles.textarea, { color: colors.textPrimary }, fieldStyle('notes')]}
              placeholder="Needs a steam clean, small tear on the back left"
              placeholderTextColor={colors.textPlaceholder}
              value={notes}
              onChangeText={setNotes}
              onFocus={() => setFocused('notes')}
              onBlur={() => setFocused(null)}
              multiline
              textAlignVertical="top"
            />
          </View>
        </ScrollView>

        {/* the bar floats, content scrolls under the fade */}
        <View style={styles.bar}>
          <LinearGradient
            colors={[colors.barFadeFrom, colors.barFadeTo]}
            locations={[0, 0.34]}
            style={StyleSheet.absoluteFill}
          />
          <Pressable style={({ pressed }) => [shadows.cta, pressed && styles.lifted]}>
            <LinearGradient
              colors={gradients.hero}
              locations={gradients.heroStops}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.8, y: 1 }}
              style={styles.save}>
              <Text style={styles.saveText}>Save item</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      <PhotoSourceSheet
        visible={sheetOpen}
        slot={photos.length + 1}
        onTakePhoto={takePhoto}
        onChooseLibrary={chooseFromLibrary}
        onClose={() => setSheetOpen(false)}
      />
    </View>
  );
}

function PriceField({
  label,
  placeholder,
  value,
  onChangeText,
  fieldKey,
  focused,
  setFocused,
  style,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  fieldKey: string;
  focused: string | null;
  setFocused: (v: string | null) => void;
  style: object;
}) {
  const { colors } = useTheme();
  return (
    <View style={styles.pairItem}>
      <Text style={[styles.label, { color: colors.textLabel }]}>{label}</Text>
      <View>
        <Text style={[styles.currency, { color: colors.textHint }]}>$</Text>
        <TextInput
          style={[styles.price, { color: colors.textPrimary }, style]}
          placeholder={placeholder}
          placeholderTextColor={colors.textPlaceholder}
          keyboardType="decimal-pad"
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(fieldKey)}
          onBlur={() => setFocused(null)}
        />
      </View>
    </View>
  );
}

// the pickers behind these aren't designed yet
function MetaField({ label, value }: { label: string; value: string }) {
  const { colors } = useTheme();
  return (
    <View style={styles.pairItem}>
      <Text style={[styles.label, { color: colors.textLabel }]}>{label}</Text>
      <View
        style={[
          styles.meta,
          { backgroundColor: colors.surfaceField, borderColor: colors.borderField },
        ]}>
        <Text style={[styles.metaValue, { color: colors.textPrimary }]}>{value}</Text>
        <Text style={[styles.caret, { color: colors.textHint }]}>▾</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 18, paddingBottom: 112, gap: 16 },
  lifted: { transform: [{ translateY: -1 }] },

  header: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenTitle: { fontFamily: font.display, fontSize: 22, letterSpacing: tracking(22, -0.02) },

  block: { gap: 6 },
  label: {
    fontFamily: font.heavy,
    fontSize: 10.5,
    letterSpacing: tracking(10.5, 0.08),
    textTransform: 'uppercase',
  },

  photoHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 },
  count: { fontFamily: font.bold, fontSize: 10.5 },
  photoRow: { flexDirection: 'row', gap: 8 },
  cell: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 15,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumb: { borderStyle: 'solid', borderWidth: 1, overflow: 'hidden' },
  remove: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(9,12,18,.62)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverBadge: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    backgroundColor: '#2f6fed',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: radius.pill,
  },
  coverText: { fontFamily: font.heavy, fontSize: 8.5, letterSpacing: tracking(8.5, 0.06), color: '#fff' },
  hint: { fontFamily: font.body, fontSize: 11, lineHeight: 15.4 },

  input: {
    height: 50,
    borderRadius: radius.thumb,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontFamily: font.body,
    fontSize: 14.5,
  },

  pair: { flexDirection: 'row', gap: 10 },
  pairItem: { flex: 1, gap: 6, minWidth: 0 },
  currency: {
    position: 'absolute',
    left: 14,
    top: 16,
    zIndex: 1,
    fontFamily: font.displayBold,
    fontSize: 15,
  },
  price: {
    height: 50,
    borderRadius: radius.thumb,
    borderWidth: 1,
    paddingLeft: 30,
    paddingRight: 14,
    fontFamily: font.displayBold,
    fontSize: 17,
  },

  projected: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: radius.button,
    borderWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 15,
  },
  projectedLeft: { gap: 2 },
  projectedRight: { flexDirection: 'row', alignItems: 'baseline', gap: 7 },
  projectedAmount: { fontFamily: font.displayBold, fontSize: 24 },
  projectedPct: { fontFamily: font.heavy, fontSize: 12 },

  track: { flexDirection: 'row', gap: 4, borderRadius: radius.thumb, padding: 4 },
  segment: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: radius.segment },
  segmentText: { fontFamily: font.heavy, fontSize: 12.5 },

  meta: {
    height: 46,
    borderRadius: radius.thumb,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaValue: { fontFamily: font.bold, fontSize: 14 },
  caret: { fontSize: 9 },

  textarea: {
    height: 74,
    borderRadius: radius.thumb,
    borderWidth: 1,
    padding: 14,
    paddingTop: 12,
    fontFamily: font.body,
    fontSize: 13.5,
    lineHeight: 19.6,
  },

  bar: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 18, paddingTop: 14, paddingBottom: 26 },
  save: { height: 52, borderRadius: radius.button, alignItems: 'center', justifyContent: 'center' },
  saveText: { fontFamily: font.heavy, fontSize: 15.5, color: '#fff' },
});
