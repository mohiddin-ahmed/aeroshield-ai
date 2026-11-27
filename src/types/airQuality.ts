/**
 * @module types/airQuality
 * Domain TypeScript contracts for AeroShield AI (VayuMitra OS).
 */

export type TabId = 'commandCenter' | 'routine' | 'jugaad' | 'research';

export type AqiCategoryName = 'Good' | 'Moderate' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';

export type FanSpeed = 'low' | 'medium' | 'high';

export type SupportedLanguageCode = 'en' | 'hi' | 'bn' | 'te' | 'ta' | 'kn' | 'mr';

export type DiurnalPhaseId =
  | 'morning_peak'
  | 'late_morning'
  | 'solar_window'
  | 'late_afternoon'
  | 'evening_rush'
  | 'night_inversion';

export interface AirQualityTelemetry {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  aqi: number;
  category: AqiCategoryName;
  categoryColor: string;
  inversionRisk: string;
  primaryPollutant: string;
  pm2_5: number;
  pm10: number;
  no2: number;
  so2: number;
  ozone: number;
  cigaretteEquivDaily: number;
  temperatureC: number;
  humidityPct: number;
  windSpeedKmh: number;
  summary: string;
  advisoryPills: string[];
  isLiveFeed?: boolean;
  timestamp?: string;
}

export interface LocationData {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  isAutoDetected: boolean;
  source?: 'gps' | 'timezone' | 'preset';
  timezone?: string;
}

export interface TimeContext {
  hour: number;
  minutes: number;
  timeString: string;
  dateString: string;
  timePhase: DiurnalPhaseId;
  phaseLabel: string;
  slotTitle: string;
  phaseExplainer: string;
  currentUrgentPrescription: string;
  solarVentilationWindow: boolean;
}

export interface SolarWindowStatus {
  isWindowActive: boolean;
  isBeforeWindow: boolean;
  isAfterWindow: boolean;
  currentHour: number;
  statusText: string;
  badgeColor: string;
  thermalLiftIntensity: number;
  safeAction: string;
}

export interface RightNowActionBox {
  id: string;
  badge: string;
  title: string;
  detail: string;
}

export interface JugaadProtocol {
  id: string;
  title: string;
  hindiTitle: string;
  category: string;
  cost: string;
  commercialEquiv: string;
  impact: string;
  badge: string;
  instruction: string;
  materialsNeeded: string[];
  detailedSteps: string[];
  scientificMechanism: string;
  safetyTips: string;
}

export interface PersonalizedIntelligence {
  currentUrgentAdvisory: string;
  actionBoxes: RightNowActionBox[];
  bannerTheme: 'olive' | 'hazel' | 'crimson';
  customizedJugaadList: JugaadProtocol[];
  customAiPrompt: string;
}

export interface DailyRoutineStep {
  time: string;
  action: string;
  scientific_reason: string;
}

export interface JugaadPrescription {
  name: string;
  cost_inr: number;
  step: string;
}

export interface DosimetryImpact {
  pm25_avoided_ug: number;
  cigarettes_avoided: number;
  co2_offset_kg: number;
}

export interface SmogDefensePlan {
  assessment: string;
  daily_routine: DailyRoutineStep[];
  jugaad_prescriptions?: JugaadPrescription[];
  dosimetry_impact?: DosimetryImpact;
}

export interface PromptLogEntry {
  id: string;
  timestamp: string;
  taskName: string;
  systemInstruction: string;
  userPrompt: string;
  model: string;
  temperature: number;
  response: unknown;
  isMock: boolean;
  latencyMs: number;
  tokenCount: number | null;
  error: string | null;
}

export interface CadrStats {
  effectiveCadrCfm: number;
  achievedAch: number;
  roomSqft: number;
  fanSpeed: FanSpeed;
  noiseDb: number;
  powerWatts: number;
  diyCostInr: number;
  commercialCostInr: number;
  costSavingsMultiple: number;
  costPerCfmDiy: number;
  costPerCfmCommercial: number;
  timeTo90ReductionMin: number;
  recommendedForRoom: boolean;
}

export interface ResearchArticle {
  id: string;
  slug: string;
  title: string;
  journal: string;
  year: number;
  authors: string;
  doi: string;
  category: string;
  keyTakeaway: string;
  exposureReductionUg: number;
  citationApa: string;
  summary: string;
  evidenceScore: string;
}

export interface DailyDefenseAction {
  id: string;
  label: string;
  hint: string;
  reductionShare: number;
}

export interface DailyChecklistSummary {
  completedCount: number;
  totalCount: number;
  protectionPercent: number;
  pm25SavedTodayUg: number;
  cigarettesSavedToday: number;
  streakDays: number;
  householdName: string;
}

export interface FamilyProfileMeta {
  id: string;
  label: string;
  icon: string;
  keyRisk: string;
  priorityJugaad: string;
}

export interface CityPreset {
  city: string;
  state: string;
  country: string;
  lat: number;
  lon: number;
}
