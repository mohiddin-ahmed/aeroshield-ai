import { Cigarette, SunMedium, Wind } from 'lucide-react';
import type {
  AirQualityTelemetry,
  AqiCategoryName,
  SupportedLanguageCode
} from '../types/airQuality';
import { translations } from '../utils/i18n';

const SIMPLE_MEANING_BY_CATEGORY: Record<AqiCategoryName, string> = {
  Good: 'Fresh outdoor air — safe for all activities',
  Moderate: 'Okay for most people; sensitive groups watch symptoms',
  Unhealthy: 'Polluted air — sensitive family members wear N95 outside',
  'Very Unhealthy': 'Very polluted — shut windows and avoid outdoor exercise',
  Hazardous: 'Severe toxic smog — stay indoors & run DIY filter'
};

const CATEGORY_GLOW_CLASSES: Record<AqiCategoryName, string> = {
  Good: 'bg-[#CBD77E]',
  Moderate: 'bg-[#E6CA9A]',
  Unhealthy: 'bg-[#E07A5F]',
  'Very Unhealthy': 'bg-[#F26419]',
  Hazardous: 'bg-[#9B2226]'
};

const CATEGORY_BADGE_CLASSES: Record<AqiCategoryName, string> = {
  Good: 'bg-[#CBD77E]/25 border-[#CBD77E]/60 text-[#2F4F1E] dark:bg-[#CBD77E]/35 dark:text-white',
  Moderate:
    'bg-[#E6CA9A]/25 border-[#E6CA9A]/60 text-[#7A5618] dark:bg-[#E6CA9A]/35 dark:text-white',
  Unhealthy:
    'bg-[#E07A5F]/25 border-[#E07A5F]/50 text-[#9F3E23] dark:bg-[#E07A5F]/35 dark:text-white',
  'Very Unhealthy':
    'bg-[#F26419]/25 border-[#F26419]/50 text-[#B84106] dark:bg-[#F26419]/35 dark:text-white',
  Hazardous:
    'bg-[#9B2226]/25 border-[#9B2226]/50 text-[#9B2226] dark:bg-[#9B2226]/40 dark:text-white'
};

export interface RotaryAqiDialProps {
  telemetry: Pick<
    AirQualityTelemetry,
    'aqi' | 'category' | 'categoryColor' | 'cigaretteEquivDaily' | 'pm2_5'
  >;
  isSolarActive?: boolean;
  currentLang?: SupportedLanguageCode;
  isDarkMode?: boolean;
}

/**
 * Prominent hero circular SVG gauge displaying AQI, clear beginner-friendly status,
 * PM2.5 density, and Berkeley Earth daily cigarette inhalation comparison.
 */
export function RotaryAqiDial({
  telemetry,
  isSolarActive = false,
  currentLang = 'en',
  isDarkMode = false
}: RotaryAqiDialProps) {
  const t = translations[currentLang] || translations.en;
  const { aqi, category, categoryColor, cigaretteEquivDaily, pm2_5 } = telemetry;

  const clampedAqi = Math.min(Math.max(aqi, 0), 500);
  const angle = (clampedAqi / 500) * 270;

  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (angle / 360) * circumference;

  const categoryMap = t.dial.categories as Record<string, string | undefined>;
  const translatedCategory = categoryMap[category] || category;
  const simpleMeaning = SIMPLE_MEANING_BY_CATEGORY[category] || '';
  const glowClass = CATEGORY_GLOW_CLASSES[category] || 'bg-emerald-500';
  const badgeClass =
    CATEGORY_BADGE_CLASSES[category] ||
    'bg-emerald-500/20 border-emerald-500/40 text-emerald-700 dark:text-white';

  return (
    <section
      aria-label={`${t.dial.title}: AQI ${aqi}, ${translatedCategory}`}
      className="relative flex flex-col items-center justify-center p-5 sm:p-6 rounded-3xl glass-card overflow-hidden h-full"
    >
      <div
        aria-hidden="true"
        className={`absolute w-72 h-72 rounded-full blur-3xl opacity-30 dark:opacity-25 -z-10 transition-all duration-700 pointer-events-none ${glowClass}`}
      />

      <div className="flex items-center space-x-2 mb-2">
        <Wind className="w-4 h-4 text-emerald-500" aria-hidden="true" />
        <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-200">
          {t.dial.title}
        </span>
      </div>

      <div className="relative w-60 h-60 sm:w-64 sm:h-64 flex items-center justify-center">
        <svg
          className="w-full h-full -rotate-135"
          viewBox="0 0 260 260"
          role="img"
          aria-label={`AQI Rotary Gauge showing ${aqi} (${translatedCategory})`}
        >
          <title>{`AQI ${aqi} — ${translatedCategory}`}</title>
          <circle
            cx="130"
            cy="130"
            r={radius}
            fill="none"
            stroke={isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'}
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.25}
          />
          <circle
            cx="130"
            cy="130"
            r={radius}
            fill="none"
            stroke={categoryColor}
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
          <circle
            cx="130"
            cy="130"
            r={radius - 18}
            fill="none"
            stroke={isDarkMode ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.2)'}
            strokeWidth="1.5"
            strokeDasharray="2 12"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-5xl sm:text-6xl font-extrabold font-mono tracking-tight text-zinc-950 dark:text-white drop-shadow-xs">
            {aqi}
          </span>
          <span
            className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mt-1.5 transition-colors border ${badgeClass}`}
          >
            {translatedCategory}
          </span>
          <span className="text-[11px] text-zinc-600 dark:text-zinc-300 font-mono mt-1 font-semibold">
            Fine Dust: {pm2_5} μg/m³
          </span>
        </div>
      </div>

      {simpleMeaning && (
        <p className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 text-center mt-1 px-2">
          {simpleMeaning}
        </p>
      )}

      <div className="mt-3 flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white/95 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 shadow-sm">
        <Cigarette
          className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0"
          aria-hidden="true"
        />
        <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
          {t.dial.cigarettesToday}{' '}
          <strong className="text-rose-600 dark:text-rose-400 font-mono font-bold text-sm mx-1">
            {cigaretteEquivDaily}
          </strong>{' '}
          {t.dial.cigarettesUnit}
        </span>
      </div>

      {isSolarActive && (
        <div className="mt-2.5 flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 text-xs font-bold border border-emerald-400/50 animate-pulse">
          <SunMedium
            className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
            aria-hidden="true"
          />
          <span>{t.status.solarActive}</span>
        </div>
      )}
    </section>
  );
}
