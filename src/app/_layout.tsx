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

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  // app fonts
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  // load the session once, then keep it in sync with auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const ready = authReady && fontsLoaded;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  // signed out -> /welcome, signed in -> app
  useEffect(() => {
    if (!ready) return;
    const onAuthScreen = segments[0] === 'login' || segments[0] === 'welcome';
    if (!session && !onAuthScreen) router.replace('/welcome');
    else if (session && onAuthScreen) router.replace('/');
  }, [ready, session, segments, router]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
