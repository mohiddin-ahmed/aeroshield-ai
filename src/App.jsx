import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { DemoVideoModal } from './components/DemoVideoModal';
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
import { mockCitiesAirQuality } from './services/mockAirQualityData';
import { getPromptLogs } from './utils/promptLogger';

import { MapPin, RefreshCw, Sparkles, AlertTriangle, Layers, BookOpen, Clock, Wrench, Shield, Bot, ChevronDown } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState('commandCenter');
  const [selectedCity, setSelectedCity] = useState('delhi');
  const [telemetry, setTelemetry] = useState(mockCitiesAirQuality['delhi']);
  const [solarStatus, setSolarStatus] = useState(getSolarWindowStatus());
  const [vulnerabilities, setVulnerabilities] = useState(['toddler', 'asthma']);
  
  const [aiPlan, setAiPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingTelemetry, setIsLoadingTelemetry] = useState(false);

  // Modals & Panels
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isMultiAiOpen, setIsMultiAiOpen] = useState(false);
  const [promptCount, setPromptCount] = useState(0);

  // Update solar window status periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setSolarStatus(getSolarWindowStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch telemetry whenever selectedCity changes
  const loadTelemetry = useCallback(async (cityKey) => {
    setIsLoadingTelemetry(true);
    try {
      const data = await fetchLiveAirQuality(cityKey);
      setTelemetry(data);
    } catch (err) {
      console.error('Failed to load air quality:', err);
    } finally {
      setIsLoadingTelemetry(false);
    }
  }, []);

  useEffect(() => {
    loadTelemetry(selectedCity);
  }, [selectedCity, loadTelemetry]);

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

  const navigationTabs = [
    { id: 'commandCenter', label: 'Command Center', icon: Shield },
    { id: 'routine', label: 'Daily Routine', icon: Clock },
    { id: 'jugaad', label: 'Desi Jugaad Lab', icon: Wrench },
    { id: 'research', label: 'Research Hub', icon: BookOpen }
  ];

  return (
    <div className="relative min-h-screen bg-[#F7F7F7] text-[#282828] font-sans selection:bg-[#CBD77E] selection:text-[#282828] pb-16">
      
      {/* Dynamic Ambient Background Severity Glow Orbs */}
      <div 
        className="fixed top-12 left-1/4 w-96 h-96 rounded-full blur-[130px] opacity-35 pointer-events-none transition-colors duration-1000 -z-10 animate-float-slow"
        style={{ backgroundColor: telemetry.categoryColor || '#CBD77E' }}
      />
      <div 
        className="fixed bottom-12 right-1/4 w-80 h-80 rounded-full blur-[120px] opacity-25 pointer-events-none transition-colors duration-1000 -z-10 animate-float-delayed"
        style={{ backgroundColor: telemetry.categoryColor === '#CBD77E' ? '#E6CA9A' : '#9B2226' }}
      />

      {/* Sticky Top Navbar */}
      <Navbar
        isLiveFeed={telemetry.isLiveFeed}
        onOpenVideoModal={() => setIsVideoModalOpen(true)}
        onOpenInspector={() => setIsInspectorOpen(true)}
        promptCount={promptCount}
      />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Top Control Bar: City Selector & AI Plan Trigger */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-3xl glass-card">
          
          {/* Location Selector */}
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-2xl bg-[#282828] text-white flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#CBD77E]" />
            </div>
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="appearance-none bg-white/90 hover:bg-white text-[#282828] font-bold text-xs sm:text-sm pl-3 pr-8 py-2 rounded-2xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#282828] cursor-pointer shadow-2xs"
              >
                <option value="delhi">New Delhi (NCR), India</option>
                <option value="mumbai">Mumbai, India</option>
                <option value="kolkata">Kolkata, India</option>
                <option value="lahore">Lahore, Pakistan</option>
                <option value="london">London, United Kingdom</option>
                <option value="newyork">New York City, USA</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#282828]/60 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              onClick={() => loadTelemetry(selectedCity)}
              disabled={isLoadingTelemetry}
              className="p-2 rounded-2xl bg-white/80 hover:bg-white border border-black/5 text-[#282828] transition-colors"
              title="Refresh live telemetry"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingTelemetry ? 'animate-spin text-emerald-600' : ''}`} />
            </button>
          </div>

          {/* AI Plan Generation Trigger */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMultiAiOpen(true)}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-4 py-2 rounded-2xl bg-white hover:bg-gray-50 text-[#282828] border border-black/10 text-xs font-bold shadow-2xs transition-all"
            >
              <Bot className="w-3.5 h-3.5 text-indigo-600" />
              <span>Multi-AI Deep Dive</span>
            </button>

            <button
              onClick={handleGeneratePlan}
              disabled={isGenerating}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-5 py-2 rounded-2xl bg-[#282828] hover:bg-[#1a1a1a] text-white text-xs font-bold shadow-xs transition-all disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 text-[#CBD77E] ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Analyzing Inversion...' : 'Generate AI Plan'}</span>
            </button>
          </div>
        </div>

        {/* Severe Inversion Alert Banner (when AQI > 300) */}
        {telemetry.aqi > 300 && (
          <div className="p-4 sm:p-5 rounded-3xl bg-[#9B2226]/10 border-2 border-[#9B2226]/30 flex items-start space-x-3 text-[#9B2226]">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-[#9B2226]" />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider">
                Emergency Ground Thermal Inversion Alert • AQI {telemetry.aqi}
              </h3>
              <p className="text-xs text-[#282828]/80 mt-1 leading-relaxed">
                Atmospheric boundary layer is trapped below 150 meters. Inhaling ambient air today is the toxic equivalent of smoking <strong>{telemetry.cigaretteEquivDaily} cigarettes</strong>. Seal windows, run DIY box-fan filtration continuously, and ventilate only during the 1:00 PM – 3:00 PM solar window.
              </p>
            </div>
          </div>
        )}

        {/* Home.ai Segmented Control Pill Navigation Bar */}
        <div className="p-1.5 rounded-full bg-white/80 border border-black/5 shadow-2xs flex items-center justify-between sm:justify-center sm:space-x-2 overflow-x-auto">
          {navigationTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#282828] text-white shadow-sm'
                    : 'text-[#282828]/70 hover:text-[#282828] hover:bg-black/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#CBD77E]' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: COMMAND CENTER */}
        {activeTab === 'commandCenter' && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Layout: Dial + Vulnerabilities */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Rotary Circular AQI Dial (Home.ai Style) */}
              <div className="md:col-span-6 lg:col-span-5">
                <RotaryAqiDial 
                  telemetry={telemetry} 
                  isSolarActive={solarStatus.isWindowActive}
                />
              </div>

              {/* Vulnerability Profile & Quick Summary */}
              <div className="md:col-span-6 lg:col-span-7 space-y-4 flex flex-col justify-between">
                <VulnerabilityToggles
                  selected={vulnerabilities}
                  onToggle={handleToggleVulnerability}
                />

                {/* AI Executive Assessment or Live Telemetry Card */}
                <div className="p-6 rounded-3xl glass-card flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="w-4 h-4 text-[#CBD77E]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[#282828]/70">
                        {aiPlan ? 'VayuMitra AI Clinical Assessment' : 'Atmospheric Summary'}
                      </span>
                    </div>
                    <p className="text-xs text-[#282828]/80 leading-relaxed font-medium">
                      {aiPlan ? aiPlan.assessment : telemetry.summary}
                    </p>
                  </div>

                  {/* Advisory Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {telemetry.advisoryPills?.map((pill, i) => (
                      <span 
                        key={i}
                        className="text-[11px] font-semibold bg-black/5 text-[#282828] px-3 py-1 rounded-full"
                      >
                        • {pill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Telemetry Grid (PM2.5, PM10, NO2, O3) */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#282828]/60">
                  Open-Meteo High-Resolution Atmospheric Sensors
                </span>
                <span className="text-[11px] font-mono text-[#282828]/40">
                  Updated {telemetry.timestamp || 'Live'}
                </span>
              </div>
              <TelemetryGrid telemetry={telemetry} />
            </div>

            {/* AI Generated Routine Preview if available */}
            {aiPlan?.daily_routine && (
              <div className="p-6 rounded-3xl glass-card space-y-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-[#282828]">
                    Generated Smog Defense Plan for Your Family
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {aiPlan.daily_routine.map((r, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white/70 border border-black/5">
                      <span className="text-xs font-bold font-mono text-[#282828] block mb-1">
                        {r.time}
                      </span>
                      <p className="text-xs font-semibold text-[#282828] mb-1">{r.action}</p>
                      <p className="text-[11px] text-[#282828]/60 leading-tight">{r.scientific_reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DAILY ROUTINE */}
        {activeTab === 'routine' && (
          <div className="animate-fade-in">
            <SmogRoutineTimeline solarStatus={solarStatus} />
          </div>
        )}

        {/* TAB 3: DESI JUGAAD LAB */}
        {activeTab === 'jugaad' && (
          <div className="animate-fade-in">
            <DesiJugaadLab 
              onOpenMultiAi={() => setIsMultiAiOpen(true)}
              telemetry={telemetry}
            />
          </div>
        )}

        {/* TAB 4: RESEARCH & EVIDENCE HUB */}
        {activeTab === 'research' && (
          <div className="animate-fade-in">
            <ResearchHub telemetry={telemetry} />
          </div>
        )}

      </main>

      {/* Modals */}
      <DemoVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <MultiAiModal
        isOpen={isMultiAiOpen}
        onClose={() => setIsMultiAiOpen(false)}
        telemetry={telemetry}
        vulnerabilities={vulnerabilities}
      />

      <PromptInspector
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
      />

    </div>
  );
}
