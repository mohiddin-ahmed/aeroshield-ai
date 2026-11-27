import { useEffect, useRef, useState } from 'react';
import { Globe } from 'lucide-react';
import type { SupportedLanguageCode } from '../types/airQuality';
import { SUPPORTED_LANGUAGES } from '../utils/i18n';

export interface LanguageSwitcherProps {
  currentLang: SupportedLanguageCode;
  onSelectLang: (code: SupportedLanguageCode) => void;
}

/**
 * Accessible dropdown selector supporting 7 Indian and global UI languages.
 */
export function LanguageSwitcher({ currentLang, onSelectLang }: LanguageSwitcherProps) {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement | null>(null);

  const currentLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    if (!langDropdownOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLangDropdownOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langDropdownOpen]);

  return (
    <div className="relative" ref={langMenuRef}>
      <button
        type="button"
        onClick={() => setLangDropdownOpen((prev) => !prev)}
        className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full text-xs font-bold bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-colors cursor-pointer"
        title="Change Language"
        aria-label={`Change application language, currently ${currentLangObj.label}`}
        aria-expanded={langDropdownOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-3.5 h-3.5 text-[#10B981]" aria-hidden="true" />
        <span className="hidden sm:inline">{currentLangObj.native}</span>
        <span className="sm:hidden uppercase">{currentLangObj.code}</span>
      </button>

      {langDropdownOpen && (
        <div
          role="listbox"
          aria-label="Supported languages"
          className="absolute right-0 mt-2 w-36 rounded-2xl bg-white dark:bg-[#18181B] border border-black/10 dark:border-white/10 shadow-xl p-1.5 z-50 animate-fade-in space-y-0.5"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              role="option"
              aria-selected={currentLang === lang.code}
              onClick={() => {
                onSelectLang(lang.code);
                setLangDropdownOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer ${
                currentLang === lang.code
                  ? 'bg-[#10B981] text-[#18181B]'
                  : 'hover:bg-black/5 dark:hover:bg-white/10 text-inherit'
              }`}
            >
              <span>{lang.native}</span>
              <span className="text-[10px] opacity-60 uppercase">{lang.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
