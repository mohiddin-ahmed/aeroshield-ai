import type React from 'react';
import { useState } from 'react';
import { Check, Flame, Pencil, ShieldCheck } from 'lucide-react';
import type { DailyChecklistSummary, DailyDefenseAction } from '../types/airQuality';

export interface DailyDefenseChecklistProps {
  actions: DailyDefenseAction[];
  completedIds: string[];
  summary: DailyChecklistSummary;
  onToggleAction: (actionId: string) => void;
  onUpdateHouseholdName: (rawName: string) => void;
}

/**
 * Zero-login, local-first daily action check-in tracker showing how much toxic PM2.5
 * and cigarette equivalence the household avoided today plus daily comeback streak.
 */
export function DailyDefenseChecklist({
  actions,
  completedIds,
  summary,
  onToggleAction,
  onUpdateHouseholdName
}: DailyDefenseChecklistProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [draftName, setDraftName] = useState(summary.householdName || '');

  const handleSaveName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onUpdateHouseholdName(draftName);
    setIsEditingName(false);
  };

  return (
    <section
      aria-label="Today's Clean-Air Check-In and Daily Savings"
      className="p-4 sm:p-5 rounded-3xl glass-card space-y-4 border border-emerald-500/20"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2.5">
          <div
            className="w-9 h-9 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-extrabold text-zinc-950 dark:text-white tracking-tight">
                {summary.householdName
                  ? `${summary.householdName}'s Daily Clean-Air Score`
                  : "Today's Clean-Air Check-In"}
              </h3>
              {!isEditingName && (
                <button
                  type="button"
                  onClick={() => {
                    setDraftName(summary.householdName || '');
                    setIsEditingName(true);
                  }}
                  className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-zinc-400 hover:text-emerald-500 transition-colors cursor-pointer"
                  title="Personalize household name (saved locally, no sign-up needed)"
                  aria-label="Personalize household name"
                >
                  <Pencil className="w-3 h-3" aria-hidden="true" />
                </button>
              )}
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Tick what you did today to see how much polluted smoke you avoided (saved on your
              device)
            </p>
          </div>
        </div>

        <span className="inline-flex items-center space-x-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
          <Flame className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
          <span>{summary.streakDays} Day Streak</span>
        </span>
      </div>

      {isEditingName && (
        <form onSubmit={handleSaveName} className="flex items-center gap-2">
          <label htmlFor="household-name-input" className="sr-only">
            Enter your family or household name
          </label>
          <input
            id="household-name-input"
            type="text"
            maxLength={32}
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            placeholder="Your name or family name (e.g., Ahmed Family)"
            className="flex-1 px-3 py-2 rounded-xl text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700 focus:outline-none"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-emerald-500 text-zinc-950 text-xs font-extrabold cursor-pointer hover:bg-emerald-400"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditingName(false)}
            className="px-3 py-2 rounded-xl bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold cursor-pointer"
          >
            Cancel
          </button>
        </form>
      )}

      <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
        <div>
          <span className="text-[10px] font-bold uppercase text-zinc-600 dark:text-zinc-300 block">
            Lung Shield
          </span>
          <span className="text-lg font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
            {summary.protectionPercent}%
          </span>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase text-zinc-600 dark:text-zinc-300 block">
            Dust Blocked
          </span>
          <span className="text-lg font-extrabold font-mono text-zinc-950 dark:text-white">
            {summary.pm25SavedTodayUg}
            <span className="text-[10px] font-normal ml-0.5">μg</span>
          </span>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase text-zinc-600 dark:text-zinc-300 block">
            Cigs Saved
          </span>
          <span className="text-lg font-extrabold font-mono text-rose-600 dark:text-rose-400">
            {summary.cigarettesSavedToday}
          </span>
        </div>
      </div>

      <div
        role="group"
        aria-label="Daily clean-air steps"
        className="grid grid-cols-1 sm:grid-cols-2 gap-2"
      >
        {actions.map((action) => {
          const isChecked = completedIds.includes(action.id);
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => onToggleAction(action.id)}
              aria-pressed={isChecked}
              className={`flex items-start space-x-2.5 p-2.5 rounded-2xl border text-left transition-all cursor-pointer active:scale-[0.99] ${
                isChecked
                  ? 'bg-emerald-500/12 border-emerald-500/45 text-zinc-950 dark:text-white'
                  : 'bg-zinc-100/80 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/70 dark:hover:bg-zinc-800'
              }`}
            >
              <span
                aria-hidden="true"
                className={`mt-0.5 w-4.5 h-4.5 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                  isChecked
                    ? 'bg-emerald-500 border-emerald-500 text-zinc-950'
                    : 'border-zinc-400 dark:border-zinc-500 bg-transparent'
                }`}
              >
                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="text-xs font-bold block leading-snug">{action.label}</span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block mt-0.5">
                  {action.hint}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
