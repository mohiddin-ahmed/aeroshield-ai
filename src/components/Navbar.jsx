import React, { useState } from 'react';
import { 
  Shield, 
  Radio, 
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

export function Navbar({ 
  locationData, 
  timeContext, 
  onRefreshLocation, 
  isRefreshingLocation, 
  isLiveFeed, 
  onOpenVideoModal, 
  onOpenInspector, 
  onOpenMultiAi, 
  onOpenSettings,
  currentLang = 'en',
  onSelectLang,
  promptCount = 0,
  isDarkMode,
  onToggleDarkMode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = translations[currentLang] || translations.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl transition-colors duration-300 border-b ${
      isDarkMode 
        ? 'bg-[#121212]/85 border-white/10 text-white' 
        : 'bg-[#FFFFFF]/85 border-black/5 text-[#282828]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Wordmark */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#282828] dark:bg-white flex items-center justify-center text-[#10B981] dark:text-[#18181B] shadow-sm shrink-0">
            <Shield className="w-5 h-5 stroke-[2.4]" />
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
              <span className="text-[10px] opacity-60 font-medium hidden sm:inline-block truncate max-w-[200px] leading-none">
                • {t.tagline}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Location & Time Badge (Desktop) */}
        <div className="hidden lg:flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10">
          <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
          <span>
            {locationData.city || 'Detecting...'}, {locationData.country || ''}
          </span>
          <span className="opacity-40">•</span>
          <span className="font-mono text-[11px] text-[#10B981]">
            {timeContext.timeString}
          </span>
          <button
            onClick={onRefreshLocation}
            disabled={isRefreshingLocation}
            title="Auto-detect current GPS location"
            className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors ml-1"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshingLocation ? 'animate-spin text-[#10B981]' : 'opacity-60'}`} />
          </button>
        </div>

        {/* Right Actions: Language Switcher, Theme Switch, Settings, Video & DevTools */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full text-xs font-bold bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-colors"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="hidden sm:inline">{currentLangObj.native}</span>
              <span className="sm:hidden uppercase">{currentLangObj.code}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-white dark:bg-[#18181B] border border-black/10 dark:border-white/10 shadow-xl p-1.5 z-50 animate-fade-in space-y-0.5">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { onSelectLang(lang.code); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
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
            onClick={onToggleDarkMode}
            className={`p-2 rounded-full text-xs font-semibold flex items-center transition-all ${
              isDarkMode
                ? 'bg-white/10 hover:bg-white/15 text-amber-300'
                : 'bg-black/5 hover:bg-black/10 text-[#282828]'
            }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Settings Modal Trigger */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-colors"
            title="Open Settings & Profiles"
          >
            <Settings className="w-4 h-4 opacity-80" />
          </button>

          {/* Watch Demo Video Button (Desktop) */}
          <button
            onClick={onOpenVideoModal}
            className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-white/10 dark:text-white text-[#282828] border border-black/10 dark:border-white/10 shadow-xs hover:shadow-sm transition-all"
          >
            <PlayCircle className="w-4 h-4 text-[#9B2226] dark:text-rose-400" />
            <span>{t.actions.watchVideo}</span>
          </button>

          {/* Judges DevTools Prompt Inspector */}
          <button
            onClick={onOpenInspector}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#282828] dark:bg-white text-white dark:text-[#282828] hover:opacity-90 shadow-xs transition-all"
            title="Open Judges Live Prompt Inspector"
          >
            <Terminal className="w-3.5 h-3.5 text-[#10B981] dark:text-emerald-700" />
            <span className="hidden lg:inline">{t.actions.devTools}</span>
            {promptCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#10B981] text-white text-[10px] font-bold flex items-center justify-center">
                {promptCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-2xl bg-black/5 dark:bg-white/10 text-inherit transition-colors"
            title="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-black/5 dark:border-white/10 p-4 space-y-3 bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-xl animate-fade-in">
          
          <div className="flex items-center justify-between text-xs font-semibold pb-2 border-b border-black/5 dark:border-white/10">
            <span>{locationData.city || 'Location'} • {timeContext.timeString}</span>
            <button
              onClick={onRefreshLocation}
              className="text-[#10B981] font-bold flex items-center space-x-1"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshingLocation ? 'animate-spin' : ''}`} />
              <span>{t.actions.autoDetect}</span>
            </button>
          </div>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenSettings(); }}
            className="w-full flex items-center space-x-2 p-2.5 rounded-2xl bg-black/5 dark:bg-white/10 text-xs font-bold"
          >
            <Settings className="w-4 h-4 text-[#10B981]" />
            <span>Settings, Profiles & Languages</span>
          </button>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenVideoModal(); }}
            className="w-full flex items-center space-x-2 p-2.5 rounded-2xl bg-black/5 dark:bg-white/10 text-xs font-bold"
          >
            <PlayCircle className="w-4 h-4 text-[#9B2226] dark:text-rose-400" />
            <span>{t.actions.watchVideo}</span>
          </button>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenMultiAi(); }}
            className="w-full flex items-center space-x-2 p-2.5 rounded-2xl bg-black/5 dark:bg-white/10 text-xs font-bold"
          >
            <Bot className="w-4 h-4 text-emerald-500" />
            <span>Ask ChatGPT / Claude / Gemini</span>
          </button>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenInspector(); }}
            className="w-full flex items-center space-x-2 p-2.5 rounded-2xl bg-[#282828] dark:bg-white text-white dark:text-[#282828] text-xs font-bold"
          >
            <Terminal className="w-4 h-4 text-[#10B981] dark:text-emerald-700" />
            <span>{t.actions.devTools} ({promptCount})</span>
          </button>
        </div>
      )}
    </header>
  );
}
