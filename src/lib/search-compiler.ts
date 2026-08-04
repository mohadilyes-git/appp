import {
  brandById,
  displayName,
  includeWords,
  modelKey,
  rootKeyword,
  withAlias,
  type Brand,
  type ModelGroup,
} from './catalogue';
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
function siblingExcludes(brand: Brand, group: ModelGroup, chip: string) {
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
      if (baseTakesTheSeries || token.includes(mine) || swallowsMine || sameFamily) out.push(withAlias(token));
    }
  }
  return out;
}

// one wizard run fans out to one searches row per picked model,
// all stamped with the same group so home shows a single card
export function compileWizard(state: WizardState): NewSearchRow[] | null {
  const brand = brandById(state.brandId);
  if (!brand) return null;

  const picked = brand.groups.flatMap((group) =>
    group.chips
      .filter((chip) => state.models[modelKey(brand, group, chip)])
      .map((chip) => ({ group, chip, name: displayName(brand, group, chip) })),
  );
  if (picked.length === 0) return null;

  const groupId = picked.length > 1 ? uuid() : null;
  const location = state.location.trim() || null;

  // a car's year and condition are columns, not title words: plenty of real
  // listings never write "diesel" or "manual" even when that is what they are
  const car = {
    year_min: state.category === 'cars' ? parsePrice(state.yearFrom) : null,
    year_max: state.category === 'cars' ? parsePrice(state.yearTo) : null,
    mileage_min: state.category === 'cars' ? parsePrice(state.mileageMin) : null,
    mileage_max: state.category === 'cars' ? parsePrice(state.mileageMax) : null,
    transmission: pickOrNull(state.category, state.transmission),
    fuel: pickOrNull(state.category, state.fuel),
    body: pickOrNull(state.category, state.body),
  };
  // a year the wrong way round would match nothing, assume they were swapped
  if (car.year_min != null && car.year_max != null && car.year_min > car.year_max) {
    [car.year_min, car.year_max] = [car.year_max, car.year_min];
  }
  if (car.mileage_min != null && car.mileage_max != null && car.mileage_min > car.mileage_max) {
    [car.mileage_min, car.mileage_max] = [car.mileage_max, car.mileage_min];
  }

  return picked.map(({ group, chip, name }) => {
    const include = [...new Set([...includeWords(brand, name).map(withAlias), ...state.includeWords])];
    // a word the user wants present beats the same word on the sibling fence
    const exclude = [...new Set([...siblingExcludes(brand, group, chip), ...state.excludeWords])].filter(
      (word) => !include.includes(word),
    );
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
      group_id: groupId,
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
    };
  });
}
