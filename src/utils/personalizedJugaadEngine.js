/**
 * Personalized Jugaad & Weather-Synchronized Advisory Engine
 * Generates tailored household hacks and AI prompts based on:
 * 1. Current Device Time & Inversion Phase
 * 2. Real-Time Atmospheric Telemetry (AQI, PM2.5, Humidity, Wind)
 * 3. Family Profile (Toddler, Elderly, Asthma, Commuter, Pet, Pregnant, Athlete)
 */

export const familyVulnerabilityProfiles = [
  { id: 'toddler', label: 'Toddler (0-5y)', icon: 'Baby', keyRisk: 'Underdeveloped alveolar capillaries', priorityJugaad: 'Positive-pressure clean nursery' },
  { id: 'elderly', label: 'Elderly (60+)', icon: 'UserCheck', keyRisk: 'Cardiovascular strain & blood pressure spikes', priorityJugaad: 'Continuous HEPA whisper mode' },
  { id: 'asthma', label: 'Asthma / COPD', icon: 'Stethoscope', keyRisk: 'Bronchial airway constriction & wheezing', priorityJugaad: 'Ayurvedic Eucalyptus saline steam' },
  { id: 'commuter', label: 'Open Commuter', icon: 'Bike', keyRisk: 'Direct diesel exhaust & black carbon inhalation', priorityJugaad: 'N95 respirator seal check + pre-commute jaggery' },
  { id: 'pet', label: 'Domestic Pets', icon: 'Dog', keyRisk: 'Ground-level dust breathing & fur particle absorption', priorityJugaad: 'Rock-salted damp paw wipe' },
  { id: 'pregnant', label: 'Pregnant Mother', icon: 'Heart', keyRisk: 'Transplacental fine particle translocation', priorityJugaad: 'Zero outdoor exposure & Parda-Geela draft seal' },
  { id: 'athlete', label: 'Runner / Athlete', icon: 'Flame', keyRisk: 'Deep minute-ventilation alveolar uptake (10x normal)', priorityJugaad: 'Indoor stationary workout during inversion' }
];

export function generatePersonalizedIntelligence({ timeContext, telemetry, vulnerabilities = [] }) {
  const { hour, timePhase, solarVentilationWindow } = timeContext;
  const { aqi, pm2_5, temperatureC, humidityPct, windSpeedKmh, city } = telemetry;

  // 1. Time & Weather-Synchronized Urgent Advisory
  let currentUrgentAdvisory = '';
  let timeIcon = 'Clock';
  let bannerTheme = 'hazel'; // hazel, olive, crimson

  if (solarVentilationWindow) {
    currentUrgentAdvisory = `☀️ Solar Thermal Lift Window ACTIVE in ${city}! Solar radiation has temporarily broken the ground cold pool. Open opposing windows for 15 minutes of rapid air exchange now before the evening inversion forms.`;
    timeIcon = 'Sun';
    bannerTheme = 'olive';
  } else if (timePhase === 'morning_peak') {
    currentUrgentAdvisory = `⚠️ Morning Thermal Inversion Peak: Ground radiative cooling has trapped high particulate density (${pm2_5} μg/m³). Keep all doors sealed and run DIY Box-Fan filters on High.`;
    timeIcon = 'AlertTriangle';
    bannerTheme = 'crimson';
  } else if (timePhase === 'evening_rush') {
    currentUrgentAdvisory = `🚨 Evening Boundary Collapse: Traffic NO2 combined with declining ground temperatures is trapping soot. Commuters must wear sealed N95 respirators. Seal windows now.`;
    timeIcon = 'Wind';
    bannerTheme = 'crimson';
  } else if (timePhase === 'night_inversion') {
    currentUrgentAdvisory = `🌙 Overnight Stagnation Protocol: Cold surface air will maintain elevated indoor particulate infiltration. Run DIY bedroom filtration and use damp curtain hems (Parda-Geela).`;
    timeIcon = 'Moon';
    bannerTheme = 'hazel';
  } else {
    currentUrgentAdvisory = `Mid-day Transition: Inversion layer is gradually lifting. Maintain air purifiers and prepare for the 1:00 PM – 3:00 PM solar ventilation window.`;
    timeIcon = 'Activity';
    bannerTheme = 'hazel';
  }

  // 2. Personalized Jugaad Recommendations matching active vulnerabilities
  const customizedJugaadList = [];

  // Always include core DIY Box-Fan
  customizedJugaadList.push({
    title: '₹1,200 DIY Box-Fan HEPA Purifier',
    category: 'Filtration Core',
    cost: '₹1,250',
    impact: 'Delivers 280-310 CFM CADR. 90% particle reduction in 28 mins.',
    badge: '22x Cost Savings',
    instruction: 'Attach a 20x20 MERV 13 / H13 sheet to the back of a 20-inch box fan with duct tape. Run on medium.'
  });

  if (vulnerabilities.includes('asthma') || vulnerabilities.includes('elderly')) {
    customizedJugaadList.push({
      title: 'Ayurvedic Anti-Smog Bronchial Steam & Mulethi',
      category: 'Respiratory Defense',
      cost: '₹40 (Kitchen)',
      impact: 'Dilates bronchospasms and accelerates ciliary clearance of inhaled carbon soot.',
      badge: 'Immediate Relief',
      instruction: 'Inhale steam infused with Tulsi, Adrak, and 2 drops of Eucalyptus oil for 5 minutes twice daily.'
    });
  }

  if (vulnerabilities.includes('toddler') || vulnerabilities.includes('pregnant')) {
    customizedJugaadList.push({
      title: 'Parda-Geela Window Draft Electrostatic Trap',
      category: 'Perimeter Barrier',
      cost: '₹0 (Zero Cost)',
      impact: 'Traps 62% of drafting particulate soot without blocking ambient air.',
      badge: 'Nursery Defense',
      instruction: 'Moisten bottom 6 inches of cotton window curtains with water. Electrostatic surface tension traps soot.'
    });
  }

  // Harvard mopping hack is universally recommended
  customizedJugaadList.push({
    title: 'Rock-Salt Wet Mopping (Namak Pochha)',
    category: 'Dust Suppression',
    cost: '₹20 / month',
    impact: 'Replaces dry brooming (which causes a 340% dust spike). Locks fine floor soot.',
    badge: 'Harvard Backed',
    instruction: 'Dissolve 2 spoons of rock salt in warm water. Mop with micro-fiber cloth; never dry-sweep during smog.'
  });

  if (vulnerabilities.includes('commuter')) {
    customizedJugaadList.push({
      title: 'Raw Jaggery (Gur) Heavy-Metal Chelator',
      category: 'Metabolic Defense',
      cost: '₹30',
      impact: 'Traditional iron-rich complex aiding bronchial mucous expulsion after road exposure.',
      badge: 'Commuter Hack',
      instruction: 'Consume a 10g piece of unrefined raw jaggery with warm water immediately after returning from road transit.'
    });
  }

  // 3. Tailored Prompt for ChatGPT, Claude, and Gemini
  const activeVulnNames = vulnerabilities.length > 0 ? vulnerabilities.join(', ') : 'standard urban household';
  const customAiPrompt = `Act as an elite atmospheric physicist and clinical pulmonologist.
Location: ${city}
Current Time: ${timeContext.timeString} (${timeContext.phaseLabel})
Current Weather: ${temperatureC}°C, ${humidityPct}% humidity, wind ${windSpeedKmh} km/h
Air Quality Index: AQI ${aqi} (PM2.5: ${pm2_5} μg/m³ — toxic equivalent of smoking ${(pm2_5 / 22).toFixed(1)} cigarettes/day per Berkeley Earth)
Household Profile: ${activeVulnNames}

Given the current time of day (${timeContext.timeString}) and exact meteorological conditions:
1. Provide an immediate 3-step action plan for this exact hour (including whether to seal or ventilate).
2. Recommend the best low-cost Desi Jugaad indoor air defense hacks specifically tailored to ${activeVulnNames}.
3. Explain the physics of boundary layer inversion occurring right now and how to protect our lungs.`;

  return {
    currentUrgentAdvisory,
    bannerTheme,
    customizedJugaadList,
    customAiPrompt
  };
}
