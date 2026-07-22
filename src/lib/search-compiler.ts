import { brandById, displayName, includeWords, modelKey, rowKeyword, withAlias, type ModelGroup } from './catalogue';
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

// a row's keyword catches the whole brand, these words keep siblings out.
// Base excludes every variant, others exclude the ones their own token hides in:
// 'pro' is inside 'pro max', 'x' is inside 'xr', 'se' is inside 'se 2'.
// the word check catches near-twins string containment misses, like
// 'pro 14 m1 pro' vs 'pro 14 m1 max' — every word of mine is in the sibling
function siblingExcludes(group: ModelGroup, chip: string) {
  const mine = suffixToken(group, chip);
  const mineWords = mine.split(' ');
  const out: string[] = [];
  for (const other of group.chips) {
    if (other === chip) continue;
    const token = suffixToken(group, other);
    const otherWords = token.split(' ');
    const swallowsMine = mineWords.every((word) => otherWords.includes(word));
    if (chip === 'Base' || token.includes(mine) || swallowsMine) out.push(withAlias(token));
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

  return picked.map(({ group, chip, name }) => {
    const include = [...new Set([...includeWords(brand, name).map(withAlias), ...state.includeWords])];
    // a word the user wants present beats the same word on the sibling fence
    const exclude = [...new Set([...siblingExcludes(group, chip), ...state.excludeWords])].filter(
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
      keyword: rowKeyword(brand, group, name),
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
    };
  });
}
