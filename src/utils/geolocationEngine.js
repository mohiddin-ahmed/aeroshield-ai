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
import { sanitizeText, validateCoordinates } from './inputValidator';

/** Catalog of major Indian and global urban monitoring stations. */
export const MAJOR_CITIES_CATALOG = {
  bengaluru: { city: 'Bengaluru', state: 'Karnataka', country: 'India', lat: 12.9716, lon: 77.5946 },
  delhi: { city: 'New Delhi (NCR)', state: 'Delhi', country: 'India', lat: 28.6139, lon: 77.2090 },
  mumbai: { city: 'Mumbai', state: 'Maharashtra', country: 'India', lat: 19.0760, lon: 72.8777 },
  kolkata: { city: 'Kolkata', state: 'West Bengal', country: 'India', lat: 22.5726, lon: 88.3639 },
  chennai: { city: 'Chennai', state: 'Tamil Nadu', country: 'India', lat: 13.0827, lon: 80.2707 },
  hyderabad: { city: 'Hyderabad', state: 'Telangana', country: 'India', lat: 17.3850, lon: 78.4867 },
  pune: { city: 'Pune', state: 'Maharashtra', country: 'India', lat: 18.5204, lon: 73.8567 },
  ahmedabad: { city: 'Ahmedabad', state: 'Gujarat', country: 'India', lat: 23.0225, lon: 72.5714 },
  lucknow: { city: 'Lucknow', state: 'Uttar Pradesh', country: 'India', lat: 26.8467, lon: 80.9462 },
  patna: { city: 'Patna', state: 'Bihar', country: 'India', lat: 25.5941, lon: 85.1376 },
  jaipur: { city: 'Jaipur', state: 'Rajasthan', country: 'India', lat: 26.9124, lon: 75.7873 },
  kochi: { city: 'Kochi', state: 'Kerala', country: 'India', lat: 9.9312, lon: 76.2673 },
  chandigarh: { city: 'Chandigarh', state: 'Punjab/Haryana', country: 'India', lat: 30.7333, lon: 76.7794 },
  guwahati: { city: 'Guwahati', state: 'Assam', country: 'India', lat: 26.1445, lon: 91.7362 },
  lahore: { city: 'Lahore', state: 'Punjab', country: 'Pakistan', lat: 31.5204, lon: 74.3587 },
  dhaka: { city: 'Dhaka', state: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lon: 90.4125 },
  london: { city: 'London', state: 'England', country: 'United Kingdom', lat: 51.5074, lon: -0.1278 },
  newyork: { city: 'New York City', state: 'NY', country: 'United States', lat: 40.7128, lon: -74.0060 }
};

const DIURNAL_PHASES = [
  {
    minHour: 6,
    maxHour: 10,
    timePhase: 'morning_peak',
    phaseLabel: 'Morning Thermal Inversion Peak',
    slotTitle: 'High Inversion Lockout Window',
    solarVentilationWindow: false,
    currentUrgentPrescription:
      'Keep all exterior windows and doors sealed. Run DIY Box-Fan Purifiers on High. Absolutely avoid morning outdoor jogging or school assemblies.'
  },
  {
    minHour: 10,
    maxHour: 13,
    timePhase: 'late_morning',
    phaseLabel: 'Pre-Convection Warming',
    slotTitle: 'Pre-Convective Soil Warming',
    solarVentilationWindow: false,
    currentUrgentPrescription:
      'Boundary layer is expanding as ambient sunlight heats the soil. Maintain indoor air filtration and prepare for the 1:00 PM – 3:00 PM solar ventilation window.'
  },
  {
    minHour: 13,
    maxHour: 15,
    timePhase: 'solar_window',
    phaseLabel: 'Solar Convective Lift Window',
    slotTitle: 'The Solar Convective Lift Ventilation Slot (ACTIVE NOW)',
    solarVentilationWindow: true,
    currentUrgentPrescription:
      'Perform 15 minutes of rapid cross-ventilation right now! Peak solar heating has temporarily broken the shallow nocturnal lid. Flush out indoor CO2 and cooking fumes.'
  },
  {
    minHour: 15,
    maxHour: 17,
    timePhase: 'late_afternoon',
    phaseLabel: 'Late Afternoon Dispersion',
    slotTitle: 'Post-Ventilation Seal-Down',
    solarVentilationWindow: false,
    currentUrgentPrescription:
      'Re-seal all windows and doors before the sun lowers. Clean air trapped indoors must be conserved before nocturnal cooling commences.'
  },
  {
    minHour: 17,
    maxHour: 20,
    timePhase: 'evening_rush',
    phaseLabel: 'Evening Boundary Collapse & Rush',
    slotTitle: 'Evening Commuter & Rush Defense',
    solarVentilationWindow: false,
    currentUrgentPrescription:
      'All commuters on two-wheelers and foot must wear sealed N95 respirators. Vehicular nitrogen oxides combined with re-settling cold air creates peak toxicity.'
  }
];

const NIGHT_PHASE_DEFAULT = {
  timePhase: 'night_inversion',
  phaseLabel: 'Night Clean-Room Lock',
  slotTitle: 'Overnight Cold Pool Stagnation Protocol',
  solarVentilationWindow: false,
  currentUrgentPrescription:
    'Maintain clean-room positive pressure. Run bedroom filtration on whisper mode and dampen curtain hems (Parda-Geela) to catch drafting soot.'
};

/**
 * Computes current diurnal atmospheric boundary-layer phase and urgent household directive.
 * @param {Date} [date=new Date()] - Local clock timestamp.
 * @returns {object} Time strings, diurnal phase identifier, solar window boolean, and directive.
 */
export function getDetailedTimeContext(date = new Date()) {
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
    currentUrgentPrescription: matchedPhase.currentUrgentPrescription,
    solarVentilationWindow: matchedPhase.solarVentilationWindow
  };
}

/**
 * Reverse-geocodes validated WGS84 coordinates to a human-readable locality using Nominatim.
 * @param {number} lat - Validated latitude.
 * @param {number} lon - Validated longitude.
 * @returns {Promise<{ city: string, country: string }|null>} Locality or null on timeout/error.
 */
async function reverseGeocode(lat, lon) {
  const check = validateCoordinates(lat, lon);
  if (!check.valid) return null;

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
      const data = await res.json();
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
 * @param {string} timezone - IANA timezone identifier.
 * @returns {object} Catalog city object.
 */
export function resolveFallbackLocationByTimezone(timezone) {
  const safeTz = typeof timezone === 'string' ? timezone : 'Asia/Kolkata';
  const isIndia =
    safeTz.includes('Calcutta') || safeTz.includes('Kolkata') || safeTz.includes('Asia/Delhi');
  return isIndia ? MAJOR_CITIES_CATALOG.bengaluru : MAJOR_CITIES_CATALOG.delhi;
}

/**
 * Automatically detects device GPS coordinates with graceful timezone fallback.
 * @returns {Promise<object>} Detected geographic metadata and source identifier.
 */
export async function detectDeviceLocation() {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';

  if (typeof navigator !== 'undefined' && navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: GEOLOCATION_TIMEOUT_MS,
          maximumAge: GEOLOCATION_MAX_AGE_MS,
          enableHighAccuracy: false
        });
      });

      const coords = validateCoordinates(position?.coords?.latitude, position?.coords?.longitude);
      if (coords.valid) {
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
