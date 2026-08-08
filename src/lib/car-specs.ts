import { MODEL_SPECS } from './catalogue-cars';

// the letters MODEL_SPECS packs its fuels, gearboxes and shapes into
export const FUEL_LABELS: Record<string, string> = {
  p: 'Petrol',
  d: 'Diesel',
  h: 'Hybrid',
  e: 'Electric',
};

export const TRANSMISSION_LABELS: Record<string, string> = {
  m: 'Manual',
  a: 'Automatic',
};

export const BODY_LABELS: Record<string, string> = {
  h: 'Hatchback',
  s: 'Saloon',
  e: 'Estate',
  u: 'SUV',
  c: 'Coupe',
  v: 'Convertible',
  m: 'MPV',
  n: 'Van',
  p: 'Pickup',
};

export const THIS_YEAR = new Date().getFullYear();

export function specFor(brandId: string | undefined, model: string) {
  return brandId ? MODEL_SPECS[`${brandId}:${model}`] : undefined;
}

// a model still on sale carries 0 for its last year
export function lastYear(spec: { e: number }) {
  return spec.e || THIS_YEAR;
}

function labelled(codes: string[], labels: Record<string, string>) {
  return codes.map((c) => labels[c]).filter(Boolean);
}

// what the year and condition step is allowed to offer for the models picked.
// years span every pick, but a spec is only offered when EVERY pick has it —
// mixing a diesel Focus with an electric Leaf leaves fuel on Any, correctly
export function allowedFor(brandId: string | undefined, models: string[]) {
  const specs = models.map((m) => specFor(brandId, m)).filter(Boolean) as {
    y: number;
    e: number;
    f: string;
    t: string;
    b: string;
  }[];

  if (specs.length === 0) {
    return {
      yearMin: 1990,
      yearMax: THIS_YEAR,
      fuels: Object.values(FUEL_LABELS),
      transmissions: Object.values(TRANSMISSION_LABELS),
      bodies: Object.values(BODY_LABELS),
    };
  }

  const shared = (key: 'f' | 't' | 'b') =>
    [...specs[0][key]].filter((code) => specs.every((s) => s[key].includes(code)));

  return {
    yearMin: Math.min(...specs.map((s) => s.y)),
    yearMax: Math.max(...specs.map(lastYear)),
    fuels: labelled(shared('f'), FUEL_LABELS),
    transmissions: labelled(shared('t'), TRANSMISSION_LABELS),
    bodies: labelled(shared('b'), BODY_LABELS),
  };
}

// one model on its own, unlike allowedFor which narrows to what every pick shares
export function allowedForModel(brandId: string | undefined, model: string) {
  const spec = specFor(brandId, model);
  if (!spec) {
    return {
      fuels: Object.values(FUEL_LABELS),
      transmissions: Object.values(TRANSMISSION_LABELS),
      bodies: Object.values(BODY_LABELS),
    };
  }
  return {
    fuels: labelled([...spec.f], FUEL_LABELS),
    transmissions: labelled([...spec.t], TRANSMISSION_LABELS),
    bodies: labelled([...spec.b], BODY_LABELS),
  };
}

// each saved row is pinned to its own model's life, so a 2015-2024 search
// on a Puma saves 2019-2024 and never alerts on a year it cannot be
export function clampYears(
  brandId: string | undefined,
  model: string,
  from: number | null,
  to: number | null,
) {
  const spec = specFor(brandId, model);
  if (!spec) return { year_min: from, year_max: to };
  const end = lastYear(spec);
  return {
    year_min: from == null ? spec.y : Math.max(from, spec.y),
    year_max: to == null ? end : Math.min(to, end),
  };
}
