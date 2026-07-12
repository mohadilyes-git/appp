import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

// one object built up across the steps, so going back never loses input.
// number-ish fields stay strings while they live in text inputs.
export type WizardState = {
  category?: string;
  brandId?: string;
  productId?: string;
  // selection keys are brand-scoped: 'iphone:13 series:Pro'
  models: Record<string, boolean>;
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
};

const INITIAL: WizardState = {
  models: {},
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
};

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
