import React from 'react';
import { Wind, AlertTriangle, Cigarette, SunMedium } from 'lucide-react';

export function RotaryAqiDial({ telemetry, isSolarActive = false }) {
  const { aqi, category, categoryColor, cigaretteEquivDaily, pm2_5 } = telemetry;

  // Normalized angle for arc (0 to 500 AQI maps to 0 to 270 degrees)
  const clampedAqi = Math.min(Math.max(aqi, 0), 500);
  const angle = (clampedAqi / 500) * 270;
  
  // Circumference for r=110: 2 * PI * 110 ≈ 691.15
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (angle / 360) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl glass-card overflow-hidden">
      
      {/* Dynamic Ambient Background Severity Glow */}
      <div 
        className="absolute w-64 h-64 rounded-full blur-3xl opacity-35 -z-10 transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: categoryColor }}
      />

      {/* Dial Top Tagline */}
      <div className="flex items-center space-x-2 mb-3">
        <Wind className="w-4 h-4 text-[#282828]/70" />
        <span className="text-xs font-semibold uppercase tracking-wider text-[#282828]/70">
          Atmospheric Inversion Index
        </span>
      </div>

      {/* SVG Circular Rotary Dial */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        <svg className="w-full h-full -rotate-135" viewBox="0 0 260 260">
          
          {/* Background Track Arc */}
          <circle
            cx="130"
            cy="130"
            r={radius}
            fill="none"
            stroke="rgba(40, 40, 40, 0.08)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.25} // 270 deg visible arc
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
            stroke="rgba(40, 40, 40, 0.15)"
            strokeWidth="1.5"
            strokeDasharray="2 12"
          />
        </svg>

        {/* Center Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-5xl sm:text-6xl font-bold font-mono tracking-tight text-[#282828]">
            {aqi}
          </span>
          <span 
            className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mt-1 transition-colors"
            style={{ 
              backgroundColor: `${categoryColor}25`, 
              color: categoryColor === '#CBD77E' ? '#4A5B15' : categoryColor 
            }}
          >
            {category}
          </span>
          <span className="text-[11px] text-[#282828]/60 font-mono mt-1">
            PM2.5: {pm2_5} μg/m³
          </span>
        </div>
      </div>

      {/* Berkeley Earth Cigarette Equivalence Badge */}
      <div className="mt-4 flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white/90 border border-black/5 shadow-2xs">
        <Cigarette className="w-4 h-4 text-[#9B2226]" />
        <span className="text-xs font-semibold text-[#282828]">
          Equivalent to smoking <strong className="text-[#9B2226] font-mono">{cigaretteEquivDaily}</strong> cigarettes today
        </span>
      </div>

      {/* Solar Lift Window Active Banner */}
      {isSolarActive && (
        <div className="mt-3 flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#CBD77E]/30 text-[#282828] text-xs font-bold border border-[#CBD77E]/50 animate-pulse">
          <SunMedium className="w-4 h-4 text-amber-600" />
          <span>☀️ 1:00 PM – 3:00 PM Solar Thermal Lift Window Active!</span>
        </div>
      )}

    </div>
  );
}
