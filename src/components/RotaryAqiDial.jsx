import React from 'react';
import PropTypes from 'prop-types';
import { Wind, Cigarette, SunMedium } from 'lucide-react';
import { translations } from '../utils/i18n';

const SIMPLE_MEANING_BY_CATEGORY = {
  Good: 'Fresh outdoor air — safe for all activities',
  Moderate: 'Okay for most people; sensitive groups watch symptoms',
  Unhealthy: 'Polluted air — sensitive family members wear N95 outside',
  'Very Unhealthy': 'Very polluted — shut windows and avoid outdoor exercise',
  Hazardous: 'Severe toxic smog — stay indoors & run DIY filter'
};

/**
 * Prominent hero circular SVG gauge displaying AQI, clear beginner-friendly status,
 * PM2.5 density, and Berkeley Earth daily cigarette inhalation comparison.
 * @param {object} props - Component props.
 * @returns {JSX.Element} Hero Rotary AQI Dial card.
 */
export function RotaryAqiDial({
  telemetry,
  isSolarActive = false,
  currentLang = 'en',
  isDarkMode = false
}) {
  const t = translations[currentLang] || translations.en;
  const { aqi, category, categoryColor, cigaretteEquivDaily, pm2_5 } = telemetry;

  // Normalize 0–500 AQI linearly onto a 270-degree circular gauge arc
  const clampedAqi = Math.min(Math.max(aqi, 0), 500);
  const angle = (clampedAqi / 500) * 270;

  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (angle / 360) * circumference;

  const translatedCategory = t.dial.categories[category] || category;
  const simpleMeaning = SIMPLE_MEANING_BY_CATEGORY[category] || '';

  return (
    <section
      aria-label={`${t.dial.title}: AQI ${aqi}, ${translatedCategory}`}
      className="relative flex flex-col items-center justify-center p-5 sm:p-6 rounded-3xl glass-card overflow-hidden h-full"
    >
      {/* Ambient Severity Glow */}
      <div
        aria-hidden="true"
        className="absolute w-72 h-72 rounded-full blur-3xl opacity-30 dark:opacity-25 -z-10 transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: categoryColor }}
      />

      {/* Dial Top Tagline */}
      <div className="flex items-center space-x-2 mb-2">
        <Wind className="w-4 h-4 text-emerald-500" aria-hidden="true" />
        <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-200">
          {t.dial.title}
        </span>
      </div>

      {/* SVG Circular Rotary Gauge */}
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

        {/* Center Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-5xl sm:text-6xl font-extrabold font-mono tracking-tight text-zinc-950 dark:text-white drop-shadow-xs">
            {aqi}
          </span>
          <span
            className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mt-1.5 transition-colors border"
            style={{
              backgroundColor: isDarkMode ? `${categoryColor}35` : `${categoryColor}25`,
              color: isDarkMode ? '#FFFFFF' : categoryColor === '#CBD77E' ? '#2F4F1E' : categoryColor,
              borderColor: `${categoryColor}50`
            }}
          >
            {translatedCategory}
          </span>
          <span className="text-[11px] text-zinc-600 dark:text-zinc-300 font-mono mt-1 font-semibold">
            Fine Dust: {pm2_5} μg/m³
          </span>
        </div>
      </div>

      {/* Plain-English Interpretation for First-Time Users */}
      {simpleMeaning && (
        <p className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 text-center mt-1 px-2">
          {simpleMeaning}
        </p>
      )}

      {/* Berkeley Earth Cigarette Equivalence Pill */}
      <div className="mt-3 flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white/95 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 shadow-sm">
        <Cigarette className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" aria-hidden="true" />
        <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
          {t.dial.cigarettesToday}{' '}
          <strong className="text-rose-600 dark:text-rose-400 font-mono font-bold text-sm mx-1">
            {cigaretteEquivDaily}
          </strong>{' '}
          {t.dial.cigarettesUnit}
        </span>
      </div>

      {/* Solar Lift Window Active Banner */}
      {isSolarActive && (
        <div className="mt-2.5 flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 text-xs font-bold border border-emerald-400/50 animate-pulse">
          <SunMedium className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <span>{t.status.solarActive}</span>
        </div>
      )}
    </section>
  );
}

RotaryAqiDial.propTypes = {
  telemetry: PropTypes.shape({
    aqi: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    categoryColor: PropTypes.string.isRequired,
    cigaretteEquivDaily: PropTypes.number.isRequired,
    pm2_5: PropTypes.number.isRequired
  }).isRequired,
  isSolarActive: PropTypes.bool,
  currentLang: PropTypes.string,
  isDarkMode: PropTypes.bool
};
