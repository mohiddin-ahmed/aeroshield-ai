import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ExternalLink, HeartPulse, Calculator, Cigarette } from 'lucide-react';
import { researchArticles } from '../services/researchArticlesData';
import { translations } from '../utils/i18n';
import { BERKELEY_EARTH_PM25_PER_CIGARETTE } from '../constants/airQuality';

const SAFEGUARD_ITEMS = [
  { id: 'diyPurifier', label: 'DIY Box-Fan (300 CFM)', reductionFactor: 0.72 },
  { id: 'solarVentilation', label: '1-3 PM Solar Window', reductionFactor: 0.28 },
  { id: 'wetMopping', label: 'Rock-Salt Wet Mop', reductionFactor: 0.35 },
  { id: 'n95Commute', label: 'N95 Sealed Mask', reductionFactor: 0.45 }
];

const CATEGORIES = [
  'All',
  'Epidemiology',
  'Clinical Medicine',
  'Atmospheric Physics',
  'Indoor Filtration',
  'Public Health'
];

/**
 * Peer-Reviewed Scientific Evidence & Interactive Berkeley Earth Dosimetry Hub.
 * Enables category filtering across Lancet, IIT Kanpur, Harvard, Berkeley Earth, and WHO citations.
 * @param {object} props - Component props.
 * @returns {JSX.Element} Research and clinical dosimetry view.
 */
export function ResearchHub({ telemetry, currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeSafeguards, setActiveSafeguards] = useState({
    diyPurifier: true,
    solarVentilation: true,
    wetMopping: true,
    n95Commute: true
  });

  const filtered =
    selectedCategory === 'All'
      ? researchArticles
      : researchArticles.filter((article) => article.category === selectedCategory);

  const basePm25 = telemetry.pm2_5 || 320;
  const totalAvoidedUg = SAFEGUARD_ITEMS.reduce((acc, item) => {
    return activeSafeguards[item.id] ? acc + Math.round(basePm25 * item.reductionFactor) : acc;
  }, 0);

  const cigarettesAvoided = Number((totalAvoidedUg / BERKELEY_EARTH_PM25_PER_CIGARETTE).toFixed(1));

  return (
    <div className="space-y-6">
      {/* Top Academic Header */}
      <section aria-label={t.research.title} className="p-6 sm:p-8 rounded-3xl glass-card">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-400/40">
            {t.research.badge}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            • {t.research.academicCitations}
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white mt-2">
          {t.research.title}
        </h2>
        <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-1 max-w-3xl leading-relaxed">
          {t.research.description}
        </p>
      </section>

      {/* Interactive Particulate Dosimetry Calculator */}
      <section
        aria-label={t.research.calculatorTitle}
        className="p-6 sm:p-8 rounded-3xl glass-card border border-emerald-500/20 shadow-md"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div
            className="w-10 h-10 rounded-2xl bg-zinc-950 dark:bg-emerald-500 text-emerald-400 dark:text-zinc-950 flex items-center justify-center font-bold"
            aria-hidden="true"
          >
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
        <div
          role="group"
          aria-label="Clean-air household safeguards"
          className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6"
        >
          {SAFEGUARD_ITEMS.map((item) => {
            const isActive = Boolean(activeSafeguards[item.id]);
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isActive}
                onClick={() =>
                  setActiveSafeguards((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                }
                className={`p-3 rounded-2xl text-xs font-bold text-left transition-all border cursor-pointer select-none active:scale-98 ${
                  isActive
                    ? 'bg-zinc-950 text-white dark:bg-emerald-500 dark:text-zinc-950 border-zinc-950 dark:border-emerald-400 shadow-xs'
                    : 'bg-zinc-100 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={`w-2 h-2 rounded-full ${
                      isActive ? 'bg-emerald-400 dark:bg-zinc-950' : 'bg-zinc-400 dark:bg-zinc-500'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Results Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-100 dark:bg-zinc-800/90 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-xs">
          <div className="flex items-center space-x-3.5">
            <div
              className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-800 dark:text-emerald-300 shrink-0"
              aria-hidden="true"
            >
              <HeartPulse className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xs text-zinc-600 dark:text-zinc-300 font-bold block">
                {t.research.totalAvoided}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-950 dark:text-white">
                {totalAvoidedUg}{' '}
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 font-semibold">
                  μg / day
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div
              className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/80 flex items-center justify-center text-rose-700 dark:text-rose-300 shrink-0"
              aria-hidden="true"
            >
              <Cigarette className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xs text-zinc-600 dark:text-zinc-300 font-bold block">
                {t.research.cigarettesPrevented}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-600 dark:text-rose-400">
                {cigarettesAvoided}{' '}
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 font-semibold">
                  {t.dial.cigarettesUnit}
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <div
        role="group"
        aria-label="Filter research publications by discipline"
        className="flex items-center space-x-2 overflow-x-auto pb-1"
      >
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            aria-pressed={selectedCategory === category}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border cursor-pointer select-none active:scale-95 ${
              selectedCategory === category
                ? 'bg-zinc-950 text-white dark:bg-emerald-500 dark:text-zinc-950 border-zinc-950 dark:border-emerald-400 shadow-xs'
                : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Peer-Reviewed Citations List */}
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
              <strong className="text-zinc-950 dark:text-white">Core Clinical Finding:</strong>{' '}
              {paper.keyTakeaway}
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
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

ResearchHub.propTypes = {
  telemetry: PropTypes.shape({
    pm2_5: PropTypes.number
  }).isRequired,
  currentLang: PropTypes.string
};
