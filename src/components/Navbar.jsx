import React, { useState, useEffect } from 'react';
import { Terminal, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { promptLogger } from '../utils/promptLogger';

export function Navbar({ onOpenInspector }) {
  const [logCount, setLogCount] = useState(0);
  const isMockMode = !import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY === 'your_gemini_api_key_here';

  useEffect(() => {
    setLogCount(promptLogger.getLogs().length);
    const unsubscribe = promptLogger.subscribe((logs) => {
      setLogCount(logs.length);
    });
    return unsubscribe;
  }, []);

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">
                PromptWars
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30">
                Virtual Cohort
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Google for Developers × Hack2skill Builder Track
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          {/* Engine Status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border border-slate-800 bg-slate-900/60">
            <span className={`w-2 h-2 rounded-full ${isMockMode ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
            <span className="text-slate-300 font-medium">
              {isMockMode ? 'Evaluator Safe Mode (Mock Active)' : 'Gemini 2.5 Live'}
            </span>
          </div>

          {/* Prompt Inspector Trigger Button (Judges Tool) */}
          <button
            onClick={onOpenInspector}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition group"
          >
            <Terminal className="w-4 h-4 text-indigo-200 group-hover:rotate-12 transition-transform" />
            <span>Inspect Prompts</span>
            {logCount > 0 && (
              <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px] font-mono">
                {logCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

