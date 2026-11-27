import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { calculateRequiredCfm, calculateDiyPurifierStats } from '../src/utils/cadrCalculator';
import { getSolarWindowStatus } from '../src/utils/solarWindowEngine';
import {
  getAqiCategory,
  getAqiAdvisories,
  calculateCigarettesFromPm25,
  fetchLiveAirQuality,
  clearTelemetryCache
} from '../src/services/airQualityService';
import { researchArticles } from '../src/services/researchArticlesData';
import {
  getDetailedTimeContext,
  resolveFallbackLocationByTimezone
} from '../src/utils/geolocationEngine';
import { generatePersonalizedIntelligence } from '../src/utils/personalizedJugaadEngine';

describe('AeroShield AI: Mathematical, Atmospheric & Telemetry Tests', () => {
  beforeEach(() => {
    clearTelemetryCache();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calculates required CADR correctly and clamps invalid room dimensions', () => {
    // 200 sq ft * 9 ft ceiling = 1800 cu ft; (1800 * 5 ACH) / 60 = 150 CFM
    expect(calculateRequiredCfm(200, 5, 9)).toBe(150);
    // Clamps room size below MIN_ROOM_SQFT (50) and above MAX_ROOM_SQFT (2000)
    expect(calculateRequiredCfm(10, 5, 9)).toBe(calculateRequiredCfm(50, 5, 9));
    expect(calculateRequiredCfm(9000, 5, 9)).toBe(calculateRequiredCfm(2000, 5, 9));
  });

  it('computes DIY Box-Fan Purifier metrics accurately across low, medium, and high fan speeds', () => {
    const low = calculateDiyPurifierStats(200, 'low');
    const medium = calculateDiyPurifierStats(200, 'medium');
    const high = calculateDiyPurifierStats(200, 'high');
    const unknownFallback = calculateDiyPurifierStats(200, 'turbo');

    expect(low.effectiveCadrCfm).toBe(207);
    expect(medium.effectiveCadrCfm).toBe(282);
    expect(high.effectiveCadrCfm).toBe(361);
    expect(unknownFallback.fanSpeed).toBe('medium');
    expect(medium.costSavingsMultiple).toBeGreaterThan(15);
    expect(medium.diyCostInr).toBe(1250);
    expect(medium.recommendedForRoom).toBe(true);
  });

  it('correctly evaluates 1:00 PM – 3:00 PM Solar Thermal Lift Window boundaries', () => {
    const boundaryStart = new Date();
    boundaryStart.setHours(13, 0, 0, 0);
    expect(getSolarWindowStatus(boundaryStart).isWindowActive).toBe(true);
    expect(getSolarWindowStatus(boundaryStart).thermalLiftIntensity).toBe(85);

    const morningDate = new Date();
    morningDate.setHours(8, 0, 0, 0);
    const morningStatus = getSolarWindowStatus(morningDate);
    expect(morningStatus.isWindowActive).toBe(false);
    expect(morningStatus.isBeforeWindow).toBe(true);

    const boundaryEnd = new Date();
    boundaryEnd.setHours(15, 0, 0, 0);
    const closedStatus = getSolarWindowStatus(boundaryEnd);
    expect(closedStatus.isWindowActive).toBe(false);
    expect(closedStatus.isAfterWindow).toBe(true);
  });

  it('validates Berkeley Earth cigarette equivalence rule including edge cases', () => {
    expect(calculateCigarettesFromPm25(22)).toBe(1.0);
    expect(calculateCigarettesFromPm25(550)).toBe(25.0);
    expect(calculateCigarettesFromPm25(660)).toBe(30.0);
    expect(calculateCigarettesFromPm25(0)).toBe(0);
    expect(calculateCigarettesFromPm25(-15)).toBe(0);
    expect(calculateCigarettesFromPm25(Number.NaN)).toBe(0);
  });

  it('categorizes US AQI thresholds and produces risk-appropriate advisory pills', () => {
    expect(getAqiCategory(35).category).toBe('Good');
    expect(getAqiCategory(75).category).toBe('Moderate');
    expect(getAqiCategory(160).category).toBe('Unhealthy');
    expect(getAqiCategory(260).category).toBe('Very Unhealthy');
    expect(getAqiCategory(425).category).toBe('Hazardous');
    expect(getAqiCategory(425).color).toBe('#9B2226');

    expect(getAqiAdvisories(35)).toContain('Air Quality Safe');
    expect(getAqiAdvisories(425)).toContain('N95 Respirator Mandatory');
  });

  it('verifies peer-reviewed research papers and DOI metadata integrity', () => {
    expect(researchArticles.length).toBeGreaterThanOrEqual(5);
    const berkeley = researchArticles.find((a) => a.id === 'berkeley-earth-cigarette-rule');
    expect(berkeley).toBeDefined();
    expect(berkeley.doi).toBeDefined();
    expect(berkeley.keyTakeaway).toContain('22 μg/m³');

    const lancet = researchArticles.find((a) => a.id === 'lancet-planetary-health-2023');
    expect(lancet).toBeDefined();
  });

  it('resolves diurnal boundary-layer phases and Indian timezone defaults', () => {
    const solarDate = new Date();
    solarDate.setHours(14, 15, 0, 0);
    expect(getDetailedTimeContext(solarDate).timePhase).toBe('solar_window');
    expect(getDetailedTimeContext(solarDate).solarVentilationWindow).toBe(true);

    const eveningDate = new Date();
    eveningDate.setHours(18, 30, 0, 0);
    expect(getDetailedTimeContext(eveningDate).timePhase).toBe('evening_rush');

    expect(resolveFallbackLocationByTimezone('Asia/Kolkata').city).toBe('Bengaluru');
    expect(resolveFallbackLocationByTimezone('America/New_York').city).toBe('New Delhi (NCR)');
  });

  it('tailors Desi Jugaad cards and custom AI prompt to household vulnerabilities', () => {
    const date = new Date();
    date.setHours(8, 0, 0, 0);
    const timeCtx = getDetailedTimeContext(date);
    const telemetry = {
      city: 'New Delhi',
      aqi: 425,
      pm2_5: 320,
      temperatureC: 16,
      humidityPct: 85,
      windSpeedKmh: 4
    };

    const baseline = generatePersonalizedIntelligence({
      timeContext: timeCtx,
      telemetry,
      vulnerabilities: []
    });
    expect(baseline.customizedJugaadList).toHaveLength(3);

    const targeted = generatePersonalizedIntelligence({
      timeContext: timeCtx,
      telemetry,
      vulnerabilities: ['asthma', 'commuter']
    });
    expect(targeted.currentUrgentAdvisory).toContain('Morning Smog Alert');
    expect(targeted.currentUrgentAdvisory).toContain('High Humidity Tip');
    expect(targeted.customizedJugaadList.length).toBe(5);
    expect(targeted.customAiPrompt).toContain('asthma, commuter');
  });

  it('fetches live Open-Meteo telemetry, caches subsequent requests, and falls back gracefully on HTTP failure', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        current: {
          us_aqi: 92,
          pm2_5: 31.4,
          pm10: 52.0,
          nitrogen_dioxide: 22.1,
          sulphur_dioxide: 6.4,
          ozone: 40.5
        }
      })
    });

    const firstResult = await fetchLiveAirQuality('custom', { lat: 12.9716, lon: 77.5946 });
    expect(firstResult.isLiveFeed).toBe(true);
    expect(firstResult.aqi).toBe(92);
    expect(firstResult.category).toBe('Moderate');
    expect(firstResult.cigaretteEquivDaily).toBe(1.4);

    // Second call with identical coords must hit 15-minute TTL cache
    const cachedResult = await fetchLiveAirQuality('custom', { lat: 12.9716, lon: 77.5946 });
    expect(cachedResult).toEqual(firstResult);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // Simulate HTTP 503 failure for uncached Mumbai request -> engages safe mock fallback
    clearTelemetryCache();
    fetchMock.mockResolvedValueOnce({ ok: false, status: 503 });
    const fallbackResult = await fetchLiveAirQuality('mumbai');
    expect(fallbackResult.isLiveFeed).toBe(false);
    expect(fallbackResult.city).toBe('Mumbai');
  });
});
