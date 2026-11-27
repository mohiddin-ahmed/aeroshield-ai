import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { ONBOARDING_SLIDES } from '../data/onboardingSlides';
import { useModalAccessibility } from '../hooks/useModalAccessibility';

export interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Interactive 4-slide walkthrough modal introducing evaluators and first-time users
 * to AeroShield AI's atmospheric science, Desi Jugaad calculator, and GenAI prompt tools.
 */
export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleComplete = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('aeroshield_onboarded', 'true');
      } catch {
        // Ignore storage error when private browsing blocks writes
      }
    }
    onClose();
  };

  useModalAccessibility(isOpen, handleComplete);

  if (!isOpen) return null;

  const slide = ONBOARDING_SLIDES[currentSlide];
  const Icon = slide.icon;

  const handleNext = () => {
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlide((curr) => curr + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((curr) => curr - 1);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-modal-title"
    >
      <div className="relative w-full max-w-2xl rounded-3xl glass-card-dark p-6 sm:p-8 border border-white/20 shadow-2xl overflow-hidden flex flex-col justify-between min-h-[520px]">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <span
              className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${slide.badgeClass}`}
            >
              {slide.badge}
            </span>
            <span className="text-xs text-white/50 font-mono">
              Step {currentSlide + 1} of {ONBOARDING_SLIDES.length}
            </span>
          </div>

          <button
            type="button"
            onClick={handleComplete}
            aria-label="Skip onboarding tour"
            className="text-xs text-white/60 hover:text-white transition-colors cursor-pointer font-bold px-2 py-1 rounded-lg hover:bg-white/10"
          >
            Skip Tour ✕
          </button>
        </div>

        <div key={slide.id} className="py-6 space-y-5 animate-fade-in">
          <div className="flex items-start space-x-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${slide.iconBgClass}`}
              aria-hidden="true"
            >
              <Icon className="w-6 h-6 stroke-[2.4]" />
            </div>
            <div>
              <h2
                id="onboarding-modal-title"
                className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug"
              >
                {slide.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                {slide.subtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {slide.highlights.map((highlight) => (
              <div
                key={highlight.label}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all space-y-1"
              >
                <div className="flex items-center space-x-1.5">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${slide.dotClass.replace('w-7 ', '')}`}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-bold text-white block truncate">
                    {highlight.label}
                  </span>
                </div>
                <p className="text-[11px] text-white/60 leading-relaxed">{highlight.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center space-x-1.5" role="group" aria-label="Tour slides">
            {ONBOARDING_SLIDES.map((slideItem, slideIdx) => (
              <button
                key={slideItem.id}
                type="button"
                onClick={() => setCurrentSlide(slideIdx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === slideIdx
                    ? slideItem.dotClass
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                title={`Jump to step ${slideIdx + 1}`}
                aria-label={`Jump to step ${slideIdx + 1}: ${slideItem.badge}`}
                aria-current={currentSlide === slideIdx ? 'step' : undefined}
              />
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {currentSlide > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center space-x-1 px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all cursor-pointer active:scale-95 border border-white/10"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Back</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="flex items-center space-x-1.5 px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-extrabold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer active:scale-95"
            >
              <span>
                {currentSlide === ONBOARDING_SLIDES.length - 1
                  ? 'Launch VayuMitra OS'
                  : 'Next Step'}
              </span>
              {currentSlide === ONBOARDING_SLIDES.length - 1 ? (
                <Check className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              ) : (
                <ArrowRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
