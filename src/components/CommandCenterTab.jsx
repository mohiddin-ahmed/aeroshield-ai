import React from 'react';
import PropTypes from 'prop-types';
import { AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';
import { LocationHeroBanner } from './LocationHeroBanner';
import { AiPlanSpotlight } from './AiPlanSpotlight';
import { RotaryAqiDial } from './RotaryAqiDial';
import { VulnerabilityToggles } from './VulnerabilityToggles';
import { TelemetryGrid } from './TelemetryGrid';
import { DailyDefenseChecklist } from './DailyDefenseChecklist';

/**
 * Primary Command Center view combining compact searchable city bar,
 * hero circular AQI chart paired with slidable family carousel & live pollutant boxes,
 * point-wise right-now action cards, and daily savings check-in.
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
  checklist,
  currentLang,
  isDarkMode,
  isGenerating,
  isLoadingTelemetry,
  onSelectCity,
  onRefreshLocation,
  onOpenMultiAi,
  onGeneratePlan,
  onDismissPlan,
  onToggleVulnerability
}) {
  const actionBoxes = personalizedIntel.actionBoxes || [];

  return (
    <div className="space-y-4 sm:space-y-5">
      <LocationHeroBanner
        locationData={locationData}
        timeContext={timeContext}
        t={t}
        onSelectCity={onSelectCity}
        onRefreshLocation={onRefreshLocation}
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

      {/* High Smog Emergency Banner (When AQI > 300) */}
      {telemetry.aqi > 300 && (
        <div
          role="alert"
          className="p-3.5 sm:p-4 rounded-2xl bg-rose-500/10 border border-rose-500/35 flex items-start space-x-3 text-rose-700 dark:text-rose-300"
        >
          <AlertTriangle
            className="w-5 h-5 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400"
            aria-hidden="true"
          />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider">
              {t.hero.emergencyTitle} • AQI {telemetry.aqi}
            </h3>
            <p className="text-xs opacity-90 mt-0.5 leading-relaxed">{t.hero.emergencyBody}</p>
          </div>
        </div>
      )}

      {/* Hero Stage: Circular AQI Dial + Compact Slidable Family Bar + Live Pollutant Sensors Up Top */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="md:col-span-5">
          <RotaryAqiDial
            telemetry={telemetry}
            isSolarActive={solarStatus.isWindowActive}
            currentLang={currentLang}
            isDarkMode={isDarkMode}
          />
        </div>

        <div className="md:col-span-7 flex flex-col justify-between gap-3.5">
          {/* Compact Single-Row Slidable Family Selection */}
          <VulnerabilityToggles
            selected={vulnerabilities}
            onToggle={onToggleVulnerability}
            currentLang={currentLang}
          />

          {/* Live Pollutant Sensor Boxes (PM2.5, PM10, NO2, O3) */}
          <section aria-label={t.sensors.title} className="flex-1 flex flex-col justify-end">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                {t.sensors.title}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-zinc-500 dark:text-zinc-400 font-bold">
                Updated {telemetry.timestamp || 'Live'} • {telemetry.city}
              </span>
            </div>
            <TelemetryGrid telemetry={telemetry} currentLang={currentLang} compact={true} />
          </section>
        </div>
      </div>

      {/* Point-Wise Compact Action Boxes ("What You Should Do Right Now") */}
      <section
        aria-label="What you should do right now"
        className="p-4 sm:p-5 rounded-3xl glass-card space-y-3.5"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-800 dark:text-zinc-100">
              {aiPlan ? 'Your AI Clean-Air Briefing' : 'What You Should Do Right Now'}
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {telemetry.advisoryPills?.slice(0, 3).map((pill) => (
              <span
                key={pill}
                className="text-[10px] sm:text-[11px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-700"
              >
                • {pill}
              </span>
            ))}
          </div>
        </div>

        {/* AI Custom Assessment when generated OR Crisp 3-Box Point Cards */}
        {aiPlan?.assessment ? (
          <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-semibold p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
            {aiPlan.assessment}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {actionBoxes.map((box) => (
              <div
                key={box.id}
                className="p-3.5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/75 border border-zinc-200/90 dark:border-zinc-700/80 hover:border-emerald-500/50 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
                      {box.badge}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" aria-hidden="true" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-zinc-950 dark:text-white leading-snug">
                    {box.title}
                  </h3>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-300 mt-1 leading-relaxed">
                    {box.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Zero-Login Personalized Daily Check-In & Clean-Air Savings */}
      <DailyDefenseChecklist
        actions={checklist.actions}
        completedIds={checklist.completedIds}
        summary={checklist.summary}
        onToggleAction={checklist.toggleAction}
        onUpdateHouseholdName={checklist.updateHouseholdName}
      />
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
  checklist: PropTypes.shape({
    actions: PropTypes.array.isRequired,
    completedIds: PropTypes.array.isRequired,
    summary: PropTypes.object.isRequired,
    toggleAction: PropTypes.func.isRequired,
    updateHouseholdName: PropTypes.func.isRequired
  }).isRequired,
  currentLang: PropTypes.string.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  isGenerating: PropTypes.bool.isRequired,
  isLoadingTelemetry: PropTypes.bool.isRequired,
  onSelectCity: PropTypes.func.isRequired,
  onRefreshLocation: PropTypes.func,
  onOpenMultiAi: PropTypes.func.isRequired,
  onGeneratePlan: PropTypes.func.isRequired,
  onDismissPlan: PropTypes.func.isRequired,
  onToggleVulnerability: PropTypes.func.isRequired
};
