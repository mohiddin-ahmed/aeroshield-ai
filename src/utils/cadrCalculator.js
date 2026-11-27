/**
 * @module utils/cadrCalculator
 * CADR & Clean Air Math Engine based on US EPA, Harvard T.H. Chan, and ANSI/AHAM AC-1 standards.
 */

import {
  DEFAULT_CEILING_HEIGHT_FT,
  DEFAULT_ROOM_SQFT,
  MAX_ROOM_SQFT,
  MIN_ROOM_SQFT
} from '../constants/airQuality';
import { clampNumber } from './inputValidator';

const SPEED_MULTIPLIERS = {
  low: { cfm: 220, efficiency: 0.94, noiseDb: 42, watts: 38 },
  medium: { cfm: 310, efficiency: 0.91, noiseDb: 51, watts: 55 },
  high: { cfm: 420, efficiency: 0.86, noiseDb: 62, watts: 82 }
};

/**
 * Calculates required airflow (CFM) for a room to achieve target Air Changes per Hour (ACH).
 * Formula: Required CFM = (Volume * Target ACH) / 60.
 * @param {number} roomSqft - Floor area in square feet.
 * @param {number} [targetAch=5] - Desired full room air exchanges per hour.
 * @param {number} [ceilingHeightFt=9] - Room height in feet.
 * @returns {number} Required Clean Air Delivery Rate in CFM.
 */
export function calculateRequiredCfm(
  roomSqft,
  targetAch = 5,
  ceilingHeightFt = DEFAULT_CEILING_HEIGHT_FT
) {
  const safeSqft = clampNumber(roomSqft, MIN_ROOM_SQFT, MAX_ROOM_SQFT, DEFAULT_ROOM_SQFT);
  const safeAch = clampNumber(targetAch, 1, 20, 5);
  const safeHeight = clampNumber(ceilingHeightFt, 6, 30, DEFAULT_CEILING_HEIGHT_FT);
  const volumeCuFt = safeSqft * safeHeight;
  return Math.round((volumeCuFt * safeAch) / 60);
}

/**
 * Calculates DIY Box-Fan + MERV 13 / HEPA Purifier performance and cost efficiency vs commercial units.
 * @param {number} [roomSqft=200] - Target room floor area in square feet (clamped 50–2000).
 * @param {'low'|'medium'|'high'} [fanSpeed='medium'] - Operating speed setting.
 * @returns {object} Fluid dynamics output metrics (CADR, ACH, noise, power, savings, clean time).
 */
export function calculateDiyPurifierStats(roomSqft = 200, fanSpeed = 'medium') {
  const safeSqft = clampNumber(roomSqft, MIN_ROOM_SQFT, MAX_ROOM_SQFT, 200);
  const selected = SPEED_MULTIPLIERS[fanSpeed] || SPEED_MULTIPLIERS.medium;
  const normalizedSpeed = SPEED_MULTIPLIERS[fanSpeed] ? fanSpeed : 'medium';
  const effectiveCadrCfm = Math.round(selected.cfm * selected.efficiency);

  const roomVolumeCuFt = safeSqft * DEFAULT_CEILING_HEIGHT_FT;
  const achievedAch = Number(((effectiveCadrCfm * 60) / roomVolumeCuFt).toFixed(1));

  // Commercial baseline: ₹24,000 branded HEPA purifier delivering ~250 CFM CADR
  const diyCostInr = 1250;
  const commercialCostInr = 24000;
  const costPerCfmDiy = Number((diyCostInr / effectiveCadrCfm).toFixed(2));
  const costPerCfmCommercial = Number((commercialCostInr / 250).toFixed(2));
  const costSavingsMultiple = Number((commercialCostInr / diyCostInr).toFixed(1));

  // First-order decay: t90 = ln(10) / ACH hours expressed in minutes
  const timeTo90ReductionMin = Math.round((2.3026 / Math.max(achievedAch, 0.5)) * 60);

  return {
    effectiveCadrCfm,
    achievedAch,
    roomSqft: safeSqft,
    fanSpeed: normalizedSpeed,
    noiseDb: selected.noiseDb,
    powerWatts: selected.watts,
    diyCostInr,
    commercialCostInr,
    costSavingsMultiple,
    costPerCfmDiy,
    costPerCfmCommercial,
    timeTo90ReductionMin,
    recommendedForRoom: achievedAch >= 4.5
  };
}
