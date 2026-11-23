/**
 * Open-Meteo Air Quality Live API Service
 * Fetches free, non-authenticated high-resolution global atmospheric telemetry.
 * Automatically falls back to high-fidelity mock data if offline or network fails.
 */

import { mockCitiesAirQuality } from './mockAirQualityData';

const CACHE_TTL_MS = 15 * 60 * 1000; // 15-minute in-memory cache
const telemetryCache = new Map();

/**
 * Calculates US AQI category and theme color.
 */
export function getAqiCategory(aqi) {
  if (aqi <= 50) return { category: 'Good', color: '#CBD77E', risk: 'Low' };
  if (aqi <= 100) return { category: 'Moderate', color: '#E6CA9A', risk: 'Mild' };
  if (aqi <= 200) return { category: 'Unhealthy', color: '#E07A5F', risk: 'High' };
  if (aqi <= 300) return { category: 'Very Unhealthy', color: '#F26419', risk: 'Very High' };
  return { category: 'Hazardous', color: '#9B2226', risk: 'Extreme' };
}

/**
 * Calculates Berkeley Earth cigarette equivalent from PM2.5 in μg/m³
 * Rule: 22 μg/m³ over 24h = 1 cigarette.
 */
export function calculateCigarettesFromPm25(pm25) {
  if (!pm25 || pm25 <= 0) return 0;
  return Number((pm25 / 22.0).toFixed(1));
}

/**
 * Fetches real-time atmospheric telemetry from Open-Meteo or fallback.
 */
export async function fetchLiveAirQuality(cityKey = 'delhi', customCoords = null) {
  const fallback = mockCitiesAirQuality[cityKey] || mockCitiesAirQuality['delhi'];
  const lat = customCoords?.lat ?? fallback.latitude;
  const lon = customCoords?.lon ?? fallback.longitude;
  const cacheKey = `${lat.toFixed(3)},${lon.toFixed(3)}`;

  // Check cache
  const cached = telemetryCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
    return cached.data;
  }

  const endpoint = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi&hourly=pm2_5,pm10,us_aqi&timezone=auto`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4-sec timeout

    const response = await fetch(endpoint, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Open-Meteo HTTP error ${response.status}`);
    }

    const data = await response.json();
    const current = data.current || {};
    const usAqi = current.us_aqi ?? fallback.aqi;
    const pm25 = current.pm2_5 ?? fallback.pm2_5;
    const pm10 = current.pm10 ?? fallback.pm10;
    const no2 = current.nitrogen_dioxide ?? fallback.no2;
    const so2 = current.sulphur_dioxide ?? fallback.so2;
    const o3 = current.ozone ?? fallback.ozone;

    const { category, color, risk } = getAqiCategory(usAqi);
    const cigarettes = calculateCigarettesFromPm25(pm25);

    const result = {
      city: fallback.city,
      country: fallback.country,
      latitude: lat,
      longitude: lon,
      aqi: usAqi,
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
      temperatureC: fallback.temperatureC,
      humidityPct: fallback.humidityPct,
      windSpeedKmh: fallback.windSpeedKmh,
      summary: fallback.summary,
      advisoryPills: fallback.advisoryPills,
      isLiveFeed: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    telemetryCache.set(cacheKey, { timestamp: Date.now(), data: result });
    return result;
  } catch (error) {
    console.warn(`[Open-Meteo Live API] Fallback engaged: ${error.message}`);
    const fallbackResult = {
      ...fallback,
      isLiveFeed: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    return fallbackResult;
  }
}
