import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { themes, type Colors, type Shadows } from './theme';

const STORAGE_KEY = 'theme-preference';

export type ThemePreference = 'system' | 'light' | 'dark';

type ThemeValue = {
  colors: Colors;
  shadows: Shadows;
  resolved: 'light' | 'dark';
  preference: ThemePreference;
  setPreference: (next: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [preference, setStoredPreference] = useState<ThemePreference>('system');

  // bring back whatever they picked last time
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved === 'system' || saved === 'light' || saved === 'dark') setStoredPreference(saved);
      })
      .catch(() => {});
  }, []);

  function setPreference(next: ThemePreference) {
    setStoredPreference(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  }

  // system follows the phone, anything else wins over it
  const resolved = preference === 'system' ? (systemScheme ?? 'light') : preference;

  const value: ThemeValue = {
    colors: themes[resolved].colors,
    shadows: themes[resolved].shadows,
    resolved,
    preference,
    setPreference,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme has to be used inside ThemeProvider');
  return value;
}
