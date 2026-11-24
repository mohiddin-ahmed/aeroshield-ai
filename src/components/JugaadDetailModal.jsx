import React from 'react';
import { X, Wrench, CheckCircle2, ShieldAlert, Sparkles, Bot, DollarSign, ExternalLink } from 'lucide-react';

export function JugaadDetailModal({ item, isOpen, onClose, onOpenMultiAi }) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl glass-card-dark p-6 sm:p-8 border border-white/20 shadow-2xl">
        
        {/* Header with Clean Separated Close Button */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-start space-x-3 min-w-0 pr-2">
            <div className="w-12 h-12 rounded-2xl bg-[#10B981] flex items-center justify-center text-[#18181B] shrink-0 font-bold mt-0.5">
              <Wrench className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-[#34D399] bg-[#10B981]/20 px-2.5 py-0.5 rounded-full border border-[#10B981]/30">
                  {item.badge || item.category}
                </span>
                <span className="text-xs text-white/50">{item.hindiTitle}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 leading-snug">
                {item.title}
              </h2>
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

        {/* Cost & Savings Banner */}
        <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
          <div>
            <span className="text-[11px] text-white/60 block font-semibold">DIY Household Cost</span>
            <span className="text-xl font-bold font-mono text-[#34D399]">{item.cost}</span>
          </div>
          <div>
            <span className="text-[11px] text-white/60 block font-semibold">Commercial Branded Equivalent</span>
            <span className="text-base sm:text-lg font-bold font-mono text-white/80 line-through opacity-70">
              {item.commercialEquiv || '₹20,000+'}
            </span>
          </div>
        </div>

        {/* Materials Needed */}
        {item.materialsNeeded && (
          <div className="mb-6 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#34D399]">
              1. Materials Required (Affordable & Locally Sourced)
            </h3>
            <ul className="space-y-1.5 text-xs text-white/80 bg-black/30 p-4 rounded-2xl border border-white/5">
              {item.materialsNeeded.map((mat, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-[#34D399] font-bold">•</span>
                  <span>{mat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Detailed Step-by-Step Assembly */}
        {item.detailedSteps && (
          <div className="mb-6 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#34D399]">
              2. Step-by-Step Construction & Usage Guide
            </h3>
            <div className="space-y-2.5 text-xs text-white/85">
              {item.detailedSteps.map((step, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/20 text-[#34D399] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scientific Mechanism */}
        {item.scientificMechanism && (
          <div className="mb-6 p-4 rounded-2xl bg-black/40 border border-[#10B981]/30 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-[#34D399] text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>THE SCIENTIFIC MECHANISM (WHY IT WORKS)</span>
            </div>
            <p className="text-xs text-white/80 leading-relaxed font-sans">
              {item.scientificMechanism}
            </p>
          </div>
        )}

        {/* Safety Tips */}
        {item.safetyTips && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-amber-300">
              <ShieldAlert className="w-4 h-4" />
              <span>Safety & Precaution Notice</span>
            </div>
            <p className="leading-relaxed">{item.safetyTips}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10">
          <button
            onClick={() => { onClose(); onOpenMultiAi(); }}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-[#18181B] text-xs font-bold shadow-md transition-all"
          >
            <Bot className="w-4 h-4" />
            <span>Ask AI to Guide Me Step-by-Step</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
}
