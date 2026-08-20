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
  withCustom,
  type Brand,
  type ModelGroup,
} from './catalogue';
import { clampYears } from './car-specs';
import { machineWords } from './search-compiler';
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

type Picked = { row: Search; group?: ModelGroup; chip?: string };

// a stored row carries the user's words and the fences the compiler adds. take
// the fences off each row, then keep only what every row still agrees on: a
// word the user typed is on all of them, a fence belongs to one model
function ownWords(brand: Brand, picks: Picked[], category: string) {
  const lists = picks.map(({ row, group, chip }) => {
    if (!group || !chip) return { include: row.includeWords, exclude: row.excludeWords };
    const mine = machineWords(brand, group, chip, category);
    return {
      include: row.includeWords.filter((w) => !mine.include.includes(w)),
      exclude: row.excludeWords.filter((w) => !mine.exclude.includes(w)),
    };
  });
  const shared = (field: 'include' | 'exclude') =>
    lists[0][field].filter((word) => lists.every((l) => l[field].includes(word)));
  return { includeWords: shared('include'), excludeWords: shared('exclude') };
}

// the answers a car row carries besides its years
function carSpecs(row: Search) {
  return [row.mileageMin, row.mileageMax, row.transmission, row.fuel, row.body].join('|');
}

// 'all models' saves one set of answers, clamped to each model's own life, so
// rows differing on years does not mean the user answered per model. it only
// counts as per model when the shared answers cannot rebuild every row
function answeredPerModel(brand: Brand, picks: Picked[], from: number | null, to: number | null) {
  if (picks.length < 2) return false;
  if (picks.some((p) => carSpecs(p.row) !== carSpecs(picks[0].row))) return true;
  return picks.some(({ row, chip }) => {
    const shared = clampYears(brand.id, chip ?? row.label ?? '', from, to);
    return shared.year_min !== (row.yearMin ?? null) || shared.year_max !== (row.yearMax ?? null);
  });
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
      includeWords: first.includeWords,
      excludeWords: first.excludeWords,
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

  const picks: Picked[] = [];

  for (const row of rows) {
    const label = row.label ?? '';
    let key = '';
    let picked: Picked = { row };
    for (const group of brand.groups) {
      const chip = group.chips.find((c) => displayName(brand, group, c) === label);
      if (chip) {
        key = modelKey(brand, group, chip);
        picked = { row, group, chip };
        break;
      }
    }
    picks.push(picked);
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

  // typed-in models are chips too once they are back on the brand, so their
  // fences can be worked out the same way as any other model's
  const full = withCustom(brand, custom);
  for (const pick of picks) {
    if (pick.group) continue;
    const group = full.groups.find((g) => g.title === CUSTOM_GROUP);
    const chip = group?.chips.find((c) => displayName(full, group, c) === (pick.row.label ?? ''));
    if (group && chip) Object.assign(pick, { group, chip });
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
    ...ownWords(full, picks, category),
    // each row was saved clamped to its own model's life, so the shared range is
    // the widest of them — taking the first row's would narrow every other model
    yearFrom: asText(spanOf(rows, 'yearMin', Math.min)),
    yearTo: asText(spanOf(rows, 'yearMax', Math.max)),
    mileageMin: asText(first.mileageMin),
    mileageMax: asText(first.mileageMax),
    transmission: titleCase(first.transmission),
    fuel: titleCase(first.fuel),
    body: titleCase(first.body),
    ...carAnswers(full, picks, category, spanOf(rows, 'yearMin', Math.min), spanOf(rows, 'yearMax', Math.max)),
  };
}

// one set of answers for every model, or a set each — whichever the rows say
function carAnswers(
  brand: Brand,
  picks: Picked[],
  category: string,
  from: number | null,
  to: number | null,
) {
  if (category !== 'cars' || !answeredPerModel(brand, picks, from, to)) {
    return { carScope: 'all' as const, carRows: {} };
  }
  const carRows: WizardState['carRows'] = {};
  for (const { row, chip } of picks) {
    carRows[`${brand.id}:${chip ?? row.label ?? ''}`] = {
      yearFrom: asText(row.yearMin),
      yearTo: asText(row.yearMax),
      mileageMin: asText(row.mileageMin),
      mileageMax: asText(row.mileageMax),
      transmission: titleCase(row.transmission),
      fuel: titleCase(row.fuel),
      body: titleCase(row.body),
    };
  }
  return { carScope: 'model' as const, carRows };
}
