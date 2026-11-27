import React from 'react';
import PropTypes from 'prop-types';
import { X, Settings, Globe, Moon, Sun, Users, Info, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../utils/i18n';
import { familyVulnerabilityProfiles } from '../utils/personalizedJugaadEngine';
import { useModalAccessibility } from '../hooks/useModalAccessibility';

/**
 * Application Settings, Preferences, Household Profile Selection, Scientific Data Source,
 * and Judges DevTools Launcher Modal.
 * @param {object} props - Component props.
 * @returns {JSX.Element|null} Accessible settings dialog or null when closed.
 */
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
  useModalAccessibility(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
    >
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl glass-card-dark p-6 sm:p-8 border border-white/20 shadow-2xl space-y-6">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start sm:items-center space-x-3 min-w-0 pr-2">
            <div
              className="w-10 h-10 rounded-2xl bg-[#10B981] flex items-center justify-center text-[#18181B] font-bold shrink-0 mt-0.5 sm:mt-0"
              aria-hidden="true"
            >
              <Settings className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 id="settings-modal-title" className="text-xl font-bold text-white tracking-tight">
                Settings &amp; Preferences
              </h2>
              <p className="text-xs text-white/60 mt-0.5">
                Customize language, display mode, family profile, and system transparency.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white shrink-0 transition-all border border-white/10 cursor-pointer"
            title="Close Settings"
            aria-label="Close settings modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* 1. Language Switcher */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#34D399] uppercase tracking-wider">
            <Globe className="w-4 h-4" aria-hidden="true" />
            <span>Select Application Language (भाषा चुनें)</span>
          </div>

          <div
            role="group"
            aria-label="Select application language"
            className="grid grid-cols-2 sm:grid-cols-4 gap-2"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                aria-pressed={currentLang === lang.code}
                onClick={() => onSelectLang(lang.code)}
                className={`py-2 px-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  currentLang === lang.code
                    ? 'bg-[#10B981] text-[#18181B] shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                <span>{lang.native}</span>
                {currentLang === lang.code && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Theme Appearance */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#34D399] uppercase tracking-wider block">
            Display Appearance
          </span>

          <div role="group" aria-label="Theme mode" className="grid grid-cols-2 gap-3">
            <button
              type="button"
              aria-pressed={!isDarkMode}
              onClick={() => {
                if (isDarkMode) onToggleDarkMode();
              }}
              className={`p-3 rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 border transition-all cursor-pointer ${
                !isDarkMode
                  ? 'bg-white text-[#282828] border-white shadow-sm'
                  : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <span>Light Mode</span>
            </button>

            <button
              type="button"
              aria-pressed={isDarkMode}
              onClick={() => {
                if (!isDarkMode) onToggleDarkMode();
              }}
              className={`p-3 rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 border transition-all cursor-pointer ${
                isDarkMode
                  ? 'bg-[#18181B] text-white border-[#10B981] shadow-sm'
                  : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
              }`}
            >
              <Moon className="w-4 h-4 text-[#34D399]" aria-hidden="true" />
              <span>Dark Mode</span>
            </button>
          </div>
        </div>

        {/* 3. Household Vulnerability Profiles */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#34D399] uppercase tracking-wider">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" aria-hidden="true" />
              <span>Household Profiles (Multi-Select)</span>
            </div>
            <span className="text-white/40 lowercase">{vulnerabilities.length} active</span>
          </div>

          <p className="text-[11px] text-white/60 leading-relaxed">
            Multi-select allows multigenerational Indian households (e.g. toddlers + elderly +
            daily commuter) to receive combined protective protocols.
          </p>

          <div
            role="group"
            aria-label="Household vulnerability scenario selector"
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1"
          >
            {familyVulnerabilityProfiles.map((profile) => {
              const active = vulnerabilities.includes(profile.id);
              return (
                <button
                  key={profile.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onToggleVulnerability(profile.id)}
                  className={`p-2.5 rounded-2xl text-xs font-semibold text-left transition-all border cursor-pointer ${
                    active
                      ? 'bg-white/15 text-white border-[#10B981]'
                      : 'bg-white/5 text-white/60 border-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{profile.label}</span>
                    <span
                      aria-hidden="true"
                      className={`w-2 h-2 rounded-full ${active ? 'bg-[#34D399]' : 'bg-white/20'}`}
                    />
                  </div>
                  <span className="text-[10px] text-white/50 block mt-0.5 line-clamp-1">
                    {profile.keyRisk}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Scientific Accuracy & Transparency Disclaimer */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-300">
            <Info className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>HOW DATA IS FETCHED &amp; SCIENTIFIC DISCLAIMER</span>
          </div>
          <p className="text-xs text-white/70 leading-relaxed">
            <strong>Data Accuracy:</strong> Atmospheric telemetry is fetched from the European{' '}
            <em>Copernicus Atmosphere Monitoring Service (CAMS)</em> and ECMWF models via
            Open-Meteo&apos;s 11km resolution grid across India and globally.
          </p>
          <p className="text-[11px] text-white/60 leading-relaxed">
            <strong>Public Health Disclaimer:</strong> Micro-climate indoor air quality varies with
            room leakage, building height, and ventilation. All guidance and Desi Jugaad hacks are
            evidence-informed harm-reduction suggestions designed for health betterment. They do not
            replace prescribed medical respiratory devices or clinical therapies.
          </p>
        </div>

        {/* 5. Judges DevTools Launcher */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-white block">
              Hack2skill Judges Prompt Inspector
            </span>
            <span className="text-[11px] text-white/50">
              Audits Gemini 2.5 Flash token counts, prompt schemas &amp; execution latency.
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenDevTools();
            }}
            className="px-3.5 py-1.5 rounded-xl bg-[#10B981] text-[#18181B] text-xs font-bold shrink-0 hover:bg-[#059669] transition-colors cursor-pointer"
          >
            Launch DevTools
          </button>
        </div>

        {/* Save Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3.5 px-6 rounded-2xl bg-zinc-950 hover:bg-black text-white font-extrabold text-sm border-2 border-zinc-700 hover:border-emerald-400 shadow-xl shadow-black/40 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" aria-hidden="true" />
          <span>Save &amp; Close Settings</span>
        </button>
      </div>
    </div>
  );
}

SettingsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentLang: PropTypes.string.isRequired,
  onSelectLang: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  onToggleDarkMode: PropTypes.func.isRequired,
  vulnerabilities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onToggleVulnerability: PropTypes.func.isRequired,
  onOpenDevTools: PropTypes.func.isRequired
};
