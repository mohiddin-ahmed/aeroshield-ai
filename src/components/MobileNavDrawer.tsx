import { Bot, PlayCircle, RefreshCw, Settings, Sparkles, Terminal } from 'lucide-react';
import type { LocationData, TimeContext } from '../types/airQuality';
import type { TranslationCatalog } from '../utils/i18n';

export interface MobileNavDrawerProps {
  locationData: LocationData;
  timeContext: TimeContext;
  isRefreshingLocation: boolean;
  promptCount: number;
  t: TranslationCatalog;
  onCloseDrawer: () => void;
  onRefreshLocation: () => void;
  onOpenTour: () => void;
  onOpenVideoModal: () => void;
  onOpenMultiAi: () => void;
  onOpenSettings: () => void;
  onOpenInspector: () => void;
}

/**
 * Slide-down mobile navigation drawer exposing location refresh, interactive tour,
 * walkthrough video, Multi-AI launcher, settings, and Judges DevTools.
 */
export function MobileNavDrawer({
  locationData,
  timeContext,
  isRefreshingLocation,
  promptCount,
  t,
  onCloseDrawer,
  onRefreshLocation,
  onOpenTour,
  onOpenVideoModal,
  onOpenMultiAi,
  onOpenSettings,
  onOpenInspector
}: MobileNavDrawerProps) {
  return (
    <div className="sm:hidden border-t border-black/5 dark:border-white/10 p-4 space-y-2.5 bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-2xl shadow-2xl animate-drawer">
      <div className="flex items-center justify-between text-xs font-semibold pb-2 border-b border-black/5 dark:border-white/10">
        <span>
          {locationData.city || 'Location'} • {timeContext.timeString}
        </span>
        <button
          type="button"
          onClick={onRefreshLocation}
          className="text-[#10B981] font-bold flex items-center space-x-1 cursor-pointer"
        >
          <RefreshCw
            className={`w-3 h-3 ${isRefreshingLocation ? 'animate-spin' : ''}`}
            aria-hidden="true"
          />
          <span>{t.actions.autoDetect}</span>
        </button>
      </div>

      <button
        type="button"
        onClick={() => {
          onCloseDrawer();
          onOpenTour();
        }}
        className="w-full flex items-center space-x-2.5 p-3 rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-500/25 hover:bg-emerald-500/15 transition-all cursor-pointer active:scale-98"
      >
        <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
        <span>Interactive App Tour &amp; Guide</span>
      </button>

      <button
        type="button"
        onClick={() => {
          onCloseDrawer();
          onOpenVideoModal();
        }}
        className="w-full flex items-center space-x-2.5 p-3 rounded-2xl bg-rose-500/10 text-rose-700 dark:text-rose-300 text-xs font-bold border border-rose-500/20 hover:bg-rose-500/15 transition-all cursor-pointer active:scale-98"
      >
        <PlayCircle
          className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0"
          aria-hidden="true"
        />
        <span>{t.actions.watchVideo}</span>
      </button>

      <button
        type="button"
        onClick={() => {
          onCloseDrawer();
          onOpenMultiAi();
        }}
        className="w-full flex items-center space-x-2.5 p-3 rounded-2xl bg-black/5 dark:bg-white/10 text-xs font-bold hover:bg-black/10 dark:hover:bg-white/15 transition-all cursor-pointer active:scale-98"
      >
        <Bot className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
        <span>Ask ChatGPT / Claude / Gemini</span>
      </button>

      <button
        type="button"
        onClick={() => {
          onCloseDrawer();
          onOpenSettings();
        }}
        className="w-full flex items-center space-x-2.5 p-3 rounded-2xl bg-black/5 dark:bg-white/10 text-xs font-bold hover:bg-black/10 dark:hover:bg-white/15 transition-all cursor-pointer active:scale-98"
      >
        <Settings className="w-4 h-4 text-[#10B981] shrink-0" aria-hidden="true" />
        <span>Settings, Profiles &amp; Languages</span>
      </button>

      <button
        type="button"
        onClick={() => {
          onCloseDrawer();
          onOpenInspector();
        }}
        className="w-full flex items-center space-x-2.5 p-3 rounded-2xl bg-[#282828] dark:bg-white text-white dark:text-[#282828] text-xs font-bold shadow-md hover:opacity-90 transition-all cursor-pointer active:scale-98"
      >
        <Terminal
          className="w-4 h-4 text-[#10B981] dark:text-emerald-700 shrink-0"
          aria-hidden="true"
        />
        <span>
          {t.actions.devTools} ({promptCount})
        </span>
      </button>
    </div>
  );
}
