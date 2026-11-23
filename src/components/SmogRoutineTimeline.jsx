import React from 'react';
import { SunMedium, Moon, Wind, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import { getSolarWindowStatus } from '../utils/solarWindowEngine';

export function SmogRoutineTimeline({ solarStatus }) {
  const currentHour = new Date().getHours();

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
      highlightColor: '#CBD77E',
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
    <div className="p-6 sm:p-8 rounded-3xl glass-card space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 pb-4">
        <div>
          <h2 className="text-xl font-bold text-[#282828] tracking-tight">
            24-Hour Smog-Safe Automations & Daily Routine
          </h2>
          <p className="text-xs text-[#282828]/60 mt-0.5">
            Synchronized with atmospheric boundary layer physics & solar convection cycles.
          </p>
        </div>

        {/* Live Window Indicator */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/80 border border-black/5 text-xs font-semibold">
          <Clock className="w-3.5 h-3.5 text-[#282828]" />
          <span>{solarStatus.statusText}</span>
        </div>
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
                  ? 'bg-gradient-to-r from-[#CBD77E]/20 via-[#CBD77E]/10 to-transparent border-2 border-[#CBD77E]' 
                  : step.active
                  ? 'bg-white border border-black/10 shadow-xs'
                  : 'bg-white/60 border border-black/5 opacity-80'
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
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md bg-black/5 text-[#282828]">
                      {step.time}
                    </span>
                    {step.active && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Current Slot
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-[#282828] mt-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#282828]/70 mt-1 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="mt-2.5 p-2.5 rounded-xl bg-black/3 border border-black/5 flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-[#282828]">
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
  );
}
