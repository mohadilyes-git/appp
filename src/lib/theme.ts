// colours for the app screens. the auth screens are dark on purpose and keep
// their own values, so nothing in here touches them.

export const font = {
  display: 'SpaceGrotesk_600SemiBold',
  displayBold: 'SpaceGrotesk_700Bold',
  body: 'Manrope_400Regular',
  medium: 'Manrope_600SemiBold',
  bold: 'Manrope_700Bold',
  heavy: 'Manrope_800ExtraBold',
};

export const radius = {
  pill: 999,
  hero: 26,
  panel: 22,
  chip: 20,
  card: 18,
  button: 16,
  thumb: 14,
  segment: 12,
  tile: 11,
  tag: 7,
};

// the design writes letter spacing in em, react native wants pixels
export function tracking(fontSize: number, em: number) {
  return fontSize * em;
}

// the blue gradients look the same in both themes, white text sits on them either way
// as const keeps these as fixed pairs and triples, which is what the gradient wants
export const gradients = {
  hero: ['#2f6fed', '#1c47a8', '#12295f'] as const,
  heroStops: [0, 0.58, 1] as const,
  avatar: ['#2f6fed', '#173a80'] as const,
};

const lightColors = {
  bgTop: '#ffffff',
  bgMid: '#eef1f6',
  bgBottom: '#dbe3ef',

  surfaceCard: '#ffffff',
  surfaceRaised: '#f4f6fa',
  surfaceRaisedAlt: '#e9edf4',
  surfaceWash: 'rgba(14,17,22,.06)',
  surfaceWashStrong: 'rgba(14,17,22,.07)',
  surfaceDock: 'rgba(255,255,255,.85)',

  textPrimary: '#0e1116',
  textSecondary: 'rgba(14,17,22,.5)',
  textTertiary: 'rgba(14,17,22,.45)',
  textLabel: 'rgba(14,17,22,.42)',
  textMuted: 'rgba(14,17,22,.4)',
  textTag: 'rgba(14,17,22,.55)',
  textFaint: 'rgba(14,17,22,.3)',
  textOnBrand: '#ffffff',

  accentText: '#2f6fed',
  accentFill: '#2f6fed',
  accentBrand: '#2f6fed',
  accentChip: 'rgba(47,111,237,.17)',
  accentTint: 'rgba(47,111,237,.12)',
  accentFaint: 'rgba(47,111,237,.06)',
  accentDashed: 'rgba(47,111,237,.45)',
  accentPressBorder: 'rgba(47,111,237,.35)',

  positive: '#137c4a',
  positiveTint: 'rgba(19,124,74,.12)',
  warning: '#b06f0a',
  warningTint: 'rgba(216,140,20,.12)',

  borderCard: 'rgba(14,17,22,.08)',
  borderButton: 'rgba(14,17,22,.1)',
  heroRule: 'rgba(255,255,255,.2)',
  toggleOff: 'rgba(14,17,22,.18)',
  railPaused: 'rgba(14,17,22,.2)',
  dotPaused: 'rgba(14,17,22,.25)',

  tabInactive: 'rgba(14,17,22,.4)',
  // the ring around the new-listings dot, sits on whatever the dock sits on
  dotRing: '#ffffff',

  // stands in for an item photo until there is one
  photoEmpty: '#e8ecf3',

  // form fields
  surfaceField: 'rgba(14,17,22,.04)',
  borderField: 'rgba(14,17,22,.1)',
  textPlaceholder: 'rgba(14,17,22,.34)',
  textHint: 'rgba(14,17,22,.4)',

  // empty photo slots
  slotBg: 'rgba(47,111,237,.06)',
  slotBorder: 'rgba(47,111,237,.4)',
  ghostBorder: 'rgba(14,17,22,.14)',
  ghostFg: 'rgba(14,17,22,.24)',

  negative: '#be2828',
  negativeTint: 'rgba(190,40,40,.08)',
  negativeBorder: 'rgba(190,40,40,.2)',
  positiveBorder: 'rgba(19,124,74,.2)',
  // text sitting on the positive colour, dark mode's green needs dark text
  onPositive: '#ffffff',

  textBody: 'rgba(14,17,22,.72)',
  secondaryButton: 'rgba(14,17,22,.05)',

  // the fade behind a pinned action bar, so content scrolls under it
  barFadeFrom: 'rgba(240,243,248,0)',
  barFadeTo: 'rgba(240,243,248,.96)',
  // bgMid at zero alpha. 'transparent' fades through black and leaves a grey smear
  bgMidFade: 'rgba(238,241,246,0)',
};

// light sets the shape, so typescript makes sure dark fills in every single one
export type Colors = typeof lightColors;

const darkColors: Colors = {
  bgTop: '#1c2331',
  bgMid: '#12161f',
  bgBottom: '#090c12',

  surfaceCard: '#161b26',
  surfaceRaised: '#202634',
  surfaceRaisedAlt: '#252c3a',
  surfaceWash: 'rgba(255,255,255,.08)',
  surfaceWashStrong: 'rgba(255,255,255,.1)',
  surfaceDock: 'rgba(21,26,36,.88)',

  textPrimary: '#eef2f8',
  textSecondary: 'rgba(255,255,255,.6)',
  textTertiary: 'rgba(255,255,255,.5)',
  textLabel: 'rgba(255,255,255,.48)',
  textMuted: 'rgba(255,255,255,.46)',
  textTag: 'rgba(255,255,255,.56)',
  textFaint: 'rgba(255,255,255,.31)',
  textOnBrand: '#ffffff',

  accentText: '#8fb4ff',
  accentFill: '#4a86ff',
  accentBrand: '#2f6fed',
  accentChip: 'rgba(74,134,255,.2)',
  accentTint: 'rgba(74,134,255,.18)',
  accentFaint: 'rgba(122,162,255,.08)',
  accentDashed: 'rgba(122,162,255,.41)',
  accentPressBorder: 'rgba(122,162,255,.38)',

  positive: '#4fd695',
  positiveTint: 'rgba(52,199,123,.16)',
  warning: '#f0aa3c',
  warningTint: 'rgba(240,170,60,.16)',

  borderCard: 'rgba(255,255,255,.1)',
  borderButton: 'rgba(255,255,255,.12)',
  heroRule: 'rgba(255,255,255,.2)',
  toggleOff: 'rgba(255,255,255,.18)',
  railPaused: 'rgba(255,255,255,.18)',
  dotPaused: 'rgba(255,255,255,.26)',

  tabInactive: 'rgba(255,255,255,.45)',
  dotRing: '#12161f',

  photoEmpty: '#232a38',

  surfaceField: 'rgba(255,255,255,.06)',
  borderField: 'rgba(255,255,255,.12)',
  textPlaceholder: 'rgba(255,255,255,.35)',
  textHint: 'rgba(255,255,255,.42)',

  slotBg: 'rgba(122,162,255,.09)',
  slotBorder: 'rgba(122,162,255,.45)',
  ghostBorder: 'rgba(255,255,255,.14)',
  ghostFg: 'rgba(255,255,255,.26)',

  negative: '#ff7a7a',
  negativeTint: 'rgba(255,122,122,.1)',
  negativeBorder: 'rgba(255,122,122,.24)',
  positiveBorder: 'rgba(62,207,142,.24)',
  onPositive: '#07130d',

  textBody: 'rgba(255,255,255,.72)',
  secondaryButton: 'rgba(255,255,255,.07)',

  barFadeFrom: 'rgba(9,12,18,0)',
  barFadeTo: 'rgba(9,12,18,.94)',
  bgMidFade: 'rgba(18,22,31,0)',
};

// css blur roughly halves when you turn it into a react native shadow radius
const lightShadows = {
  hero: {
    shadowColor: '#1c47a8',
    shadowOpacity: 0.36,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 20 },
    elevation: 14,
  },
  dock: {
    shadowColor: '#193269',
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 18 },
    elevation: 12,
  },
  panel: {
    shadowColor: '#193269',
    shadowOpacity: 0.07,
    shadowRadius: 13,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  card: {
    shadowColor: '#193269',
    shadowOpacity: 0.06,
    shadowRadius: 11,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  pill: {
    shadowColor: '#2f6fed',
    shadowOpacity: 0.32,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  // the big blue action buttons, softer than the profit card
  cta: {
    shadowColor: '#1c47a8',
    shadowOpacity: 0.32,
    shadowRadius: 17,
    shadowOffset: { width: 0, height: 16 },
    elevation: 12,
  },
  button: {
    shadowColor: '#193269',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sold: {
    shadowColor: '#137c4a',
    shadowOpacity: 0.3,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
};

export type Shadows = typeof lightShadows;

// on dark the borders do the lifting, so most of these are nearly invisible
const darkShadows: Shadows = {
  hero: {
    shadowColor: '#1c47a8',
    shadowOpacity: 0.36,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 20 },
    elevation: 14,
  },
  dock: {
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 18 },
    elevation: 12,
  },
  panel: {
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 13,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  card: {
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 11,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  pill: {
    shadowColor: '#2f6fed',
    shadowOpacity: 0.32,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  cta: {
    shadowColor: '#1c47a8',
    shadowOpacity: 0.32,
    shadowRadius: 17,
    shadowOffset: { width: 0, height: 16 },
    elevation: 12,
  },
  button: {
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sold: {
    shadowColor: '#3ecf8e',
    shadowOpacity: 0.28,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
};

export const themes = {
  light: { colors: lightColors, shadows: lightShadows },
  dark: { colors: darkColors, shadows: darkShadows },
};
