import { useCallback, useMemo, useState } from 'react';
import type { SupportedLanguageCode } from '../types/airQuality';
import { SUPPORTED_LANGUAGES, translations, type TranslationCatalog } from '../utils/i18n';

const SUPPORTED_CODES = new Set<SupportedLanguageCode>(
  SUPPORTED_LANGUAGES.map((lang) => lang.code)
);

function isSupportedLanguage(code: string): code is SupportedLanguageCode {
  return SUPPORTED_CODES.has(code as SupportedLanguageCode);
}

export interface UseLanguageResult {
  currentLang: SupportedLanguageCode;
  selectLanguage: (code: SupportedLanguageCode | string) => void;
  t: TranslationCatalog;
}

/**
 * Manages active UI localization language across 7 supported Indian & global languages.
 * @returns Localization state and dictionary.
 */
export function useLanguage(): UseLanguageResult {
  const [currentLang, setCurrentLang] = useState<SupportedLanguageCode>(() => {
    if (typeof window === 'undefined') return 'en';
    try {
      const saved = localStorage.getItem('lang') || '';
      return isSupportedLanguage(saved) ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const selectLanguage = useCallback((code: SupportedLanguageCode | string) => {
    const validCode: SupportedLanguageCode = isSupportedLanguage(code) ? code : 'en';
    setCurrentLang(validCode);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('lang', validCode);
      } catch {
        // Ignore storage write error when cookies/storage are disabled
      }
    }
  }, []);

  const t = useMemo<TranslationCatalog>(
    () => translations[currentLang] || translations.en,
    [currentLang]
  );

  return { currentLang, selectLanguage, t };
}
