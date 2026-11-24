import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Download, 
  Sparkles, 
  Sun, 
  Moon, 
  Palette, 
  Shield, 
  Wind, 
  Layers, 
  Zap, 
  Eye,
  Sliders
} from 'lucide-react';
import { AeroShieldLogo } from './AeroShieldLogo';

export function LogoShowcaseModal({ 
  isOpen, 
  onClose, 
  activeLogoVariant, 
  onSelectLogoVariant, 
  isDarkMode 
}) {
  const [previewTheme, setPreviewTheme] = useState(isDarkMode ? 'dark' : 'light');
  const [previewSize, setPreviewSize] = useState(80);

  if (!isOpen) return null;

  const concepts = [
    {
      id: 'shield-wind',
      name: 'Concept 1: The Aerodynamic Shield',
      tagline: 'Laminar Airflow & Protective Perimeter',
      description: 'A crisp geometric shield containing dynamic three-tier laminar air currents (mint, emerald, and forest). Represents complete household defense against hazardous PM2.5 particles.',
      bestFor: 'Mobile App Icon, Navbar, Protective Branding',
      svgMarkup: `<svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="26" fill="#18181B" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
  <path d="M50 20C64 24 74 22 74 22V48C74 65 62 76 50 82C38 76 26 65 26 48V22C26 22 36 24 50 20Z" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" stroke-width="4" stroke-linejoin="round"/>
  <path d="M36 42C42 42 45 38 52 38C58 38 62 41 66 41" stroke="#34D399" stroke-width="4" stroke-linecap="round"/>
  <path d="M32 50C40 50 44 46 52 46C60 46 63 50 68 50" stroke="#10B981" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M38 58C44 58 47 54 52 54C57 54 60 57 64 57" stroke="#059669" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="68" cy="32" r="2.5" fill="#34D399"/>
</svg>`
    },
    {
      id: 'vortex-leaf',
      name: 'Concept 2: The Clean Air Vayu Spiral',
      tagline: 'Convective Lift & Botanical Air Renewal',
      description: 'Continuous circular vortex ribbon that loops seamlessly into a botanical leaf contour. Symbolizes the natural 1–3 PM solar convective lift breaking the thermal inversion.',
      bestFor: 'SaaS Platform, Sustainability Tech, Community Favicon',
      svgMarkup: `<svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="46" fill="#18181B" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M50 16C31.22 16 16 31.22 16 50C16 68.78 31.22 84 50 84C68.78 84 84 68.78 84 50C84 31.22 68.78 16 50 16ZM50 76C35.64 76 24 64.36 24 50C24 35.64 35.64 24 50 24C60.2 24 69.04 29.86 73.32 38.38C69.58 35.62 64.96 34 60 34C48.95 34 40 42.95 40 54C40 65.05 48.95 74 60 74C64.96 74 69.58 72.38 73.32 69.62C69.04 78.14 60.2 84 50 84Z" fill="#10B981" opacity="0.2"/>
  <path d="M32 50C32 40.06 40.06 32 50 32C59.94 32 68 40.06 68 50C68 59.94 59.94 68 50 68" stroke="#10B981" stroke-width="6" stroke-linecap="round"/>
  <path d="M50 20C66.57 20 80 33.43 80 50C80 66.57 66.57 80 50 80" stroke="#34D399" stroke-width="4" stroke-linecap="round" stroke-dasharray="4 8"/>
  <circle cx="50" cy="50" r="6" fill="#FFFFFF"/>
</svg>`
    },
    {
      id: 'inversion-rings',
      name: 'Concept 3: Atmospheric Inversion Horizon',
      tagline: 'Concentric Defense & Pure Oxygen Core',
      description: 'Concentric atmospheric barrier rings protecting an inner calm oxygen droplet from outer toxic particulate layers. Grounded in atmospheric physics and clinical harm reduction.',
      bestFor: 'Scientific Reports, Clinical Dashboards, Wearables',
      svgMarkup: `<svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="28" fill="#18181B"/>
  <circle cx="50" cy="50" r="38" stroke="rgba(255,255,255,0.15)" stroke-width="3" stroke-dasharray="3 6"/>
  <path d="M20 50A30 30 0 0 1 80 50" stroke="#10B981" stroke-width="6" stroke-linecap="round"/>
  <path d="M50 28C50 28 36 44 36 54C36 61.73 42.27 68 50 68C57.73 68 64 61.73 64 54C64 44 50 28 50 28Z" fill="#34D399" opacity="0.9"/>
  <circle cx="50" cy="54" r="5" fill="#18181B"/>
</svg>`
    },
    {
      id: 'monogram-a',
      name: 'Concept 4: High-Tech Monogram "A" Shield',
      tagline: 'Silicon Valley Identity & Apex Protection',
      description: 'An architectural capital letter "A" constructed from dual aerodynamic ribbon folds forming an impenetrable clean air shield at its apex. Bold, modern, and highly memorable.',
      bestFor: 'Corporate Identity, Investor Pitch, Merchandise',
      svgMarkup: `<svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="28" fill="#18181B" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
  <path d="M50 18L22 76H36L44 58H56L64 76H78L50 18Z" fill="#FFFFFF"/>
  <path d="M50 18L32 64C38 61 44 60 50 60C56 60 62 61 68 64L50 18Z" fill="#10B981"/>
  <circle cx="50" cy="46" r="4.5" fill="#34D399"/>
</svg>`
    }
  ];

  const handleDownloadSvg = (concept) => {
    const blob = new Blob([concept.svgMarkup], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aeroshield-logo-${concept.id}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl glass-card-dark p-6 sm:p-8 border border-white/20 shadow-2xl space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold">
              <Palette className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                AeroShield AI — Brand Logo Suite
              </h2>
              <p className="text-xs text-white/60">
                Explore 4 professional vector logo concepts tailored for urban air defense, clean air physics, and VayuMitra OS.
              </p>
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

        {/* Global Controls: Theme Preview & Size Preview */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-white/70 font-semibold">Preview Canvas Theme:</span>
            <button
              onClick={() => setPreviewTheme(previewTheme === 'dark' ? 'light' : 'dark')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all cursor-pointer border border-white/10"
            >
              {previewTheme === 'dark' ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
              <span className="capitalize">{previewTheme} Canvas</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-white/70 font-semibold">Scale:</span>
            {[48, 64, 80].map((sz) => (
              <button
                key={sz}
                onClick={() => setPreviewSize(sz)}
                className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  previewSize === sz 
                    ? 'bg-emerald-500 text-zinc-950' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {sz}px
              </button>
            ))}
          </div>
        </div>

        {/* 2x2 Grid of Logo Concepts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {concepts.map((concept) => {
            const isSelected = activeLogoVariant === concept.id;

            return (
              <div 
                key={concept.id}
                className={`p-5 rounded-3xl transition-all border flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-emerald-500/10 border-emerald-500/60 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/40' 
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  
                  {/* Top Status & Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/25">
                      {concept.id}
                    </span>
                    {isSelected && (
                      <span className="flex items-center space-x-1 text-xs font-extrabold text-emerald-400">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Active in App</span>
                      </span>
                    )}
                  </div>

                  {/* Logo Display Canvas (High Contrast Dark/Light Preview) */}
                  <div 
                    className={`w-full py-6 rounded-2xl flex items-center justify-center transition-colors border mb-4 ${
                      previewTheme === 'dark' 
                        ? 'bg-[#0f0f11] border-white/10' 
                        : 'bg-[#F9FAFB] border-black/10'
                    }`}
                  >
                    <AeroShieldLogo 
                      variant={concept.id} 
                      size={previewSize} 
                      isDarkMode={previewTheme === 'dark'}
                      withWordmark={true}
                    />
                  </div>

                  {/* Concept Details */}
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {concept.name}
                  </h3>
                  <span className="text-xs font-semibold text-emerald-400 block mt-0.5">
                    {concept.tagline}
                  </span>
                  <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
                    {concept.description}
                  </p>

                  <div className="mt-3 p-2.5 rounded-xl bg-black/30 border border-white/5 text-[11px] text-white/60">
                    <strong className="text-white/80">Best suited for:</strong> {concept.bestFor}
                  </div>

                </div>

                {/* Card Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-5 pt-3 border-t border-white/10">
                  <button
                    onClick={() => onSelectLogoVariant(concept.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95 ${
                      isSelected
                        ? 'bg-emerald-500 text-zinc-950 shadow-md font-extrabold'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isSelected ? 'Selected' : 'Use in App'}</span>
                  </button>

                  <button
                    onClick={() => handleDownloadSvg(concept)}
                    className="py-2 px-3 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95 border border-white/10"
                    title="Export Scalable Vector SVG File"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Download SVG</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>All vector logos are mathematically scalable SVGs with zero loss of quality.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors cursor-pointer shrink-0"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
