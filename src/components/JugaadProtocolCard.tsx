import { ArrowRight } from 'lucide-react';
import type { JugaadProtocol } from '../types/airQuality';

export interface JugaadProtocolCardProps {
  jugaad: JugaadProtocol;
  viewGuideLabel: string;
  onSelect: (item: JugaadProtocol) => void;
}

/**
 * Individual Desi Jugaad household clean-air protocol summary card.
 */
export function JugaadProtocolCard({ jugaad, viewGuideLabel, onSelect }: JugaadProtocolCardProps) {
  return (
    <div className="p-5 rounded-3xl glass-card flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-400/50">
            {jugaad.badge}
          </span>
          <span className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">
            {jugaad.cost}
          </span>
        </div>

        <h4 className="text-sm font-bold mt-1 text-zinc-950 dark:text-white">{jugaad.title}</h4>
        <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-relaxed">
          {jugaad.impact}
        </p>

        <div className="mt-3 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700">
          <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 block">
            <strong className="text-zinc-950 dark:text-white">Quick step:</strong>{' '}
            {jugaad.instruction}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onSelect(jugaad)}
        className="mt-4 flex items-center justify-center space-x-1.5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-emerald-100 dark:hover:bg-emerald-950/80 text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer active:scale-[0.98]"
      >
        <span>{viewGuideLabel}</span>
        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
