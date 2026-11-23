import { describe, it, expect } from 'vitest';
import { calculateRequiredCfm, calculateDiyPurifierStats } from '../src/utils/cadrCalculator';
import { getSolarWindowStatus } from '../src/utils/solarWindowEngine';
import { getAqiCategory, calculateCigarettesFromPm25 } from '../src/services/airQualityService';
import { researchArticles } from '../src/services/researchArticlesData';
import { generateSmogDefensePlan } from '../src/services/gemini';
import { getDetailedTimeContext } from '../src/utils/geolocationEngine';
import { generatePersonalizedIntelligence } from '../src/utils/personalizedJugaadEngine';

describe('AeroShield AI: Mathematical & Atmospheric Engine Tests', () => {

  it('calculates required CADR correctly for a room', () => {
    // 200 sq ft room with 9ft ceiling = 1800 cu ft
    // At 5 ACH: (1800 * 5) / 60 = 150 CFM required
    const requiredCfm = calculateRequiredCfm(200, 5, 9);
    expect(requiredCfm).toBe(150);
  });

  it('computes DIY Box-Fan HEPA Purifier statistics and cost-efficiency', () => {
    const stats = calculateDiyPurifierStats(200, 'medium');
    expect(stats.effectiveCadrCfm).toBeGreaterThan(250);
    expect(stats.effectiveCadrCfm).toBeLessThan(350);
    expect(stats.achievedAch).toBeGreaterThan(5.0);
    expect(stats.costSavingsMultiple).toBeGreaterThan(15); // > 15x cheaper than commercial
    expect(stats.diyCostInr).toBe(1250);
  });

  it('correctly calculates the 1:00 PM – 3:00 PM Solar Thermal Lift Window', () => {
    // Test at 2:00 PM (14:00)
    const activeDate = new Date();
    activeDate.setHours(14, 0, 0, 0);
    const activeStatus = getSolarWindowStatus(activeDate);
    expect(activeStatus.isWindowActive).toBe(true);
    expect(activeStatus.thermalLiftIntensity).toBe(85);

    // Test at 8:00 AM (08:00)
    const morningDate = new Date();
    morningDate.setHours(8, 0, 0, 0);
    const morningStatus = getSolarWindowStatus(morningDate);
    expect(morningStatus.isWindowActive).toBe(false);
    expect(morningStatus.isBeforeWindow).toBe(true);

    // Test at 9:00 PM (21:00)
    const nightDate = new Date();
    nightDate.setHours(21, 0, 0, 0);
    const nightStatus = getSolarWindowStatus(nightDate);
    expect(nightStatus.isWindowActive).toBe(false);
    expect(nightStatus.isAfterWindow).toBe(true);
  });

  it('validates Berkeley Earth cigarette equivalence rule', () => {
    // 22 μg/m³ = 1 cigarette
    expect(calculateCigarettesFromPm25(22)).toBe(1.0);
    // 550 μg/m³ = 25 cigarettes
    expect(calculateCigarettesFromPm25(550)).toBe(25.0);
    // 660 μg/m³ = 30 cigarettes
    expect(calculateCigarettesFromPm25(660)).toBe(30.0);
    // Zero exposure
    expect(calculateCigarettesFromPm25(0)).toBe(0);
  });

  it('categorizes US AQI thresholds properly', () => {
    expect(getAqiCategory(35).category).toBe('Good');
    expect(getAqiCategory(75).category).toBe('Moderate');
    expect(getAqiCategory(160).category).toBe('Unhealthy');
    expect(getAqiCategory(260).category).toBe('Very Unhealthy');
    expect(getAqiCategory(425).category).toBe('Hazardous');
    expect(getAqiCategory(425).color).toBe('#9B2226');
  });

  it('verifies peer-reviewed research papers and academic citations integrity', () => {
    expect(researchArticles.length).toBeGreaterThanOrEqual(5);
    const berkeley = researchArticles.find(a => a.id === 'berkeley-earth-cigarette-rule');
    expect(berkeley).toBeDefined();
    expect(berkeley.doi).toBeDefined();
    expect(berkeley.keyTakeaway).toContain('22 μg/m³');

    const lancet = researchArticles.find(a => a.id === 'lancet-planetary-health-2023');
    expect(lancet).toBeDefined();
  });

  it('executes GenAI Smog Defense Plan with offline resilience fallback', async () => {
    const plan = await generateSmogDefensePlan({
      city: 'New Delhi',
      aqi: 425,
      pm25: 320,
      vulnerabilities: ['toddler', 'asthma']
    });

    expect(plan.success).toBe(true);
    expect(plan.data).toBeDefined();
    expect(plan.data.assessment).toBeDefined();
    expect(plan.data.daily_routine).toHaveLength(4);
    expect(plan.data.dosimetry_impact.cigarettes_avoided).toBeGreaterThan(0);
  });

  it('accurately resolves detailed time context and inversion phase', () => {
    const testDate = new Date();
    testDate.setHours(14, 15, 0, 0); // 2:15 PM
    const context = getDetailedTimeContext(testDate);
    expect(context.solarVentilationWindow).toBe(true);
    expect(context.timePhase).toBe('solar_window');
  });

  it('generates personalized Jugaad and custom AI prompt for active profile', () => {
    const testDate = new Date();
    testDate.setHours(8, 0, 0, 0); // Morning peak
    const timeCtx = getDetailedTimeContext(testDate);
    const mockTelemetry = {
      city: 'New Delhi',
      aqi: 425,
      pm2_5: 320,
      temperatureC: 16,
      humidityPct: 80,
      windSpeedKmh: 4
    };

    const intel = generatePersonalizedIntelligence({
      timeContext: timeCtx,
      telemetry: mockTelemetry,
      vulnerabilities: ['asthma', 'toddler']
    });

    expect(intel.currentUrgentAdvisory).toContain('Morning Thermal Inversion Peak');
    expect(intel.customizedJugaadList.length).toBeGreaterThanOrEqual(3);
    expect(intel.customAiPrompt).toContain('asthma, toddler');
  });


});
