import { useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppBackground from '@/components/app-background';
import { WizardBar, WizardHeader } from '@/components/wizard-chrome';
import { CheckIcon } from '@/components/wizard-icons';
import { CONSOLE_BRANDS } from '@/lib/catalogue';
import { font, radius } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';
import { useWizard } from '@/lib/wizard-context';

// this screen was never drawn, so it borrows the phone brand card layout
const CARD_EXTRAS: Record<string, { letter: string; sub: string }> = {
  playstation: { letter: 'P', sub: 'PS4 · PS5 · handhelds' },
  xbox: { letter: 'X', sub: 'One and Series' },
  nintendo: { letter: 'N', sub: 'Switch and older systems' },
  steamdeck: { letter: 'S', sub: 'LCD and OLED' },
};

export default function ConsolesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const { colors, shadows } = useTheme();
  const { state, patch } = useWizard();

  const keywordInstead = () => {
    // placeholder until the keyword path is built
    Alert.alert('Not built yet', 'The keyword screen is a later step.');
  };

  return (
    <View style={styles.screen}>
      <AppBackground width={width} height={height} />

      <View style={[styles.content, { paddingTop: insets.top + 8 }]}>
        <WizardHeader
          eyebrow="Console"
          step={{ filled: 2, total: 5 }}
          title="Which"
          accent="console?"
          subtitle="Consoles are matched by exact model, so pick the family first."
          onBack={() => router.back()}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          style={styles.scroll}>
          {CONSOLE_BRANDS.map(({ id, card }) => {
            const selected = id === state.brandId;
            const extras = CARD_EXTRAS[id];
            return (
              <Pressable
                key={id}
                onPress={() => patch({ brandId: id })}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                style={[
                  styles.card,
                  { backgroundColor: colors.surfaceCard, borderColor: colors.borderCard },
                  shadows.card,
                  selected && [styles.cardSelected, { borderColor: colors.accentFill, shadowColor: colors.accentFill }],
                ]}>
                <View
                  style={[
                    styles.badge,
                    selected
                      ? { backgroundColor: colors.accentBrand }
                      : { backgroundColor: colors.surfaceWash },
                  ]}>
                  <Text style={[styles.badgeLetter, { color: selected ? '#fff' : colors.textSecondary }]}>
                    {extras.letter}
                  </Text>
                </View>
                <View style={styles.cardText}>
                  <Text style={[styles.cardName, { color: colors.textPrimary }]}>{card}</Text>
                  <Text style={[styles.cardSub, { color: colors.textTertiary }]}>{extras.sub}</Text>
                </View>
                <View
                  style={[
                    styles.checkRing,
                    selected
                      ? { backgroundColor: colors.accentBrand, borderColor: colors.accentBrand }
                      : { borderColor: colors.toggleOff },
                  ]}>
                  {selected ? <CheckIcon color="#fff" /> : null}
                </View>
              </Pressable>
            );
          })}

          <View style={[styles.keywordCard, { backgroundColor: colors.accentFaint, borderColor: colors.accentChip }]}>
            <View style={styles.cardText}>
              <Text style={[styles.keywordTitle, { color: colors.textPrimary }]}>Console not listed?</Text>
              <Text style={[styles.cardSub, { color: colors.textTertiary }]}>
                Search by your own keyword instead
              </Text>
            </View>
            <Pressable
              onPress={keywordInstead}
              style={({ pressed }) => [
                styles.keywordBtn,
                { backgroundColor: colors.accentBrand },
                pressed && { opacity: 0.85 },
              ]}>
              <Text style={styles.keywordBtnText}>Keyword</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      <WizardBar
        onPress={() => router.navigate('/new-search/models')}
        disabled={!CONSOLE_BRANDS.some((b) => b.id === state.brandId)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 18 },
  scroll: { marginTop: 16 },
  list: { gap: 10, paddingBottom: 110 },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    borderRadius: radius.card,
    borderWidth: 1,
    padding: 15,
  },
  cardSelected: {
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 6,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: radius.thumb,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLetter: { fontFamily: font.displayBold, fontSize: 15 },
  cardText: { flex: 1, gap: 2 },
  cardName: { fontFamily: font.heavy, fontSize: 15 },
  cardSub: { fontFamily: font.body, fontSize: 11.5 },
  checkRing: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  keywordCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: radius.button,
    borderWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 14,
    marginTop: 2,
  },
  keywordTitle: { fontFamily: font.heavy, fontSize: 13 },
  keywordBtn: {
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: radius.tile,
  },
  keywordBtnText: { fontFamily: font.heavy, fontSize: 12.5, color: '#fff' },
});
