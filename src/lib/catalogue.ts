// every list the new-search wizard picks from, mined from the design files.
// data lives here so the fourteen model screens can be one component.

export type ModelGroup = {
  title: string;
  // the series number that prefixes a chip's display name, '' when chips are already full names
  prefix: string;
  chips: string[];
};

export type GalaxyLine = {
  id: string;
  label: string;
  groupTitles: string[];
  // a line can carry its own scrape keyword, tighter than the brand root
  root?: string;
};

export type Brand = {
  id: string;
  // display prefix for model names, '' when the chips already carry it
  name: string;
  // the matcher's keyword root, '' means use the whole model name as the keyword
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
  { id: 'couches', name: 'Couches', path: 'Seats → material → price', wired: false },
  { id: 'furniture', name: 'Furniture', path: 'Type → material → price', wired: false },
  { id: 'trailers', name: 'Trailers', path: 'Type → size → price', wired: false },
  { id: 'kitchen', name: 'Kitchen / Utilities', path: 'Appliance → brand → price', wired: false },
  { id: 'diabetic', name: 'Diabetic Supplies', path: 'Brand → type → price', wired: false },
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
  root: 'galaxy',
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
    { id: 'S', label: 'Galaxy S', root: 'samsung galaxy s', groupTitles: ['S10 series', 'S20 series', 'S21 series', 'S22 series', 'S23 series', 'S24 series', 'S25 series'] },
    { id: 'Z', label: 'Galaxy Z', root: 'samsung galaxy z', groupTitles: ['Z Flip', 'Z Fold'] },
    { id: 'A', label: 'Galaxy A', root: 'samsung galaxy a', groupTitles: ['A series'] },
    { id: 'N', label: 'Note', root: 'samsung note', groupTitles: ['Note'] },
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
    { title: 'Older systems', prefix: '', chips: ['3DS', 'New 3DS XL', '2DS XL', 'Wii U'] },
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
    { title: 'iPad (base)', prefix: '', chips: ['9th gen', '10th gen', '11th gen'] },
    { title: 'iPad Air', prefix: '', chips: ['Air 3', 'Air 4', 'Air 5', 'Air M2', 'Air M3'] },
    { title: 'iPad Pro', prefix: '', chips: ['Pro 11 M1', 'Pro 11 M2', 'Pro 11 M4', 'Pro 12.9 M1', 'Pro 12.9 M2', 'Pro 13 M4'] },
    { title: 'iPad mini', prefix: '', chips: ['mini 5', 'mini 6', 'mini 7'] },
  ],
};

export const MACBOOK: Brand = {
  id: 'macbook',
  name: 'MacBook',
  root: 'macbook',
  groups: [
    { title: 'MacBook Air · Apple silicon', prefix: '', chips: ['Air 13 M1', 'Air 13 M2', 'Air 15 M3', 'Air 13 M4'] },
    { title: 'MacBook Pro · Apple silicon', prefix: '', chips: ['Pro 13 M1', 'Pro 14 M1 Pro', 'Pro 14 M3', 'Pro 16 M2 Max', 'Pro 16 M4 Pro'] },
    { title: 'Intel era', prefix: '', chips: ['Air 2017', 'Air 2019', 'Pro 2015', 'Pro 2019'] },
  ],
};

export const AIRPODS: Brand = {
  id: 'airpods',
  name: 'AirPods',
  root: 'airpods',
  groups: [
    { title: 'Standard', prefix: '', chips: ['2nd gen', '3rd gen', '4th gen', '4th gen ANC'] },
    { title: 'Pro', prefix: '', chips: ['Pro', 'Pro 2', 'Pro 2 USB-C', 'Pro 3'] },
    { title: 'Max', prefix: '', chips: ['Max', 'Max USB-C'] },
  ],
};

export const APPLE_WATCH: Brand = {
  id: 'applewatch',
  name: 'Apple Watch',
  root: 'apple watch',
  groups: [
    { title: 'Series 4–6 and SE', prefix: '', chips: ['Series 4', 'Series 5', 'Series 6', 'SE', 'SE 2'] },
    { title: 'Series 7–10', prefix: '', chips: ['Series 7', 'Series 8', 'Series 9', 'Series 10'] },
    { title: 'Ultra', prefix: '', chips: ['Ultra', 'Ultra 2', 'Ultra 3'] },
  ],
};

export const GOPRO: Brand = {
  id: 'gopro',
  name: 'GoPro',
  root: 'gopro',
  groups: [
    { title: 'Hero 8–11', prefix: '', chips: ['Hero 8', 'Hero 9', 'Hero 10', 'Hero 11'] },
    { title: 'Hero 12–13', prefix: '', chips: ['Hero 12', 'Hero 13'] },
    { title: '360 and compact', prefix: '', chips: ['Max', 'Hero 2024'] },
  ],
};

export const DELL: Brand = {
  id: 'dell',
  name: 'Dell',
  root: 'dell',
  groups: [
    { title: 'XPS', prefix: '', chips: ['XPS 13', 'XPS 14', 'XPS 15', 'XPS 17'] },
    { title: 'Inspiron', prefix: '', chips: ['Inspiron 14', 'Inspiron 15', 'Inspiron 16'] },
    { title: 'Latitude', prefix: '', chips: ['Latitude 5000', 'Latitude 7000', 'Latitude 9000'] },
    { title: 'Alienware', prefix: '', chips: ['Alienware m16', 'Alienware m18', 'Alienware x14'] },
    { title: 'Precision', prefix: '', chips: ['Precision 3000', 'Precision 5000'] },
  ],
};

export const CANON: Brand = {
  id: 'canon',
  name: 'Canon',
  root: 'canon',
  groups: [
    { title: 'EOS R · mirrorless', prefix: '', chips: ['EOS R5', 'EOS R6', 'EOS R7', 'EOS R8', 'EOS R50', 'EOS R100'] },
    { title: 'EOS · DSLR', prefix: '', chips: ['EOS 5D IV', 'EOS 6D II', 'EOS 90D', 'EOS 250D', 'Rebel T7'] },
    { title: 'PowerShot · compact', prefix: '', chips: ['PowerShot G7X', 'PowerShot SX70', 'PowerShot V10'] },
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
      { id: 'monitor', name: 'Monitor', brandStep: true },
      { id: 'gpu', name: 'Graphics card', brandStep: true },
    ],
  },
  {
    title: 'TV and audio',
    products: [
      { id: 'tv', name: 'TV', brandStep: true },
      { id: 'soundbar', name: 'Soundbar', brandStep: true },
      { id: 'projector', name: 'Projector', brandStep: true },
    ],
  },
  {
    title: 'Cameras and drones',
    products: [
      { id: 'camera', name: 'Camera', brandStep: true },
      { id: 'drone', name: 'Drone', brandStep: true },
      { id: 'gopro', name: 'GoPro', brandStep: false, brand: GOPRO },
      { id: 'lens', name: 'Lens', brandStep: true },
    ],
  },
];

// only laptop and camera have model screens drawn, the rest reuse the pattern later
export const LAPTOP_BRANDS = ['Dell', 'Apple', 'HP', 'Lenovo', 'Asus', 'Acer', 'MSI', 'Microsoft', 'Razer'];
export const CAMERA_BRANDS = ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Panasonic', 'Olympus / OM', 'Leica'];
export const DRAWN_PRODUCT_BRANDS: Record<string, Brand> = { Dell: DELL, Canon: CANON };

// ---- cars ---------------------------------------------------------------

export const CAR_MAKES = [
  'Acura', 'Alfa Romeo', 'Audi', 'BMW', 'Buick', 'Cadillac', 'Chevrolet',
  'Chrysler', 'Dodge', 'Ford', 'GMC', 'Honda', 'Hyundai', 'Jeep',
];

// only ford's model list is drawn
export const FORD_MODELS = [
  'F-150', 'F-250', 'Ranger', 'Maverick', 'Transit', 'Bronco', 'Bronco Sport',
  'Escape', 'Edge', 'Explorer', 'Expedition', 'Focus', 'Fiesta', 'Fusion',
  'Mustang', 'Mustang Mach-E', 'Taurus', 'EcoSport',
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
  DELL,
  CANON,
];

export function brandById(id?: string) {
  return ALL_BRANDS.find((b) => b.id === id);
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
};

export function withAlias(token: string) {
  if (TOKEN_ALIASES[token]) return `${token}|${TOKEN_ALIASES[token]}`;
  for (const short of Object.keys(TOKEN_ALIASES)) {
    // "ps5 digital" borrows the ps5 alias: "ps5 digital|playstation 5 digital"
    if (token.startsWith(`${short} `)) return `${token}|${token.replace(short, TOKEN_ALIASES[short])}`;
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

// a row's scrape keyword: the line's own root wins over the brand's
export function rowKeyword(brand: Brand, group: ModelGroup, name: string) {
  const line = brand.lines?.find((l) => l.groupTitles.includes(group.title));
  return line?.root ?? rootKeyword(brand, name);
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
