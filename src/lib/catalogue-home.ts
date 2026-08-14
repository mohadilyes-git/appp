// the household categories: furniture, trailers, kitchen appliances and
// diabetic supplies. same shape as every other list, so they reuse the
// picker, the model screen, the price step and the save untouched.

// type-only, so this never imports the main file back at runtime
import type { Brand } from './catalogue';

export const FURNITURE_SOFA: Brand = {
  id: 'sofa',
  name: 'Sofa',
  root: 'sofa',
  groups: [
    { title: 'By size', prefix: '', chips: ['2 seater', '3 seater', '4 seater', '3 + 2 set'] },
    { title: 'By style', prefix: '', chips: ['Recliner', 'Bed', 'Chesterfield', 'Chaise', 'Modular'] },
    { title: 'By material', prefix: '', chips: ['Leather', 'Velvet', 'Fabric', 'Jumbo cord'] },
    { title: 'Brands that hold value', prefix: '', chips: ['Ercol', 'G Plan', 'DFS', 'Next', 'Laura Ashley', 'Loaf'] },
    { title: 'More brands worth alerts', prefix: '', chips: ['John Lewis', 'Habitat', 'Made.com', 'Barker and Stonehouse', 'Duresta'] },
  ],
};

export const FURNITURE_CORNERSOFA: Brand = {
  id: 'cornersofa',
  name: 'Corner Sofa',
  root: 'corner sofa',
  groups: [
    { title: 'By layout', prefix: '', chips: ['Left hand facing', 'Right hand facing', 'U shape', 'With chaise', 'Modular'] },
    { title: 'By type', prefix: '', chips: ['Bed', 'Recliner', 'With footstool'] },
    { title: 'By material', prefix: '', chips: ['Grey fabric', 'Leather', 'Velvet', 'Jumbo cord'] },
    { title: 'Brands worth alerts', prefix: '', chips: ['DFS', 'SCS', 'Next', 'Harveys', 'Sofology'] },
  ],
};

export const FURNITURE_ARMCHAIR: Brand = {
  id: 'armchair',
  name: 'Armchair',
  root: 'armchair',
  groups: [
    { title: 'By style', prefix: '', chips: ['Recliner', 'Wingback', 'Tub', 'Accent', 'Rocking'] },
    { title: 'By material', prefix: '', chips: ['Leather', 'Velvet', 'Fabric'] },
    { title: 'Brands that hold value', prefix: '', chips: ['Ercol', 'G Plan', 'Parker Knoll', 'Stressless', 'Next'] },
  ],
};

export const FURNITURE_WARDROBE: Brand = {
  id: 'wardrobe',
  name: 'Wardrobe',
  root: 'wardrobe',
  groups: [
    { title: 'By size', prefix: '', chips: ['Single', 'Double', 'Triple', '3 door', 'Sliding door'] },
    { title: 'By material', prefix: '', chips: ['Oak', 'Pine', 'White gloss', 'Mirrored', 'Painted'] },
    { title: 'Brands that shift', prefix: '', chips: ['Ikea Pax', 'Ikea Hemnes', 'Ikea Brimnes', 'Next', 'Stag'] },
    { title: 'More configurations', prefix: '', chips: ['2 door', '4 door', 'Corner', 'With drawers'] },
  ],
};

export const FURNITURE_CHESTOFDRAWERS: Brand = {
  id: 'chestofdrawers',
  name: 'Chest of Drawers',
  root: 'chest of drawers',
  groups: [
    { title: 'By drawer count', prefix: '', chips: ['3 drawer', '4 drawer', '5 drawer', '6 drawer'] },
    { title: 'By material', prefix: '', chips: ['Oak', 'Pine', 'White', 'Painted', 'Mid century teak'] },
    { title: 'Brands that shift', prefix: '', chips: ['Ikea Malm', 'Ikea Hemnes', 'Stag Minstrel', 'G Plan', 'Ercol'] },
  ],
};

export const FURNITURE_BEDFRAME: Brand = {
  id: 'bedframe',
  name: 'Bed Frame',
  root: 'bed frame',
  groups: [
    { title: 'By size', prefix: '', chips: ['Single', 'Small double', 'Double', 'King size', 'Super king'] },
    { title: 'By type', prefix: '', chips: ['Ottoman storage', 'Upholstered', 'Metal', 'Wooden', 'Sleigh'] },
    { title: 'Brands that shift', prefix: '', chips: ['Ikea Malm', 'Ikea Hemnes', 'Next', 'Dreams'] },
  ],
};

export const FURNITURE_DININGTABLE: Brand = {
  id: 'diningtable',
  name: 'Dining Table',
  root: 'dining table',
  groups: [
    { title: 'By size', prefix: '', chips: ['4 seater', '6 seater', '8 seater', 'Extending', 'Round'] },
    { title: 'By material', prefix: '', chips: ['Oak', 'Pine', 'Glass', 'Marble', 'White gloss'] },
    { title: 'Sold as a set', prefix: '', chips: ['With 4 chairs', 'With 6 chairs', 'And bench'] },
    { title: 'Brands that hold value', prefix: '', chips: ['Ercol', 'G Plan', 'Ikea', 'Next', 'Oak Furniture Land'] },
  ],
};

export const FURNITURE_DININGCHAIRS: Brand = {
  id: 'diningchairs',
  name: 'Dining Chairs',
  root: 'dining chairs',
  groups: [
    { title: 'By set size', prefix: '', chips: ['Set of 4', 'Set of 6', 'Set of 8', 'Pair'] },
    { title: 'By style', prefix: '', chips: ['Oak', 'Leather', 'Velvet', 'Eames style', 'Carver'] },
    { title: 'Brands that hold value', prefix: '', chips: ['Ercol', 'G Plan', 'Ikea', 'Next', 'Habitat'] },
  ],
};

export const FURNITURE_COFFEETABLE: Brand = {
  id: 'coffeetable',
  name: 'Coffee Table',
  root: 'coffee table',
  groups: [
    { title: 'By material', prefix: '', chips: ['Oak', 'Pine', 'Glass', 'Marble', 'White gloss'] },
    { title: 'By style', prefix: '', chips: ['Round', 'Storage', 'Lift top', 'Mid century', 'Industrial'] },
    { title: 'Brands that shift', prefix: '', chips: ['Ercol', 'G Plan', 'Ikea', 'Next'] },
  ],
};

export const FURNITURE_TVUNIT: Brand = {
  id: 'tvunit',
  name: 'TV Unit',
  root: 'tv unit',
  groups: [
    { title: 'By type', prefix: '', chips: ['Corner', 'Large', 'Floating', 'With storage'] },
    { title: 'By material', prefix: '', chips: ['Oak', 'White gloss', 'Grey', 'Black glass'] },
    { title: 'Brands that shift', prefix: '', chips: ['Ikea Besta', 'Next', 'Ercol', 'G Plan'] },
  ],
};

export const FURNITURE_SIDEBOARD: Brand = {
  id: 'sideboard',
  name: 'Sideboard',
  root: 'sideboard',
  groups: [
    { title: 'By size', prefix: '', chips: ['2 door', '3 door', 'Large', 'Narrow'] },
    { title: 'By material', prefix: '', chips: ['Oak', 'Teak', 'Painted', 'Pine', 'White gloss'] },
    { title: 'Brands that hold value', prefix: '', chips: ['Ercol', 'G Plan', 'Stag', 'Nathan', 'McIntosh'] },
  ],
};

export const FURNITURE_BOOKCASE: Brand = {
  id: 'bookcase',
  name: 'Bookcase',
  root: 'bookcase',
  groups: [
    { title: 'By size', prefix: '', chips: ['Tall', 'Narrow', 'Wide', 'Corner', 'With doors'] },
    { title: 'By material', prefix: '', chips: ['Oak', 'Pine', 'White', 'Teak'] },
    { title: 'Brands that shift', prefix: '', chips: ['Ikea Billy', 'Ercol', 'G Plan', 'Stag', 'Next'] },
  ],
};

export const FURNITURE_DESK: Brand = {
  id: 'desk',
  name: 'Desk',
  root: 'desk',
  groups: [
    { title: 'By type', prefix: '', chips: ['Corner', 'Computer', 'Writing', 'Sit stand', 'Gaming'] },
    { title: 'By material', prefix: '', chips: ['Oak', 'Pine', 'White', 'Solid wood', 'Glass'] },
    { title: 'Brands that shift', prefix: '', chips: ['Ikea Bekant', 'Ikea Micke', 'Next', 'Stag'] },
  ],
};

export const FURNITURE_OFFICECHAIR: Brand = {
  id: 'officechair',
  name: 'Office Chair',
  root: 'office chair',
  groups: [
    { title: 'By type', prefix: '', chips: ['Mesh', 'Leather', 'Ergonomic', 'Executive', 'Kneeling'] },
    { title: 'Brands that flip fast', prefix: '', chips: ['Herman Miller Aeron', 'Herman Miller Embody', 'Steelcase Leap', 'Steelcase Gesture', 'Humanscale Freedom', 'Orangebox'] },
    { title: 'Gaming chairs', prefix: '', chips: ['Secretlab Titan', 'DXRacer', 'Noblechairs'] },
    { title: 'More premium models', prefix: '', chips: ['Herman Miller Sayl', 'Herman Miller Mirra', 'Steelcase Series 2', 'RH Logic 400', 'Haworth Fern'] },
  ],
};

export const TRAILERS_IFORWILLIAMS: Brand = {
  id: 'iforwilliams',
  name: 'Ifor Williams',
  root: 'ifor williams',
  groups: [
    { title: 'General duty & small (GD, GX, P)', prefix: '', chips: ['GD84', 'GD85', 'GD105', 'GD125', 'GD126', 'GX84', 'GX105', 'GX125', 'P6e', 'P7e', 'P8e'] },
    { title: 'Flatbed & tipper (LM, TT)', prefix: '', chips: ['LM105', 'LM126', 'LM146', 'LM166', 'LM186', 'TT85', 'TT105', 'TT126', 'TT2515'] },
    { title: 'Livestock & horse (TA, DP, HB)', prefix: '', chips: ['TA5', 'TA510', 'TA5G', 'DP120', 'HB403', 'HB506', 'HB511'] },
    { title: 'Box van & car transporter', prefix: '', chips: ['BV84', 'BV105', 'BV125', 'BV126', 'CT115', 'CT136', 'CT166', 'CT177'] },
    { title: 'Horsebox extras', prefix: '', chips: ['Eventa L', 'Eventa M', 'HBX403', 'HBX511'] },
    { title: 'Pickup canopies', prefix: '', chips: ['canopy', 'Ranger canopy', 'Hilux canopy', 'L200 canopy', 'Navara canopy', 'Transit canopy'] },
  ],
};

export const TRAILERS_BRIANJAMES: Brand = {
  id: 'brianjames',
  name: 'Brian James',
  root: 'brian james trailer',
  groups: [
    { title: 'Car transporters', prefix: '', chips: ['Clubman', 'A4 Transporter', 'C4 Blue', 'T4 Transporter', 'T6 Transporter', 'Tilt Bed', 'Minno Max'] },
    { title: 'Race & enclosed', prefix: '', chips: ['Race Transporter 4', 'Race Transporter 5', 'Race Transporter 6', 'Race Sport'] },
    { title: 'Cargo plant & tipper', prefix: '', chips: ['Cargo Digger Plant', 'Cargo Tipper', 'Cargo Connect', 'Cargo Shifta'] },
    { title: 'Spec', prefix: '', chips: ['single axle', 'twin axle', '3500kg', '2600kg', 'with winch', 'alloy ramps'] },
  ],
};

export const TRAILERS_NUGENT: Brand = {
  id: 'nugent',
  name: 'Nugent',
  root: 'nugent trailer',
  groups: [
    { title: 'Box vans (B series)', prefix: '', chips: ['B2814', 'B3718', 'B4318', 'box 8x5', 'box 10x6', 'box 12x6', 'high top'] },
    { title: 'Tippers (T series)', prefix: '', chips: ['T3118', 'T3718', 'tipper 8x5', 'tipper 10x6', 'tipper 12x6', 'hydraulic tip'] },
    { title: 'Plant & flatbed (P, F)', prefix: '', chips: ['P3118', 'P3718', 'F3118', 'F3718', 'plant 8x5', 'plant 12x6', 'flatbed 12x6'] },
    { title: 'General & livestock', prefix: '', chips: ['G2812', 'G3118', 'L4318', 'general 8x5', 'livestock 12x6', 'twin axle', 'drop side'] },
  ],
};

export const TRAILERS_INDESPENSION: Brand = {
  id: 'indespension',
  name: 'Indespension',
  root: 'indespension',
  groups: [
    { title: 'Daxara tippers', prefix: '', chips: ['Daxara 107', 'Daxara 127', 'Daxara 148', 'Daxara 158', 'Daxara 168', 'Daxara 178', 'Daxara 198', 'Daxara 219'] },
    { title: 'Box & general', prefix: '', chips: ['Challenger', 'box 6x4', 'box 8x5', 'box 10x5', 'high top box', 'caged'] },
    { title: 'Car & plant', prefix: '', chips: ['car transporter', 'tilt bed', 'plant 8x4', 'plant 10x5', 'beavertail'] },
    { title: 'Spec', prefix: '', chips: ['single axle', 'twin axle', '750kg unbraked', '2700kg', '3500kg braked'] },
  ],
};

export const TRAILERS_BATESON: Brand = {
  id: 'bateson',
  name: 'Bateson',
  root: 'bateson trailer',
  groups: [
    { title: 'Car transporter models', prefix: '', chips: ['1200', '1400', '1500', '1600', '1620', '1625', '1800'] },
    { title: 'Plant & box', prefix: '', chips: ['plant trailer', 'box trailer', '10x5 plant', '12x6 plant', 'digger trailer'] },
    { title: 'Bed type', prefix: '', chips: ['tilt bed', 'beavertail', '14ft bed', '16ft bed', 'with winch', 'alloy ramps'] },
    { title: 'Spec', prefix: '', chips: ['single axle', 'twin axle', '2700kg', '3500kg'] },
  ],
};

export const TRAILERS_DALEKANE: Brand = {
  id: 'dalekane',
  name: 'Dale Kane',
  root: 'dale kane trailer',
  groups: [
    { title: 'Tippers', prefix: '', chips: ['8x5 tipper', '10x5 tipper', '10x6 tipper', '12x6 tipper', 'hydraulic tip'] },
    { title: 'Plant & flatbed', prefix: '', chips: ['8x4 plant', '10x5 plant', '12x6 plant', 'flatbed', 'beavertail'] },
    { title: 'Box & general', prefix: '', chips: ['6x4 box', '8x5 box', '10x5 box', 'high top box', 'mesh sides'] },
    { title: 'Spec', prefix: '', chips: ['single axle', 'twin axle', 'drop side', '2700kg', '3500kg'] },
  ],
};

export const TRAILERS_WESSEX: Brand = {
  id: 'wessex',
  name: 'Wessex',
  root: 'wessex trailer',
  groups: [
    { title: 'Type', prefix: '', chips: ['ATV tipping', 'quad trailer', 'link box', 'flat deck', 'groundcare'] },
    { title: 'Size & tip', prefix: '', chips: ['4x3', '5x3', '6x4', 'hydraulic tip', 'manual tip', 'mesh sides'] },
  ],
};

export const TRAILERS_BOXTRAILER: Brand = {
  id: 'boxtrailer',
  name: 'Box trailer',
  root: 'box trailer',
  groups: [
    { title: 'Common sizes', prefix: '', chips: ['6x4', '7x5', '8x4', '8x5', '10x5', '10x6', '12x6'] },
    { title: 'Build', prefix: '', chips: ['single axle', 'twin axle', 'braked', '750kg unbraked', 'high top', 'caged', 'ramp door', 'drop tail'] },
    { title: 'Brands worth grabbing', prefix: '', chips: ['Ifor Williams BV', 'Nugent', 'Blueline', 'Debon Roadster', 'Erde', 'Brenderup'] },
  ],
};

export const TRAILERS_CARTRANSPORTER: Brand = {
  id: 'cartransporter',
  name: 'Car transporter',
  root: 'car transporter trailer',
  groups: [
    { title: 'Bed length', prefix: '', chips: ['14ft', '16ft', '18ft', 'single axle', 'twin axle'] },
    { title: 'Type & kit', prefix: '', chips: ['tilt bed', 'beavertail', 'with winch', 'hydraulic tilt', 'alloy ramps', 'recovery spec'] },
    { title: 'Weight', prefix: '', chips: ['2000kg', '2700kg', '3500kg'] },
    { title: 'Brands', prefix: '', chips: ['Ifor Williams CT', 'Brian James', 'Bateson', 'Woodford', 'PRG', 'Indespension'] },
  ],
};

export const TRAILERS_PLANTTRAILER: Brand = {
  id: 'planttrailer',
  name: 'Plant trailer',
  root: 'plant trailer',
  groups: [
    { title: 'Sizes', prefix: '', chips: ['8x4', '8x5', '10x5', '10x6', '12x6'] },
    { title: 'Spec', prefix: '', chips: ['2700kg', '3500kg', 'ramp tailgate', 'twin axle', 'skid steer', 'mini digger', 'hydraulic ramp'] },
    { title: 'Brands', prefix: '', chips: ['Ifor Williams GP', 'Nugent', 'Bateson', 'Brian James Cargo', 'Dale Kane', 'Blueline'] },
  ],
};

export const TRAILERS_TIPPERTRAILER: Brand = {
  id: 'tippertrailer',
  name: 'Tipper trailer',
  root: 'tipper trailer',
  groups: [
    { title: 'Sizes', prefix: '', chips: ['6x4', '8x4', '8x5', '10x5', '10x6', '12x6'] },
    { title: 'Tip type', prefix: '', chips: ['hydraulic', 'electric tip', 'manual tip', 'twin axle', 'mesh sides', 'drop side'] },
    { title: 'Weight', prefix: '', chips: ['750kg', '1500kg', '2700kg', '3500kg'] },
    { title: 'Brands', prefix: '', chips: ['Ifor Williams TT', 'Daxara', 'Nugent', 'Dale Kane', 'Blueline', 'Erde tipping'] },
  ],
};

export const TRAILERS_FLATBEDTRAILER: Brand = {
  id: 'flatbedtrailer',
  name: 'Flatbed trailer',
  root: 'flatbed trailer',
  groups: [
    { title: 'Sizes', prefix: '', chips: ['8x5', '10x5', '10x6', '12x6', '14x6', '16x6'] },
    { title: 'Build', prefix: '', chips: ['drop side', 'flat deck', 'mesh sides', 'twin axle', 'beavertail', 'with ramps', '3500kg'] },
    { title: 'Brands', prefix: '', chips: ['Ifor Williams LM', 'Nugent', 'Bateson', 'Dale Kane', 'Woodford'] },
  ],
};

export const TRAILERS_HORSETRAILER: Brand = {
  id: 'horsetrailer',
  name: 'Horse trailer',
  root: 'horse trailer',
  groups: [
    { title: 'Ifor Williams models', prefix: '', chips: ['HB403', 'HB506', 'HB511', 'HB511 XL'] },
    { title: 'Other makers', prefix: '', chips: ['Cheval Liberte Gold', 'Equi-Trek Space Treka', 'Rice Beaufort', 'Bateson Ascot', 'Sinclair', 'Richardson', 'Debon'] },
    { title: 'Spec', prefix: '', chips: ['single horse', 'double', 'front unload', 'rear ramp', '3.5t', 'with living'] },
  ],
};

export const TRAILERS_MOTORBIKETRAILER: Brand = {
  id: 'motorbiketrailer',
  name: 'Motorbike trailer',
  root: 'motorbike trailer',
  groups: [
    { title: 'Capacity', prefix: '', chips: ['single bike', 'twin bike', '3 bike', '4 bike', 'quad / ATV'] },
    { title: 'Type', prefix: '', chips: ['with wheel chock', 'loading ramp', 'enclosed box', 'folding', 'tilt bed', '750kg unbraked'] },
    { title: 'Brands', prefix: '', chips: ['Erde', 'Brenderup', 'Bulldog', 'Voyager', 'Ifor Williams'] },
  ],
};

export const TRAILERS_CAMPINGTRAILER: Brand = {
  id: 'campingtrailer',
  name: 'Camping trailer',
  root: 'teardrop trailer',
  groups: [
    { title: 'Style', prefix: '', chips: ['teardrop', 'micro caravan', 'off road', 'roof tent', 'pop top', 'with kitchen'] },
    { title: 'Base trailer', prefix: '', chips: ['6x4', '8x4', '8x5', 'Erde 122', 'Daxara 148', 'Brenderup', '750kg unbraked'] },
    { title: 'Extras', prefix: '', chips: ['with awning', '12v setup', 'slide out kitchen', 'water tank'] },
  ],
};

export const KITCHEN_WASHINGMACHINE: Brand = {
  id: 'washingmachine',
  name: 'Washing Machine',
  root: 'washing machine',
  groups: [
    { title: 'Best resale brands', prefix: '', chips: ['Miele', 'Bosch', 'Siemens', 'AEG', 'Smeg', 'Electrolux'] },
    { title: 'Volume brands', prefix: '', chips: ['Hotpoint', 'Beko', 'Samsung', 'LG', 'Indesit', 'Hoover', 'Candy', 'Zanussi', 'Whirlpool', 'Haier'] },
    { title: 'Models people search', prefix: '', chips: ['Bosch Serie 4', 'Bosch Serie 6', 'Bosch Serie 8', 'Samsung EcoBubble', 'LG TurboWash', 'Miele W1', 'AEG 7000'] },
    { title: 'Size and fit', prefix: '', chips: ['Integrated', '9kg', '10kg', '1400 spin', 'Slim depth'] },
    { title: 'More capacities and spin', prefix: '', chips: ['7kg', '8kg', '11kg', '1200 spin', '1600 spin'] },
  ],
};

export const KITCHEN_TUMBLEDRYER: Brand = {
  id: 'tumbledryer',
  name: 'Tumble Dryer',
  root: 'tumble dryer',
  groups: [
    { title: 'Best resale brands', prefix: '', chips: ['Miele', 'Bosch', 'Siemens', 'AEG', 'Samsung', 'LG'] },
    { title: 'Volume brands', prefix: '', chips: ['Hotpoint', 'Beko', 'Indesit', 'Hoover', 'Candy', 'Zanussi', 'White Knight', 'Whirlpool'] },
    { title: 'Type and size', prefix: '', chips: ['Heat pump', 'Condenser', 'Vented', 'Integrated', '8kg', '9kg'] },
  ],
};

export const KITCHEN_WASHERDRYER: Brand = {
  id: 'washerdryer',
  name: 'Washer Dryer',
  root: 'washer dryer',
  groups: [
    { title: 'Best resale brands', prefix: '', chips: ['Bosch', 'Miele', 'Siemens', 'AEG', 'LG', 'Samsung'] },
    { title: 'Volume brands', prefix: '', chips: ['Hotpoint', 'Beko', 'Indesit', 'Candy', 'Hoover', 'Zanussi', 'Whirlpool'] },
    { title: 'Size and fit', prefix: '', chips: ['Integrated', '8kg', '9kg', '10kg'] },
  ],
};

export const KITCHEN_DISHWASHER: Brand = {
  id: 'dishwasher',
  name: 'Dishwasher',
  root: 'dishwasher',
  groups: [
    { title: 'Best resale brands', prefix: '', chips: ['Bosch', 'Miele', 'Siemens', 'Neff', 'AEG', 'Smeg'] },
    { title: 'Volume brands', prefix: '', chips: ['Hotpoint', 'Beko', 'Indesit', 'Candy', 'Zanussi', 'Hoover', 'Whirlpool', 'Electrolux'] },
    { title: 'Models people search', prefix: '', chips: ['Bosch Serie 4', 'Bosch Serie 6', 'Neff N50', 'Miele G5000'] },
    { title: 'Size and type', prefix: '', chips: ['Slimline', '45cm', 'Integrated', 'Freestanding', 'Table top', 'Full size'] },
  ],
};

export const KITCHEN_FRIDGEFREEZER: Brand = {
  id: 'fridgefreezer',
  name: 'Fridge Freezer',
  root: 'fridge freezer',
  groups: [
    { title: 'Retro and premium', prefix: '', chips: ['Smeg', 'Smeg FAB32', 'Smeg FAB50', 'Liebherr', 'Miele', 'Bosch', 'Siemens', 'AEG'] },
    { title: 'Volume brands', prefix: '', chips: ['Samsung', 'LG', 'Beko', 'Hotpoint', 'Indesit', 'Hisense', 'Candy', 'Zanussi', 'Hoover'] },
    { title: 'Type and finish', prefix: '', chips: ['Integrated', 'Frost free', 'Under counter', 'Tall', 'Black', 'Cream'] },
    { title: 'Split ratio', prefix: '', chips: ['50/50', '60/40', '70/30'] },
  ],
};

export const KITCHEN_AMERICANFRIDGEFREEZER: Brand = {
  id: 'americanfridgefreezer',
  name: 'American Fridge Freezer',
  root: 'american fridge freezer',
  groups: [
    { title: 'Brands that sell', prefix: '', chips: ['Samsung', 'LG', 'Beko', 'Hisense', 'Haier', 'Hotpoint', 'Whirlpool', 'Smeg', 'Liebherr'] },
    { title: 'Models people search', prefix: '', chips: ['LG InstaView', 'Samsung RS68', 'Samsung Family Hub', 'LG GSL'] },
    { title: 'Features', prefix: '', chips: ['Plumbed', 'Non plumbed', 'Ice dispenser', 'Water dispenser', 'Four door', 'Black', 'Stainless steel'] },
  ],
};

export const KITCHEN_OVEN: Brand = {
  id: 'oven',
  name: 'Oven',
  root: 'oven',
  groups: [
    { title: 'Best resale brands', prefix: '', chips: ['Neff', 'Bosch', 'Siemens', 'Miele', 'AEG', 'Smeg'] },
    { title: 'Volume brands', prefix: '', chips: ['Hotpoint', 'Beko', 'Zanussi', 'Indesit', 'Candy', 'Whirlpool', 'Electrolux', 'Hoover', 'CDA'] },
    { title: 'Models people search', prefix: '', chips: ['Neff N50', 'Neff N70', 'Bosch Serie 6', 'Bosch Serie 8'] },
    { title: 'Type and size', prefix: '', chips: ['Built in double', 'Built in single', 'Pyrolytic', 'Electric', 'Gas', 'Freestanding 60cm', '50cm'] },
    { title: 'Search terms people use', prefix: '', chips: ['Slide and hide', 'Circotherm', 'Steam', 'Combi microwave', 'Catalytic'] },
  ],
};

export const KITCHEN_RANGECOOKER: Brand = {
  id: 'rangecooker',
  name: 'Range Cooker',
  root: 'range cooker',
  groups: [
    { title: 'Brands that flip', prefix: '', chips: ['Rangemaster', 'Stoves', 'Belling', 'Smeg', 'Leisure', 'Flavel', 'Britannia', 'Falcon'] },
    { title: 'Premium and cast iron', prefix: '', chips: ['AGA', 'Everhot', 'Ilve', 'Mercury', 'Lacanche'] },
    { title: 'Size and fuel', prefix: '', chips: ['90cm', '100cm', '110cm', 'Dual fuel', 'All electric', 'All gas', 'Induction top'] },
  ],
};

export const KITCHEN_HOB: Brand = {
  id: 'hob',
  name: 'Hob',
  root: 'hob',
  groups: [
    { title: 'Best resale brands', prefix: '', chips: ['Neff', 'Bosch', 'Siemens', 'AEG', 'Miele', 'Smeg', 'Bora', 'Elica'] },
    { title: 'Volume brands', prefix: '', chips: ['Hotpoint', 'Beko', 'Zanussi', 'Indesit', 'Candy', 'Electrolux', 'Whirlpool', 'CDA', 'Stoves'] },
    { title: 'Type and size', prefix: '', chips: ['Induction', 'Ceramic', 'Gas on glass', '5 burner gas', 'Domino', 'Venting', '90cm', 'Flexi zone'] },
    { title: 'More sizes', prefix: '', chips: ['60cm', '70cm', '77cm', '4 burner gas', '4 zone'] },
  ],
};

export const KITCHEN_COOKERHOOD: Brand = {
  id: 'cookerhood',
  name: 'Cooker Hood',
  root: 'cooker hood',
  groups: [
    { title: 'Best resale brands', prefix: '', chips: ['Elica', 'Neff', 'Bosch', 'Siemens', 'AEG', 'Smeg', 'Faber', 'Miele'] },
    { title: 'Volume brands', prefix: '', chips: ['Hotpoint', 'Zanussi', 'CDA', 'Cookology', 'Beko', 'Candy', 'Electrolux'] },
    { title: 'Type and size', prefix: '', chips: ['Chimney', 'Island', 'Integrated', 'Downdraft', 'Visor', '60cm', '90cm', 'Stainless steel'] },
  ],
};

export const KITCHEN_MICROWAVE: Brand = {
  id: 'microwave',
  name: 'Microwave',
  root: 'microwave',
  groups: [
    { title: 'Brands that hold value', prefix: '', chips: ['Panasonic', 'Sharp', 'Samsung', 'Bosch', 'Neff', 'Siemens', 'Smeg', 'De\'Longhi'] },
    { title: 'Volume brands', prefix: '', chips: ['Russell Hobbs', 'Daewoo', 'Hotpoint', 'Swan', 'Tower', 'Candy', 'Whirlpool'] },
    { title: 'Type and spec', prefix: '', chips: ['Combi', 'Built in', 'Solo', 'Flatbed', 'Inverter', 'Retro', '900w', 'Grill'] },
  ],
};

export const KITCHEN_AIRFRYER: Brand = {
  id: 'airfryer',
  name: 'Air Fryer',
  root: 'air fryer',
  groups: [
    { title: 'Ninja', prefix: '', chips: ['Ninja', 'Ninja Foodi', 'Ninja Dual Zone', 'Ninja AF300', 'Ninja AF400', 'Ninja Max XL', 'Ninja FlexDrawer', 'Ninja Foodi Max'] },
    { title: 'Other brands', prefix: '', chips: ['Instant Vortex', 'Tower', 'Tefal ActiFry', 'Philips', 'Cosori', 'Salter', 'Russell Hobbs', 'Instant Pot'] },
    { title: 'Type and size', prefix: '', chips: ['Dual basket', 'Single drawer', '9L', '11L', 'Health grill'] },
  ],
};

export const KITCHEN_COFFEEMACHINE: Brand = {
  id: 'coffeemachine',
  name: 'Coffee Machine',
  root: 'coffee machine',
  groups: [
    { title: 'Sage and espresso', prefix: '', chips: ['Sage Barista Express', 'Sage Barista Pro', 'Sage Bambino', 'Sage Dual Boiler', 'Sage Oracle', 'Gaggia Classic', 'Rancilio Silvia'] },
    { title: 'Bean to cup', prefix: '', chips: ['De\'Longhi Magnifica', 'De\'Longhi', 'Jura', 'Siemens EQ', 'Melitta', 'Philips LatteGo', 'Krups', 'Bosch'] },
    { title: 'Pods and everyday', prefix: '', chips: ['Nespresso', 'Nespresso Vertuo', 'Dolce Gusto', 'Tassimo', 'Smeg', 'Lavazza'] },
    { title: 'Type', prefix: '', chips: ['Bean to cup', 'Espresso', 'Filter', 'Commercial', 'Pod'] },
    { title: 'More Sage and De\'Longhi', prefix: '', chips: ['Sage Barista Touch', 'Sage Oracle Touch', 'De\'Longhi Dedica', 'De\'Longhi Specialista'] },
  ],
};

export const KITCHEN_STANDMIXER: Brand = {
  id: 'standmixer',
  name: 'Stand Mixer',
  root: 'stand mixer',
  groups: [
    { title: 'KitchenAid', prefix: '', chips: ['KitchenAid Artisan', 'KitchenAid Classic', 'KitchenAid Mini', 'KitchenAid Pro', 'KitchenAid 5KSM'] },
    { title: 'Kenwood', prefix: '', chips: ['Kenwood Chef', 'Kenwood Chef XL', 'Kenwood Titanium', 'Kenwood Major', 'Kenwood kMix', 'Kenwood Prospero'] },
    { title: 'Other brands', prefix: '', chips: ['Smeg', 'Bosch MUM', 'Magimix', 'Sage', 'Kitchen Craft'] },
  ],
};

export const DIABETIC_DEXCOM: Brand = {
  id: 'dexcom',
  name: 'Dexcom',
  root: 'dexcom',
  groups: [
    { title: 'Sensors', prefix: '', chips: ['G7 sensor', 'G6 sensor', 'G6 sensor 3 pack', 'G7 sensor 3 pack', 'ONE sensor', 'ONE+ sensor'] },
    { title: 'Transmitters & receivers', prefix: '', chips: ['G6 transmitter', 'G6 receiver', 'G7 receiver', 'ONE transmitter'] },
    { title: 'Bundles & spares', prefix: '', chips: ['starter kit', 'sensor job lot', 'sensor patches', 'silicone covers'] },
  ],
};

export const DIABETIC_FREESTYLELIBRE: Brand = {
  id: 'freestylelibre',
  name: 'FreeStyle Libre',
  root: 'freestyle libre',
  groups: [
    { title: 'Sensors', prefix: '', chips: ['2 sensor', '2 Plus sensor', '3 sensor', '3 Plus sensor', 'sensor 2 pack'] },
    { title: 'Readers & kits', prefix: '', chips: ['2 reader', '3 reader', 'reader bundle', 'starter pack'] },
    { title: 'Patches & covers', prefix: '', chips: ['sensor patches', 'armband cover', 'silicone cover'] },
  ],
};

export const DIABETIC_OMNIPOD: Brand = {
  id: 'omnipod',
  name: 'Omnipod',
  root: 'omnipod',
  groups: [
    { title: 'Pods', prefix: '', chips: ['DASH pods', '5 pods', 'pod job lot'] },
    { title: 'PDMs & controllers', prefix: '', chips: ['DASH PDM', '5 controller', 'PDM charger'] },
    { title: 'Cases & accessories', prefix: '', chips: ['PDM case', 'pod covers', 'pod patches'] },
    { title: 'Listing wording', prefix: '', chips: ['PDM handset', 'pods 10 pack', 'sealed pods', 'in date pods'] },
  ],
};

export const DIABETIC_MEDTRONIC: Brand = {
  id: 'medtronic',
  name: 'Medtronic',
  root: 'medtronic minimed',
  groups: [
    { title: 'Guardian sensors', prefix: '', chips: ['Guardian 4 sensor', 'Guardian 3 sensor', 'Guardian Link 3', 'Guardian transmitter', 'Guardian charger'] },
    { title: 'MiniMed pumps', prefix: '', chips: ['MiniMed 780G', 'MiniMed 770G', 'MiniMed 670G', 'MiniMed 640G'] },
    { title: 'Pump accessories', prefix: '', chips: ['CareLink USB', 'belt clip case', 'pump skin cover'] },
    { title: 'Infusion sets and reservoirs', prefix: '', chips: ['Mio infusion sets', 'Mio Advance', 'Quick-set', 'Silhouette sets', 'Sure-T sets', 'reservoirs 3ml'] },
  ],
};

export const DIABETIC_TANDEM: Brand = {
  id: 'tandem',
  name: 'Tandem t:slim',
  root: 'tandem t slim',
  groups: [
    { title: 'Pumps', prefix: '', chips: ['X2 pump', 'X2 bundle', 'X2 spare'] },
    { title: 'Charging & cases', prefix: '', chips: ['X2 charger', 'silicone case', 'belt clip', 'screen protector'] },
    { title: 'Infusion sets and cartridges', prefix: '', chips: ['infusion sets', 'AutoSoft 90', 'AutoSoft XC', 'TruSteel sets', 'cartridges 300u'] },
  ],
};

export const DIABETIC_ACCUCHEK: Brand = {
  id: 'accuchek',
  name: 'Accu-Chek',
  root: 'accu chek',
  groups: [
    { title: 'Test strips', prefix: '', chips: ['Aviva test strips', 'Guide test strips', 'Instant strips', 'Performa strips', 'Mobile cassette'] },
    { title: 'Meters', prefix: '', chips: ['Aviva meter', 'Guide meter', 'Instant meter', 'Mobile meter'] },
    { title: 'Lancets & lancing', prefix: '', chips: ['Fastclix lancets', 'Softclix lancets', 'Fastclix device', 'Softclix device'] },
  ],
};

export const DIABETIC_ONETOUCH: Brand = {
  id: 'onetouch',
  name: 'OneTouch',
  root: 'onetouch',
  groups: [
    { title: 'Test strips', prefix: '', chips: ['Verio test strips', 'Ultra test strips', 'Select Plus strips'] },
    { title: 'Meters', prefix: '', chips: ['Verio Flex meter', 'Verio Reflect meter', 'Ultra 2 meter', 'Select Plus meter'] },
    { title: 'Lancets', prefix: '', chips: ['Delica lancets', 'Delica Plus lancets', 'Delica device'] },
  ],
};

export const DIABETIC_CONTOUR: Brand = {
  id: 'contour',
  name: 'Contour Next',
  root: 'contour next',
  groups: [
    { title: 'Test strips', prefix: '', chips: ['test strips 50', 'test strips 100', 'EZ test strips'] },
    { title: 'Meters', prefix: '', chips: ['ONE meter', 'Link 2.4 meter', 'USB meter', 'XT meter'] },
    { title: 'Kits & bundles', prefix: '', chips: ['ONE starter kit', 'meter and strips'] },
  ],
};

export const DIABETIC_GLUCORX: Brand = {
  id: 'glucorx',
  name: 'GlucoRx',
  root: 'glucorx',
  groups: [
    { title: 'Test strips', prefix: '', chips: ['Nexus test strips', 'HCT test strips', 'Q test strips'] },
    { title: 'Meters', prefix: '', chips: ['Nexus meter', 'Nexus Voice meter', 'HCT meter'] },
    { title: 'Lancets & CGM', prefix: '', chips: ['lancets 30G', 'Aidex CGM sensor', 'Aidex transmitter'] },
  ],
};

export const DIABETIC_YPSOMED: Brand = {
  id: 'ypsomed',
  name: 'Ypsomed',
  root: 'ypsomed',
  groups: [
    { title: 'Pumps', prefix: '', chips: ['YpsoPump', 'pump bundle'] },
    { title: 'Pump accessories', prefix: '', chips: ['silicone case', 'belt clip', 'screen protector'] },
    { title: 'mylife meters', prefix: '', chips: ['mylife Unio Neva', 'Unio Neva strips', 'mylife Pura strips'] },
  ],
};

export const DIABETIC_CARESENS: Brand = {
  id: 'caresens',
  name: 'CareSens',
  root: 'caresens',
  groups: [
    { title: 'Test strips', prefix: '', chips: ['N test strips', 'Dual test strips', 'strips 100 pack'] },
    { title: 'Meters', prefix: '', chips: ['N meter', 'N Premier meter', 'Dual meter', 'Pop meter'] },
    { title: 'Lancets', prefix: '', chips: ['lancets 30G', 'lancing device', 'universal lancets'] },
  ],
};

export const DIABETIC_GLUCOMEN: Brand = {
  id: 'glucomen',
  name: 'GlucoMen',
  root: 'glucomen',
  groups: [
    { title: 'Test strips', prefix: '', chips: ['areo 2K strips', 'LX Plus strips', 'areo ketone strips'] },
    { title: 'Meters', prefix: '', chips: ['areo meter', 'LX Plus meter', 'areo 2K kit'] },
    { title: 'CGM', prefix: '', chips: ['Day CGM sensor', 'Day transmitter'] },
  ],
};

// ---- the lists behind each category ---------------------------------

export const FURNITURE_TYPES = [
  { name: 'Sofa', brand: FURNITURE_SOFA, subline: '2, 3 and 4 seaters, recliners and sofa beds' },
  { name: 'Corner Sofa', brand: FURNITURE_CORNERSOFA, subline: 'L-shapes, chaise ends and corner sofa beds' },
  { name: 'Armchair', brand: FURNITURE_ARMCHAIR, subline: 'Recliners, wingbacks and mid century frames' },
  { name: 'Wardrobe', brand: FURNITURE_WARDROBE, subline: 'Singles, doubles, sliding doors and Pax units' },
  { name: 'Chest of Drawers', brand: FURNITURE_CHESTOFDRAWERS, subline: '3 to 6 drawers, oak, pine and mid century teak' },
  { name: 'Bed Frame', brand: FURNITURE_BEDFRAME, subline: 'Singles to super kings, ottoman and upholstered' },
  { name: 'Dining Table', brand: FURNITURE_DININGTABLE, subline: 'Extending, round and farmhouse, with or without chairs' },
  { name: 'Dining Chairs', brand: FURNITURE_DININGCHAIRS, subline: 'Sets of 4, 6 and 8, oak, leather and mid century' },
  { name: 'Coffee Table', brand: FURNITURE_COFFEETABLE, subline: 'Oak, glass and mid century, storage and lift top' },
  { name: 'TV Unit', brand: FURNITURE_TVUNIT, subline: 'Stands, cabinets, corner and floating units' },
  { name: 'Sideboard', brand: FURNITURE_SIDEBOARD, subline: 'Mid century teak, oak and painted dressers' },
  { name: 'Bookcase', brand: FURNITURE_BOOKCASE, subline: 'Billy units, oak shelving and mid century teak' },
  { name: 'Desk', brand: FURNITURE_DESK, subline: 'Computer, corner and sit-stand, plus solid oak' },
  { name: 'Office Chair', brand: FURNITURE_OFFICECHAIR, subline: 'Aeron, Leap and mesh chairs that flip fast' },
];

export const TRAILER_TYPES = [
  { name: 'Ifor Williams', brand: TRAILERS_IFORWILLIAMS, subline: 'The code is the price — GD, LM, TT, TA, BV, HB, CT' },
  { name: 'Brian James', brand: TRAILERS_BRIANJAMES, subline: 'Car and race transporters, plus the Cargo range' },
  { name: 'Nugent', brand: TRAILERS_NUGENT, subline: 'Irish-built box, tipper, plant and flatbed' },
  { name: 'Indespension', brand: TRAILERS_INDESPENSION, subline: 'Daxara tippers, Challenger boxes and car trailers' },
  { name: 'Bateson', brand: TRAILERS_BATESON, subline: 'Tilt-bed car transporters and plant trailers' },
  { name: 'Dale Kane', brand: TRAILERS_DALEKANE, subline: 'NI-built tippers, plant and box trailers' },
  { name: 'Wessex', brand: TRAILERS_WESSEX, subline: 'ATV and compact tractor tipping trailers' },
  { name: 'Box trailer', brand: TRAILERS_BOXTRAILER, subline: '6x4 up to 12x6, caged, high-top and twin axle' },
  { name: 'Car transporter', brand: TRAILERS_CARTRANSPORTER, subline: 'Tilt beds and beavertails, 14ft to 18ft' },
  { name: 'Plant trailer', brand: TRAILERS_PLANTTRAILER, subline: 'Mini digger and dumper trailers, 8x4 to 12x6' },
  { name: 'Tipper trailer', brand: TRAILERS_TIPPERTRAILER, subline: 'Hydraulic and manual tippers, 6x4 to 12x6' },
  { name: 'Flatbed trailer', brand: TRAILERS_FLATBEDTRAILER, subline: 'Drop-side and flat deck, 8x5 to 16x6' },
  { name: 'Horse trailer', brand: TRAILERS_HORSETRAILER, subline: 'Two-horse 3.5t towables — Ifor HB and Cheval' },
  { name: 'Motorbike trailer', brand: TRAILERS_MOTORBIKETRAILER, subline: 'Single, twin and 3-rail carriers, plus enclosed' },
  { name: 'Camping trailer', brand: TRAILERS_CAMPINGTRAILER, subline: 'Teardrops, micro caravans and kitted-out boxes' },
];

export const KITCHEN_APPLIANCES = [
  { name: 'Washing Machine', brand: KITCHEN_WASHINGMACHINE, subline: '7kg to 10kg, freestanding and integrated' },
  { name: 'Tumble Dryer', brand: KITCHEN_TUMBLEDRYER, subline: 'Heat pump, condenser and vented' },
  { name: 'Washer Dryer', brand: KITCHEN_WASHERDRYER, subline: '2 in 1 machines, freestanding and integrated' },
  { name: 'Dishwasher', brand: KITCHEN_DISHWASHER, subline: 'Full size, slimline, integrated and table top' },
  { name: 'Fridge Freezer', brand: KITCHEN_FRIDGEFREEZER, subline: 'Freestanding, integrated and retro Smeg' },
  { name: 'American Fridge Freezer', brand: KITCHEN_AMERICANFRIDGEFREEZER, subline: 'Side by side and multi door, plumbed or not' },
  { name: 'Oven', brand: KITCHEN_OVEN, subline: 'Built in single, double and freestanding cookers' },
  { name: 'Range Cooker', brand: KITCHEN_RANGECOOKER, subline: '90cm and 110cm dual fuel, gas and electric' },
  { name: 'Hob', brand: KITCHEN_HOB, subline: 'Induction, ceramic, gas and venting' },
  { name: 'Cooker Hood', brand: KITCHEN_COOKERHOOD, subline: 'Chimney, island, integrated and downdraft' },
  { name: 'Microwave', brand: KITCHEN_MICROWAVE, subline: 'Solo, combi, built in and retro Smeg' },
  { name: 'Air Fryer', brand: KITCHEN_AIRFRYER, subline: 'Ninja, Instant and Tower, single and dual drawer' },
  { name: 'Coffee Machine', brand: KITCHEN_COFFEEMACHINE, subline: 'Bean to cup, espresso and pod machines' },
  { name: 'Stand Mixer', brand: KITCHEN_STANDMIXER, subline: 'KitchenAid and Kenwood, plus attachments' },
];

export const DIABETIC_BRANDS = [
  { name: 'Dexcom', brand: DIABETIC_DEXCOM, subline: 'G6, G7 and ONE sensors, transmitters and receivers' },
  { name: 'FreeStyle Libre', brand: DIABETIC_FREESTYLELIBRE, subline: 'Libre 2, 3 and Plus sensors plus readers' },
  { name: 'Omnipod', brand: DIABETIC_OMNIPOD, subline: 'DASH and Eros pods, PDMs and Omnipod 5 controllers' },
  { name: 'Medtronic', brand: DIABETIC_MEDTRONIC, subline: 'Guardian sensors and MiniMed pumps' },
  { name: 'Tandem t:slim', brand: DIABETIC_TANDEM, subline: 't:slim X2 pumps, chargers and cases' },
  { name: 'Accu-Chek', brand: DIABETIC_ACCUCHEK, subline: 'Aviva, Guide and Instant meters, strips and lancets' },
  { name: 'OneTouch', brand: DIABETIC_ONETOUCH, subline: 'Verio and Ultra meters, strips and Delica lancets' },
  { name: 'Contour Next', brand: DIABETIC_CONTOUR, subline: 'Next ONE and Link meters with Next test strips' },
  { name: 'GlucoRx', brand: DIABETIC_GLUCORX, subline: 'Nexus and HCT meters, strips and Aidex CGM' },
  { name: 'Ypsomed', brand: DIABETIC_YPSOMED, subline: 'YpsoPump and mylife meters and accessories' },
  { name: 'CareSens', brand: DIABETIC_CARESENS, subline: 'N, Dual and Premier meters, strips and lancets' },
  { name: 'GlucoMen', brand: DIABETIC_GLUCOMEN, subline: 'areo and LX Plus meters, strips and Day CGM' },
];

export const HOUSEHOLD: Record<string, {
  title: string;
  accent: string;
  subtitle: string;
  searchPlaceholder: string;
  notListed: string;
  entries: { name: string; brand: Brand; subline: string }[];
}> = {
  'furniture': {
    title: 'What kind of',
    accent: 'furniture?',
    subtitle: 'Pick the piece — the models and sizes come next.',
    searchPlaceholder: 'Search furniture',
    notListed: 'Not listed?',
    entries: FURNITURE_TYPES,
  },
  'trailers': {
    title: 'Which',
    accent: 'trailer?',
    subtitle: 'By maker if you know it, by type if you do not.',
    searchPlaceholder: 'Search trailers',
    notListed: 'Trailer not listed?',
    entries: TRAILER_TYPES,
  },
  'kitchen': {
    title: 'Which',
    accent: 'appliance?',
    subtitle: 'Pick the appliance — brands and models come next.',
    searchPlaceholder: 'Search appliances',
    notListed: 'Appliance not listed?',
    entries: KITCHEN_APPLIANCES,
  },
  'diabetic': {
    title: 'Which',
    accent: 'brand?',
    subtitle: 'Pick the brand — sensors, pods and readers come next.',
    searchPlaceholder: 'Search brands',
    notListed: 'Brand not listed?',
    entries: DIABETIC_BRANDS,
  },
};

// each card introduces its own model list
export const HOUSEHOLD_HEADERS: Record<string, { title: string; accent: string; subtitle: string }> = {
  'sofa': { title: 'Which Sofa', accent: 'models?', subtitle: '2, 3 and 4 seaters, recliners and sofa beds' },
  'cornersofa': { title: 'Which Corner Sofa', accent: 'models?', subtitle: 'L-shapes, chaise ends and corner sofa beds' },
  'armchair': { title: 'Which Armchair', accent: 'models?', subtitle: 'Recliners, wingbacks and mid century frames' },
  'wardrobe': { title: 'Which Wardrobe', accent: 'models?', subtitle: 'Singles, doubles, sliding doors and Pax units' },
  'chestofdrawers': { title: 'Which Chest of Drawers', accent: 'models?', subtitle: '3 to 6 drawers, oak, pine and mid century teak' },
  'bedframe': { title: 'Which Bed Frame', accent: 'models?', subtitle: 'Singles to super kings, ottoman and upholstered' },
  'diningtable': { title: 'Which Dining Table', accent: 'models?', subtitle: 'Extending, round and farmhouse, with or without chairs' },
  'diningchairs': { title: 'Which Dining Chairs', accent: 'models?', subtitle: 'Sets of 4, 6 and 8, oak, leather and mid century' },
  'coffeetable': { title: 'Which Coffee Table', accent: 'models?', subtitle: 'Oak, glass and mid century, storage and lift top' },
  'tvunit': { title: 'Which TV Unit', accent: 'models?', subtitle: 'Stands, cabinets, corner and floating units' },
  'sideboard': { title: 'Which Sideboard', accent: 'models?', subtitle: 'Mid century teak, oak and painted dressers' },
  'bookcase': { title: 'Which Bookcase', accent: 'models?', subtitle: 'Billy units, oak shelving and mid century teak' },
  'desk': { title: 'Which Desk', accent: 'models?', subtitle: 'Computer, corner and sit-stand, plus solid oak' },
  'officechair': { title: 'Which Office Chair', accent: 'models?', subtitle: 'Aeron, Leap and mesh chairs that flip fast' },
  'iforwilliams': { title: 'Which Ifor Williams', accent: 'models?', subtitle: 'The code is the price — GD, LM, TT, TA, BV, HB, CT' },
  'brianjames': { title: 'Which Brian James', accent: 'models?', subtitle: 'Car and race transporters, plus the Cargo range' },
  'nugent': { title: 'Which Nugent', accent: 'models?', subtitle: 'Irish-built box, tipper, plant and flatbed' },
  'indespension': { title: 'Which Indespension', accent: 'models?', subtitle: 'Daxara tippers, Challenger boxes and car trailers' },
  'bateson': { title: 'Which Bateson', accent: 'models?', subtitle: 'Tilt-bed car transporters and plant trailers' },
  'dalekane': { title: 'Which Dale Kane', accent: 'models?', subtitle: 'NI-built tippers, plant and box trailers' },
  'wessex': { title: 'Which Wessex', accent: 'models?', subtitle: 'ATV and compact tractor tipping trailers' },
  'boxtrailer': { title: 'Which Box trailer', accent: 'models?', subtitle: '6x4 up to 12x6, caged, high-top and twin axle' },
  'cartransporter': { title: 'Which Car transporter', accent: 'models?', subtitle: 'Tilt beds and beavertails, 14ft to 18ft' },
  'planttrailer': { title: 'Which Plant trailer', accent: 'models?', subtitle: 'Mini digger and dumper trailers, 8x4 to 12x6' },
  'tippertrailer': { title: 'Which Tipper trailer', accent: 'models?', subtitle: 'Hydraulic and manual tippers, 6x4 to 12x6' },
  'flatbedtrailer': { title: 'Which Flatbed trailer', accent: 'models?', subtitle: 'Drop-side and flat deck, 8x5 to 16x6' },
  'horsetrailer': { title: 'Which Horse trailer', accent: 'models?', subtitle: 'Two-horse 3.5t towables — Ifor HB and Cheval' },
  'motorbiketrailer': { title: 'Which Motorbike trailer', accent: 'models?', subtitle: 'Single, twin and 3-rail carriers, plus enclosed' },
  'campingtrailer': { title: 'Which Camping trailer', accent: 'models?', subtitle: 'Teardrops, micro caravans and kitted-out boxes' },
  'washingmachine': { title: 'Which Washing Machine', accent: 'models?', subtitle: '7kg to 10kg, freestanding and integrated' },
  'tumbledryer': { title: 'Which Tumble Dryer', accent: 'models?', subtitle: 'Heat pump, condenser and vented' },
  'washerdryer': { title: 'Which Washer Dryer', accent: 'models?', subtitle: '2 in 1 machines, freestanding and integrated' },
  'dishwasher': { title: 'Which Dishwasher', accent: 'models?', subtitle: 'Full size, slimline, integrated and table top' },
  'fridgefreezer': { title: 'Which Fridge Freezer', accent: 'models?', subtitle: 'Freestanding, integrated and retro Smeg' },
  'americanfridgefreezer': { title: 'Which American Fridge Freezer', accent: 'models?', subtitle: 'Side by side and multi door, plumbed or not' },
  'oven': { title: 'Which Oven', accent: 'models?', subtitle: 'Built in single, double and freestanding cookers' },
  'rangecooker': { title: 'Which Range Cooker', accent: 'models?', subtitle: '90cm and 110cm dual fuel, gas and electric' },
  'hob': { title: 'Which Hob', accent: 'models?', subtitle: 'Induction, ceramic, gas and venting' },
  'cookerhood': { title: 'Which Cooker Hood', accent: 'models?', subtitle: 'Chimney, island, integrated and downdraft' },
  'microwave': { title: 'Which Microwave', accent: 'models?', subtitle: 'Solo, combi, built in and retro Smeg' },
  'airfryer': { title: 'Which Air Fryer', accent: 'models?', subtitle: 'Ninja, Instant and Tower, single and dual drawer' },
  'coffeemachine': { title: 'Which Coffee Machine', accent: 'models?', subtitle: 'Bean to cup, espresso and pod machines' },
  'standmixer': { title: 'Which Stand Mixer', accent: 'models?', subtitle: 'KitchenAid and Kenwood, plus attachments' },
  'dexcom': { title: 'Which Dexcom', accent: 'models?', subtitle: 'G6, G7 and ONE sensors, transmitters and receivers' },
  'freestylelibre': { title: 'Which FreeStyle Libre', accent: 'models?', subtitle: 'Libre 2, 3 and Plus sensors plus readers' },
  'omnipod': { title: 'Which Omnipod', accent: 'models?', subtitle: 'DASH and Eros pods, PDMs and Omnipod 5 controllers' },
  'medtronic': { title: 'Which Medtronic', accent: 'models?', subtitle: 'Guardian sensors and MiniMed pumps' },
  'tandem': { title: 'Which Tandem t:slim', accent: 'models?', subtitle: 't:slim X2 pumps, chargers and cases' },
  'accuchek': { title: 'Which Accu-Chek', accent: 'models?', subtitle: 'Aviva, Guide and Instant meters, strips and lancets' },
  'onetouch': { title: 'Which OneTouch', accent: 'models?', subtitle: 'Verio and Ultra meters, strips and Delica lancets' },
  'contour': { title: 'Which Contour Next', accent: 'models?', subtitle: 'Next ONE and Link meters with Next test strips' },
  'glucorx': { title: 'Which GlucoRx', accent: 'models?', subtitle: 'Nexus and HCT meters, strips and Aidex CGM' },
  'ypsomed': { title: 'Which Ypsomed', accent: 'models?', subtitle: 'YpsoPump and mylife meters and accessories' },
  'caresens': { title: 'Which CareSens', accent: 'models?', subtitle: 'N, Dual and Premier meters, strips and lancets' },
  'glucomen': { title: 'Which GlucoMen', accent: 'models?', subtitle: 'areo and LX Plus meters, strips and Day CGM' },
};
