import React, { useState } from 'react';
import { BookOpen, ExternalLink, HeartPulse, Calculator, Cigarette } from 'lucide-react';
import { researchArticles } from '../services/researchArticlesData';
import { translations } from '../utils/i18n';

export function ResearchHub({ telemetry, currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;
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
          <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-400/40">
            {t.research.badge}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">• {t.research.academicCitations}</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white mt-2">
          {t.research.title}
        </h2>
        <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-1 max-w-3xl leading-relaxed">
          {t.research.description}
        </p>
      </div>

      {/* Interactive Particulate Dosimetry & Cigarette Savings Calculator */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-emerald-500/20 shadow-md">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-zinc-950 dark:bg-emerald-500 text-emerald-400 dark:text-zinc-950 flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
              {t.research.calculatorTitle}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-300">
              {t.research.calculatorSubtitle}
            </p>
          </div>
        </div>

        {/* Safeguard Toggles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
          {[
            { id: 'diyPurifier', label: 'DIY Box-Fan (300 CFM)' },
            { id: 'solarVentilation', label: '1-3 PM Solar Window' },
            { id: 'wetMopping', label: 'Rock-Salt Wet Mop' },
            { id: 'n95Commute', label: 'N95 Sealed Mask' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSafeguards(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
              className={`p-3 rounded-2xl text-xs font-bold text-left transition-all border ${
                activeSafeguards[item.id]
                  ? 'bg-zinc-950 text-white dark:bg-emerald-500 dark:text-zinc-950 border-zinc-950 dark:border-emerald-400 shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{item.label}</span>
                <span className={`w-2 h-2 rounded-full ${activeSafeguards[item.id] ? 'bg-emerald-400 dark:bg-zinc-950' : 'bg-zinc-400 dark:bg-zinc-500'}`} />
              </div>
            </button>
          ))}
        </div>

        {/* Results Banner (Harmonized for Dark Mode - NO White Box) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-100 dark:bg-zinc-800/90 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-xs">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-800 dark:text-emerald-300 shrink-0">
              <HeartPulse className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xs text-zinc-600 dark:text-zinc-300 font-bold block">{t.research.totalAvoided}</span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-950 dark:text-white">
                {totalAvoidedUg} <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 font-semibold">μg / day</span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/80 flex items-center justify-center text-rose-700 dark:text-rose-300 shrink-0">
              <Cigarette className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xs text-zinc-600 dark:text-zinc-300 font-bold block">{t.research.cigarettesPrevented}</span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-600 dark:text-rose-400">
                {cigarettesAvoided} <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 font-semibold">{t.dial.cigarettesUnit}</span>
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
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              selectedCategory === cat
                ? 'bg-zinc-950 text-white dark:bg-emerald-500 dark:text-zinc-950 border-zinc-950 dark:border-emerald-400 shadow-xs'
                : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700'
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
            className="p-6 rounded-3xl glass-card space-y-3 hover:shadow-md transition-shadow border border-zinc-200 dark:border-zinc-700"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold font-mono text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">
                  {paper.journal} • {paper.year}
                </span>
                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-400/50">
                  {paper.evidenceScore}
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                DOI: {paper.doi}
              </span>
            </div>

            <h3 className="text-lg font-bold text-zinc-950 dark:text-white tracking-tight">
              {paper.title}
            </h3>

            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Authors: {paper.authors}
            </p>

            <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed bg-zinc-100 dark:bg-zinc-800/80 p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-700">
              <strong className="text-zinc-950 dark:text-white">Core Clinical Finding:</strong> {paper.keyTakeaway}
            </p>

            <div className="flex flex-wrap items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-700/80 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="italic">{paper.citationApa}</span>
              <a
                href={`https://doi.org/${paper.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-bold mt-1 sm:mt-0"
              >
                <span>{t.research.readJournalBtn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
