import React from 'react';
import { Shield, Clock, Wrench, BookOpen } from 'lucide-react';
import { translations } from '../utils/i18n';

/**
 * Floating Capsule Pill Navigation Bar
 * Faithfully matches the user's uploaded reference:
 * - Rounded-full capsule container
 * - Active tab renders an elevated rounded pill with [Icon + Label]
 * - Inactive tabs display clean minimalist icons
 * - Fully localized & high-contrast in both Light & Dark mode
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
        className={`flex items-center justify-around sm:justify-center sm:space-x-2 px-2.5 py-2 rounded-full transition-all duration-300 shadow-2xl backdrop-blur-2xl ${
          isDarkMode
            ? 'bg-zinc-900/95 border border-zinc-750 text-zinc-300 shadow-black/80'
            : 'bg-white/95 border border-zinc-300 text-zinc-700 shadow-black/10'
        }`}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex items-center space-x-2 py-2.5 px-3.5 sm:px-5 rounded-full text-xs font-bold transition-all duration-200 select-none ${
                isActive
                  ? isDarkMode
                    ? 'bg-zinc-800 text-white shadow-inner scale-102 border border-emerald-500/50'
                    : 'bg-zinc-950 text-white shadow-md scale-102'
                  : isDarkMode
                  ? 'hover:text-white hover:bg-zinc-800/60'
                  : 'hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              <Icon 
                className={`w-4 h-4 transition-colors ${
                  isActive ? (isDarkMode ? 'text-emerald-400' : 'text-emerald-400') : ''
                }`} 
              />
              
              {/* Active Label (Only displays when selected, matching uploaded screenshot) */}
              {isActive && (
                <span className="tracking-tight text-white animate-fade-in text-xs font-bold whitespace-nowrap">
                  {tab.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
