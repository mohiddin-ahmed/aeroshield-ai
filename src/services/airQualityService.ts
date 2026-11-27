/**
 * @module services/airQualityService
 * Live atmospheric telemetry client powered by Open-Meteo and European Copernicus CAMS.
 * Includes TTL in-memory caching, input validation, AbortController timeouts,
 * and deterministic offline fallback for zero-crash resilience.
 */

import {
  API_TIMEOUT_MS,
  AQI_THRESHOLDS,
  BERKELEY_EARTH_PM25_PER_CIGARETTE,
  CACHE_TTL_MS,
  type AqiThresholdBand
} from '../constants/airQuality';
import { mockCitiesAirQuality } from '../data/mockAirQualityData';
import type { AirQualityTelemetry, AqiCategoryName } from '../types/airQuality';
import { clampNumber, sanitizeCityKey, validateCoordinates } from '../utils/inputValidator';
import { logWarning } from '../utils/logger';

interface CachedTelemetry {
  timestamp: number;
  data: AirQualityTelemetry;
}

interface OpenMeteoCurrentPayload {
  us_aqi?: number;
  pm2_5?: number;
  pm10?: number;
  nitrogen_dioxide?: number;
  sulphur_dioxide?: number;
  ozone?: number;
}

interface OpenMeteoResponse {
  current?: OpenMeteoCurrentPayload;
}

const telemetryCache = new Map<string, CachedTelemetry>();

/**
 * Clears the in-memory telemetry cache (used for deterministic testing and forced refreshes).
 */
export function clearTelemetryCache(): void {
  telemetryCache.clear();
}

/**
 * Resolves the full AQI classification band (category, accessible color, risk level, advisory pills).
 * @param aqi - US Air Quality Index value (0–500+).
 * @returns Band metadata.
 */
function resolveAqiBand(aqi: number): AqiThresholdBand {
  const safeAqi = clampNumber(aqi, 0, 1000, 0);
  return (
    AQI_THRESHOLDS.find((band) => safeAqi <= band.max) || AQI_THRESHOLDS[AQI_THRESHOLDS.length - 1]
  );
}

/**
 * Maps numeric US AQI to its standard health category, hex severity color, and risk label.
 * @param aqi - US AQI numerical reading.
 * @returns Category descriptor.
 */
export function getAqiCategory(aqi: number): {
  category: AqiCategoryName;
  color: string;
  risk: string;
} {
  const { category, color, risk } = resolveAqiBand(aqi);
  return { category, color, risk };
}

/**
 * Returns localized-ready dynamic protective advisory pills matched to AQI severity.
 * @param aqi - US AQI numerical reading.
 * @returns Concise household action pills.
 */
export function getAqiAdvisories(aqi: number): string[] {
  return [...resolveAqiBand(aqi).advisoryPills];
}

/**
 * Computes Berkeley Earth inhaled particulate equivalence in daily smoked cigarettes.
 * Epidemiological baseline: 22 μg/m³ of PM2.5 inhaled over 24 hours ≈ 1 cigarette.
 * @param pm25 - Ambient fine particulate concentration (μg/m³).
 * @returns Estimated daily cigarette equivalence rounded to 1 decimal place.
 */
export function calculateCigarettesFromPm25(pm25: number): number {
  if (!Number.isFinite(pm25) || pm25 <= 0) return 0;
  return Number((pm25 / BERKELEY_EARTH_PM25_PER_CIGARETTE).toFixed(1));
}

/**
 * Fetches live atmospheric telemetry from Open-Meteo Copernicus CAMS grid with 15-min caching
 * and automatic timeout fallback so the UI never encounters an unhandled network failure.
 * @param cityKey - Sanitized preset city identifier or `'custom'`.
 * @param customCoords - Explicit WGS84 coordinates.
 * @returns Normalized air quality telemetry payload.
 */
export async function fetchLiveAirQuality(
  cityKey = 'delhi',
  customCoords: { lat: number; lon: number } | null = null
): Promise<AirQualityTelemetry> {
  const safeCityKey = sanitizeCityKey(cityKey);
  const presetFallback = mockCitiesAirQuality[safeCityKey] || mockCitiesAirQuality.delhi;
  const validatedCoords = customCoords
    ? validateCoordinates(customCoords.lat, customCoords.lon)
    : { valid: false };

  const lat =
    validatedCoords.valid && validatedCoords.lat !== undefined
      ? validatedCoords.lat
      : presetFallback.latitude;
  const lon =
    validatedCoords.valid && validatedCoords.lon !== undefined
      ? validatedCoords.lon
      : presetFallback.longitude;
  const cacheKey = `${lat.toFixed(3)},${lon.toFixed(3)}`;

  const cached = telemetryCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  const endpoint = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi&hourly=pm2_5,pm10,us_aqi&timezone=auto`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`Open-Meteo HTTP error ${response.status}`);
    }

    const data = (await response.json()) as OpenMeteoResponse;
    const current = data?.current || {};
    const usAqi = clampNumber(current.us_aqi, 0, 1000, presetFallback.aqi);
    const pm25 = clampNumber(current.pm2_5, 0, 2000, presetFallback.pm2_5);
    const pm10 = clampNumber(current.pm10, 0, 3000, presetFallback.pm10);
    const no2 = clampNumber(current.nitrogen_dioxide, 0, 1000, presetFallback.no2);
    const so2 = clampNumber(current.sulphur_dioxide, 0, 1000, presetFallback.so2);
    const o3 = clampNumber(current.ozone, 0, 1000, presetFallback.ozone);

    const { category, color, risk } = getAqiCategory(usAqi);
    const cigarettes = calculateCigarettesFromPm25(pm25);
    const dynamicPills =
      safeCityKey !== 'custom' && presetFallback.advisoryPills && usAqi > 200
        ? presetFallback.advisoryPills
        : getAqiAdvisories(usAqi);

    const result: AirQualityTelemetry = {
      city: safeCityKey === 'custom' ? 'Local Area' : presetFallback.city,
      country: safeCityKey === 'custom' ? 'Detected Region' : presetFallback.country,
      latitude: lat,
      longitude: lon,
      aqi: Math.round(usAqi),
      category,
      categoryColor: color,
      inversionRisk: risk,
      primaryPollutant: pm25 > pm10 ? 'PM2.5' : 'PM10',
      pm2_5: Number(pm25.toFixed(1)),
      pm10: Number(pm10.toFixed(1)),
      no2: Number(no2.toFixed(1)),
      so2: Number(so2.toFixed(1)),
      ozone: Number(o3.toFixed(1)),
      cigaretteEquivDaily: cigarettes,
      temperatureC: presetFallback.temperatureC,
      humidityPct: presetFallback.humidityPct,
      windSpeedKmh: presetFallback.windSpeedKmh,
      summary: `${category} ambient air quality (${Math.round(usAqi)} US AQI, PM2.5 ${pm25.toFixed(1)} μg/m³). Estimated inhalation: ${cigarettes} cigarettes/day.`,
      advisoryPills: dynamicPills,
      isLiveFeed: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    telemetryCache.set(cacheKey, { timestamp: Date.now(), data: result });
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logWarning('Open-Meteo Live API', `Fallback engaged: ${message}`);
    return {
      ...presetFallback,
      latitude: lat,
      longitude: lon,
      isLiveFeed: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  } finally {
    clearTimeout(timeoutId);
  }
}
