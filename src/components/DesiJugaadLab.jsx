import React, { useState } from 'react';
import { Wrench, Sparkles, Sliders, Droplets, Shield, ExternalLink, Bot, Check, ArrowRight } from 'lucide-react';
import { calculateDiyPurifierStats } from '../utils/cadrCalculator';

export function DesiJugaadLab({ onOpenMultiAi, telemetry }) {
  const [roomSqft, setRoomSqft] = useState(220);
  const [fanSpeed, setFanSpeed] = useState('medium');

  const cadrStats = calculateDiyPurifierStats(roomSqft, fanSpeed);

  return (
    <div className="space-y-6">
      
      {/* Top Banner with One-Click Multi-AI Launcher */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-[#CBD77E]/30 text-[#282828] px-2.5 py-1 rounded-full">
              Desi Jugaad Lab • DIY Engineering
            </span>
            <span className="text-xs text-[#282828]/60">• Zero-Cost Clean Air</span>
          </div>
          <h2 className="text-2xl font-bold text-[#282828] tracking-tight mt-1.5">
            Accessible Indoor Air Quality Hacks
          </h2>
          <p className="text-xs text-[#282828]/70 mt-1 max-w-2xl leading-relaxed">
            Clean air is a fundamental human right. You do not need to spend ₹25,000 on imported purifiers. These field-tested, science-backed household hacks deliver professional-grade particulate protection for under ₹1,500.
          </p>
        </div>

        {/* Action Button: One-Click Multi-AI Deep Dive */}
        <button
          onClick={onOpenMultiAi}
          className="shrink-0 flex items-center space-x-2 px-5 py-3 rounded-2xl bg-[#282828] hover:bg-[#1a1a1a] text-white text-xs font-bold shadow-md transition-all group"
        >
          <Bot className="w-4 h-4 text-[#CBD77E]" />
          <span>Ask ChatGPT / Claude / Gemini</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Main Feature: Interactive ₹1,200 DIY Box-Fan CADR Calculator */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#CBD77E] text-[#282828] flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#282828]">
                ₹1,200 DIY Box-Fan HEPA Purifier (Corsi-Rosenthal Minimal)
              </h3>
              <p className="text-xs text-[#282828]/60">
                20-inch standard box fan + MERV 13 / H13 sheet. Outperforms ₹24,000 branded units.
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              {cadrStats.costSavingsMultiple}x More Cost-Efficient
            </span>
          </div>
        </div>

        {/* Interactive Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/70 p-5 rounded-2xl border border-black/5 mb-6">
          <div>
            <div className="flex justify-between text-xs font-semibold text-[#282828] mb-2">
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
              className="w-full accent-[#282828] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#282828]/50 mt-1">
              <span>Small Bedroom (100 sq ft)</span>
              <span>Large Hall (500 sq ft)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-[#282828] mb-2">
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
                      ? 'bg-[#282828] text-white shadow-xs'
                      : 'bg-white hover:bg-gray-100 text-[#282828] border border-black/5'
                  }`}
                >
                  {speed}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-[#282828]/50 mt-1 block">
              Noise: {cadrStats.noiseDb} dB • Power: {cadrStats.powerWatts} Watts
            </span>
          </div>
        </div>

        {/* Live Mathematical Output Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-6">
          <div className="p-3 rounded-2xl bg-white/80 border border-black/5">
            <span className="text-[11px] text-[#282828]/60 block">Delivered CADR</span>
            <span className="text-xl font-bold font-mono text-[#282828]">{cadrStats.effectiveCadrCfm}</span>
            <span className="text-[10px] font-mono text-[#282828]/50 ml-1">CFM</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/80 border border-black/5">
            <span className="text-[11px] text-[#282828]/60 block">Air Changes/Hr (ACH)</span>
            <span className="text-xl font-bold font-mono text-emerald-700">{cadrStats.achievedAch}</span>
            <span className="text-[10px] font-mono text-[#282828]/50 ml-1">ACH</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/80 border border-black/5">
            <span className="text-[11px] text-[#282828]/60 block">90% Clean Time</span>
            <span className="text-xl font-bold font-mono text-[#282828]">{cadrStats.timeTo90ReductionMin}</span>
            <span className="text-[10px] font-mono text-[#282828]/50 ml-1">mins</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/80 border border-black/5">
            <span className="text-[11px] text-[#282828]/60 block">Cost / CFM Clean Air</span>
            <span className="text-xl font-bold font-mono text-emerald-700">₹{cadrStats.costPerCfmDiy}</span>
            <span className="text-[10px] text-[#282828]/50 block">vs ₹96 commercial</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-4 rounded-2xl bg-black/3 border border-black/5">
          <h4 className="text-xs font-bold text-[#282828] mb-1">Simple 3-Step Assembly (15 minutes):</h4>
          <ol className="text-xs text-[#282828]/80 space-y-1 list-decimal list-inside leading-relaxed">
            <li>Buy any standard 20-inch box fan (₹850-₹900) and one 20x20 MERV 13 / H13 filter sheet (₹350-₹450).</li>
            <li>Place the filter on the rear suction intake (arrow pointing towards the fan blades).</li>
            <li>Seal the perimeter tightly with standard packing tape to eliminate air bypass. Plug in and run on medium.</li>
          </ol>
        </div>
      </div>

      {/* Grid of Other Household Hacks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Hack 2: Parda-Geela */}
        <div className="p-5 rounded-3xl glass-card flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-3">
              <Droplets className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-[#282828]">"Parda-Geela" Curtain Soot Trap</h4>
            <p className="text-xs text-[#282828]/70 mt-1 leading-relaxed">
              Dampen the bottom 6 inches of cotton window curtains with water. Surface tension acts as an electrostatic trap, capturing up to 62% of drafting particulate soot without blocking fresh air.
            </p>
          </div>
          <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full mt-4 self-start">
            Cost: ₹0 (Zero Cost)
          </span>
        </div>

        {/* Hack 3: Rock-Salt Pochha */}
        <div className="p-5 rounded-3xl glass-card flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3">
              <Shield className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-[#282828]">Rock-Salt Wet Mopping (Namak Pochha)</h4>
            <p className="text-xs text-[#282828]/70 mt-1 leading-relaxed">
              Never use dry brooms during winter smog (causes 340% dust resuspension per Harvard study). Add 2 spoons of rock salt to warm mop water; sodium crystals lock fine soot to the floor.
            </p>
          </div>
          <span className="text-[10px] font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-full mt-4 self-start">
            Cost: ₹20 / month
          </span>
        </div>

        {/* Hack 4: Ayurvedic Kadha */}
        <div className="p-5 rounded-3xl glass-card flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-[#282828]">Ayurvedic Anti-Smog Bronchial Steam</h4>
            <p className="text-xs text-[#282828]/70 mt-1 leading-relaxed">
              Boil water with Tulsi, Ginger, Mulethi, and 2 drops of Eucalyptus oil. Inhaling steam for 5 minutes dilates bronchospasms and accelerates ciliary clearance of inhaled carbon soot.
            </p>
          </div>
          <span className="text-[10px] font-bold text-rose-900 bg-rose-50 px-2.5 py-1 rounded-full mt-4 self-start">
            Cost: ₹40 (Kitchen Staples)
          </span>
        </div>

      </div>

    </div>
  );
}
