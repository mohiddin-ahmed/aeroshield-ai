/**
 * CADR & Clean Air Math Engine
 * Calculates Clean Air Delivery Rate (CADR) & Air Changes per Hour (ACH)
 * Based on EPA, Harvard T.H. Chan and ANSI/AHAM AC-1 standards.
 */

/**
 * Calculates required airflow for a room to achieve target ACH.
 * Room volume = roomSqft * ceilingHeightFt (default 9ft).
 * Formula: Required CFM = (Volume * Target ACH) / 60
 */
export function calculateRequiredCfm(roomSqft, targetAch = 5, ceilingHeightFt = 9) {
  const volumeCuFt = roomSqft * ceilingHeightFt;
  return Math.round((volumeCuFt * targetAch) / 60);
}

/**
 * Calculates DIY Box-Fan HEPA Purifier Performance & Cost Efficiency.
 * 20" Box Fan produces ~1,200 CFM free air.
 * With MERV 13 / H13 HEPA sheet, static pressure drops flow to ~320 CFM with ~90% single-pass PM2.5 capture.
 */
export function calculateDiyPurifierStats(roomSqft = 200, fanSpeed = 'medium') {
  const speedMultipliers = {
    low: { cfm: 220, efficiency: 0.94, noiseDb: 42, watts: 38 },
    medium: { cfm: 310, efficiency: 0.91, noiseDb: 51, watts: 55 },
    high: { cfm: 420, efficiency: 0.86, noiseDb: 62, watts: 82 }
  };

  const selected = speedMultipliers[fanSpeed] || speedMultipliers.medium;
  const effectiveCadrCfm = Math.round(selected.cfm * selected.efficiency);

  const roomVolumeCuFt = roomSqft * 9;
  const achievedAch = Number(((effectiveCadrCfm * 60) / roomVolumeCuFt).toFixed(1));

  // Commercial comparison (e.g., ₹24,000 branded purifier producing ~250 CFM CADR)
  const diyCostInr = 1250; // ₹850 20" Box Fan + ₹400 MERV 13 filter sheet + duct tape
  const commercialCostInr = 24000;
  const costPerCfmDiy = Number((diyCostInr / effectiveCadrCfm).toFixed(2));
  const costPerCfmCommercial = Number((commercialCostInr / 250).toFixed(2));
  const costSavingsMultiple = Number((commercialCostInr / diyCostInr).toFixed(1));

  // Time to achieve 90% particle reduction in room
  // t90 = ln(10) / ACH = 2.3026 / ACH hours in minutes
  const timeTo90ReductionMin = Math.round((2.3026 / Math.max(achievedAch, 0.5)) * 60);

  return {
    effectiveCadrCfm,
    achievedAch,
    roomSqft,
    fanSpeed,
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
