import React, { useState } from 'react';
import { X, Bot, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';

export function MultiAiModal({ isOpen, onClose, telemetry, vulnerabilities = [] }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const { city, aqi, pm2_5, cigaretteEquivDaily } = telemetry;
  const vulnText = vulnerabilities.length > 0 ? vulnerabilities.join(', ') : 'general urban family';

  // Crafted professional prompt with scientific grounding
  const generatedPrompt = `Act as an expert atmospheric chemist and clinical respiratory health specialist.
I live in ${city}, where current outdoor air quality is hazardous at AQI ${aqi} (PM2.5: ${pm2_5} μg/m³, which according to Berkeley Earth is the toxic equivalent of smoking ${cigaretteEquivDaily} cigarettes per day).
My household profile includes: ${vulnText}.

Please provide:
1. Step-by-step engineering instructions to build a ₹1,200 DIY Box-Fan HEPA Air Purifier (including exact fan specs, MERV 13 filter placement, and how to prevent air bypass).
2. The exact scientific mechanism of the 1:00 PM – 3:00 PM solar thermal lift window and why dry broom sweeping causes a 340% dust resuspension spike.
3. A personalized, low-cost daily clean-room protocol and dietary/respiratory defense hacks for our family.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleOpenAi = (platform) => {
    handleCopy();
    const encoded = encodeURIComponent(generatedPrompt);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl glass-card-dark p-6 sm:p-8 border border-white/20 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#CBD77E] flex items-center justify-center text-[#282828]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              One-Click Multi-AI Consultation Engine
            </h2>
            <p className="text-xs text-white/70">
              Personalized prompt auto-generated from your live atmospheric telemetry.
            </p>
          </div>
        </div>

        {/* Prompt Preview Card */}
        <div className="relative rounded-2xl bg-black/30 border border-white/10 p-4 mb-5">
          <div className="flex items-center justify-between text-xs text-[#CBD77E] font-bold mb-2">
            <span>PRE-FILLED CONTEXT-AWARE PROMPT</span>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 text-white hover:text-[#CBD77E] transition-colors"
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
          <pre className="text-xs text-white/80 whitespace-pre-wrap font-sans max-h-48 overflow-y-auto pr-2 leading-relaxed">
            {generatedPrompt}
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
              className="flex items-center justify-center space-x-2 p-3.5 rounded-2xl bg-[#10A37F] hover:bg-[#0e8e6e] text-white font-bold text-xs shadow-md transition-all hover:scale-102"
            >
              <span>Ask ChatGPT</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Claude */}
            <button
              onClick={() => handleOpenAi('claude')}
              className="flex items-center justify-center space-x-2 p-3.5 rounded-2xl bg-[#D97706] hover:bg-[#b45309] text-white font-bold text-xs shadow-md transition-all hover:scale-102"
            >
              <span>Ask Claude</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Gemini */}
            <button
              onClick={() => handleOpenAi('gemini')}
              className="flex items-center justify-center space-x-2 p-3.5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all hover:scale-102"
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
