import { CheckCircle2, ExternalLink, Film, Share2, Sparkles, X } from 'lucide-react';
import {
  DEMO_VIDEO_EMBED_URL,
  DEMO_VIDEO_VIEW_URL,
  LINKEDIN_POST_URL,
  VIDEO_CHAPTERS
} from '../data/demoChapters';
import { useModalAccessibility } from '../hooks/useModalAccessibility';

export interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Interactive Demo Video modal embedding the official 01:45 HD walkthrough
 * with WCAG dialog semantics and Escape-key dismissal.
 */
export function DemoVideoModal({ isOpen, onClose }: DemoVideoModalProps) {
  useModalAccessibility(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-video-modal-title"
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl glass-card-dark p-5 sm:p-7 border border-white/20 shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between gap-3 mb-4 shrink-0">
          <div className="flex items-start sm:items-center space-x-3 min-w-0 pr-2">
            <div
              className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-zinc-950 shrink-0 mt-0.5 sm:mt-0 font-bold"
              aria-hidden="true"
            >
              <Film className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2
                  id="demo-video-modal-title"
                  className="text-lg sm:text-xl font-bold text-white tracking-tight"
                >
                  Official Hackathon Demo Walkthrough
                </h2>
                <span className="text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                  01:45 • HD Walkthrough
                </span>
              </div>
              <p className="text-xs text-white/70 mt-0.5">
                AeroShield AI (VayuMitra OS) • PromptWars Challenge 6: Urban Air Quality Assistant
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white shrink-0 transition-all border border-white/10 cursor-pointer"
            title="Close"
            aria-label="Close demo video modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-zinc-950 border border-white/15 shadow-xl">
            <iframe
              src={DEMO_VIDEO_EMBED_URL}
              title="AeroShield AI Official Demo Video"
              className="w-full h-full border-0"
              allow="autoplay; fullscreen"
              allowFullScreen
              loading="lazy"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center space-x-2 text-xs text-white/80">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
              <span>If preview buffers inside iframe, open the full HD stream directly:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={DEMO_VIDEO_VIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-extrabold transition-colors"
              >
                <span>Watch on Google Drive</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
              <a
                href={LINKEDIN_POST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
                <span>LinkedIn Launch Post</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {VIDEO_CHAPTERS.map((chapter) => (
              <div
                key={chapter.time}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle2
                    className="w-3.5 h-3.5 text-emerald-400 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-[11px] font-mono font-bold text-emerald-300">
                    {chapter.time}
                  </span>
                </div>
                <p className="text-xs font-bold text-white">{chapter.title}</p>
                <p className="text-[11px] text-white/65 leading-relaxed">{chapter.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 mt-2 border-t border-white/10 shrink-0">
          <span className="text-xs text-white/55 text-center sm:text-left">
            Public submission media verified for Hack2skill &amp; Google for Developers evaluation.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-full bg-white text-zinc-950 text-xs font-bold hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
