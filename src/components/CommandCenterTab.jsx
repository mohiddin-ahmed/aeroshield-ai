import React from 'react';
import PropTypes from 'prop-types';
import { AlertTriangle, Sparkles } from 'lucide-react';
import { LocationHeroBanner } from './LocationHeroBanner';
import { AiPlanSpotlight } from './AiPlanSpotlight';
import { RotaryAqiDial } from './RotaryAqiDial';
import { VulnerabilityToggles } from './VulnerabilityToggles';
import { TelemetryGrid } from './TelemetryGrid';

/**
 * Primary Command Center view combining live location/time controls, AI plan spotlight,
 * hazard warnings, rotary AQI dial, family vulnerability tags, and Copernicus sensor grid.
 * @param {object} props - Component props.
 * @returns {JSX.Element} Command center dashboard layout.
 */
export function CommandCenterTab({
  t,
  locationData,
  timeContext,
  telemetry,
  solarStatus,
  vulnerabilities,
  aiPlan,
  aiPlanRef,
  personalizedIntel,
  currentLang,
  isDarkMode,
  isGenerating,
  isLoadingTelemetry,
  onSelectCity,
  onOpenMultiAi,
  onGeneratePlan,
  onDismissPlan,
  onToggleVulnerability
}) {
  return (
    <div className="space-y-6 animate-page-enter">
      <LocationHeroBanner
        locationData={locationData}
        timeContext={timeContext}
        t={t}
        onSelectCity={onSelectCity}
        onOpenMultiAi={onOpenMultiAi}
        onGeneratePlan={onGeneratePlan}
        isGenerating={isGenerating}
        isLoadingTelemetry={isLoadingTelemetry}
      />

      <AiPlanSpotlight
        ref={aiPlanRef}
        aiPlan={aiPlan}
        locationCity={locationData.city}
        timeString={timeContext.timeString}
        onDismiss={onDismissPlan}
      />

      {/* Severe Inversion Alert Banner (When AQI > 300) */}
      {telemetry.aqi > 300 && (
        <div
          role="alert"
          className="p-4 sm:p-5 rounded-3xl bg-rose-500/10 border-2 border-rose-500/30 flex items-start space-x-3 text-rose-700 dark:text-rose-300"
        >
          <AlertTriangle
            className="w-5 h-5 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400"
            aria-hidden="true"
          />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider">
              {t.hero.emergencyTitle} • AQI {telemetry.aqi}
            </h3>
            <p className="text-xs opacity-90 mt-1 leading-relaxed">{t.hero.emergencyBody}</p>
          </div>
        </div>
      )}

      {/* Center Stage: Rotary Dial + Vulnerability & Clinical Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-6 lg:col-span-5">
          <RotaryAqiDial
            telemetry={telemetry}
            isSolarActive={solarStatus.isWindowActive}
            currentLang={currentLang}
            isDarkMode={isDarkMode}
          />
        </div>

        <div className="md:col-span-6 lg:col-span-7 space-y-4 flex flex-col justify-between">
          <VulnerabilityToggles
            selected={vulnerabilities}
            onToggle={onToggleVulnerability}
            currentLang={currentLang}
          />

          <section
            aria-label="Clinical assessment and advisories"
            className="p-6 rounded-3xl glass-card flex-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                  {aiPlan ? 'VayuMitra AI Clinical Assessment' : 'Real-Time Inversion Status'}
                </span>
              </div>
              <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed font-semibold">
                {aiPlan ? aiPlan.assessment : personalizedIntel.currentUrgentAdvisory}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {telemetry.advisoryPills?.map((pill) => (
                <span
                  key={pill}
                  className="text-[11px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700"
                >
                  • {pill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Atmospheric Particulate Sensors */}
      <section aria-label={t.sensors.title} className="pt-2">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
            {t.sensors.title}
          </span>
          <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 font-bold">
            Updated {telemetry.timestamp || 'Live'} • {telemetry.city}
          </span>
        </div>
        <TelemetryGrid telemetry={telemetry} currentLang={currentLang} />
      </section>
    </div>
  );
}

CommandCenterTab.propTypes = {
  t: PropTypes.object.isRequired,
  locationData: PropTypes.object.isRequired,
  timeContext: PropTypes.object.isRequired,
  telemetry: PropTypes.object.isRequired,
  solarStatus: PropTypes.object.isRequired,
  vulnerabilities: PropTypes.arrayOf(PropTypes.string).isRequired,
  aiPlan: PropTypes.object,
  aiPlanRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
  personalizedIntel: PropTypes.object.isRequired,
  currentLang: PropTypes.string.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  isGenerating: PropTypes.bool.isRequired,
  isLoadingTelemetry: PropTypes.bool.isRequired,
  onSelectCity: PropTypes.func.isRequired,
  onOpenMultiAi: PropTypes.func.isRequired,
  onGeneratePlan: PropTypes.func.isRequired,
  onDismissPlan: PropTypes.func.isRequired,
  onToggleVulnerability: PropTypes.func.isRequired
};
