import type { LucideIcon } from 'lucide-react';
import { BookOpen, Clock, Shield, Wrench } from 'lucide-react';
import type { SupportedLanguageCode, TabId } from '../types/airQuality';
import { translations } from '../utils/i18n';

export interface FloatingBottomNavProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  isDarkMode: boolean;
  currentLang?: SupportedLanguageCode;
}

interface NavTabItem {
  id: TabId;
  label: string;
  icon: LucideIcon;
}

/**
 * Elevated oval capsule navigation dock where the active tab expands into a
 * pill showing [Icon + Label + Pulse Indicator] while inactive tabs remain compact icon buttons.
 */
export function FloatingBottomNav({
  activeTab,
  onSelectTab,
  isDarkMode,
  currentLang = 'en'
}: FloatingBottomNavProps) {
  const t = translations[currentLang] || translations.en;

  const tabs: NavTabItem[] = [
    { id: 'commandCenter', label: t.tabs.home, icon: Shield },
    { id: 'routine', label: t.tabs.routine, icon: Clock },
    { id: 'jugaad', label: t.tabs.jugaad, icon: Wrench },
    { id: 'research', label: t.tabs.research, icon: BookOpen }
  ];

  return (
    <div className="fixed bottom-[max(0.9rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md sm:w-auto">
      <nav
        aria-label="Primary application sections"
        className={`flex items-center justify-around sm:justify-center sm:space-x-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full transition-all duration-300 ease-out shadow-2xl backdrop-blur-2xl ${
          isDarkMode
            ? 'bg-zinc-900/95 border border-zinc-700/80 text-zinc-300 shadow-black/80'
            : 'bg-white/95 border border-zinc-200/90 text-zinc-700 shadow-black/15'
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
              className={`relative flex items-center justify-center rounded-full text-xs sm:text-[13px] font-bold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] select-none cursor-pointer active:scale-95 ${
                isActive
                  ? isDarkMode
                    ? 'bg-zinc-800 text-white shadow-lg border border-emerald-500/45 py-2.5 px-4.5 sm:px-5 space-x-2'
                    : 'bg-zinc-950 text-white shadow-lg shadow-black/25 border border-zinc-900 py-2.5 px-4.5 sm:px-5 space-x-2'
                  : isDarkMode
                    ? 'hover:text-white hover:bg-zinc-800/70 text-zinc-400 py-2.5 px-3.5 border border-transparent'
                    : 'hover:text-zinc-950 hover:bg-zinc-100 text-zinc-600 py-2.5 px-3.5 border border-transparent'
              }`}
            >
              <Icon
                aria-hidden="true"
                className={`w-[19px] h-[19px] shrink-0 transition-transform duration-300 ease-out ${
                  isActive ? 'text-emerald-400 scale-110' : 'opacity-75'
                }`}
              />

              {isActive && (
                <div className="flex items-center space-x-1.5 animate-fade-in">
                  <span className="tracking-tight text-white font-bold whitespace-nowrap">
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
