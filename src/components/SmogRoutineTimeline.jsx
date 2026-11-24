import React from 'react';
import { SunMedium, Moon, Wind, ShieldCheck, Clock, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { getDetailedTimeContext } from '../utils/geolocationEngine';

export function SmogRoutineTimeline({ solarStatus, timeContext }) {
  const currentHour = timeContext?.hour ?? new Date().getHours();
  const timeInfo = timeContext || getDetailedTimeContext();

  const routineSteps = [
    {
      time: '07:00 AM – 10:00 AM',
      title: 'Morning Inversion Peak (Windows Locked)',
      description: 'Radiative cooling forms an impenetrable inversion lid. Ground PM2.5 is at peak toxicity.',
      action: 'Run DIY Box-Fan Purifiers on High. Absolutely no outdoor jogging or morning school assemblies.',
      icon: Moon,
      active: currentHour >= 7 && currentHour < 10,
      highlightColor: '#9B2226'
    },
    {
      time: '01:00 PM – 03:00 PM',
      title: '☀️ The Solar Thermal Lift Window (Cross-Ventilation)',
      description: 'Peak solar insolation warms the soil, breaking the boundary lid and creating convective upward draft.',
      action: 'Open opposing windows for 15 minutes of rapid air exchange to flush stagnant CO2 and VOCs.',
      icon: SunMedium,
      active: currentHour >= 13 && currentHour < 15,
      highlightColor: '#10B981',
      isSolarWindow: true
    },
    {
      time: '05:30 PM – 07:30 PM',
      title: 'Evening Rush & Boundary Collapse',
      description: 'Nocturnal inversion reformulates rapidly as sun sets. Vehicular NO2 and dust peak.',
      action: 'All commuters must wear sealed N95 respirators. Close all window drafts and curtains.',
      icon: Wind,
      active: currentHour >= 17 && currentHour < 19,
      highlightColor: '#F26419'
    },
    {
      time: '09:00 PM – Overnight',
      title: 'Night Clean-Room Positive Pressure Protocol',
      description: 'Stagnant cold air settles until sunrise. Indoor filtration maintains clean alveolar zones.',
      action: 'Dampen curtain hems (Parda-Geela) to catch drafting soot. Run bedroom purifier on medium whisper mode.',
      icon: ShieldCheck,
      active: currentHour >= 21 || currentHour < 7,
      highlightColor: '#E6CA9A'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Dedicated "Right Now: Active Slot & Prescribed Action" Hero Card */}
      <div className="p-6 sm:p-7 rounded-3xl glass-card border border-emerald-500/20 bg-gradient-to-br from-white/95 via-white/90 to-[#10B981]/10 dark:from-[#18181B]/95 dark:via-[#18181B]/90 dark:to-[#10B981]/15 shadow-sm space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/5 dark:border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#10B981]">
              Right Now • Current Active Time Slot
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono font-bold px-3 py-1 rounded-full bg-black/5 dark:bg-white/10">
            <Clock className="w-3.5 h-3.5 text-[#10B981]" />
            <span>{timeInfo.timeString} ({timeInfo.phaseLabel})</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight">
            {timeInfo.slotTitle}
          </h3>
          <p className="text-xs opacity-75 mt-1 leading-relaxed">
            Atmospheric conditions right now are governed by the diurnal temperature gradient and soil thermal flux.
          </p>
        </div>

        {/* Highlighted Prescribed Action */}
        <div className="p-4 rounded-2xl bg-[#10B981]/15 dark:bg-[#10B981]/20 border border-[#10B981]/30 flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-[#059669] dark:text-[#34D399] shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#059669] dark:text-[#34D399] block mb-0.5">
              Prescribed Immediate Action:
            </span>
            <p className="text-xs font-semibold text-[#282828] dark:text-white leading-relaxed">
              {timeInfo.currentUrgentPrescription}
            </p>
          </div>
        </div>

      </div>

      {/* 24-Hour Stepped Timeline Container */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card space-y-6">
        
        <div className="border-b border-black/5 dark:border-white/10 pb-4">
          <h2 className="text-xl font-bold tracking-tight">
            24-Hour Smog-Safe Automations & Daily Routine
          </h2>
          <p className="text-xs opacity-60 mt-0.5">
            Synchronized with diurnal atmospheric boundary layer physics & solar convection cycles.
          </p>
        </div>

        {/* Stepped Timeline */}
        <div className="space-y-4">
          {routineSteps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div 
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl transition-all ${
                  step.isSolarWindow 
                    ? 'bg-gradient-to-r from-[#10B981]/15 via-[#10B981]/5 to-transparent border-2 border-[#10B981]' 
                    : step.active
                    ? 'bg-white dark:bg-white/10 border border-black/10 dark:border-white/20 shadow-xs'
                    : 'bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/5 opacity-80'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs mt-0.5"
                    style={{ backgroundColor: `${step.highlightColor}20`, color: step.highlightColor }}
                  >
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-inherit">
                        {step.time}
                      </span>
                      {step.active && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          Active Now
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold mt-1.5">
                      {step.title}
                    </h4>
                    <p className="text-xs opacity-70 mt-1 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="mt-2.5 p-2.5 rounded-xl bg-black/3 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs font-medium">
                        <strong>Prescribed Action:</strong> {step.action}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
