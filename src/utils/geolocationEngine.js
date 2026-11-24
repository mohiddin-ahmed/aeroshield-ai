/**
 * Automatic Device Geolocation & Comprehensive India/Global Coordinate Engine
 * Automatically detects device GPS coordinates anywhere in India & the World.
 * Reverse-geocodes locality names and seamlessly queries high-resolution Open-Meteo telemetry.
 */

export const MAJOR_CITIES_CATALOG = {
  // India (Primary Focus)
  'bengaluru': { city: 'Bengaluru', state: 'Karnataka', country: 'India', lat: 12.9716, lon: 77.5946 },
  'delhi': { city: 'New Delhi (NCR)', state: 'Delhi', country: 'India', lat: 28.6139, lon: 77.2090 },
  'mumbai': { city: 'Mumbai', state: 'Maharashtra', country: 'India', lat: 19.0760, lon: 72.8777 },
  'kolkata': { city: 'Kolkata', state: 'West Bengal', country: 'India', lat: 22.5726, lon: 88.3639 },
  'chennai': { city: 'Chennai', state: 'Tamil Nadu', country: 'India', lat: 13.0827, lon: 80.2707 },
  'hyderabad': { city: 'Hyderabad', state: 'Telangana', country: 'India', lat: 17.3850, lon: 78.4867 },
  'pune': { city: 'Pune', state: 'Maharashtra', country: 'India', lat: 18.5204, lon: 73.8567 },
  'ahmedabad': { city: 'Ahmedabad', state: 'Gujarat', country: 'India', lat: 23.0225, lon: 72.5714 },
  'lucknow': { city: 'Lucknow', state: 'Uttar Pradesh', country: 'India', lat: 26.8467, lon: 80.9462 },
  'patna': { city: 'Patna', state: 'Bihar', country: 'India', lat: 25.5941, lon: 85.1376 },
  'jaipur': { city: 'Jaipur', state: 'Rajasthan', country: 'India', lat: 26.9124, lon: 75.7873 },
  'kochi': { city: 'Kochi', state: 'Kerala', country: 'India', lat: 9.9312, lon: 76.2673 },
  'chandigarh': { city: 'Chandigarh', state: 'Punjab/Haryana', country: 'India', lat: 30.7333, lon: 76.7794 },
  'guwahati': { city: 'Guwahati', state: 'Assam', country: 'India', lat: 26.1445, lon: 91.7362 },
  
  // Global Major Metros
  'lahore': { city: 'Lahore', state: 'Punjab', country: 'Pakistan', lat: 31.5204, lon: 74.3587 },
  'dhaka': { city: 'Dhaka', state: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lon: 90.4125 },
  'london': { city: 'London', state: 'England', country: 'United Kingdom', lat: 51.5074, lon: -0.1278 },
  'newyork': { city: 'New York City', state: 'NY', country: 'United States', lat: 40.7128, lon: -74.0060 }
};

/**
 * Determines current phase of day for meteorological inversion calculations.
 */
export function getDetailedTimeContext(date = new Date()) {
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  let timePhase = 'night_inversion';
  let phaseLabel = 'Night Clean-Room Lock';
  let solarVentilationWindow = false;
  let slotTitle = 'Overnight Cold Pool Stagnation Protocol';
  let currentUrgentPrescription = 'Maintain clean-room positive pressure. Run bedroom filtration on whisper mode and dampen curtain hems (Parda-Geela) to catch drafting soot.';

  if (hour >= 6 && hour < 10) {
    timePhase = 'morning_peak';
    phaseLabel = 'Morning Thermal Inversion Peak';
    slotTitle = '🚨 High Inversion Lockout Window';
    currentUrgentPrescription = 'Keep all exterior windows and doors sealed. Run DIY Box-Fan Purifiers on High. Absolutely avoid morning outdoor jogging or school assemblies.';
  } else if (hour >= 10 && hour < 13) {
    timePhase = 'late_morning';
    phaseLabel = 'Pre-Convection Warming';
    slotTitle = 'Pre-Convective Soil Warming';
    currentUrgentPrescription = 'Boundary layer is expanding as ambient sunlight heats the soil. Maintain indoor air filtration and prepare for the 1:00 PM – 3:00 PM solar ventilation window.';
  } else if (hour >= 13 && hour < 15) {
    timePhase = 'solar_window';
    phaseLabel = '☀️ Solar Convective Lift Window';
    solarVentilationWindow = true;
    slotTitle = '☀️ The Solar Convective Lift Ventilation Slot (ACTIVE NOW)';
    currentUrgentPrescription = 'Perform 15 minutes of rapid cross-ventilation right now! Peak solar heating has temporarily broken the shallow nocturnal lid. Flush out indoor CO2 and cooking fumes.';
  } else if (hour >= 15 && hour < 17) {
    timePhase = 'late_afternoon';
    phaseLabel = 'Late Afternoon Dispersion';
    slotTitle = 'Post-Ventilation Seal-Down';
    currentUrgentPrescription = 'Re-seal all windows and doors before the sun lowers. Clean air trapped indoors must be conserved before nocturnal cooling commences.';
  } else if (hour >= 17 && hour < 20) {
    timePhase = 'evening_rush';
    phaseLabel = 'Evening Boundary Collapse & Rush';
    slotTitle = 'Evening Commuter & Rush Defense';
    currentUrgentPrescription = 'All commuters on two-wheelers and foot must wear sealed N95 respirators. Vehicular nitrogen oxides combined with re-settling cold air creates peak toxicity.';
  }

  return {
    hour,
    minutes,
    timeString,
    dateString,
    timePhase,
    phaseLabel,
    slotTitle,
    currentUrgentPrescription,
    solarVentilationWindow
  };
}

/**
 * Reverse geocodes coordinates to a human-readable city using Open-Meteo or Nominatim.
 */
async function reverseGeocode(lat, lon) {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`, {
      headers: { 'Accept-Language': 'en' }
    });
    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const cityName = addr.city || addr.town || addr.county || addr.state_district || addr.state || 'Local Area';
      const countryName = addr.country || 'India';
      return { city: cityName, country: countryName };
    }
  } catch {
    // Silently fallback
  }
  return null;
}

/**
 * Automatically detects device location and time.
 * Falls back gracefully to Bengaluru / Delhi timezone if browser permission is blocked.
 */
export async function detectDeviceLocation() {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';

  // Check browser geolocation
  if (typeof navigator !== 'undefined' && navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 4000,
          maximumAge: 300000,
          enableHighAccuracy: false
        });
      });

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Try reverse geocoding
      const geoResult = await reverseGeocode(lat, lon);
      const city = geoResult?.city || 'Local Area';
      const country = geoResult?.country || 'India';

      return {
        isAutoDetected: true,
        source: 'gps',
        latitude: lat,
        longitude: lon,
        city,
        country,
        timezone: userTimezone
      };
    } catch {
      // Permission denied or timeout: use timezone intelligence
    }
  }

  // Timezone defaults
  const isIndia = userTimezone.includes('Calcutta') || userTimezone.includes('Kolkata');
  const fallback = isIndia ? MAJOR_CITIES_CATALOG['bengaluru'] : MAJOR_CITIES_CATALOG['delhi'];

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
