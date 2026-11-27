import { describe, expect, it } from 'vitest';
import {
  clampNumber,
  parseSafeAiPlan,
  sanitizeCityKey,
  sanitizeText,
  sanitizeVulnerabilities,
  validateCoordinates
} from '../src/utils/inputValidator';

describe('AeroShield AI: Security Sanitization & Schema Guardrail Tests', () => {
  it('strips HTML brackets, control chars, and enforces length caps in sanitizeText', () => {
    expect(sanitizeText('  <script>New Delhi\u0007</script>  ', 50)).toBe('scriptNew Delhi/script');
    expect(sanitizeText(null)).toBe('');
    expect(sanitizeText('a'.repeat(200), 20)).toHaveLength(20);
  });

  it('normalizes city keys and blocks path-traversal or injection sequences', () => {
    expect(sanitizeCityKey('Mumbai')).toBe('mumbai');
    expect(sanitizeCityKey('new-delhi_ncr')).toBe('new-delhi_ncr');
    expect(sanitizeCityKey('../../etc/passwd')).toBe('etcpasswd');
    expect(sanitizeCityKey('   ')).toBe('delhi');
    expect(sanitizeCityKey(undefined)).toBe('delhi');
  });

  it('validates and sanitizes vulnerability tag arrays', () => {
    expect(sanitizeVulnerabilities(['Asthma', ' <b>toddler</b> ', ''])).toEqual([
      'asthma',
      'btoddler/b'
    ]);
    expect(sanitizeVulnerabilities('not-an-array')).toEqual([]);
  });

  it('validates WGS84 coordinates and rejects out-of-bounds or non-finite inputs', () => {
    expect(validateCoordinates(28.6139, 77.209)).toEqual({
      valid: true,
      lat: 28.6139,
      lon: 77.209
    });
    expect(validateCoordinates(-90, 180).valid).toBe(true);
    expect(validateCoordinates(91, 77).valid).toBe(false);
    expect(validateCoordinates(28, -181).valid).toBe(false);
    expect(validateCoordinates(Number.NaN, 77).valid).toBe(false);
  });

  it('clamps numeric parameters safely within bounds', () => {
    expect(clampNumber(150, 50, 500, 100)).toBe(150);
    expect(clampNumber(-20, 50, 500, 100)).toBe(50);
    expect(clampNumber(9999, 50, 500, 100)).toBe(500);
    expect(clampNumber('invalid', 50, 500, 100)).toBe(100);
  });

  it('parses valid and markdown-fenced AI JSON plans while rejecting malformed payloads', () => {
    const fencedJson = `\`\`\`json
    {
      "assessment": "Severe smog episode in Delhi NCR.",
      "daily_routine": [
        {
          "time": "01:00 PM - 03:00 PM",
          "action": "Cross-ventilate for 15 minutes",
          "scientific_reason": "Solar thermal lift disperses shallow particulates."
        }
      ]
    }
    \`\`\``;

    const parsed = parseSafeAiPlan(fencedJson);
    expect(parsed).not.toBeNull();
    expect(parsed?.assessment).toContain('Severe smog');
    expect(parsed?.daily_routine).toHaveLength(1);

    expect(parseSafeAiPlan('')).toBeNull();
    expect(parseSafeAiPlan(null)).toBeNull();
    expect(parseSafeAiPlan('{ broken json')).toBeNull();
    expect(parseSafeAiPlan(JSON.stringify({ assessment: 'Only text' }))).toBeNull();
    expect(parseSafeAiPlan(JSON.stringify({ assessment: 'Ok', daily_routine: [] }))).toBeNull();
    expect(
      parseSafeAiPlan(JSON.stringify({ assessment: 'Ok', daily_routine: [{ time: '7 AM' }] }))
    ).toBeNull();
  });
});
