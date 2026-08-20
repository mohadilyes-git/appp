import {
  brandById,
  displayName,
  includeWords,
  modelKey,
  rootKeyword,
  withAlias,
  withCustom,
  type Brand,
  type ModelGroup,
} from './catalogue';
import { clampYears } from './car-specs';
import { type NewSearchRow } from './searches-db';
import { type WizardState } from './wizard-context';

const KM_PER_MILE = 1.60934;

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 'Any' means the user did not narrow it down, so the column stays empty
function pickOrNull(category: string | undefined, pick: string) {
  if (category !== 'cars' || !pick || pick === 'Any') return null;
  return pick.toLowerCase();
}

// a range entered back to front matches nothing, so read it the way it was meant
function ordered(min: number | null, max: number | null) {
  return min != null && max != null && min > max ? [max, min] : [min, max];
}

function parsePrice(value: string | undefined) {
  if (!value) return null;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : null;
}

// the matcher only sees suffixes: 'Pro', 'pro max', or 's10e' for glued letters
function suffixToken(group: ModelGroup, chip: string) {
  if (chip.length === 1 && group.prefix) return `${group.prefix}${chip}`.toLowerCase();
  return chip.toLowerCase();
}

// a row's keyword catches the whole brand, these words keep every other model out.
// four ways a sibling can steal this row's listings:
//   'pro' hides inside 'pro max', 'evo' inside 'evo nano'
//   every word of mine appears in it: 'laptop 3' inside 'laptop go 3'
//   it is the same family, one model along: 'swift 3' against 'swift 5'
//   and Base means the plain one, so it fences off its whole series
// siblings from other groups count too, a Mavic 3 Pro would fire the Mavic Pro row
function siblingExcludes(brand: Brand, group: ModelGroup, chip: string, alias: (t: string) => string) {
  const mine = suffixToken(group, chip);
  const mineWords = mine.split(' ');
  const out: string[] = [];
  for (const other of brand.groups) {
    for (const otherChip of other.chips) {
      const token = suffixToken(other, otherChip);
      // never fence off a piece of my own name, 'pro max' must not exclude 'pro'
      if (token === mine || mine.includes(token)) continue;
      const otherWords = token.split(' ');
      const swallowsMine = mineWords.every((word) => otherWords.includes(word));
      const sameFamily = other === group && mineWords.length > 1 && otherWords[0] === mineWords[0];
      const baseTakesTheSeries = other === group && chip === 'Base';
      if (baseTakesTheSeries || token.includes(mine) || swallowsMine || sameFamily) out.push(alias(token));
    }
  }
  return out;
}

// one wizard run fans out to one searches row per picked model,
// all stamped with the same group so home shows a single card
// the words the compiler puts on a row by itself: the model's own fence words
// and the tokens that keep its siblings out. reopening a search takes these
// back off the stored list, and what is left is what the user typed
export function machineWords(brand: Brand, group: ModelGroup, chip: string, category?: string) {
  const alias = category === 'cars' ? (t: string) => t : withAlias;
  return {
    include: includeWords(brand, displayName(brand, group, chip)).map(alias),
    exclude: siblingExcludes(brand, group, chip, alias),
  };
}

export function compileWizard(state: WizardState): { rows: NewSearchRow[]; skipped: string[] } | null {
  // the keyword path has no models to fan out, it is one row in the user's own words
  if (state.mode === 'keyword') {
    const text = state.keyword.text.trim().toLowerCase();
    if (!text) return null;
    const [priceMin, priceMax] = ordered(parsePrice(state.keyword.min), parsePrice(state.keyword.max));
    return {
      rows: [
        {
          keyword: text,
          label: state.keyword.text.trim(),
          group_id: null,
          platforms: [state.platform],
          location: state.location.trim() || null,
          lat: state.lat,
          lng: state.lng,
          radius_km: Math.round(state.radiusMiles * KM_PER_MILE),
          include_shipping: false,
          include_words: state.includeWords.join(',') || null,
          exclude_words: state.excludeWords.join(',') || null,
          price_min: priceMin,
          price_max: priceMax,
          year_min: null,
          year_max: null,
          mileage_min: null,
          mileage_max: null,
          transmission: null,
          fuel: null,
          body: null,
        },
      ],
      skipped: [],
    };
  }

  const found = brandById(state.brandId);
  if (!found) return null;
  // a model the user typed in is one more chip on the brand
  const brand = withCustom(found, state.customModels[found.id]);

  const picked = brand.groups.flatMap((group) =>
    group.chips
      .filter((chip) => state.models[modelKey(brand, group, chip)])
      .map((chip) => ({ group, chip, name: displayName(brand, group, chip) })),
  );
  if (picked.length === 0) return null;

  const location = state.location.trim() || null;

  // a car's year and condition are columns, not title words: plenty of real
  // listings never write "diesel" or "manual" even when that is what they are
  const cars = state.category === 'cars';
  const car = {
    year_min: state.category === 'cars' ? parsePrice(state.yearFrom) : null,
    year_max: state.category === 'cars' ? parsePrice(state.yearTo) : null,
    mileage_min: state.category === 'cars' ? parsePrice(state.mileageMin) : null,
    mileage_max: state.category === 'cars' ? parsePrice(state.mileageMax) : null,
    transmission: pickOrNull(state.category, state.transmission),
    fuel: pickOrNull(state.category, state.fuel),
    body: pickOrNull(state.category, state.body),
  };
  [car.year_min, car.year_max] = ordered(car.year_min, car.year_max);
  [car.mileage_min, car.mileage_max] = ordered(car.mileage_min, car.mileage_max);

  // the alias table is electronics spellings, cars must not borrow them
  const alias = cars ? (t: string) => t : withAlias;

  const skipped: string[] = [];
  const rows = picked.map(({ group, chip, name }) => {
    const include = [...new Set([...includeWords(brand, name).map(alias), ...state.includeWords])];
    // a word the user wants present beats the same word on the sibling fence
    const exclude = [...new Set([...siblingExcludes(brand, group, chip, alias), ...state.excludeWords])].filter(
      (word) => !include.includes(word),
    );
    // on 'all' every row takes the shared answers, on 'per model' only its own
    const own = state.carRows[`${brand.id}:${chip}`];
    const perModel = state.carScope === 'model' && picked.length > 1;
    const carRow: { year_min: number | null; year_max: number | null } | Record<string, never> =
      state.category === 'cars'
        ? perModel
          ? {
              year_min: ordered(parsePrice(own?.yearFrom), parsePrice(own?.yearTo))[0],
              year_max: ordered(parsePrice(own?.yearFrom), parsePrice(own?.yearTo))[1],
              mileage_min: ordered(parsePrice(own?.mileageMin), parsePrice(own?.mileageMax))[0],
              mileage_max: ordered(parsePrice(own?.mileageMin), parsePrice(own?.mileageMax))[1],
              transmission: pickOrNull('cars', own?.transmission ?? ''),
              fuel: pickOrNull('cars', own?.fuel ?? ''),
              body: pickOrNull('cars', own?.body ?? ''),
            }
          : car
        : {};

    const price = state.prices[modelKey(brand, group, chip)];
    let priceMin = parsePrice(price?.min);
    let priceMax = parsePrice(price?.max);
    // min above max would quietly match nothing, assume the fields were swapped
    if (priceMin != null && priceMax != null && priceMin > priceMax) {
      [priceMin, priceMax] = [priceMax, priceMin];
    }

    return {
      keyword: rootKeyword(brand, name),
      label: name,
      group_id: null as string | null,
      platforms: [state.platform],
      location,
      lat: state.lat,
      lng: state.lng,
      radius_km: Math.round(state.radiusMiles * KM_PER_MILE),
      include_shipping: false,
      include_words: include.join(',') || null,
      exclude_words: exclude.join(',') || null,
      price_min: priceMin,
      price_max: priceMax,
      ...car,
      ...carRow,
      // a 2015-2024 search on a Puma saves as 2019-2024, its own life
      ...(state.category === 'cars'
        ? clampYears(brand.id, chip, carRow.year_min ?? null, carRow.year_max ?? null)
        : {}),
    };
  });

  // a Sierra asked for in 2015-2024 can never exist, so it is not worth a row
  const live = rows.filter((row) => {
    const dead = row.year_min != null && row.year_max != null && row.year_min > row.year_max;
    if (dead) skipped.push(row.label);
    return !dead;
  });
  if (live.length === 0) return null;
  // stamped after the impossible ones are dropped, so one survivor stays solo
  if (live.length > 1) {
    const groupId = uuid();
    for (const row of live) row.group_id = groupId;
  }
  return { rows: live, skipped };
}
