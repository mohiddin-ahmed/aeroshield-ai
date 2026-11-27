import { Bot, Compass, Sparkles } from 'lucide-react';
import type { LocationData, TimeContext } from '../types/airQuality';
import type { TranslationCatalog } from '../utils/i18n';
import { CitySelector } from './CitySelector';

export interface LocationHeroBannerProps {
  locationData: Pick<LocationData, 'city' | 'country'>;
  timeContext: Pick<TimeContext, 'dateString' | 'timeString' | 'phaseLabel'>;
  t: TranslationCatalog;
  onSelectCity: (cityKey: string) => void;
  onRefreshLocation?: () => void;
  onOpenMultiAi: () => void;
  onGeneratePlan: () => void;
  isGenerating: boolean;
  isLoadingTelemetry?: boolean;
}

/**
 * Compact top location/clock strip paired with searchable city picker, Ask AI button,
 * and Gemini plan CTA so the circular AQI dial sits prominently above the fold.
 */
export function LocationHeroBanner({
  locationData,
  timeContext,
  t,
  onSelectCity,
  onRefreshLocation,
  onOpenMultiAi,
  onGeneratePlan,
  isGenerating,
  isLoadingTelemetry
}: LocationHeroBannerProps) {
  return (
    <section
      aria-label="Location and quick actions"
      className="relative z-30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl glass-card"
    >
      <div className="flex items-center space-x-2.5 min-w-0">
        <div
          className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <Compass className="w-4 h-4 stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {t.status.autoDetected}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-200/80 dark:bg-zinc-700/80 text-zinc-700 dark:text-zinc-200 font-mono font-semibold whitespace-nowrap">
              {timeContext.dateString}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-extrabold tracking-tight text-zinc-950 dark:text-white truncate">
            {locationData.city}, {locationData.country}{' '}
            <span className="text-zinc-400 mx-0.5">•</span>{' '}
            <span className="font-mono text-emerald-600 dark:text-emerald-400">
              {timeContext.timeString}
            </span>{' '}
            <span className="text-[11px] font-semibold opacity-75">({timeContext.phaseLabel})</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <CitySelector
          currentCity={locationData.city}
          onSelectCity={onSelectCity}
          onRefreshLocation={onRefreshLocation}
          isLoading={isLoadingTelemetry}
          placeholder={t.actions.switchCity}
        />

        <button
          type="button"
          onClick={onOpenMultiAi}
          className="flex items-center space-x-1 px-2.5 py-2 rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-bold border border-zinc-200 dark:border-zinc-700 shadow-xs hover:scale-102 transition-all cursor-pointer shrink-0"
          title="Ask ChatGPT, Claude, or Gemini"
          aria-label="Open Multi-AI Prompt Launcher"
        >
          <Bot className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
          <span className="hidden sm:inline">{t.actions.askAi}</span>
        </button>

        <button
          type="button"
          onClick={onGeneratePlan}
          disabled={isGenerating}
          aria-busy={isGenerating}
          className="flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-zinc-950 dark:bg-emerald-500 text-white dark:text-zinc-950 text-xs font-extrabold shadow-md hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer shrink-0"
        >
          <Sparkles
            className={`w-3.5 h-3.5 text-emerald-400 dark:text-zinc-950 ${
              isGenerating ? 'animate-spin' : ''
            }`}
            aria-hidden="true"
          />
          <span className="whitespace-nowrap">
            {isGenerating ? t.actions.analyzing : t.actions.generatePlan}
          </span>
        </button>
      </div>
    </section>
  );
}
