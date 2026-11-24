import React from 'react';
import { 
  X, 
  Settings, 
  Globe, 
  Moon, 
  Sun, 
  Users, 
  ShieldCheck, 
  Info, 
  Terminal, 
  Check, 
  MapPin, 
  ExternalLink 
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, translations } from '../utils/i18n';
import { familyVulnerabilityProfiles } from '../utils/personalizedJugaadEngine';

export function SettingsModal({ 
  isOpen, 
  onClose, 
  currentLang, 
  onSelectLang, 
  isDarkMode, 
  onToggleDarkMode, 
  vulnerabilities, 
  onToggleVulnerability,
  onOpenDevTools 
}) {
  if (!isOpen) return null;

  const t = translations[currentLang] || translations.en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl glass-card-dark p-6 sm:p-8 border border-white/20 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#10B981] flex items-center justify-center text-[#18181B] font-bold">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Settings & Preferences
            </h2>
            <p className="text-xs text-white/60">
              Customize language, display mode, family profile, and system transparency.
            </p>
          </div>
        </div>

        {/* 1. Language Switcher (Indian Languages) */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#34D399] uppercase tracking-wider">
            <Globe className="w-4 h-4" />
            <span>Select Application Language (भाषा चुनें)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onSelectLang(lang.code)}
                className={`py-2 px-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                  currentLang === lang.code
                    ? 'bg-[#10B981] text-[#18181B] shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                <span>{lang.native}</span>
                {currentLang === lang.code && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Theme Appearance */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#34D399] uppercase tracking-wider block">
            Display Appearance
          </span>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => { if (isDarkMode) onToggleDarkMode(); }}
              className={`p-3 rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 border transition-all ${
                !isDarkMode
                  ? 'bg-white text-[#282828] border-white shadow-sm'
                  : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Light Mode</span>
            </button>

            <button
              onClick={() => { if (!isDarkMode) onToggleDarkMode(); }}
              className={`p-3 rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 border transition-all ${
                isDarkMode
                  ? 'bg-[#18181B] text-white border-[#10B981] shadow-sm'
                  : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
              }`}
            >
              <Moon className="w-4 h-4 text-[#34D399]" />
              <span>Dark Mode</span>
            </button>
          </div>
        </div>

        {/* 3. Family Profile Scenarios */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#34D399] uppercase tracking-wider">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Household Profiles (Multi-Select)</span>
            </div>
            <span className="text-white/40 lowercase">{vulnerabilities.length} active</span>
          </div>

          <p className="text-[11px] text-white/60 leading-relaxed">
            Multi-select allows multigenerational Indian households (e.g. toddlers + elderly + daily commuter) to receive combined protective protocols.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {familyVulnerabilityProfiles.map((p) => {
              const active = vulnerabilities.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => onToggleVulnerability(p.id)}
                  className={`p-2.5 rounded-2xl text-xs font-semibold text-left transition-all border ${
                    active
                      ? 'bg-white/15 text-white border-[#10B981]'
                      : 'bg-white/5 text-white/60 border-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{p.label}</span>
                    <span className={`w-2 h-2 rounded-full ${active ? 'bg-[#34D399]' : 'bg-white/20'}`} />
                  </div>
                  <span className="text-[10px] text-white/50 block mt-0.5 line-clamp-1">{p.keyRisk}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Scientific Accuracy & Transparency Disclaimer */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-300">
            <Info className="w-4 h-4 shrink-0" />
            <span>HOW DATA IS FETCHED & SCIENTIFIC DISCLAIMER</span>
          </div>
          <p className="text-xs text-white/70 leading-relaxed">
            <strong>Data Accuracy:</strong> Atmospheric telemetry is fetched from the European <em>Copernicus Atmosphere Monitoring Service (CAMS)</em> and ECMWF models via Open-Meteo's 11km resolution grid across India and globally.
          </p>
          <p className="text-[11px] text-white/60 leading-relaxed">
            <strong>Public Health Disclaimer:</strong> Micro-climate indoor air quality varies with room leakage, building height, and ventilation. All guidance and Desi Jugaad hacks are evidence-informed harm-reduction suggestions designed for health betterment. They do not replace prescribed medical respiratory devices or clinical therapies.
          </p>
        </div>

        {/* 5. Hackathon Judges DevTools Explanation & Trigger */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-white block">Hack2skill Judges Prompt Inspector</span>
            <span className="text-[11px] text-white/50">Audits Gemini 2.5 Flash token counts, prompt schemas & execution latency.</span>
          </div>
          <button
            onClick={() => { onClose(); onOpenDevTools(); }}
            className="px-3.5 py-1.5 rounded-xl bg-[#10B981] text-[#18181B] text-xs font-bold shrink-0 hover:bg-[#059669] transition-colors"
          >
            Launch DevTools
          </button>
        </div>

        {/* Footer */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors"
        >
          Save & Close Settings
        </button>

      </div>
    </div>
  );
}
