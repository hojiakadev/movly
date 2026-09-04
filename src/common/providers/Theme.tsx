// src/common/helpers/theme/ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '@/common/services';

export type ThemeMode = 'light' | 'dark';

interface IThemeContext {
  mode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
}

const STORAGE_KEY = 'theme-mode';

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

const getInitialMode = (): ThemeMode => {
  const stored = storage.local.get(STORAGE_KEY) as ThemeMode | null;
  if (stored === 'light' || stored === 'dark') return stored;

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>(getInitialMode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    storage.local.set(STORAGE_KEY, mode);
  }, [mode]);

  const setMode = (next: ThemeMode) => setModeState(next);
  const toggleMode = () => setModeState(prev => (prev === 'light' ? 'dark' : 'light'));

  return <ThemeContext.Provider value={{ mode, toggleMode, setMode }}>{children}</ThemeContext.Provider>;
};

export const useThemeMode = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeMode must be used within a ThemeProvider');
  return ctx;
};
