import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';

import { BoltIcon, HomeIcon, PeopleIcon, SlidersIcon } from '@/components/icons';
import { radius } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';

const RESTING = { inset: 18, height: 68, bottom: 18 };
const AWAKE = { inset: 30, height: 76, bottom: 30 };

const SIDE_PADDING = 8;
const SLIDE_MS = 420;
const SETTLE_MS = 320;
const RELAX_AFTER_MS = 2500;

const TABS = [
  { name: 'index', Icon: HomeIcon },
  { name: 'listings', Icon: BoltIcon },
  { name: 'feed', Icon: PeopleIcon },
  { name: 'settings', Icon: SlidersIcon },
];

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  const { colors, shadows, resolved } = useTheme();
  const { width: screenWidth } = useWindowDimensions();

  const slide = useRef(new Animated.Value(state.index)).current;
  const awake = useRef(new Animated.Value(0)).current;
  const relaxTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // tapping pinches the dock in, lifts it and lets it stand a little taller
  const inset = awake.interpolate({ inputRange: [0, 1], outputRange: [RESTING.inset, AWAKE.inset] });
  const height = awake.interpolate({
    inputRange: [0, 1],
    outputRange: [RESTING.height, AWAKE.height],
  });
  const bottom = awake.interpolate({
    inputRange: [0, 1],
    outputRange: [RESTING.bottom, AWAKE.bottom],
  });

  // the slot follows the dock as it narrows, so the chip stays under its icon
  const slotWidth = Animated.divide(
    Animated.subtract(screenWidth - SIDE_PADDING * 2, Animated.multiply(inset, 2)),
    TABS.length,
  );
  const translateX = Animated.multiply(slide, slotWidth);

  useEffect(() => {
    Animated.timing(slide, {
      toValue: state.index,
      duration: SLIDE_MS,
      easing: Easing.bezier(0.22, 0.9, 0.32, 1),
      useNativeDriver: false,
    }).start();
  }, [state.index, slide]);

  // don't leave a countdown running if the bar unmounts
  useEffect(() => {
    return () => {
      if (relaxTimer.current) clearTimeout(relaxTimer.current);
    };
  }, []);

  function wake() {
    if (relaxTimer.current) clearTimeout(relaxTimer.current);

    Animated.spring(awake, {
      toValue: 1,
      friction: 7,
      tension: 90,
      useNativeDriver: false,
    }).start();

    relaxTimer.current = setTimeout(() => {
      Animated.timing(awake, {
        toValue: 0,
        duration: SETTLE_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }, RELAX_AFTER_MS);
  }

  return (
    <Animated.View
      style={[styles.shadow, { left: inset, right: inset, bottom, height }, shadows.dock]}
      pointerEvents="box-none">
      <View style={[styles.dock, { borderColor: colors.borderCard }]}>
        <BlurView intensity={30} tint={resolved} style={StyleSheet.absoluteFill} />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.surfaceDock }]} />

        {/* one chip that glides between tabs instead of four that pop */}
        <Animated.View
          style={[styles.indicator, { width: slotWidth, transform: [{ translateX }] }]}
          pointerEvents="none">
          <View style={[styles.chip, { backgroundColor: colors.accentChip }]} />
        </Animated.View>

        {state.routes.map((route, i) => {
          const tab = TABS.find((t) => t.name === route.name);
          if (!tab) return null;
          const focused = state.index === i;

          function onPress() {
            wake();
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
          }

          return (
            <Pressable key={route.key} style={styles.tab} onPress={onPress}>
              <View style={styles.hit}>
                <tab.Icon color={focused ? colors.accentText : colors.tabInactive} />
                {/* sits on the listings tab, will follow real listings later */}
                {route.name === 'listings' ? (
                  <View
                    style={[
                      styles.newDot,
                      { backgroundColor: colors.accentFill, borderColor: colors.dotRing },
                    ]}
                  />
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // the shadow needs its own wrapper, the clipped dock below would swallow it
  shadow: { position: 'absolute', borderRadius: radius.pill },
  dock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIDE_PADDING,
    borderRadius: radius.pill,
    borderWidth: 1,
    overflow: 'hidden',
  },
  // stretched top to bottom so the chip stays centred while the dock grows
  indicator: {
    position: 'absolute',
    left: SIDE_PADDING,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chip: { width: 70, height: 54, borderRadius: radius.chip },
  tab: { flex: 1, alignItems: 'center' },
  hit: { width: 70, height: 54, alignItems: 'center', justifyContent: 'center' },
  newDot: {
    position: 'absolute',
    top: 12,
    right: 16,
    width: 11,
    height: 11,
    borderRadius: 5.5,
    borderWidth: 2,
  },
});
