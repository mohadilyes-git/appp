import Svg, { Path } from 'react-native-svg';

// the ten category glyphs from the design file, one path each
const PATHS: Record<string, string> = {
  phones:
    'M7.4 1.8h9.2A2.4 2.4 0 0 1 19 4.2v15.6a2.4 2.4 0 0 1-2.4 2.4H7.4A2.4 2.4 0 0 1 5 19.8V4.2a2.4 2.4 0 0 1 2.4-2.4zm4.6 16.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z',
  consoles:
    'M7.6 6.4h8.8a5.6 5.6 0 0 1 5.5 6.6l-.7 3.8a2.7 2.7 0 0 1-4.8 1.2l-1.7-2.2H9.3l-1.7 2.2a2.7 2.7 0 0 1-4.8-1.2l-.7-3.8a5.6 5.6 0 0 1 5.5-6.6zm-1 3.4v1.6H5v1.8h1.6v1.6h1.8v-1.6H10v-1.8H8.4V9.8zm9.6.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zm2.4 2.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z',
  electronics:
    'M4.6 4.2h14.8a1.6 1.6 0 0 1 1.6 1.6v9.4H3V5.8a1.6 1.6 0 0 1 1.6-1.6zM1.6 16.6h20.8l-1.5 2.6a1.6 1.6 0 0 1-1.4.8H4.5a1.6 1.6 0 0 1-1.4-.8z',
  cars: 'M5.4 10.4 7 6.2a2.2 2.2 0 0 1 2-1.4h6a2.2 2.2 0 0 1 2 1.4l1.6 4.2 1.6.8a2 2 0 0 1 1.1 1.8v3.6a1.2 1.2 0 0 1-1.2 1.2H19v.6a1.6 1.6 0 0 1-3.2 0v-.6H8.2v.6a1.6 1.6 0 0 1-3.2 0v-.6H3.9a1.2 1.2 0 0 1-1.2-1.2V13a2 2 0 0 1 1.1-1.8zm2.2-.2h8.8L15.2 7H8.8zM6 13.4a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6zm12 0a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z',
  couches:
    'M4.4 9.6V7.4A2.4 2.4 0 0 1 6.8 5h10.4a2.4 2.4 0 0 1 2.4 2.4v2.2a2.8 2.8 0 0 0-2 2.7v1.3H5.4V12a2.8 2.8 0 0 0-1-2.4zM2.4 12a1.6 1.6 0 0 1 3.2 0v3.4h12.8V12a1.6 1.6 0 0 1 3.2 0v5.4a1.6 1.6 0 0 1-1.6 1.6H4a1.6 1.6 0 0 1-1.6-1.6z',
  furniture:
    'M4.6 3h14.8A1.6 1.6 0 0 1 21 4.6v14.8a1.6 1.6 0 0 1-1.6 1.6H4.6A1.6 1.6 0 0 1 3 19.4V4.6A1.6 1.6 0 0 1 4.6 3zm4.6 4.2v1.8h5.6V7.2zm0 6.6v1.8h5.6v-1.8z',
  trailers:
    'M2.6 6.6h13.6a1.4 1.4 0 0 1 1.4 1.4v6.4H2.6a1.4 1.4 0 0 1-1.4-1.4V8a1.4 1.4 0 0 1 1.4-1.4zM18.4 12h1.9l2.5 2.4h-4.4zM6.4 15.2a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4zm7.6 0a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4z',
  kitchen:
    'M5.6 2.4h12.8A1.6 1.6 0 0 1 20 4v16a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 20V4a1.6 1.6 0 0 1 1.6-1.6zM7 5v1.9h4V5zm5 6.8a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8z',
  diabetic:
    'M6.6 2.6h10.8A1.6 1.6 0 0 1 19 4.2v15.6a1.6 1.6 0 0 1-1.6 1.6H6.6A1.6 1.6 0 0 1 5 19.8V4.2a1.6 1.6 0 0 1 1.6-1.6zM8.4 6v6.4h7.2V6zm3 8.8v1.7H9.7v1.8h1.7v1.7h1.8v-1.7h1.7v-1.8h-1.7v-1.7z',
  other: 'M3.4 3.4h7.2v7.2H3.4zM13.4 3.4h7.2v7.2h-7.2zM3.4 13.4h7.2v7.2H3.4zM13.4 13.4h7.2v7.2h-7.2z',
};

export function CategoryIcon({ id, color, size = 20 }: { id: string; color: string; size?: number }) {
  const d = PATHS[id];
  if (!d) return null;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d={d} />
    </Svg>
  );
}

export function SearchIcon({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M10.6 2.6a8 8 0 1 1-5 14.2l-3.3 3.3-1.6-1.6 3.3-3.3a8 8 0 0 1 6.6-12.6zm0 2.2a5.8 5.8 0 1 0 0 11.6 5.8 5.8 0 0 0 0-11.6z" />
    </Svg>
  );
}

export function CheckIcon({ color, size = 12 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M9.6 16.2 4.8 11.4l1.7-1.7 3.1 3.1 7.9-7.9 1.7 1.7z" />
    </Svg>
  );
}

export function PinIcon({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M12 2.2a7.4 7.4 0 0 1 7.4 7.4c0 5.2-7.4 12.2-7.4 12.2S4.6 14.8 4.6 9.6A7.4 7.4 0 0 1 12 2.2zm0 4.6a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8z" />
    </Svg>
  );
}
