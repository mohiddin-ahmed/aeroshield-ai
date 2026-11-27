import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { researchArticles } from '../src/data/researchArticlesData';
import {
  calculateCigarettesFromPm25,
  clearTelemetryCache,
  fetchLiveAirQuality,
  getAqiAdvisories,
  getAqiCategory
} from '../src/services/airQualityService';
import { calculateDiyPurifierStats, calculateRequiredCfm } from '../src/utils/cadrCalculator';
import {
  detectDeviceLocation,
  getDetailedTimeContext,
  resolveFallbackLocationByTimezone
} from '../src/utils/geolocationEngine';
import { generatePersonalizedIntelligence } from '../src/utils/personalizedJugaadEngine';
import { getSolarWindowStatus } from '../src/utils/solarWindowEngine';

describe('AeroShield AI: Mathematical, Atmospheric & Telemetry Tests', () => {
  beforeEach(() => {
    clearTelemetryCache();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calculates required CADR correctly and clamps invalid room dimensions', () => {
    expect(calculateRequiredCfm(200, 5, 9)).toBe(150);
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
    expect(berkeley?.doi).toBeDefined();
    expect(berkeley?.keyTakeaway).toContain('22 μg/m³');

    const lancet = researchArticles.find((a) => a.id === 'lancet-planetary-health-2023');
    expect(lancet).toBeDefined();
  });

  it('resolves all diurnal phases and detects device location with timezone fallback', async () => {
    const solarDate = new Date();
    solarDate.setHours(14, 15, 0, 0);
    expect(getDetailedTimeContext(solarDate).timePhase).toBe('solar_window');
    expect(getDetailedTimeContext(solarDate).solarVentilationWindow).toBe(true);

    const afternoonDate = new Date();
    afternoonDate.setHours(16, 0, 0, 0);
    expect(getDetailedTimeContext(afternoonDate).timePhase).toBe('late_afternoon');

    const eveningDate = new Date();
    eveningDate.setHours(18, 30, 0, 0);
    expect(getDetailedTimeContext(eveningDate).timePhase).toBe('evening_rush');

    const nightDate = new Date();
    nightDate.setHours(23, 0, 0, 0);
    expect(getDetailedTimeContext(nightDate).timePhase).toBe('night_inversion');

    expect(resolveFallbackLocationByTimezone('Asia/Kolkata').city).toBe('Bengaluru');
    expect(resolveFallbackLocationByTimezone('America/New_York').city).toBe('New Delhi (NCR)');

    const detected = await detectDeviceLocation();
    expect(detected.isAutoDetected).toBe(true);
    expect(detected.city.length).toBeGreaterThan(0);

    // Verify live GPS coordinate validation + Nominatim reverse geocoding flow
    Object.defineProperty(globalThis.navigator, 'geolocation', {
      value: {
        getCurrentPosition: (success: (pos: GeolocationPosition) => void) =>
          success({
            coords: { latitude: 25.5941, longitude: 85.1376 }
          } as GeolocationPosition)
      },
      configurable: true
    });
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ address: { city: 'Patna', country: 'India' } })
    } as Response);

    const gpsDetected = await detectDeviceLocation();
    expect(gpsDetected.source).toBe('gps');
    expect(gpsDetected.city).toBe('Patna');
  });

  it('tailors Desi Jugaad cards and custom AI prompt across diurnal phases and vulnerabilities', () => {
    const morningDate = new Date();
    morningDate.setHours(8, 0, 0, 0);
    const morningCtx = getDetailedTimeContext(morningDate);
    const telemetry = {
      city: 'New Delhi',
      aqi: 425,
      pm2_5: 320,
      temperatureC: 16,
      humidityPct: 85,
      windSpeedKmh: 4
    };

    const baseline = generatePersonalizedIntelligence({
      timeContext: morningCtx,
      telemetry,
      vulnerabilities: []
    });
    expect(baseline.customizedJugaadList).toHaveLength(3);

    const targeted = generatePersonalizedIntelligence({
      timeContext: morningCtx,
      telemetry,
      vulnerabilities: ['asthma', 'commuter']
    });
    expect(targeted.currentUrgentAdvisory).toContain('Morning Smog Alert');
    expect(targeted.currentUrgentAdvisory).toContain('High Humidity Tip');
    expect(targeted.customizedJugaadList.length).toBe(5);
    expect(targeted.customAiPrompt).toContain('asthma, commuter');

    const solarDate = new Date();
    solarDate.setHours(14, 0, 0, 0);
    const solarIntel = generatePersonalizedIntelligence({
      timeContext: getDetailedTimeContext(solarDate),
      telemetry: { city: 'Bengaluru', aqi: 60, pm2_5: 15, humidityPct: 50 },
      vulnerabilities: []
    });
    expect(solarIntel.bannerTheme).toBe('olive');

    const eveningDate = new Date();
    eveningDate.setHours(18, 0, 0, 0);
    const eveningIntel = generatePersonalizedIntelligence({
      timeContext: getDetailedTimeContext(eveningDate),
      telemetry: { city: 'Delhi', aqi: 300, pm2_5: 200, humidityPct: 60 },
      vulnerabilities: []
    });
    expect(eveningIntel.bannerTheme).toBe('crimson');

    const nightDate = new Date();
    nightDate.setHours(23, 0, 0, 0);
    const nightIntel = generatePersonalizedIntelligence({
      timeContext: getDetailedTimeContext(nightDate),
      telemetry: { city: 'Delhi', aqi: 300, pm2_5: 200, humidityPct: 60 },
      vulnerabilities: []
    });
    expect(nightIntel.bannerTheme).toBe('hazel');
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
    } as Response);

    const firstResult = await fetchLiveAirQuality('custom', { lat: 12.9716, lon: 77.5946 });
    expect(firstResult.isLiveFeed).toBe(true);
    expect(firstResult.aqi).toBe(92);
    expect(firstResult.category).toBe('Moderate');
    expect(firstResult.cigaretteEquivDaily).toBe(1.4);

    const cachedResult = await fetchLiveAirQuality('custom', { lat: 12.9716, lon: 77.5946 });
    expect(cachedResult).toEqual(firstResult);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    clearTelemetryCache();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    fetchMock.mockResolvedValueOnce({ ok: false, status: 503 } as Response);
    const fallbackResult = await fetchLiveAirQuality('mumbai');
    expect(fallbackResult.isLiveFeed).toBe(false);
    expect(fallbackResult.city).toBe('Mumbai');
  });
});
