import type { LucideIcon } from 'lucide-react';
import { CheckCircle, Clock, Moon, ShieldCheck, SunMedium, Wind } from 'lucide-react';
import type { SolarWindowStatus, SupportedLanguageCode, TimeContext } from '../types/airQuality';
import { getDetailedTimeContext } from '../utils/geolocationEngine';
import { translations } from '../utils/i18n';

interface RoutineStepItem {
  id: string;
  time: string;
  title: string;
  description: string;
  action: string;
  icon: LucideIcon;
  active: boolean;
  iconStyleClass: string;
  isSolarWindow?: boolean;
}

export interface SmogRoutineTimelineProps {
  solarStatus?: SolarWindowStatus;
  timeContext?: TimeContext;
  currentLang?: SupportedLanguageCode;
}

/**
 * 24-Hour Clean-Air Daily Routine view highlighting ONLY the currently active time slot
 * while marking the 1:00 PM – 3:00 PM fresh-air window clearly with a warm tip badge.
 */
export function SmogRoutineTimeline({
  solarStatus,
  timeContext,
  currentLang = 'en'
}: SmogRoutineTimelineProps) {
  const t = translations[currentLang] || translations.en;
  const currentHour = timeContext?.hour ?? new Date().getHours();
  const timeInfo = timeContext || getDetailedTimeContext();
  const solarActive = solarStatus?.isWindowActive ?? (currentHour >= 13 && currentHour < 15);

  const routineSteps: RoutineStepItem[] = [
    {
      id: 'morning-inversion',
      time: '07:00 AM – 10:00 AM',
      title: t.routine.step1Title,
      description: t.routine.step1Desc,
      action: t.routine.step1Action,
      icon: Moon,
      active: currentHour >= 6 && currentHour < 13,
      iconStyleClass: 'bg-rose-500/15 text-rose-500'
    },
    {
      id: 'solar-lift-window',
      time: '01:00 PM – 03:00 PM',
      title: t.routine.step2Title,
      description: t.routine.step2Desc,
      action: t.routine.step2Action,
      icon: SunMedium,
      active: solarActive,
      iconStyleClass: 'bg-amber-500/15 text-amber-500',
      isSolarWindow: true
    },
    {
      id: 'evening-collapse',
      time: '05:30 PM – 07:30 PM',
      title: t.routine.step3Title,
      description: t.routine.step3Desc,
      action: t.routine.step3Action,
      icon: Wind,
      active: currentHour >= 15 && currentHour < 20,
      iconStyleClass: 'bg-orange-500/15 text-orange-500'
    },
    {
      id: 'night-clean-room',
      time: '09:00 PM – Overnight',
      title: t.routine.step4Title,
      description: t.routine.step4Desc,
      action: t.routine.step4Action,
      icon: ShieldCheck,
      active: currentHour >= 20 || currentHour < 6,
      iconStyleClass: 'bg-emerald-500/15 text-emerald-500'
    }
  ];

  return (
    <div className="space-y-5">
      <section
        aria-label="Current active atmospheric protocol"
        className="p-5 sm:p-6 rounded-3xl glass-card border border-emerald-500/35 bg-gradient-to-br from-white/95 via-white/90 to-emerald-500/10 dark:from-zinc-900/95 dark:via-zinc-900/90 dark:to-emerald-500/15 shadow-md space-y-3.5"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-700/80 pb-3">
          <div className="flex items-center space-x-2">
            <span
              className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"
              aria-hidden="true"
            />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {t.hero.rightNow}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 text-xs font-mono font-bold px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
            <Clock className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
            <span>
              {timeInfo.timeString} • {timeInfo.phaseLabel}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
            {timeInfo.slotTitle}
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-relaxed">
            {timeInfo.phaseExplainer ||
              'Cold night air holds pollution near street level until warm afternoon sun lifts it upward.'}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-100/70 dark:bg-emerald-950/70 border border-emerald-400/50 dark:border-emerald-600/60 flex items-start space-x-3">
          <CheckCircle
            className="w-5 h-5 text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-0.5">
              {t.hero.prescribedAction}
            </span>
            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-relaxed">
              {timeInfo.currentUrgentPrescription}
            </p>
          </div>
        </div>
      </section>

      <section aria-label={t.routine.title} className="p-5 sm:p-7 rounded-3xl glass-card space-y-5">
        <div className="border-b border-zinc-200 dark:border-zinc-700/80 pb-3.5">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
            {t.routine.title}
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">{t.routine.subtitle}</p>
        </div>

        <div className="space-y-3.5">
          {routineSteps.map((step) => {
            const Icon = step.icon;
            const cardClass = step.active
              ? 'bg-emerald-50/90 dark:bg-emerald-950/35 border-emerald-500 dark:border-emerald-400 ring-1 ring-emerald-500/35 shadow-md'
              : 'bg-zinc-50/70 dark:bg-zinc-800/45 border-zinc-200 dark:border-zinc-800 opacity-90';
            const resolvedIconClass = step.active
              ? 'bg-emerald-500/20 text-emerald-500'
              : step.iconStyleClass;

            return (
              <div
                key={step.id}
                className={`p-4 sm:p-5 rounded-2xl transition-all border ${cardClass}`}
              >
                <div className="flex items-start space-x-3.5">
                  <div
                    aria-hidden="true"
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs mt-0.5 ${resolvedIconClass}`}
                  >
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100">
                        {step.time}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {step.active && (
                          <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-900 dark:text-emerald-200 bg-emerald-200/80 dark:bg-emerald-900/90 px-2.5 py-0.5 rounded-full border border-emerald-500/60">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                              aria-hidden="true"
                            />
                            <span>{t.routine.activeNow}</span>
                          </span>
                        )}
                        {step.isSolarWindow && !step.active && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/70 px-2.5 py-0.5 rounded-full border border-amber-400/50">
                            ☀️ Safe Window Tip
                          </span>
                        )}
                      </div>
                    </div>

                    <h4 className="text-sm font-bold mt-1.5 text-zinc-950 dark:text-white">
                      {step.title}
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="mt-2.5 p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-700/80 flex items-start space-x-2">
                      <CheckCircle
                        className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                        <strong className="text-zinc-950 dark:text-white">
                          {t.hero.prescribedAction}
                        </strong>{' '}
                        {step.action}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
