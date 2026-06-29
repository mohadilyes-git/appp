import { supabase } from './supabase';

export type Search = {
  id: number;
  keyword: string;
  // what the card shows, keyword is the machine's matching term
  label?: string;
  groupId?: string;
  platforms: string[];
  location?: string;
  radiusKm?: number;
  includeShipping: boolean;
  priceMin?: number;
  priceMax?: number;
  active: boolean;
  // how many listings have matched this search so far
  hits: number;
};

// what the table actually stores, before it's turned into a Search
type Row = {
  id: number;
  keyword: string;
  label: string | null;
  group_id: string | null;
  platforms: string[] | null;
  location: string | null;
  radius_km: number | null;
  include_shipping: boolean;
  price_min: string | number | null;
  price_max: string | number | null;
  active: boolean;
  matches: { count: number }[];
};

// matches(count) folds the join table into a hit counter per row
const COLUMNS =
  'id, keyword, label, group_id, platforms, location, radius_km, include_shipping, price_min, price_max, active, matches(count)';

function toSearch(row: Row): Search {
  return {
    id: row.id,
    keyword: row.keyword,
    label: row.label ?? undefined,
    groupId: row.group_id ?? undefined,
    platforms: row.platforms ?? [],
    location: row.location ?? undefined,
    radiusKm: row.radius_km ?? undefined,
    includeShipping: row.include_shipping,
    priceMin: row.price_min == null ? undefined : Number(row.price_min),
    priceMax: row.price_max == null ? undefined : Number(row.price_max),
    active: row.active,
    hits: row.matches?.[0]?.count ?? 0,
  };
}

export async function listSearches() {
  const { data, error } = await supabase
    .from('searches')
    .select(COLUMNS)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data as Row[]).map(toSearch);
}

// a wizard search is several rows sharing a group, so pausing takes a list of ids
export async function setSearchesActive(ids: number[], active: boolean) {
  const { error } = await supabase.from('searches').update({ active }).in('id', ids);
  if (error) throw error;
}
