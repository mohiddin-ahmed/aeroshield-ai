import React from 'react';
import { Shield, Clock, Wrench, BookOpen, Layers } from 'lucide-react';

/**
 * Floating Capsule Pill Navigation Bar
 * Faithfully matches the user's uploaded Home.ai / Glassmorphic reference:
 * - Rounded-full capsule container
 * - Active tab renders an elevated rounded pill with [Icon + Label]
 * - Inactive tabs display clean minimalist icons
 * - Fully responsive, works seamlessly in Light & Dark mode
 */
export function FloatingBottomNav({ activeTab, onSelectTab, isDarkMode }) {
  const tabs = [
    { id: 'commandCenter', label: 'Home', icon: Shield },
    { id: 'routine', label: 'Routine', icon: Clock },
    { id: 'jugaad', label: 'Jugaad', icon: Wrench },
    { id: 'research', label: 'Research', icon: BookOpen }
  ];

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-md w-[92%] sm:w-auto">
      <nav 
        className={`flex items-center justify-around sm:justify-center sm:space-x-2 px-2 py-2 rounded-full transition-all duration-300 shadow-2xl backdrop-blur-2xl ${
          isDarkMode
            ? 'bg-[#18181B]/90 border border-white/15 text-white/70 shadow-black/60'
            : 'bg-white/95 border border-black/10 text-[#282828]/70 shadow-black/10'
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
                    ? 'bg-[#27272A] text-white shadow-inner scale-102 border border-white/10'
                    : 'bg-[#282828] text-white shadow-md scale-102'
                  : isDarkMode
                  ? 'hover:text-white hover:bg-white/5'
                  : 'hover:text-[#282828] hover:bg-black/5'
              }`}
            >
              <Icon 
                className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-[#10B981]' : ''
                }`} 
              />
              
              {/* Active Label (Only displays when selected, matching uploaded screenshot) */}
              {isActive && (
                <span className="tracking-tight text-white animate-fade-in text-xs font-semibold whitespace-nowrap">
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
