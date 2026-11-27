/**
 * @module data/citiesCatalog
 * Major Indian and global urban monitoring station coordinates
 * plus diurnal boundary-layer phase definitions.
 */

import type { CityPreset, DiurnalPhaseId } from '../types/airQuality';

export interface DiurnalPhaseRule {
  minHour: number;
  maxHour: number;
  timePhase: DiurnalPhaseId;
  phaseLabel: string;
  slotTitle: string;
  phaseExplainer: string;
  solarVentilationWindow: boolean;
  currentUrgentPrescription: string;
}

/** Catalog of major Indian and global urban monitoring stations. */
export const MAJOR_CITIES_CATALOG: Record<string, CityPreset> = {
  bengaluru: {
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    lat: 12.9716,
    lon: 77.5946
  },
  delhi: { city: 'New Delhi (NCR)', state: 'Delhi', country: 'India', lat: 28.6139, lon: 77.209 },
  mumbai: { city: 'Mumbai', state: 'Maharashtra', country: 'India', lat: 19.076, lon: 72.8777 },
  kolkata: { city: 'Kolkata', state: 'West Bengal', country: 'India', lat: 22.5726, lon: 88.3639 },
  chennai: { city: 'Chennai', state: 'Tamil Nadu', country: 'India', lat: 13.0827, lon: 80.2707 },
  hyderabad: { city: 'Hyderabad', state: 'Telangana', country: 'India', lat: 17.385, lon: 78.4867 },
  pune: { city: 'Pune', state: 'Maharashtra', country: 'India', lat: 18.5204, lon: 73.8567 },
  ahmedabad: { city: 'Ahmedabad', state: 'Gujarat', country: 'India', lat: 23.0225, lon: 72.5714 },
  lucknow: {
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    country: 'India',
    lat: 26.8467,
    lon: 80.9462
  },
  patna: { city: 'Patna', state: 'Bihar', country: 'India', lat: 25.5941, lon: 85.1376 },
  jaipur: { city: 'Jaipur', state: 'Rajasthan', country: 'India', lat: 26.9124, lon: 75.7873 },
  kochi: { city: 'Kochi', state: 'Kerala', country: 'India', lat: 9.9312, lon: 76.2673 },
  chandigarh: {
    city: 'Chandigarh',
    state: 'Punjab/Haryana',
    country: 'India',
    lat: 30.7333,
    lon: 76.7794
  },
  guwahati: { city: 'Guwahati', state: 'Assam', country: 'India', lat: 26.1445, lon: 91.7362 },
  lahore: { city: 'Lahore', state: 'Punjab', country: 'Pakistan', lat: 31.5204, lon: 74.3587 },
  dhaka: { city: 'Dhaka', state: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lon: 90.4125 },
  london: {
    city: 'London',
    state: 'England',
    country: 'United Kingdom',
    lat: 51.5074,
    lon: -0.1278
  },
  newyork: {
    city: 'New York City',
    state: 'NY',
    country: 'United States',
    lat: 40.7128,
    lon: -74.006
  }
};

export const DIURNAL_PHASES: DiurnalPhaseRule[] = [
  {
    minHour: 6,
    maxHour: 10,
    timePhase: 'morning_peak',
    phaseLabel: 'Morning Smog Peak',
    slotTitle: 'Morning Heavy Smog — Keep Windows Closed',
    phaseExplainer: 'Cold morning air holds traffic smoke and fine dust down at street level.',
    solarVentilationWindow: false,
    currentUrgentPrescription:
      'Keep all outside doors and windows closed. Turn on your DIY box-fan filter on High, and skip early morning outdoor jogs or walks.'
  },
  {
    minHour: 10,
    maxHour: 13,
    timePhase: 'late_morning',
    phaseLabel: 'Air Warming Up',
    slotTitle: 'Wait for the 1:00 PM Fresh-Air Window',
    phaseExplainer: 'Sunlight is warming the city, slowly loosening trapped pollution.',
    solarVentilationWindow: false,
    currentUrgentPrescription:
      'Keep windows closed for a little longer and leave indoor air filters running. Get ready to open windows for 15 minutes at 1:00 PM.'
  },
  {
    minHour: 13,
    maxHour: 15,
    timePhase: 'solar_window',
    phaseLabel: 'Safe Open-Window Hours',
    slotTitle: '☀️ Best Time to Open Windows (Active Now)',
    phaseExplainer: 'Warm afternoon sun lifts smog upward, making outdoor air exchange safe.',
    solarVentilationWindow: true,
    currentUrgentPrescription:
      'Open opposite windows for 15 minutes right now! This sunny afternoon break clears stale indoor air safely.'
  },
  {
    minHour: 15,
    maxHour: 17,
    timePhase: 'late_afternoon',
    phaseLabel: 'Close Windows Soon',
    slotTitle: 'Time to Shut Windows Before Evening',
    phaseExplainer: 'Cooling afternoon air will soon sink exhaust and dust back near the ground.',
    solarVentilationWindow: false,
    currentUrgentPrescription:
      'Shut all windows and balcony doors before sunset so clean indoor air stays trapped inside for the night.'
  },
  {
    minHour: 17,
    maxHour: 20,
    timePhase: 'evening_rush',
    phaseLabel: 'Evening Traffic & Smog',
    slotTitle: 'Evening Rush Hour — Mask Up Outdoors',
    phaseExplainer: 'Sunset cooling + rush-hour vehicle smoke raise pollution fast near roads.',
    solarVentilationWindow: false,
    currentUrgentPrescription:
      'Wear a tight N95 mask if commuting outdoors, keep home windows closed, and run your indoor air purifier on Medium.'
  }
];

export const NIGHT_PHASE_DEFAULT: Omit<DiurnalPhaseRule, 'minHour' | 'maxHour'> = {
  timePhase: 'night_inversion',
  phaseLabel: 'Night • Keep Closed',
  slotTitle: 'Night Protection — Keep Bedroom Sealed',
  phaseExplainer:
    'Cold night air locks fine pollution close to street level until tomorrow afternoon.',
  solarVentilationWindow: false,
  currentUrgentPrescription:
    'Keep bedroom windows closed tight. Run your DIY fan purifier on quiet Low speed, and lightly wet cotton curtain bottoms to catch incoming dust.'
};
