// every list the new-search wizard picks from, mined from the design files.
// data lives here so the fourteen model screens can be one component.
// the long tail (tvs, drones, lenses, cameras, gpus) sits in catalogue-electronics.

import { CAR_MAKES } from './catalogue-cars';
import { HOUSEHOLD } from './catalogue-home';
import {
  CAMERA_BRANDS,
  DRONE_BRANDS,
  ELECTRONICS_ALIASES,
  GOPRO,
  GPU_BRANDS,
  INSTA360,
  LENS_BRANDS,
  OSMO,
  TV_BRANDS,
} from './catalogue-electronics';

export * from './catalogue-electronics';
export * from './catalogue-cars';
export * from './catalogue-home';

export type ModelGroup = {
  title: string;
  // the series number that prefixes a chip's display name, '' when chips are already full names
  prefix: string;
  chips: string[];
};

// a line splits one brand's groups across switcher pills, it never changes the keyword
export type GalaxyLine = {
  id: string;
  label: string;
  groupTitles: string[];
};

export type Brand = {
  id: string;
  // display prefix for model names, '' when the chips already carry it
  name: string;
  // the one keyword a whole wizard run searches with: the product word plus the maker
  root: string;
  groups: ModelGroup[];
  lines?: GalaxyLine[];
};

export type Category = {
  id: string;
  name: string;
  path: string;
  // only some categories have their steps drawn, the rest fall through to keyword
  wired: boolean;
};

export const CATEGORIES: Category[] = [
  { id: 'phones', name: 'Phones', path: 'Brand → models → price each', wired: true },
  { id: 'consoles', name: 'Games Consoles', path: 'Console → edition → price', wired: true },
  { id: 'electronics', name: 'Electronics', path: 'Product → model → price', wired: true },
  { id: 'cars', name: 'Cars', path: 'Make → model → year → price', wired: true },
  { id: 'furniture', name: 'Furniture', path: 'Type → models → price each', wired: true },
  { id: 'trailers', name: 'Trailers', path: 'Maker or type → models → price', wired: true },
  { id: 'kitchen', name: 'Kitchen / Utilities', path: 'Appliance → brand → price', wired: true },
  { id: 'diabetic', name: 'Diabetic Supplies', path: 'Brand → product → price', wired: true },
  { id: 'other', name: 'Other', path: 'Just your own keywords', wired: false },
];

// ---- phones -------------------------------------------------------------

export const IPHONE: Brand = {
  id: 'iphone',
  name: 'iPhone',
  root: 'iphone',
  groups: [
    { title: 'No series', prefix: '', chips: ['SE', 'SE 2', 'SE 3', '8', '8 Plus', 'X', 'XR', 'XS', 'XS Max'] },
    { title: '11 series', prefix: '11', chips: ['Base', 'Pro', 'Pro Max'] },
    { title: '12 series', prefix: '12', chips: ['Base', 'Mini', 'Pro', 'Pro Max'] },
    { title: '13 series', prefix: '13', chips: ['Base', 'Mini', 'Pro', 'Pro Max'] },
    { title: '14 series', prefix: '14', chips: ['Base', 'Plus', 'Pro', 'Pro Max'] },
    { title: '15 series', prefix: '15', chips: ['Base', 'Plus', 'Pro', 'Pro Max'] },
    { title: '16 series', prefix: '16', chips: ['Base', 'e', 'Plus', 'Pro', 'Pro Max'] },
    { title: '17 series', prefix: '17', chips: ['Base', 'Air', 'Pro', 'Pro Max'] },
  ],
};

export const GALAXY: Brand = {
  id: 'galaxy',
  name: 'Galaxy',
  root: 'samsung galaxy',
  groups: [
    { title: 'S10 series', prefix: 'S10', chips: ['Base', 'Plus', 'e', '5G'] },
    { title: 'S20 series', prefix: 'S20', chips: ['Base', 'Plus', 'Ultra', 'FE'] },
    { title: 'S21 series', prefix: 'S21', chips: ['Base', 'Plus', 'Ultra', 'FE'] },
    { title: 'S22 series', prefix: 'S22', chips: ['Base', 'Plus', 'Ultra'] },
    { title: 'S23 series', prefix: 'S23', chips: ['Base', 'Plus', 'Ultra', 'FE'] },
    { title: 'S24 series', prefix: 'S24', chips: ['Base', 'Plus', 'Ultra', 'FE'] },
    { title: 'S25 series', prefix: 'S25', chips: ['Base', 'Plus', 'Ultra', 'Edge', 'FE'] },
    // the design only draws the S line, these three are filled in to match
    { title: 'Z Flip', prefix: '', chips: ['Z Flip 3', 'Z Flip 4', 'Z Flip 5', 'Z Flip 6', 'Z Flip 7'] },
    { title: 'Z Fold', prefix: '', chips: ['Z Fold 3', 'Z Fold 4', 'Z Fold 5', 'Z Fold 6', 'Z Fold 7'] },
    { title: 'A series', prefix: '', chips: ['A14', 'A15', 'A16', 'A25', 'A34', 'A35', 'A36', 'A54', 'A55', 'A56'] },
    { title: 'Note', prefix: '', chips: ['Note 9', 'Note 10', 'Note 10+', 'Note 20', 'Note 20 Ultra'] },
  ],
  lines: [
    { id: 'S', label: 'Galaxy S', groupTitles: ['S10 series', 'S20 series', 'S21 series', 'S22 series', 'S23 series', 'S24 series', 'S25 series'] },
    { id: 'Z', label: 'Galaxy Z', groupTitles: ['Z Flip', 'Z Fold'] },
    { id: 'A', label: 'Galaxy A', groupTitles: ['A series'] },
    { id: 'N', label: 'Note', groupTitles: ['Note'] },
  ],
};

export const PIXEL: Brand = {
  id: 'pixel',
  name: 'Pixel',
  root: 'pixel',
  groups: [
    { title: 'No series', prefix: '', chips: ['4', '4a', '4 XL', '5', '5a'] },
    { title: '6 series', prefix: '6', chips: ['Base', '6a', 'Pro'] },
    { title: '7 series', prefix: '7', chips: ['Base', '7a', 'Pro'] },
    { title: '8 series', prefix: '8', chips: ['Base', '8a', 'Pro'] },
    { title: '9 series', prefix: '9', chips: ['Base', '9a', 'Pro', 'Pro XL', 'Pro Fold'] },
    { title: '10 series', prefix: '10', chips: ['Base', 'Pro', 'Pro XL', 'Pro Fold'] },
  ],
};

export const PHONE_BRANDS = [
  { id: 'iphone', card: 'Apple · iPhone', brand: IPHONE },
  { id: 'galaxy', card: 'Samsung', brand: GALAXY },
  { id: 'pixel', card: 'Google Pixel', brand: PIXEL },
];

// ---- consoles -----------------------------------------------------------

export const PLAYSTATION: Brand = {
  id: 'playstation',
  // chips already say PS5, a name here would render "PlayStation PS5"
  name: '',
  root: 'playstation',
  groups: [
    { title: 'PS4 family', prefix: '', chips: ['PS4', 'PS4 Slim', 'PS4 Pro'] },
    { title: 'PS5 family', prefix: '', chips: ['PS5', 'PS5 Digital', 'PS5 Slim', 'PS5 Pro'] },
    { title: 'Handheld', prefix: '', chips: ['PS Portal', 'PS Vita'] },
  ],
};

export const XBOX: Brand = {
  id: 'xbox',
  name: 'Xbox',
  root: 'xbox',
  groups: [
    { title: 'Xbox One family', prefix: '', chips: ['One', 'One S', 'One X'] },
    { title: 'Xbox Series family', prefix: '', chips: ['Series S', 'Series S 1TB', 'Series X', 'Series X Digital'] },
  ],
};

export const NINTENDO: Brand = {
  id: 'nintendo',
  name: '',
  root: 'nintendo',
  groups: [
    { title: 'Switch family', prefix: '', chips: ['Switch', 'Switch Lite', 'Switch OLED'] },
    { title: 'Switch 2', prefix: '', chips: ['Switch 2'] },
    { title: 'Older systems', prefix: '', chips: ['3DS', 'New 3DS XL', '2DS XL', 'Wii', 'Wii U'] },
  ],
};

export const STEAM_DECK: Brand = {
  id: 'steamdeck',
  name: 'Steam Deck',
  root: 'steam deck',
  groups: [
    { title: 'LCD', prefix: '', chips: ['LCD 64GB', 'LCD 256GB', 'LCD 512GB'] },
    { title: 'OLED', prefix: '', chips: ['OLED 512GB', 'OLED 1TB'] },
  ],
};

export const CONSOLE_BRANDS = [
  { id: 'playstation', card: 'PlayStation', brand: PLAYSTATION },
  { id: 'xbox', card: 'Xbox', brand: XBOX },
  { id: 'nintendo', card: 'Nintendo', brand: NINTENDO },
  { id: 'steamdeck', card: 'Steam Deck', brand: STEAM_DECK },
];

// ---- electronics --------------------------------------------------------

export const IPAD: Brand = {
  id: 'ipad',
  name: 'iPad',
  root: 'ipad',
  groups: [
    { title: 'iPad (base)', prefix: '', chips: ['8th gen', '9th gen', '10th gen', '11th gen'] },
    { title: 'iPad Air', prefix: '', chips: ['Air 3', 'Air 4', 'Air 5', 'Air M2', 'Air M3'] },
    { title: 'iPad Pro', prefix: '', chips: ['Pro 11 2018', 'Pro 11 2020', 'Pro 11 M1', 'Pro 11 M2', 'Pro 11 M4', 'Pro 12.9 2018', 'Pro 12.9 2020', 'Pro 12.9 M1', 'Pro 12.9 M2', 'Pro 13 M4'] },
    { title: 'iPad mini', prefix: '', chips: ['mini 4', 'mini 5', 'mini 6', 'mini 7'] },
  ],
};

export const MACBOOK: Brand = {
  id: 'macbook',
  name: 'MacBook',
  root: 'macbook',
  groups: [
    { title: 'MacBook Air · Apple silicon', prefix: '', chips: ['Air 13 M1', 'Air 13 M2', 'Air 15 M2', 'Air 13 M3', 'Air 15 M3', 'Air 13 M4', 'Air 15 M4'] },
    { title: 'MacBook Pro 13–14', prefix: '', chips: ['Pro 13 M1', 'Pro 13 M2', 'Pro 14 M1 Pro', 'Pro 14 M1 Max', 'Pro 14 M2 Pro', 'Pro 14 M2 Max', 'Pro 14 M3', 'Pro 14 M3 Pro', 'Pro 14 M3 Max', 'Pro 14 M4', 'Pro 14 M4 Pro', 'Pro 14 M4 Max', 'Pro 14 M5'] },
    { title: 'MacBook Pro 16', prefix: '', chips: ['Pro 16 M1 Pro', 'Pro 16 M1 Max', 'Pro 16 M2 Pro', 'Pro 16 M2 Max', 'Pro 16 M3 Pro', 'Pro 16 M3 Max', 'Pro 16 M4 Pro', 'Pro 16 M4 Max'] },
    { title: 'Intel era', prefix: '', chips: ['Air 2017', 'Air 2019', 'Pro 2015', 'Pro 2019', 'Pro 2020'] },
  ],
};

export const AIRPODS: Brand = {
  id: 'airpods',
  name: 'AirPods',
  root: 'airpods',
  groups: [
    { title: 'Standard', prefix: '', chips: ['1st gen', '2nd gen', '3rd gen', '4th gen', '4th gen ANC'] },
    { title: 'Pro', prefix: '', chips: ['Pro', 'Pro 2', 'Pro 2 USB-C', 'Pro 3'] },
    { title: 'Max', prefix: '', chips: ['Max', 'Max USB-C'] },
  ],
};

export const APPLE_WATCH: Brand = {
  id: 'applewatch',
  name: 'Apple Watch',
  root: 'apple watch',
  groups: [
    { title: 'Series 4–6 and SE', prefix: '', chips: ['Series 4', 'Series 5', 'Series 6', 'SE', 'SE 2', 'SE 3'] },
    { title: 'Series 7–11', prefix: '', chips: ['Series 7', 'Series 8', 'Series 9', 'Series 10', 'Series 11'] },
    { title: 'Ultra', prefix: '', chips: ['Ultra', 'Ultra 2', 'Ultra 3'] },
  ],
};


export const DELL: Brand = {
  id: 'dell',
  name: 'Dell',
  root: 'laptop dell',
  groups: [
    { title: 'XPS', prefix: '', chips: ['XPS 13', 'XPS 14', 'XPS 15', 'XPS 16', 'XPS 17'] },
    { title: 'Inspiron', prefix: '', chips: ['Inspiron 14', 'Inspiron 15', 'Inspiron 16'] },
    // sellers type the four digit model, never the series number
    { title: 'Latitude', prefix: '', chips: ['Latitude 5420', 'Latitude 5430', 'Latitude 5440', 'Latitude 7420', 'Latitude 7430', 'Latitude 7440', 'Latitude 9430', 'Latitude 9440'] },
    { title: 'G series', prefix: '', chips: ['G15', 'G16'] },
    { title: 'Precision', prefix: '', chips: ['Precision 3571', 'Precision 5560', 'Precision 5570', 'Precision 5680', 'Precision 7670', 'Precision 7770'] },
  ],
};

export const ALIENWARE: Brand = {
  id: 'alienware',
  name: 'Alienware',
  // dell owns it but almost no listing title says dell
  root: 'laptop alienware',
  groups: [
    { title: 'M series', prefix: '', chips: ['m15', 'm16', 'm17', 'm18'] },
    { title: 'X series', prefix: '', chips: ['x14', 'x15', 'x16', 'x17'] },
    { title: 'Area 51 and older', prefix: '', chips: ['Area-51m', '13 R3', '15 R4', '17 R5'] },
  ],
};


export type Product = {
  id: string;
  name: string;
  // a generic product inserts a brand step, a specific one goes straight to models
  brandStep: boolean;
  brand?: Brand;
};

export type ProductGroup = { title: string; products: Product[] };

export const ELECTRONICS_PRODUCTS: ProductGroup[] = [
  {
    title: 'Apple',
    products: [
      { id: 'ipad', name: 'iPad', brandStep: false, brand: IPAD },
      { id: 'macbook', name: 'MacBook', brandStep: false, brand: MACBOOK },
      { id: 'airpods', name: 'AirPods', brandStep: false, brand: AIRPODS },
      { id: 'applewatch', name: 'Apple Watch', brandStep: false, brand: APPLE_WATCH },
    ],
  },
  {
    title: 'Computing',
    products: [
      { id: 'laptop', name: 'Laptop', brandStep: true },
      { id: 'gpu', name: 'Graphics card', brandStep: true },
    ],
  },
  {
    title: 'TV and audio',
    products: [{ id: 'tv', name: 'TV', brandStep: true }],
  },
  {
    title: 'Cameras and drones',
    products: [
      { id: 'camera', name: 'Camera', brandStep: true },
      { id: 'drone', name: 'Drone', brandStep: true },
      { id: 'gopro', name: 'GoPro', brandStep: false, brand: GOPRO },
      { id: 'insta360', name: 'Insta360', brandStep: false, brand: INSTA360 },
      { id: 'osmo', name: 'DJI Osmo', brandStep: false, brand: OSMO },
      { id: 'lens', name: 'Lens', brandStep: true },
    ],
  },
];

export const HP: Brand = {
  id: 'hp',
  name: 'HP',
  root: 'laptop hp',
  groups: [
    { title: 'Spectre', prefix: '', chips: ['Spectre x360 13', 'Spectre x360 14', 'Spectre x360 16'] },
    { title: 'Envy', prefix: '', chips: ['Envy 13', 'Envy 14', 'Envy 16', 'Envy x360'] },
    { title: 'Pavilion', prefix: '', chips: ['Pavilion 14', 'Pavilion 15', 'Pavilion x360', 'Pavilion Aero 13'] },
    { title: 'Omen and Victus', prefix: '', chips: ['Omen 15', 'Omen 16', 'Omen 17', 'Omen Transcend 14', 'Omen Transcend 16', 'Victus 15', 'Victus 16'] },
    { title: 'EliteBook and ProBook', prefix: '', chips: ['EliteBook 830', 'EliteBook 840', 'EliteBook 850', 'EliteBook x360', 'ProBook 440', 'ProBook 450'] },
  ],
};

export const LENOVO: Brand = {
  id: 'lenovo',
  name: 'Lenovo',
  root: 'laptop lenovo',
  groups: [
    { title: 'ThinkPad', prefix: '', chips: ['ThinkPad X1 Carbon', 'ThinkPad X13', 'ThinkPad T14', 'ThinkPad T14s', 'ThinkPad T480', 'ThinkPad E14', 'ThinkPad P1'] },
    { title: 'IdeaPad', prefix: '', chips: ['IdeaPad 3', 'IdeaPad 5', 'IdeaPad Slim 5', 'IdeaPad Gaming 3'] },
    { title: 'Legion', prefix: '', chips: ['Legion 5', 'Legion 5 Pro', 'Legion 7', 'Legion Slim 5'] },
    { title: 'Yoga', prefix: '', chips: ['Yoga 7', 'Yoga 9', 'Yoga Slim 7'] },
  ],
};

export const ASUS: Brand = {
  id: 'asus',
  name: 'Asus',
  root: 'laptop asus',
  groups: [
    { title: 'ZenBook', prefix: '', chips: ['ZenBook 14', 'ZenBook 14 OLED', 'ZenBook Pro'] },
    { title: 'VivoBook', prefix: '', chips: ['VivoBook 15', 'VivoBook S 14'] },
    { title: 'ROG', prefix: '', chips: ['ROG Zephyrus G14', 'ROG Zephyrus G16', 'ROG Strix G15', 'ROG Strix G16', 'ROG Strix Scar 15', 'ROG Strix Scar 16', 'ROG Strix Scar 17', 'ROG Flow'] },
    { title: 'TUF', prefix: '', chips: ['TUF A15', 'TUF A16', 'TUF F15'] },
  ],
};

export const ACER: Brand = {
  id: 'acer',
  name: 'Acer',
  root: 'laptop acer',
  groups: [
    { title: 'Swift', prefix: '', chips: ['Swift 3', 'Swift 5', 'Swift Go 14'] },
    { title: 'Aspire', prefix: '', chips: ['Aspire 3', 'Aspire 5', 'Aspire 7'] },
    { title: 'Predator', prefix: '', chips: ['Predator Helios 300', 'Predator Helios 16', 'Predator Helios 18'] },
    { title: 'Nitro', prefix: '', chips: ['Nitro 5', 'Nitro V 15', 'Nitro 16'] },
  ],
};

export const MSI: Brand = {
  id: 'msi',
  name: 'MSI',
  root: 'laptop msi',
  groups: [
    { title: 'Gaming', prefix: '', chips: ['Katana 15', 'Sword 16', 'Cyborg 15', 'Raider GE68', 'Raider GE78', 'Titan 18'] },
    { title: 'Stealth', prefix: '', chips: ['Stealth 14', 'Stealth 16'] },
    { title: 'Creator and thin', prefix: '', chips: ['Prestige 14', 'Prestige 16', 'Modern 14', 'Modern 15'] },
  ],
};

export const SURFACE: Brand = {
  id: 'surface',
  // microsoft's laptops all sell under the surface name
  name: 'Surface',
  // "laptop surface" appears in no real listing, "microsoft surface" is in most
  root: 'microsoft surface',
  groups: [
    { title: 'Surface Laptop', prefix: '', chips: ['Laptop 3', 'Laptop 4', 'Laptop 5', 'Laptop 6', 'Laptop 7'] },
    { title: 'Surface Pro', prefix: '', chips: ['Pro 7', 'Pro 8', 'Pro 9', 'Pro 10', 'Pro 11'] },
    { title: 'Studio and Go', prefix: '', chips: ['Laptop Studio', 'Laptop Studio 2', 'Laptop Go 2', 'Laptop Go 3', 'Book 3'] },
  ],
};

export const RAZER: Brand = {
  id: 'razer',
  name: 'Razer',
  root: 'laptop razer',
  groups: [
    { title: 'Blade', prefix: '', chips: ['Blade 14', 'Blade 15', 'Blade 16', 'Blade 17', 'Blade 18'] },
  ],
};







export const LAPTOP_BRANDS = [
  { name: 'Dell', brand: DELL },
  { name: 'Alienware', brand: ALIENWARE },
  { name: 'HP', brand: HP },
  { name: 'Lenovo', brand: LENOVO },
  { name: 'Asus', brand: ASUS },
  { name: 'Acer', brand: ACER },
  { name: 'MSI', brand: MSI },
  { name: 'Microsoft', brand: SURFACE },
  { name: 'Razer', brand: RAZER },
];



// ---- brand registry -----------------------------------------------------

// every drawn brand on one shelf, so the shared screens can serve any category
const ALL_BRANDS: Brand[] = [
  ...PHONE_BRANDS.map((b) => b.brand),
  PLAYSTATION,
  XBOX,
  NINTENDO,
  STEAM_DECK,
  IPAD,
  MACBOOK,
  AIRPODS,
  APPLE_WATCH,
  GOPRO,
  INSTA360,
  OSMO,
  ...LAPTOP_BRANDS.map((b) => b.brand),
  ...CAMERA_BRANDS.map((b) => b.brand),
  ...GPU_BRANDS.map((b) => b.brand),
  ...TV_BRANDS.map((b) => b.brand),
  ...DRONE_BRANDS.map((b) => b.brand),
  ...LENS_BRANDS.map((b) => b.brand),
  ...CAR_MAKES.map((m) => m.brand),
  ...Object.values(HOUSEHOLD).flatMap((list) => list.entries.map((e) => e.brand)),
];

export function brandById(id?: string) {
  return ALL_BRANDS.find((b) => b.id === id);
}

// the user's own models ride along as one more group, so every screen that
// walks brand.groups picks them up without knowing they were typed in
export const CUSTOM_GROUP = 'Yours';
export const CUSTOM_LINE = 'custom';

export function withCustom(brand: Brand, names: string[] | undefined): Brand {
  if (!names || names.length === 0) return brand;
  const groups = [...brand.groups, { title: CUSTOM_GROUP, prefix: '', chips: names }];
  // a brand with a line switcher only draws the active line's groups, so the
  // typed-in ones need a pill of their own or they are invisible.
  // it goes last: first place is the fallback when the saved line is unknown.
  const lines = brand.lines
    ? [...brand.lines, { id: CUSTOM_LINE, label: CUSTOM_GROUP, groupTitles: [CUSTOM_GROUP] }]
    : undefined;
  return { ...brand, groups, ...(lines ? { lines } : {}) };
}

// people type "Ford Focus RS" as often as "Focus RS", and the screen adds the
// brand back itself, so a leading brand name would render twice and land in
// the include words on top of the keyword that already covers it
export function trimTypedModel(brand: Brand, typed: string) {
  const cleaned = typed.trim().replace(/\s+/g, ' ');
  // brands whose chips already carry the full name (PlayStation, Nintendo) keep it
  if (!brand.name) return cleaned;
  let out = cleaned;
  for (const lead of [brand.root, brand.name]) {
    if (!lead) continue;
    const escaped = lead.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const at = new RegExp(`^${escaped}\\s+`, 'i');
    if (at.test(out)) out = out.replace(at, '');
  }
  // typing nothing but the brand leaves us with the brand
  return out || cleaned;
}

// furniture, trailers, kitchen and diabetic supplies all pick from one screen
export function householdList(category?: string) {
  return category ? HOUSEHOLD[category] : undefined;
}

export function productById(id?: string) {
  return ELECTRONICS_PRODUCTS.flatMap((g) => g.products).find((p) => p.id === id);
}

// spelled-out forms sellers also use. written as "short|long" so one row
// matches either spelling, the matcher treats | as any-of
const TOKEN_ALIASES: Record<string, string> = {
  ps4: 'playstation 4',
  ps5: 'playstation 5',
  // covers the handhelds: "ps portal" -> "playstation portal"
  ps: 'playstation',
  // storage comes spaced or glued in titles: "512GB" and "512 GB"
  '64gb': '64 gb',
  '256gb': '256 gb',
  '512gb': '512 gb',
  '1tb': '1 tb',
  ...ELECTRONICS_ALIASES,
};

export function withAlias(token: string) {
  for (const [short, long] of Object.entries(TOKEN_ALIASES)) {
    // whole words only, or 'ps' would turn "gps mount" into "gplaystation mount".
    // the alias can sit anywhere: "ps5 digital", "x1 promax", "hero 12 black"
    const escaped = short.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const spot = new RegExp(`(^| )${escaped}( |$)`);
    if (spot.test(token)) return `${token}|${token.replace(spot, (_m, before, after) => `${before}${long}${after}`)}`;
  }
  return token;
}

// ---- name resolution ----------------------------------------------------

// {prefix:'13', chip:'Base'} -> "iPhone 13", {prefix:'13', chip:'Pro Max'} -> "iPhone 13 Pro Max"
export function displayName(brand: Brand, group: ModelGroup, chip: string) {
  // single letters glue onto the series: S10 + e is the S10e, not the "S10 e"
  const joined = chip.length === 1 ? `${group.prefix}${chip}` : `${group.prefix} ${chip}`;
  const model = group.prefix ? (chip === 'Base' ? group.prefix : joined) : chip;
  return brand.name ? `${brand.name} ${model}` : model;
}

// the matcher's keyword for a model row: the brand root, or the whole name when there is none
export function rootKeyword(brand: Brand, name: string) {
  return (brand.root || name).toLowerCase();
}

// the words that pick this model out of the shared keyword pool
export function includeWords(brand: Brand, name: string) {
  const root = rootKeyword(brand, name);
  const rest = name.toLowerCase().replace(root === name.toLowerCase() ? '' : brand.name.toLowerCase(), '').trim();
  if (!brand.root || !rest) return [];
  return rest.split(/\s+/);
}

// selection keys are brand-scoped so two brands can share a model name
export function modelKey(brand: Brand, group: ModelGroup, chip: string) {
  return `${brand.id}:${group.title}:${chip}`;
}
