import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';

import { BoltIcon, HomeIcon, PeopleIcon, SlidersIcon } from '@/components/tab-icons';
import { radius } from '@/lib/theme';
import { useTheme } from '@/lib/theme-context';

const DOCK_HEIGHT = 68;
const SIDE_PADDING = 8;
const SLIDE_MS = 420;

const TABS = [
  { name: 'index', Icon: HomeIcon },
  { name: 'listings', Icon: BoltIcon },
  { name: 'feed', Icon: PeopleIcon },
  { name: 'settings', Icon: SlidersIcon },
];

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  const { colors, shadows, resolved } = useTheme();
  const [dockWidth, setDockWidth] = useState(0);
  const slide = useRef(new Animated.Value(0)).current;

  // one slot per tab, measured once the dock knows how wide it is
  const slotWidth = dockWidth > 0 ? (dockWidth - SIDE_PADDING * 2) / TABS.length : 0;

  useEffect(() => {
    if (slotWidth === 0) return;
    Animated.timing(slide, {
      toValue: state.index * slotWidth,
      duration: SLIDE_MS,
      easing: Easing.bezier(0.22, 0.9, 0.32, 1),
      useNativeDriver: true,
    }).start();
  }, [state.index, slotWidth, slide]);

  return (
    <View style={[styles.shadow, shadows.dock]} pointerEvents="box-none">
      <View
        style={[styles.dock, { borderColor: colors.borderCard }]}
        onLayout={(e) => setDockWidth(e.nativeEvent.layout.width)}>
        <BlurView intensity={30} tint={resolved} style={StyleSheet.absoluteFill} />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.surfaceDock }]} />

        {/* one chip that glides between tabs instead of four that pop */}
        <Animated.View
          style={[styles.indicator, { width: slotWidth, transform: [{ translateX: slide }] }]}
          pointerEvents="none">
          <View style={[styles.chip, { backgroundColor: colors.accentChip }]} />
        </Animated.View>

        {state.routes.map((route, i) => {
          const tab = TABS.find((t) => t.name === route.name);
          if (!tab) return null;
          const focused = state.index === i;

          function onPress() {
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
    </View>
  );
}

const styles = StyleSheet.create({
  // the shadow needs its own wrapper, the clipped dock below would swallow it
  shadow: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 18,
    height: DOCK_HEIGHT,
    borderRadius: radius.pill,
  },
  dock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIDE_PADDING,
    borderRadius: radius.pill,
    borderWidth: 1,
    overflow: 'hidden',
  },
  indicator: {
    position: 'absolute',
    left: SIDE_PADDING,
    top: 7,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chip: { width: 70, height: '100%', borderRadius: radius.chip },
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
