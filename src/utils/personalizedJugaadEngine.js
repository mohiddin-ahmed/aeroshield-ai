/**
 * @module utils/personalizedJugaadEngine
 * Personalized Desi Jugaad & Situational Advisory Engine.
 * Evaluates 9 urban family vulnerability profiles against diurnal inversion phase and weather telemetry.
 */

import { BERKELEY_EARTH_PM25_PER_CIGARETTE } from '../constants/airQuality';
import { sanitizeText, sanitizeVulnerabilities } from './inputValidator';

/** Catalog of 9 distinct urban household risk profiles supported in VayuMitra OS. */
export const familyVulnerabilityProfiles = [
  { id: 'toddler', label: 'Toddler (0-5y)', icon: 'Baby', keyRisk: 'Underdeveloped alveolar capillaries and 2x higher respiratory rate.', priorityJugaad: 'Positive-pressure clean nursery' },
  { id: 'elderly', label: 'Elderly (60+)', icon: 'UserCheck', keyRisk: 'Cardiovascular strain, arterial plaque rupture & stroke risk.', priorityJugaad: 'Continuous HEPA whisper mode' },
  { id: 'asthma', label: 'Asthma / COPD', icon: 'Stethoscope', keyRisk: 'Acute bronchospasm, mucosal edema and night wheezing.', priorityJugaad: 'Ayurvedic Eucalyptus saline steam' },
  { id: 'commuter', label: 'Open Commuter', icon: 'Bike', keyRisk: 'Direct diesel soot, elemental carbon & road-dust inhalation.', priorityJugaad: 'N95 respirator seal check + raw jaggery' },
  { id: 'pet', label: 'Domestic Pets', icon: 'Dog', keyRisk: 'Close-to-floor toxic dust breathing & fur particle absorption.', priorityJugaad: 'Rock-salted damp paw wipe' },
  { id: 'pregnant', label: 'Pregnant Mother', icon: 'Heart', keyRisk: 'Transplacental fine particle translocation affecting fetal growth.', priorityJugaad: 'Zero outdoor exposure & Parda-Geela draft seal' },
  { id: 'athlete', label: 'Runner / Athlete', icon: 'Flame', keyRisk: 'Deep minute-ventilation alveolar uptake (10x normal breathing volume).', priorityJugaad: 'Indoor stationary workout during inversion' },
  { id: 'student', label: 'Student / Exam Prep', icon: 'GraduationCap', keyRisk: 'Cognitive fatigue, hypoxia and headaches from indoor CO2 + smog.', priorityJugaad: 'Solar window fresh air exchange' },
  { id: 'renter', label: 'Apartment Renter', icon: 'Building', keyRisk: 'Leaky window frames and inability to install structural HVAC.', priorityJugaad: 'Low-cost DIY portable Box-Fan filtration' }
];

const CORE_JUGAAD_PROTOCOLS = [
  {
    id: 'diy-box-fan',
    title: '₹1,200 DIY Box-Fan HEPA Purifier (Corsi-Rosenthal Minimal)',
    hindiTitle: 'देसी बॉक्स-फैन एयर प्यूरीफायर',
    category: 'Filtration Core',
    cost: '₹1,250 (Total Build)',
    commercialEquiv: '₹24,000 Branded Unit',
    impact: 'Delivers 280-310 CFM Clean Air Delivery Rate (CADR). Cleans a 200 sq.ft room in 28 minutes.',
    badge: '22x Cost Savings',
    instruction: 'Attach a 20x20 MERV 13 / H13 sheet to the back of a standard 20-inch box fan with duct tape. Run on medium.',
    materialsNeeded: [
      '1x Standard 20-inch Box Fan (Havells, Orient, or local electrical store — ₹850 to ₹950)',
      '1x 20x20x1 inch MERV 13 or H13 HEPA Filter Sheet (HVAC supply or online — ₹350 to ₹450)',
      '1x Roll of Standard Packing Duct Tape (₹40)'
    ],
    detailedSteps: [
      'Unbox the 20-inch box fan and identify the rear intake suction side (air is drawn from the back and expelled forward).',
      'Place the 20x20 MERV 13 filter flush against the rear grille with the airflow arrow pointing forward TOWARD the fan blades.',
      'Use duct tape to seal all four edges tightly around the frame so unfiltered air cannot bypass the media.',
      'Elevate the unit 1 foot off the floor in the center of the room and run on Medium speed to cycle room air ~5 times/hour.'
    ],
    scientificMechanism: 'Fluid dynamic boundary resistance draws high-volume airflow through dense electrostatic microfibers, capturing over 90% of respirable PM2.5 and combustion soot.',
    safetyTips: 'Never obstruct the front exhaust grille. Verify continuous-duty fan motor rating before unattended overnight use.'
  },
  {
    id: 'parda-geela',
    title: 'Parda-Geela Window Draft Electrostatic Soot Shield',
    hindiTitle: 'पर्दा-गीला सूट ट्रैप',
    category: 'Perimeter Barrier',
    cost: '₹0 (Zero Cost)',
    commercialEquiv: '₹8,000 Window Air Curtain',
    impact: 'Traps up to 62% of drafting particulate soot without blocking daylight or natural airflow.',
    badge: 'Nursery & Bedroom',
    instruction: 'Moisten bottom 6 inches of cotton window curtains with water. Surface moisture traps entering soot.',
    materialsNeeded: [
      'Standard 100% Cotton Window Curtains (already in your home)',
      'Clean Water Spray Bottle or Damp Cloth'
    ],
    detailedSteps: [
      'Spray or dip the bottom 6 to 8 inches of your cotton window curtains in clean water so they are evenly damp.',
      'Ensure curtains hang flush against window sills and gap drafts.',
      'Re-moisten twice daily (8:00 AM and 6:00 PM) during peak inversion periods.'
    ],
    scientificMechanism: 'High surface-tension moisture films attract hydrophobic carbon soot particles via capillary adhesion and electrostatic forces.',
    safetyTips: 'Wash cotton curtains with warm water every 4 days to clear trapped particulates and prevent damp mold growth.'
  },
  {
    id: 'namak-pochha',
    title: 'Rock-Salt Wet Mopping (Namak Pochha)',
    hindiTitle: 'सेंधा नमक पोछा',
    category: 'Dust Suppression',
    cost: '₹20 / month',
    commercialEquiv: '₹12,000 HEPA Vacuum',
    impact: 'Replaces dry brooming (which triggers a 340% dust spike) and locks fine settled soot to the mop.',
    badge: 'Harvard Backed',
    instruction: 'Dissolve 2 spoons of rock salt in warm water and damp-mop with microfiber; avoid dry-sweeping during smog.',
    materialsNeeded: [
      '2 Tablespoons of Rock Salt / Sea Salt (Sendha Namak)',
      '1 Bucket of Warm Water',
      'Micro-Fiber Flat Mop'
    ],
    detailedSteps: [
      'Dissolve 2 tablespoons of rock salt completely into a bucket of warm water.',
      'Soak the microfiber mop, wring out excess water, and mop floors in smooth overlapping strokes.',
      'Avoid traditional dry straw brooms (jhadu) while inversion AQI exceeds 150.'
    ],
    scientificMechanism: 'Harvard T.H. Chan chamber studies show dry sweeping resuspends 340% more respirable PM2.5, whereas saline damp mopping binds settled polycyclic soot.',
    safetyTips: 'Replace bucket water between bedrooms so heavy dust is not spread across living spaces.'
  }
];

const RESPIRATORY_STEAM_PROTOCOL = {
  id: 'ayurvedic-steam',
  title: 'Ayurvedic Anti-Smog Bronchial Steam & Mulethi Decoction',
  hindiTitle: 'आयुर्वेदिक काढ़ा एवं भाप',
  category: 'Respiratory Defense',
  cost: '₹40 (Kitchen Staples)',
  commercialEquiv: '₹3,500 Medical Nebulizer',
  impact: 'Soothes bronchial passages, loosens thick phlegm, and supports mucociliary clearance.',
  badge: 'Immediate Relief',
  instruction: 'Inhale steam infused with Tulsi, Ginger, and 2 drops of Eucalyptus oil for 5 minutes twice daily.',
  materialsNeeded: [
    '5-6 Fresh Tulsi Leaves',
    '1-inch Crushed Ginger Root (Adrak)',
    '1 piece of Liquorice Root (Mulethi)',
    '2 drops of Pure Eucalyptus Oil'
  ],
  detailedSteps: [
    'Simmer 500 ml water with Tulsi leaves, crushed Ginger, and Mulethi for 7 minutes.',
    'Remove from heat, add 2 drops of Eucalyptus oil, and inhale gently from a safe 10-inch distance for 5 minutes.',
    'Sip a warm glass of the strained Tulsi-Mulethi decoction.'
  ],
  scientificMechanism: 'Hydrated saline/herbal vapor restores impaired mucociliary transport along upper airways exposed to dry winter soot.',
  safetyTips: 'Keep face at least 10 inches above hot water to prevent thermal irritation; never leave unsupervised with young children.'
};

const COMMUTER_JAGGERY_PROTOCOL = {
  id: 'gur-chelator',
  title: 'Raw Jaggery (Gur) & Warm Water Throat-Clearing Protocol',
  hindiTitle: 'कच्चा गुड़ व गर्म पानी',
  category: 'Metabolic Defense',
  cost: '₹30 / week',
  commercialEquiv: '₹1,500 Detox Supplements',
  impact: 'Traditional post-commute ritual aiding pharyngeal mucociliary clearance after diesel exhaust exposure.',
  badge: 'Commuter Hack',
  instruction: 'Consume 10g of unrefined dark jaggery with lukewarm water after returning from heavy traffic transit.',
  materialsNeeded: [
    '10g Organic Unrefined Dark Jaggery (Gur)',
    '1 Glass of Lukewarm Water'
  ],
  detailedSteps: [
    'Immediately upon returning from outdoor commute, wash hands and gargle with lukewarm water.',
    'Chew a 10g piece of unrefined chemical-free dark jaggery slowly.',
    'Follow with one glass of warm water.'
  ],
  scientificMechanism: 'Historical Indian occupational hygiene practices used unrefined jaggery to stimulate gentle pharyngeal secretions after airborne soot exposure.',
  safetyTips: 'Diabetic or sugar-restricted individuals should consult a healthcare provider before use.'
};

/**
 * Generates live situational advisories, vulnerability-filtered Desi Jugaad protocols,
 * and a synchronized Multi-AI contextual prompt.
 * @param {object} params - Time, telemetry, and active vulnerability flags.
 * @returns {{
 *   currentUrgentAdvisory: string,
 *   bannerTheme: string,
 *   customizedJugaadList: object[],
 *   customAiPrompt: string
 * }} Personalized clean-air intelligence payload.
 */
export function generatePersonalizedIntelligence({
  timeContext = {},
  telemetry = {},
  vulnerabilities = []
}) {
  const { timePhase, solarVentilationWindow, timeString = 'now', phaseLabel = 'Current Phase' } =
    timeContext;
  const {
    aqi = 300,
    pm2_5 = 180,
    temperatureC = 18,
    humidityPct = 70,
    windSpeedKmh = 6,
    city = 'New Delhi'
  } = telemetry;

  const safeCity = sanitizeText(city, 80) || 'your area';
  const safeVulns = sanitizeVulnerabilities(vulnerabilities);

  let currentUrgentAdvisory = '';
  let bannerTheme = 'hazel';

  if (solarVentilationWindow) {
    currentUrgentAdvisory = `Solar Thermal Lift Window ACTIVE in ${safeCity}! Peak solar radiation has temporarily broken the ground cold pool. Open opposing windows for 15 minutes of rapid air exchange right now before evening inversion reformulates.`;
    bannerTheme = 'olive';
  } else if (timePhase === 'morning_peak') {
    currentUrgentAdvisory = `Morning Thermal Inversion Peak: Ground radiative cooling has trapped high particulate density (${pm2_5} μg/m³). Keep all doors and windows sealed and run DIY Box-Fan filters on High.`;
    bannerTheme = 'crimson';
  } else if (timePhase === 'evening_rush') {
    currentUrgentAdvisory = 'Evening Boundary Collapse: Traffic NO2 combined with cooling ground air is trapping exhaust. Commuters must wear sealed N95 respirators and seal all home windows.';
    bannerTheme = 'crimson';
  } else if (timePhase === 'night_inversion') {
    currentUrgentAdvisory = 'Overnight Stagnation Protocol: Cold surface air maintains elevated soot infiltration overnight. Run bedroom filtration on medium whisper mode and dampen curtain hems (Parda-Geela).';
    bannerTheme = 'hazel';
  } else {
    currentUrgentAdvisory = 'Mid-day Boundary Expansion: Ground warming is underway. Maintain indoor air filtration and prepare for the 1:00 PM – 3:00 PM solar ventilation window.';
    bannerTheme = 'hazel';
  }

  if (humidityPct > 80 && aqi > 200) {
    currentUrgentAdvisory +=
      ' (High Humidity Alert: Moisture is binding to fine particulates—avoid unheated mist humidifiers).';
  }

  const customizedJugaadList = [...CORE_JUGAAD_PROTOCOLS];
  if (safeVulns.some((v) => v === 'asthma' || v === 'elderly' || v === 'commuter')) {
    customizedJugaadList.push(RESPIRATORY_STEAM_PROTOCOL);
  }
  if (safeVulns.some((v) => v === 'commuter' || v === 'athlete')) {
    customizedJugaadList.push(COMMUTER_JAGGERY_PROTOCOL);
  }

  const activeVulnNames =
    safeVulns.length > 0 ? safeVulns.join(', ') : 'standard urban household';
  const cigEquiv = (pm2_5 / BERKELEY_EARTH_PM25_PER_CIGARETTE).toFixed(1);

  const customAiPrompt = `Act as an elite atmospheric physicist and clinical pulmonologist.
Location: ${safeCity}
Current Time: ${timeString} (${phaseLabel})
Current Weather: ${temperatureC}°C, ${humidityPct}% humidity, wind ${windSpeedKmh} km/h
Air Quality Index: AQI ${aqi} (PM2.5: ${pm2_5} μg/m³ — toxic equivalent of smoking ${cigEquiv} cigarettes/day per Berkeley Earth)
Household Profile: ${activeVulnNames}

Given the current time of day (${timeString}) and exact meteorological conditions:
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
