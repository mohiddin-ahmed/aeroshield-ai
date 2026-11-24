import React from 'react';

/**
 * AeroShield AI (VayuMitra OS) — Professional SVG Logo System
 * Provides 4 distinct, scalable, mathematically precise vector logo marks:
 * - 'shield-wind' (Concept 1: Aerodynamic Shield with Laminar Airflow Curves)
 * - 'vortex-leaf' (Concept 2: Continuous Vayu Clean-Air Loop & Renewal)
 * - 'inversion-rings' (Concept 3: Concentric Atmospheric Barrier & Core Defense)
 * - 'monogram-a' (Concept 4: High-Tech Geometric Monogram 'A' Shield)
 */
export function AeroShieldLogo({ 
  variant = 'shield-wind', 
  size = 40, 
  className = '', 
  withWordmark = false,
  isDarkMode = true 
}) {
  const primaryEmerald = '#10B981';
  const mintTeal = '#34D399';
  const deepEmerald = '#059669';

  const renderIcon = () => {
    switch (variant) {
      case 'vortex-leaf':
        return (
          <svg 
            width={size} 
            height={size} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={className}
          >
            <circle cx="50" cy="50" r="46" fill={isDarkMode ? '#18181B' : '#F4F4F5'} stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'} strokeWidth="1.5"/>
            <path 
              d="M50 16C31.22 16 16 31.22 16 50C16 68.78 31.22 84 50 84C68.78 84 84 68.78 84 50C84 31.22 68.78 16 50 16ZM50 76C35.64 76 24 64.36 24 50C24 35.64 35.64 24 50 24C60.2 24 69.04 29.86 73.32 38.38C69.58 35.62 64.96 34 60 34C48.95 34 40 42.95 40 54C40 65.05 48.95 74 60 74C64.96 74 69.58 72.38 73.32 69.62C69.04 78.14 60.2 84 50 84Z" 
              fill={primaryEmerald}
              opacity="0.2"
            />
            {/* Aerodynamic Vayu Circulation Spiral */}
            <path 
              d="M32 50C32 40.06 40.06 32 50 32C59.94 32 68 40.06 68 50C68 59.94 59.94 68 50 68" 
              stroke={primaryEmerald} 
              strokeWidth="6" 
              strokeLinecap="round"
            />
            <path 
              d="M50 20C66.57 20 80 33.43 80 50C80 66.57 66.57 80 50 80" 
              stroke={mintTeal} 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeDasharray="4 8"
            />
            <circle cx="50" cy="50" r="6" fill={isDarkMode ? '#FFFFFF' : '#18181B'} />
          </svg>
        );

      case 'inversion-rings':
        return (
          <svg 
            width={size} 
            height={size} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={className}
          >
            <rect width="100" height="100" rx="28" fill={isDarkMode ? '#18181B' : '#F4F4F5'} />
            {/* Outer particulate boundary shield */}
            <circle cx="50" cy="50" r="38" stroke={isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'} strokeWidth="3" strokeDasharray="3 6"/>
            {/* Thermal Inversion Lift Arc */}
            <path 
              d="M20 50A30 30 0 0 1 80 50" 
              stroke={primaryEmerald} 
              strokeWidth="6" 
              strokeLinecap="round"
            />
            {/* Clean Oxygen Core Drop */}
            <path 
              d="M50 28C50 28 36 44 36 54C36 61.73 42.27 68 50 68C57.73 68 64 61.73 64 54C64 44 50 28 50 28Z" 
              fill={mintTeal} 
              opacity="0.9"
            />
            <circle cx="50" cy="54" r="5" fill={isDarkMode ? '#18181B' : '#FFFFFF'} />
          </svg>
        );

      case 'monogram-a':
        return (
          <svg 
            width={size} 
            height={size} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={className}
          >
            <rect width="100" height="100" rx="28" fill={isDarkMode ? '#18181B' : '#FFFFFF'} stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'} strokeWidth="2"/>
            {/* Geometric Lettermark A + Protective Apex */}
            <path 
              d="M50 18L22 76H36L44 58H56L64 76H78L50 18Z" 
              fill={isDarkMode ? '#FFFFFF' : '#18181B'}
            />
            {/* Intersecting Clean Air Vector Shield Beam */}
            <path 
              d="M50 18L32 64C38 61 44 60 50 60C56 60 62 61 68 64L50 18Z" 
              fill={primaryEmerald}
            />
            <circle cx="50" cy="46" r="4.5" fill={mintTeal} />
          </svg>
        );

      case 'shield-wind':
      default:
        return (
          <svg 
            width={size} 
            height={size} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={className}
          >
            {/* Background Rounded Shield Tile */}
            <rect width="100" height="100" rx="26" fill={isDarkMode ? '#18181B' : '#FFFFFF'} stroke={isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'} strokeWidth="2"/>
            
            {/* Protective Shield Silhouette */}
            <path 
              d="M50 20C64 24 74 22 74 22V48C74 65 62 76 50 82C38 76 26 65 26 48V22C26 22 36 24 50 20Z" 
              fill={isDarkMode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)'}
              stroke={primaryEmerald} 
              strokeWidth="4" 
              strokeLinejoin="round"
            />
            
            {/* Dynamic Laminar Clean Airflow Ribbons */}
            <path 
              d="M36 42C42 42 45 38 52 38C58 38 62 41 66 41" 
              stroke={mintTeal} 
              strokeWidth="4" 
              strokeLinecap="round"
            />
            <path 
              d="M32 50C40 50 44 46 52 46C60 46 63 50 68 50" 
              stroke={primaryEmerald} 
              strokeWidth="4.5" 
              strokeLinecap="round"
            />
            <path 
              d="M38 58C44 58 47 54 52 54C57 54 60 57 64 57" 
              stroke={deepEmerald} 
              strokeWidth="3.5" 
              strokeLinecap="round"
            />
            
            {/* Sparkle Clean Air Accent */}
            <circle cx="68" cy="32" r="2.5" fill={mintTeal} />
          </svg>
        );
    }
  };

  if (!withWordmark) {
    return renderIcon();
  }

  return (
    <div className="flex items-center space-x-3">
      {renderIcon()}
      <div className="flex flex-col justify-center">
        <span className="font-extrabold text-base sm:text-lg tracking-tight leading-none text-zinc-950 dark:text-white">
          AeroShield AI
        </span>
        <div className="flex items-center space-x-1.5 mt-1">
          <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 dark:bg-emerald-500/25 px-1.5 py-0.5 rounded-md inline-block leading-none">
            VayuMitra OS
          </span>
        </div>
      </div>
    </div>
  );
}
