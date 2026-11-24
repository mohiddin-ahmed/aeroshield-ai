import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  ShieldCheck
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState('commandCenter');
  
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

  return (
    <div className={`relative min-h-screen transition-colors duration-300 font-sans pb-28 ${
      isDarkMode ? 'bg-[#121212] text-[#F3F4F6]' : 'bg-[#F7F7F7] text-[#282828]'
    }`}>
      
      {/* Dynamic Ambient Background Severity Glow Orbs */}
      <div 
        className="fixed top-12 left-1/4 w-96 h-96 rounded-full blur-[140px] opacity-25 dark:opacity-20 pointer-events-none transition-colors duration-1000 -z-10 animate-float-slow"
        style={{ backgroundColor: telemetry.categoryColor || '#10B981' }}
      />
      <div 
        className="fixed bottom-12 right-1/4 w-80 h-80 rounded-full blur-[130px] opacity-20 dark:opacity-15 pointer-events-none transition-colors duration-1000 -z-10 animate-float-delayed"
        style={{ backgroundColor: telemetry.categoryColor === '#CBD77E' ? '#10B981' : '#9B2226' }}
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
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-3xl glass-card">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#10B981]/20 text-[#059669] dark:text-[#34D399] flex items-center justify-center font-bold shrink-0">
                  <Compass className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#10B981]">
                      {t.status.autoDetected}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 font-mono">
                      {timeContext.dateString}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base font-bold tracking-tight mt-0.5">
                    {locationData.city}, {locationData.country} • <span className="font-mono text-[#10B981]">{timeContext.timeString}</span> ({timeContext.phaseLabel})
                  </p>
                </div>
              </div>

              {/* Quick Actions & Manual Override Dropdown */}
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <select
                    onChange={(e) => handleManualCityChange(e.target.value)}
                    defaultValue=""
                    className="appearance-none bg-black/5 dark:bg-white/10 text-inherit font-bold text-xs pl-3 pr-7 py-2 rounded-2xl border border-black/5 dark:border-white/10 focus:outline-none cursor-pointer"
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
                  className="flex items-center space-x-1.5 px-3.5 py-2 rounded-2xl bg-white dark:bg-white/10 text-xs font-bold border border-black/5 dark:border-white/10 shadow-2xs hover:scale-102 transition-all"
                  title="Open Multi-AI Prompt Launcher"
                >
                  <Bot className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="hidden sm:inline">{t.actions.askAi}</span>
                </button>

                <button
                  onClick={handleGeneratePlan}
                  disabled={isGenerating}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-[#282828] dark:bg-white text-white dark:text-[#282828] text-xs font-bold shadow-xs hover:opacity-90 transition-all disabled:opacity-50"
                >
                  <Sparkles className={`w-3.5 h-3.5 text-[#10B981] ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>{isGenerating ? 'Analyzing...' : t.actions.generatePlan}</span>
                </button>
              </div>
            </div>

            {/* Severe Inversion Alert Banner (When AQI > 300) */}
            {telemetry.aqi > 300 && (
              <div className="p-4 sm:p-5 rounded-3xl bg-[#9B2226]/10 border-2 border-[#9B2226]/30 flex items-start space-x-3 text-[#9B2226] dark:text-rose-300">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-[#9B2226] dark:text-rose-400" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider">
                    Emergency Ground Thermal Inversion Alert • AQI {telemetry.aqi}
                  </h3>
                  <p className="text-xs opacity-90 mt-1 leading-relaxed">
                    Atmospheric boundary layer is trapped below 150 meters. Inhaling ambient air today is the toxic equivalent of smoking <strong>{telemetry.cigaretteEquivDaily} cigarettes</strong>. Seal windows, run DIY box-fan filtration continuously, and ventilate only during the 1:00 PM – 3:00 PM solar window.
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
                />
              </div>

              {/* Vulnerability Profile & Time-Synchronized Advisory */}
              <div className="md:col-span-6 lg:col-span-7 space-y-4 flex flex-col justify-between">
                <VulnerabilityToggles
                  selected={vulnerabilities}
                  onToggle={handleToggleVulnerability}
                />

                {/* AI Executive Assessment or Live Telemetry Card */}
                <div className="p-6 rounded-3xl glass-card flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="w-4 h-4 text-[#10B981]" />
                      <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                        {aiPlan ? 'VayuMitra AI Clinical Assessment' : 'Real-Time Inversion Status'}
                      </span>
                    </div>
                    <p className="text-xs opacity-85 leading-relaxed font-medium">
                      {aiPlan ? aiPlan.assessment : personalizedIntel.currentUrgentAdvisory}
                    </p>
                  </div>

                  {/* Advisory Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {telemetry.advisoryPills?.map((pill, i) => (
                      <span 
                        key={i}
                        className="text-[11px] font-semibold bg-black/5 dark:bg-white/10 px-3 py-1 rounded-full"
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
                <span className="text-xs font-bold uppercase tracking-wider opacity-60">
                  {t.metrics.sensorsTitle}
                </span>
                <span className="text-[11px] font-mono opacity-40">
                  Updated {telemetry.timestamp || 'Live'} • {telemetry.city}
                </span>
              </div>
              <TelemetryGrid telemetry={telemetry} />
            </div>

            {/* AI Generated Routine Preview if available */}
            {aiPlan?.daily_routine && (
              <div className="p-6 rounded-3xl glass-card space-y-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#10B981]" />
                  <h3 className="text-sm font-bold">
                    Generated Smog Defense Plan for Your Family
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {aiPlan.daily_routine.map((r, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-black/3 dark:bg-white/5 border border-black/5 dark:border-white/10">
                      <span className="text-xs font-bold font-mono text-[#10B981] block mb-1">
                        {r.time}
                      </span>
                      <p className="text-xs font-semibold mb-1">{r.action}</p>
                      <p className="text-[11px] opacity-60 leading-tight">{r.scientific_reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: DAILY ROUTINE */}
        {activeTab === 'routine' && (
          <div className="animate-page-enter">
            <SmogRoutineTimeline 
              solarStatus={solarStatus} 
              timeContext={timeContext}
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
            />
          </div>
        )}

        {/* TAB 4: RESEARCH & EVIDENCE HUB */}
        {activeTab === 'research' && (
          <div className="animate-page-enter">
            <ResearchHub telemetry={telemetry} />
          </div>
        )}

        {/* Footer Scientific & Public Health Disclaimer Banner */}
        <footer className="mt-8 p-4 rounded-3xl glass-card border border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs opacity-70">
          <div className="flex items-start space-x-2.5">
            <Info className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>{t.disclaimer.title}:</strong> {t.disclaimer.text}
            </p>
          </div>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="shrink-0 text-[#10B981] font-bold hover:underline"
          >
            Review Transparency & Sources →
          </button>
        </footer>

      </main>

      {/* Floating Bottom Capsule Pill Navigation Bar */}
      <FloatingBottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isDarkMode={isDarkMode}
      />

      {/* Modals & In-Place Drawers */}
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
