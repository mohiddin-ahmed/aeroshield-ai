import React, { useState } from 'react';
import { Wrench, Sparkles, Sliders, Droplets, Shield, ExternalLink, Bot, Check, ArrowRight, Clock, AlertCircle } from 'lucide-react';
import { calculateDiyPurifierStats } from '../utils/cadrCalculator';

export function DesiJugaadLab({ onOpenMultiAi, telemetry, personalizedIntel, timeContext }) {
  const [roomSqft, setRoomSqft] = useState(220);
  const [fanSpeed, setFanSpeed] = useState('medium');

  const cadrStats = calculateDiyPurifierStats(roomSqft, fanSpeed);
  const { customizedJugaadList = [], currentUrgentAdvisory } = personalizedIntel || {};

  return (
    <div className="space-y-6">
      
      {/* Top Personalized Time & Weather Advisory */}
      {currentUrgentAdvisory && (
        <div className="p-4 sm:p-5 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-start space-x-3">
          <Clock className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#10B981] block">
              Time & Meteorological Advisory • {timeContext?.timeString} ({timeContext?.phaseLabel})
            </span>
            <p className="text-xs text-[#282828] dark:text-white/90 mt-1 leading-relaxed font-medium">
              {currentUrgentAdvisory}
            </p>
          </div>
        </div>
      )}

      {/* Top Banner with One-Click Multi-AI Launcher */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-[#10B981]/20 text-[#059669] dark:text-[#34D399] px-2.5 py-1 rounded-full">
              Desi Jugaad Lab • Tailored for You
            </span>
            <span className="text-xs opacity-60">• Zero-Cost Clean Air</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight mt-1.5">
            Personalized Indoor Air Quality Hacks
          </h2>
          <p className="text-xs opacity-75 mt-1 max-w-2xl leading-relaxed">
            Clean air is a fundamental human right. You do not need ₹25,000 imported appliances. These field-tested, science-backed household hacks are dynamically tailored to your current weather, local time, and family vulnerabilities.
          </p>
        </div>

        {/* Action Button: One-Click Multi-AI Deep Dive */}
        <button
          onClick={onOpenMultiAi}
          className="shrink-0 flex items-center space-x-2 px-5 py-3 rounded-2xl bg-[#282828] dark:bg-white dark:text-[#282828] text-white text-xs font-bold shadow-md transition-all group hover:scale-102"
        >
          <Bot className="w-4 h-4 text-[#10B981] dark:text-emerald-700" />
          <span>Ask ChatGPT / Claude / Gemini</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Main Feature: Interactive ₹1,200 DIY Box-Fan CADR Calculator */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#10B981] text-white dark:text-[#18181B] flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                ₹1,200 DIY Box-Fan HEPA Purifier (Corsi-Rosenthal Minimal)
              </h3>
              <p className="text-xs opacity-60">
                20-inch standard box fan + MERV 13 / H13 sheet. Outperforms ₹24,000 branded units.
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20">
              {cadrStats.costSavingsMultiple}x More Cost-Efficient
            </span>
          </div>
        </div>

        {/* Interactive Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/3 dark:bg-white/5 p-5 rounded-2xl border border-black/5 dark:border-white/10 mb-6">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span>Target Room Size</span>
              <span className="font-mono">{roomSqft} sq. ft.</span>
            </div>
            <input
              type="range"
              min="80"
              max="600"
              step="10"
              value={roomSqft}
              onChange={(e) => setRoomSqft(Number(e.target.value))}
              className="w-full accent-[#10B981] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] opacity-50 mt-1">
              <span>Small Bedroom (100 sq ft)</span>
              <span>Large Hall (500 sq ft)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span>Fan Speed Setting</span>
              <span className="capitalize font-mono">{fanSpeed}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['low', 'medium', 'high'].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setFanSpeed(speed)}
                  className={`py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    fanSpeed === speed
                      ? 'bg-[#282828] dark:bg-white text-white dark:text-[#282828] shadow-xs'
                      : 'bg-white dark:bg-white/10 opacity-70 hover:opacity-100 border border-black/5 dark:border-white/10'
                  }`}
                >
                  {speed}
                </button>
              ))}
            </div>
            <span className="text-[10px] opacity-50 mt-1 block">
              Noise: {cadrStats.noiseDb} dB • Power: {cadrStats.powerWatts} Watts
            </span>
          </div>
        </div>

        {/* Live Mathematical Output Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-6">
          <div className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10">
            <span className="text-[11px] opacity-60 block">Delivered CADR</span>
            <span className="text-xl font-bold font-mono text-[#10B981]">{cadrStats.effectiveCadrCfm}</span>
            <span className="text-[10px] font-mono opacity-50 ml-1">CFM</span>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10">
            <span className="text-[11px] opacity-60 block">Air Changes/Hr (ACH)</span>
            <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">{cadrStats.achievedAch}</span>
            <span className="text-[10px] font-mono opacity-50 ml-1">ACH</span>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10">
            <span className="text-[11px] opacity-60 block">90% Clean Time</span>
            <span className="text-xl font-bold font-mono">{cadrStats.timeTo90ReductionMin}</span>
            <span className="text-[10px] font-mono opacity-50 ml-1">mins</span>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10">
            <span className="text-[11px] opacity-60 block">Cost / CFM Clean Air</span>
            <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">₹{cadrStats.costPerCfmDiy}</span>
            <span className="text-[10px] opacity-50 block">vs ₹96 commercial</span>
          </div>
        </div>

        {/* Assembly Steps */}
        <div className="p-4 rounded-2xl bg-black/3 dark:bg-white/5 border border-black/5 dark:border-white/10">
          <h4 className="text-xs font-bold mb-1">Simple 3-Step Assembly (15 minutes):</h4>
          <ol className="text-xs opacity-85 space-y-1 list-decimal list-inside leading-relaxed">
            <li>Buy any standard 20-inch box fan (₹850-₹900) and one 20x20 MERV 13 / H13 filter sheet (₹350-₹450).</li>
            <li>Place the filter on the rear suction intake (arrow pointing towards the fan blades).</li>
            <li>Seal the perimeter tightly with packing tape to eliminate air bypass. Plug in and run on medium.</li>
          </ol>
        </div>
      </div>

      {/* Dynamically Generated Personalized Hacks for User's Active Profile */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold uppercase tracking-wider opacity-60">
            Tailored Solutions for Your Profile & Weather
          </span>
          <span className="text-[11px] font-mono text-[#10B981]">
            {customizedJugaadList.length} customized recommendations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customizedJugaadList.map((jugaad, idx) => (
            <div key={idx} className="p-5 rounded-3xl glass-card flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-[#10B981] bg-[#10B981]/15 px-2.5 py-0.5 rounded-full border border-[#10B981]/20">
                    {jugaad.badge}
                  </span>
                  <span className="text-xs font-mono font-bold">{jugaad.cost}</span>
                </div>

                <h4 className="text-sm font-bold mt-1">{jugaad.title}</h4>
                <p className="text-xs opacity-75 mt-1 leading-relaxed">
                  {jugaad.impact}
                </p>

                <div className="mt-3 p-3 rounded-xl bg-black/3 dark:bg-white/5 border border-black/5 dark:border-white/10">
                  <span className="text-xs font-medium opacity-90 block">
                    <strong>How to make:</strong> {jugaad.instruction}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
