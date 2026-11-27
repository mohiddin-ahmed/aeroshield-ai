import { ArrowRight, Bot, Clock } from 'lucide-react';
import type {
  JugaadProtocol,
  PersonalizedIntelligence,
  SupportedLanguageCode,
  TimeContext
} from '../types/airQuality';
import { translations } from '../utils/i18n';
import { CadrCalculatorCard } from './CadrCalculatorCard';
import { JugaadProtocolCard } from './JugaadProtocolCard';

export interface DesiJugaadLabProps {
  onOpenMultiAi: () => void;
  personalizedIntel?: Partial<PersonalizedIntelligence>;
  timeContext?: Partial<TimeContext>;
  onSelectJugaad: (item: JugaadProtocol) => void;
  currentLang?: SupportedLanguageCode;
}

/**
 * Interactive Desi Jugaad Clean-Air Lab composing the fluid-dynamics CADR calculator
 * and dynamically tailored, low-cost household soot defense protocols.
 */
export function DesiJugaadLab({
  onOpenMultiAi,
  personalizedIntel,
  timeContext,
  onSelectJugaad,
  currentLang = 'en'
}: DesiJugaadLabProps) {
  const t = translations[currentLang] || translations.en;
  const { customizedJugaadList = [], currentUrgentAdvisory } = personalizedIntel || {};

  return (
    <div className="space-y-6">
      {currentUrgentAdvisory && (
        <div className="p-4 sm:p-5 rounded-3xl bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 flex items-start space-x-3">
          <Clock className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
              Time &amp; Weather Advisory • {timeContext?.timeString} ({timeContext?.phaseLabel})
            </span>
            <p className="text-xs text-zinc-900 dark:text-zinc-100 mt-1 leading-relaxed font-semibold">
              {currentUrgentAdvisory}
            </p>
          </div>
        </div>
      )}

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

        <button
          type="button"
          onClick={onOpenMultiAi}
          className="shrink-0 flex items-center space-x-2 px-5 py-3 rounded-2xl bg-zinc-950 dark:bg-emerald-500 text-white dark:text-zinc-950 text-xs font-bold shadow-md transition-all group hover:scale-102 cursor-pointer"
        >
          <Bot className="w-4 h-4 text-emerald-400 dark:text-zinc-950" aria-hidden="true" />
          <span>Ask ChatGPT / Claude / Gemini</span>
          <ArrowRight
            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
            aria-hidden="true"
          />
        </button>
      </div>

      <CadrCalculatorCard
        t={t.jugaad}
        featuredProtocol={customizedJugaadList[0]}
        onSelectProtocol={onSelectJugaad}
      />

      <section aria-label={t.jugaad.tailoredSectionTitle}>
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            {t.jugaad.tailoredSectionTitle}
          </span>
          <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
            {customizedJugaadList.length} recommendations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customizedJugaadList.map((jugaad) => (
            <JugaadProtocolCard
              key={jugaad.id}
              jugaad={jugaad}
              viewGuideLabel={t.jugaad.viewGuideBtn}
              onSelect={onSelectJugaad}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
