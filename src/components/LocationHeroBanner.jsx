import React from 'react';
import PropTypes from 'prop-types';
import { Compass, Bot, Sparkles, ChevronDown } from 'lucide-react';

/**
 * Hero banner showing auto-detected geolocation/solar phase, manual city selector,
 * Multi-AI launcher button, and primary Gemini Smog Defense Plan generator CTA.
 * @param {object} props - Component props.
 * @returns {JSX.Element} Hero location banner and quick controls.
 */
export function LocationHeroBanner({
  locationData,
  timeContext,
  t,
  onSelectCity,
  onOpenMultiAi,
  onGeneratePlan,
  isGenerating,
  isLoadingTelemetry
}) {
  return (
    <section
      aria-label="Location and quick actions"
      className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl glass-card"
    >
      <div className="flex items-start sm:items-center space-x-3 min-w-0">
        <div
          className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold shrink-0 mt-0.5 sm:mt-0"
          aria-hidden="true"
        >
          <Compass className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between sm:justify-start gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {t.status.autoDetected}
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-zinc-200/90 dark:bg-zinc-700/90 text-zinc-800 dark:text-zinc-200 font-mono font-bold whitespace-nowrap shrink-0">
              {timeContext.dateString}
            </span>
          </div>
          <p className="text-sm sm:text-base font-extrabold tracking-tight mt-1 text-zinc-950 dark:text-white leading-snug">
            {locationData.city}, {locationData.country} •{' '}
            <span className="font-mono text-emerald-600 dark:text-emerald-400">
              {timeContext.timeString}
            </span>{' '}
            <span className="text-xs sm:text-sm font-semibold opacity-75">
              ({timeContext.phaseLabel})
            </span>
          </p>
        </div>
      </div>

      {/* Quick Actions & Manual City Station Selector */}
      <div className="flex items-center flex-wrap sm:flex-nowrap gap-2 shrink-0">
        <div className="relative flex-1 sm:flex-initial">
          <label htmlFor="city-station-select" className="sr-only">
            {t.actions.switchCity}
          </label>
          <select
            id="city-station-select"
            aria-label={t.actions.switchCity}
            onChange={(e) => onSelectCity(e.target.value)}
            defaultValue=""
            disabled={isLoadingTelemetry}
            className="w-full sm:w-auto appearance-none bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold text-xs pl-3 pr-7 py-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-700 focus:outline-none cursor-pointer disabled:opacity-60"
          >
            <option value="" disabled>
              {t.actions.switchCity}
            </option>
            <optgroup label="India (All Regions)">
              <option value="bengaluru">Bengaluru, Karnataka</option>
              <option value="delhi">New Delhi (NCR)</option>
              <option value="mumbai">Mumbai, Maharashtra</option>
              <option value="kolkata">Kolkata, West Bengal</option>
              <option value="chennai">Chennai, Tamil Nadu</option>
              <option value="hyderabad">Hyderabad, Telangana</option>
              <option value="pune">Pune, Maharashtra</option>
              <option value="ahmedabad">Ahmedabad, Gujarat</option>
              <option value="lucknow">Lucknow, UP</option>
              <option value="patna">Patna, Bihar</option>
              <option value="jaipur">Jaipur, Rajasthan</option>
              <option value="kochi">Kochi, Kerala</option>
              <option value="chandigarh">Chandigarh</option>
              <option value="guwahati">Guwahati, Assam</option>
            </optgroup>
            <optgroup label="International">
              <option value="lahore">Lahore, Pakistan</option>
              <option value="dhaka">Dhaka, Bangladesh</option>
              <option value="london">London, UK</option>
              <option value="newyork">New York, USA</option>
            </optgroup>
          </select>
          <ChevronDown
            className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none"
            aria-hidden="true"
          />
        </div>

        <button
          type="button"
          onClick={onOpenMultiAi}
          className="flex items-center space-x-1.5 px-3 py-2.5 rounded-2xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-bold border border-zinc-200 dark:border-zinc-700 shadow-xs hover:scale-102 transition-all cursor-pointer"
          title="Open Multi-AI Prompt Launcher"
          aria-label="Open Multi-AI Prompt Launcher"
        >
          <Bot className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
          <span className="hidden sm:inline">{t.actions.askAi}</span>
        </button>

        <button
          type="button"
          onClick={onGeneratePlan}
          disabled={isGenerating}
          aria-busy={isGenerating}
          className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-2xl bg-zinc-950 dark:bg-emerald-500 text-white dark:text-zinc-950 text-xs font-extrabold shadow-md hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer"
        >
          <Sparkles
            className={`w-3.5 h-3.5 text-emerald-400 dark:text-zinc-950 ${
              isGenerating ? 'animate-spin' : ''
            }`}
            aria-hidden="true"
          />
          <span className="whitespace-nowrap">
            {isGenerating ? t.actions.analyzing : t.actions.generatePlan}
          </span>
        </button>
      </div>
    </section>
  );
}

LocationHeroBanner.propTypes = {
  locationData: PropTypes.shape({
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired
  }).isRequired,
  timeContext: PropTypes.shape({
    dateString: PropTypes.string.isRequired,
    timeString: PropTypes.string.isRequired,
    phaseLabel: PropTypes.string.isRequired
  }).isRequired,
  t: PropTypes.object.isRequired,
  onSelectCity: PropTypes.func.isRequired,
  onOpenMultiAi: PropTypes.func.isRequired,
  onGeneratePlan: PropTypes.func.isRequired,
  isGenerating: PropTypes.bool.isRequired,
  isLoadingTelemetry: PropTypes.bool
};
