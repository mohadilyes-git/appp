// the car catalogue, makes and models the way AutoTrader UK lists them.
// one flat model list per make, which is how the picker draws it.

// type-only, so this never imports the main file back at runtime
import type { Brand } from './catalogue';

export const CAR_ABARTH: Brand = {
  id: 'abarth',
  name: 'Abarth',
  root: 'car abarth',
  groups: [{ title: 'Models', prefix: '', chips: ['595', '500', '695', '124 Spider', '500e', '595C', '500C', 'Punto Evo', 'Grande Punto', '600e', '695C'] }],
};

export const CAR_ALFAROMEO: Brand = {
  id: 'alfaromeo',
  name: 'Alfa Romeo',
  root: 'car alfa romeo',
  groups: [{ title: 'Models', prefix: '', chips: ['Giulietta', 'MiTo', 'Giulia', 'Stelvio', '159', '147', 'Tonale', 'Brera', 'GT', '156', 'Spider', '4C', '166', 'GTV', 'Junior', '8C', '145', '146', '155', '164', '33', '75'] }],
};

export const CAR_ALPINA: Brand = {
  id: 'alpina',
  name: 'Alpina',
  root: 'car alpina',
  groups: [{ title: 'Models', prefix: '', chips: ['B3', 'D3', 'B5', 'B4', 'D5', 'XD3', 'B7', 'B10', 'B8', 'D4', 'B6', 'XD4', 'D10'] }],
};

export const CAR_ALPINE: Brand = {
  id: 'alpine',
  name: 'Alpine',
  root: 'car alpine',
  groups: [{ title: 'Models', prefix: '', chips: ['A110', 'A290'] }],
};

export const CAR_ARIEL: Brand = {
  id: 'ariel',
  name: 'Ariel',
  root: 'car ariel',
  groups: [{ title: 'Models', prefix: '', chips: ['Atom', 'Nomad'] }],
};

export const CAR_ASTONMARTIN: Brand = {
  id: 'astonmartin',
  name: 'Aston Martin',
  root: 'car aston martin',
  groups: [{ title: 'Models', prefix: '', chips: ['V8 Vantage', 'DB9', 'DB11', 'Vantage', 'DBX', 'DBS', 'Rapide', 'Vanquish', 'DB7', 'V12 Vantage', 'DB12', 'Virage', 'DBS Superleggera', 'Cygnet', 'Lagonda', 'DB5', 'DB6', 'V8', 'Valkyrie'] }],
};

export const CAR_AUDI: Brand = {
  id: 'audi',
  name: 'Audi',
  root: 'car audi',
  groups: [{ title: 'Models', prefix: '', chips: ['A3', 'A4', 'A1', 'Q3', 'Q5', 'A5', 'A6', 'TT', 'Q2', 'Q7', 'A7', 'A8', 'S3', 'RS3', 'Q8', 'e-tron', 'Q4 e-tron', 'RS6', 'R8', 'S4', 'RS4', 'S5', 'A2', 'e-tron GT', 'Q8 e-tron', 'RS5', 'TT RS', 'SQ5', 'A4 Allroad', 'A6 Allroad', 'Q3 Sportback', 'Q5 Sportback', 'Q6 e-tron', 'S1', 'S6', 'S7', 'S8', 'RS7', 'RS Q3', 'RS Q8', 'SQ7', 'SQ8', 'TTS', '80', '100'] }],
};

export const CAR_BENTLEY: Brand = {
  id: 'bentley',
  name: 'Bentley',
  root: 'car bentley',
  groups: [{ title: 'Models', prefix: '', chips: ['Continental GT', 'Bentayga', 'Flying Spur', 'Continental GTC', 'Continental Flying Spur', 'Mulsanne', 'Arnage', 'Azure', 'Brooklands', 'Bentayga EWB', 'Turbo R', 'Continental R', 'Eight'] }],
};

export const CAR_BMW: Brand = {
  id: 'bmw',
  name: 'BMW',
  root: 'car bmw',
  groups: [{ title: 'Models', prefix: '', chips: ['3 Series', '1 Series', '5 Series', 'X5', 'X3', '2 Series', '4 Series', 'X1', 'Z4', '7 Series', 'X6', '6 Series', 'M3', 'M4', 'X2', 'X4', 'i3', 'M5', 'X7', '8 Series', 'i4', 'iX3', 'M2', 'Z3', 'iX', 'i8', 'iX1', 'i5', '2 Series Active Tourer', '2 Series Gran Tourer', '2 Series Gran Coupe', '3 Series Gran Turismo', '4 Series Gran Coupe', '6 Series Gran Turismo', 'i7', 'iX2', 'M8', 'X5 M', 'X6 M'] }],
};

export const CAR_BYD: Brand = {
  id: 'byd',
  name: 'BYD',
  root: 'car byd',
  groups: [{ title: 'Models', prefix: '', chips: ['Atto 3', 'Dolphin', 'Seal', 'Sealion 7', 'Seal U', 'Dolphin Surf', 'Sealion 6', 'Atto 2'] }],
};

export const CAR_CADILLAC: Brand = {
  id: 'cadillac',
  name: 'Cadillac',
  root: 'car cadillac',
  groups: [{ title: 'Models', prefix: '', chips: ['Escalade', 'CTS', 'BLS', 'SRX', 'STS', 'XLR', 'Lyriq', 'Optiq', 'Vistiq', 'Seville', 'Eldorado'] }],
};

export const CAR_CATERHAM: Brand = {
  id: 'caterham',
  name: 'Caterham',
  root: 'car caterham',
  groups: [{ title: 'Models', prefix: '', chips: ['Seven', 'Super Seven', 'CSR', '21'] }],
};

export const CAR_CHEVROLET: Brand = {
  id: 'chevrolet',
  name: 'Chevrolet',
  root: 'car chevrolet',
  groups: [{ title: 'Models', prefix: '', chips: ['Spark', 'Aveo', 'Cruze', 'Captiva', 'Matiz', 'Lacetti', 'Orlando', 'Kalos', 'Camaro', 'Trax', 'Corvette', 'Tacuma', 'Epica', 'Nubira', 'Volt'] }],
};

export const CAR_CHRYSLER: Brand = {
  id: 'chrysler',
  name: 'Chrysler',
  root: 'car chrysler',
  groups: [{ title: 'Models', prefix: '', chips: ['Grand Voyager', '300C', 'PT Cruiser', 'Ypsilon', 'Voyager', 'Delta', 'Crossfire', 'Sebring', 'Neon', '300M'] }],
};

export const CAR_CITROEN: Brand = {
  id: 'citroen',
  name: 'Citroen',
  root: 'car citroen',
  groups: [{ title: 'Models', prefix: '', chips: ['C3', 'C1', 'C4', 'Berlingo', 'C4 Picasso', 'C5', 'Grand C4 Picasso', 'C3 Picasso', 'C4 Cactus', 'Xsara Picasso', 'C2', 'C3 Aircross', 'C5 Aircross', 'DS3', 'Dispatch', 'Relay', 'Nemo', 'Saxo', 'Xsara', 'C8', 'C6', 'C4 SpaceTourer', 'C5 X', 'C-Crosser', 'C3 Pluriel', 'C4 X', 'e-C4', 'Ami', 'C4 Grand SpaceTourer', 'C4 Aircross', 'C-Zero', 'e-C3', 'e-Berlingo', 'e-Dispatch', 'Xantia', 'ZX', 'BX', 'XM', 'Synergie', 'C15'] }],
};

export const CAR_CUPRA: Brand = {
  id: 'cupra',
  name: 'Cupra',
  root: 'car cupra',
  groups: [{ title: 'Models', prefix: '', chips: ['Formentor', 'Leon', 'Born', 'Ateca', 'Tavascan', 'Terramar'] }],
};

export const CAR_DACIA: Brand = {
  id: 'dacia',
  name: 'Dacia',
  root: 'car dacia',
  groups: [{ title: 'Models', prefix: '', chips: ['Duster', 'Sandero', 'Sandero Stepway', 'Logan MCV', 'Jogger', 'Spring', 'Bigster'] }],
};

export const CAR_DAEWOO: Brand = {
  id: 'daewoo',
  name: 'Daewoo',
  root: 'car daewoo',
  groups: [{ title: 'Models', prefix: '', chips: ['Matiz', 'Kalos', 'Lacetti', 'Nubira', 'Tacuma', 'Lanos', 'Leganza', 'Musso', 'Espero', 'Nexia', 'Rezzo'] }],
};

export const CAR_DAIHATSU: Brand = {
  id: 'daihatsu',
  name: 'Daihatsu',
  root: 'car daihatsu',
  groups: [{ title: 'Models', prefix: '', chips: ['Sirion', 'Terios', 'Copen', 'Charade', 'Cuore', 'Materia', 'YRV', 'Fourtrak', 'Move', 'Sportrak', 'Applause', 'Hijet', 'Rocky', 'Grand Move'] }],
};

export const CAR_DAIMLER: Brand = {
  id: 'daimler',
  name: 'Daimler',
  root: 'car daimler',
  groups: [{ title: 'Models', prefix: '', chips: ['Super V8', 'Six', 'Sovereign', 'Double Six', 'Super Eight', 'DS420', 'Dart', 'Majestic'] }],
};

export const CAR_DODGE: Brand = {
  id: 'dodge',
  name: 'Dodge',
  root: 'car dodge',
  groups: [{ title: 'Models', prefix: '', chips: ['Caliber', 'Journey', 'Nitro', 'Avenger'] }],
};

export const CAR_DSAUTOMOBILES: Brand = {
  id: 'dsautomobiles',
  name: 'DS Automobiles',
  root: 'car ds automobiles',
  groups: [{ title: 'Models', prefix: '', chips: ['DS 3', 'DS 3 Crossback', 'DS 4', 'DS 7 Crossback', 'DS 5', 'DS 7', 'DS 9', 'DS 4 Crossback'] }],
};

export const CAR_FERRARI: Brand = {
  id: 'ferrari',
  name: 'Ferrari',
  root: 'car ferrari',
  groups: [{ title: 'Models', prefix: '', chips: ['458 Italia', 'California', 'F430', '488 GTB', '360 Modena', 'Portofino', '812 Superfast', 'F8 Tributo', '599 GTB Fiorano', 'Roma', 'FF', 'GTC4Lusso', '612 Scaglietti', 'F355', '550 Maranello', '575M Maranello', 'SF90 Stradale', '296 GTB', 'Purosangue', 'Testarossa', 'LaFerrari', 'Enzo', '348', '328', 'F40', 'F50', '456', '12Cilindri'] }],
};

export const CAR_FIAT: Brand = {
  id: 'fiat',
  name: 'Fiat',
  root: 'car fiat',
  groups: [{ title: 'Models', prefix: '', chips: ['500', 'Panda', 'Punto', 'Grande Punto', '500X', '500L', 'Tipo', 'Punto Evo', 'Doblo', 'Bravo', 'Ducato', 'Qubo', 'Stilo', 'Multipla', 'Seicento', 'Sedici', 'Croma', 'Idea', 'Fiorino', 'Scudo', '124 Spider', 'Freemont', 'Talento', '500e', '600e', 'Coupe', 'Barchetta', 'Grande Panda', 'Ulysse', 'Cinquecento', 'Uno', 'Brava', 'Marea', 'Strada', 'E-Ducato', 'E-Doblo', 'E-Scudo'] }],
};

export const CAR_FISKER: Brand = {
  id: 'fisker',
  name: 'Fisker',
  root: 'car fisker',
  groups: [{ title: 'Models', prefix: '', chips: ['Ocean', 'Karma'] }],
};

export const CAR_FORD: Brand = {
  id: 'ford',
  name: 'Ford',
  root: 'car ford',
  groups: [{ title: 'Models', prefix: '', chips: ['Fiesta', 'Focus', 'Kuga', 'Puma', 'Mondeo', 'Ka', 'C-Max', 'S-Max', 'EcoSport', 'Galaxy', 'Transit Custom', 'Ranger', 'B-Max', 'Ka+', 'Transit', 'Transit Connect', 'Grand C-Max', 'Mustang', 'Edge', 'Fusion', 'Tourneo Custom', 'Tourneo Connect', 'Mustang Mach-E', 'StreetKa', 'Explorer', 'Capri', 'Escort', 'Transit Courier', 'Tourneo Courier', 'Grand Tourneo Connect', 'E-Transit', 'E-Transit Custom', 'Sierra', 'Granada', 'Scorpio', 'Orion', 'Cougar', 'Probe'] }],
};

export const CAR_GENESIS: Brand = {
  id: 'genesis',
  name: 'Genesis',
  root: 'car genesis',
  groups: [{ title: 'Models', prefix: '', chips: ['GV70', 'G70', 'GV80', 'G80', 'GV60', 'G70 Shooting Brake'] }],
};

export const CAR_GWM: Brand = {
  id: 'gwm',
  name: 'GWM',
  root: 'car gwm',
  groups: [{ title: 'Models', prefix: '', chips: ['ORA 03', 'Haval Jolion', 'Haval H6', 'Steed'] }],
};

export const CAR_HONDA: Brand = {
  id: 'honda',
  name: 'Honda',
  root: 'car honda',
  groups: [{ title: 'Models', prefix: '', chips: ['Civic', 'Jazz', 'CR-V', 'HR-V', 'Accord', 'Civic Type R', 'CR-Z', 'FR-V', 'Insight', 'S2000', 'Stream', 'ZR-V', 'Legend', 'NSX', 'Prelude', 'e', 'e:Ny1', 'Civic Tourer', 'Concerto', 'Integra', 'Logo', 'Shuttle'] }],
};

export const CAR_HUMMER: Brand = {
  id: 'hummer',
  name: 'Hummer',
  root: 'car hummer',
  groups: [{ title: 'Models', prefix: '', chips: ['H2', 'H3', 'H1'] }],
};

export const CAR_HYUNDAI: Brand = {
  id: 'hyundai',
  name: 'Hyundai',
  root: 'car hyundai',
  groups: [{ title: 'Models', prefix: '', chips: ['i10', 'i20', 'i30', 'Tucson', 'ix35', 'Santa Fe', 'Kona', 'i40', 'ix20', 'Ioniq', 'Getz', 'Ioniq 5', 'Bayon', 'Amica', 'Matrix', 'Accent', 'Coupe', 'Elantra', 'i800', 'Veloster', 'Ioniq 6', 'Terracan', 'Trajet', 'Inster', 'Kona Electric', 'Ioniq 9', 'Nexo', 'Sonata', 'Lantra', 'Atoz', 'Pony', 'H-1'] }],
};

export const CAR_INEOS: Brand = {
  id: 'ineos',
  name: 'Ineos',
  root: 'car ineos',
  groups: [{ title: 'Models', prefix: '', chips: ['Grenadier', 'Quartermaster'] }],
};

export const CAR_INFINITI: Brand = {
  id: 'infiniti',
  name: 'Infiniti',
  root: 'car infiniti',
  groups: [{ title: 'Models', prefix: '', chips: ['Q30', 'Q50', 'QX30', 'Q70', 'QX70', 'Q60', 'FX', 'EX', 'G37', 'QX50', 'M'] }],
};

export const CAR_ISUZU: Brand = {
  id: 'isuzu',
  name: 'Isuzu',
  root: 'car isuzu',
  groups: [{ title: 'Models', prefix: '', chips: ['D-Max', 'Rodeo', 'Trooper'] }],
};

export const CAR_IVECO: Brand = {
  id: 'iveco',
  name: 'Iveco',
  root: 'car iveco',
  groups: [{ title: 'Models', prefix: '', chips: ['Daily', 'Eurocargo', 'Massif', 'Turbo Daily'] }],
};

export const CAR_JAECOO: Brand = {
  id: 'jaecoo',
  name: 'Jaecoo',
  root: 'car jaecoo',
  groups: [{ title: 'Models', prefix: '', chips: ['7', '5'] }],
};

export const CAR_JAGUAR: Brand = {
  id: 'jaguar',
  name: 'Jaguar',
  root: 'car jaguar',
  groups: [{ title: 'Models', prefix: '', chips: ['XF', 'XE', 'F-Pace', 'X-Type', 'XJ', 'F-Type', 'E-Pace', 'S-Type', 'XK', 'I-Pace', 'XK8', 'XJS', 'E-Type', 'Mark 2', 'XJ6'] }],
};

export const CAR_JEEP: Brand = {
  id: 'jeep',
  name: 'Jeep',
  root: 'car jeep',
  groups: [{ title: 'Models', prefix: '', chips: ['Renegade', 'Compass', 'Grand Cherokee', 'Wrangler', 'Cherokee', 'Avenger', 'Patriot', 'Commander'] }],
};

export const CAR_KGM: Brand = {
  id: 'kgm',
  name: 'KGM',
  root: 'car kgm',
  groups: [{ title: 'Models', prefix: '', chips: ['Musso', 'Rexton', 'Korando', 'Tivoli', 'Torres', 'Actyon'] }],
};

export const CAR_KIA: Brand = {
  id: 'kia',
  name: 'Kia',
  root: 'car kia',
  groups: [{ title: 'Models', prefix: '', chips: ['Sportage', 'Ceed', 'Picanto', 'Rio', 'Niro', 'Sorento', 'Stonic', 'Soul', 'XCeed', 'Venga', 'EV6', 'ProCeed', 'Optima', 'Carens', 'Sedona', 'Stinger', 'EV9', 'Cerato', 'Magentis', 'EV3', 'e-Niro', 'Soul EV', 'Carnival', 'EV5', 'Pride', 'Shuma'] }],
};

export const CAR_LAMBORGHINI: Brand = {
  id: 'lamborghini',
  name: 'Lamborghini',
  root: 'car lamborghini',
  groups: [{ title: 'Models', prefix: '', chips: ['Huracan', 'Urus', 'Gallardo', 'Aventador', 'Murcielago', 'Revuelto', 'Diablo', 'Countach', 'Temerario'] }],
};

export const CAR_LANCIA: Brand = {
  id: 'lancia',
  name: 'Lancia',
  root: 'car lancia',
  groups: [{ title: 'Models', prefix: '', chips: ['Delta', 'Ypsilon', 'Musa', 'Thema', 'Dedra', 'Kappa', 'Zeta', 'Beta', 'Fulvia', 'Montecarlo', 'Y10', 'Prisma'] }],
};

export const CAR_LANDROVER: Brand = {
  id: 'landrover',
  name: 'Land Rover',
  root: 'car land rover',
  groups: [{ title: 'Models', prefix: '', chips: ['Range Rover Evoque', 'Discovery Sport', 'Range Rover Sport', 'Range Rover', 'Discovery', 'Freelander', 'Defender', 'Range Rover Velar', 'Series', 'Series III'] }],
};

export const CAR_LDV: Brand = {
  id: 'ldv',
  name: 'LDV',
  root: 'car ldv',
  groups: [{ title: 'Models', prefix: '', chips: ['Maxus', 'Convoy', 'Pilot', '400', 'Cub', 'Sherpa'] }],
};

export const CAR_LEAPMOTOR: Brand = {
  id: 'leapmotor',
  name: 'Leapmotor',
  root: 'car leapmotor',
  groups: [{ title: 'Models', prefix: '', chips: ['T03', 'C10', 'B10'] }],
};

export const CAR_LEXUS: Brand = {
  id: 'lexus',
  name: 'Lexus',
  root: 'car lexus',
  groups: [{ title: 'Models', prefix: '', chips: ['IS', 'RX', 'NX', 'CT', 'UX', 'GS', 'ES', 'RC', 'LS', 'LC', 'RZ', 'LBX', 'SC', 'LM', 'LFA'] }],
};

export const CAR_LOTUS: Brand = {
  id: 'lotus',
  name: 'Lotus',
  root: 'car lotus',
  groups: [{ title: 'Models', prefix: '', chips: ['Elise', 'Exige', 'Evora', 'Emira', 'Eletre', 'Esprit', 'Europa', 'Emeya', 'Elan', 'Excel', 'Elite'] }],
};

export const CAR_MASERATI: Brand = {
  id: 'maserati',
  name: 'Maserati',
  root: 'car maserati',
  groups: [{ title: 'Models', prefix: '', chips: ['Ghibli', 'Levante', 'Quattroporte', 'GranTurismo', 'Grecale', 'GranCabrio', 'MC20', 'Coupe', 'Spyder', '3200 GT', 'GranSport', 'Biturbo'] }],
};

export const CAR_MAXUS: Brand = {
  id: 'maxus',
  name: 'Maxus',
  root: 'car maxus',
  groups: [{ title: 'Models', prefix: '', chips: ['Deliver 9', 'Deliver 7', 'eDeliver 3', 'eDeliver 7', 'eDeliver 9', 'T90 EV', 'eTerron 9', 'MIFA 9', 'Euniq 5', 'Euniq 6'] }],
};

export const CAR_MAZDA: Brand = {
  id: 'mazda',
  name: 'Mazda',
  root: 'car mazda',
  groups: [{ title: 'Models', prefix: '', chips: ['Mazda3', 'Mazda6', 'Mazda2', 'CX-5', 'MX-5', 'CX-3', 'CX-30', 'Mazda5', 'CX-60', 'RX-8', 'CX-7', 'MX-30', 'CX-80', 'BT-50', 'Premacy', '323', '626', 'MPV', 'RX-7', 'Tribute', 'Xedos 6'] }],
};

export const CAR_MCLAREN: Brand = {
  id: 'mclaren',
  name: 'McLaren',
  root: 'car mclaren',
  groups: [{ title: 'Models', prefix: '', chips: ['570S', '720S', '650S', '12C', '540C', '600LT', 'Artura', 'GT', '765LT', '675LT', '570GT', '750S', 'P1', 'Senna', 'Speedtail', 'Elva', '620R', 'W1'] }],
};

export const CAR_MERCEDESBENZ: Brand = {
  id: 'mercedesbenz',
  name: 'Mercedes-Benz',
  root: 'car mercedes-benz',
  groups: [{ title: 'Models', prefix: '', chips: ['A-Class', 'C-Class', 'E-Class', 'GLA', 'GLC', 'B-Class', 'CLA', 'S-Class', 'SLK', 'GLE', 'ML', 'CLS', 'CLK', 'V-Class', 'GLB', 'SL', 'GLS', 'G-Class', 'SLC', 'EQA', 'EQC', 'EQB', 'R-Class', 'GL', 'X-Class', 'AMG GT', 'EQE', 'EQS', 'Sprinter', 'Vito', 'Citan', 'Viano', 'Vaneo', 'Marco Polo', 'EQV', 'T-Class', 'CLE', 'CL', 'CLC', 'GLC Coupe', 'GLE Coupe', 'SLS AMG', 'SLR McLaren', '190'] }],
};

export const CAR_MG: Brand = {
  id: 'mg',
  name: 'MG',
  root: 'car mg',
  groups: [{ title: 'Models', prefix: '', chips: ['ZS', 'HS', 'MG3', 'MG5', 'MG4', 'ZR', 'TF', 'ZT', 'MG6', 'MGF', 'Cyberster', 'MGB', 'Midget', 'QS', 'S5 EV', 'ZS EV', 'IM5', 'IM6', 'MG7', 'ZT-T', 'Maestro', 'Montego', 'Metro', 'MGA'] }],
};

export const CAR_MINI: Brand = {
  id: 'mini',
  name: 'MINI',
  root: 'car mini',
  groups: [{ title: 'Models', prefix: '', chips: ['Hatch', 'Countryman', 'Clubman', 'Convertible', 'Coupe', 'Roadster', 'Paceman', 'Electric', 'Aceman', 'Cooper', 'Clubvan'] }],
};

export const CAR_MITSUBISHI: Brand = {
  id: 'mitsubishi',
  name: 'Mitsubishi',
  root: 'car mitsubishi',
  groups: [{ title: 'Models', prefix: '', chips: ['Outlander', 'ASX', 'L200', 'Shogun', 'Colt', 'Mirage', 'Eclipse Cross', 'Lancer', 'Shogun Sport', 'Space Star', 'Grandis', 'Carisma', 'Galant', 'Lancer Evolution', 'i-MiEV', 'Shogun Pinin', 'Space Wagon', 'Space Runner', 'Delica', 'L300', 'FTO', 'GTO', 'Sigma'] }],
};

export const CAR_MORGAN: Brand = {
  id: 'morgan',
  name: 'Morgan',
  root: 'car morgan',
  groups: [{ title: 'Models', prefix: '', chips: ['Plus 4', '4/4', 'Roadster', '3 Wheeler', 'Plus Six', 'Aero 8', 'Plus 8', 'Super 3', 'Supersport'] }],
};

export const CAR_NISSAN: Brand = {
  id: 'nissan',
  name: 'Nissan',
  root: 'car nissan',
  groups: [{ title: 'Models', prefix: '', chips: ['Qashqai', 'Juke', 'Micra', 'X-Trail', 'Note', 'Leaf', 'Navara', 'Almera', 'Primera', 'Pulsar', 'Qashqai+2', 'Murano', 'Ariya', '350Z', '370Z', 'GT-R', 'Pathfinder', 'NV200', 'Cube', 'Terrano', 'Patrol', 'Primastar', 'Interstar', 'NV400', 'Townstar', 'e-NV200', 'Elgrand', 'Micra C+C', '200SX', 'Skyline', 'Serena', 'Figaro', 'Sunny'] }],
};

export const CAR_NOBLE: Brand = {
  id: 'noble',
  name: 'Noble',
  root: 'car noble',
  groups: [{ title: 'Models', prefix: '', chips: ['M12', 'M400', 'M600', 'M15'] }],
};

export const CAR_OMODA: Brand = {
  id: 'omoda',
  name: 'Omoda',
  root: 'car omoda',
  groups: [{ title: 'Models', prefix: '', chips: ['5', 'E5', '7', '9'] }],
};

export const CAR_PERODUA: Brand = {
  id: 'perodua',
  name: 'Perodua',
  root: 'car perodua',
  groups: [{ title: 'Models', prefix: '', chips: ['Myvi', 'Kelisa', 'Kenari', 'Nippa', 'Kembara', 'Rusa'] }],
};

export const CAR_PEUGEOT: Brand = {
  id: 'peugeot',
  name: 'Peugeot',
  root: 'car peugeot',
  groups: [{ title: 'Models', prefix: '', chips: ['208', '308', '3008', '2008', '207', '206', '107', '108', '307', '5008', '508', '407', '406', '306', '106', 'RCZ', 'Partner Tepee', 'Rifter', '408', '1007', '807', '607', 'Traveller', '4007', 'Expert', 'Boxer', 'Partner', 'Bipper', 'Bipper Tepee', 'iOn', '205', '309', '405', '4008'] }],
};

export const CAR_POLESTAR: Brand = {
  id: 'polestar',
  name: 'Polestar',
  root: 'car polestar',
  groups: [{ title: 'Models', prefix: '', chips: ['2', '3', '4', '1'] }],
};

export const CAR_PORSCHE: Brand = {
  id: 'porsche',
  name: 'Porsche',
  root: 'car porsche',
  groups: [{ title: 'Models', prefix: '', chips: ['911', 'Cayenne', 'Macan', 'Boxster', 'Cayman', 'Panamera', '718 Cayman', '718 Boxster', 'Taycan', '944', '924', '928', '968', 'Carrera GT', '356'] }],
};

export const CAR_PROTON: Brand = {
  id: 'proton',
  name: 'Proton',
  root: 'car proton',
  groups: [{ title: 'Models', prefix: '', chips: ['Satria', 'Wira', 'Gen-2', 'Savvy', 'Impian', 'Persona', 'Satria Neo', 'Jumbuck', 'Saga', 'Coupe', 'Arena'] }],
};

export const CAR_RENAULT: Brand = {
  id: 'renault',
  name: 'Renault',
  root: 'car renault',
  groups: [{ title: 'Models', prefix: '', chips: ['Clio', 'Megane', 'Captur', 'Scenic', 'Kadjar', 'Zoe', 'Grand Scenic', 'Twingo', 'Kangoo', 'Laguna', 'Modus', 'Trafic', 'Espace', 'Arkana', 'Koleos', 'Master', '5', 'Wind', 'Fluence', 'Symbioz', 'Rafale', '4', 'Twizy', 'Grand Modus', 'Express', '19', '21'] }],
};

export const CAR_ROLLSROYCE: Brand = {
  id: 'rollsroyce',
  name: 'Rolls-Royce',
  root: 'car rolls-royce',
  groups: [{ title: 'Models', prefix: '', chips: ['Ghost', 'Phantom', 'Wraith', 'Cullinan', 'Dawn', 'Spectre', 'Silver Seraph', 'Silver Shadow', 'Silver Spirit', 'Silver Spur', 'Corniche'] }],
};

export const CAR_ROVER: Brand = {
  id: 'rover',
  name: 'Rover',
  root: 'car rover',
  groups: [{ title: 'Models', prefix: '', chips: ['75', '25', '45', '200', '400', 'Streetwise', 'CityRover', '600', '800', '100', 'Metro', 'Montego', 'Maestro', 'SD1'] }],
};

export const CAR_SAAB: Brand = {
  id: 'saab',
  name: 'Saab',
  root: 'car saab',
  groups: [{ title: 'Models', prefix: '', chips: ['9-3', '9-5', '900', '9-3X', '9000', '99', '96'] }],
};

export const CAR_SEAT: Brand = {
  id: 'seat',
  name: 'SEAT',
  root: 'car seat',
  groups: [{ title: 'Models', prefix: '', chips: ['Ibiza', 'Leon', 'Arona', 'Ateca', 'Alhambra', 'Mii', 'Altea', 'Toledo', 'Tarraco', 'Cordoba', 'Altea XL', 'Exeo', 'Arosa'] }],
};

export const CAR_SKODA: Brand = {
  id: 'skoda',
  name: 'Skoda',
  root: 'car skoda',
  groups: [{ title: 'Models', prefix: '', chips: ['Octavia', 'Fabia', 'Superb', 'Yeti', 'Kodiaq', 'Karoq', 'Citigo', 'Rapid', 'Roomster', 'Kamiq', 'Scala', 'Enyaq', 'Elroq', 'Felicia', 'Favorit', 'Enyaq Coupe'] }],
};

export const CAR_SKYWELL: Brand = {
  id: 'skywell',
  name: 'Skywell',
  root: 'car skywell',
  groups: [{ title: 'Models', prefix: '', chips: ['BE11'] }],
};

export const CAR_SMART: Brand = {
  id: 'smart',
  name: 'Smart',
  root: 'car smart',
  groups: [{ title: 'Models', prefix: '', chips: ['Fortwo', 'Forfour', 'Roadster', '#1', '#3', '#5'] }],
};

export const CAR_SSANGYONG: Brand = {
  id: 'ssangyong',
  name: 'SsangYong',
  root: 'car ssangyong',
  groups: [{ title: 'Models', prefix: '', chips: ['Korando', 'Tivoli', 'Rexton', 'Musso', 'Rodius', 'Kyron', 'Turismo', 'Actyon', 'XLV', 'Actyon Sports'] }],
};

export const CAR_SUBARU: Brand = {
  id: 'subaru',
  name: 'Subaru',
  root: 'car subaru',
  groups: [{ title: 'Models', prefix: '', chips: ['Impreza', 'Forester', 'Outback', 'XV', 'Legacy', 'BRZ', 'WRX STI', 'Levorg', 'Justy', 'Crosstrek', 'Solterra', 'Tribeca'] }],
};

export const CAR_SUZUKI: Brand = {
  id: 'suzuki',
  name: 'Suzuki',
  root: 'car suzuki',
  groups: [{ title: 'Models', prefix: '', chips: ['Swift', 'Vitara', 'Jimny', 'Grand Vitara', 'SX4', 'Ignis', 'S-Cross', 'Alto', 'Splash', 'Celerio', 'Baleno', 'Wagon R', 'SX4 S-Cross', 'Liana', 'Across', 'Swace', 'Kizashi', 'e Vitara', 'Samurai', 'Cappuccino', 'X-90', 'Carry'] }],
};

export const CAR_TESLA: Brand = {
  id: 'tesla',
  name: 'Tesla',
  root: 'car tesla',
  groups: [{ title: 'Models', prefix: '', chips: ['Model 3', 'Model Y', 'Model S', 'Model X', 'Roadster'] }],
};

export const CAR_TOYOTA: Brand = {
  id: 'toyota',
  name: 'Toyota',
  root: 'car toyota',
  groups: [{ title: 'Models', prefix: '', chips: ['Yaris', 'Corolla', 'Aygo', 'RAV4', 'Auris', 'Avensis', 'C-HR', 'Prius', 'Hilux', 'Yaris Cross', 'Land Cruiser', 'Verso', 'Aygo X', 'Corolla Verso', 'Celica', 'MR2', 'GT86', 'GR86', 'Supra', 'GR Yaris', 'iQ', 'Urban Cruiser', 'Prius+', 'bZ4X', 'Highlander', 'Previa', 'Camry', 'Proace Verso', 'Proace', 'Proace City', 'Proace City Verso', 'Yaris Verso', 'Avensis Verso', 'Verso-S', 'Starlet', 'Picnic', 'Carina E', 'Paseo'] }],
};

export const CAR_TRIUMPH: Brand = {
  id: 'triumph',
  name: 'Triumph',
  root: 'car triumph',
  groups: [{ title: 'Models', prefix: '', chips: ['Spitfire', 'TR6', 'TR7', 'TR4', 'TR3', 'Stag', 'GT6', 'Herald', 'Dolomite', 'Vitesse', 'Acclaim', '2000'] }],
};

export const CAR_TVR: Brand = {
  id: 'tvr',
  name: 'TVR',
  root: 'car tvr',
  groups: [{ title: 'Models', prefix: '', chips: ['Chimaera', 'Griffith', 'Tuscan', 'Cerbera', 'Tamora', 'T350', 'Sagaris', 'S Series', '350i', 'Typhon', 'Grantura'] }],
};

export const CAR_VAUXHALL: Brand = {
  id: 'vauxhall',
  name: 'Vauxhall',
  root: 'car vauxhall',
  groups: [{ title: 'Models', prefix: '', chips: ['Corsa', 'Astra', 'Insignia', 'Zafira', 'Mokka', 'Meriva', 'Vectra', 'Antara', 'Adam', 'Agila', 'Viva', 'Zafira Tourer', 'Astra GTC', 'Crossland', 'Grandland', 'Mokka X', 'Combo Life', 'Tigra', 'Cascada', 'Signum', 'Vivaro Life', 'Ampera', 'Frontera', 'Vivaro', 'Movano', 'Combo', 'Grandland X', 'Crossland X', 'Zafira Life', 'Omega', 'Calibra', 'Nova', 'Monaro', 'VXR8', 'Sintra', 'Manta'] }],
};

export const CAR_VOLKSWAGEN: Brand = {
  id: 'volkswagen',
  name: 'Volkswagen',
  root: 'car volkswagen',
  groups: [{ title: 'Models', prefix: '', chips: ['Golf', 'Polo', 'Passat', 'Tiguan', 'Up', 'T-Roc', 'Touran', 'Scirocco', 'Beetle', 'Touareg', 'Sharan', 'T-Cross', 'Golf SV', 'Golf Plus', 'Caddy Life', 'Caravelle', 'Transporter', 'Arteon', 'Jetta', 'Eos', 'Fox', 'Lupo', 'Bora', 'CC', 'Amarok', 'Taigo', 'Tiguan Allspace', 'ID.3', 'ID.4', 'ID.5', 'ID.7', 'ID Buzz', 'Phaeton', 'Caddy', 'Crafter', 'California', 'Multivan', 'Corrado', 'Vento', 'e-Golf', 'e-Up', 'Passat Alltrack', 'T-Roc Cabriolet', 'Golf Cabriolet'] }],
};

export const CAR_VOLVO: Brand = {
  id: 'volvo',
  name: 'Volvo',
  root: 'car volvo',
  groups: [{ title: 'Models', prefix: '', chips: ['XC60', 'XC90', 'XC40', 'V40', 'S60', 'V60', 'V50', 'S40', 'V70', 'C30', 'S80', 'C70', 'XC70', 'V90', 'S90', 'EX30', 'EX90', 'C40', 'EX40', 'EC40', 'V60 Cross Country', 'V90 Cross Country', 'ES90', '850', '240', 'S70', '440', '480'] }],
};

export const CAR_XPENG: Brand = {
  id: 'xpeng',
  name: 'XPENG',
  root: 'car xpeng',
  groups: [{ title: 'Models', prefix: '', chips: ['G6', 'G9', 'P7'] }],
};

export const CAR_MAKES = [
  { name: 'Abarth', brand: CAR_ABARTH, subline: '595, 500, 695, 124 Spider' },
  { name: 'Alfa Romeo', brand: CAR_ALFAROMEO, subline: 'Giulietta, MiTo, Giulia, Stelvio' },
  { name: 'Alpina', brand: CAR_ALPINA, subline: 'B3, D3, B5, XD3' },
  { name: 'Alpine', brand: CAR_ALPINE, subline: 'A110, A290' },
  { name: 'Ariel', brand: CAR_ARIEL, subline: 'British track cars — Atom, Nomad' },
  { name: 'Aston Martin', brand: CAR_ASTONMARTIN, subline: 'DB9, Vantage, DB11, DBX' },
  { name: 'Audi', brand: CAR_AUDI, subline: 'A3, A4, Q3, Q5, TT' },
  { name: 'Bentley', brand: CAR_BENTLEY, subline: 'Continental GT, Bentayga, Flying Spur' },
  { name: 'BMW', brand: CAR_BMW, subline: '3 Series, 1 Series, 5 Series, X5' },
  { name: 'BYD', brand: CAR_BYD, subline: 'Atto 3, Dolphin, Seal, Sealion 7' },
  { name: 'Cadillac', brand: CAR_CADILLAC, subline: 'Escalade, CTS, BLS, SRX' },
  { name: 'Caterham', brand: CAR_CATERHAM, subline: 'Seven, Super Seven, CSR' },
  { name: 'Chevrolet', brand: CAR_CHEVROLET, subline: 'Spark, Aveo, Cruze, Captiva' },
  { name: 'Chrysler', brand: CAR_CHRYSLER, subline: 'Grand Voyager, 300C, PT Cruiser' },
  { name: 'Citroen', brand: CAR_CITROEN, subline: 'C1, C3, C4, Berlingo, C4 Picasso' },
  { name: 'Cupra', brand: CAR_CUPRA, subline: 'Formentor, Leon, Born, Ateca' },
  { name: 'Dacia', brand: CAR_DACIA, subline: 'Duster, Sandero, Jogger, Spring' },
  { name: 'Daewoo', brand: CAR_DAEWOO, subline: 'Matiz, Kalos, Lacetti, Nubira' },
  { name: 'Daihatsu', brand: CAR_DAIHATSU, subline: 'Sirion, Terios, Copen, Charade' },
  { name: 'Daimler', brand: CAR_DAIMLER, subline: 'Jaguar\'s luxury badge — Sovereign, Super V8' },
  { name: 'Dodge', brand: CAR_DODGE, subline: 'Caliber, Journey, Nitro, Avenger' },
  { name: 'DS Automobiles', brand: CAR_DSAUTOMOBILES, subline: 'DS 3, DS 4, DS 7 Crossback' },
  { name: 'Ferrari', brand: CAR_FERRARI, subline: '458, 488, F430, California' },
  { name: 'Fiat', brand: CAR_FIAT, subline: '500, Panda, Punto, 500X, Tipo' },
  { name: 'Fisker', brand: CAR_FISKER, subline: 'EV startup — Ocean, Karma' },
  { name: 'Ford', brand: CAR_FORD, subline: 'Fiesta, Focus, Puma, Kuga, Mondeo' },
  { name: 'Genesis', brand: CAR_GENESIS, subline: 'GV70, G70, GV80, GV60' },
  { name: 'GWM', brand: CAR_GWM, subline: 'ORA 03, Haval Jolion, Steed' },
  { name: 'Honda', brand: CAR_HONDA, subline: 'Civic, Jazz, CR-V, HR-V, Accord' },
  { name: 'Hummer', brand: CAR_HUMMER, subline: 'American off-roaders — H1, H2, H3' },
  { name: 'Hyundai', brand: CAR_HYUNDAI, subline: 'i10, i20, i30, Tucson, Santa Fe' },
  { name: 'Ineos', brand: CAR_INEOS, subline: 'Grenadier, Quartermaster' },
  { name: 'Infiniti', brand: CAR_INFINITI, subline: 'Q30, Q50, QX30, FX' },
  { name: 'Isuzu', brand: CAR_ISUZU, subline: 'D-Max, Rodeo, Trooper' },
  { name: 'Iveco', brand: CAR_IVECO, subline: 'Italian commercial vehicles — the Daily van' },
  { name: 'Jaecoo', brand: CAR_JAECOO, subline: 'Jaecoo 7, Jaecoo 5' },
  { name: 'Jaguar', brand: CAR_JAGUAR, subline: 'XF, XE, F-Pace, F-Type' },
  { name: 'Jeep', brand: CAR_JEEP, subline: 'Renegade, Compass, Grand Cherokee' },
  { name: 'KGM', brand: CAR_KGM, subline: 'Musso, Rexton, Korando, Torres' },
  { name: 'Kia', brand: CAR_KIA, subline: 'Sportage, Ceed, Picanto, Rio' },
  { name: 'Lamborghini', brand: CAR_LAMBORGHINI, subline: 'Huracan, Urus, Gallardo, Aventador' },
  { name: 'Lancia', brand: CAR_LANCIA, subline: 'Italian marque — Delta, Ypsilon, Integrale' },
  { name: 'Land Rover', brand: CAR_LANDROVER, subline: 'Evoque, Discovery, Defender, Range Rover' },
  { name: 'LDV', brand: CAR_LDV, subline: 'British van marque — Maxus, Convoy, Pilot' },
  { name: 'Leapmotor', brand: CAR_LEAPMOTOR, subline: 'T03, C10, B10' },
  { name: 'Lexus', brand: CAR_LEXUS, subline: 'IS, RX, NX, CT' },
  { name: 'Lotus', brand: CAR_LOTUS, subline: 'Elise, Exige, Evora, Emira' },
  { name: 'Maserati', brand: CAR_MASERATI, subline: 'Ghibli, Levante, Quattroporte' },
  { name: 'Maxus', brand: CAR_MAXUS, subline: 'Chinese vans and pickups — Deliver 9, T90 EV' },
  { name: 'Mazda', brand: CAR_MAZDA, subline: 'Mazda3, Mazda6, CX-5, MX-5' },
  { name: 'McLaren', brand: CAR_MCLAREN, subline: '570S, 720S, 650S, Artura' },
  { name: 'Mercedes-Benz', brand: CAR_MERCEDESBENZ, subline: 'A-Class, C-Class, E-Class, GLC' },
  { name: 'MG', brand: CAR_MG, subline: 'ZS, HS, MG3, MG4' },
  { name: 'MINI', brand: CAR_MINI, subline: 'Hatch, Countryman, Clubman, Convertible' },
  { name: 'Mitsubishi', brand: CAR_MITSUBISHI, subline: 'Outlander, ASX, L200, Shogun' },
  { name: 'Morgan', brand: CAR_MORGAN, subline: 'Plus 4, 4/4, Roadster, 3 Wheeler' },
  { name: 'Nissan', brand: CAR_NISSAN, subline: 'Qashqai, Juke, Micra, X-Trail' },
  { name: 'Noble', brand: CAR_NOBLE, subline: 'British supercars — M12, M600' },
  { name: 'Omoda', brand: CAR_OMODA, subline: 'Omoda 5, Omoda 7, Omoda 9' },
  { name: 'Perodua', brand: CAR_PERODUA, subline: 'Malaysian budget cars — Myvi, Kelisa, Nippa' },
  { name: 'Peugeot', brand: CAR_PEUGEOT, subline: '208, 308, 3008, 2008' },
  { name: 'Polestar', brand: CAR_POLESTAR, subline: 'Polestar 2, 3 and 4' },
  { name: 'Porsche', brand: CAR_PORSCHE, subline: '911, Cayenne, Macan, Boxster' },
  { name: 'Proton', brand: CAR_PROTON, subline: 'Satria, Wira, Gen-2, Savvy' },
  { name: 'Renault', brand: CAR_RENAULT, subline: 'Clio, Megane, Captur, Scenic' },
  { name: 'Rolls-Royce', brand: CAR_ROLLSROYCE, subline: 'Ghost, Phantom, Wraith, Cullinan' },
  { name: 'Rover', brand: CAR_ROVER, subline: '75, 25, 45, Streetwise' },
  { name: 'Saab', brand: CAR_SAAB, subline: '9-3, 9-5, 900' },
  { name: 'SEAT', brand: CAR_SEAT, subline: 'Ibiza, Leon, Arona, Ateca' },
  { name: 'Skoda', brand: CAR_SKODA, subline: 'Octavia, Fabia, Superb, Kodiaq' },
  { name: 'Skywell', brand: CAR_SKYWELL, subline: 'BE11 electric SUV' },
  { name: 'Smart', brand: CAR_SMART, subline: 'Fortwo, Forfour, Roadster' },
  { name: 'SsangYong', brand: CAR_SSANGYONG, subline: 'Korando, Tivoli, Rexton, Musso' },
  { name: 'Subaru', brand: CAR_SUBARU, subline: 'Impreza, Forester, Outback, XV' },
  { name: 'Suzuki', brand: CAR_SUZUKI, subline: 'Swift, Vitara, Jimny, SX4' },
  { name: 'Tesla', brand: CAR_TESLA, subline: 'Model 3, Model Y, Model S' },
  { name: 'Toyota', brand: CAR_TOYOTA, subline: 'Yaris, Corolla, Aygo, RAV4' },
  { name: 'Triumph', brand: CAR_TRIUMPH, subline: 'British classics — Spitfire, TR6, Stag' },
  { name: 'TVR', brand: CAR_TVR, subline: 'British sports cars — Chimaera, Griffith, Sagaris' },
  { name: 'Vauxhall', brand: CAR_VAUXHALL, subline: 'Corsa, Astra, Insignia, Zafira' },
  { name: 'Volkswagen', brand: CAR_VOLKSWAGEN, subline: 'Golf, Polo, Passat, Tiguan' },
  { name: 'Volvo', brand: CAR_VOLVO, subline: 'XC60, XC90, V40, XC40' },
  { name: 'XPENG', brand: CAR_XPENG, subline: 'G6, G9, P7' },
];

// each make introduces its own model list
export const CAR_HEADERS: Record<string, { title: string; accent: string; subtitle: string }> = {
  'abarth': { title: 'Which Abarth', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'alfaromeo': { title: 'Which Alfa Romeo', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'alpina': { title: 'Which Alpina', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'alpine': { title: 'Which Alpine', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'ariel': { title: 'Which Ariel', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'astonmartin': { title: 'Which Aston Martin', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'audi': { title: 'Which Audi', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'bentley': { title: 'Which Bentley', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'bmw': { title: 'Which BMW', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'byd': { title: 'Which BYD', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'cadillac': { title: 'Which Cadillac', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'caterham': { title: 'Which Caterham', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'chevrolet': { title: 'Which Chevrolet', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'chrysler': { title: 'Which Chrysler', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'citroen': { title: 'Which Citroen', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'cupra': { title: 'Which Cupra', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'dacia': { title: 'Which Dacia', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'daewoo': { title: 'Which Daewoo', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'daihatsu': { title: 'Which Daihatsu', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'daimler': { title: 'Which Daimler', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'dodge': { title: 'Which Dodge', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'dsautomobiles': { title: 'Which DS Automobiles', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'ferrari': { title: 'Which Ferrari', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'fiat': { title: 'Which Fiat', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'fisker': { title: 'Which Fisker', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'ford': { title: 'Which Ford', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'genesis': { title: 'Which Genesis', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'gwm': { title: 'Which GWM', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'honda': { title: 'Which Honda', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'hummer': { title: 'Which Hummer', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'hyundai': { title: 'Which Hyundai', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'ineos': { title: 'Which Ineos', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'infiniti': { title: 'Which Infiniti', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'isuzu': { title: 'Which Isuzu', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'iveco': { title: 'Which Iveco', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'jaecoo': { title: 'Which Jaecoo', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'jaguar': { title: 'Which Jaguar', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'jeep': { title: 'Which Jeep', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'kgm': { title: 'Which KGM', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'kia': { title: 'Which Kia', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'lamborghini': { title: 'Which Lamborghini', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'lancia': { title: 'Which Lancia', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'landrover': { title: 'Which Land Rover', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'ldv': { title: 'Which LDV', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'leapmotor': { title: 'Which Leapmotor', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'lexus': { title: 'Which Lexus', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'lotus': { title: 'Which Lotus', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'maserati': { title: 'Which Maserati', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'maxus': { title: 'Which Maxus', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'mazda': { title: 'Which Mazda', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'mclaren': { title: 'Which McLaren', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'mercedesbenz': { title: 'Which Mercedes-Benz', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'mg': { title: 'Which MG', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'mini': { title: 'Which MINI', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'mitsubishi': { title: 'Which Mitsubishi', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'morgan': { title: 'Which Morgan', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'nissan': { title: 'Which Nissan', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'noble': { title: 'Which Noble', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'omoda': { title: 'Which Omoda', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'perodua': { title: 'Which Perodua', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'peugeot': { title: 'Which Peugeot', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'polestar': { title: 'Which Polestar', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'porsche': { title: 'Which Porsche', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'proton': { title: 'Which Proton', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'renault': { title: 'Which Renault', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'rollsroyce': { title: 'Which Rolls-Royce', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'rover': { title: 'Which Rover', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'saab': { title: 'Which Saab', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'seat': { title: 'Which SEAT', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'skoda': { title: 'Which Skoda', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'skywell': { title: 'Which Skywell', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'smart': { title: 'Which Smart', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'ssangyong': { title: 'Which SsangYong', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'subaru': { title: 'Which Subaru', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'suzuki': { title: 'Which Suzuki', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'tesla': { title: 'Which Tesla', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'toyota': { title: 'Which Toyota', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'triumph': { title: 'Which Triumph', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'tvr': { title: 'Which TVR', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'vauxhall': { title: 'Which Vauxhall', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'volkswagen': { title: 'Which Volkswagen', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'volvo': { title: 'Which Volvo', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
  'xpeng': { title: 'Which XPENG', accent: 'models?', subtitle: 'Pick every model you would flip — prices are set per model later.' },
};
