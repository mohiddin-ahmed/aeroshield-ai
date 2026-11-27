/**
 * @module data/mockAirQualityData
 * High-fidelity reference telemetry ensuring zero-crash execution
 * across offline or API-unavailable environments.
 */

import type { AirQualityTelemetry } from '../types/airQuality';

/** Deterministic baseline telemetry for major monitoring cities. */
export const mockCitiesAirQuality: Record<string, AirQualityTelemetry> = {
  delhi: {
    city: 'New Delhi (NCR)',
    country: 'India',
    latitude: 28.6139,
    longitude: 77.209,
    aqi: 425,
    category: 'Hazardous',
    categoryColor: '#9B2226',
    primaryPollutant: 'PM2.5',
    pm2_5: 324.5,
    pm10: 488.2,
    no2: 94.6,
    so2: 31.8,
    ozone: 42.1,
    temperatureC: 16.4,
    humidityPct: 78,
    windSpeedKmh: 4.2,
    inversionRisk: 'Extreme',
    cigaretteEquivDaily: 28.5,
    summary:
      'Severe ground thermal inversion has locked industrial and stubble smoke in the troposphere. Inhalation is equivalent to smoking ~28 cigarettes today.',
    advisoryPills: [
      'N95 Respirator Mandatory',
      'Seal All Windows',
      'Run DIY Purifiers High',
      'Zero Outdoor Exercise'
    ]
  },
  mumbai: {
    city: 'Mumbai',
    country: 'India',
    latitude: 19.076,
    longitude: 72.8777,
    aqi: 168,
    category: 'Unhealthy',
    categoryColor: '#E07A5F',
    primaryPollutant: 'PM2.5',
    pm2_5: 88.4,
    pm10: 164.8,
    no2: 54.2,
    so2: 18.1,
    ozone: 36.5,
    temperatureC: 28.2,
    humidityPct: 72,
    windSpeedKmh: 9.8,
    inversionRisk: 'Moderate',
    cigaretteEquivDaily: 7.6,
    summary:
      'Moderate coastal sea breeze is assisting dispersion, but vehicular exhaust along construction corridors poses risks to sensitive groups.',
    advisoryPills: [
      'Sensitive Groups Mask Up',
      'Avoid Seafront Jogging',
      'Keep Air Filters on Medium'
    ]
  },
  kolkata: {
    city: 'Kolkata',
    country: 'India',
    latitude: 22.5726,
    longitude: 88.3639,
    aqi: 280,
    category: 'Very Unhealthy',
    categoryColor: '#F26419',
    primaryPollutant: 'PM2.5',
    pm2_5: 185.0,
    pm10: 292.4,
    no2: 68.4,
    so2: 24.3,
    ozone: 38.2,
    temperatureC: 21.0,
    humidityPct: 82,
    windSpeedKmh: 5.6,
    inversionRisk: 'High',
    cigaretteEquivDaily: 14.8,
    summary:
      'Winter boundary layer compression over the Gangetic delta is trapping localized solid fuel burning and road dust.',
    advisoryPills: [
      'N95 for Two-Wheelers',
      'Ventilate at 1:30 PM Only',
      'Rock-Salt Wet Mopping Required'
    ]
  },
  lahore: {
    city: 'Lahore',
    country: 'Pakistan',
    latitude: 31.5204,
    longitude: 74.3587,
    aqi: 468,
    category: 'Hazardous',
    categoryColor: '#9B2226',
    primaryPollutant: 'PM2.5',
    pm2_5: 362.0,
    pm10: 524.0,
    no2: 112.0,
    so2: 44.0,
    ozone: 48.0,
    temperatureC: 15.0,
    humidityPct: 84,
    windSpeedKmh: 3.5,
    inversionRisk: 'Catastrophic',
    cigaretteEquivDaily: 31.2,
    summary:
      'Dense smog blanket with stagnant air masses. Emergency air defense measures and positive-pressure clean rooms are critical.',
    advisoryPills: [
      'Zero Outdoor Exposure',
      'Seal Window Drafts with Damp Cloth',
      'Continuous DIY Box-Fan Operation'
    ]
  },
  london: {
    city: 'London',
    country: 'United Kingdom',
    latitude: 51.5074,
    longitude: -0.1278,
    aqi: 45,
    category: 'Good',
    categoryColor: '#CBD77E',
    primaryPollutant: 'NO2',
    pm2_5: 11.2,
    pm10: 20.4,
    no2: 28.5,
    so2: 4.8,
    ozone: 34.0,
    temperatureC: 8.5,
    humidityPct: 86,
    windSpeedKmh: 18.2,
    inversionRisk: 'Low',
    cigaretteEquivDaily: 0.8,
    summary:
      'Strong North Atlantic winds ensure rapid particulate dispersion. Air quality is well within WHO recommended thresholds.',
    advisoryPills: [
      'Air Quality Safe',
      'Outdoor Activities Encouraged',
      'Standard Home Ventilation'
    ]
  },
  newyork: {
    city: 'New York City',
    country: 'United States',
    latitude: 40.7128,
    longitude: -74.006,
    aqi: 38,
    category: 'Good',
    categoryColor: '#CBD77E',
    primaryPollutant: 'O3',
    pm2_5: 8.6,
    pm10: 15.2,
    no2: 21.0,
    so2: 3.2,
    ozone: 32.4,
    temperatureC: 6.2,
    humidityPct: 62,
    windSpeedKmh: 16.4,
    inversionRisk: 'Low',
    cigaretteEquivDaily: 0.6,
    summary:
      'Clean oceanic air flow with minimal particulate retention. No special air purification required today.',
    advisoryPills: ['Ideal Air Quality', 'Great for Running', 'Natural Ventilation Safe']
  }
};
