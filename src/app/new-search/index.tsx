import { useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppBackground from '@/components/app-background';
import { ChevronRightIcon } from '@/components/icons';
import { WizardBar, WizardHeader } from '@/components/wizard-chrome';
import { CategoryIcon } from '@/components/wizard-icons';
import { CATEGORIES } from '@/lib/catalogue';
import { font, radius } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';
import { useWizard } from '@/lib/wizard-context';

export default function CategoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const { colors, shadows, resolved } = useTheme();
  const { state, patch } = useWizard();

  const picked = CATEGORIES.find((c) => c.id === state.category);

  const next = () => {
    if (!picked) return;
    if (picked.id === 'phones') {
      router.push('/new-search/brand');
      return;
    }
    // placeholder until the other category paths are built
    Alert.alert('Not built yet', `The ${picked.name} questions are a later step.`);
  };

  return (
    <View style={styles.screen}>
      <AppBackground width={width} height={height} />

      <View style={[styles.content, { paddingTop: insets.top + 8 }]}>
        <WizardHeader
          eyebrow="First step"
          step={{ filled: 1, total: 5 }}
          title="What are you"
          accent="hunting?"
          subtitle="Pick a category — the next questions adapt to it."
          onBack={() => router.back()}
          close
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          style={styles.scroll}>
          {CATEGORIES.map((cat) => {
            const selected = cat.id === state.category;
            return (
              <Pressable
                key={cat.id}
                onPress={() => patch({ category: cat.id })}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                style={[
                  styles.card,
                  { backgroundColor: colors.surfaceCard, borderColor: colors.borderCard },
                  shadows.card,
                  selected && [
                    styles.cardSelected,
                    {
                      borderColor: colors.accentFill,
                      shadowColor: colors.accentFill,
                      // dark drops the resting shadows, so the glow does more of the work
                      shadowOpacity: resolved === 'dark' ? 0.3 : 0.16,
                    },
                  ],
                ]}>
                <View style={[styles.iconTile, { backgroundColor: colors.accentTint }]}>
                  <CategoryIcon id={cat.id} color={colors.accentText} />
                </View>
                <View style={styles.cardText}>
                  <Text style={[styles.cardName, { color: colors.textPrimary }]}>{cat.name}</Text>
                  <Text style={[styles.cardPath, { color: colors.textLabel }]} numberOfLines={1}>
                    {cat.path}
                  </Text>
                </View>
                <ChevronRightIcon color={selected ? colors.accentText : colors.textMuted} size={13} />
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <WizardBar onPress={next} disabled={!picked} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 18 },
  scroll: { marginTop: 16 },
  list: { gap: 9, paddingBottom: 110 },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 11,
    paddingHorizontal: 13,
  },
  iconTile: {
    width: 38,
    height: 38,
    borderRadius: radius.segment,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSelected: {
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 13,
    elevation: 6,
  },
  cardText: { flex: 1, gap: 2, minWidth: 0 },
  cardName: { fontFamily: font.heavy, fontSize: 14 },
  cardPath: { fontFamily: font.body, fontSize: 11 },
});
