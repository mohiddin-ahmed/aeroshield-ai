import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { FloatingBottomNav } from './components/FloatingBottomNav';
import { DemoVideoModal } from './components/DemoVideoModal';
import { SettingsModal } from './components/SettingsModal';
import { JugaadDetailModal } from './components/JugaadDetailModal';
import { RotaryAqiDial } from './components/RotaryAqiDial';
import { TelemetryGrid } from './components/TelemetryGrid';
import { VulnerabilityToggles } from './components/VulnerabilityToggles';
import { SmogRoutineTimeline } from './components/SmogRoutineTimeline';
import { DesiJugaadLab } from './components/DesiJugaadLab';
import { MultiAiModal } from './components/MultiAiModal';
import { ResearchHub } from './components/ResearchHub';
import { PromptInspector } from './components/PromptInspector';
import { OnboardingModal } from './components/OnboardingModal';
import { LogoShowcaseModal } from './components/LogoShowcaseModal';

import { fetchLiveAirQuality } from './services/airQualityService';
import { generateSmogDefensePlan } from './services/gemini';
import { getSolarWindowStatus } from './utils/solarWindowEngine';
import { detectDeviceLocation, getDetailedTimeContext, MAJOR_CITIES_CATALOG } from './utils/geolocationEngine';
import { generatePersonalizedIntelligence } from './utils/personalizedJugaadEngine';
import { mockCitiesAirQuality } from './services/mockAirQualityData';
import { getPromptLogs } from './utils/promptLogger';
import { translations } from './utils/i18n';

import { 
  MapPin, 
  RefreshCw, 
  Sparkles, 
  AlertTriangle, 
  Bot, 
  ChevronDown,
  Compass,
  Info,
  X
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState('commandCenter');
  
  // Psychology-based scroll memory: preserve position when quickly toggling, scroll top when fresh
  const scrollMemoryRef = useRef({});
  const aiPlanRef = useRef(null);

  const handleTabChange = useCallback((newTab) => {
    if (newTab === activeTab) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Save departure scroll position & timestamp for current tab
    if (typeof window !== 'undefined') {
      scrollMemoryRef.current[activeTab] = {
        scrollY: window.scrollY,
        timestamp: Date.now()
      };
    }

    setActiveTab(newTab);

    // Check if target tab was visited within recent engagement window (25 seconds)
    const targetMemory = scrollMemoryRef.current[newTab];
    const isRecentlyEngaged = targetMemory && (Date.now() - targetMemory.timestamp < 25000);

    setTimeout(() => {
      if (isRecentlyEngaged && targetMemory.scrollY > 40) {
        window.scrollTo({
          top: targetMemory.scrollY,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 40);
  }, [activeTab]);
  
  // Theme state: dark / light mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Language state
  const [currentLang, setCurrentLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lang') || 'en';
    }
    return 'en';
  });

  const handleSelectLang = (code) => {
    setCurrentLang(code);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', code);
    }
  };

  const t = translations[currentLang] || translations.en;

  // Sync dark class on document root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Geolocation & Time Detection
  const [locationData, setLocationData] = useState({
    city: 'Bengaluru',
    country: 'India',
    latitude: 12.9716,
    longitude: 77.5946,
    isAutoDetected: false
  });
  const [timeContext, setTimeContext] = useState(getDetailedTimeContext());
  const [isRefreshingLocation, setIsRefreshingLocation] = useState(false);

  // Telemetry & Weather state
  const [telemetry, setTelemetry] = useState(mockCitiesAirQuality['delhi']);
  const [solarStatus, setSolarStatus] = useState(getSolarWindowStatus());
  const [vulnerabilities, setVulnerabilities] = useState(['toddler', 'asthma']);
  
  // AI Plan & Modals
  const [aiPlan, setAiPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingTelemetry, setIsLoadingTelemetry] = useState(false);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isMultiAiOpen, setIsMultiAiOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLogosOpen, setIsLogosOpen] = useState(false);
  const [activeLogoVariant, setActiveLogoVariant] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('activeLogoVariant') || 'shield-wind';
    }
    return 'shield-wind';
  });
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('aeroshield_onboarded');
    }
    return false;
  });
  const [selectedJugaadItem, setSelectedJugaadItem] = useState(null);
  const [promptCount, setPromptCount] = useState(0);

  // Auto-detect device location on initial mount
  const handleAutoDetectLocation = useCallback(async () => {
    setIsRefreshingLocation(true);
    try {
      const detected = await detectDeviceLocation();
      setLocationData(detected);
      
      // Fetch live air quality for detected coordinates
      const liveData = await fetchLiveAirQuality('custom', {
        lat: detected.latitude,
        lon: detected.longitude
      });
      setTelemetry({
        ...liveData,
        city: detected.city || liveData.city,
        country: detected.country || liveData.country
      });
    } catch (err) {
      console.warn('Geolocation detection fallback:', err);
    } finally {
      setIsRefreshingLocation(false);
    }
  }, []);

  useEffect(() => {
    handleAutoDetectLocation();
  }, [handleAutoDetectLocation]);

  // Update device clock every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeContext(getDetailedTimeContext());
      setSolarStatus(getSolarWindowStatus());
    }, 30000);
    const handleSelectLogo = (variant) => {
    setActiveLogoVariant(variant);
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeLogoVariant', variant);
    }
  };

  return () => clearInterval(timer);
  }, []);

  // Compute personalized intelligence dynamically for current time, weather, and profile
  const personalizedIntel = useMemo(() => {
    return generatePersonalizedIntelligence({
      timeContext,
      telemetry,
      vulnerabilities
    });
  }, [timeContext, telemetry, vulnerabilities]);

  // Manual city override
  const handleManualCityChange = async (cityKey) => {
    setIsLoadingTelemetry(true);
    try {
      const cityPreset = MAJOR_CITIES_CATALOG[cityKey];
      const data = await fetchLiveAirQuality(cityKey, cityPreset ? { lat: cityPreset.lat, lon: cityPreset.lon } : null);
      setTelemetry(data);
      setLocationData({
        city: data.city,
        country: data.country,
        latitude: data.latitude,
        longitude: data.longitude,
        isAutoDetected: false
      });
    } catch (err) {
      console.error('Failed to change city:', err);
    } finally {
      setIsLoadingTelemetry(false);
    }
  };

  // Generate Gemini Clean-Air Plan
  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    try {
      const result = await generateSmogDefensePlan({
        city: telemetry.city,
        aqi: telemetry.aqi,
        pm25: telemetry.pm2_5,
        vulnerabilities
      });
      if (result?.data) {
        setAiPlan(result.data);
        setTimeout(() => {
          aiPlanRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
      setPromptCount(getPromptLogs().length);
    } catch (err) {
      console.error('Error generating AI plan:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleVulnerability = (id) => {
    setVulnerabilities(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  const handleSelectLogo = (variant) => {
    setActiveLogoVariant(variant);
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeLogoVariant', variant);
    }
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-300 font-sans pb-28 ${
      isDarkMode ? 'bg-[#09090b] text-[#f4f4f5]' : 'bg-[#F7F7F7] text-[#18181b]'
    }`}>
      
      {/* Dynamic Ambient Background Severity Glow Orbs */}
      <div 
        className="fixed top-12 left-1/4 w-96 h-96 rounded-full blur-[140px] opacity-25 dark:opacity-20 pointer-events-none transition-colors duration-1000 -z-10 animate-float-slow"
        style={{ backgroundColor: telemetry.categoryColor || '#10B981' }}
      />
      <div 
        className="fixed bottom-12 right-1/4 w-80 h-80 rounded-full blur-[130px] opacity-20 dark:opacity-15 pointer-events-none transition-colors duration-1000 -z-10 animate-float-delayed"
        style={{ backgroundColor: telemetry.categoryColor === '#CBD77E' ? '#10B981' : '#EF4444' }}
      />

      {/* Top Navbar */}
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
        onOpenLogos={() => setIsLogosOpen(true)}
        activeLogoVariant={activeLogoVariant}
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
        promptCount={promptCount}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 space-y-6">
        
        {/* TAB 1: COMMAND CENTER (HOME) */}
        {activeTab === 'commandCenter' && (
          <div className="space-y-6 animate-page-enter">
            
            {/* Device Time & Location Real-Time Detection Hero Banner (INSIDE HOME ONLY) */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl glass-card">
              <div className="flex items-start sm:items-center space-x-3 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold shrink-0 mt-0.5 sm:mt-0">
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
                    {locationData.city}, {locationData.country} • <span className="font-mono text-emerald-600 dark:text-emerald-400">{timeContext.timeString}</span> <span className="text-xs sm:text-sm font-semibold opacity-75">({timeContext.phaseLabel})</span>
                  </p>
                </div>
              </div>

              {/* Quick Actions & Manual Override Dropdown */}
              <div className="flex items-center flex-wrap sm:flex-nowrap gap-2 shrink-0">
                <div className="relative flex-1 sm:flex-initial">
                  <select
                    onChange={(e) => handleManualCityChange(e.target.value)}
                    defaultValue=""
                    className="w-full sm:w-auto appearance-none bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold text-xs pl-3 pr-7 py-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-700 focus:outline-none cursor-pointer"
                  >
                    <option value="" disabled>{t.actions.switchCity}</option>
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
                  <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none" />
                </div>

                <button
                  onClick={() => setIsMultiAiOpen(true)}
                  className="flex items-center space-x-1.5 px-3 py-2.5 rounded-2xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-bold border border-zinc-200 dark:border-zinc-700 shadow-2xs hover:scale-102 transition-all cursor-pointer"
                  title="Open Multi-AI Prompt Launcher"
                >
                  <Bot className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="hidden sm:inline">{t.actions.askAi}</span>
                </button>

                <button
                  onClick={handleGeneratePlan}
                  disabled={isGenerating}
                  className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-2xl bg-zinc-950 dark:bg-emerald-500 text-white dark:text-zinc-950 text-xs font-extrabold shadow-md hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Sparkles className={`w-3.5 h-3.5 text-emerald-400 dark:text-zinc-950 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span className="whitespace-nowrap">{isGenerating ? t.actions.analyzing : t.actions.generatePlan}</span>
                </button>
              </div>
            </div>

            {/* AI Generated Plan Spotlight (Renders Prominently at Top with Smooth Entrance & Scroll Anchor) */}
            {aiPlan?.daily_routine && (
              <div 
                ref={aiPlanRef}
                className="p-5 sm:p-6 rounded-3xl glass-card border-2 border-emerald-500/40 shadow-xl space-y-4 animate-page-enter bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold text-zinc-950 dark:text-white tracking-tight">
                        Generated Smog Defense Plan for Your Family
                      </h3>
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                        ⚡ AI Clinical Protocol Synchronized to {locationData.city} • {timeContext.timeString}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setAiPlan(null)}
                    className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors text-xs font-semibold cursor-pointer"
                    title="Dismiss Plan"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {aiPlan.daily_routine.map((r, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white/70 dark:bg-zinc-800/90 border border-emerald-500/20 shadow-xs hover:border-emerald-500/40 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                          {r.time}
                        </span>
                        <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                          Slot {idx + 1}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-zinc-950 dark:text-white mb-1">{r.action}</p>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-300 leading-relaxed">{r.scientific_reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Severe Inversion Alert Banner (When AQI > 300) */}
            {telemetry.aqi > 300 && (
              <div className="p-4 sm:p-5 rounded-3xl bg-rose-500/10 border-2 border-rose-500/30 flex items-start space-x-3 text-rose-700 dark:text-rose-300">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider">
                    {t.hero.emergencyTitle} • AQI {telemetry.aqi}
                  </h3>
                  <p className="text-xs opacity-90 mt-1 leading-relaxed">
                    {t.hero.emergencyBody}
                  </p>
                </div>
              </div>
            )}

            {/* Center Stage: Rotary Dial + Real-Time Inversion Status */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Rotary Circular AQI Dial */}
              <div className="md:col-span-6 lg:col-span-5">
                <RotaryAqiDial 
                  telemetry={telemetry} 
                  isSolarActive={solarStatus.isWindowActive}
                  currentLang={currentLang}
                  isDarkMode={isDarkMode}
                />
              </div>

              {/* Vulnerability Profile & Time-Synchronized Advisory */}
              <div className="md:col-span-6 lg:col-span-7 space-y-4 flex flex-col justify-between">
                <VulnerabilityToggles
                  selected={vulnerabilities}
                  onToggle={handleToggleVulnerability}
                  currentLang={currentLang}
                />

                {/* AI Executive Assessment or Live Telemetry Card */}
                <div className="p-6 rounded-3xl glass-card flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                        {aiPlan ? 'VayuMitra AI Clinical Assessment' : 'Real-Time Inversion Status'}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed font-semibold">
                      {aiPlan ? aiPlan.assessment : personalizedIntel.currentUrgentAdvisory}
                    </p>
                  </div>

                  {/* Advisory Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {telemetry.advisoryPills?.map((pill, i) => (
                      <span 
                        key={i}
                        className="text-[11px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700"
                      >
                        • {pill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Middle/Lower Section: Open-Meteo High-Resolution Atmospheric Sensors */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                  {t.sensors.title}
                </span>
                <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 font-bold">
                  Updated {telemetry.timestamp || 'Live'} • {telemetry.city}
                </span>
              </div>
              <TelemetryGrid telemetry={telemetry} currentLang={currentLang} />
            </div>

          </div>
        )}

        {/* TAB 2: DAILY ROUTINE */}
        {activeTab === 'routine' && (
          <div className="animate-page-enter">
            <SmogRoutineTimeline 
              solarStatus={solarStatus} 
              timeContext={timeContext}
              currentLang={currentLang}
            />
          </div>
        )}

        {/* TAB 3: DESI JUGAAD LAB */}
        {activeTab === 'jugaad' && (
          <div className="animate-page-enter">
            <DesiJugaadLab 
              onOpenMultiAi={() => setIsMultiAiOpen(true)}
              telemetry={telemetry}
              personalizedIntel={personalizedIntel}
              timeContext={timeContext}
              onSelectJugaad={(item) => setSelectedJugaadItem(item)}
              currentLang={currentLang}
            />
          </div>
        )}

        {/* TAB 4: RESEARCH & EVIDENCE HUB */}
        {activeTab === 'research' && (
          <div className="animate-page-enter">
            <ResearchHub 
              telemetry={telemetry} 
              currentLang={currentLang}
            />
          </div>
        )}

        {/* Footer Scientific & Public Health Disclaimer Banner */}
        <footer className="mt-8 p-4 rounded-3xl glass-card border border-zinc-200 dark:border-zinc-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-600 dark:text-zinc-300">
          <div className="flex items-start space-x-2.5">
            <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>{t.disclaimer.title}:</strong> {t.disclaimer.text}
            </p>
          </div>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="shrink-0 text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
          >
            Review Transparency & Sources →
          </button>
        </footer>

      </main>

      {/* Floating Bottom Capsule Pill Navigation Bar */}
      <FloatingBottomNav
        activeTab={activeTab}
        onSelectTab={handleTabChange}
        isDarkMode={isDarkMode}
        currentLang={currentLang}
      />

      {/* Modals & In-Place Drawers */}
      <LogoShowcaseModal
        isOpen={isLogosOpen}
        onClose={() => setIsLogosOpen(false)}
        activeLogoVariant={activeLogoVariant}
        onSelectLogoVariant={handleSelectLogo}
        isDarkMode={isDarkMode}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />

      <DemoVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
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

      <PromptInspector
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
      />

    </div>
  );
}

export default App;
