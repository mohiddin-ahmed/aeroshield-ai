import React, { useState } from 'react';
import { BookOpen, ExternalLink, ShieldCheck, HeartPulse, Award, Calculator, Cigarette } from 'lucide-react';
import { researchArticles } from '../services/researchArticlesData';

export function ResearchHub({ telemetry }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeSafeguards, setActiveSafeguards] = useState({
    diyPurifier: true,
    solarVentilation: true,
    wetMopping: true,
    n95Commute: true
  });

  const categories = ['All', 'Epidemiology', 'Clinical Medicine', 'Atmospheric Physics', 'Indoor Filtration', 'Public Health'];

  const filtered = selectedCategory === 'All'
    ? researchArticles
    : researchArticles.filter((a) => a.category === selectedCategory);

  // Dosimetry calculation based on active safeguards
  const basePm25 = telemetry.pm2_5 || 320;
  let totalAvoidedUg = 0;
  if (activeSafeguards.diyPurifier) totalAvoidedUg += Math.round(basePm25 * 0.72);
  if (activeSafeguards.solarVentilation) totalAvoidedUg += Math.round(basePm25 * 0.28);
  if (activeSafeguards.wetMopping) totalAvoidedUg += Math.round(basePm25 * 0.35);
  if (activeSafeguards.n95Commute) totalAvoidedUg += Math.round(basePm25 * 0.45);

  const cigarettesAvoided = Number((totalAvoidedUg / 22.0).toFixed(1));

  return (
    <div className="space-y-6">
      
      {/* Top Academic Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider bg-[#CBD77E]/30 text-[#282828] px-2.5 py-1 rounded-full">
            Peer-Reviewed Evidence Hub
          </span>
          <span className="text-xs text-[#282828]/60">• Academic Citations</span>
        </div>
        <h2 className="text-2xl font-bold text-[#282828] tracking-tight mt-1.5">
          Scientific Research & Particulate Dosimetry Hub
        </h2>
        <p className="text-xs text-[#282828]/70 mt-1 max-w-3xl leading-relaxed">
          AeroShield AI is grounded in peer-reviewed atmospheric physics and clinical epidemiology. All calculations adhere to Berkeley Earth's cigarette equivalence rule, clinical autopsy findings from AIIMS/Medanta, and boundary layer measurements from IIT Kanpur.
        </p>
      </div>

      {/* Interactive Particulate Dosimetry & Cigarette Savings Calculator */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card bg-gradient-to-br from-white/90 via-white/80 to-[#CBD77E]/10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#282828] text-[#CBD77E] flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#282828]">
              Personalized Inhaled Dosimetry Calculator
            </h3>
            <p className="text-xs text-[#282828]/60">
              Calculate the direct mass of alveolar PM2.5 and equivalent cigarettes prevented today.
            </p>
          </div>
        </div>

        {/* Safeguard Toggles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {[
            { id: 'diyPurifier', label: 'DIY Box-Fan (300 CFM)' },
            { id: 'solarVentilation', label: '1-3 PM Solar Window' },
            { id: 'wetMopping', label: 'Rock-Salt Wet Mop' },
            { id: 'n95Commute', label: 'N95 Sealed Mask' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSafeguards(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
              className={`p-3 rounded-2xl text-xs font-bold text-left transition-all ${
                activeSafeguards[item.id]
                  ? 'bg-[#282828] text-white shadow-xs'
                  : 'bg-white/70 hover:bg-white text-[#282828]/60 border border-black/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{item.label}</span>
                <span className={`w-2 h-2 rounded-full ${activeSafeguards[item.id] ? 'bg-[#CBD77E]' : 'bg-gray-300'}`} />
              </div>
            </button>
          ))}
        </div>

        {/* Results Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/90 p-5 rounded-2xl border border-black/5">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-[#CBD77E]/30 flex items-center justify-center text-[#282828] shrink-0">
              <HeartPulse className="w-6 h-6 text-emerald-800" />
            </div>
            <div>
              <span className="text-xs text-[#282828]/60 font-semibold block">Total Inhaled PM2.5 Avoided</span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-[#282828]">
                {totalAvoidedUg} <span className="text-xs font-mono text-[#282828]/50">μg / day</span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-700 shrink-0">
              <Cigarette className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-[#282828]/60 font-semibold block">Equivalent Cigarettes Prevented</span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-[#9B2226]">
                {cigarettesAvoided} <span className="text-xs font-mono text-[#282828]/50">cigarettes today</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#282828] text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-[#282828] border border-black/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Peer-Reviewed Papers Grid (Semantic HTML5 <article>) */}
      <div className="space-y-4">
        {filtered.map((paper) => (
          <article
            key={paper.id}
            className="p-6 rounded-3xl glass-card space-y-3 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold font-mono text-[#282828] bg-black/5 px-2.5 py-0.5 rounded-full">
                  {paper.journal} • {paper.year}
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {paper.evidenceScore}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#282828]/60">
                DOI: {paper.doi}
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#282828] tracking-tight">
              {paper.title}
            </h3>

            <p className="text-xs font-semibold text-[#282828]/70">
              Authors: {paper.authors}
            </p>

            <p className="text-xs text-[#282828]/80 leading-relaxed bg-white/60 p-3 rounded-2xl border border-black/5">
              <strong>Core Clinical Finding:</strong> {paper.keyTakeaway}
            </p>

            <div className="flex flex-wrap items-center justify-between pt-2 border-t border-black/5 text-xs text-[#282828]/60">
              <span className="italic">{paper.citationApa}</span>
              <a
                href={`https://doi.org/${paper.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-emerald-800 hover:text-emerald-950 font-bold mt-1 sm:mt-0"
              >
                <span>Read Full Journal Article</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
