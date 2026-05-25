import { StyleSheet } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { useTheme } from '@/lib/theme-context';

type Props = {
  width: number;
  height: number;
};

// the soft wash sitting behind every screen inside the app
export default function AppBackground({ width, height }: Props) {
  const { colors, resolved } = useTheme();
  // the id carries the theme so a light gradient never gets reused on dark
  const id = `app-bg-${resolved}`;

  return (
    <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
      <Defs>
        <RadialGradient id={id} cx="50%" cy="0%" rx="120%" ry="90%">
          <Stop offset="0%" stopColor={colors.bgTop} />
          <Stop offset="52%" stopColor={colors.bgMid} />
          <Stop offset="100%" stopColor={colors.bgBottom} />
        </RadialGradient>
      </Defs>
      <Rect width={width} height={height} fill={`url(#${id})`} />
    </Svg>
  );
}
