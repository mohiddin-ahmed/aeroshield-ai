import React, { useState, useCallback, useRef } from 'react';
import { Info } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { FloatingBottomNav } from './components/FloatingBottomNav';
import { CommandCenterTab } from './components/CommandCenterTab';
import { SmogRoutineTimeline } from './components/SmogRoutineTimeline';
import { DesiJugaadLab } from './components/DesiJugaadLab';
import { ResearchHub } from './components/ResearchHub';
import { DemoVideoModal } from './components/DemoVideoModal';
import { SettingsModal } from './components/SettingsModal';
import { JugaadDetailModal } from './components/JugaadDetailModal';
import { MultiAiModal } from './components/MultiAiModal';
import { PromptInspector } from './components/PromptInspector';
import { OnboardingModal } from './components/OnboardingModal';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import { useAirQuality } from './hooks/useAirQuality';
import { SCROLL_MEMORY_WINDOW_MS } from './constants/airQuality';

/**
 * Root application shell for AeroShield AI (VayuMitra OS).
 * Coordinates theme, localization, live atmospheric telemetry, adaptive scroll memory,
 * and WCAG 2.1 AA accessible modal dialogs.
 * @returns {JSX.Element} Full responsive web application layout.
 */
export function App() {
  const [activeTab, setActiveTab] = useState('commandCenter');
  const scrollMemoryRef = useRef({});
  const aiPlanRef = useRef(null);

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

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isMultiAiOpen, setIsMultiAiOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return !localStorage.getItem('aeroshield_onboarded');
    } catch {
      return false;
    }
  });
  const [selectedJugaadItem, setSelectedJugaadItem] = useState(null);

  const handleTabChange = useCallback(
    (newTab) => {
      if (newTab === activeTab) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (typeof window !== 'undefined') {
        scrollMemoryRef.current[activeTab] = {
          scrollY: window.scrollY,
          timestamp: Date.now()
        };
      }

      setActiveTab(newTab);

      const targetMemory = scrollMemoryRef.current[newTab];
      const isRecentlyEngaged =
        targetMemory && Date.now() - targetMemory.timestamp < SCROLL_MEMORY_WINDOW_MS;

      setTimeout(() => {
        if (isRecentlyEngaged && targetMemory.scrollY > 40) {
          window.scrollTo({ top: targetMemory.scrollY, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 40);
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

  return (
    <div
      className={`relative min-h-screen transition-colors duration-300 font-sans pb-28 ${
        isDarkMode ? 'bg-[#09090b] text-[#f4f4f5]' : 'bg-[#F7F7F7] text-[#18181b]'
      }`}
    >
      {/* WCAG 2.1 AA Skip-to-Content Landmark Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-xl focus:bg-emerald-500 focus:text-zinc-950 focus:font-bold focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Dynamic Ambient Background Severity Glow Orbs */}
      <div
        aria-hidden="true"
        className="fixed top-12 left-1/4 w-96 h-96 rounded-full blur-[140px] opacity-25 dark:opacity-20 pointer-events-none transition-colors duration-1000 -z-10 animate-float-slow"
        style={{ backgroundColor: telemetry.categoryColor || '#10B981' }}
      />
      <div
        aria-hidden="true"
        className="fixed bottom-12 right-1/4 w-80 h-80 rounded-full blur-[130px] opacity-20 dark:opacity-15 pointer-events-none transition-colors duration-1000 -z-10 animate-float-delayed"
        style={{ backgroundColor: telemetry.categoryColor === '#CBD77E' ? '#10B981' : '#EF4444' }}
      />

      {/* Sticky Header */}
      <Navbar
        locationData={locationData}
        timeContext={timeContext}
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

      {/* Main Content Landmark */}
      <main
        id="main-content"
        tabIndex={-1}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 space-y-6 focus:outline-none"
      >
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
            currentLang={currentLang}
            isDarkMode={isDarkMode}
            isGenerating={isGenerating}
            isLoadingTelemetry={isLoadingTelemetry}
            onSelectCity={handleManualCityChange}
            onOpenMultiAi={() => setIsMultiAiOpen(true)}
            onGeneratePlan={handleGenerateAndScroll}
            onDismissPlan={clearAiPlan}
            onToggleVulnerability={handleToggleVulnerability}
          />
        )}

        {activeTab === 'routine' && (
          <div className="animate-page-enter">
            <SmogRoutineTimeline
              solarStatus={solarStatus}
              timeContext={timeContext}
              currentLang={currentLang}
            />
          </div>
        )}

        {activeTab === 'jugaad' && (
          <div className="animate-page-enter">
            <DesiJugaadLab
              onOpenMultiAi={() => setIsMultiAiOpen(true)}
              personalizedIntel={personalizedIntel}
              timeContext={timeContext}
              onSelectJugaad={(item) => setSelectedJugaadItem(item)}
              currentLang={currentLang}
            />
          </div>
        )}

        {activeTab === 'research' && (
          <div className="animate-page-enter">
            <ResearchHub telemetry={telemetry} currentLang={currentLang} />
          </div>
        )}

        {/* Scientific & Public Health Disclaimer Footer */}
        <footer className="mt-8 p-4 rounded-3xl glass-card border border-zinc-200 dark:border-zinc-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-600 dark:text-zinc-300">
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
            Review Transparency &amp; Sources →
          </button>
        </footer>
      </main>

      {/* Bottom Floating Capsule Navigation */}
      <FloatingBottomNav
        activeTab={activeTab}
        onSelectTab={handleTabChange}
        isDarkMode={isDarkMode}
        currentLang={currentLang}
      />

      {/* Accessible Modals & DevTools Drawer */}
      <OnboardingModal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} />

      <DemoVideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />

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

      <JugaadDetailModal
        item={selectedJugaadItem}
        isOpen={Boolean(selectedJugaadItem)}
        onClose={() => setSelectedJugaadItem(null)}
        onOpenMultiAi={() => setIsMultiAiOpen(true)}
      />

      <MultiAiModal
        isOpen={isMultiAiOpen}
        onClose={() => setIsMultiAiOpen(false)}
        telemetry={telemetry}
        timeContext={timeContext}
        vulnerabilities={vulnerabilities}
        customAiPrompt={personalizedIntel.customAiPrompt}
      />

      <PromptInspector isOpen={isInspectorOpen} onClose={() => setIsInspectorOpen(false)} />
    </div>
  );
}

export default App;
