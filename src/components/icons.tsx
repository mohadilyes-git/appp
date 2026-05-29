import Svg, { Circle, Path, Rect } from 'react-native-svg';

type IconProps = {
  color: string;
  size?: number;
};

// every glyph in the app, taken straight from the design file

export function HomeIcon({ color, size = 28 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M12 2.8 22 11.2h-3v9.5h-4.4V15h-5.2v5.7H5v-9.5H2z" />
    </Svg>
  );
}

export function BoltIcon({ color, size = 28 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M13.6 1.6 4 14.6h5.9l-.8 7.8L20 9.4h-6z" />
    </Svg>
  );
}

export function PeopleIcon({ color, size = 28 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M9.4 11.6a4.4 4.4 0 1 0 0-8.8 4.4 4.4 0 0 0 0 8.8zm0 1.9c-3.9 0-7.4 2.2-7.4 5.4v2.5h14.8v-2.5c0-3.2-3.5-5.4-7.4-5.4z" />
      <Path d="M17.3 11.4a3.5 3.5 0 1 0-1.2-6.8 6.2 6.2 0 0 1 0 6.6c.38.13.78.2 1.2.2zm.5 1.9c-.7 0-1.36.07-1.98.2 1.6 1.24 2.58 2.98 2.58 5.03v2.87H22.6v-2.7c0-2.98-2.6-5.4-4.8-5.4z" />
    </Svg>
  );
}

export function SlidersIcon({ color, size = 28 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Rect x="2.6" y="5.2" width="18.8" height="2.4" rx="1.2" />
      <Rect x="2.6" y="10.8" width="18.8" height="2.4" rx="1.2" />
      <Rect x="2.6" y="16.4" width="18.8" height="2.4" rx="1.2" />
      <Circle cx="9" cy="6.4" r="3.2" />
      <Circle cx="15.6" cy="12" r="3.2" />
      <Circle cx="7.6" cy="17.6" r="3.2" />
    </Svg>
  );
}

export function BellIcon({ color, size = 19 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M12 2.6a6.3 6.3 0 0 1 6.3 6.3v4.4l1.7 3a1 1 0 0 1-.9 1.5H4.9a1 1 0 0 1-.9-1.5l1.7-3V8.9A6.3 6.3 0 0 1 12 2.6zM9.4 19.3h5.2a2.6 2.6 0 0 1-5.2 0z" />
    </Svg>
  );
}
