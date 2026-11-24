import React, { useState } from 'react';
import { Wrench, Sparkles, Sliders, Droplets, Shield, ExternalLink, Bot, Check, ArrowRight, Clock, BookOpen } from 'lucide-react';
import { calculateDiyPurifierStats } from '../utils/cadrCalculator';
import { translations } from '../utils/i18n';

export function DesiJugaadLab({ onOpenMultiAi, telemetry, personalizedIntel, timeContext, onSelectJugaad, currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;
  const [roomSqft, setRoomSqft] = useState(220);
  const [fanSpeed, setFanSpeed] = useState('medium');

  const cadrStats = calculateDiyPurifierStats(roomSqft, fanSpeed);
  const { customizedJugaadList = [], currentUrgentAdvisory } = personalizedIntel || {};

  return (
    <div className="space-y-6">
      
      {/* Top Personalized Time & Weather Advisory */}
      {currentUrgentAdvisory && (
        <div className="p-4 sm:p-5 rounded-3xl bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 flex items-start space-x-3">
          <Clock className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
              Time & Weather Advisory • {timeContext?.timeString} ({timeContext?.phaseLabel})
            </span>
            <p className="text-xs text-zinc-900 dark:text-zinc-100 mt-1 leading-relaxed font-semibold">
              {currentUrgentAdvisory}
            </p>
          </div>
        </div>
      )}

      {/* Top Banner with One-Click Multi-AI Launcher */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-400/40">
              {t.jugaad.headerBadge}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">• {t.jugaad.zeroCost}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white mt-1.5">
            {t.jugaad.title}
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 max-w-2xl leading-relaxed">
            {t.jugaad.description}
          </p>
        </div>

        {/* Action Button: One-Click Multi-AI Deep Dive */}
        <button
          onClick={onOpenMultiAi}
          className="shrink-0 flex items-center space-x-2 px-5 py-3 rounded-2xl bg-zinc-950 dark:bg-emerald-500 text-white dark:text-zinc-950 text-xs font-bold shadow-md transition-all group hover:scale-102"
        >
          <Bot className="w-4 h-4 text-emerald-400 dark:text-zinc-950" />
          <span>Ask ChatGPT / Claude / Gemini</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Main Feature: Interactive ₹1,200 DIY Box-Fan CADR Calculator */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                {t.jugaad.boxFanTitle}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                {t.jugaad.boxFanSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-400/50">
              {cadrStats.costSavingsMultiple}x {t.jugaad.costEfficientBadge}
            </span>
          </div>
        </div>

        {/* Interactive Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-100 dark:bg-zinc-800/90 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-700 mb-6">
          <div>
            <div className="flex justify-between text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              <span>{t.jugaad.targetRoomSize}</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">{roomSqft} sq. ft.</span>
            </div>
            <input
              type="range"
              min="80"
              max="600"
              step="10"
              value={roomSqft}
              onChange={(e) => setRoomSqft(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
              <span>Small Bedroom (100 sq ft)</span>
              <span>Large Hall (500 sq ft)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              <span>{t.jugaad.fanSpeed}</span>
              <span className="capitalize font-mono text-emerald-600 dark:text-emerald-400">{fanSpeed}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['low', 'medium', 'high'].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setFanSpeed(speed)}
                  className={`py-1.5 rounded-xl text-xs font-bold capitalize transition-all border cursor-pointer select-none active:scale-95 ${
                    fanSpeed === speed
                      ? 'bg-zinc-950 text-white dark:bg-emerald-500 dark:text-zinc-950 border-zinc-950 dark:border-emerald-400 shadow-xs'
                      : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700'
                  }`}
                >
                  {speed}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 block">
              Noise: {cadrStats.noiseDb} dB • Power: {cadrStats.powerWatts} Watts
            </span>
          </div>
        </div>

        {/* Live Mathematical Output Metrics (High Visibility in Dark Mode) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-6">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-xs">
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 block">{t.jugaad.deliveredCadr}</span>
            <span className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">{cadrStats.effectiveCadrCfm}</span>
            <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 ml-1">CFM</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-xs">
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 block">{t.jugaad.ach}</span>
            <span className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">{cadrStats.achievedAch}</span>
            <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 ml-1">ACH</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-xs">
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 block">{t.jugaad.cleanTime}</span>
            <span className="text-xl sm:text-2xl font-extrabold font-mono text-zinc-950 dark:text-white">{cadrStats.timeTo90ReductionMin}</span>
            <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 ml-1">mins</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-xs">
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 block">{t.jugaad.costPerCfm}</span>
            <span className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">₹{cadrStats.costPerCfmDiy}</span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">{t.jugaad.commercialCompare}</span>
          </div>
        </div>

        {/* View Details Button */}
        {customizedJugaadList[0] && (
          <button
            onClick={() => onSelectJugaad(customizedJugaadList[0])}
            className="w-full flex items-center justify-center space-x-2 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-xs font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 transition-all cursor-pointer active:scale-[0.99]"
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.jugaad.viewGuideBtn}</span>
          </button>
        )}
      </div>

      {/* Dynamically Generated Personalized Hacks for User's Active Profile */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            {t.jugaad.tailoredSectionTitle}
          </span>
          <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
            {customizedJugaadList.length} recommendations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customizedJugaadList.map((jugaad, idx) => (
            <div key={idx} className="p-5 rounded-3xl glass-card flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-400/50">
                    {jugaad.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">{jugaad.cost}</span>
                </div>

                <h4 className="text-sm font-bold mt-1 text-zinc-950 dark:text-white">{jugaad.title}</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-relaxed">
                  {jugaad.impact}
                </p>

                <div className="mt-3 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700">
                  <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 block">
                    <strong className="text-zinc-950 dark:text-white">Quick step:</strong> {jugaad.instruction}
                  </span>
                </div>
              </div>

              {/* View More Button (Opens In-Place Modal) */}
              <button
                onClick={() => onSelectJugaad(jugaad)}
                className="mt-4 flex items-center justify-center space-x-1.5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-emerald-100 dark:hover:bg-emerald-950/80 text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer active:scale-[0.98]"
              >
                <span>{t.jugaad.viewGuideBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
