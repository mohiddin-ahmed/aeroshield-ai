import { useState, useCallback, useMemo } from 'react';
import { SUPPORTED_LANGUAGES, translations } from '../utils/i18n';

const SUPPORTED_CODES = new Set(SUPPORTED_LANGUAGES.map((lang) => lang.code));

/**
 * Manages active UI localization language across 7 supported Indian & global languages.
 * @returns {{ currentLang: string, selectLanguage: (code: string) => void, t: object }} Localization state and dictionary.
 */
export function useLanguage() {
  const [currentLang, setCurrentLang] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    try {
      const saved = localStorage.getItem('lang');
      return saved && SUPPORTED_CODES.has(saved) ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const selectLanguage = useCallback((code) => {
    const validCode = SUPPORTED_CODES.has(code) ? code : 'en';
    setCurrentLang(validCode);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('lang', validCode);
      } catch {
        // Ignore storage write error when cookies/storage are disabled
      }
    }
  }, []);

  const t = useMemo(() => translations[currentLang] || translations.en, [currentLang]);

  return { currentLang, selectLanguage, t };
}
