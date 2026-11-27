/**
 * @module utils/geolocationEngine
 * Automatic device GPS + timezone geolocation, Nominatim reverse-geocoding,
 * and diurnal boundary-layer phase classification engine.
 */

import {
  API_TIMEOUT_MS,
  GEOLOCATION_MAX_AGE_MS,
  GEOLOCATION_TIMEOUT_MS
} from '../constants/airQuality';
import { DIURNAL_PHASES, MAJOR_CITIES_CATALOG, NIGHT_PHASE_DEFAULT } from '../data/citiesCatalog';
import type { CityPreset, LocationData, TimeContext } from '../types/airQuality';
import { sanitizeText, validateCoordinates } from './inputValidator';

export { MAJOR_CITIES_CATALOG };

interface NominatimReverseResponse {
  address?: {
    city?: string;
    town?: string;
    county?: string;
    state_district?: string;
    state?: string;
    country?: string;
  };
}

/**
 * Computes current diurnal atmospheric boundary-layer phase and urgent household directive.
 * @param date - Local clock timestamp.
 * @returns Time strings, diurnal phase identifier, solar window boolean, and directive.
 */
export function getDetailedTimeContext(date: Date = new Date()): TimeContext {
  const validDate = date instanceof Date && !Number.isNaN(date.getTime()) ? date : new Date();
  const hour = validDate.getHours();
  const minutes = validDate.getMinutes();
  const timeString = validDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = validDate.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const matchedPhase =
    DIURNAL_PHASES.find((phase) => hour >= phase.minHour && hour < phase.maxHour) ||
    NIGHT_PHASE_DEFAULT;

  return {
    hour,
    minutes,
    timeString,
    dateString,
    timePhase: matchedPhase.timePhase,
    phaseLabel: matchedPhase.phaseLabel,
    slotTitle: matchedPhase.slotTitle,
    phaseExplainer: matchedPhase.phaseExplainer,
    currentUrgentPrescription: matchedPhase.currentUrgentPrescription,
    solarVentilationWindow: matchedPhase.solarVentilationWindow
  };
}

/**
 * Reverse-geocodes validated WGS84 coordinates to a human-readable locality using Nominatim.
 * @param lat - Validated latitude.
 * @param lon - Validated longitude.
 * @returns Locality or null on timeout/error.
 */
async function reverseGeocode(
  lat: number,
  lon: number
): Promise<{ city: string; country: string } | null> {
  const check = validateCoordinates(lat, lon);
  if (!check.valid || check.lat === undefined || check.lon === undefined) return null;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${check.lat}&lon=${check.lon}&zoom=10`,
      {
        headers: { 'Accept-Language': 'en' },
        signal: controller.signal
      }
    );
    if (res.ok) {
      const data = (await res.json()) as NominatimReverseResponse;
      const addr = data?.address || {};
      const rawCity =
        addr.city || addr.town || addr.county || addr.state_district || addr.state || 'Local Area';
      const rawCountry = addr.country || 'India';
      return {
        city: sanitizeText(rawCity, 60) || 'Local Area',
        country: sanitizeText(rawCountry, 60) || 'India'
      };
    }
  } catch {
    // Silent fallback when reverse-geocoding is blocked or rate-limited
  } finally {
    clearTimeout(timeoutId);
  }
  return null;
}

/**
 * Resolves fallback city preset from browser IANA timezone string.
 * @param timezone - IANA timezone identifier.
 * @returns Catalog city preset object.
 */
export function resolveFallbackLocationByTimezone(timezone: string): CityPreset {
  const safeTz = typeof timezone === 'string' ? timezone : 'Asia/Kolkata';
  const isIndia =
    safeTz.includes('Calcutta') || safeTz.includes('Kolkata') || safeTz.includes('Asia/Delhi');
  return isIndia ? MAJOR_CITIES_CATALOG.bengaluru : MAJOR_CITIES_CATALOG.delhi;
}

/**
 * Automatically detects device GPS coordinates with graceful timezone fallback.
 * @returns Detected geographic metadata and source identifier.
 */
export async function detectDeviceLocation(): Promise<LocationData> {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';

  if (typeof navigator !== 'undefined' && navigator.geolocation) {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: GEOLOCATION_TIMEOUT_MS,
          maximumAge: GEOLOCATION_MAX_AGE_MS,
          enableHighAccuracy: false
        });
      });

      const coords = validateCoordinates(position?.coords?.latitude, position?.coords?.longitude);
      if (coords.valid && coords.lat !== undefined && coords.lon !== undefined) {
        const geoResult = await reverseGeocode(coords.lat, coords.lon);
        return {
          isAutoDetected: true,
          source: 'gps',
          latitude: coords.lat,
          longitude: coords.lon,
          city: geoResult?.city || 'Local Area',
          country: geoResult?.country || 'India',
          timezone: userTimezone
        };
      }
    } catch {
      // Geolocation permission denied or timed out: continue with timezone intelligence
    }
  }

  const fallback = resolveFallbackLocationByTimezone(userTimezone);
  return {
    isAutoDetected: true,
    source: 'timezone',
    latitude: fallback.lat,
    longitude: fallback.lon,
    city: fallback.city,
    country: fallback.country,
    timezone: userTimezone
  };
}
