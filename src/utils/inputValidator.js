/**
 * @module utils/inputValidator
 * Security sanitization, range clamping, and LLM output schema validation utilities.
 * Prevents malformed inputs, coordinate injection, and unstable AI JSON payloads.
 */

const VALID_KEY_PATTERN = /[^a-z0-9_-]/g;
const UNSAFE_HTML_PATTERN = /[<>]/g;

/**
 * Sanitizes free-text input by stripping HTML brackets and non-printable control characters.
 * @param {unknown} value - Raw user or API string value.
 * @param {number} [maxLength=120] - Maximum permitted string length.
 * @returns {string} Sanitized plain text string.
 */
export function sanitizeText(value, maxLength = 120) {
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
 * @param {unknown} cityKey - Raw city identifier key.
 * @returns {string} Safe normalized city key, defaulting to `'delhi'`.
 */
export function sanitizeCityKey(cityKey) {
  if (typeof cityKey !== 'string') return 'delhi';
  const normalized = cityKey.toLowerCase().trim().replace(VALID_KEY_PATTERN, '').slice(0, 32);
  return normalized || 'delhi';
}

/**
 * Sanitizes an array of household vulnerability profile identifiers.
 * @param {unknown} vulnerabilities - Candidate array of vulnerability strings.
 * @returns {string[]} Validated list of non-empty lowercase profile identifiers.
 */
export function sanitizeVulnerabilities(vulnerabilities) {
  if (!Array.isArray(vulnerabilities)) return [];
  return vulnerabilities
    .map((item) => sanitizeText(String(item || ''), 40).toLowerCase())
    .filter(Boolean);
}

/**
 * Validates geographic latitude and longitude coordinates.
 * @param {unknown} lat - Latitude value in decimal degrees.
 * @param {unknown} lon - Longitude value in decimal degrees.
 * @returns {{ valid: boolean, lat?: number, lon?: number }} Validation result object.
 */
export function validateCoordinates(lat, lon) {
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
 * @param {unknown} value - Candidate numeric input.
 * @param {number} min - Inclusive minimum allowed bound.
 * @param {number} max - Inclusive maximum allowed bound.
 * @param {number} fallback - Default value returned when input is not finite.
 * @returns {number} Safe finite number within range.
 */
export function clampNumber(value, min, max, fallback) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(Math.max(numeric, min), max);
}

/**
 * Safely strips Markdown code fences, parses JSON, and enforces the GenAI smog defense schema.
 * @param {string} rawText - Raw model text response from Gemini API.
 * @returns {object|null} Validated structured smog defense payload, or `null` if invalid.
 */
export function parseSafeAiPlan(rawText) {
  if (typeof rawText !== 'string' || !rawText.trim()) return null;

  const stripped = rawText
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  try {
    const parsed = JSON.parse(stripped);
    if (!parsed || typeof parsed !== 'object') return null;
    if (typeof parsed.assessment !== 'string' || !parsed.assessment.trim()) return null;
    if (!Array.isArray(parsed.daily_routine) || parsed.daily_routine.length === 0) return null;

    const validRoutine = parsed.daily_routine.every(
      (step) =>
        step &&
        typeof step.time === 'string' &&
        typeof step.action === 'string' &&
        typeof step.scientific_reason === 'string'
    );

    if (!validRoutine) return null;
    return parsed;
  } catch {
    return null;
  }
}
