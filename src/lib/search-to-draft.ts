import {
  CAMERA_BRANDS,
  CAR_MAKES,
  CONSOLE_BRANDS,
  CUSTOM_GROUP,
  displayName,
  DRONE_BRANDS,
  GPU_BRANDS,
  HOUSEHOLD,
  LAPTOP_BRANDS,
  LENS_BRANDS,
  modelKey,
  PHONE_BRANDS,
  TV_BRANDS,
  brandById,
  type Brand,
} from './catalogue';
import { type Search } from './searches-db';
import { type WizardState } from './wizard-context';

const KM_PER_MILE = 1.60934;

// every brand paired with the category it was picked from, so editing a search
// drops you back on the same trail you walked the first time
type Shelved = { brand: Brand; category: string; productId?: string };

function shelf(): Shelved[] {
  const out: Shelved[] = [];
  for (const b of PHONE_BRANDS) out.push({ brand: b.brand, category: 'phones' });
  for (const b of CONSOLE_BRANDS) out.push({ brand: b.brand, category: 'consoles' });
  for (const m of CAR_MAKES) out.push({ brand: m.brand, category: 'cars' });
  for (const [category, list] of Object.entries(HOUSEHOLD))
    for (const e of list.entries) out.push({ brand: e.brand, category });
  // electronics also remembers which product the brand sat under, so the trail
  // can put the product and brand screens back behind the models
  const shelves: [{ brand: Brand }[], string][] = [
    [LAPTOP_BRANDS, 'laptop'],
    [CAMERA_BRANDS, 'camera'],
    [LENS_BRANDS, 'lens'],
    [GPU_BRANDS, 'gpu'],
    [TV_BRANDS, 'tv'],
    [DRONE_BRANDS, 'drone'],
  ];
  for (const [list, productId] of shelves)
    for (const e of list) out.push({ brand: e.brand, category: 'electronics', productId });
  // these products are one brand each, so the product id is the brand id
  for (const id of ['ipad', 'macbook', 'airpods', 'applewatch', 'gopro', 'insta360', 'osmo']) {
    const brand = brandById(id);
    if (brand) out.push({ brand, category: 'electronics', productId: id });
  }
  return out;
}

// the columns store lowercase, the pills read title case
function titleCase(value: string | null | undefined) {
  if (!value) return 'Any';
  return value
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

const asText = (n: number | null | undefined) => (n != null ? String(n) : '');

function spanOf(rows: Search[], field: 'yearMin' | 'yearMax', pick: (...n: number[]) => number) {
  const values = rows.map((r) => r[field]).filter((n): n is number => n != null);
  return values.length > 0 ? pick(...values) : null;
}

// turn a saved search back into the draft the wizard walks, so an edit is the
// same six screens rather than a second, half-featured settings form
export function draftFromRows(rows: Search[], base: WizardState): WizardState {
  const first = rows[0];
  const shared = {
    editingIds: rows.map((r) => r.id),
    location: first.location ?? '',
    lat: first.lat ?? null,
    lng: first.lng ?? null,
    radiusMiles: Math.max(1, Math.round((first.radiusKm ?? 40) / KM_PER_MILE)),
    platform: first.platforms[0] ?? 'facebook',
  };

  const found = shelf().find((s) => s.brand.root === first.keyword);
  if (!found) {
    // no catalogue brand searches with that word, so it was typed by hand
    return {
      ...base,
      ...shared,
      mode: 'keyword',
      category: base.category ?? 'other',
      keyword: {
        text: first.label ?? first.keyword,
        min: asText(first.priceMin),
        max: asText(first.priceMax),
      },
    };
  }

  const { brand, category, productId } = found;
  const models: Record<string, boolean> = {};
  const prices: Record<string, { min: string; max: string }> = {};
  const custom: string[] = [];

  for (const row of rows) {
    const label = row.label ?? '';
    let key = '';
    for (const group of brand.groups) {
      const chip = group.chips.find((c) => displayName(brand, group, c) === label);
      if (chip) {
        key = modelKey(brand, group, chip);
        break;
      }
    }
    if (!key) {
      // not in the catalogue, so it was typed in on the model screen
      const typed =
        brand.name && label.startsWith(`${brand.name} `) ? label.slice(brand.name.length + 1) : label;
      custom.push(typed);
      key = `${brand.id}:${CUSTOM_GROUP}:${typed}`;
    }
    models[key] = true;
    prices[key] = { min: asText(row.priceMin), max: asText(row.priceMax) };
  }

  return {
    ...base,
    ...shared,
    mode: 'models',
    category,
    brandId: brand.id,
    productId,
    models,
    prices,
    customModels: custom.length > 0 ? { [brand.id]: custom } : {},
    // each row was saved clamped to its own model's life, so the shared range is
    // the widest of them — taking the first row's would narrow every other model
    yearFrom: asText(spanOf(rows, 'yearMin', Math.min)),
    yearTo: asText(spanOf(rows, 'yearMax', Math.max)),
    mileageMin: asText(first.mileageMin),
    mileageMax: asText(first.mileageMax),
    transmission: titleCase(first.transmission),
    fuel: titleCase(first.fuel),
    body: titleCase(first.body),
    carScope: 'all',
    carRows: {},
  };
}
