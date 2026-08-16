import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { CATEGORIES, productById } from './catalogue';

// one object built up across the steps, so going back never loses input.
// number-ish fields stay strings while they live in text inputs.
export type WizardState = {
  category?: string;
  // the keyword path skips models entirely, so the save has to know which one you took
  mode: 'models' | 'keyword';
  // set when the wizard was opened on a saved search, so saving replaces it
  editingIds?: number[];
  brandId?: string;
  productId?: string;
  // selection keys are brand-scoped: 'iphone:13 series:Pro'
  models: Record<string, boolean>;
  // models the user typed in because the list did not have them, per brand
  customModels: Record<string, string[]>;
  // which brand's models are on screen right now
  activeBrandId?: string;
  // galaxy's line switcher
  line: string;
  prices: Record<string, { min: string; max: string }>;
  keyword: { text: string; min: string; max: string };
  // the picked place and its coordinates, straight from the geocoder
  location: string;
  lat: number | null;
  lng: number | null;
  // miles in the ui, converted to km when the search is saved
  radiusMiles: number;
  platform: string;
  includeWords: string[];
  excludeWords: string[];
  // cars get their own step: year, mileage and the three condition rows
  yearFrom: string;
  yearTo: string;
  mileageMin: string;
  mileageMax: string;
  transmission: string;
  fuel: string;
  body: string;
  // a model can override the shared year and mileage, keyed by its chip
  // one set of answers for every model, or a set each
  carScope: 'all' | 'model';
  carRows: Record<
    string,
    {
      yearFrom: string;
      yearTo: string;
      mileageMin: string;
      mileageMax: string;
      transmission: string;
      fuel: string;
      body: string;
    }
  >;
};

const INITIAL: WizardState = {
  mode: 'models',
  models: {},
  customModels: {},
  line: 'S',
  prices: {},
  keyword: { text: '', min: '', max: '' },
  location: '',
  lat: null,
  lng: null,
  radiusMiles: 25,
  platform: 'facebook',
  includeWords: [],
  excludeWords: [],
  yearFrom: '',
  yearTo: '',
  mileageMin: '',
  mileageMax: '',
  transmission: 'Any',
  fuel: 'Any',
  body: 'Any',
  carScope: 'all',
  carRows: {},
};

// the car path asks one extra question, so does an electronics product
// that needs a brand picked before its models
export function stepTotal(state: WizardState) {
  // keyword reached through a list screen is one step longer than keyword
  // reached straight off the category screen, which has no list to show
  if (state.mode === 'keyword') {
    return CATEGORIES.find((c) => c.id === state.category)?.wired ? 4 : 3;
  }
  if (state.category === 'cars') return 6;
  return productById(state.productId)?.brandStep ? 6 : 5;
}

type Patch = Partial<WizardState> | ((current: WizardState) => Partial<WizardState>);

type WizardValue = {
  state: WizardState;
  patch: (p: Patch) => void;
  reset: () => void;
};

const WizardContext = createContext<WizardValue | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WizardState>(INITIAL);

  // the function form reads the freshest state, for per-keystroke writes
  const patch = useCallback((p: Patch) => {
    setState((current) => ({ ...current, ...(typeof p === 'function' ? p(current) : p) }));
  }, []);

  const reset = useCallback(() => setState(INITIAL), []);

  const value = useMemo(() => ({ state, patch, reset }), [state, patch, reset]);

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useWizard() {
  const value = useContext(WizardContext);
  if (!value) throw new Error('useWizard has to be used inside the new-search screens');
  return value;
}
