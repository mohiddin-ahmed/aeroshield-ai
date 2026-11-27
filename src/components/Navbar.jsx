import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  PlayCircle,
  Terminal,
  Sun,
  Moon,
  MapPin,
  Menu,
  X,
  RefreshCw,
  Sparkles,
  Bot,
  Globe,
  Settings
} from 'lucide-react';
import { translations, SUPPORTED_LANGUAGES } from '../utils/i18n';
import { AeroShieldLogo } from './AeroShieldLogo';

/**
 * Sticky responsive application header containing branding, live location/clock badge,
 * multilingual switcher, dark/light toggle, settings trigger, demo preview, and Judges DevTools.
 * @param {object} props - Navbar component props.
 * @returns {JSX.Element} Sticky navigation header and mobile action drawer.
 */
export function Navbar({
  locationData,
  timeContext,
  onGoHome,
  onRefreshLocation,
  isRefreshingLocation,
  isLiveFeed = false,
  onOpenVideoModal,
  onOpenInspector,
  onOpenMultiAi,
  onOpenSettings,
  onOpenTour,
  currentLang = 'en',
  onSelectLang,
  promptCount = 0,
  isDarkMode,
  onToggleDarkMode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langMenuRef = useRef(null);

  const t = translations[currentLang] || translations.en;
  const currentLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    if (!langDropdownOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLangDropdownOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
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
    <header
      className={`sticky top-0 z-40 w-full backdrop-blur-xl transition-colors duration-300 border-b ${
        isDarkMode
          ? 'bg-[#121212]/85 border-white/10 text-white'
          : 'bg-[#FFFFFF]/85 border-black/5 text-[#282828]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Wordmark (Click App Icon / Title to Return Home) */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={onGoHome}
            aria-label="Return to AeroShield AI Home"
            title="Go to Home"
            className="flex items-center space-x-2.5 sm:space-x-3 text-left rounded-2xl p-1 -ml-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <div className="shrink-0">
              <AeroShieldLogo variant="vortex-leaf" size={38} isDarkMode={isDarkMode} />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center leading-none">
                <span className="font-extrabold text-base sm:text-lg tracking-tight whitespace-nowrap">
                  {t.appTitle}
                </span>
              </div>
              <div className="flex items-center space-x-1.5 mt-1">
                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#059669] dark:text-[#34D399] bg-[#10B981]/15 dark:bg-[#10B981]/25 px-1.5 py-0.5 rounded-md inline-block leading-none">
                  {t.subBrand}
                </span>
              </div>
            </div>
          </button>
          <span
            className="text-[9px] font-mono opacity-70 hidden sm:inline self-end pb-1"
            title={isLiveFeed ? t.status.liveFeed : t.status.offlineVerified}
          >
            • {isLiveFeed ? 'Live CAMS' : 'Cached'}
          </span>
        </div>

        {/* Center: Location & Time Badge (Desktop) */}
        <div className="hidden lg:flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10">
          <MapPin className="w-3.5 h-3.5 text-[#10B981]" aria-hidden="true" />
          <span>
            {locationData.city || 'Detecting...'}, {locationData.country || ''}
          </span>
          <span className="opacity-40" aria-hidden="true">
            •
          </span>
          <span className="font-mono text-[11px] text-[#10B981]">{timeContext.timeString}</span>
          <button
            type="button"
            onClick={onRefreshLocation}
            disabled={isRefreshingLocation}
            title="Auto-detect current GPS location"
            aria-label="Refresh auto-detected GPS location"
            className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors ml-1 cursor-pointer"
          >
            <RefreshCw
              className={`w-3 h-3 ${isRefreshingLocation ? 'animate-spin text-[#10B981]' : 'opacity-60'}`}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Right Actions */}
        <nav aria-label="Primary actions" className="flex items-center space-x-2 sm:space-x-2.5">
          {/* Language Selector Dropdown */}
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

          {/* Dark / Light Mode Switch */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className={`p-2 rounded-full text-xs font-semibold flex items-center transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-white/10 hover:bg-white/15 text-amber-300'
                : 'bg-black/5 hover:bg-black/10 text-[#282828]'
            }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-pressed={isDarkMode}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" aria-hidden="true" />
            )}
          </button>

          {/* Settings Modal Trigger */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="p-2 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-colors cursor-pointer"
            title="Open Settings & Profiles"
            aria-label="Open settings and family profiles"
          >
            <Settings className="w-4 h-4 opacity-80" aria-hidden="true" />
          </button>

          {/* Quick Onboarding Tour Button */}
          <button
            type="button"
            onClick={onOpenTour}
            className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 transition-all cursor-pointer"
            title="Take a 30-second Interactive Walkthrough"
            aria-label="Open interactive app tour"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
            <span className="hidden xl:inline">App Tour</span>
          </button>

          {/* Watch Demo Video Button (Desktop) */}
          <button
            type="button"
            onClick={onOpenVideoModal}
            className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-white/10 dark:text-white text-[#282828] border border-black/10 dark:border-white/10 shadow-xs hover:shadow-sm transition-all cursor-pointer"
            aria-label={t.actions.watchVideo}
          >
            <PlayCircle className="w-4 h-4 text-[#9B2226] dark:text-rose-400" aria-hidden="true" />
            <span>{t.actions.watchVideo}</span>
          </button>

          {/* Judges DevTools Prompt Inspector */}
          <button
            type="button"
            onClick={onOpenInspector}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#282828] dark:bg-white text-white dark:text-[#282828] hover:opacity-90 shadow-xs transition-all cursor-pointer"
            title="Open Judges Live Prompt Inspector"
            aria-label={`${t.actions.devTools} (${promptCount} logged prompts)`}
          >
            <Terminal className="w-3.5 h-3.5 text-[#10B981] dark:text-emerald-700" aria-hidden="true" />
            <span className="hidden lg:inline">{t.actions.devTools}</span>
            {promptCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#10B981] text-white text-[10px] font-bold flex items-center justify-center">
                {promptCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="sm:hidden p-2.5 rounded-2xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-inherit transition-all duration-300 active:scale-90 cursor-pointer"
            title="Toggle Menu"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            <div
              className={`transition-transform duration-300 ${
                mobileMenuOpen ? 'rotate-90 scale-105' : 'rotate-0'
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-emerald-500" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-black/5 dark:border-white/10 p-4 space-y-2.5 bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-2xl shadow-2xl animate-drawer">
          <div className="flex items-center justify-between text-xs font-semibold pb-2 border-b border-black/5 dark:border-white/10">
            <span>
              {locationData.city || 'Location'} • {timeContext.timeString}
            </span>
            <button
              type="button"
              onClick={onRefreshLocation}
              className="text-[#10B981] font-bold flex items-center space-x-1 cursor-pointer"
            >
              <RefreshCw
                className={`w-3 h-3 ${isRefreshingLocation ? 'animate-spin' : ''}`}
                aria-hidden="true"
              />
              <span>{t.actions.autoDetect}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTour();
            }}
            className="w-full flex items-center space-x-2.5 p-3 rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-500/25 hover:bg-emerald-500/15 transition-all cursor-pointer active:scale-98"
          >
            <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
            <span>Interactive App Tour & Guide</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenVideoModal();
            }}
            className="w-full flex items-center space-x-2.5 p-3 rounded-2xl bg-rose-500/10 text-rose-700 dark:text-rose-300 text-xs font-bold border border-rose-500/20 hover:bg-rose-500/15 transition-all cursor-pointer active:scale-98"
          >
            <PlayCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" aria-hidden="true" />
            <span>{t.actions.watchVideo}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenMultiAi();
            }}
            className="w-full flex items-center space-x-2.5 p-3 rounded-2xl bg-black/5 dark:bg-white/10 text-xs font-bold hover:bg-black/10 dark:hover:bg-white/15 transition-all cursor-pointer active:scale-98"
          >
            <Bot className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
            <span>Ask ChatGPT / Claude / Gemini</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSettings();
            }}
            className="w-full flex items-center space-x-2.5 p-3 rounded-2xl bg-black/5 dark:bg-white/10 text-xs font-bold hover:bg-black/10 dark:hover:bg-white/15 transition-all cursor-pointer active:scale-98"
          >
            <Settings className="w-4 h-4 text-[#10B981] shrink-0" aria-hidden="true" />
            <span>Settings, Profiles & Languages</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenInspector();
            }}
            className="w-full flex items-center space-x-2.5 p-3 rounded-2xl bg-[#282828] dark:bg-white text-white dark:text-[#282828] text-xs font-bold shadow-md hover:opacity-90 transition-all cursor-pointer active:scale-98"
          >
            <Terminal className="w-4 h-4 text-[#10B981] dark:text-emerald-700 shrink-0" aria-hidden="true" />
            <span>
              {t.actions.devTools} ({promptCount})
            </span>
          </button>
        </div>
      )}
    </header>
  );
}

Navbar.propTypes = {
  locationData: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string
  }).isRequired,
  timeContext: PropTypes.shape({
    timeString: PropTypes.string
  }).isRequired,
  onGoHome: PropTypes.func,
  onRefreshLocation: PropTypes.func.isRequired,
  isRefreshingLocation: PropTypes.bool.isRequired,
  isLiveFeed: PropTypes.bool,
  onOpenVideoModal: PropTypes.func.isRequired,
  onOpenInspector: PropTypes.func.isRequired,
  onOpenMultiAi: PropTypes.func.isRequired,
  onOpenSettings: PropTypes.func.isRequired,
  onOpenTour: PropTypes.func.isRequired,
  currentLang: PropTypes.string,
  onSelectLang: PropTypes.func.isRequired,
  promptCount: PropTypes.number,
  isDarkMode: PropTypes.bool.isRequired,
  onToggleDarkMode: PropTypes.func.isRequired
};
