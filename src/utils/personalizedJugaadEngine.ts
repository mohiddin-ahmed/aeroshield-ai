/**
 * @module utils/personalizedJugaadEngine
 * Personalized Desi Jugaad & Situational Advisory Engine.
 * Evaluates 9 urban family vulnerability profiles against diurnal inversion phase and weather telemetry.
 */

import { BERKELEY_EARTH_PM25_PER_CIGARETTE } from '../constants/airQuality';
import {
  COMMUTER_JAGGERY_PROTOCOL,
  CORE_JUGAAD_PROTOCOLS,
  familyVulnerabilityProfiles,
  RESPIRATORY_STEAM_PROTOCOL
} from '../data/jugaadProtocols';
import type {
  AirQualityTelemetry,
  JugaadProtocol,
  PersonalizedIntelligence,
  RightNowActionBox,
  TimeContext
} from '../types/airQuality';
import { sanitizeText, sanitizeVulnerabilities } from './inputValidator';

export { familyVulnerabilityProfiles };

export interface PersonalizedIntelligenceInput {
  timeContext?: Partial<TimeContext>;
  telemetry?: Partial<AirQualityTelemetry>;
  vulnerabilities?: string[];
}

interface DiurnalAdvisoryPreset {
  bannerTheme: 'olive' | 'hazel' | 'crimson';
  advisory: string;
  actionBoxes: RightNowActionBox[];
}

function resolveDiurnalPreset(
  timePhase: string | undefined,
  solarVentilationWindow: boolean | undefined,
  safeCity: string,
  pm25: number
): DiurnalAdvisoryPreset {
  if (solarVentilationWindow) {
    return {
      bannerTheme: 'olive',
      advisory: `☀️ Good news for ${safeCity}: Sunlight has lifted outdoor smog right now. Open two opposite windows for 15 minutes to swap stale indoor air with fresher breeze.`,
      actionBoxes: [
        {
          id: 'open-windows',
          badge: 'Do Now',
          title: 'Open Windows (15m)',
          detail: 'Cross-ventilate opposite sides now while sun lifts smog.'
        },
        {
          id: 'flush-kitchen',
          badge: 'Fresh Air',
          title: 'Clear Stale Indoor Air',
          detail: 'Turn on exhaust fans to push trapped cooking & CO2 air out.'
        },
        {
          id: 'reclose-3pm',
          badge: 'Set Timer',
          title: 'Close By 3:00 PM',
          detail: 'Shut frames before late afternoon cool air drops back down.'
        }
      ]
    };
  }

  if (timePhase === 'morning_peak') {
    return {
      bannerTheme: 'crimson',
      advisory: `Morning Smog Alert: Cold air is holding heavy dust (${pm25} μg/m³) right near the ground. Keep windows closed and run your DIY air filter on High.`,
      actionBoxes: [
        {
          id: 'seal-morning',
          badge: 'Priority',
          title: 'Keep Doors Closed',
          detail: 'Morning traffic fumes stay trapped low near the street.'
        },
        {
          id: 'fan-high',
          badge: 'Filtration',
          title: 'Run DIY Filter High',
          detail: 'Keep box-fan purifier circulating inside bedrooms & halls.'
        },
        {
          id: 'skip-walk',
          badge: 'Health Tip',
          title: 'Move Exercise Indoors',
          detail: 'Skip early outdoor jogs until afternoon sunlight.'
        }
      ]
    };
  }

  if (timePhase === 'evening_rush') {
    return {
      bannerTheme: 'crimson',
      advisory:
        'Evening Traffic Alert: Road fumes and cooling air are trapping pollution low. Wear a snug N95 mask outdoors and shut your windows now.',
      actionBoxes: [
        {
          id: 'wear-n95',
          badge: 'Commute',
          title: 'Wear Snug N95 Mask',
          detail: 'Filter diesel soot along busy evening roads.'
        },
        {
          id: 'shut-evening',
          badge: 'Home Seal',
          title: 'Shut Windows Early',
          detail: 'Block cool dusk smoke before 5:30 PM rush spikes.'
        },
        {
          id: 'wet-wipe',
          badge: 'Post-Trip',
          title: 'Wash Face & Salt Mop',
          detail: 'Use damp mopping instead of dry brooming settled road dust.'
        }
      ]
    };
  }

  if (timePhase === 'night_inversion') {
    return {
      bannerTheme: 'hazel',
      advisory:
        'Night Protection Mode: Cool night air keeps fine smog low until afternoon. Keep bedroom windows shut, run your purifier on Low, and damp-wipe curtain bottoms to catch dust.',
      actionBoxes: [
        {
          id: 'night-seal',
          badge: 'Bedroom',
          title: 'Keep Windows Shut',
          detail: 'Cold night air traps smog right outside your window.'
        },
        {
          id: 'whisper-mode',
          badge: 'Sleep Safe',
          title: 'Run Filter on Low',
          detail: 'Keep clean air gently flowing for 8 hours of sleep.'
        },
        {
          id: 'damp-curtain',
          badge: 'Zero Cost',
          title: 'Wet Cotton Curtains',
          detail: 'Dampen bottom hems slightly to trap gap dust.'
        }
      ]
    };
  }

  return {
    bannerTheme: 'hazel',
    advisory:
      'Sunny Warm-Up: Pollution is still settling. Keep filters running indoors and prepare to open windows briefly between 1:00 PM and 3:00 PM.',
    actionBoxes: [
      {
        id: 'wait-solar',
        badge: 'Stay Closed',
        title: 'Wait for 1–3 PM Window',
        detail: 'Keep windows closed until afternoon heat lifts smog.'
      },
      {
        id: 'keep-filter',
        badge: 'Indoors',
        title: 'Keep Purifier Medium',
        detail: 'Maintain steady indoor air cleaning through noon.'
      },
      {
        id: 'damp-mop',
        badge: 'Dust Hack',
        title: 'Wet-Mop Floors Only',
        detail: 'Avoid dry sweeping so settled soot stays off lungs.'
      }
    ]
  };
}

/**
 * Generates live situational advisories, vulnerability-filtered Desi Jugaad protocols,
 * and a synchronized Multi-AI contextual prompt.
 * @param params - Time, telemetry, and active vulnerability flags.
 * @returns Personalized clean-air intelligence payload.
 */
export function generatePersonalizedIntelligence({
  timeContext = {},
  telemetry = {},
  vulnerabilities = []
}: PersonalizedIntelligenceInput): PersonalizedIntelligence {
  const {
    timePhase,
    solarVentilationWindow,
    timeString = 'now',
    phaseLabel = 'Current Phase'
  } = timeContext;
  const {
    aqi = 300,
    pm2_5 = 180,
    temperatureC = 18,
    humidityPct = 70,
    windSpeedKmh = 6,
    city = 'New Delhi'
  } = telemetry;

  const safeCity = sanitizeText(city, 80) || 'your area';
  const safeVulns = sanitizeVulnerabilities(vulnerabilities);

  const preset = resolveDiurnalPreset(timePhase, solarVentilationWindow, safeCity, pm2_5);
  let currentUrgentAdvisory = preset.advisory;

  if (humidityPct > 80 && aqi > 200) {
    currentUrgentAdvisory +=
      ' (High Humidity Tip: Moist fog clings to pollution particles—skip cool mist humidifiers right now).';
  }

  const customizedJugaadList: JugaadProtocol[] = [...CORE_JUGAAD_PROTOCOLS];
  if (safeVulns.some((v) => v === 'asthma' || v === 'elderly' || v === 'commuter')) {
    customizedJugaadList.push(RESPIRATORY_STEAM_PROTOCOL);
  }
  if (safeVulns.some((v) => v === 'commuter' || v === 'athlete')) {
    customizedJugaadList.push(COMMUTER_JAGGERY_PROTOCOL);
  }

  const activeVulnNames = safeVulns.length > 0 ? safeVulns.join(', ') : 'standard urban household';
  const cigEquiv = (pm2_5 / BERKELEY_EARTH_PM25_PER_CIGARETTE).toFixed(1);

  const customAiPrompt = `Act as an elite atmospheric physicist and clinical pulmonologist.
Location: ${safeCity}
Current Time: ${timeString} (${phaseLabel})
Current Weather: ${temperatureC}°C, ${humidityPct}% humidity, wind ${windSpeedKmh} km/h
Air Quality Index: AQI ${aqi} (PM2.5: ${pm2_5} μg/m³ — toxic equivalent of smoking ${cigEquiv} cigarettes/day per Berkeley Earth)
Household Profile: ${activeVulnNames}

Given the current time of day (${timeString}) and exact meteorological conditions:
1. Provide an immediate 3-step action plan for this exact hour (including whether to seal or ventilate).
2. Recommend the best low-cost Desi Jugaad indoor air defense hacks specifically tailored to ${activeVulnNames}.
3. Explain the physics of boundary layer inversion occurring right now and how to protect our lungs.`;

  return {
    currentUrgentAdvisory,
    actionBoxes: preset.actionBoxes,
    bannerTheme: preset.bannerTheme,
    customizedJugaadList,
    customAiPrompt
  };
}
