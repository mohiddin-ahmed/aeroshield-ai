import { useState } from 'react';
import { researchArticles } from '../data/researchArticlesData';
import type { AirQualityTelemetry, SupportedLanguageCode } from '../types/airQuality';
import { translations } from '../utils/i18n';
import { DosimetryCalculator } from './DosimetryCalculator';
import { ResearchArticleCard } from './ResearchArticleCard';

const CATEGORIES = [
  'All',
  'Epidemiology',
  'Clinical Medicine',
  'Atmospheric Physics',
  'Indoor Filtration',
  'Public Health'
] as const;

export interface ResearchHubProps {
  telemetry: Pick<AirQualityTelemetry, 'pm2_5'>;
  currentLang?: SupportedLanguageCode;
}

/**
 * Peer-Reviewed Scientific Evidence & Interactive Berkeley Earth Dosimetry Hub.
 * Enables category filtering across Lancet, IIT Kanpur, Harvard, Berkeley Earth, and WHO citations.
 */
export function ResearchHub({ telemetry, currentLang = 'en' }: ResearchHubProps) {
  const t = translations[currentLang] || translations.en;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filtered =
    selectedCategory === 'All'
      ? researchArticles
      : researchArticles.filter((article) => article.category === selectedCategory);

  return (
    <div className="space-y-6">
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

      <DosimetryCalculator
        pm25={telemetry.pm2_5}
        t={t.research}
        cigarettesUnitLabel={t.dial.cigarettesUnit}
      />

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

      <div className="space-y-4">
        {filtered.map((paper) => (
          <ResearchArticleCard
            key={paper.id}
            paper={paper}
            readJournalLabel={t.research.readJournalBtn}
          />
        ))}
      </div>
    </div>
  );
}
