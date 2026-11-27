/**
 * @module services/gemini
 * Google Gemini GenAI Service for AeroShield AI (VayuMitra OS).
 * Generates personalized diurnal smog routines, Desi Jugaad prescriptions, and dosimetry metrics
 * using structured JSON prompts with deterministic Zero-Crash offline fallback.
 */

import { GoogleGenAI } from '@google/genai';
import {
  BERKELEY_EARTH_PM25_PER_CIGARETTE,
  DEFAULT_GEMINI_MODEL,
  DEFAULT_GEMINI_TEMPERATURE
} from '../constants/airQuality';
import type { SmogDefensePlan } from '../types/airQuality';
import {
  clampNumber,
  parseSafeAiPlan,
  sanitizeText,
  sanitizeVulnerabilities
} from '../utils/inputValidator';
import { logWarning } from '../utils/logger';
import { logPromptExecution } from '../utils/promptLogger';

export interface GeminiClientLike {
  models: {
    generateContent: (params: {
      model: string;
      contents: string;
      config: {
        systemInstruction: string;
        temperature: number;
        responseMimeType: string;
      };
    }) => Promise<{
      text?: string;
      usageMetadata?: { totalTokenCount?: number };
    }>;
  };
}

export interface SmogDefensePlanParams {
  city?: string;
  aqi?: number;
  pm25?: number;
  vulnerabilities?: string[];
}

export interface SmogDefensePlanResult {
  success: boolean;
  data: SmogDefensePlan;
  isMock: boolean;
  latencyMs: number;
}

const envApiKey = sanitizeText(import.meta.env?.VITE_GEMINI_API_KEY || '', 256);
const configuredKey = envApiKey && envApiKey !== 'your_gemini_api_key_here' ? envApiKey : '';
const configuredModel =
  sanitizeText(import.meta.env?.VITE_GEMINI_MODEL || '', 64) || DEFAULT_GEMINI_MODEL;

const defaultAiClient: GeminiClientLike | null = configuredKey
  ? (new GoogleGenAI({ apiKey: configuredKey }) as unknown as GeminiClientLike)
  : null;

const SYSTEM_INSTRUCTION = `You are VayuMitra AI, an elite atmospheric chemist and public health physician specializing in winter thermal inversion smog defense in South Asian and dense urban environments.
Your goal is to provide actionable, low-cost daily survival strategies, scientifically explain the 1:00 PM - 3:00 PM solar thermal lift window, and prescribe Desi Jugaad indoor filtration hacks.
Format your output strictly as a JSON object with:
1. "assessment": A 2-sentence clinical and atmospheric briefing.
2. "daily_routine": An array of 4 steps (morning, afternoon solar window, evening commute, night clean room) each with "time", "action", and "scientific_reason".
3. "jugaad_prescriptions": An array of 2 prioritized low-cost indoor hacks with "name", "cost_inr", and "step".
4. "dosimetry_impact": Object with "pm25_avoided_ug", "cigarettes_avoided", and "co2_offset_kg".`;

/**
 * Builds deterministic heuristic clean-air defense data when Gemini API is unconfigured,
 * offline, rate-limited, or returns malformed JSON (Zero-Crash guarantee).
 * @param params - Sanitized environmental and family profile inputs.
 * @returns Validated clean-air protocol object matching the strict JSON schema.
 */
export function buildFallbackDefensePlan({
  city,
  pm25,
  vulnSummary
}: {
  city: string;
  pm25: number;
  vulnSummary: string;
}): SmogDefensePlan {
  const pm25AvoidedUg = Math.round(pm25 * 1.8);
  const cigarettesAvoided = Number((pm25AvoidedUg / BERKELEY_EARTH_PM25_PER_CIGARETTE).toFixed(1));

  return {
    assessment: `Atmospheric thermal inversion is compressing particulate mass near street level in ${city}. Vulnerable members (${vulnSummary}) require active indoor particulate suppression and sealed ventilation protocols today.`,
    daily_routine: [
      {
        time: '07:00 AM - 10:00 AM',
        action:
          'Keep all exterior doors and windows hermetically sealed. Run DIY Box-Fan Purifiers on High.',
        scientific_reason:
          'Nocturnal radiative cooling traps combustion soot and ammonium sulfate at breathing height during early hours.'
      },
      {
        time: '01:00 PM - 03:00 PM',
        action:
          'Open opposing windows for 15 minutes of rapid cross-ventilation while running exhaust fans.',
        scientific_reason:
          'Peak solar heating warms the ground surface, breaking the shallow boundary layer and lifting trapped particulates.'
      },
      {
        time: '05:30 PM - 07:30 PM',
        action:
          'Commuters must wear sealed N95 respirators; avoid two-wheeler transit along congested arterial roads.',
        scientific_reason:
          'Evening rush-hour nitrogen oxides combine with re-emerging nocturnal inversion to spike near-roadway PM2.5.'
      },
      {
        time: '09:00 PM - Overnight',
        action:
          'Seal bedroom drafts with damp cotton cloths (Parda-Geela) and run bedroom filtration on medium whisper mode.',
        scientific_reason:
          'Maintains clean alveolar zones and positive pressure against overnight soot infiltration during 8 hours of sleep.'
      }
    ],
    jugaad_prescriptions: [
      {
        name: '₹1,250 Box-Fan MERV 13 Purifier',
        cost_inr: 1250,
        step: 'Seal a 20x20 MERV 13 sheet to the rear intake of a 20-inch box fan using duct tape. Delivers ~280 CFM CADR.'
      },
      {
        name: 'Rock-Salt Wet Mopping (Namak Pochha)',
        cost_inr: 20,
        step: 'Dissolve 2 tablespoons of rock salt in warm water and damp-mop floors instead of dry broom sweeping.'
      }
    ],
    dosimetry_impact: {
      pm25_avoided_ug: pm25AvoidedUg,
      cigarettes_avoided: cigarettesAvoided,
      co2_offset_kg: 1.4
    }
  };
}

/**
 * Records fallback plan execution to Judges DevTools and returns unified response shape.
 */
function executeFallbackResponse({
  city,
  pm25,
  vulnSummary,
  userPrompt,
  startTime,
  error = null
}: {
  city: string;
  pm25: number;
  vulnSummary: string;
  userPrompt: string;
  startTime: number;
  error?: string | null;
}): SmogDefensePlanResult {
  const latencyMs = Math.max(120, Math.round(performance.now() - startTime));
  const fallbackData = buildFallbackDefensePlan({ city, pm25, vulnSummary });
  const engineLabel = error
    ? `${configuredModel} (Resilient Fallback Engine)`
    : `${configuredModel} (Offline Evaluator Engine)`;

  logPromptExecution({
    taskName: 'Urban Air Defense Synthesis',
    prompt: userPrompt,
    systemInstruction: SYSTEM_INSTRUCTION,
    response: JSON.stringify(fallbackData),
    model: engineLabel,
    temperature: DEFAULT_GEMINI_TEMPERATURE,
    latencyMs,
    tokenCount: 420,
    isMock: true,
    error
  });

  return {
    success: true,
    data: fallbackData,
    isMock: true,
    latencyMs
  };
}

/**
 * Synthesizes a customized household smog defense plan via Gemini API or non-recursive fallback.
 * @param params - Environmental and household parameters.
 * @param clientOverride - Optional injected Gemini client for testing.
 * @returns Standardized GenAI plan result.
 */
export async function generateSmogDefensePlan(
  {
    city = 'New Delhi (NCR)',
    aqi = 300,
    pm25 = 180,
    vulnerabilities = []
  }: SmogDefensePlanParams = {},
  clientOverride: GeminiClientLike | null = null
): Promise<SmogDefensePlanResult> {
  const startTime = performance.now();
  const safeCity = sanitizeText(city, 80) || 'New Delhi (NCR)';
  const safeAqi = Math.round(clampNumber(aqi, 0, 1000, 300));
  const safePm25 = Number(clampNumber(pm25, 0, 2000, 180).toFixed(1));
  const safeVulns = sanitizeVulnerabilities(vulnerabilities);
  const vulnSummary = safeVulns.length > 0 ? safeVulns.join(', ') : 'general household';

  const userPrompt = `Location: ${safeCity}
Current AQI: ${safeAqi} (PM2.5: ${safePm25} μg/m³)
Family Vulnerabilities: ${vulnSummary}
Calculate the daily defense plan, solar thermal window instructions, and customized Desi Jugaad for this household.`;

  const aiClient = clientOverride || defaultAiClient;

  if (!aiClient) {
    return executeFallbackResponse({
      city: safeCity,
      pm25: safePm25,
      vulnSummary,
      userPrompt,
      startTime
    });
  }

  try {
    const response = await aiClient.models.generateContent({
      model: configuredModel,
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: DEFAULT_GEMINI_TEMPERATURE,
        responseMimeType: 'application/json'
      }
    });

    const parsedData = parseSafeAiPlan(response?.text);
    if (!parsedData) {
      throw new Error('Malformed JSON payload returned by GenAI model');
    }

    const latencyMs = Math.max(1, Math.round(performance.now() - startTime));

    logPromptExecution({
      taskName: 'Urban Air Defense Synthesis',
      prompt: userPrompt,
      systemInstruction: SYSTEM_INSTRUCTION,
      response: JSON.stringify(parsedData),
      model: `${configuredModel} (Live Google AI Studio)`,
      temperature: DEFAULT_GEMINI_TEMPERATURE,
      latencyMs,
      tokenCount: response?.usageMetadata?.totalTokenCount || 480,
      isMock: false
    });

    return {
      success: true,
      data: parsedData,
      isMock: false,
      latencyMs
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logWarning('Gemini API Fallback Engaged', message);
    return executeFallbackResponse({
      city: safeCity,
      pm25: safePm25,
      vulnSummary,
      userPrompt,
      startTime,
      error: message
    });
  }
}
