import React, { useState, useRef } from 'react';
import { X, Sparkles, Film, CheckCircle2, Play, Pause, Download, Volume2, ExternalLink } from 'lucide-react';

const audioClips = [
  {
    id: 'full',
    title: 'Full Continuous Narration (Scenes 1–4)',
    duration: '1:45',
    src: '/demo_audios/full_demo_narration.mp3',
    desc: 'Complete pitch from hook to closing. Play while recording your full screen walkthrough.'
  },
  {
    id: 'scene1',
    title: 'Scene 1: The Hook & Severe Smog Crisis',
    duration: '0:22',
    src: '/demo_audios/scene1_intro_hook.mp3',
    desc: 'Show Home Page and AQI rotary dial.'
  },
  {
    id: 'scene2',
    title: 'Scene 2: Copernicus Telemetry & Solar Window',
    duration: '0:28',
    src: '/demo_audios/scene2_telemetry_solar_window.mp3',
    desc: 'Switch city to Delhi NCR and point to Solar Convective Lift banner.'
  },
  {
    id: 'scene3',
    title: 'Scene 3: ₹1,200 Desi Jugaad Lab & Multi-AI',
    duration: '0:27',
    src: '/demo_audios/scene3_desi_jugaad_multi_ai.mp3',
    desc: 'Open Desi Jugaad tab, toggle Box-Fan CADR, click Multi-AI launcher.'
  },
  {
    id: 'scene4',
    title: 'Scene 4: Judges DevTools & Conclusion',
    duration: '0:24',
    src: '/demo_audios/scene4_judges_devtools_conclusion.mp3',
    desc: 'Launch Judges DevTools modal, show Gemini tokens & latency.'
  }
];

export function DemoVideoModal({ isOpen, onClose }) {
  const [playingId, setPlayingId] = useState(null);
  const audioRefs = useRef({});

  if (!isOpen) return null;

  const togglePlay = (id, src) => {
    if (playingId === id) {
      if (audioRefs.current[id]) {
        audioRefs.current[id].pause();
      }
      setPlayingId(null);
    } else {
      // Pause currently playing
      if (playingId && audioRefs.current[playingId]) {
        audioRefs.current[playingId].pause();
      }
      if (!audioRefs.current[id]) {
        audioRefs.current[id] = new Audio(src);
        audioRefs.current[id].onended = () => setPlayingId(null);
      }
      audioRefs.current[id].play();
      setPlayingId(id);
    }
  };

  const handleClose = () => {
    if (playingId && audioRefs.current[playingId]) {
      audioRefs.current[playingId].pause();
    }
    setPlayingId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl glass-card-dark p-6 sm:p-7 border border-white/20 shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3 mb-4 shrink-0">
          <div className="flex items-start sm:items-center space-x-3 min-w-0 pr-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-zinc-950 shrink-0 mt-0.5 sm:mt-0 font-bold">
              <Film className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">Demo Video Studio & Audio Clips</h2>
                <span className="text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full whitespace-nowrap">
                  Ready to Screen Record
                </span>
              </div>
              <p className="text-xs text-white/70 mt-0.5">High-impact 1080p voice-overs calibrated for Hack2skill & Google for Developers evaluators</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white shrink-0 transition-all border border-white/10 cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          
          {/* Quick Instruction Banner */}
          <div className="rounded-2xl bg-emerald-950/40 border border-emerald-500/30 p-3.5 flex items-start space-x-3">
            <Volume2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-emerald-300">How to use these audio clips:</span>
              <p className="text-white/80 mt-0.5 leading-relaxed">
                Click <strong>Play</strong> on any clip below while using Windows Game Bar (<code>Win + Alt + R</code>) or Loom to record your screen action, or download the files directly.
              </p>
            </div>
          </div>

          {/* Audio Clips List */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Generated Studio Audio Narration (No Music • Clean Volume)
            </h3>

            {audioClips.map((clip) => {
              const isPlaying = playingId === clip.id;

              return (
                <div
                  key={clip.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    clip.id === 'full'
                      ? 'bg-gradient-to-r from-emerald-950/50 via-zinc-900/90 to-zinc-900/90 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/20'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-white truncate">{clip.title}</span>
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded-md">
                          {clip.duration}
                        </span>
                      </div>
                      <p className="text-[11px] text-white/60 mt-0.5 truncate">{clip.desc}</p>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => togglePlay(clip.id, clip.src)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer active:scale-95 ${
                          isPlaying
                            ? 'bg-amber-400 text-zinc-950 shadow-md ring-2 ring-amber-400/50'
                            : clip.id === 'full'
                            ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'
                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                        }`}
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-current" />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Play</span>
                          </>
                        )}
                      </button>

                      <a
                        href={clip.src}
                        download
                        className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/10"
                        title="Download MP3"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Video Scene Timeline Checklist */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/70">
              Screen Recording Steps
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-white/70">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="font-bold text-emerald-400 block mb-0.5">Scene 1 [0:00 - 0:25]</span>
                Show Home Page & rotary dial.
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="font-bold text-emerald-400 block mb-0.5">Scene 2 [0:25 - 0:55]</span>
                Switch City to Delhi & show Solar Window.
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="font-bold text-emerald-400 block mb-0.5">Scene 3 [0:55 - 1:25]</span>
                Desi Jugaad Lab & Multi-AI Launcher.
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="font-bold text-emerald-400 block mb-0.5">Scene 4 [1:25 - 1:55]</span>
                Judges DevTools & 7 Language switch.
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10 shrink-0">
          <span className="text-xs text-white/50 text-center sm:text-left">
            Upload to YouTube as <strong>Unlisted</strong> or Google Drive with public view access.
          </span>
          <button
            onClick={handleClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-emerald-500 text-zinc-950 text-xs font-bold hover:bg-emerald-400 transition-colors cursor-pointer"
          >
            Close Studio
          </button>
        </div>

      </div>
    </div>
  );
}
