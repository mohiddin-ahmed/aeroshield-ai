/**
 * @module data/onboardingSlides
 * Slide definitions for the 4-step interactive walkthrough modal.
 * Uses pure CSS utility classes (zero inline styles) to satisfy strict CSP.
 */

import type { LucideIcon } from 'lucide-react';
import { Bot, Shield, SunMedium, Wrench } from 'lucide-react';

export interface OnboardingHighlight {
  label: string;
  desc: string;
}

export interface OnboardingSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  badgeClass: string;
  iconBgClass: string;
  dotClass: string;
  highlights: OnboardingHighlight[];
}

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: 'welcome',
    badge: 'Welcome to VayuMitra OS',
    title: 'Turn Winter Smog Worry Into Daily Clean-Air Action',
    subtitle:
      'Over 300 million citizens across northern cities breathe air equal to smoking 25–30 cigarettes a day. AeroShield AI gives your home simple, science-backed daily protection.',
    icon: Shield,
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/35',
    iconBgClass: 'bg-emerald-500 text-zinc-950',
    dotClass: 'w-7 bg-emerald-400',
    highlights: [
      {
        label: 'Live Local Air',
        desc: 'Auto-detects your city, time of day & live Copernicus CAMS sensors.'
      },
      {
        label: 'Cigarette Check',
        desc: 'Shows ambient PM2.5 (μg/m³) in clear everyday cigarette equivalents.'
      },
      {
        label: 'Daily Savings Streak',
        desc: 'Tick daily actions with zero sign-up to track blocked dust & cigarettes.'
      }
    ]
  },
  {
    id: 'solar',
    badge: 'Afternoon Window',
    title: 'Best Time to Open Windows: 1:00 PM – 3:00 PM',
    subtitle:
      'Never open windows blindly during cold smog! Morning and night air traps pollution near the ground—until afternoon sunlight warms and lifts it.',
    icon: SunMedium,
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/35',
    iconBgClass: 'bg-amber-500 text-zinc-950',
    dotClass: 'w-7 bg-amber-400',
    highlights: [
      {
        label: 'Morning & Night Seal',
        desc: 'Keep bedroom windows shut tight when street-level pollution peaks.'
      },
      {
        label: '1–3 PM Safe Breeze',
        desc: 'Open opposite windows for 15 minutes during afternoon sun lift.'
      },
      {
        label: '24-Hour Routine Tab',
        desc: 'Clearly highlights the exact active slot for right now.'
      }
    ]
  },
  {
    id: 'jugaad',
    badge: 'Budget Clean Air',
    title: '₹1,250 DIY Clean-Air Hacks & CADR Physics',
    subtitle:
      'Commercial purifiers cost ₹24,000+. Our fluid dynamics calculator proves a ₹1,250 DIY Box-Fan + MERV 13 filter cleans rooms at 19.2x lower cost.',
    icon: Wrench,
    badgeClass: 'bg-emerald-400/20 text-emerald-200 border-emerald-400/35',
    iconBgClass: 'bg-emerald-400 text-zinc-950',
    dotClass: 'w-7 bg-emerald-300',
    highlights: [
      {
        label: 'Interactive Room Slider',
        desc: 'Calculate CFM, air changes/hour, and clean time for 80–600 sq ft rooms.'
      },
      {
        label: 'Zero-Cost Home Steps',
        desc: 'Rock-salt wet mopping, damp curtain soot trap & snug N95 mask guide.'
      },
      {
        label: 'Step-by-Step Guides',
        desc: 'Tap any hack card for simple materials checklist & build instructions.'
      }
    ]
  },
  {
    id: 'ai-tools',
    badge: 'Smart AI & DevTools',
    title: 'One-Click Multi-AI Engine & Judges DevTools',
    subtitle:
      'Launch ChatGPT, Claude, or Gemini pre-filled with your city, weather & family profile in one click, and inspect Gemini 2.5 Flash prompts live.',
    icon: Bot,
    badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/35',
    iconBgClass: 'bg-indigo-500 text-white',
    dotClass: 'w-7 bg-indigo-400',
    highlights: [
      {
        label: 'Context-Ready Prompts',
        desc: 'Auto-injects your live air readings and selected household tags.'
      },
      {
        label: 'Judges DevTools',
        desc: 'Audit Gemini system instructions, latency & token counts in real time.'
      },
      {
        label: '7 Indian Languages',
        desc: 'Switch effortlessly between English, Hindi, Bengali, Telugu, Tamil, Kannada & Marathi.'
      }
    ]
  }
];
