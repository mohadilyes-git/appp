// the long tail of the electronics catalogue, kept out of the main file so it stays readable.
// grouped the way sellers title things, not the way makers market them.

// type-only, so this never imports the main file back at runtime
import type { Brand } from './catalogue';

// ---- the graphics cards --------------------------------------------

export const NVIDIA: Brand = {
  id: 'nvidia',
  name: 'Nvidia',
  root: 'graphics card nvidia',
  groups: [
    { title: 'RTX 50 series', prefix: '', chips: ['RTX 5090', 'RTX 5080', 'RTX 5070 Ti', 'RTX 5070', 'RTX 5060 Ti', 'RTX 5060', 'RTX 5050'] },
    { title: 'RTX 40 series', prefix: '', chips: ['RTX 4090', 'RTX 4080 Super', 'RTX 4080', 'RTX 4070 Ti Super', 'RTX 4070 Ti', 'RTX 4070 Super', 'RTX 4070', 'RTX 4060 Ti', 'RTX 4060'] },
    { title: 'RTX 30 series', prefix: '', chips: ['RTX 3090 Ti', 'RTX 3090', 'RTX 3080 Ti', 'RTX 3080', 'RTX 3070 Ti', 'RTX 3070', 'RTX 3060 Ti', 'RTX 3060', 'RTX 3050'] },
    { title: 'RTX 20 series', prefix: '', chips: ['RTX 2080 Ti', 'RTX 2080 Super', 'RTX 2080', 'RTX 2070 Super', 'RTX 2070', 'RTX 2060 Super', 'RTX 2060'] },
    { title: 'GTX 16 series', prefix: '', chips: ['GTX 1660 Ti', 'GTX 1660 Super', 'GTX 1660', 'GTX 1650 Super', 'GTX 1650'] },
    { title: 'GTX 10 series', prefix: '', chips: ['GTX 1080 Ti', 'GTX 1080', 'GTX 1070 Ti', 'GTX 1070', 'GTX 1060', 'GTX 1050 Ti', 'GTX 1050'] },
    { title: 'GTX 900 series', prefix: '', chips: ['GTX 980 Ti', 'GTX 980', 'GTX 970', 'GTX 960', 'GTX 950'] },
    { title: 'GTX 700 series', prefix: '', chips: ['GTX 780 Ti', 'GTX 780', 'GTX 770', 'GTX 760', 'GTX 750 Ti', 'GTX 750'] },
    { title: 'GT series', prefix: '', chips: ['GT 1030', 'GT 730', 'GT 710'] },
    { title: 'Titan', prefix: '', chips: ['Titan RTX', 'Titan Xp', 'Titan X'] },
    { title: 'Quadro', prefix: '', chips: ['Quadro K2200', 'Quadro P400', 'Quadro P620', 'Quadro P1000', 'Quadro P2000', 'Quadro P4000', 'Quadro RTX 4000'] },
    { title: 'RTX A series', prefix: '', chips: ['RTX A2000', 'RTX A4000', 'RTX A5000'] },
  ],
  lines: [
    { id: 'rtx', label: 'GeForce RTX', groupTitles: ['RTX 50 series', 'RTX 40 series', 'RTX 30 series', 'RTX 20 series'] },
    { id: 'gtx', label: 'GeForce GTX', groupTitles: ['GTX 16 series', 'GTX 10 series', 'GTX 900 series', 'GTX 700 series'] },
    { id: 'gt', label: 'GeForce GT', groupTitles: ['GT series'] },
    { id: 'titan', label: 'Titan', groupTitles: ['Titan'] },
    { id: 'quadro', label: 'Quadro', groupTitles: ['Quadro'] },
    { id: 'rtxa', label: 'RTX A', groupTitles: ['RTX A series'] },
  ],
};

export const RADEON: Brand = {
  id: 'radeon',
  name: 'Radeon',
  root: 'graphics card radeon',
  groups: [
    { title: 'RX 9000 series', prefix: '', chips: ['RX 9070 XT', 'RX 9070', 'RX 9060 XT', 'RX 9060', 'RX 9070 GRE'] },
    { title: 'RX 7000 series', prefix: '', chips: ['RX 7900 XTX', 'RX 7900 XT', 'RX 7900 GRE', 'RX 7800 XT', 'RX 7700 XT', 'RX 7600 XT', 'RX 7600'] },
    { title: 'RX 6000 series', prefix: '', chips: ['RX 6950 XT', 'RX 6900 XT', 'RX 6800 XT', 'RX 6800', 'RX 6750 XT', 'RX 6700 XT', 'RX 6650 XT', 'RX 6600 XT', 'RX 6600', 'RX 6500 XT', 'RX 6700', 'RX 6400'] },
    { title: 'RX 5000 series', prefix: '', chips: ['RX 5700 XT', 'RX 5700', 'RX 5600 XT', 'RX 5500 XT'] },
    { title: 'RX 500 series', prefix: '', chips: ['RX 590', 'RX 580', 'RX 570', 'RX 560', 'RX 550'] },
    { title: 'Vega and Radeon VII', prefix: '', chips: ['RX Vega 56', 'RX Vega 64', 'VII'] },
    { title: 'RX 400 series', prefix: '', chips: ['RX 480', 'RX 470', 'RX 460'] },
    { title: 'R9 and R7 series', prefix: '', chips: ['R9 390X', 'R9 390', 'R9 380X', 'R9 380', 'R9 290X', 'R9 290', 'R9 280X', 'R7 370', 'R7 260X'] },
  ],
  lines: [
    { id: 'rx', label: 'Radeon RX', groupTitles: ['RX 9000 series', 'RX 7000 series', 'RX 6000 series', 'RX 5000 series', 'RX 500 series', 'RX 400 series'] },
    { id: 'legacy', label: 'Vega and R9', groupTitles: ['Vega and Radeon VII', 'R9 and R7 series'] },
  ],
};

export const INTEL_ARC: Brand = {
  id: 'intelarc',
  name: 'Intel',
  root: 'graphics card intel',
  groups: [
    { title: 'Arc B · Battlemage', prefix: '', chips: ['Arc B580', 'Arc B570'] },
    { title: 'Arc A · Alchemist', prefix: '', chips: ['Arc A770', 'Arc A750', 'Arc A580', 'Arc A380', 'Arc A310'] },
  ],
};

// ---- the tellies ---------------------------------------------------

export const SAMSUNG_TV: Brand = {
  id: 'samsungtv',
  name: 'Samsung',
  root: 'tv samsung',
  groups: [
    { title: 'QLED Q60 and Q6', prefix: '', chips: ['Q60R', 'Q60T', 'Q60A', 'Q60B', 'Q60C', 'Q60D', 'Q6F', 'Q6FN'] },
    { title: 'QLED Q70 and Q7', prefix: '', chips: ['Q70R', 'Q70T', 'Q70A', 'Q70B', 'Q70C', 'Q70D', 'Q7F', 'Q7FN'] },
    { title: 'QLED Q80 and Q90', prefix: '', chips: ['Q80T', 'Q80A', 'Q80B', 'Q80C', 'Q80D', 'Q8F', 'Q90R', 'Q95T', 'Q80R', 'Q90T', 'Q9FN'] },
    { title: 'Neo QLED QN85 and QN80', prefix: '', chips: ['QN85A', 'QN85B', 'QN85C', 'QN85D', 'QN85F', 'QN80F', 'QN70H', 'QN80H'] },
    { title: 'Neo QLED QN90 and QN95', prefix: '', chips: ['QN90A', 'QN95A', 'QN90B', 'QN95B', 'QN90C', 'QN95C', 'QN90D', 'QN95D', 'QN90F'] },
    { title: 'Neo QLED 8K', prefix: '', chips: ['QN700B', 'QN800A', 'QN900A', 'QN800B', 'QN900B', 'QN800C', 'QN900C', 'QN800D', 'QN900D', 'QN990F', 'QN800F', 'QN900F'] },
    { title: 'OLED S series', prefix: '', chips: ['S95B', 'S90C', 'S95C', 'S85D', 'S90D', 'S95D', 'S85F', 'S90F', 'S95F', 'S85H', 'S90H', 'S95H'] },
    { title: 'Crystal UHD', prefix: '', chips: ['AU7100', 'AU8000', 'BU8000', 'BU8500', 'CU7100', 'CU8000', 'CU8500', 'DU7100', 'DU8000', 'U8000F'] },
    { title: 'Older UHD (2016-2020)', prefix: '', chips: ['KU6400', 'MU6400', 'NU7100', 'NU8000', 'RU7100', 'RU8000', 'TU7100', 'TU8000', 'TU8500', 'KS7000', 'KS8000'] },
    { title: 'The Frame by year', prefix: '', chips: ['Frame LS03A', 'Frame LS03B', 'Frame LS03D', 'Frame LS03F', 'Frame LS03R', 'Frame LS03T', 'Frame LS03C'] },
    { title: 'Lifestyle sets', prefix: '', chips: ['Serif', 'Sero', 'Terrace', 'Frame Pro'] },
    { title: 'RGB LED', prefix: '', chips: ['R85H'] },
  ],
};

export const LG_TV: Brand = {
  id: 'lgtv',
  name: 'LG',
  root: 'tv lg',
  groups: [
    { title: 'OLED C series', prefix: '', chips: ['C7', 'C8', 'C9', 'CX', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6'] },
    { title: 'OLED B series', prefix: '', chips: ['B7', 'B8', 'B9', 'BX', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6'] },
    { title: 'OLED G series', prefix: '', chips: ['GX', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6'] },
    { title: 'OLED A, E and M', prefix: '', chips: ['A1', 'A2', 'E8', 'E9', 'M3', 'M4', 'M5', 'E6', 'E7'] },
    { title: 'QNED', prefix: '', chips: ['QNED80', 'QNED81', 'QNED85', 'QNED86', 'QNED87', 'QNED91'] },
    { title: 'NanoCell', prefix: '', chips: ['NanoCell', 'NANO75', 'NANO76', 'NANO79', 'NANO80', 'NANO81', 'NANO85', 'NANO86', 'NANO90', 'NANO91'] },
    { title: 'UHD 2021-2025', prefix: '', chips: ['UP75', 'UP80', 'UQ75', 'UQ80', 'UR78', 'UR80', 'UT80', 'UT91', 'UP78', 'UQ81'] },
    { title: 'UHD 2016-2020', prefix: '', chips: ['UJ63', 'UK62', 'UK63', 'UK65', 'UM74', 'UM76', 'UN73', 'UN81', 'UJ65', 'UM71', 'UM75', 'UN71'] },
  ],
};

export const SONY_TV: Brand = {
  id: 'sonytv',
  name: 'Sony',
  root: 'tv sony',
  groups: [
    { title: 'OLED A series', prefix: '', chips: ['A1', 'AF8', 'AG8', 'AG9', 'A8', 'A80J', 'A90J', 'A80K', 'A83K', 'A90K', 'A95K', 'AF9'] },
    { title: 'OLED 2023 on', prefix: '', chips: ['A80L', 'A95L', 'Bravia 8', 'Bravia 8 II'] },
    { title: 'Bravia numbers', prefix: '', chips: ['Bravia 2', 'Bravia 3', 'Bravia 5', 'Bravia 7', 'Bravia 9', 'Bravia 2 II', 'Bravia 3 II', 'Bravia 7 II', 'Bravia 9 II'] },
    { title: 'X90 and X95', prefix: '', chips: ['XE90', 'XF90', 'XG90', 'XH90', 'X90J', 'X95J', 'X90K', 'X95K', 'X90L', 'X95L'] },
    { title: 'X80 and X85', prefix: '', chips: ['XG80', 'XH80', 'X80J', 'X85J', 'X80K', 'X85K', 'X75WL', 'X85L', 'X80L'] },
    { title: 'Older Bravia', prefix: '', chips: ['WD75', 'XE70', 'XF70', 'XE83', 'XF83', 'XG70'] },
  ],
};

export const TCL_TV: Brand = {
  id: 'tcltv',
  name: 'TCL',
  root: 'tv tcl',
  groups: [
    { title: 'C series 2021-2023', prefix: '', chips: ['C715', 'C725', 'C728', 'C735', 'C745', 'C805', 'C825', 'C835', 'C845'] },
    { title: 'C series 2024-2026', prefix: '', chips: ['C655', 'C755', 'C855', 'C6K', 'C6KS', 'C7K', 'C8K', 'C7L', 'C8L'] },
    { title: 'P series', prefix: '', chips: ['P615', 'P635', 'P639', 'P715', 'P735', 'P745', 'P755', 'P8L'] },
    { title: 'Budget and 8K', prefix: '', chips: ['S5200', 'S5400', 'X925'] },
  ],
};

export const HISENSE_TV: Brand = {
  id: 'hisensetv',
  name: 'Hisense',
  root: 'tv hisense',
  groups: [
    { title: 'U7 and U8 mini LED', prefix: '', chips: ['U7QF', 'U8QF', 'U7G', 'U8G', 'U7H', 'U8H', 'U7K', 'U8K', 'U7N', 'U8N', 'U7Q', 'U8Q', 'U8Q Pro'] },
    { title: 'U6 and RGB mini LED', prefix: '', chips: ['U6K', 'U6N', 'U6Q', 'U7Q Pro', 'UR8', 'UR9'] },
    { title: 'E7 and A7', prefix: '', chips: ['E7K', 'E7N', 'E7Q', 'A7G', 'A7H', 'A7K', 'A7N', 'E7Q Pro'] },
    { title: 'A6 and entry', prefix: '', chips: ['A6BG', 'A6G', 'A6H', 'A6K', 'A6N', 'A6Q', 'A4K', 'A4BG'] },
    { title: 'Older (2019-2020)', prefix: '', chips: ['A7100F', 'A7500F', 'AE7000F', 'U7B', 'U8B', 'B7100', 'B7500'] },
    { title: 'OLED (A85)', prefix: '', chips: ['A85H', 'A85N', 'A85Q'] },
  ],
};

export const PANASONIC_TV: Brand = {
  id: 'panasonictv',
  name: 'Panasonic',
  root: 'tv panasonic',
  groups: [
    { title: 'OLED GZ to JZ', prefix: '', chips: ['GZ950', 'GZ1000', 'GZ2000', 'HZ980', 'HZ1000', 'HZ1500', 'HZ2000', 'JZ980', 'JZ1000', 'JZ1500', 'JZ2000'] },
    { title: 'OLED LZ and MZ', prefix: '', chips: ['LZ980', 'LZ1000', 'LZ1500', 'LZ2000', 'MZ980', 'MZ1500', 'MZ2000'] },
    { title: 'OLED Z series', prefix: '', chips: ['Z80A', 'Z85A', 'Z90A', 'Z93A', 'Z95A', 'Z90B', 'Z95B', 'Z86C'] },
    { title: 'LED and mini LED', prefix: '', chips: ['GX800', 'HX800', 'JX800', 'JX850', 'JX940', 'LX800', 'LX940', 'MX950', 'W80A', 'W90A', 'W95A', 'W95B', 'GX700', 'HX580', 'LX700', 'W95C'] },
    { title: 'Older Viera LED', prefix: '', chips: ['CX680', 'DX600', 'ES500', 'EX700', 'FX750', 'DX750'] },
    { title: 'Viera plasma', prefix: '', chips: ['S60', 'ST60', 'GT60', 'VT65', 'ZT65', 'ST50', 'VT50'] },
    { title: 'OLED EZ and FZ', prefix: '', chips: ['EZ952', 'EZ1000', 'FZ800', 'FZ950'] },
  ],
};

export const PHILIPS_TV: Brand = {
  id: 'philipstv',
  name: 'Philips',
  root: 'tv philips',
  groups: [
    { title: 'OLED 700 and 800', prefix: '', chips: ['OLED754', 'OLED784', 'OLED805', 'OLED806', 'OLED807', 'OLED808', 'OLED809', 'OLED810', 'OLED818', 'OLED819', 'OLED803', 'OLED804', 'OLED706', 'OLED707', 'OLED718', 'OLED759', 'OLED769'] },
    { title: 'OLED+ flagship', prefix: '', chips: ['OLED873', 'OLED903', 'OLED907', 'OLED908', 'OLED909', 'OLED910', 'OLED935', 'OLED936', 'OLED937', 'OLED934'] },
    { title: 'The One and The Xtra', prefix: '', chips: ['The One', 'The Xtra', 'PML9507', 'PML9008', 'PML9009'] },
    { title: 'LED (PUS codes)', prefix: '', chips: ['PUS73', 'PUS75', 'PUS78', 'PUS81', 'PUS83', 'PUS85', 'PUS88', 'PUS89', 'PUS76'] },
  ],
};

export const TOSHIBA_TV: Brand = {
  id: 'toshibatv',
  name: 'Toshiba',
  root: 'tv toshiba',
  groups: [
    { title: '4K UHD (UK and UL)', prefix: '', chips: ['UK3163', 'UK4063', 'UK4D63', 'UL2063', 'UL2163', 'UL5A63', 'UA2063', 'UA3D63'] },
    { title: 'QLED and Fire TV', prefix: '', chips: ['QA4C63', 'QA5D63', 'QA7D63', 'UF3D53', 'QF5D53'] },
    { title: 'Older Toshiba', prefix: '', chips: ['U2963', 'U5766', 'U6763'] },
  ],
};

export const SHARP_TV: Brand = {
  id: 'sharptv',
  name: 'Sharp',
  root: 'tv sharp',
  groups: [
    { title: 'Aquos 4K', prefix: '', chips: ['Aquos 4K', 'Aquos QLED', 'Aquos XLED'] },
    { title: 'Roku, Android and HD', prefix: '', chips: ['Aquos Roku TV', 'Aquos Android TV', 'Aquos Full HD'] },
  ],
};

export const FIRE_TV: Brand = {
  id: 'firetv',
  name: 'Fire TV',
  root: 'fire tv',
  groups: [
    { title: 'Amazon sets', prefix: '', chips: ['Omni', 'Omni QLED', 'Omni Mini LED', '4 Series', '2 Series'] },
  ],
};

export const SKY_GLASS: Brand = {
  id: 'skyglass',
  name: 'Sky Glass',
  root: 'sky glass',
  groups: [
    { title: 'Sky Glass', prefix: '', chips: ['Gen 1', 'Gen 2', 'Air'] },
  ],
};

// ---- the drones ----------------------------------------------------

export const DJI: Brand = {
  id: 'dji',
  name: 'DJI',
  root: 'drone dji',
  groups: [
    { title: 'Mini 2019-2022', prefix: '', chips: ['Mavic Mini', 'Mini 2', 'Mini SE', 'Mini 2 SE'] },
    { title: 'Mini 2023-2026', prefix: '', chips: ['Mini 3', 'Mini 3 Pro', 'Mini 4K', 'Mini 4 Pro', 'Mini 5 Pro'] },
    { title: 'Mavic Pro & Mavic 2', prefix: '', chips: ['Mavic Pro', 'Mavic Pro Platinum', 'Mavic 2 Pro', 'Mavic 2 Zoom', 'Mavic 2 Enterprise'] },
    { title: 'Mavic 3 & 4', prefix: '', chips: ['Mavic 3', 'Mavic 3 Classic', 'Mavic 3 Cine', 'Mavic 3 Pro', 'Mavic 3 Enterprise', 'Mavic 4 Pro', 'Mavic 3T'] },
    { title: 'Air series', prefix: '', chips: ['Mavic Air', 'Mavic Air 2', 'Air 2S', 'Air 3', 'Air 3S'] },
    { title: 'Avata & FPV', prefix: '', chips: ['FPV', 'Avata', 'Avata 2', 'Avata 360'] },
    { title: 'Neo & Flip', prefix: '', chips: ['Neo', 'Neo 2', 'Flip'] },
    { title: 'Phantom series', prefix: '', chips: ['Phantom 3 Standard', 'Phantom 3 Pro', 'Phantom 4', 'Phantom 4 Advanced', 'Phantom 4 Pro', 'Phantom 4 Pro V2', 'Phantom 4 RTK', 'Phantom 3 Advanced', 'Phantom 3 4K', 'Phantom 3 SE', 'Phantom 2 Vision+'] },
    { title: 'Inspire series', prefix: '', chips: ['Inspire 1', 'Inspire 1 Pro', 'Inspire 2', 'Inspire 3'] },
    { title: 'Spark', prefix: '', chips: ['Spark'] },
    { title: 'Matrice enterprise', prefix: '', chips: ['Matrice 100', 'Matrice 200', 'Matrice 300 RTK', 'Matrice 350 RTK', 'Matrice 30T'] },
  ],
  lines: [
    { id: 'mini', label: 'Mini', groupTitles: ['Mini 2019-2022', 'Mini 2023-2026'] },
    { id: 'mavic', label: 'Mavic', groupTitles: ['Mavic Pro & Mavic 2', 'Mavic 3 & 4'] },
    { id: 'air', label: 'Air', groupTitles: ['Air series'] },
    { id: 'fpv', label: 'Avata, FPV & Neo', groupTitles: ['Avata & FPV', 'Neo & Flip'] },
    { id: 'phantom', label: 'Phantom', groupTitles: ['Phantom series'] },
    { id: 'inspire', label: 'Inspire', groupTitles: ['Inspire series'] },
    { id: 'other', label: 'Other DJI', groupTitles: ['Spark', 'Matrice enterprise'] },
  ],
};

export const AUTEL: Brand = {
  id: 'autel',
  name: 'Autel',
  root: 'drone autel',
  groups: [
    { title: 'EVO Nano & Lite', prefix: '', chips: ['EVO Nano', 'EVO Nano+', 'EVO Lite', 'EVO Lite+'] },
    { title: 'EVO II series', prefix: '', chips: ['EVO II', 'EVO II Pro', 'EVO II Pro V3', 'EVO II Dual 640T', 'EVO II RTK', 'EVO II Pro V2', 'EVO II Dual 320'] },
    { title: 'EVO Max & older', prefix: '', chips: ['EVO', 'EVO Max 4T', 'EVO Max 4N', 'X-Star Premium', 'X-Star'] },
  ],
};

export const PARROT: Brand = {
  id: 'parrot',
  name: 'Parrot',
  root: 'drone parrot',
  groups: [
    { title: 'Anafi series', prefix: '', chips: ['Anafi', 'Anafi FPV', 'Anafi Thermal', 'Anafi USA', 'Anafi Ai'] },
    { title: 'Bebop & older', prefix: '', chips: ['Bebop', 'Bebop 2', 'Bebop 2 Power', 'AR.Drone 2.0', 'Disco', 'AR.Drone'] },
    { title: 'Mini & toy', prefix: '', chips: ['Mambo', 'Swing', 'Rolling Spider', 'Mambo FPV'] },
  ],
};

export const HOVERAIR: Brand = {
  id: 'hoverair',
  name: 'HoverAir',
  root: 'drone hoverair',
  groups: [
    { title: 'X1 family', prefix: '', chips: ['X1', 'X1 Smart', 'X1 Pro', 'X1 Pro Max'] },
    { title: 'Aqua', prefix: '', chips: ['Aqua'] },
  ],
};

export const SKYDIO: Brand = {
  id: 'skydio',
  name: 'Skydio',
  root: 'drone skydio',
  groups: [
    { title: 'Consumer drones', prefix: '', chips: ['R1', '2', '2+'] },
    { title: 'Enterprise', prefix: '', chips: ['X2', 'X2D', 'X10'] },
  ],
};

export const RYZE: Brand = {
  id: 'ryze',
  name: 'Ryze',
  root: 'drone tello',
  groups: [
    { title: 'Tello family', prefix: '', chips: ['Tello', 'Tello EDU', 'Tello Iron Man', 'Tello Talent'] },
  ],
};

export const HOLY_STONE: Brand = {
  id: 'holystone',
  name: 'Holy Stone',
  root: 'drone holy stone',
  groups: [
    { title: 'Toy & beginner', prefix: '', chips: ['HS110D', 'HS170', 'HS190', 'HS210', 'HS340', 'HS160', 'HS165', 'HS110G'] },
    { title: 'GPS camera drones', prefix: '', chips: ['HS100', 'HS120D', 'HS175D', 'HS360S', 'HS440', 'HS600', 'HS175'] },
    { title: 'HS700 & HS720', prefix: '', chips: ['HS700', 'HS700D', 'HS710', 'HS720', 'HS720E', 'HS720R', 'HS900', 'HS700E', 'HS720G'] },
  ],
};

export const POTENSIC: Brand = {
  id: 'potensic',
  name: 'Potensic',
  root: 'drone potensic',
  groups: [
    { title: 'Atom series', prefix: '', chips: ['Atom', 'Atom 2', 'Atom SE', 'Atom 3'] },
    { title: 'Dreamer series', prefix: '', chips: ['Dreamer', 'Dreamer Pro', 'Dreamer 4K'] },
    { title: 'Older & budget', prefix: '', chips: ['A20', 'A20W', 'D58', 'D68', 'D80', 'D85', 'T25'] },
  ],
};

export const HUBSAN: Brand = {
  id: 'hubsan',
  name: 'Hubsan',
  root: 'drone hubsan',
  groups: [
    { title: 'Zino series', prefix: '', chips: ['Zino', 'Zino Pro', 'Zino 2', 'Zino 2+', 'Zino Mini Pro', 'Zino Mini SE', 'Zino Pro+'] },
    { title: 'ACE series', prefix: '', chips: ['ACE', 'ACE Pro', 'ACE SE'] },
    { title: 'X4 & FPV', prefix: '', chips: ['H501S', 'H501S Pro', 'H107D', 'H122D Storm', 'X4 Star Pro', 'H502S'] },
  ],
};

// ---- the camera bodies ---------------------------------------------

export const CANON: Brand = {
  id: 'canon',
  name: 'Canon',
  root: 'camera canon',
  groups: [
    { title: 'EOS R · full frame', prefix: '', chips: ['EOS R', 'EOS RP', 'EOS R5', 'EOS R5 II', 'EOS R6', 'EOS R6 II', 'EOS R6 III', 'EOS R6 V', 'EOS R8', 'EOS R3', 'EOS R1', 'EOS R5 C'] },
    { title: 'EOS R · APS-C', prefix: '', chips: ['EOS R7', 'EOS R10', 'EOS R50', 'EOS R50 V', 'EOS R100'] },
    { title: 'EOS M · mirrorless', prefix: '', chips: ['EOS M50', 'EOS M50 II', 'EOS M6 II', 'EOS M100', 'EOS M200', 'EOS M10', 'EOS M3', 'EOS M5', 'EOS M6'] },
    { title: 'DSLR · full frame', prefix: '', chips: ['EOS 5D II', 'EOS 5D III', 'EOS 5D IV', 'EOS 5DS R', 'EOS 6D', 'EOS 6D II', 'EOS 1D X II', 'EOS 5D', 'EOS 5DS', 'EOS 1D X III'] },
    { title: 'DSLR · enthusiast', prefix: '', chips: ['EOS 7D', 'EOS 7D II', 'EOS 70D', 'EOS 77D', 'EOS 80D', 'EOS 90D', 'EOS 750D', 'EOS 800D', 'EOS 850D', 'EOS 60D', 'EOS 50D', 'EOS 40D', 'EOS 760D'] },
    { title: 'DSLR · entry', prefix: '', chips: ['EOS 100D', 'EOS 200D', 'EOS 250D', 'EOS 600D', 'EOS 700D', 'EOS 1100D', 'EOS 1200D', 'EOS 1300D', 'EOS 2000D', 'EOS 4000D', 'EOS 450D', 'EOS 500D', 'EOS 550D', 'EOS 650D', 'EOS 1000D'] },
    { title: 'PowerShot · compact', prefix: '', chips: ['PowerShot G7X', 'PowerShot G7X II', 'PowerShot G7X III', 'PowerShot G5X II', 'PowerShot G9X II', 'PowerShot SX70', 'PowerShot V1', 'PowerShot V10', 'PowerShot G1X III', 'PowerShot G5X', 'PowerShot G9X', 'PowerShot SX730', 'PowerShot SX740'] },
  ],
};

export const NIKON: Brand = {
  id: 'nikon',
  name: 'Nikon',
  root: 'camera nikon',
  groups: [
    { title: 'Z · full frame', prefix: '', chips: ['Z5', 'Z5 II', 'Z6', 'Z6 II', 'Z6 III', 'Z7', 'Z7 II', 'Z8', 'Z9', 'Zf', 'ZR'] },
    { title: 'Z · APS-C', prefix: '', chips: ['Z30', 'Z50', 'Z50 II', 'Zfc'] },
    { title: 'DSLR · entry', prefix: '', chips: ['D3200', 'D3300', 'D3400', 'D3500', 'D5200', 'D5300', 'D5500', 'D5600', 'D3100', 'D5100', 'D5000'] },
    { title: 'DSLR · enthusiast', prefix: '', chips: ['D7000', 'D7100', 'D7200', 'D7500', 'D500', 'D90', 'D80', 'D300S'] },
    { title: 'DSLR · full frame', prefix: '', chips: ['D600', 'D610', 'D750', 'D780', 'D800', 'D810', 'D850', 'Df', 'D700', 'D4', 'D5'] },
    { title: 'Coolpix', prefix: '', chips: ['Coolpix A1000', 'Coolpix B500', 'Coolpix P900', 'Coolpix P950', 'Coolpix P1000', 'Coolpix P610', 'Coolpix B600', 'Coolpix A', 'Coolpix P7800'] },
  ],
};

export const SONY_CAMERA: Brand = {
  id: 'sonycamera',
  name: 'Sony',
  root: 'camera sony',
  groups: [
    { title: 'A7 · full frame', prefix: '', chips: ['A7 II', 'A7 III', 'A7 IV', 'A7 V', 'A7C', 'A7C II', 'A7C R', 'A7'] },
    { title: 'A7R and A7S', prefix: '', chips: ['A7R II', 'A7R III', 'A7R IV', 'A7R V', 'A7R VI', 'A7S II', 'A7S III', 'A7R', 'A7S'] },
    { title: 'Pro and cinema', prefix: '', chips: ['A9', 'A9 II', 'A9 III', 'A1', 'A1 II', 'FX3', 'FX30', 'FX2', 'FX6'] },
    { title: 'A6000 · APS-C', prefix: '', chips: ['A6000', 'A6100', 'A6300', 'A6400', 'A6500', 'A6600', 'A6700', 'A5100'] },
    { title: 'ZV · vlog', prefix: '', chips: ['ZV-1', 'ZV-1 II', 'ZV-1F', 'ZV-E10', 'ZV-E10 II', 'ZV-E1'] },
    { title: 'RX · compact', prefix: '', chips: ['RX100 III', 'RX100 IV', 'RX100 V', 'RX100 VI', 'RX100 VII', 'RX10 III', 'RX10 IV', 'RX1R II', 'RX1R III', 'RX100', 'RX100 II', 'RX10 II'] },
    { title: 'NEX and A-mount', prefix: '', chips: ['NEX-5', 'NEX-6', 'NEX-7', 'A58', 'A77 II', 'A99 II', 'NEX-5T', 'NEX-3N', 'A65'] },
  ],
};

export const FUJIFILM: Brand = {
  id: 'fujifilm',
  name: 'Fujifilm',
  root: 'camera fujifilm',
  groups: [
    { title: 'X-T · flagship', prefix: '', chips: ['X-T1', 'X-T2', 'X-T3', 'X-T4', 'X-T5'] },
    { title: 'X-T · compact', prefix: '', chips: ['X-T10', 'X-T20', 'X-T30', 'X-T30 II', 'X-T50', 'X-T100', 'X-T200'] },
    { title: 'X-S and X-H', prefix: '', chips: ['X-S10', 'X-S20', 'X-H1', 'X-H2', 'X-H2S'] },
    { title: 'X-E and X-Pro', prefix: '', chips: ['X-E2', 'X-E3', 'X-E4', 'X-E5', 'X-Pro2', 'X-Pro3', 'X-Pro1', 'X-E1', 'X-E2S'] },
    { title: 'X100 and compacts', prefix: '', chips: ['X100T', 'X100F', 'X100V', 'X100VI', 'X70', 'XF10', 'X half', 'X100', 'X100S', 'X30'] },
    { title: 'X-A and X-M', prefix: '', chips: ['X-A3', 'X-A5', 'X-A7', 'X-M5', 'X-A2', 'X-M1'] },
    { title: 'GFX · medium format', prefix: '', chips: ['GFX 50R', 'GFX 50S', 'GFX 50S II', 'GFX 100S', 'GFX 100S II', 'GFX 100 II', 'GFX100RF', 'GFX 100'] },
    { title: 'Instax', prefix: '', chips: ['Instax Mini 9', 'Instax Mini 11', 'Instax Mini 12', 'Instax Mini 40', 'Instax Mini 90', 'Instax Wide 300', 'Instax Square SQ1', 'Instax Mini Evo', 'Instax Mini 8', 'Instax Mini 41', 'Instax Mini LiPlay', 'Instax Wide 400', 'Instax Wide Evo', 'Instax Square SQ6'] },
  ],
  lines: [
    { id: 'x', label: 'X and GFX', groupTitles: ['X-T · flagship', 'X-T · compact', 'X-S and X-H', 'X-E and X-Pro', 'X100 and compacts', 'X-A and X-M', 'GFX · medium format'] },
    { id: 'instax', label: 'Instax', groupTitles: ['Instax'] },
  ],
};

export const PANASONIC: Brand = {
  id: 'panasonic',
  name: 'Lumix',
  root: 'camera lumix',
  groups: [
    { title: 'S · full frame', prefix: '', chips: ['S1', 'S1 II', 'S1R', 'S1R II', 'S1H', 'S5', 'S5 II', 'S5 IIX', 'S9', 'S1 IIE'] },
    { title: 'GH · video', prefix: '', chips: ['GH4', 'GH5', 'GH5 II', 'GH5S', 'GH6', 'GH7', 'GH3'] },
    { title: 'G and GX', prefix: '', chips: ['G7', 'G80', 'G90', 'G100', 'G9', 'G9 II', 'GX80', 'GX9', 'G6', 'GX7'] },
    { title: 'Compact and bridge', prefix: '', chips: ['LX100', 'LX100 II', 'TZ90', 'TZ100', 'TZ200', 'FZ330', 'FZ1000', 'FZ2000', 'TZ60', 'TZ80', 'TZ95', 'FZ82', 'FZ200', 'LX15'] },
  ],
};

export const OLYMPUS: Brand = {
  id: 'olympus',
  name: 'Olympus',
  root: 'camera olympus',
  groups: [
    { title: 'OM-D E-M10', prefix: '', chips: ['E-M10', 'E-M10 II', 'E-M10 III', 'E-M10 IV'] },
    { title: 'OM-D E-M5 and E-M1', prefix: '', chips: ['E-M5', 'E-M5 II', 'E-M5 III', 'E-M1', 'E-M1 II', 'E-M1 III', 'E-M1X'] },
    { title: 'PEN', prefix: '', chips: ['PEN E-P5', 'PEN E-P7', 'PEN E-PL7', 'PEN E-PL8', 'PEN E-PL9', 'PEN E-PL10', 'PEN-F', 'PEN E-PL5', 'PEN E-PL6'] },
    { title: 'Tough', prefix: '', chips: ['Tough TG-4', 'Tough TG-5', 'Tough TG-6', 'Tough TG-7', 'Tough TG-3'] },
    { title: 'OM System', prefix: '', chips: ['OM-1', 'OM-1 II', 'OM-3', 'OM-5', 'OM-5 II'] },
  ],
  lines: [
    { id: 'olympus', label: 'Olympus', groupTitles: ['OM-D E-M10', 'OM-D E-M5 and E-M1', 'PEN', 'Tough'] },
    { id: 'omsystem', label: 'OM System', groupTitles: ['OM System'] },
  ],
};

export const LEICA: Brand = {
  id: 'leica',
  name: 'Leica',
  root: 'camera leica',
  groups: [
    { title: 'M · digital', prefix: '', chips: ['M240', 'M10', 'M10-P', 'M10-R', 'M10 Monochrom', 'M11', 'M11-P', 'M11-D', 'M11 Monochrom', 'M EV1', 'M9', 'M8', 'M262'] },
    { title: 'M · film', prefix: '', chips: ['M3', 'M4-P', 'M6', 'M7', 'MP', 'M2', 'M4', 'M5'] },
    { title: 'Q and compact', prefix: '', chips: ['Q', 'Q2', 'Q2 Monochrom', 'Q3', 'Q3 43', 'D-Lux 7', 'D-Lux 8', 'C-Lux', 'V-Lux 5', 'D-Lux 6', 'Sofort 2'] },
    { title: 'SL and CL', prefix: '', chips: ['SL', 'SL2', 'SL2-S', 'SL3', 'SL3-S', 'CL', 'TL2', 'TL'] },
  ],
};

export const PENTAX: Brand = {
  id: 'pentax',
  name: '',
  root: 'camera pentax',
  groups: [
    { title: 'Pentax K · entry', prefix: '', chips: ['Pentax K-30', 'Pentax K-50', 'Pentax K-70', 'Pentax K-500', 'Pentax K-S2', 'Pentax KF', 'Pentax K-S1', 'Pentax K-r', 'Pentax K-x'] },
    { title: 'Pentax K · enthusiast', prefix: '', chips: ['Pentax K-3', 'Pentax K-3 II', 'Pentax K-3 III', 'Pentax K-5', 'Pentax K-5 II', 'Pentax KP', 'Pentax K-1', 'Pentax K-1 II', 'Pentax K-7', 'Pentax K-5 IIs'] },
    { title: 'Pentax film', prefix: '', chips: ['Pentax K1000', 'Pentax ME Super', 'Pentax MX', 'Pentax MZ-50', 'Pentax 17', 'Pentax Spotmatic', 'Pentax ME', 'Pentax P30', 'Pentax 645N'] },
    { title: 'Ricoh GR', prefix: '', chips: ['Ricoh GR', 'Ricoh GR II', 'Ricoh GR III', 'Ricoh GR IIIx', 'Ricoh GR III HDF', 'Ricoh GR IV', 'Ricoh GR IIIx HDF'] },
  ],
  lines: [
    { id: 'pentax', label: 'Pentax', groupTitles: ['Pentax K · entry', 'Pentax K · enthusiast', 'Pentax film'] },
    { id: 'ricoh', label: 'Ricoh GR', groupTitles: ['Ricoh GR'] },
  ],
};

export const FILM_CAMERA: Brand = {
  id: 'filmcamera',
  name: '',
  root: 'film camera',
  groups: [
    { title: '35mm SLRs', prefix: '', chips: ['Canon AE-1', 'Canon AE-1 Program', 'Canon A-1', 'Nikon FM2', 'Nikon F3', 'Nikon F80', 'Olympus OM-10', 'Minolta X-700', 'Nikon FE', 'Nikon FE2', 'Nikon FM', 'Nikon F100', 'Nikon F5', 'Olympus OM-1n', 'Olympus OM-2', 'Canon EOS 300', 'Canon T70', 'Minolta X-300', 'Minolta SRT101', 'Zenit E', 'Praktica MTL5'] },
    { title: 'Point and shoot', prefix: '', chips: ['Olympus Mju II', 'Olympus XA2', 'Contax T2', 'Yashica T4', 'Canon Sure Shot', 'Nikon L35AF', 'Konica Big Mini', 'Olympus Trip 35', 'Olympus Mju I', 'Contax T3', 'Ricoh GR1v', 'Yashica T5', 'Rollei 35', 'Pentax Espio'] },
    { title: 'Medium format', prefix: '', chips: ['Mamiya RB67', 'Mamiya RZ67', 'Mamiya 645', 'Bronica ETRS', 'Yashica Mat 124G', 'Hasselblad 500CM', 'Pentax 6x7', 'Rolleiflex 2.8F', 'Rolleiflex 3.5F', 'Bronica SQ-A', 'Mamiya C330', 'Mamiya 7 II', 'Hasselblad 503CW', 'Fuji GW690', 'Lubitel 166'] },
    { title: 'Instant', prefix: '', chips: ['Polaroid SX-70', 'Polaroid 600', 'Polaroid OneStep', 'Polaroid Now', 'Polaroid Go', 'Polaroid Now+', 'Polaroid I-2', 'Polaroid Impulse'] },
    { title: 'Toy and reloadable', prefix: '', chips: ['Kodak Ektar H35', 'Kodak Ektar H35N', 'Kodak M35', 'Ilford Sprite 35-II', 'Lomo LC-A+', 'Lomo Diana F+', 'Holga 120N'] },
  ],
  lines: [
    { id: 'film', label: '35mm', groupTitles: ['35mm SLRs', 'Point and shoot', 'Toy and reloadable'] },
    { id: 'medium', label: 'Medium format', groupTitles: ['Medium format'] },
    { id: 'instant', label: 'Instant', groupTitles: ['Instant'] },
  ],
};

// ---- the lenses ----------------------------------------------------

export const CANON_LENS: Brand = {
  id: 'canonlens',
  name: 'Canon',
  root: 'lens canon',
  groups: [
    { title: 'RF primes', prefix: '', chips: ['RF 50mm f/1.8', 'RF 50mm f/1.2L', 'RF 35mm f/1.8 Macro', 'RF 85mm f/2', 'RF 85mm f/1.2L', 'RF 16mm f/2.8', 'RF 24mm f/1.8', 'RF 28mm f/2.8', 'RF 100mm f/2.8 Macro', 'RF 135mm f/1.8L', 'RF 35mm f/1.4L VCM', 'RF 50mm f/1.4L VCM', 'RF 24mm f/1.4L VCM', 'RF 20mm f/1.4L VCM', 'RF 85mm f/1.4L VCM', 'RF 45mm f/1.2 STM'] },
    { title: 'RF zooms', prefix: '', chips: ['RF 24-105mm f/4L', 'RF 24-105mm STM', 'RF 24-70mm f/2.8L', 'RF 28-70mm f/2L', 'RF 24-240mm', 'RF 15-30mm f/4.5-6.3', 'RF 14-35mm f/4L', 'RF 15-35mm f/2.8L', 'RF 24-105mm f/2.8L', 'RF 10-20mm f/4L', 'RF 28-70mm f/2.8 STM', 'RF 16-28mm f/2.8 STM'] },
    { title: 'RF telephoto', prefix: '', chips: ['RF 70-200mm f/2.8L', 'RF 70-200mm f/4L', 'RF 100-400mm', 'RF 100-500mm L', 'RF 200-800mm', 'RF 600mm f/11', 'RF 800mm f/11'] },
    { title: 'RF-S · APS-C', prefix: '', chips: ['RF-S 18-45mm', 'RF-S 18-150mm', 'RF-S 55-210mm', 'RF-S 10-18mm', 'RF-S 14-30mm PZ'] },
    { title: 'EF primes', prefix: '', chips: ['EF 50mm f/1.8 STM', 'EF 50mm f/1.4', 'EF 50mm f/1.2L', 'EF 85mm f/1.8', 'EF 85mm f/1.4L', 'EF 35mm f/2 IS', 'EF 24mm f/2.8 IS', 'EF 40mm f/2.8 STM', 'EF 100mm f/2.8 Macro', 'EF 135mm f/2L', 'EF 50mm f/1.8 II', 'EF 35mm f/1.4L', 'EF 28mm f/1.8', 'EF 100mm f/2', 'EF 24mm f/1.4L II'] },
    { title: 'EF zooms', prefix: '', chips: ['EF 24-70mm f/2.8L II', 'EF 24-70mm f/4L', 'EF 24-105mm f/4L', 'EF 16-35mm f/2.8L', 'EF 16-35mm f/4L', 'EF 17-40mm f/4L', 'EF 28-135mm IS', 'EF 24-70mm f/2.8L', 'EF 24-105mm STM', 'EF 8-15mm Fisheye'] },
    { title: 'EF telephoto', prefix: '', chips: ['EF 70-200mm f/2.8L', 'EF 70-200mm f/4L', 'EF 70-300mm IS II', 'EF 75-300mm', 'EF 100-400mm L II', 'EF 300mm f/4L', 'EF 400mm f/5.6L', 'EF 200mm f/2.8L', 'EF 70-300mm f/4-5.6L', 'EF 100-400mm L', 'EF 300mm f/2.8L IS'] },
    { title: 'EF-S · APS-C', prefix: '', chips: ['EF-S 18-55mm IS', 'EF-S 18-135mm', 'EF-S 55-250mm', 'EF-S 10-18mm', 'EF-S 10-22mm', 'EF-S 17-55mm f/2.8', 'EF-S 24mm f/2.8', 'EF-S 60mm Macro', 'EF-S 15-85mm', 'EF-S 18-200mm', 'EF-S 35mm Macro'] },
    { title: 'EF-M · EOS M', prefix: '', chips: ['EF-M 15-45mm', 'EF-M 18-150mm', 'EF-M 55-200mm', 'EF-M 11-22mm', 'EF-M 22mm f/2', 'EF-M 32mm f/1.4', 'EF-M 28mm Macro'] },
  ],
  lines: [
    { id: 'RF', label: 'RF · mirrorless', groupTitles: ['RF primes', 'RF zooms', 'RF telephoto', 'RF-S · APS-C'] },
    { id: 'EF', label: 'EF · DSLR and EOS M', groupTitles: ['EF primes', 'EF zooms', 'EF telephoto', 'EF-S · APS-C', 'EF-M · EOS M'] },
  ],
};

export const NIKON_LENS: Brand = {
  id: 'nikonlens',
  name: 'Nikon',
  root: 'lens nikon',
  groups: [
    { title: 'Z primes', prefix: '', chips: ['Z 50mm f/1.8 S', 'Z 50mm f/1.2 S', 'Z 40mm f/2', 'Z 28mm f/2.8', 'Z 26mm f/2.8', 'Z 35mm f/1.8 S', 'Z 85mm f/1.8 S', 'Z 20mm f/1.8 S', 'Z MC 50mm Macro', 'Z MC 105mm Macro', 'Z 24mm f/1.8 S', 'Z 35mm f/1.4', 'Z 50mm f/1.4', 'Z 85mm f/1.2 S', 'Z 135mm f/1.8 Plena', 'Z 35mm f/1.2 S'] },
    { title: 'Z zooms', prefix: '', chips: ['Z 24-70mm f/4 S', 'Z 24-70mm f/2.8 S', 'Z 24-120mm f/4 S', 'Z 24-50mm', 'Z 28-75mm f/2.8', 'Z 14-30mm f/4 S', 'Z 14-24mm f/2.8 S', 'Z 17-28mm f/2.8', 'Z 24-70mm f/2.8 S II'] },
    { title: 'Z telephoto', prefix: '', chips: ['Z 24-200mm', 'Z 70-200mm f/2.8 S', 'Z 70-180mm f/2.8', 'Z 100-400mm S', 'Z 180-600mm', 'Z 400mm f/4.5 S', 'Z 28-400mm', 'Z 600mm f/6.3 PF', 'Z 800mm f/6.3 PF'] },
    { title: 'Z DX · APS-C', prefix: '', chips: ['Z DX 16-50mm', 'Z DX 50-250mm', 'Z DX 18-140mm', 'Z DX 12-28mm', 'Z DX 24mm f/1.7'] },
    { title: 'F-mount primes', prefix: '', chips: ['AF-S 50mm f/1.8G', 'AF-S 50mm f/1.4G', 'AF 50mm f/1.8D', 'AF-S 35mm f/1.8G', 'AF-S 85mm f/1.8G', 'AF-S 20mm f/1.8G', 'AF-S 24mm f/1.8G', 'AF-S 60mm Macro', 'AF-S 105mm Macro', 'AF-S 85mm f/1.4G', 'AF-S 35mm f/1.4G', 'AF-S 24mm f/1.4G', 'AF-S 28mm f/1.8G', 'AF 50mm f/1.4D', 'AF 85mm f/1.8D', 'AF 35mm f/2D'] },
    { title: 'F-mount zooms', prefix: '', chips: ['AF-S 24-70mm f/2.8', 'AF-S 24-120mm f/4', 'AF-S 24-85mm VR', 'AF-S 16-35mm f/4', 'AF-S 14-24mm f/2.8', 'AF-S 17-35mm f/2.8', 'AF-S 28-300mm VR', 'AF 80-200mm f/2.8D', 'AF-S 28-70mm f/2.8D', 'AF-S 18-35mm G'] },
    { title: 'F-mount telephoto', prefix: '', chips: ['AF-S 70-200mm f/2.8', 'AF-S 70-200mm f/4', 'AF-S 70-300mm VR', 'AF-P 70-300mm', 'AF 70-300mm G', 'AF-S 80-400mm', 'AF-S 200-500mm', 'AF-S 300mm f/4E PF', 'AF-S 500mm f/5.6E PF'] },
    { title: 'DX · APS-C DSLR', prefix: '', chips: ['AF-P DX 18-55mm', 'AF-S DX 18-55mm VR', 'AF-S DX 18-105mm', 'AF-S DX 18-140mm', 'AF-S DX 55-200mm', 'AF-S DX 55-300mm', 'AF-P DX 70-300mm', 'AF-S DX 35mm f/1.8', 'AF-S DX 10-24mm', 'AF-S DX 16-85mm', 'AF-S DX 17-55mm f/2.8', 'AF-S DX 18-200mm VR', 'AF-S DX 18-300mm', 'AF-P DX 10-20mm', 'AF-S DX 40mm Micro', 'AF-S DX 12-24mm'] },
  ],
  lines: [
    { id: 'Z', label: 'Z · mirrorless', groupTitles: ['Z primes', 'Z zooms', 'Z telephoto', 'Z DX · APS-C'] },
    { id: 'F', label: 'F · DSLR', groupTitles: ['F-mount primes', 'F-mount zooms', 'F-mount telephoto', 'DX · APS-C DSLR'] },
  ],
};

export const SONY_LENS: Brand = {
  id: 'sonylens',
  name: 'Sony',
  root: 'lens sony',
  groups: [
    { title: 'FE primes', prefix: '', chips: ['FE 50mm f/1.8', 'FE 50mm f/1.2 GM', 'FE 55mm f/1.8 ZA', 'FE 35mm f/1.8', 'FE 85mm f/1.8', 'FE 85mm f/1.4 GM', 'FE 28mm f/2', 'FE 24mm f/1.4 GM', 'FE 20mm f/1.8 G', 'FE 40mm f/2.5 G', 'FE 90mm Macro', 'FE 24mm f/2.8 G', 'FE 50mm f/2.5 G', 'FE 35mm f/2.8 ZA', 'FE 35mm f/1.4 ZA', 'FE 50mm f/1.4 ZA', 'FE 14mm f/1.8 GM', 'FE 16mm f/1.8 G', 'FE 85mm f/1.4 GM II', 'FE 100mm f/2.8 Macro GM', 'FE 100mm STF GM', 'FE 50mm f/2.8 Macro'] },
    { title: 'FE zooms', prefix: '', chips: ['FE 28-70mm OSS', 'FE 28-60mm', 'FE 24-70mm f/2.8 GM', 'FE 24-70mm GM II', 'FE 24-105mm f/4 G', 'FE 16-35mm f/2.8 GM', 'FE 16-35mm f/4 ZA', 'FE 20-70mm f/4 G', 'FE 24-50mm f/2.8 G', 'FE 24-70mm f/4 ZA', 'FE 16-35mm GM II', 'FE PZ 16-35mm f/4 G', 'FE 12-24mm f/4 G', 'FE 12-24mm f/2.8 GM'] },
    { title: 'FE telephoto', prefix: '', chips: ['FE 70-200mm f/2.8 GM', 'FE 70-200mm GM II', 'FE 70-200mm f/4 G', 'FE 70-300mm G', 'FE 100-400mm GM', 'FE 200-600mm G', 'FE 400-800mm G', 'FE 24-240mm', 'FE 70-200mm f/4 G II'] },
    { title: 'Fast G Master glass', prefix: '', chips: ['FE 28-70mm f/2 GM', 'FE 50-150mm f/2 GM', 'FE 16-25mm f/2.8 G', 'FE 35mm f/1.4 GM', 'FE 50mm f/1.4 GM', 'FE 135mm f/1.8 GM', 'FE 300mm f/2.8 GM'] },
    { title: 'E zooms · APS-C', prefix: '', chips: ['E 16-50mm PZ', 'E 18-55mm OSS', 'E 18-135mm OSS', 'E 18-105mm f/4 G', 'E 55-210mm', 'E 70-350mm G', 'E 16-55mm f/2.8 G', 'E 10-18mm f/4', 'E PZ 10-20mm G', 'E 16-70mm f/4 ZA', 'E 18-200mm OSS'] },
    { title: 'E primes · APS-C', prefix: '', chips: ['E 35mm f/1.8 OSS', 'E 50mm f/1.8 OSS', 'E 30mm Macro', 'E 20mm f/2.8', 'E 16mm f/2.8', 'E 15mm f/1.4 G', 'E 11mm f/1.8', 'E 24mm f/1.8 ZA'] },
  ],
  lines: [
    { id: 'FE', label: 'FE · full frame', groupTitles: ['FE primes', 'FE zooms', 'FE telephoto', 'Fast G Master glass'] },
    { id: 'E', label: 'E · APS-C', groupTitles: ['E zooms · APS-C', 'E primes · APS-C'] },
  ],
};

export const SIGMA_LENS: Brand = {
  id: 'sigmalens',
  name: 'Sigma',
  root: 'lens sigma',
  groups: [
    { title: 'Art primes (DSLR)', prefix: '', chips: ['Art 20mm f/1.4', 'Art 24mm f/1.4', 'Art 30mm f/1.4 DC', 'Art 35mm f/1.4', 'Art 40mm f/1.4', 'Art 50mm f/1.4', 'Art 85mm f/1.4', 'Art 105mm f/1.4', 'Art 135mm f/1.8', 'Art 14mm f/1.8', 'Art 28mm f/1.4', 'Art 70mm f/2.8 Macro'] },
    { title: 'Art zooms (DSLR)', prefix: '', chips: ['Art 12-24mm f/4', 'Art 14-24mm f/2.8', 'Art 18-35mm f/1.8', 'Art 24-70mm f/2.8', 'Art 24-105mm f/4', 'Art 50-100mm f/1.8', 'Art 24-35mm f/2'] },
    { title: 'Mirrorless Art primes', prefix: '', chips: ['14mm f/1.4 DG DN', '20mm f/1.4 DG DN', '24mm f/1.4 DG DN', '35mm f/1.4 DG DN', '35mm f/1.2 DG DN', '35mm f/1.2 DG II Art', '50mm f/1.4 DG DN', '50mm f/1.2 DG DN', '85mm f/1.4 DG DN', '105mm f/1.4 DG DN', '135mm f/1.4 DG Art', '15mm f/1.4 DG Fisheye', '35mm f/1.4 DG II Art'] },
    { title: 'I series compacts', prefix: '', chips: ['17mm f/4 DG DN', '20mm f/2 DG DN', '24mm f/3.5 DG DN', '35mm f/2 DG DN', '45mm f/2.8 DG DN', '50mm f/2 DG DN', '65mm f/2 DG DN', '90mm f/2.8 DG DN', '24mm f/2 DG DN'] },
    { title: 'Mirrorless zooms', prefix: '', chips: ['14-24mm f/2.8 DG DN', '16-28mm f/2.8 DG DN', '24-70mm f/2.8 DG DN', '28-70mm f/2.8 DG DN', '28-105mm f/2.8 DG DN', '50-150mm f/2.8 DG DN', '70-200mm f/2.8 DG DN', '100-400mm DG DN', '150-600mm DG DN', '60-600mm DG DN', '20-200mm DG DN', '28-45mm f/1.8 DG DN', '24-70mm f/2.8 DG DN II'] },
    { title: 'APS-C mirrorless (DC DN)', prefix: '', chips: ['16mm f/1.4 DC DN', '23mm f/1.4 DC DN', '30mm f/1.4 DC DN', '30mm f/2.8 DC DN', '56mm f/1.4 DC DN', '10-18mm f/2.8 DC DN', '17-40mm f/1.8 DC Art', '18-50mm f/2.8 DC DN', '16-300mm DC OS'] },
    { title: 'Older EX and HSM zooms', prefix: '', chips: ['17-50mm f/2.8 EX', '10-20mm f/3.5 EX', '8-16mm f/4.5-5.6', '24-70mm f/2.8 EX', '70-200mm f/2.8 EX', '150-600mm C', '150-600mm Sports', '100-400mm f/5-6.3', '18-250mm Macro OS', '18-200mm OS', '105mm f/2.8 EX Macro', '50mm f/1.4 EX', '17-70mm f/2.8-4 C', '70-300mm f/4-5.6 APO', '18-50mm f/2.8 EX', '30mm f/1.4 EX DC', '10-20mm f/4-5.6 EX', '85mm f/1.4 EX'] },
    { title: 'Sports super telephoto', prefix: '', chips: ['500mm f/5.6 DG DN', '300-600mm f/4 Sports', '120-300mm f/2.8 Sports'] },
  ],
};

export const TAMRON_LENS: Brand = {
  id: 'tamronlens',
  name: 'Tamron',
  root: 'lens tamron',
  groups: [
    { title: 'Mirrorless standard zooms', prefix: '', chips: ['17-28mm f/2.8 Di III', '20-40mm f/2.8 Di III', '28-75mm f/2.8 Di III', '28-75mm f/2.8 G2', '16-30mm f/2.8 G2', '35-150mm f/2-2.8', '35-100mm f/2.8', '25-200mm f/2.8-5.6', '28-300mm f/4-7.1'] },
    { title: 'Mirrorless telephoto', prefix: '', chips: ['70-180mm f/2.8 Di III', '70-180mm f/2.8 G2', '50-400mm f/4.5-6.3', '70-300mm f/4.5-6.3', '150-500mm f/5-6.7', '50-300mm f/4.5-6.3'] },
    { title: 'Mirrorless primes', prefix: '', chips: ['20mm f/2.8 Di III', '24mm f/2.8 Di III', '35mm f/2.8 Di III', '90mm f/2.8 Macro III'] },
    { title: 'APS-C mirrorless', prefix: '', chips: ['11-20mm f/2.8 Di III', '17-70mm f/2.8 Di III', '18-50mm f/2.8 Di III', '18-300mm f/3.5-6.3', '18-200mm Di III VC'] },
    { title: 'DSLR zooms', prefix: '', chips: ['17-50mm f/2.8', '17-50mm f/2.8 VC', '28-75mm f/2.8', '24-70mm f/2.8 VC', '24-70mm f/2.8 G2', '10-24mm f/3.5-4.5', '18-270mm PZD', '16-300mm PZD', '18-400mm f/3.5-6.3', 'SP 15-30mm f/2.8 VC', 'SP 15-30mm f/2.8 G2', '18-200mm Di II VC', '28-300mm f/3.5-6.3 VC'] },
    { title: 'DSLR telephoto', prefix: '', chips: ['70-200mm f/2.8 VC', '70-200mm f/2.8 G2', '70-300mm f/4-5.6 VC', '150-600mm f/5-6.3', '150-600mm G2', '100-400mm f/4.5-6.3', '70-210mm f/4 VC'] },
    { title: 'SP primes', prefix: '', chips: ['SP 35mm f/1.4', 'SP 35mm f/1.8 VC', 'SP 45mm f/1.8 VC', 'SP 85mm f/1.8 VC', 'SP 90mm f/2.8 Macro'] },
  ],
};

export const FUJI_LENS: Brand = {
  id: 'fujilens',
  name: 'Fujifilm',
  root: 'lens fujifilm',
  groups: [
    { title: 'Fast XF primes', prefix: '', chips: ['XF 16mm f/1.4 R', 'XF 18mm f/1.4 R LM', 'XF 23mm f/1.4 R', 'XF 23mm f/1.4 R LM', 'XF 33mm f/1.4 R LM', 'XF 35mm f/1.4 R', 'XF 50mm f/1.0 R WR', 'XF 56mm f/1.2 R', 'XF 56mm f/1.2 R WR', 'XF 56mm f/1.2 R APD'] },
    { title: 'XF f/2 primes', prefix: '', chips: ['XF 14mm f/2.8 R', 'XF 16mm f/2.8 R WR', 'XF 18mm f/2 R', 'XF 23mm f/2 R WR', 'XF 23mm f/2.8 R WR', 'XF 27mm f/2.8', 'XF 27mm f/2.8 R WR', 'XF 35mm f/2 R WR', 'XF 50mm f/2 R WR', 'XF 90mm f/2 R LM WR'] },
    { title: 'Macro and specials', prefix: '', chips: ['XF 8mm f/3.5 R WR', 'XF 30mm f/2.8 Macro', 'XF 60mm f/2.4 Macro', 'XF 80mm f/2.8 Macro', 'XF 200mm f/2 R LM', 'XF 500mm f/5.6 R LM'] },
    { title: 'XF zooms', prefix: '', chips: ['XF 8-16mm f/2.8', 'XF 10-24mm f/4', 'XF 16-55mm f/2.8', 'XF 16-55mm f/2.8 II', 'XF 16-80mm f/4', 'XF 18-55mm f/2.8-4', 'XF 18-135mm f/3.5-5.6', 'XF 50-140mm f/2.8', 'XF 55-200mm f/3.5-4.8', 'XF 70-300mm f/4-5.6', 'XF 100-400mm f/4.5-5.6', 'XF 150-600mm f/5.6-8'] },
    { title: 'Kit and XC lenses', prefix: '', chips: ['XC 15-45mm f/3.5-5.6', 'XC 16-50mm f/3.5-5.6', 'XC 50-230mm f/4.5-6.7', 'XC 35mm f/2', 'XF 16-50mm f/2.8-4.8', 'XF 18-120mm f/4 LM'] },
    { title: 'GF lenses (GFX)', prefix: '', chips: ['GF 30mm f/3.5', 'GF 45mm f/2.8', 'GF 50mm f/3.5', 'GF 55mm f/1.7', 'GF 63mm f/2.8', 'GF 80mm f/1.7', 'GF 110mm f/2', 'GF 120mm f/4 Macro', 'GF 250mm f/4', 'GF 500mm f/5.6', 'GF 20-35mm f/4', 'GF 32-64mm f/4', 'GF 35-70mm f/4.5-5.6', 'GF 45-100mm f/4', 'GF 100-200mm f/5.6'] },
  ],
};

export const PANASONIC_LENS: Brand = {
  id: 'panasoniclens',
  name: 'Lumix',
  root: 'lens lumix',
  groups: [
    { title: 'S primes (L mount)', prefix: '', chips: ['S 18mm f/1.8', 'S 24mm f/1.8', 'S 26mm f/8 Pancake', 'S 35mm f/1.8', 'S 50mm f/1.8', 'S 85mm f/1.8', 'S 100mm f/2.8 Macro', 'S Pro 50mm f/1.4', 'S 40mm f/2'] },
    { title: 'S zooms (L mount)', prefix: '', chips: ['S 14-28mm f/4-5.6', 'S 18-40mm f/4.5-6.3', 'S 20-60mm f/3.5-5.6', 'S 24-60mm f/2.8', 'S 24-105mm f/4 Macro', 'S 28-200mm f/4-7.1', 'S 70-300mm f/4.5-5.6', 'S 100-400mm f/4-6.3', 'S Pro 16-35mm f/4', 'S Pro 24-70mm f/2.8', 'S Pro 70-200mm f/2.8', 'S Pro 70-200mm f/4', 'S 100-500mm f/5-7.1'] },
    { title: 'G primes (Micro Four Thirds)', prefix: '', chips: ['G 14mm f/2.5', 'G 20mm f/1.7 II', 'G 25mm f/1.7', 'G 30mm f/2.8 Macro', 'G 42.5mm f/1.7', 'G 8mm f/3.5 Fisheye'] },
    { title: 'G zooms (Micro Four Thirds)', prefix: '', chips: ['G 7-14mm f/4', 'G 12-32mm f/3.5-5.6', 'G 12-35mm f/2.8', 'G 12-60mm f/3.5-5.6', 'G 14-42mm f/3.5-5.6', 'G 14-140mm f/3.5-5.6', 'G 35-100mm f/2.8', 'G 45-150mm f/4-5.6', 'G 45-175mm f/4-5.6', 'G 100-300mm f/4-5.6', 'G 100-400mm f/4-6.3', 'G 45-200mm f/4-5.6', 'G 14-42mm PZ'] },
    { title: 'Leica DG (Micro Four Thirds)', prefix: '', chips: ['Leica DG 9mm f/1.7', 'Leica DG 12mm f/1.4', 'Leica DG 15mm f/1.7', 'Leica DG 25mm f/1.4', 'Leica DG 42.5mm f/1.2', 'Leica DG 45mm f/2.8', 'Leica DG 8-18mm f/2.8', 'Leica DG 10-25mm f/1.7', 'Leica DG 12-60mm f/2.8', 'Leica DG 25-50mm f/1.7', 'Leica DG 50-200mm f/2.8', 'Leica DG 100-400mm', 'Leica DG 200mm f/2.8'] },
  ],
  lines: [
    { id: 'S', label: 'Lumix S (L mount)', groupTitles: ['S primes (L mount)', 'S zooms (L mount)'] },
    { id: 'G', label: 'Lumix G (Micro Four Thirds)', groupTitles: ['G primes (Micro Four Thirds)', 'G zooms (Micro Four Thirds)'] },
    { id: 'DG', label: 'Leica DG (Micro Four Thirds)', groupTitles: ['Leica DG (Micro Four Thirds)'] },
  ],
};

export const OM_LENS: Brand = {
  id: 'omlens',
  name: 'M.Zuiko',
  root: 'lens olympus',
  groups: [
    { title: 'Pro zooms', prefix: '', chips: ['7-14mm f/2.8 Pro', '8-25mm f/4 Pro', '12-40mm f/2.8 Pro', '12-40mm f/2.8 Pro II', '12-45mm f/4 Pro', '12-100mm f/4 Pro', '40-150mm f/2.8 Pro', '40-150mm f/4 Pro', '50-200mm f/2.8 Pro', '150-400mm f/4.5 Pro'] },
    { title: 'Pro primes', prefix: '', chips: ['8mm f/1.8 Fisheye Pro', '17mm f/1.2 Pro', '20mm f/1.4 Pro', '25mm f/1.2 Pro', '45mm f/1.2 Pro', '90mm f/3.5 Macro Pro', '300mm f/4 Pro'] },
    { title: 'Everyday primes', prefix: '', chips: ['9mm f/8 Fisheye', '12mm f/2', '17mm f/1.8', '17mm f/1.8 II', '17mm f/2.8 Pancake', '25mm f/1.8', '25mm f/1.8 II', '30mm f/3.5 Macro', '45mm f/1.8', '60mm f/2.8 Macro', '75mm f/1.8'] },
    { title: 'Kit zooms', prefix: '', chips: ['9-18mm f/4-5.6', '12-50mm f/3.5-6.3', '14-42mm f/3.5-5.6', '14-42mm EZ Pancake', '14-150mm f/4-5.6 II', '12-200mm f/3.5-6.3'] },
    { title: 'Telephoto zooms', prefix: '', chips: ['40-150mm f/4-5.6', '75-300mm f/4.8-6.7', '100-400mm f/5-6.3', '100-400mm f/5-6.3 II', '150-600mm f/5-6.3'] },
  ],
};

export const SAMYANG_LENS: Brand = {
  id: 'samyanglens',
  name: 'Samyang',
  root: 'lens samyang',
  groups: [
    { title: 'AF full frame primes', prefix: '', chips: ['AF 14mm f/2.8 FE', 'AF 18mm f/2.8 FE', 'AF 24mm f/1.8 FE', 'AF 24mm f/2.8 FE', 'AF 35mm f/1.4 FE', 'AF 35mm f/1.8 FE', 'AF 45mm f/1.8 FE', 'AF 50mm f/1.4 FE', 'AF 50mm f/1.4 II FE', 'AF 75mm f/1.8 FE', 'AF 85mm f/1.4 FE', 'AF 135mm f/1.8 FE', 'AF 85mm f/1.4 II FE'] },
    { title: 'AF zooms, macro and APS-C', prefix: '', chips: ['AF 24-70mm f/2.8 FE', 'AF 35-150mm f/2-2.8', 'AF 12mm f/2 APS-C'] },
    { title: 'Manual focus classics', prefix: '', chips: ['8mm f/3.5 Fisheye', '10mm f/2.8', '12mm f/2 NCS', '14mm f/2.8', '16mm f/2', '20mm f/1.8', '24mm f/1.4', '35mm f/1.4', '50mm f/1.4', '85mm f/1.4', '135mm f/2', '100mm f/2.8 Macro', '12mm f/2.8 Fisheye', '300mm f/6.3 Reflex', 'XP 14mm f/2.4', 'XP 50mm f/1.2', 'XP 85mm f/1.2', '21mm f/1.4 APS-C'] },
    { title: 'Cine lenses', prefix: '', chips: ['12mm T2.2 Cine', '14mm T3.1 Cine', '24mm T1.5 Cine', '35mm T1.5 Cine', '50mm T1.5 Cine', '85mm T1.5 Cine', '16mm T2.2 Cine', '135mm T2.2 Cine'] },
    { title: 'V-AF cine primes', prefix: '', chips: ['V-AF 20mm T1.9', 'V-AF 24mm T1.9', 'V-AF 35mm T1.9', 'V-AF 45mm T1.9', 'V-AF 75mm T1.9'] },
  ],
};

export const VILTROX_LENS: Brand = {
  id: 'viltroxlens',
  name: 'Viltrox',
  root: 'lens viltrox',
  groups: [
    { title: 'APS-C AF primes', prefix: '', chips: ['9mm f/2.8 Air', '13mm f/1.4', '23mm f/1.4', '25mm f/1.7 Air', '27mm f/1.2 Pro', '33mm f/1.4', '35mm f/1.7 Air', '56mm f/1.4', '56mm f/1.7 Air', '75mm f/1.2 Pro', '15mm f/1.7 Air', '75mm f/1.8 EVO'] },
    { title: 'Full frame AF lenses', prefix: '', chips: ['14mm f/4.0 Air', '16mm f/1.8 FE', '20mm f/2.8 FE', '24mm f/1.8 FE', '35mm f/1.8 FE', '40mm f/2.5 Air', '50mm f/1.8 FE', '50mm f/2.0 Air', '85mm f/1.8 II', '85mm f/2.0 EVO', '85mm f/1.4 Pro', '28-75mm f/2.8 FE', '35mm f/1.8 EVO', '55mm f/1.8 EVO', '28mm f/4.5 FE'] },
    { title: 'LAB series', prefix: '', chips: ['35mm f/1.2 LAB', '50mm f/1.2 LAB', '85mm f/1.2 LAB', '135mm f/1.8 LAB'] },
  ],
};

export const LAOWA_LENS: Brand = {
  id: 'laowalens',
  name: 'Laowa',
  root: 'lens laowa',
  groups: [
    { title: 'Macro', prefix: '', chips: ['15mm f/4 Wide Macro', '25mm f/2.8 2.5-5x', '58mm f/2.8 2x Macro', '60mm f/2.8 2x Macro', '65mm f/2.8 2x Macro', '85mm f/5.6 2x Macro', '90mm f/2.8 2x APO', '100mm f/2.8 2x Macro', '50mm f/2.8 2x Macro'] },
    { title: 'Ultra wide', prefix: '', chips: ['9mm f/2.8 Zero-D', '9mm f/5.6 W-Dreamer', '10mm f/4 Cookie', '11mm f/4.5 FF RL', '12mm f/2.8 Zero-D', '14mm f/4 Zero-D', '15mm f/2 Zero-D', '10-18mm f/4.5-5.6', '7.5mm f/2 MFT', '10mm f/2.8 Zero-D FF', '6mm f/2 Zero-D MFT', '12-24mm f/5.6 Zoom'] },
    { title: 'Shift, probe and specials', prefix: '', chips: ['4mm f/2.8 Fisheye', '15mm f/4.5 Shift', '20mm f/4 Shift', '24mm f/14 Probe', '17mm f/4 GFX', '8-15mm f/2.8 Fisheye'] },
    { title: 'Argus fast primes', prefix: '', chips: ['Argus 25mm f/0.95', 'Argus 33mm f/0.95', 'Argus 35mm f/0.95', 'Argus 45mm f/0.95'] },
    { title: 'Nanomorph anamorphic', prefix: '', chips: ['Nanomorph 27mm T2.4', 'Nanomorph 35mm T2.4', 'Nanomorph 50mm T2.4', 'Nanomorph 65mm T2.4'] },
  ],
};

export const TOKINA_LENS: Brand = {
  id: 'tokinalens',
  name: 'Tokina',
  root: 'lens tokina',
  groups: [
    { title: 'DSLR wide zooms', prefix: '', chips: ['10-17mm Fisheye', '11-16mm f/2.8 DX', '11-16mm f/2.8 DX II', '11-20mm f/2.8 DX', '12-24mm f/4 DX', '14-20mm f/2 DX', '16-28mm f/2.8 FX', '17-35mm f/4 FX', '12-28mm f/4 DX'] },
    { title: 'DSLR standard and tele', prefix: '', chips: ['28-70mm f/2.6-2.8', '24-70mm f/2.8 FX', '50-135mm f/2.8 DX', '70-200mm f/4 FX', '80-400mm f/4.5-5.6', '16-50mm f/2.8 DX'] },
    { title: 'Primes, macro and Opera', prefix: '', chips: ['35mm f/2.8 Macro DX', '100mm f/2.8 Macro', 'Opera 50mm f/1.4', 'Opera 16-28mm f/2.8', 'Firin 20mm f/2 FE'] },
    { title: 'atx-m mirrorless', prefix: '', chips: ['atx-m 23mm f/1.4', 'atx-m 33mm f/1.4', 'atx-m 56mm f/1.4', 'atx-m 85mm f/1.8', 'atx-m 11-18mm f/2.8'] },
    { title: 'SZ super tele and fisheye', prefix: '', chips: ['SZ 300mm f/7.1', 'SZ 500mm f/8 Reflex', 'SZ 8mm f/2.8 Fisheye', 'SZ 900mm f/11 Reflex'] },
  ],
};

// ---- the action cameras --------------------------------------------

export const GOPRO: Brand = {
  id: 'gopro',
  name: 'GoPro',
  root: 'gopro',
  groups: [
    { title: 'Hero 5 to 7', prefix: '', chips: ['Hero 5 Black', 'Hero 6 Black', 'Hero 7 White', 'Hero 7 Silver', 'Hero 7 Black', 'Hero 2018'] },
    { title: 'Hero 8 to 11', prefix: '', chips: ['Hero 8', 'Hero 9', 'Hero 10', 'Hero 11', 'Hero 11 Mini'] },
    { title: 'Hero 12, 13 and Hero 2024', prefix: '', chips: ['Hero 12', 'Hero 13', 'Hero 2024'] },
    { title: 'Mission and Lit Hero', prefix: '', chips: ['Lit Hero', 'Mission 1', 'Mission 1 Pro'] },
    { title: '360 and Fusion', prefix: '', chips: ['Max', 'Max 2', 'Fusion'] },
    { title: 'Session bodies', prefix: '', chips: ['Hero Session', 'Hero 4 Session', 'Hero 5 Session'] },
    { title: 'Hero 3 and 4', prefix: '', chips: ['Hero 3 Black', 'Hero 3+ Black', 'Hero 4 Black', 'Hero 4 Silver'] },
  ],
};

export const INSTA360: Brand = {
  id: 'insta360',
  name: 'Insta360',
  root: 'insta360',
  groups: [
    { title: 'X series 360', prefix: '', chips: ['ONE X', 'ONE X2', 'X3', 'X4', 'X5', 'X6'] },
    { title: 'ONE R and RS', prefix: '', chips: ['ONE R', 'ONE R Twin', 'ONE RS', 'ONE RS Twin', 'ONE RS 1-Inch', 'ONE RS 1-Inch 360'] },
    { title: 'GO series', prefix: '', chips: ['GO 2', 'GO 3', 'GO 3S', 'GO Ultra'] },
    { title: 'Ace series', prefix: '', chips: ['Ace', 'Ace Pro', 'Ace Pro 2'] },
    { title: 'Gimbals and webcams', prefix: '', chips: ['Flow', 'Flow Pro', 'Flow 2 Pro', 'Link', 'Link 2', 'Link 2C'] },
  ],
};

export const OSMO: Brand = {
  id: 'osmo',
  name: 'DJI',
  root: 'osmo',
  groups: [
    { title: 'Osmo Action', prefix: '', chips: ['Osmo Action', 'Action 2', 'Osmo Action 3', 'Osmo Action 4', 'Osmo Action 5 Pro', 'Osmo Action 6'] },
    { title: 'Osmo Pocket', prefix: '', chips: ['Osmo Pocket', 'Osmo Pocket 2', 'Osmo Pocket 3', 'Osmo Pocket 4', 'Osmo Pocket 4P'] },
    { title: '360, Nano and gimbals', prefix: '', chips: ['Osmo 360', 'Osmo Nano', 'Osmo Mobile 2', 'Osmo Mobile 3', 'Osmo Mobile 6', 'Osmo Mobile SE', 'Osmo Mobile 7', 'Osmo Mobile 7P', 'Osmo Mobile 8', 'Osmo Mobile 8P'] },
    { title: 'OM gimbals', prefix: '', chips: ['OM 4', 'OM 4 SE', 'OM 5'] },
  ],
  lines: [
    { id: 'action', label: 'Osmo Action', groupTitles: ['Osmo Action'] },
    { id: 'pocket', label: 'Osmo Pocket', groupTitles: ['Osmo Pocket'] },
    { id: 'osmo', label: '360 and gimbals', groupTitles: ['360, Nano and gimbals'] },
    { id: 'om', label: 'DJI OM', groupTitles: ['OM gimbals'] },
  ],
};

// ---- the brand lists behind each product ---------------------------

export const GPU_BRANDS = [
  { name: 'Nvidia', brand: NVIDIA },
  { name: 'AMD Radeon', brand: RADEON },
  { name: 'Intel Arc', brand: INTEL_ARC },
];

export const TV_BRANDS = [
  { name: 'Samsung', brand: SAMSUNG_TV },
  { name: 'LG', brand: LG_TV },
  { name: 'Sony', brand: SONY_TV },
  { name: 'TCL', brand: TCL_TV },
  { name: 'Hisense', brand: HISENSE_TV },
  { name: 'Panasonic', brand: PANASONIC_TV },
  { name: 'Philips', brand: PHILIPS_TV },
  { name: 'Toshiba', brand: TOSHIBA_TV },
  { name: 'Sharp', brand: SHARP_TV },
  { name: 'Amazon Fire TV', brand: FIRE_TV },
  { name: 'Sky Glass', brand: SKY_GLASS },
];

export const DRONE_BRANDS = [
  { name: 'DJI', brand: DJI },
  { name: 'Autel Robotics', brand: AUTEL },
  { name: 'Parrot', brand: PARROT },
  { name: 'HoverAir', brand: HOVERAIR },
  { name: 'Skydio', brand: SKYDIO },
  { name: 'Ryze · Tello', brand: RYZE },
  { name: 'Holy Stone', brand: HOLY_STONE },
  { name: 'Potensic', brand: POTENSIC },
  { name: 'Hubsan', brand: HUBSAN },
];

export const CAMERA_BRANDS = [
  { name: 'Canon', brand: CANON },
  { name: 'Nikon', brand: NIKON },
  { name: 'Sony', brand: SONY_CAMERA },
  { name: 'Fujifilm', brand: FUJIFILM },
  { name: 'Panasonic', brand: PANASONIC },
  { name: 'Olympus / OM', brand: OLYMPUS },
  { name: 'Leica', brand: LEICA },
  { name: 'Pentax / Ricoh', brand: PENTAX },
  { name: 'Film', brand: FILM_CAMERA },
];

export const LENS_BRANDS = [
  { name: 'Canon', brand: CANON_LENS },
  { name: 'Nikon', brand: NIKON_LENS },
  { name: 'Sony', brand: SONY_LENS },
  { name: 'Sigma', brand: SIGMA_LENS },
  { name: 'Tamron', brand: TAMRON_LENS },
  { name: 'Fujifilm XF / XC', brand: FUJI_LENS },
  { name: 'Panasonic Lumix', brand: PANASONIC_LENS },
  { name: 'Olympus / OM System', brand: OM_LENS },
  { name: 'Samyang', brand: SAMYANG_LENS },
  { name: 'Viltrox', brand: VILTROX_LENS },
  { name: 'Laowa', brand: LAOWA_LENS },
  { name: 'Tokina', brand: TOKINA_LENS },
];

// the picker header each brand introduces itself with
export const BRAND_HEADERS: Record<string, { title: string; accent: string; subtitle: string }> = {
  'nvidia': { title: 'Which Nvidia', accent: 'models?', subtitle: 'RTX cards first, then the GTX ones that still sell.' },
  'radeon': { title: 'Which Radeon', accent: 'models?', subtitle: 'Newest RX first, the old 500s and Vega at the bottom.' },
  'intelarc': { title: 'Which Intel Arc', accent: 'models?', subtitle: 'Battlemage first, then the older Alchemist cards.' },
  'samsungtv': { title: 'Which Samsung', accent: 'models?', subtitle: 'Series code, not screen size — QLED, OLED, Crystal UHD or The Frame.' },
  'lgtv': { title: 'Which LG', accent: 'models?', subtitle: 'The OLED letter is the year: C1 is 2021, C6 is 2026.' },
  'sonytv': { title: 'Which Sony', accent: 'models?', subtitle: 'Older sets use X and A codes, the new ones are just Bravia 5 to 9.' },
  'tcltv': { title: 'Which TCL', accent: 'models?', subtitle: 'C series is the mini LED line, P and S sit below it.' },
  'hisensetv': { title: 'Which Hisense', accent: 'models?', subtitle: 'U8 and U7 are the mini LEDs, E7 and A6 the cheaper sets.' },
  'panasonictv': { title: 'Which Panasonic', accent: 'models?', subtitle: 'Sold as Viera — OLED codes first, then LED and the old plasmas.' },
  'philipstv': { title: 'Which Philips', accent: 'models?', subtitle: 'Ambilight sets, listed by their OLED number or PUS code.' },
  'toshibatv': { title: 'Which Toshiba', accent: 'models?', subtitle: 'Toshiba sells by code — the middle letters are the series.' },
  'sharptv': { title: 'Which Sharp', accent: 'models?', subtitle: 'Sharp sells as Aquos, so pick the panel type.' },
  'firetv': { title: 'Which Fire TV', accent: 'models?', subtitle: 'Amazon own-brand sets, Omni at the top and the number series below.' },
  'skyglass': { title: 'Which Sky Glass', accent: 'models?', subtitle: 'Only three so far — two Glass generations and the Air.' },
  'dji': { title: 'Which DJI', accent: 'models?', subtitle: 'mini, mavic, air, avata, phantom and inspire drones' },
  'autel': { title: 'Which Autel', accent: 'models?', subtitle: 'the evo nano, lite, ii and max drones' },
  'parrot': { title: 'Which Parrot', accent: 'models?', subtitle: 'anafi, bebop and the older parrot fliers' },
  'hoverair': { title: 'Which HoverAir', accent: 'models?', subtitle: 'the x1 palm-launch selfie drones' },
  'skydio': { title: 'Which Skydio', accent: 'models?', subtitle: 'the self-flying 2 and 2+, plus the older r1' },
  'ryze': { title: 'Which Tello', accent: 'models?', subtitle: 'the little dji-powered tello, still everywhere' },
  'holystone': { title: 'Which Holy Stone', accent: 'models?', subtitle: 'the hs-number drones that flood listings' },
  'potensic': { title: 'Which Potensic', accent: 'models?', subtitle: 'atom, dreamer and the older budget models' },
  'hubsan': { title: 'Which Hubsan', accent: 'models?', subtitle: 'zino, ace and the old x4 fliers' },
  'canon': { title: 'Which Canon', accent: 'models?', subtitle: 'mirrorless, DSLR and compacts kept apart.' },
  'nikon': { title: 'Which Nikon', accent: 'models?', subtitle: 'Z mirrorless, the D DSLRs and Coolpix.' },
  'sonycamera': { title: 'Which Sony', accent: 'models?', subtitle: 'A7 full frame, A6000 crop bodies, ZV and RX compacts.' },
  'fujifilm': { title: 'Which Fujifilm', accent: 'models?', subtitle: 'X series, GFX medium format and the Instax cameras.' },
  'panasonic': { title: 'Which Lumix', accent: 'models?', subtitle: 'S full frame, GH video bodies, G crop and compacts.' },
  'olympus': { title: 'Which Olympus', accent: 'models?', subtitle: 'OM-D, PEN and Tough, plus the newer OM System bodies.' },
  'leica': { title: 'Which Leica', accent: 'models?', subtitle: 'M rangefinders, Q, SL and the D-Lux compacts.' },
  'pentax': { title: 'Which Pentax', accent: 'or Ricoh?', subtitle: 'K-mount DSLRs, the film bodies and the GR pocket compacts.' },
  'filmcamera': { title: 'Which film', accent: 'cameras?', subtitle: 'the old bodies that still sell for real money.' },
  'canonlens': { title: 'Which Canon', accent: 'lenses?', subtitle: 'RF mirrorless and EF DSLR glass kept apart.' },
  'nikonlens': { title: 'Which Nikon', accent: 'lenses?', subtitle: 'Nikkor Z mirrorless and F-mount DSLR glass.' },
  'sonylens': { title: 'Which Sony', accent: 'lenses?', subtitle: 'FE full frame and E-mount APS-C lenses.' },
  'sigmalens': { title: 'Which Sigma', accent: 'lenses?', subtitle: 'art primes, the dg dn mirrorless line, dc dn for aps-c and the old ex zooms' },
  'tamronlens': { title: 'Which Tamron', accent: 'lenses?', subtitle: 'the di iii mirrorless zooms plus the old 17-50 and 28-75 people still buy' },
  'fujilens': { title: 'Which Fujifilm', accent: 'lenses?', subtitle: 'xf primes, the xf zooms and the xc kit glass that comes off body bundles' },
  'panasoniclens': { title: 'Which Lumix', accent: 'lenses?', subtitle: 'l mount s glass, micro four thirds g zooms and the leica dg line' },
  'omlens': { title: 'Which M.Zuiko', accent: 'lenses?', subtitle: 'olympus and om system micro four thirds glass, pro zooms down to the cheap primes' },
  'samyanglens': { title: 'Which Samyang', accent: 'lenses?', subtitle: 'the cheap af primes, the manual focus classics and the cine versions' },
  'viltroxlens': { title: 'Which Viltrox', accent: 'lenses?', subtitle: 'the cheap af primes people buy for fuji, sony e and nikon z' },
  'laowalens': { title: 'Which Laowa', accent: 'lenses?', subtitle: 'the macro and ultra wide specials, the probe lens and the argus fast primes' },
  'tokinalens': { title: 'Which Tokina', accent: 'lenses?', subtitle: 'the 11-16 and 11-20 wide zooms, the atx primes and the atx-m mirrorless line' },
  'gopro': { title: 'Which GoPro', accent: 'models?', subtitle: 'Hero generations, the 360 bodies and the old Session cubes.' },
  'insta360': { title: 'Which Insta360', accent: 'models?', subtitle: 'The 360 X bodies first, then the small ones and the gimbals.' },
  'osmo': { title: 'Which DJI Osmo', accent: 'models?', subtitle: 'Action, Pocket, the 360 and the phone gimbals.' },
};

// the one-liner under each brand name on the picker card
export const BRAND_SUBLINES: Record<string, string> = {
  'nvidia': 'RTX 50 · 40 · 30 · 20 · GTX',
  'radeon': 'RX 9000 down to RX 500',
  'intelarc': 'Arc B and A series',
  'samsungtv': 'QLED, Neo QLED, OLED, The Frame',
  'lgtv': 'OLED C, G and B, QNED, NanoCell',
  'sonytv': 'Bravia XR OLED, X90 LED, Bravia 7/8/9',
  'tcltv': 'C series mini LED, P and S series',
  'hisensetv': 'U8, U7, U6 mini LED, E7 and A6',
  'panasonictv': 'Viera OLED Z, LZ and MZ, plus plasma',
  'philipstv': 'Ambilight OLED, The One, PUS LED',
  'toshibatv': 'UK and UL 4K, QLED and Fire TV',
  'sharptv': 'Aquos 4K, QLED and XLED',
  'firetv': 'Omni, Omni QLED, 4 Series',
  'skyglass': 'Glass Gen 1, Gen 2 and the Air',
  'dji': 'Mini, Mavic, Air, Avata/FPV, Phantom and Inspire',
  'autel': 'EVO Nano, Lite, II and Max',
  'parrot': 'Anafi, Bebop and the mini fliers',
  'hoverair': 'X1, X1 Pro and ProMax',
  'skydio': 'Skydio 2, 2+, R1 and the X enterprise ones',
  'ryze': 'Tello, Tello EDU and combos',
  'holystone': 'HS700/HS720, GPS and beginner models',
  'potensic': 'Atom, Dreamer and the older budget models',
  'hubsan': 'Zino, ACE and X4',
  'canon': 'EOS R, EOS M, DSLRs and PowerShot',
  'nikon': 'Z mirrorless, D DSLRs and Coolpix',
  'sonycamera': 'A7, A6000, ZV and RX',
  'fujifilm': 'X-T, X100, GFX and Instax',
  'panasonic': 'S, GH, G and compacts',
  'olympus': 'OM-D, PEN, Tough and OM System',
  'leica': 'M, Q, SL and D-Lux',
  'pentax': 'Pentax K DSLRs and Ricoh GR',
  'filmcamera': '35mm SLRs, compacts and medium format',
  'canonlens': 'RF mirrorless · EF and EF-S DSLR',
  'nikonlens': 'Nikkor Z · F-mount and DX',
  'sonylens': 'FE full frame · E-mount APS-C',
  'sigmalens': 'Art primes, DG DN mirrorless, DC DN and the old EX zooms',
  'tamronlens': 'Di III mirrorless zooms, DSLR classics and SP primes',
  'fujilens': 'XF primes, XF zooms and the XC kit lenses',
  'panasoniclens': 'Lumix S for L mount, Lumix G and Leica DG',
  'omlens': 'Pro zooms, Pro primes, kit and telephoto zooms',
  'samyanglens': 'AF primes, manual classics, Cine and V-AF',
  'viltroxlens': 'Air, Pro and LAB primes for APS-C and full frame',
  'laowalens': 'Macro, ultra wide, shift and probe, plus Argus',
  'tokinalens': '11-16 and 11-20 wide zooms, atx-m and SZ',
};

// spellings sellers use for the same thing, merged into the shared alias table
export const ELECTRONICS_ALIASES: Record<string, string> = {
  'ar.drone': 'ar drone',
  'frame': 'ls03',
  'serif': 'ls01',
  'sero': 'ls05',
  'nanocell': 'nano cell',
  'x90j': 'x89j',
  'x90k': 'x89k',
  'hoverair': 'hover air',
  'promax': 'pro max',
  'holy stone': 'holystone',
  'phantom 4 pro v2': 'phantom 4 pro v2.0',
  'evo nano+': 'evo nano plus',
  'evo lite+': 'evo lite plus',
  '2+': '2 plus',
  'zino 2+': 'zino 2 plus',
  'mavic mini': 'mini 1',
  'mini 4k': 'mini 4 k',
  'ef 50mm f/1.8 stm': 'nifty fifty',
  'af-s 105mm macro': 'af-s 105mm micro',
  'af-s 60mm macro': 'af-s 60mm micro',
  'z mc 105mm macro': 'z mc 105mm micro',
  'e 16-50mm pz': 'selp1650',
  'fe 28-70mm oss': 'sel2870',
  'e 55-210mm': 'sel55210',
  'fe 90mm macro': 'fe 90mm f/2.8 macro g',
  'samyang': 'rokinon',
  'laowa': 'venus optics',
  'om system': 'olympus',
  'lumix': 'panasonic',
  'leica dg': 'panasonic leica',
  'one x2': 'x2',
  '2000d': 'rebel t7',
  '4000d': 'rebel t100',
  '1300d': 'rebel t6',
  '1200d': 'rebel t5',
  '250d': 'rebel sl3',
  '200d': 'rebel sl2',
  '100d': 'rebel sl1',
  '850d': 'rebel t8i',
  '800d': 'rebel t7i',
  '750d': 'rebel t6i',
  '700d': 'rebel t5i',
  '600d': 'rebel t3i',
  'x-t1': 'xt1',
  'x-t2': 'xt2',
  'x-t3': 'xt3',
  'x-t4': 'xt4',
  'x-t5': 'xt5',
  'x-t10': 'xt10',
  'x-t20': 'xt20',
  'x-t30': 'xt30',
  'x-t50': 'xt50',
  'x-s10': 'xs10',
  'x-s20': 'xs20',
  'x-h1': 'xh1',
  'x-h2': 'xh2',
  'x-e3': 'xe3',
  'x-e4': 'xe4',
  'x-e5': 'xe5',
  'x-pro2': 'xpro2',
  'x-pro3': 'xpro3',
  'x-m5': 'xm5',
  'e-m10': 'em10',
  'e-m5': 'em5',
  'e-m1': 'em1',
  'e-m1x': 'em1x',
  'e-pl8': 'epl8',
  'e-pl9': 'epl9',
  'e-pl10': 'epl10',
  'e-p7': 'ep7',
  'zfc': 'z fc',
  'zf': 'z f',
  'a7': 'alpha 7',
  'g80': 'g85',
  'gx80': 'gx85',
};
