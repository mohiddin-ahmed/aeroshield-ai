import type { AirQualityTelemetry, SupportedLanguageCode } from '../types/airQuality';
import { translations } from '../utils/i18n';

export interface TelemetryGridProps {
  telemetry: Pick<AirQualityTelemetry, 'pm2_5' | 'pm10' | 'no2' | 'ozone'>;
  currentLang?: SupportedLanguageCode;
  compact?: boolean;
}

interface PollutantMetricCard {
  id: string;
  label: string;
  value: string;
  unit: string;
  safeLimit: string;
  ratio: number;
  color: string;
  statusDot: string;
}

/**
 * Modular sensor metric card grid displaying live PM2.5, PM10, NO2, and O3 readings
 * against WHO safe reference limits with SVG severity bars (zero inline CSS).
 */
export function TelemetryGrid({
  telemetry,
  currentLang = 'en',
  compact = false
}: TelemetryGridProps) {
  const t = translations[currentLang] || translations.en;
  const { pm2_5, pm10, no2, ozone } = telemetry;

  const metrics: PollutantMetricCard[] = [
    {
      id: 'pm25',
      label: t.sensors.pm25,
      value: `${pm2_5}`,
      unit: 'μg/m³',
      safeLimit: `${t.sensors.safePrefix} 15`,
      ratio: Math.min(100, Math.round((pm2_5 / 300) * 100)),
      color: pm2_5 > 60 ? '#EF4444' : '#10B981',
      statusDot: pm2_5 > 60 ? 'bg-rose-500' : 'bg-emerald-500'
    },
    {
      id: 'pm10',
      label: t.sensors.pm10,
      value: `${pm10}`,
      unit: 'μg/m³',
      safeLimit: `${t.sensors.safePrefix} 45`,
      ratio: Math.min(100, Math.round((pm10 / 400) * 100)),
      color: pm10 > 100 ? '#F97316' : '#10B981',
      statusDot: pm10 > 100 ? 'bg-orange-500' : 'bg-emerald-500'
    },
    {
      id: 'no2',
      label: t.sensors.no2,
      value: `${no2}`,
      unit: 'μg/m³',
      safeLimit: `${t.sensors.safePrefix} 25`,
      ratio: Math.min(100, Math.round((no2 / 120) * 100)),
      color: no2 > 50 ? '#F59E0B' : '#10B981',
      statusDot: no2 > 50 ? 'bg-amber-500' : 'bg-emerald-500'
    },
    {
      id: 'ozone',
      label: t.sensors.o3,
      value: `${ozone}`,
      unit: 'μg/m³',
      safeLimit: `${t.sensors.safePrefix} 100`,
      ratio: Math.min(100, Math.round((ozone / 100) * 100)),
      color: '#10B981',
      statusDot: 'bg-emerald-500'
    }
  ];

  return (
    <div
      className={
        compact ? 'grid grid-cols-2 gap-3' : 'grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4'
      }
    >
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="p-3.5 sm:p-4 rounded-2xl glass-card flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
        >
          <div>
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] sm:text-xs font-bold text-zinc-600 dark:text-zinc-300 line-clamp-1">
                {metric.label}
              </span>
              <span
                aria-hidden="true"
                className={`w-2 h-2 rounded-full shrink-0 ${metric.statusDot}`}
              />
            </div>
            <div className="flex items-baseline space-x-1 mt-1">
              <span className="text-xl sm:text-2xl font-extrabold font-mono text-zinc-950 dark:text-white">
                {metric.value}
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-zinc-500 dark:text-zinc-400 font-semibold">
                {metric.unit}
              </span>
            </div>
          </div>

          <div className="mt-2.5">
            <div
              role="progressbar"
              aria-label={`${metric.label} severity indicator`}
              aria-valuenow={metric.ratio}
              aria-valuemin={0}
              aria-valuemax={100}
              className="w-full h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700/80 overflow-hidden"
            >
              <svg
                viewBox="0 0 100 6"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="w-full h-full block"
              >
                <rect width={metric.ratio} height="6" rx="3" fill={metric.color} />
              </svg>
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mt-1 block">
              {metric.safeLimit} μg/m³
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
