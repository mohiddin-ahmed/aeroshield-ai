/**
 * @module constants/airQuality
 * Centralized meteorological, clinical dosimetry, and application runtime constants
 * for AeroShield AI (VayuMitra OS).
 */

import type { AqiCategoryName } from '../types/airQuality';

export interface AqiThresholdBand {
  max: number;
  category: AqiCategoryName;
  color: string;
  risk: string;
  advisoryPills: string[];
}

/** Cache duration for live Open-Meteo telemetry responses (15 minutes). */
export const CACHE_TTL_MS = 15 * 60 * 1000;

/** Network abort timeout for external telemetry and reverse-geocoding API calls. */
export const API_TIMEOUT_MS = 4000;

/** Geolocation hardware query timeout and cache age. */
export const GEOLOCATION_TIMEOUT_MS = 4000;
export const GEOLOCATION_MAX_AGE_MS = 300000;

/** Clock and solar status refresh interval in the UI (30 seconds). */
export const TELEMETRY_REFRESH_INTERVAL_MS = 30000;

/** Recent tab engagement window for scroll memory preservation (25 seconds). */
export const SCROLL_MEMORY_WINDOW_MS = 25000;

/** Maximum prompt execution history entries retained in memory for Judges DevTools. */
export const MAX_PROMPT_LOGS = 50;

/** Standard room geometry and bounds for CADR filtration math. */
export const DEFAULT_CEILING_HEIGHT_FT = 9;
export const DEFAULT_ROOM_SQFT = 220;
export const MIN_ROOM_SQFT = 50;
export const MAX_ROOM_SQFT = 2000;

/** Berkeley Earth epidemiology constant: 22 μg/m³ PM2.5 over 24h ≈ 1 cigarette. */
export const BERKELEY_EARTH_PM25_PER_CIGARETTE = 22.0;

/** Diurnal solar convective thermal lift ventilation window (1:00 PM – 3:00 PM local time). */
export const SOLAR_WINDOW_START_HOUR = 13;
export const SOLAR_WINDOW_END_HOUR = 15;

/** Default GenAI model configuration. */
export const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash';
export const DEFAULT_GEMINI_TEMPERATURE = 0.3;

/** Default household vulnerability profile tags active on first load. */
export const DEFAULT_VULNERABILITIES: string[] = ['toddler', 'asthma'];

/** Declarative US AQI classification thresholds, accessible colors, and risk advisories. */
export const AQI_THRESHOLDS: AqiThresholdBand[] = [
  {
    max: 50,
    category: 'Good',
    color: '#CBD77E',
    risk: 'Low',
    advisoryPills: ['Air Quality Safe', 'Outdoor Activities Safe', 'Standard Natural Ventilation']
  },
  {
    max: 100,
    category: 'Moderate',
    color: '#E6CA9A',
    risk: 'Mild',
    advisoryPills: [
      'Sensitive Groups Stay Alert',
      'Avoid Rush-Hour Roads',
      'Ventilate Mid-Afternoon'
    ]
  },
  {
    max: 200,
    category: 'Unhealthy',
    color: '#E07A5F',
    risk: 'High',
    advisoryPills: [
      'Sensitive Groups Mask Up',
      'Keep Box-Fan Filter On',
      'Limit Strenuous Outdoor Effort'
    ]
  },
  {
    max: 300,
    category: 'Very Unhealthy',
    color: '#F26419',
    risk: 'Very High',
    advisoryPills: ['N95 for Commuters', 'Ventilate 1–3 PM Only', 'Rock-Salt Wet Mopping Daily']
  },
  {
    max: Infinity,
    category: 'Hazardous',
    color: '#9B2226',
    risk: 'Extreme',
    advisoryPills: [
      'N95 Respirator Mandatory',
      'Seal All Windows & Drafts',
      'Run DIY Purifiers High',
      'Zero Outdoor Exercise'
    ]
  }
];
