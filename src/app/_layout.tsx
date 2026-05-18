import {
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import {
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';
import type { Session } from '@supabase/supabase-js';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';

SplashScreen.preventAutoHideAsync().catch(() => {});

// how long we wait for supabase before opening the app anyway
const STARTUP_TIMEOUT_MS = 5000;

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [waitedLongEnough, setWaitedLongEnough] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  // app fonts
  const [fontsLoaded, fontError] = useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  // load the session once, then keep it in sync with auth changes
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setSession(data.session))
      .catch(() => {
        // couldn't reach supabase, start as signed out and let the listener catch up
      })
      .finally(() => setAuthReady(true));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // a bad connection shouldn't leave people staring at the logo
  useEffect(() => {
    const t = setTimeout(() => setWaitedLongEnough(true), STARTUP_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, []);

  // missing fonts fall back to the system one, that's better than not opening
  const fontsDone = fontsLoaded || Boolean(fontError);
  const ready = (authReady && fontsDone) || waitedLongEnough;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  // signed out -> /welcome, signed in -> app.
  // the verify screens sit in between: you need an account to be on them.
  useEffect(() => {
    if (!ready) return;
    const seg = segments[0] ?? '';
    const publicScreens = ['welcome', 'login', 'register', 'forgot-password'];
    const onboardingScreens = ['verify-phone', 'verify-code'];

    const phoneDone = Boolean(session?.user?.phone_confirmed_at);

    if (!session) {
      if (!publicScreens.includes(seg)) router.replace('/welcome');
    } else if (!phoneDone) {
      if (!onboardingScreens.includes(seg)) router.replace('/verify-phone');
    } else if (publicScreens.includes(seg) || onboardingScreens.includes(seg)) {
      router.replace('/');
    }
  }, [ready, session, segments, router]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
