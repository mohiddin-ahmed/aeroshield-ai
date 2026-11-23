import React from 'react';
import { Activity, ShieldAlert, Sparkles, Wind } from 'lucide-react';

export function TelemetryGrid({ telemetry }) {
  const { pm2_5, pm10, no2, ozone, so2, temperatureC, humidityPct, windSpeedKmh } = telemetry;

  const metrics = [
    {
      label: 'PM2.5 (Fine Particles)',
      value: `${pm2_5}`,
      unit: 'μg/m³',
      safeLimit: 'Safe: 15 μg/m³ (WHO)',
      ratio: Math.min(100, Math.round((pm2_5 / 300) * 100)),
      status: pm2_5 > 60 ? 'Hazardous' : 'Moderate',
      color: pm2_5 > 60 ? '#9B2226' : '#CBD77E'
    },
    {
      label: 'PM10 (Coarse Dust)',
      value: `${pm10}`,
      unit: 'μg/m³',
      safeLimit: 'Safe: 45 μg/m³ (WHO)',
      ratio: Math.min(100, Math.round((pm10 / 400) * 100)),
      status: pm10 > 100 ? 'Severe' : 'Good',
      color: pm10 > 100 ? '#F26419' : '#CBD77E'
    },
    {
      label: 'Nitrogen Dioxide (NO2)',
      value: `${no2}`,
      unit: 'μg/m³',
      safeLimit: 'Safe: 25 μg/m³ (Vehicular)',
      ratio: Math.min(100, Math.round((no2 / 120) * 100)),
      status: no2 > 50 ? 'Elevated' : 'Safe',
      color: no2 > 50 ? '#E07A5F' : '#CBD77E'
    },
    {
      label: 'Ground Ozone (O3)',
      value: `${ozone}`,
      unit: 'μg/m³',
      safeLimit: 'Safe: 100 μg/m³ (Photochem)',
      ratio: Math.min(100, Math.round((ozone / 100) * 100)),
      status: 'Normal',
      color: '#CBD77E'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {metrics.map((m, idx) => (
        <div key={idx} className="p-4 rounded-3xl glass-card flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#282828]/60 line-clamp-1">
              {m.label}
            </span>
            <div className="flex items-baseline space-x-1 mt-1">
              <span className="text-2xl font-bold font-mono text-[#282828]">
                {m.value}
              </span>
              <span className="text-[10px] font-mono text-[#282828]/50">
                {m.unit}
              </span>
            </div>
          </div>

          <div className="mt-3">
            {/* Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-black/5 overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${m.ratio}%`, backgroundColor: m.color }}
              />
            </div>
            <span className="text-[10px] text-[#282828]/50 mt-1 block">
              {m.safeLimit}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
