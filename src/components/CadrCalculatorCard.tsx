import { useState } from 'react';
import { BookOpen, Wrench } from 'lucide-react';
import type { FanSpeed, JugaadProtocol } from '../types/airQuality';
import { calculateDiyPurifierStats } from '../utils/cadrCalculator';
import type { TranslationCatalog } from '../utils/i18n';

export interface CadrCalculatorCardProps {
  t: TranslationCatalog['jugaad'];
  featuredProtocol?: JugaadProtocol;
  onSelectProtocol: (item: JugaadProtocol) => void;
}

const FAN_SPEEDS: FanSpeed[] = ['low', 'medium', 'high'];

/**
 * Interactive fluid-dynamics DIY Box-Fan + MERV 13 purifier CADR & ACH calculator.
 */
export function CadrCalculatorCard({
  t,
  featuredProtocol,
  onSelectProtocol
}: CadrCalculatorCardProps) {
  const [roomSqft, setRoomSqft] = useState(220);
  const [fanSpeed, setFanSpeed] = useState<FanSpeed>('medium');
  const cadrStats = calculateDiyPurifierStats(roomSqft, fanSpeed);

  return (
    <section aria-label={t.boxFanTitle} className="p-6 sm:p-8 rounded-3xl glass-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 rounded-2xl bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold"
            aria-hidden="true"
          >
            <Wrench className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">{t.boxFanTitle}</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">{t.boxFanSubtitle}</p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-400/50 self-start sm:self-center">
          {cadrStats.costSavingsMultiple}x {t.costEfficientBadge}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-100 dark:bg-zinc-800/90 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-700 mb-6">
        <div>
          <div className="flex justify-between text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            <label htmlFor="room-sqft-slider">{t.targetRoomSize}</label>
            <span className="font-mono text-emerald-600 dark:text-emerald-400">
              {roomSqft} sq. ft.
            </span>
          </div>
          <input
            id="room-sqft-slider"
            type="range"
            min="80"
            max="600"
            step="10"
            value={roomSqft}
            aria-valuetext={`${roomSqft} square feet`}
            onChange={(e) => setRoomSqft(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
            <span>Small Bedroom (100 sq ft)</span>
            <span>Large Hall (500 sq ft)</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            <span>{t.fanSpeed}</span>
            <span className="capitalize font-mono text-emerald-600 dark:text-emerald-400">
              {fanSpeed}
            </span>
          </div>
          <div role="group" aria-label={t.fanSpeed} className="grid grid-cols-3 gap-2">
            {FAN_SPEEDS.map((speed) => (
              <button
                key={speed}
                type="button"
                onClick={() => setFanSpeed(speed)}
                aria-pressed={fanSpeed === speed}
                className={`py-1.5 rounded-xl text-xs font-bold capitalize transition-all border cursor-pointer select-none active:scale-95 ${
                  fanSpeed === speed
                    ? 'bg-zinc-950 text-white dark:bg-emerald-500 dark:text-zinc-950 border-zinc-950 dark:border-emerald-400 shadow-xs'
                    : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700'
                }`}
              >
                {speed}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 block">
            Noise: {cadrStats.noiseDb} dB • Power: {cadrStats.powerWatts} Watts
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-6">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-xs">
          <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 block">
            {t.deliveredCadr}
          </span>
          <span className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
            {cadrStats.effectiveCadrCfm}
          </span>
          <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 ml-1">CFM</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-xs">
          <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 block">
            {t.ach}
          </span>
          <span className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
            {cadrStats.achievedAch}
          </span>
          <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 ml-1">ACH</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-xs">
          <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 block">
            {t.cleanTime}
          </span>
          <span className="text-xl sm:text-2xl font-extrabold font-mono text-zinc-950 dark:text-white">
            {cadrStats.timeTo90ReductionMin}
          </span>
          <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 ml-1">mins</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-xs">
          <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 block">
            {t.costPerCfm}
          </span>
          <span className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
            ₹{cadrStats.costPerCfmDiy}
          </span>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">
            {t.commercialCompare}
          </span>
        </div>
      </div>

      {featuredProtocol && (
        <button
          type="button"
          onClick={() => onSelectProtocol(featuredProtocol)}
          className="w-full flex items-center justify-center space-x-2 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-xs font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 transition-all cursor-pointer active:scale-[0.99]"
        >
          <BookOpen className="w-4 h-4" aria-hidden="true" />
          <span>{t.viewGuideBtn}</span>
        </button>
      )}
    </section>
  );
}
