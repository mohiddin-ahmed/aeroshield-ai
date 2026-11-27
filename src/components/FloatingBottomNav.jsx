import React from 'react';
import PropTypes from 'prop-types';
import { Shield, Clock, Wrench, BookOpen } from 'lucide-react';
import { translations } from '../utils/i18n';

/**
 * Floating Capsule Pill Navigation Bar fixed at the bottom viewport edge.
 * Provides accessible keyboard navigation and active route semantics across the 4 OS tabs.
 * @param {object} props - Component props.
 * @returns {JSX.Element} Floating capsule bottom navigation bar.
 */
export function FloatingBottomNav({ activeTab, onSelectTab, isDarkMode, currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;

  const tabs = [
    { id: 'commandCenter', label: t.tabs.home, icon: Shield },
    { id: 'routine', label: t.tabs.routine, icon: Clock },
    { id: 'jugaad', label: t.tabs.jugaad, icon: Wrench },
    { id: 'research', label: t.tabs.research, icon: BookOpen }
  ];

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-md w-[92%] sm:w-auto">
      <nav
        aria-label="Primary application sections"
        className={`flex items-center justify-around sm:justify-center sm:space-x-2 px-2.5 py-2 rounded-full transition-all duration-300 shadow-2xl backdrop-blur-2xl ${
          isDarkMode
            ? 'bg-zinc-900/95 border border-zinc-700/80 text-zinc-300 shadow-black/80'
            : 'bg-white/95 border border-zinc-200 text-zinc-700 shadow-black/10'
        }`}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex items-center space-x-2 py-2 px-3.5 sm:px-4.5 rounded-full text-xs font-bold transition-all duration-300 select-none cursor-pointer ${
                isActive
                  ? isDarkMode
                    ? 'bg-zinc-800 text-white shadow-md border border-emerald-500/40'
                    : 'bg-zinc-950 text-white shadow-lg shadow-black/20'
                  : isDarkMode
                  ? 'hover:text-white hover:bg-zinc-800/60 text-zinc-400'
                  : 'hover:text-zinc-950 hover:bg-zinc-100 text-zinc-600'
              }`}
            >
              <Icon
                aria-hidden="true"
                className={`w-4 h-4 transition-transform duration-300 ${
                  isActive ? 'text-emerald-400 scale-110' : 'opacity-70'
                }`}
              />

              {isActive && (
                <div className="flex items-center space-x-1.5 animate-fade-in">
                  <span className="tracking-tight text-white text-xs font-bold whitespace-nowrap">
                    {tab.label}
                  </span>
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"
                    aria-hidden="true"
                  />
                </div>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

FloatingBottomNav.propTypes = {
  activeTab: PropTypes.oneOf(['commandCenter', 'routine', 'jugaad', 'research']).isRequired,
  onSelectTab: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  currentLang: PropTypes.string
};
