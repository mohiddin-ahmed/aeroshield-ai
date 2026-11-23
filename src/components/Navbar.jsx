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
  Bot
} from 'lucide-react';

export function Navbar({ 
  locationData, 
  timeContext, 
  onRefreshLocation, 
  isRefreshingLocation, 
  isLiveFeed, 
  onOpenVideoModal, 
  onOpenInspector, 
  onOpenMultiAi, 
  promptCount = 0,
  isDarkMode,
  onToggleDarkMode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl transition-colors duration-300 border-b ${
      isDarkMode 
        ? 'bg-[#121212]/85 border-white/10 text-white' 
        : 'bg-[#FFFFFF]/85 border-black/5 text-[#282828]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Wordmark */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#282828] dark:bg-white flex items-center justify-center text-[#10B981] dark:text-[#18181B] shadow-sm">
            <Shield className="w-5 h-5 stroke-[2.4]" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-base sm:text-lg tracking-tight">AeroShield AI</span>
              <span className="text-[10px] font-bold bg-[#10B981]/20 text-[#059669] dark:text-[#34D399] px-2 py-0.5 rounded-full">
                वायुमित्र OS
              </span>
            </div>
            <p className="text-[10px] opacity-60 font-medium hidden sm:block">
              Turn Winter Smog Anxiety into Daily Clean-Air Strategy
            </p>
          </div>
        </div>

        {/* Center: Auto-Detected Time & Place Indicator */}
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
            title="Auto-detect current GPS/Network location"
            className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors ml-1"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshingLocation ? 'animate-spin text-[#10B981]' : 'opacity-60'}`} />
          </button>
        </div>

        {/* Right Actions: Dark Mode Toggle, Video Modal, DevTools & Mobile Menu */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Dark / Light Mode Switch */}
          <button
            onClick={onToggleDarkMode}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              isDarkMode
                ? 'bg-white/10 hover:bg-white/15 text-amber-300'
                : 'bg-black/5 hover:bg-black/10 text-[#282828]'
            }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            <span className="hidden md:inline">{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>

          {/* Watch Demo Video Button (Desktop) */}
          <button
            onClick={onOpenVideoModal}
            className="hidden sm:flex items-center space-x-1.5 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold bg-white dark:bg-white/10 dark:text-white text-[#282828] border border-black/10 dark:border-white/10 shadow-xs hover:shadow-sm transition-all"
          >
            <PlayCircle className="w-4 h-4 text-[#9B2226] dark:text-rose-400" />
            <span>Demo Video</span>
          </button>

          {/* Judges DevTools Prompt Inspector */}
          <button
            onClick={onOpenInspector}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-[#282828] dark:bg-white text-white dark:text-[#282828] hover:bg-[#1a1a1a] shadow-xs transition-all"
            title="Open Judges Live Prompt Inspector"
          >
            <Terminal className="w-3.5 h-3.5 text-[#10B981] dark:text-emerald-700" />
            <span>DevTools</span>
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

      {/* Mobile Location Sub-bar */}
      <div className="lg:hidden px-4 py-1.5 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px] opacity-80">
        <div className="flex items-center space-x-1.5">
          <MapPin className="w-3 h-3 text-[#10B981]" />
          <span>📍 {locationData.city || 'Detecting...'}</span>
          <span className="opacity-40">•</span>
          <span className="font-mono text-[#10B981]">{timeContext.timeString}</span>
        </div>
        <button
          onClick={onRefreshLocation}
          className="flex items-center space-x-1 font-semibold text-[#10B981]"
        >
          <RefreshCw className={`w-3 h-3 ${isRefreshingLocation ? 'animate-spin' : ''}`} />
          <span>Auto-Detect</span>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-black/5 dark:border-white/10 p-4 space-y-3 bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-xl animate-fade-in">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span>Color Theme:</span>
            <button
              onClick={onToggleDarkMode}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/10"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenVideoModal(); }}
            className="w-full flex items-center space-x-2 p-2.5 rounded-2xl bg-black/5 dark:bg-white/10 text-xs font-bold"
          >
            <PlayCircle className="w-4 h-4 text-[#9B2226] dark:text-rose-400" />
            <span>Watch Demo Video (Option A)</span>
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
            <span>Judges DevTools Inspector ({promptCount})</span>
          </button>
        </div>
      )}
    </header>
  );
}
