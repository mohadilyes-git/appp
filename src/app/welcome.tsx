import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, Path, RadialGradient, Rect, Stop } from 'react-native-svg';

// ---- carousel data ----------------------------------------------------
const SLIDES = [
  { key: 'chair', name: 'Velvet Armchair', price: '$320', badge: '+38%', photo: '🛋️' },
  { key: 'car', name: "Honda Civic '14", price: '$8,450', badge: '+22%', photo: '🚗' },
  { key: 'bike', name: 'Trek Road Bike', price: '$240', badge: '+45%', photo: '🚴' },
  { key: 'phone', name: 'iPhone 13 · 128GB', price: '$410', badge: '+30%', photo: '📱' },
  { key: 'laptop', name: 'MacBook Air M1', price: '$640', badge: '+35%', photo: '💻' },
];
const N = SLIDES.length;
const INTERVAL_MS = 3600;

// ---- design tokens ----------------------------------------------------
const C = {
  blue: '#2f6fed',
  blueLight: '#6f9dff',
  blueDot: '#5f92ff',
  cardText: '#14161a',
  appleText: '#0a0a0a',
  headline: '#eef1f6',
  textSecondary: 'rgba(255,255,255,.6)',
  textTertiary: 'rgba(255,255,255,.55)',
  dotIdle: 'rgba(255,255,255,.35)',
};

// ---- layered radial-gradient background -------------------------------
function GlowBackground({ width, height }: { width: number; height: number }) {
  return (
    <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
      <Defs>
        {/* graphite base */}
        <RadialGradient id="base" cx="50%" cy="10%" rx="120%" ry="80%">
          <Stop offset="0%" stopColor="#2a2d33" />
          <Stop offset="45%" stopColor="#131519" />
          <Stop offset="100%" stopColor="#07080c" />
        </RadialGradient>
        {/* top blue glow */}
        <RadialGradient id="glowTop" cx="50%" cy="-14%" rx="80%" ry="34%">
          <Stop offset="0%" stopColor="#2f6fed" stopOpacity={0.55} />
          <Stop offset="72%" stopColor="#2f6fed" stopOpacity={0} />
        </RadialGradient>
        {/* bottom blue glow */}
        <RadialGradient id="glowBottom" cx="50%" cy="112%" rx="95%" ry="48%">
          <Stop offset="0%" stopColor="#2f6fed" stopOpacity={0.85} />
          <Stop offset="74%" stopColor="#2f6fed" stopOpacity={0} />
        </RadialGradient>
        {/* soft halo behind the product card */}
        <RadialGradient id="halo" cx="50%" cy="46%" rx="55%" ry="34%">
          <Stop offset="0%" stopColor="#78a0ff" stopOpacity={0.14} />
          <Stop offset="70%" stopColor="#78a0ff" stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Rect width={width} height={height} fill="url(#base)" />
      <Rect width={width} height={height} fill="url(#glowTop)" />
      <Rect width={width} height={height} fill="url(#glowBottom)" />
      <Rect width={width} height={height} fill="url(#halo)" />
    </Svg>
  );
}

// ---- Apple logo -------------------------------------------------------
function AppleLogo() {
  return (
    <Svg width={16} height={16} viewBox="0 0 384 512" style={{ marginTop: -2 }}>
      <Path
        fill={C.appleText}
        d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
      />
    </Svg>
  );
}

// ---- pulsing brand dot ------------------------------------------------
function PulseDot() {
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(pulse, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const ringScale = pulse.interpolate({ inputRange: [0, 0.7, 1], outputRange: [1, 3.6, 3.6] });
  const ringOpacity = pulse.interpolate({ inputRange: [0, 0.7, 1], outputRange: [0.55, 0, 0] });

  return (
    <View style={styles.pulseWrap}>
      <Animated.View
        style={[styles.pulseRing, { opacity: ringOpacity, transform: [{ scale: ringScale }] }]}
      />
      <View style={styles.pulseCore} />
    </View>
  );
}

// ---- carousel card ----------------------------------------------------
function SlideCard({ slide, state }: { slide: (typeof SLIDES)[number]; state: 'active' | 'prev' | 'next' }) {
  // slot positions: next=0, active=1, prev=2
  const target = state === 'active' ? 1 : state === 'prev' ? 2 : 0;
  const anim = useRef(new Animated.Value(target)).current;
  const lastTarget = useRef(target);

  useEffect(() => {
    const from = lastTarget.current;
    lastTarget.current = target;
    if (from === target) return;

    // prev <-> next: both hidden, jump without animating so the card
    // doesn't pass through the visible center
    if (from !== 1 && target !== 1) {
      anim.stopAnimation();
      anim.setValue(target);
      return;
    }

    Animated.timing(anim, {
      toValue: target,
      duration: 750,
      easing: Easing.bezier(0.22, 0.9, 0.32, 1),
      useNativeDriver: true,
    }).start();
  }, [target, anim]);

  const translateX = anim.interpolate({ inputRange: [0, 1, 2], outputRange: [46, 0, -46] });
  const scale = anim.interpolate({ inputRange: [0, 1, 2], outputRange: [0.9, 1, 0.9] });
  const opacity = anim.interpolate({ inputRange: [0, 1, 2], outputRange: [0, 1, 0] });

  return (
    <Animated.View
      pointerEvents={state === 'active' ? 'auto' : 'none'}
      style={[styles.slide, { opacity, transform: [{ translateX }, { scale }] }]}>
      <View style={styles.card}>
        <View style={styles.photoWell}>
          <Text style={styles.photoEmoji}>{slide.photo}</Text>
          <View style={styles.newPill}>
            <Text style={styles.newPillText}>NEW</Text>
          </View>
          <View style={styles.marginBadge}>
            <Text style={styles.marginBadgeText}>{slide.badge}</Text>
          </View>
        </View>
        <Text style={styles.cardName}>{slide.name}</Text>
        <Text style={styles.cardPrice}>{slide.price}</Text>
      </View>
    </Animated.View>
  );
}

// ---- the screen -------------------------------------------------------
export default function WelcomeScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // auto-advance timer, reset on manual dot tap
  function startTimer() {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setIndex((i) => (i + 1) % N), INTERVAL_MS);
  }
  useEffect(() => {
    startTimer();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onDotPress(k: number) {
    setIndex(k);
    startTimer(); // reset so it doesn't jump right after a manual tap
  }

  const prev = (index + N - 1) % N;

  return (
    <View style={styles.root}>
      <GlowBackground width={width} height={height} />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        {/* 1 · header */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <PulseDot />
            <Text style={styles.brandLabel}>AlertsFlip</Text>
          </View>
          <Text style={styles.headline}>
            <Text style={{ color: C.headline }}>First to{'\n'}</Text>
            <Text style={{ color: C.blueLight }}>every deal.</Text>
          </Text>
          <Text style={styles.subhead}>Alerts for underpriced listings, the moment they go live.</Text>
        </View>

        {/* 2 · carousel stage */}
        <View style={styles.stage}>
          {SLIDES.map((s, k) => (
            <SlideCard key={s.key} slide={s} state={k === index ? 'active' : k === prev ? 'prev' : 'next'} />
          ))}
        </View>

        {/* 3 · dot indicators */}
        <View style={styles.dots}>
          {SLIDES.map((s, k) => (
            <Pressable key={s.key} onPress={() => onDotPress(k)} hitSlop={8}>
              <View style={[styles.dot, k === index && styles.dotActive]} />
            </Pressable>
          ))}
        </View>

        {/* 4 · action stack */}
        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
            onPress={() => router.push('/login')}>
            <Text style={styles.primaryBtnText}>Create account</Text>
          </Pressable>

          {Platform.OS === 'ios' && (
            <Pressable style={({ pressed }) => [styles.appleBtn, pressed && styles.pressed]}>
              <AppleLogo />
              <Text style={styles.appleBtnText}>Continue with Apple</Text>
            </Pressable>
          )}

          <Pressable style={styles.textBtn} onPress={() => router.push('/login')} hitSlop={6}>
            <Text style={styles.textBtnLabel}>
              Already have an account? <Text style={styles.textBtnLink}>Log in</Text>
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#07080c' },
  safe: { flex: 1 },

  // header
  header: { alignItems: 'center', gap: 10, paddingTop: 24, paddingHorizontal: 24 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  brandLabel: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    letterSpacing: 11 * 0.22,
    textTransform: 'uppercase',
    color: C.textSecondary,
  },
  headline: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 37,
    lineHeight: 40,
    letterSpacing: -0.74,
    textAlign: 'center',
  },
  subhead: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13.5,
    lineHeight: 20,
    color: C.textTertiary,
    maxWidth: 250,
    textAlign: 'center',
  },

  // pulse dot
  pulseWrap: { width: 6, height: 6, alignItems: 'center', justifyContent: 'center' },
  pulseCore: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.blueDot },
  pulseRing: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.blueDot,
  },

  // carousel
  stage: { flex: 1, minHeight: 320, marginTop: 4 },
  slide: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  card: {
    width: 268,
    backgroundColor: '#fff',
    borderRadius: 26,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.55,
    shadowRadius: 35,
    shadowOffset: { width: 0, height: 34 },
    elevation: 24,
  },
  photoWell: {
    height: 220,
    alignSelf: 'stretch',
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#eef0f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoEmoji: { fontSize: 74 },
  newPill: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: C.blue,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 999,
  },
  newPillText: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 10,
    letterSpacing: 0.6,
    color: '#fff',
  },
  marginBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#0b0c0e',
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 999,
  },
  marginBadgeText: { fontFamily: 'Manrope_700Bold', fontSize: 11, color: '#fff' },
  cardName: { fontFamily: 'Manrope_700Bold', fontSize: 14.5, color: C.cardText, marginTop: 12 },
  cardPrice: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 20,
    color: C.cardText,
    marginTop: 2,
  },

  // dots
  dots: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 4,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.dotIdle },
  dotActive: { width: 20, backgroundColor: '#fff' },

  // actions
  actions: { gap: 10, paddingHorizontal: 22, paddingTop: 10, paddingBottom: 8 },
  primaryBtn: {
    height: 52,
    borderRadius: 16,
    backgroundColor: C.blue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2f6fff',
    shadowOpacity: 0.35,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  primaryBtnText: { fontFamily: 'Manrope_700Bold', fontSize: 15.5, color: '#fff' },
  appleBtn: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  appleBtnText: { fontFamily: 'Manrope_700Bold', fontSize: 15.5, color: C.appleText },
  textBtn: { alignItems: 'center', padding: 6 },
  textBtnLabel: { fontFamily: 'Manrope_600SemiBold', fontSize: 13.5, color: C.textSecondary },
  textBtnLink: { fontFamily: 'Manrope_800ExtraBold', color: C.blueLight },
  pressed: { opacity: 0.85, transform: [{ translateY: -1 }] },
});
