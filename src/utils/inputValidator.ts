/**
 * @module utils/inputValidator
 * Security sanitization, range clamping, and LLM output schema validation utilities.
 * Prevents malformed inputs, coordinate injection, and unstable AI JSON payloads.
 */

import type { DailyRoutineStep, SmogDefensePlan } from '../types/airQuality';

const VALID_KEY_PATTERN = /[^a-z0-9_-]/g;
const UNSAFE_HTML_PATTERN = /[<>]/g;

export interface CoordinateValidationResult {
  valid: boolean;
  lat?: number;
  lon?: number;
}

/**
 * Sanitizes free-text input by stripping HTML brackets and non-printable control characters.
 * @param value - Raw user or API string value.
 * @param maxLength - Maximum permitted string length.
 * @returns Sanitized plain text string.
 */
export function sanitizeText(value: unknown, maxLength = 120): string {
  if (typeof value !== 'string') return '';
  let cleaned = '';
  for (let i = 0; i < value.length; i += 1) {
    const code = value.charCodeAt(i);
    if (code >= 32 && code !== 127) {
      cleaned += value[i];
    }
  }
  return cleaned.replace(UNSAFE_HTML_PATTERN, '').trim().slice(0, maxLength);
}

/**
 * Normalizes and validates a city preset key from URL params or select controls.
 * @param cityKey - Raw city identifier key.
 * @returns Safe normalized city key, defaulting to `'delhi'`.
 */
export function sanitizeCityKey(cityKey: unknown): string {
  if (typeof cityKey !== 'string') return 'delhi';
  const normalized = cityKey.toLowerCase().trim().replace(VALID_KEY_PATTERN, '').slice(0, 32);
  return normalized || 'delhi';
}

/**
 * Sanitizes an array of household vulnerability profile identifiers.
 * @param vulnerabilities - Candidate array of vulnerability strings.
 * @returns Validated list of non-empty lowercase profile identifiers.
 */
export function sanitizeVulnerabilities(vulnerabilities: unknown): string[] {
  if (!Array.isArray(vulnerabilities)) return [];
  return vulnerabilities
    .map((item) => sanitizeText(String(item || ''), 40).toLowerCase())
    .filter(Boolean);
}

/**
 * Validates geographic latitude and longitude coordinates.
 * @param lat - Latitude value in decimal degrees.
 * @param lon - Longitude value in decimal degrees.
 * @returns Validation result object.
 */
export function validateCoordinates(lat: unknown, lon: unknown): CoordinateValidationResult {
  const numLat = Number(lat);
  const numLon = Number(lon);
  const isValid =
    Number.isFinite(numLat) &&
    Number.isFinite(numLon) &&
    numLat >= -90 &&
    numLat <= 90 &&
    numLon >= -180 &&
    numLon <= 180;

  return isValid ? { valid: true, lat: numLat, lon: numLon } : { valid: false };
}

/**
 * Clamps a numeric input into `[min, max]` with a safe fallback for NaN/Infinity.
 * @param value - Candidate numeric input.
 * @param min - Inclusive minimum allowed bound.
 * @param max - Inclusive maximum allowed bound.
 * @param fallback - Default value returned when input is not finite.
 * @returns Safe finite number within range.
 */
export function clampNumber(value: unknown, min: number, max: number, fallback: number): number {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(Math.max(numeric, min), max);
}

/**
 * Safely strips Markdown code fences, parses JSON, and enforces the GenAI smog defense schema.
 * @param rawText - Raw model text response from Gemini API.
 * @returns Validated structured smog defense payload, or `null` if invalid.
 */
export function parseSafeAiPlan(rawText: unknown): SmogDefensePlan | null {
  if (typeof rawText !== 'string' || !rawText.trim()) return null;

  const stripped = rawText
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  try {
    const parsed = JSON.parse(stripped) as Partial<SmogDefensePlan> | null;
    if (!parsed || typeof parsed !== 'object') return null;
    if (typeof parsed.assessment !== 'string' || !parsed.assessment.trim()) return null;
    if (!Array.isArray(parsed.daily_routine) || parsed.daily_routine.length === 0) return null;

    const validRoutine = parsed.daily_routine.every(
      (step): step is DailyRoutineStep =>
        Boolean(step) &&
        typeof step.time === 'string' &&
        typeof step.action === 'string' &&
        typeof step.scientific_reason === 'string'
    );

    if (!validRoutine) return null;
    return parsed as SmogDefensePlan;
  } catch {
    return null;
  }
}
