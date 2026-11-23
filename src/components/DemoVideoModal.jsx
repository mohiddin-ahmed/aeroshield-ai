import React from 'react';
import { X, Sparkles, Film, CheckCircle2, UserCheck, Layers, ExternalLink } from 'lucide-react';

export function DemoVideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl glass-card-dark p-6 sm:p-8 border border-white/20 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#CBD77E] flex items-center justify-center text-[#282828]">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-white tracking-tight">Project Demo Video Submission</h2>
              <span className="text-[11px] font-bold bg-[#CBD77E] text-[#282828] px-2 py-0.5 rounded-full">
                Option A: Prismatic Glass
              </span>
            </div>
            <p className="text-xs text-white/70">AeroShield AI • 3D VayuBot Avatar Presenter • 1080p Full HD</p>
          </div>
        </div>

        {/* Production Status Banner */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-[#CBD77E] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-white">🎬 Production Status: In Final Rendering</p>
              <p className="text-xs text-white/70 mt-1 leading-relaxed">
                As per challenge requirements, the video presentation adheres to <strong>Option A (Apple Keynote Prismatic Glass)</strong> featuring the 3D stylized AI presenter <em>VayuBot</em> with synthetic voiceover explaining real-time telemetry, the 1–3 PM solar lift window, and Desi Jugaad engineering.
              </p>
            </div>
          </div>
        </div>

        {/* Breakdown of Video Artifacts Generated */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#CBD77E]">Production Artifacts Ready</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center space-x-2 text-xs font-semibold text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>3D AI Presenter "VayuBot"</span>
              </div>
              <p className="text-[11px] text-white/60 mt-1">Generated speaking pose avatar with clean lighting and corporate attire.</p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center space-x-2 text-xs font-semibold text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Option A Video Keyframes</span>
              </div>
              <p className="text-[11px] text-white/60 mt-1">Prismatic glass hero, macro Desi Jugaad lab, and clean air ecosystem.</p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center space-x-2 text-xs font-semibold text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>10-Second Sample MP4 Rendered</span>
              </div>
              <p className="text-[11px] text-white/60 mt-1">Full HD 1080p preview rendered with synced narration at <code>aeroshield_sample_clip_10s.mp4</code>.</p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center space-x-2 text-xs font-semibold text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Demo Video Script</span>
              </div>
              <p className="text-[11px] text-white/60 mt-1">Complete 2-minute pitch script ready in <code>docs/DEMO_VIDEO_SCRIPT.md</code>.</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10">
          <span className="text-xs text-white/50 text-center sm:text-left">
            Public Video Link will be submitted via YouTube/Google Drive per rules.
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#CBD77E] text-[#282828] text-xs font-bold hover:bg-[#d6e289] transition-colors"
          >
            Close Preview
          </button>
        </div>

      </div>
    </div>
  );
}
