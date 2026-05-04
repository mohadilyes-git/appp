import { StyleSheet } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

type Props = {
  width: number;
  height: number;
  topGlow?: number;
  bottomGlow?: number;
  halo?: boolean;
};

// graphite base + blue glows, shared by the auth screens
export default function GlowBackground({
  width,
  height,
  topGlow = 0.55,
  bottomGlow = 0.85,
  halo = true,
}: Props) {
  return (
    <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
      <Defs>
        <RadialGradient id="base" cx="50%" cy="10%" rx="120%" ry="80%">
          <Stop offset="0%" stopColor="#2a2d33" />
          <Stop offset="45%" stopColor="#131519" />
          <Stop offset="100%" stopColor="#07080c" />
        </RadialGradient>
        <RadialGradient id="glowTop" cx="50%" cy="-14%" rx="80%" ry="34%">
          <Stop offset="0%" stopColor="#2f6fed" stopOpacity={topGlow} />
          <Stop offset="72%" stopColor="#2f6fed" stopOpacity={0} />
        </RadialGradient>
        <RadialGradient id="glowBottom" cx="50%" cy="112%" rx="95%" ry="48%">
          <Stop offset="0%" stopColor="#2f6fed" stopOpacity={bottomGlow} />
          <Stop offset="74%" stopColor="#2f6fed" stopOpacity={0} />
        </RadialGradient>
        <RadialGradient id="halo" cx="50%" cy="46%" rx="55%" ry="34%">
          <Stop offset="0%" stopColor="#78a0ff" stopOpacity={0.14} />
          <Stop offset="70%" stopColor="#78a0ff" stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Rect width={width} height={height} fill="url(#base)" />
      <Rect width={width} height={height} fill="url(#glowTop)" />
      <Rect width={width} height={height} fill="url(#glowBottom)" />
      {halo && <Rect width={width} height={height} fill="url(#halo)" />}
    </Svg>
  );
}
