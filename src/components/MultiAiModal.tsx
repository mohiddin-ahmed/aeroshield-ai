import { useState } from 'react';
import { Bot, Check, Copy, ExternalLink, Sparkles, X } from 'lucide-react';
import { useModalAccessibility } from '../hooks/useModalAccessibility';
import type { AirQualityTelemetry, TimeContext } from '../types/airQuality';

type AiPlatformKey = 'chatgpt' | 'claude' | 'gemini';

const AI_PLATFORMS: Record<AiPlatformKey, string> = {
  chatgpt: 'https://chatgpt.com/?q=',
  claude: 'https://claude.ai/new?q=',
  gemini: 'https://gemini.google.com/app?q='
};

export interface MultiAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  telemetry: Pick<AirQualityTelemetry, 'city' | 'aqi' | 'pm2_5'>;
  timeContext?: Partial<TimeContext>;
  vulnerabilities?: string[];
  customAiPrompt?: string;
}

/**
 * One-Click Multi-AI Prompt Synthesizer modal that pre-populates live AQI, time phase,
 * and household risk parameters into ChatGPT, Claude, or Gemini in one click.
 */
export function MultiAiModal({
  isOpen,
  onClose,
  telemetry,
  timeContext,
  vulnerabilities = [],
  customAiPrompt
}: MultiAiModalProps) {
  const [copied, setCopied] = useState(false);

  useModalAccessibility(isOpen, onClose);

  if (!isOpen) return null;

  const { city, aqi, pm2_5 } = telemetry;
  const promptToUse =
    customAiPrompt ||
    `Act as an expert atmospheric chemist and clinical respiratory health specialist.
I am in ${city} at ${timeContext?.timeString || 'now'}. Current AQI is ${aqi} (PM2.5: ${pm2_5} μg/m³).
Family profile: ${vulnerabilities.join(', ') || 'general household'}.
Provide immediate time-synchronized defense protocols and personalized Desi Jugaad hacks.`;

  const handleCopy = () => {
    if (navigator?.clipboard?.writeText) {
      void navigator.clipboard.writeText(promptToUse);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleOpenAi = (platform: AiPlatformKey) => {
    handleCopy();
    const baseUrl = AI_PLATFORMS[platform];
    if (!baseUrl) return;
    window.open(`${baseUrl}${encodeURIComponent(promptToUse)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="multi-ai-modal-title"
    >
      <div className="relative w-full max-w-2xl rounded-3xl glass-card-dark p-6 sm:p-8 border border-white/20 shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start sm:items-center space-x-3 min-w-0 pr-2">
            <div
              className="w-10 h-10 rounded-2xl bg-[#10B981] flex items-center justify-center text-[#18181B] font-bold shrink-0 mt-0.5 sm:mt-0"
              aria-hidden="true"
            >
              <Bot className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2
                id="multi-ai-modal-title"
                className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug"
              >
                One-Click Multi-AI Deep Dive Engine
              </h2>
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-white/70 mt-1">
                <span>📍 {city}</span>
                <span aria-hidden="true">•</span>
                <span>⏰ {timeContext?.timeString}</span>
                <span aria-hidden="true">•</span>
                <span className="text-[#34D399] font-mono font-bold">AQI {aqi}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white shrink-0 transition-all border border-white/10 cursor-pointer"
            title="Close"
            aria-label="Close Multi-AI prompt launcher"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 mb-4 flex items-center justify-between text-xs text-white/80">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#34D399]" aria-hidden="true" />
            <span>Auto-Synchronized to your live time, weather &amp; vulnerabilities</span>
          </div>
          <span className="font-mono text-[11px] text-[#34D399]">
            {vulnerabilities.length} active tags
          </span>
        </div>

        <div className="relative rounded-2xl bg-black/40 border border-white/10 p-4 mb-5">
          <div className="flex items-center justify-between text-xs text-[#34D399] font-bold mb-2">
            <span>PRE-FILLED CONTEXTUAL AI PROMPT</span>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center space-x-1 text-white hover:text-[#34D399] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-xs text-white/85 whitespace-pre-wrap font-sans max-h-48 overflow-y-auto pr-2 leading-relaxed">
            {promptToUse}
          </pre>
        </div>

        <div className="space-y-2 mb-6">
          <span className="text-xs font-bold text-white/60 uppercase tracking-wider block">
            Click to Copy &amp; Launch in Selected AI:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleOpenAi('chatgpt')}
              className="flex items-center justify-center space-x-2 p-3.5 rounded-2xl bg-[#10A37F] hover:bg-[#0d8a6b] text-white font-extrabold text-xs shadow-lg shadow-[#10A37F]/25 transition-all hover:scale-102 active:scale-95 cursor-pointer border border-emerald-400/30"
            >
              <span>Ask ChatGPT</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => handleOpenAi('claude')}
              className="flex items-center justify-center space-x-2 p-3.5 rounded-2xl bg-[#C2410C] hover:bg-[#9a3412] text-white font-extrabold text-xs shadow-lg shadow-[#C2410C]/25 transition-all hover:scale-102 active:scale-95 cursor-pointer border border-amber-500/30"
            >
              <span>Ask Claude</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => handleOpenAi('gemini')}
              className="flex items-center justify-center space-x-2 p-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 transition-all hover:scale-102 active:scale-95 cursor-pointer border border-indigo-400/30"
            >
              <span>Ask Gemini</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <p className="text-[11px] text-white/50 text-center">
          Clicking any button automatically copies your personalized telemetry prompt to clipboard
          and opens the platform in a new tab.
        </p>
      </div>
    </div>
  );
}
