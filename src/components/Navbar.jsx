import React from 'react';
import { Shield, Radio, PlayCircle, Terminal, ExternalLink } from 'lucide-react';

export function Navbar({ isLiveFeed, onOpenVideoModal, onOpenInspector, promptCount = 0 }) {
  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-white/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Wordmark */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#282828] flex items-center justify-center text-[#CBD77E] shadow-sm">
            <Shield className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-[#282828] tracking-tight">AeroShield AI</span>
              <span className="text-[11px] font-semibold bg-[#CBD77E]/30 text-[#282828] px-2 py-0.5 rounded-full">
                वायुमित्र OS
              </span>
            </div>
            <p className="text-[11px] text-[#282828]/60 font-medium hidden sm:block">
              Turn Winter Smog Anxiety into Daily Clean-Air Strategy
            </p>
          </div>
        </div>

        {/* Live Status Pill & Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Feed Status */}
          <div className="hidden md:flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/80 border border-black/5 shadow-2xs">
            <Radio className={`w-3.5 h-3.5 ${isLiveFeed ? 'text-emerald-500 animate-pulse' : 'text-amber-500'}`} />
            <span className="text-[#282828]">
              {isLiveFeed ? 'Live CAMS Feed' : 'Offline Verified'}
            </span>
          </div>

          {/* Watch Demo Video Button */}
          <button
            onClick={onOpenVideoModal}
            className="flex items-center space-x-1.5 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold bg-white/90 hover:bg-white text-[#282828] border border-black/10 shadow-xs hover:shadow-sm transition-all"
          >
            <PlayCircle className="w-4 h-4 text-[#9B2226]" />
            <span>Watch Demo Video</span>
          </button>

          {/* Judges DevTools Prompt Inspector */}
          <button
            onClick={onOpenInspector}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-[#282828] text-white hover:bg-[#1a1a1a] shadow-xs transition-all"
            title="Open Judges Live Prompt Inspector"
          >
            <Terminal className="w-3.5 h-3.5 text-[#CBD77E]" />
            <span className="hidden sm:inline">Judges DevTools</span>
            {promptCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#CBD77E] text-[#282828] text-[10px] font-bold flex items-center justify-center">
                {promptCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
