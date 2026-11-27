import { useState } from 'react';
import { Calculator, Cigarette, HeartPulse } from 'lucide-react';
import { BERKELEY_EARTH_PM25_PER_CIGARETTE } from '../constants/airQuality';
import type { TranslationCatalog } from '../utils/i18n';

interface SafeguardRule {
  id: 'diyPurifier' | 'solarVentilation' | 'wetMopping' | 'n95Commute';
  label: string;
  reductionFactor: number;
}

const SAFEGUARD_ITEMS: SafeguardRule[] = [
  { id: 'diyPurifier', label: 'DIY Box-Fan (300 CFM)', reductionFactor: 0.72 },
  { id: 'solarVentilation', label: '1-3 PM Solar Window', reductionFactor: 0.28 },
  { id: 'wetMopping', label: 'Rock-Salt Wet Mop', reductionFactor: 0.35 },
  { id: 'n95Commute', label: 'N95 Sealed Mask', reductionFactor: 0.45 }
];

export interface DosimetryCalculatorProps {
  pm25: number;
  t: TranslationCatalog['research'];
  cigarettesUnitLabel: string;
}

/**
 * Interactive Berkeley Earth particulate dosimetry & cigarette-equivalence savings calculator.
 */
export function DosimetryCalculator({ pm25, t, cigarettesUnitLabel }: DosimetryCalculatorProps) {
  const [activeSafeguards, setActiveSafeguards] = useState<Record<SafeguardRule['id'], boolean>>({
    diyPurifier: true,
    solarVentilation: true,
    wetMopping: true,
    n95Commute: true
  });

  const basePm25 = pm25 || 320;
  const totalAvoidedUg = SAFEGUARD_ITEMS.reduce(
    (acc, item) =>
      activeSafeguards[item.id] ? acc + Math.round(basePm25 * item.reductionFactor) : acc,
    0
  );
  const cigarettesAvoided = Number((totalAvoidedUg / BERKELEY_EARTH_PM25_PER_CIGARETTE).toFixed(1));

  return (
    <section
      aria-label={t.calculatorTitle}
      className="p-6 sm:p-8 rounded-3xl glass-card border border-emerald-500/20 shadow-md"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div
          className="w-10 h-10 rounded-2xl bg-zinc-950 dark:bg-emerald-500 text-emerald-400 dark:text-zinc-950 flex items-center justify-center font-bold"
          aria-hidden="true"
        >
          <Calculator className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-zinc-950 dark:text-white">{t.calculatorTitle}</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-300">{t.calculatorSubtitle}</p>
        </div>
      </div>

      <div
        role="group"
        aria-label="Clean-air household safeguards"
        className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6"
      >
        {SAFEGUARD_ITEMS.map((item) => {
          const isActive = activeSafeguards[item.id];
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isActive}
              onClick={() =>
                setActiveSafeguards((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
              }
              className={`p-3 rounded-2xl text-xs font-bold text-left transition-all border cursor-pointer select-none active:scale-98 ${
                isActive
                  ? 'bg-zinc-950 text-white dark:bg-emerald-500 dark:text-zinc-950 border-zinc-950 dark:border-emerald-400 shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className={`w-2 h-2 rounded-full ${
                    isActive ? 'bg-emerald-400 dark:bg-zinc-950' : 'bg-zinc-400 dark:bg-zinc-500'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-100 dark:bg-zinc-800/90 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-xs">
        <div className="flex items-center space-x-3.5">
          <div
            className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-800 dark:text-emerald-300 shrink-0"
            aria-hidden="true"
          >
            <HeartPulse className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xs text-zinc-600 dark:text-zinc-300 font-bold block">
              {t.totalAvoided}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-950 dark:text-white">
              {totalAvoidedUg}{' '}
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 font-semibold">
                μg / day
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3.5">
          <div
            className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/80 flex items-center justify-center text-rose-700 dark:text-rose-300 shrink-0"
            aria-hidden="true"
          >
            <Cigarette className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xs text-zinc-600 dark:text-zinc-300 font-bold block">
              {t.cigarettesPrevented}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-600 dark:text-rose-400">
              {cigarettesAvoided}{' '}
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 font-semibold">
                {cigarettesUnitLabel}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
