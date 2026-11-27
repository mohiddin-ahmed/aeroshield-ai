import { lazy, Suspense, useCallback, useRef, useState } from 'react';
import { Info } from 'lucide-react';
import { CommandCenterTab } from './components/CommandCenterTab';
import { DesiJugaadLab } from './components/DesiJugaadLab';
import { FloatingBottomNav } from './components/FloatingBottomNav';
import { Navbar } from './components/Navbar';
import { ResearchHub } from './components/ResearchHub';
import { SmogRoutineTimeline } from './components/SmogRoutineTimeline';
import { useAirQuality } from './hooks/useAirQuality';
import { useDailyChecklist } from './hooks/useDailyChecklist';
import { useLanguage } from './hooks/useLanguage';
import { useTheme } from './hooks/useTheme';
import type { AqiCategoryName, JugaadProtocol, TabId } from './types/airQuality';

const DemoVideoModal = lazy(() =>
  import('./components/DemoVideoModal').then((m) => ({ default: m.DemoVideoModal }))
);
const SettingsModal = lazy(() =>
  import('./components/SettingsModal').then((m) => ({ default: m.SettingsModal }))
);
const JugaadDetailModal = lazy(() =>
  import('./components/JugaadDetailModal').then((m) => ({ default: m.JugaadDetailModal }))
);
const MultiAiModal = lazy(() =>
  import('./components/MultiAiModal').then((m) => ({ default: m.MultiAiModal }))
);
const PromptInspector = lazy(() =>
  import('./components/PromptInspector').then((m) => ({ default: m.PromptInspector }))
);
const OnboardingModal = lazy(() =>
  import('./components/OnboardingModal').then((m) => ({ default: m.OnboardingModal }))
);

const PRIMARY_ORB_CLASSES: Record<AqiCategoryName, string> = {
  Good: 'bg-[#CBD77E]',
  Moderate: 'bg-[#E6CA9A]',
  Unhealthy: 'bg-[#E07A5F]',
  'Very Unhealthy': 'bg-[#F26419]',
  Hazardous: 'bg-[#9B2226]'
};

const TAB_LABELS: Record<TabId, string> = {
  commandCenter: 'Home air quality overview',
  routine: '24-hour clean-air routine',
  jugaad: 'DIY clean-air hacks lab',
  research: 'Scientific studies and dosimetry calculator'
};

/**
 * Root application shell for AeroShield AI (VayuMitra OS).
 * Renders instant, silky tab transitions across Home, Routine, Hacks, and Science,
 * tracks zero-login daily savings, and keeps modals lazy-loaded for speed.
 */
export function App() {
  const [activeTab, setActiveTab] = useState<TabId>('commandCenter');
  const aiPlanRef = useRef<HTMLElement | null>(null);

  const { isDarkMode, toggleDarkMode } = useTheme();
  const { currentLang, selectLanguage, t } = useLanguage();
  const {
    locationData,
    timeContext,
    isRefreshingLocation,
    telemetry,
    solarStatus,
    vulnerabilities,
    aiPlan,
    isGenerating,
    isLoadingTelemetry,
    promptCount,
    personalizedIntel,
    handleAutoDetectLocation,
    handleManualCityChange,
    handleGeneratePlan,
    handleToggleVulnerability,
    clearAiPlan
  } = useAirQuality();

  const checklist = useDailyChecklist(telemetry.pm2_5);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isMultiAiOpen, setIsMultiAiOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return !localStorage.getItem('aeroshield_onboarded');
    } catch {
      return false;
    }
  });
  const [selectedJugaadItem, setSelectedJugaadItem] = useState<JugaadProtocol | null>(null);

  const handleTabChange = useCallback(
    (newTab: TabId) => {
      if (newTab === activeTab) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      setActiveTab(newTab);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    },
    [activeTab]
  );

  const handleGenerateAndScroll = useCallback(async () => {
    const generated = await handleGeneratePlan();
    if (generated) {
      setTimeout(() => {
        aiPlanRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }, [handleGeneratePlan]);

  const primaryOrbClass = PRIMARY_ORB_CLASSES[telemetry.category] || 'bg-emerald-500';
  const secondaryOrbClass = telemetry.category === 'Good' ? 'bg-emerald-500' : 'bg-rose-500';

  return (
    <div
      className={`relative min-h-screen transition-colors duration-300 font-sans pb-32 ${
        isDarkMode ? 'bg-[#09090b] text-[#f4f4f5]' : 'bg-[#F7F7F7] text-[#18181b]'
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-xl focus:bg-emerald-500 focus:text-zinc-950 focus:font-bold focus:shadow-lg"
      >
        Skip to main content
      </a>

      <div role="status" aria-live="polite" className="sr-only">
        {`${TAB_LABELS[activeTab]} active for ${telemetry.city}, AQI ${telemetry.aqi} (${telemetry.category})`}
      </div>

      <div
        aria-hidden="true"
        className={`fixed top-12 left-1/4 w-96 h-96 rounded-full blur-[140px] opacity-25 dark:opacity-20 pointer-events-none transition-colors duration-1000 -z-10 animate-float-slow ${primaryOrbClass}`}
      />
      <div
        aria-hidden="true"
        className={`fixed bottom-12 right-1/4 w-80 h-80 rounded-full blur-[130px] opacity-20 dark:opacity-15 pointer-events-none transition-colors duration-1000 -z-10 animate-float-delayed ${secondaryOrbClass}`}
      />

      <Navbar
        locationData={locationData}
        timeContext={timeContext}
        onGoHome={() => handleTabChange('commandCenter')}
        onRefreshLocation={handleAutoDetectLocation}
        isRefreshingLocation={isRefreshingLocation}
        isLiveFeed={telemetry.isLiveFeed}
        onOpenVideoModal={() => setIsVideoModalOpen(true)}
        onOpenInspector={() => setIsInspectorOpen(true)}
        onOpenMultiAi={() => setIsMultiAiOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenTour={() => setIsOnboardingOpen(true)}
        currentLang={currentLang}
        onSelectLang={selectLanguage}
        promptCount={promptCount}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <main
        id="main-content"
        tabIndex={-1}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-5 focus:outline-none"
      >
        <div key={activeTab} className="animate-page-enter">
          {activeTab === 'commandCenter' && (
            <CommandCenterTab
              t={t}
              locationData={locationData}
              timeContext={timeContext}
              telemetry={telemetry}
              solarStatus={solarStatus}
              vulnerabilities={vulnerabilities}
              aiPlan={aiPlan}
              aiPlanRef={aiPlanRef}
              personalizedIntel={personalizedIntel}
              checklist={checklist}
              currentLang={currentLang}
              isDarkMode={isDarkMode}
              isGenerating={isGenerating}
              isLoadingTelemetry={isLoadingTelemetry}
              onSelectCity={handleManualCityChange}
              onRefreshLocation={handleAutoDetectLocation}
              onOpenMultiAi={() => setIsMultiAiOpen(true)}
              onGeneratePlan={handleGenerateAndScroll}
              onDismissPlan={clearAiPlan}
              onToggleVulnerability={handleToggleVulnerability}
            />
          )}

          {activeTab === 'routine' && (
            <SmogRoutineTimeline
              solarStatus={solarStatus}
              timeContext={timeContext}
              currentLang={currentLang}
            />
          )}

          {activeTab === 'jugaad' && (
            <DesiJugaadLab
              onOpenMultiAi={() => setIsMultiAiOpen(true)}
              personalizedIntel={personalizedIntel}
              timeContext={timeContext}
              onSelectJugaad={(item) => setSelectedJugaadItem(item)}
              currentLang={currentLang}
            />
          )}

          {activeTab === 'research' && (
            <ResearchHub telemetry={telemetry} currentLang={currentLang} />
          )}
        </div>

        <footer className="mt-6 p-4 rounded-3xl glass-card border border-zinc-200 dark:border-zinc-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-600 dark:text-zinc-300">
          <div className="flex items-start space-x-2.5">
            <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="leading-relaxed">
              <strong>{t.disclaimer.title}:</strong> {t.disclaimer.text}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="shrink-0 text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
          >
            Data Sources &amp; Settings →
          </button>
        </footer>
      </main>

      <FloatingBottomNav
        activeTab={activeTab}
        onSelectTab={handleTabChange}
        isDarkMode={isDarkMode}
        currentLang={currentLang}
      />

      <Suspense fallback={null}>
        {isOnboardingOpen && (
          <OnboardingModal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} />
        )}

        {isVideoModalOpen && (
          <DemoVideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
        )}

        {isSettingsOpen && (
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            currentLang={currentLang}
            onSelectLang={selectLanguage}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
            vulnerabilities={vulnerabilities}
            onToggleVulnerability={handleToggleVulnerability}
            onOpenDevTools={() => setIsInspectorOpen(true)}
          />
        )}

        {selectedJugaadItem && (
          <JugaadDetailModal
            item={selectedJugaadItem}
            isOpen={Boolean(selectedJugaadItem)}
            onClose={() => setSelectedJugaadItem(null)}
            onOpenMultiAi={() => setIsMultiAiOpen(true)}
          />
        )}

        {isMultiAiOpen && (
          <MultiAiModal
            isOpen={isMultiAiOpen}
            onClose={() => setIsMultiAiOpen(false)}
            telemetry={telemetry}
            timeContext={timeContext}
            vulnerabilities={vulnerabilities}
            customAiPrompt={personalizedIntel.customAiPrompt}
          />
        )}

        {isInspectorOpen && (
          <PromptInspector isOpen={isInspectorOpen} onClose={() => setIsInspectorOpen(false)} />
        )}
      </Suspense>
    </div>
  );
}

export default App;
