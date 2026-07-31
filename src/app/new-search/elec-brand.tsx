import { Redirect, useRouter } from 'expo-router';
import { useState } from 'react';
import {
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
import { WizardBar, WizardHeader } from '@/components/wizard-chrome';
import { CheckIcon, SearchIcon } from '@/components/wizard-icons';
import {
  BRAND_SUBLINES,
  CAMERA_BRANDS,
  DRONE_BRANDS,
  GPU_BRANDS,
  LAPTOP_BRANDS,
  LENS_BRANDS,
  TV_BRANDS,
  type Brand,
} from '@/lib/catalogue';
import { font, radius } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';
import { useWizard } from '@/lib/wizard-context';

// per-product copy, every maker has a model screen behind it
const PRODUCTS: Record<
  string,
  { title: string; subtitle: string; brands: { name: string; brand: Brand }[]; subs?: Record<string, string> }
> = {
  laptop: {
    title: 'Which laptop',
    subtitle: 'Laptops price wildly by maker, so models come next per brand.',
    brands: LAPTOP_BRANDS,
    subs: {
      dell: 'XPS, Inspiron, Latitude, Alienware',
      hp: 'Spectre, Envy, Pavilion, Omen',
      lenovo: 'ThinkPad, IdeaPad, Legion, Yoga',
      asus: 'ZenBook, VivoBook, ROG, TUF',
      acer: 'Swift, Aspire, Predator, Nitro',
      msi: 'Katana, Stealth, Raider, Prestige',
      surface: 'Surface Laptop, Pro and Go',
      razer: 'Blade 14 through 18',
    },
  },
  camera: {
    title: 'Which camera',
    subtitle: 'Bodies price per maker, so models come next.',
    brands: CAMERA_BRANDS,
  },
  lens: {
    title: 'Which lens',
    subtitle: 'Mount matters more than anything, so pick the maker first.',
    brands: LENS_BRANDS,
  },
  gpu: {
    title: 'Which card',
    subtitle: 'Nvidia, AMD and Intel price on their own curves.',
    brands: GPU_BRANDS,
  },
  tv: {
    title: 'Which TV',
    subtitle: 'Sellers title by series code, so pick the maker first.',
    brands: TV_BRANDS,
  },
  drone: {
    title: 'Which drone',
    subtitle: 'DJI resells hardest, but the rest hold value too.',
    brands: DRONE_BRANDS,
  },
};

export default function ElecBrandScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const { colors, shadows } = useTheme();
  const { state, patch } = useWizard();
  const [picked, setPicked] = useState('');
  const [query, setQuery] = useState('');

  const product = PRODUCTS[state.productId ?? ''];
  // landing here cold (deep link, web refresh) means the wizard never started
  if (!product) return <Redirect href="/new-search" />;

  const q = query.trim().toLowerCase();
  const shown = q ? product.brands.filter((b) => b.name.toLowerCase().includes(q)) : product.brands;

  const next = () => {
    const entry = product.brands.find((b) => b.name === picked);
    if (!entry) return;
    patch({ brandId: entry.brand.id });
    router.navigate('/new-search/models');
  };

  return (
    <View style={styles.screen}>
      <AppBackground width={width} height={height} />

      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={[styles.list, { paddingTop: insets.top + 8 }]}>
          <View style={styles.headerWrap}>
            <WizardHeader
              eyebrow="Step 3 of 6"
              step={{ filled: 3, total: 6 }}
              title={product.title}
              accent="brand?"
              subtitle={product.subtitle}
              onBack={() => router.back()}
            />
          </View>

          <View style={[styles.search, { backgroundColor: colors.surfaceField, borderColor: colors.borderField }]}>
            <SearchIcon color={colors.textPlaceholder} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search brands"
              placeholderTextColor={colors.textPlaceholder}
              autoCorrect={false}
              style={[styles.searchInput, { color: colors.textPrimary }]}
            />
          </View>

          {shown.map(({ name, brand }) => {
            const selected = name === picked;
            const sub = product.subs?.[brand.id] ?? BRAND_SUBLINES[brand.id];
            return (
              <Pressable
                key={name}
                onPress={() => setPicked(name)}
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
                    {name[0]}
                  </Text>
                </View>
                <View style={styles.cardText}>
                  <Text style={[styles.cardName, { color: colors.textPrimary }]}>{name}</Text>
                  <Text style={[styles.cardSub, { color: colors.textTertiary }]} numberOfLines={1}>
                    {sub}
                  </Text>
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
        </ScrollView>
      </View>

      <WizardBar onPress={next} disabled={!picked} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 18 },
  list: { gap: 9, paddingBottom: 110 },
  headerWrap: { marginBottom: 5 },

  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    height: 46,
    borderRadius: radius.thumb,
    borderWidth: 1,
    paddingHorizontal: 14,
    marginBottom: 3,
  },
  searchInput: { flex: 1, fontFamily: font.medium, fontSize: 14, paddingVertical: 0 },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: radius.button,
    borderWidth: 1,
    padding: 13,
  },
  cardSelected: {
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 6,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLetter: { fontFamily: font.displayBold, fontSize: 14 },
  cardText: { flex: 1, gap: 2, minWidth: 0 },
  cardName: { fontFamily: font.heavy, fontSize: 14 },
  cardSub: { fontFamily: font.body, fontSize: 11 },
  checkRing: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
