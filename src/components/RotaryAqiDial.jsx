import React from 'react';
import { Wind, AlertTriangle, Cigarette, SunMedium } from 'lucide-react';
import { translations } from '../utils/i18n';

export function RotaryAqiDial({ telemetry, isSolarActive = false, currentLang = 'en', isDarkMode = false }) {
  const t = translations[currentLang] || translations.en;
  const { aqi, category, categoryColor, cigaretteEquivDaily, pm2_5 } = telemetry;

  // Normalized angle for arc (0 to 500 AQI maps to 0 to 270 degrees)
  const clampedAqi = Math.min(Math.max(aqi, 0), 500);
  const angle = (clampedAqi / 500) * 270;
  
  // Circumference for r=110: 2 * PI * 110 ≈ 691.15
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (angle / 360) * circumference;

  // Translated category
  const translatedCategory = t.dial.categories[category] || category;

  return (
    <div className="relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl glass-card overflow-hidden">
      
      {/* Dynamic Ambient Background Severity Glow */}
      <div 
        className="absolute w-64 h-64 rounded-full blur-3xl opacity-30 dark:opacity-25 -z-10 transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: categoryColor }}
      />

      {/* Dial Top Tagline */}
      <div className="flex items-center space-x-2 mb-3">
        <Wind className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
          {t.dial.title}
        </span>
      </div>

      {/* SVG Circular Rotary Dial */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        <svg className="w-full h-full -rotate-135" viewBox="0 0 260 260">
          
          {/* Background Track Arc (High Contrast in both Light & Dark) */}
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

          {/* Active Severity Arc */}
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

          {/* Ticks overlay */}
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

        {/* Center Readout (High Contrast Text) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-5xl sm:text-6xl font-extrabold font-mono tracking-tight text-zinc-950 dark:text-white drop-shadow-xs">
            {aqi}
          </span>
          <span 
            className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mt-1.5 transition-colors border"
            style={{ 
              backgroundColor: isDarkMode ? `${categoryColor}35` : `${categoryColor}25`, 
              color: isDarkMode ? '#FFFFFF' : (categoryColor === '#CBD77E' ? '#2F4F1E' : categoryColor),
              borderColor: `${categoryColor}50`
            }}
          >
            {translatedCategory}
          </span>
          <span className="text-[11px] text-zinc-600 dark:text-zinc-300 font-mono mt-1 font-semibold">
            PM2.5: {pm2_5} μg/m³
          </span>
        </div>
      </div>

      {/* Berkeley Earth Cigarette Equivalence Badge */}
      <div className="mt-4 flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 shadow-sm">
        <Cigarette className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
        <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
          {t.dial.cigarettesToday} <strong className="text-rose-600 dark:text-rose-400 font-mono font-bold text-sm mx-1">{cigaretteEquivDaily}</strong> {t.dial.cigarettesUnit}
        </span>
      </div>

      {/* Solar Lift Window Active Banner */}
      {isSolarActive && (
        <div className="mt-3 flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 text-xs font-bold border border-emerald-400/50 animate-pulse">
          <SunMedium className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{t.status.solarActive}</span>
        </div>
      )}

    </div>
  );
}
