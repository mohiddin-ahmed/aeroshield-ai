import React from 'react';
import { SunMedium, Moon, Wind, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import { getDetailedTimeContext } from '../utils/geolocationEngine';
import { translations } from '../utils/i18n';

export function SmogRoutineTimeline({ solarStatus, timeContext, currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;
  const currentHour = timeContext?.hour ?? new Date().getHours();
  const timeInfo = timeContext || getDetailedTimeContext();

  const routineSteps = [
    {
      time: '07:00 AM – 10:00 AM',
      title: t.routine.step1Title,
      description: t.routine.step1Desc,
      action: t.routine.step1Action,
      icon: Moon,
      active: currentHour >= 7 && currentHour < 10,
      highlightColor: '#EF4444'
    },
    {
      time: '01:00 PM – 03:00 PM',
      title: t.routine.step2Title,
      description: t.routine.step2Desc,
      action: t.routine.step2Action,
      icon: SunMedium,
      active: currentHour >= 13 && currentHour < 15,
      highlightColor: '#10B981',
      isSolarWindow: true
    },
    {
      time: '05:30 PM – 07:30 PM',
      title: t.routine.step3Title,
      description: t.routine.step3Desc,
      action: t.routine.step3Action,
      icon: Wind,
      active: currentHour >= 17 && currentHour < 19,
      highlightColor: '#F97316'
    },
    {
      time: '09:00 PM – Overnight',
      title: t.routine.step4Title,
      description: t.routine.step4Desc,
      action: t.routine.step4Action,
      icon: ShieldCheck,
      active: currentHour >= 21 || currentHour < 7,
      highlightColor: '#F59E0B'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Dedicated "Right Now: Active Slot & Prescribed Action" Hero Card */}
      <div className="p-6 sm:p-7 rounded-3xl glass-card border border-emerald-500/30 bg-gradient-to-br from-white/95 via-white/90 to-emerald-500/10 dark:from-zinc-900/95 dark:via-zinc-900/90 dark:to-emerald-500/20 shadow-md space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-700/80 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {t.hero.rightNow}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono font-bold px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
            <Clock className="w-3.5 h-3.5 text-emerald-500" />
            <span>{timeInfo.timeString} ({timeInfo.phaseLabel})</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
            {timeInfo.slotTitle}
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-relaxed">
            Atmospheric conditions right now are governed by the diurnal temperature gradient and soil thermal flux.
          </p>
        </div>

        {/* Highlighted Prescribed Action */}
        <div className="p-4 rounded-2xl bg-emerald-100/70 dark:bg-emerald-950/70 border border-emerald-400/50 dark:border-emerald-600/60 flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-0.5">
              {t.hero.prescribedAction}
            </span>
            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-relaxed">
              {timeInfo.currentUrgentPrescription}
            </p>
          </div>
        </div>

      </div>

      {/* 24-Hour Stepped Timeline Container */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card space-y-6">
        
        <div className="border-b border-zinc-200 dark:border-zinc-700/80 pb-4">
          <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
            {t.routine.title}
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
            {t.routine.subtitle}
          </p>
        </div>

        {/* Stepped Timeline */}
        <div className="space-y-4">
          {routineSteps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div 
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl transition-all border ${
                  step.isSolarWindow && step.active
                    ? 'bg-gradient-to-r from-emerald-500/25 via-emerald-500/10 to-transparent border-emerald-500 dark:border-emerald-400 ring-1 ring-emerald-500/40 shadow-md'
                    : step.isSolarWindow
                    ? 'bg-gradient-to-r from-emerald-500/15 via-emerald-500/5 to-transparent border-emerald-500 dark:border-emerald-400'
                    : step.active
                    ? 'bg-white dark:bg-zinc-800/90 border-emerald-500/60 dark:border-emerald-500/60 ring-1 ring-emerald-500/30 shadow-md'
                    : 'bg-zinc-50/70 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs mt-0.5"
                    style={{ backgroundColor: `${step.highlightColor}25`, color: step.highlightColor }}
                  >
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100">
                        {step.time}
                      </span>
                      {step.active && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-400/50">
                          {t.routine.activeNow}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold mt-1.5 text-zinc-950 dark:text-white">
                      {step.title}
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="mt-2.5 p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-700/80 flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                        <strong className="text-zinc-950 dark:text-white">{t.hero.prescribedAction}</strong> {step.action}
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
