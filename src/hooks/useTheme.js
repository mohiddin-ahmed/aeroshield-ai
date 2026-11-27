import { useState, useEffect, useCallback } from 'react';

/**
 * Manages dark/light color theme state synchronized with `document.documentElement` and `localStorage`.
 * @returns {{ isDarkMode: boolean, toggleDarkMode: () => void, setIsDarkMode: (dark: boolean) => void }} Theme controls.
 */
export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') {
        return saved === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.toggle('dark', isDarkMode);
    try {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    } catch {
      // Storage may be restricted in private browsing contexts
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  return { isDarkMode, toggleDarkMode, setIsDarkMode };
}
