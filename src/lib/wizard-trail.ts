import { type Href } from 'expo-router';

import { CATEGORIES, productById } from './catalogue';
import { type WizardState } from './wizard-context';

// the list screen a category opens straight after the category screen
function listScreen(category: string | undefined): Href | null {
  switch (category) {
    case undefined:
    case 'other':
      return null;
    case 'phones':
      return '/new-search/brand';
    case 'consoles':
      return '/new-search/consoles';
    case 'cars':
      return '/new-search/car-make';
    case 'electronics':
      return '/new-search/products';
    // furniture, trailers, kitchen and diabetic all share one picker
    default:
      return '/new-search/picker';
  }
}

// the screens a draft walks through, in order. reopening a saved search lands
// on the last one and slots the rest of the list in behind it, and every
// screen reads the list to name the one before it
export function wizardTrail(state: WizardState): Href[] {
  const trail: Href[] = ['/new-search'];
  const list = listScreen(state.category);

  // the keyword screen is reached from a category's list screen, unless the
  // category has no list of its own
  if (state.mode === 'keyword') {
    if (list && CATEGORIES.find((c) => c.id === state.category)?.wired) trail.push(list);
    trail.push('/new-search/keyword', '/new-search/filters');
    return trail;
  }

  if (list) trail.push(list);
  if (state.category === 'electronics' && productById(state.productId)?.brandStep) {
    trail.push('/new-search/elec-brand');
  }
  trail.push('/new-search/models');
  if (state.category === 'cars') trail.push('/new-search/car-details');
  trail.push('/new-search/prices', '/new-search/filters');
  return trail;
}

// the nested stack knows its screens by file name, not by url path
export function screenName(route: Href): string {
  const path = String(route);
  return path === '/new-search' ? 'index' : path.slice('/new-search/'.length);
}

// what each screen holds, in the words the back hint uses: "Back to models"
const SCREEN_NAMES: Record<string, string> = {
  '/new-search': 'categories',
  '/new-search/brand': 'brands',
  '/new-search/consoles': 'consoles',
  '/new-search/car-make': 'makes',
  '/new-search/products': 'products',
  '/new-search/elec-brand': 'brands',
  '/new-search/picker': 'types',
  '/new-search/models': 'models',
  '/new-search/car-details': 'year and condition',
  '/new-search/prices': 'prices',
  '/new-search/keyword': 'keyword',
};

// the shared picker holds something different in each category
const PICKER_NAMES: Record<string, string> = {
  trailers: 'trailers',
  kitchen: 'appliances',
  diabetic: 'brands',
};

// the screen sitting behind this one, so back says where it goes instead of
// leaving people to remember what they came through
export function backHint(state: WizardState, pathname: string): string | undefined {
  const trail = wizardTrail(state).map(String);
  const at = trail.indexOf(pathname);
  if (at < 1) return undefined;
  const behind = trail[at - 1];
  if (behind === '/new-search/picker') return PICKER_NAMES[state.category ?? ''] ?? 'types';
  return SCREEN_NAMES[behind];
}
