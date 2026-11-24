import React, { useState } from 'react';
import { X, Bot, Copy, Check, ExternalLink, Sparkles, Clock, MapPin, CloudRain } from 'lucide-react';

export function MultiAiModal({ isOpen, onClose, telemetry, timeContext, vulnerabilities = [], customAiPrompt }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const { city, aqi, pm2_5, temperatureC, humidityPct } = telemetry;
  const promptToUse = customAiPrompt || `Act as an expert atmospheric chemist and clinical respiratory health specialist.
I am in ${city} at ${timeContext?.timeString || 'now'}. Current AQI is ${aqi} (PM2.5: ${pm2_5} μg/m³).
Family profile: ${vulnerabilities.join(', ') || 'general household'}.
Provide immediate time-synchronized defense protocols and personalized Desi Jugaad hacks.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptToUse);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleOpenAi = (platform) => {
    handleCopy();
    const encoded = encodeURIComponent(promptToUse);
    let url = '';

    if (platform === 'chatgpt') {
      url = `https://chatgpt.com/?q=${encoded}`;
    } else if (platform === 'claude') {
      url = `https://claude.ai/new?q=${encoded}`;
    } else if (platform === 'gemini') {
      url = `https://gemini.google.com/app?q=${encoded}`;
    }

    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl glass-card-dark p-6 sm:p-8 border border-white/20 shadow-2xl overflow-hidden">
        
        {/* Header with Clean Separated Close Button */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start sm:items-center space-x-3 min-w-0 pr-2">
            <div className="w-10 h-10 rounded-2xl bg-[#10B981] flex items-center justify-center text-[#18181B] font-bold shrink-0 mt-0.5 sm:mt-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                One-Click Multi-AI Deep Dive Engine
              </h2>
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-white/70 mt-1">
                <span>📍 {city}</span>
                <span>•</span>
                <span>⏰ {timeContext?.timeString}</span>
                <span>•</span>
                <span className="text-[#34D399] font-mono font-bold">AQI {aqi}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white shrink-0 transition-all border border-white/10 cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Context Badge */}
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 mb-4 flex items-center justify-between text-xs text-white/80">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#34D399]" />
            <span>Auto-Synchronized to your live time, weather & vulnerabilities</span>
          </div>
          <span className="font-mono text-[11px] text-[#34D399]">
            {vulnerabilities.length} active tags
          </span>
        </div>

        {/* Prompt Preview Card */}
        <div className="relative rounded-2xl bg-black/40 border border-white/10 p-4 mb-5">
          <div className="flex items-center justify-between text-xs text-[#34D399] font-bold mb-2">
            <span>PRE-FILLED CONTEXTUAL AI PROMPT</span>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 text-white hover:text-[#34D399] transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-xs text-white/85 whitespace-pre-wrap font-sans max-h-48 overflow-y-auto pr-2 leading-relaxed">
            {promptToUse}
          </pre>
        </div>

        {/* Action Buttons: 3 AI Platforms */}
        <div className="space-y-2 mb-6">
          <span className="text-xs font-bold text-white/60 uppercase tracking-wider block">
            Click to Copy & Launch in Selected AI:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* ChatGPT */}
            <button
              onClick={() => handleOpenAi('chatgpt')}
              className="flex items-center justify-center space-x-2 p-3.5 rounded-2xl bg-[#10A37F] hover:bg-[#0d8a6b] text-white font-extrabold text-xs shadow-lg shadow-[#10A37F]/25 transition-all hover:scale-102 active:scale-95 cursor-pointer border border-emerald-400/30"
            >
              <span>Ask ChatGPT</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Claude */}
            <button
              onClick={() => handleOpenAi('claude')}
              className="flex items-center justify-center space-x-2 p-3.5 rounded-2xl bg-[#C2410C] hover:bg-[#9a3412] text-white font-extrabold text-xs shadow-lg shadow-[#C2410C]/25 transition-all hover:scale-102 active:scale-95 cursor-pointer border border-amber-500/30"
            >
              <span>Ask Claude</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Gemini */}
            <button
              onClick={() => handleOpenAi('gemini')}
              className="flex items-center justify-center space-x-2 p-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 transition-all hover:scale-102 active:scale-95 cursor-pointer border border-indigo-400/30"
            >
              <span>Ask Gemini</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

          </div>
        </div>

        {/* Footer Note */}
        <p className="text-[11px] text-white/50 text-center">
          Clicking any button automatically copies your personalized telemetry prompt to clipboard and opens the platform in a new tab.
        </p>

      </div>
    </div>
  );
}
