import React from 'react';
import { Sparkles, X } from 'lucide-react';
import type { SmogDefensePlan } from '../types/airQuality';

export interface AiPlanSpotlightProps {
  aiPlan: SmogDefensePlan | null;
  locationCity: string;
  timeString: string;
  onDismiss: () => void;
}

/**
 * Displays the AI-generated personalized 4-step household smog defense routine.
 * Supports keyboard-accessible dismissal and forwards ref for smooth scroll-into-view.
 */
export const AiPlanSpotlight = React.forwardRef<HTMLElement, AiPlanSpotlightProps>(
  function AiPlanSpotlight({ aiPlan, locationCity, timeString, onDismiss }, ref) {
    if (!aiPlan?.daily_routine) return null;

    return (
      <section
        ref={ref}
        aria-label="Generated AI Smog Defense Plan"
        className="p-5 sm:p-6 rounded-3xl glass-card border-2 border-emerald-500/40 shadow-xl space-y-4 animate-page-enter bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/10"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div
              className="w-8 h-8 rounded-xl bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold"
              aria-hidden="true"
            >
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-zinc-950 dark:text-white tracking-tight">
                Generated Smog Defense Plan for Your Family
              </h2>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                ⚡ AI Clinical Protocol Synchronized to {locationCity} • {timeString}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors text-xs font-semibold cursor-pointer"
            title="Dismiss Plan"
            aria-label="Dismiss generated smog defense plan"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {aiPlan.daily_routine.map((step, slotNumber) => (
            <div
              key={`${step.time}-${step.action.slice(0, 24)}`}
              className="p-4 rounded-2xl bg-white/70 dark:bg-zinc-800/90 border border-emerald-500/20 shadow-xs hover:border-emerald-500/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {step.time}
                </span>
                <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                  Slot {slotNumber + 1}
                </span>
              </div>
              <p className="text-xs font-bold text-zinc-950 dark:text-white mb-1">{step.action}</p>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {step.scientific_reason}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
);
