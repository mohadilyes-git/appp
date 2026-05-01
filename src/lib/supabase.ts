import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Config lives in .env.local (see .env.example). The anon key is public;
// Row Level Security protects the data.
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,      // persist the session on the device
    autoRefreshToken: true,     // keep the session fresh
    persistSession: true,       // stay logged in across app restarts
    detectSessionInUrl: false,  // native app, not a browser redirect flow
  },
});
