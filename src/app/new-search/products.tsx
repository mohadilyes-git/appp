import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
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
import { ChevronRightIcon } from '@/components/icons';
import { WizardHeader } from '@/components/wizard-chrome';
import { SearchIcon } from '@/components/wizard-icons';
import { ELECTRONICS_PRODUCTS, type Product } from '@/lib/catalogue';
import { font, radius, tracking } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';
import { useWizard } from '@/lib/wizard-context';

// one-line teasers from the design, presentation only
const SUBLINES: Record<string, string> = {
  ipad: '9th gen through Pro 13 M4',
  macbook: 'Air and Pro, M1 through M4',
  airpods: 'Pro, Max, 2nd–4th gen',
  applewatch: 'Series 4 through Ultra 2',
  laptop: 'Dell, HP, Lenovo, Asus…',
  gpu: 'Nvidia, AMD, Intel',
  tv: 'Samsung, LG, Sony, TCL…',
  camera: 'Canon, Nikon, Sony, Fujifilm…',
  drone: 'DJI, Autel, Parrot',
  gopro: 'Hero 8 through Hero 13',
  lens: 'Canon, Nikon, Sigma, Tamron…',
};

// only these two brand lists are drawn, the rest wait for the keyword path
const BRAND_LISTS = ['laptop', 'camera'];

export default function ProductsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const { colors, shadows } = useTheme();
  const { patch } = useWizard();
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const groups = ELECTRONICS_PRODUCTS.map((group) => ({
    title: group.title,
    products: q ? group.products.filter((p) => p.name.toLowerCase().includes(q)) : group.products,
  })).filter((g) => g.products.length > 0);

  const pick = (product: Product) => {
    if (product.brand) {
      patch({ productId: product.id, brandId: product.brand.id });
      router.navigate('/new-search/models');
      return;
    }
    if (BRAND_LISTS.includes(product.id)) {
      patch({ productId: product.id, brandId: undefined });
      router.navigate('/new-search/elec-brand');
      return;
    }
    // placeholder until the undrawn brand lists are built
    Alert.alert('Not built yet', `The ${product.name} brands are a later step.`);
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
              eyebrow="Product"
              step={{ filled: 2, total: 5 }}
              title="What"
              accent="product?"
              subtitle="Generic categories ask for a brand next; the rest go straight to models."
              onBack={() => router.back()}
            />
          </View>

          <View style={[styles.search, { backgroundColor: colors.surfaceField, borderColor: colors.borderField }]}>
            <SearchIcon color={colors.textPlaceholder} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search products"
              placeholderTextColor={colors.textPlaceholder}
              autoCorrect={false}
              style={[styles.searchInput, { color: colors.textPrimary }]}
            />
          </View>

          {groups.map((group) => (
            <View key={group.title} style={styles.group}>
              <Text style={[styles.groupTitle, { color: colors.textLabel }]}>{group.title}</Text>
              {group.products.map((product) => (
                <Pressable
                  key={product.id}
                  onPress={() => pick(product)}
                  accessibilityRole="button"
                  style={[
                    styles.row,
                    { backgroundColor: colors.surfaceCard, borderColor: colors.borderCard },
                    shadows.card,
                  ]}>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: colors.textPrimary }]}>{product.name}</Text>
                    <Text style={[styles.rowSub, { color: colors.textLabel }]} numberOfLines={1}>
                      {SUBLINES[product.id]}
                    </Text>
                  </View>
                  {product.brandStep ? (
                    <View style={[styles.brandTag, { backgroundColor: colors.accentTint }]}>
                      <Text style={[styles.brandTagText, { color: colors.accentText }]}>Brand</Text>
                    </View>
                  ) : null}
                  <ChevronRightIcon color={colors.textFaint} size={14} />
                </Pressable>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 18 },
  list: { gap: 14, paddingBottom: 40 },
  headerWrap: { marginBottom: 0 },

  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    height: 46,
    borderRadius: radius.thumb,
    borderWidth: 1,
    paddingHorizontal: 14,
  },
  searchInput: { flex: 1, fontFamily: font.medium, fontSize: 14, paddingVertical: 0 },

  group: { gap: 9 },
  groupTitle: {
    fontFamily: font.heavy,
    fontSize: 10.5,
    letterSpacing: tracking(10.5, 0.08),
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    borderRadius: 15,
    borderWidth: 1,
    paddingVertical: 11,
    paddingHorizontal: 13,
  },
  rowText: { flex: 1, gap: 2, minWidth: 0 },
  rowName: { fontFamily: font.heavy, fontSize: 13.5 },
  rowSub: { fontFamily: font.body, fontSize: 11 },
  brandTag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: radius.pill,
  },
  brandTagText: {
    fontFamily: font.heavy,
    fontSize: 9.5,
    letterSpacing: tracking(9.5, 0.06),
    textTransform: 'uppercase',
  },
});
