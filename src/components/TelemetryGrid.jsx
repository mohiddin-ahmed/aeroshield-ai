import React from 'react';
import { translations } from '../utils/i18n';

export function TelemetryGrid({ telemetry, currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;
  const { pm2_5, pm10, no2, ozone } = telemetry;

  const metrics = [
    {
      label: t.sensors.pm25,
      value: `${pm2_5}`,
      unit: 'μg/m³',
      safeLimit: `${t.sensors.safePrefix} 15 μg/m³ (WHO)`,
      ratio: Math.min(100, Math.round((pm2_5 / 300) * 100)),
      color: pm2_5 > 60 ? '#EF4444' : '#10B981'
    },
    {
      label: t.sensors.pm10,
      value: `${pm10}`,
      unit: 'μg/m³',
      safeLimit: `${t.sensors.safePrefix} 45 μg/m³ (WHO)`,
      ratio: Math.min(100, Math.round((pm10 / 400) * 100)),
      color: pm10 > 100 ? '#F97316' : '#10B981'
    },
    {
      label: t.sensors.no2,
      value: `${no2}`,
      unit: 'μg/m³',
      safeLimit: `${t.sensors.safePrefix} 25 μg/m³`,
      ratio: Math.min(100, Math.round((no2 / 120) * 100)),
      color: no2 > 50 ? '#F59E0B' : '#10B981'
    },
    {
      label: t.sensors.o3,
      value: `${ozone}`,
      unit: 'μg/m³',
      safeLimit: `${t.sensors.safePrefix} 100 μg/m³`,
      ratio: Math.min(100, Math.round((ozone / 100) * 100)),
      color: '#10B981'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {metrics.map((m, idx) => (
        <div key={idx} className="p-4 rounded-3xl glass-card flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 line-clamp-1">
              {m.label}
            </span>
            <div className="flex items-baseline space-x-1 mt-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-950 dark:text-white">
                {m.value}
              </span>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 font-semibold">
                {m.unit}
              </span>
            </div>
          </div>

          <div className="mt-3.5">
            {/* Progress Bar (Crisp contrast in light and dark) */}
            <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-700/80 overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${m.ratio}%`, backgroundColor: m.color }}
              />
            </div>
            <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-300 mt-1.5 block">
              {m.safeLimit}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
