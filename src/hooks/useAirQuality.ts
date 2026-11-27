import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_VULNERABILITIES, TELEMETRY_REFRESH_INTERVAL_MS } from '../constants/airQuality';
import { mockCitiesAirQuality } from '../data/mockAirQualityData';
import { fetchLiveAirQuality } from '../services/airQualityService';
import { generateSmogDefensePlan } from '../services/gemini';
import type {
  AirQualityTelemetry,
  LocationData,
  PersonalizedIntelligence,
  SmogDefensePlan,
  SolarWindowStatus,
  TimeContext
} from '../types/airQuality';
import {
  detectDeviceLocation,
  getDetailedTimeContext,
  MAJOR_CITIES_CATALOG
} from '../utils/geolocationEngine';
import { sanitizeCityKey } from '../utils/inputValidator';
import { logError, logWarning } from '../utils/logger';
import { generatePersonalizedIntelligence } from '../utils/personalizedJugaadEngine';
import { getPromptLogs } from '../utils/promptLogger';
import { getSolarWindowStatus } from '../utils/solarWindowEngine';

export interface UseAirQualityResult {
  locationData: LocationData;
  timeContext: TimeContext;
  isRefreshingLocation: boolean;
  telemetry: AirQualityTelemetry;
  solarStatus: SolarWindowStatus;
  vulnerabilities: string[];
  aiPlan: SmogDefensePlan | null;
  isGenerating: boolean;
  isLoadingTelemetry: boolean;
  promptCount: number;
  personalizedIntel: PersonalizedIntelligence;
  handleAutoDetectLocation: () => Promise<void>;
  handleManualCityChange: (cityKey: string) => Promise<void>;
  handleGeneratePlan: () => Promise<boolean>;
  handleToggleVulnerability: (id: string) => void;
  clearAiPlan: () => void;
}

/**
 * Orchestrates live Open-Meteo air quality telemetry, GPS/timezone location detection,
 * diurnal solar lift state, family vulnerabilities, and Gemini AI defense plan generation.
 * @returns Synchronized atmospheric state, computed intelligence, and action handlers.
 */
export function useAirQuality(): UseAirQualityResult {
  const [locationData, setLocationData] = useState<LocationData>({
    city: 'Bengaluru',
    country: 'India',
    latitude: 12.9716,
    longitude: 77.5946,
    isAutoDetected: false
  });
  const [timeContext, setTimeContext] = useState<TimeContext>(() => getDetailedTimeContext());
  const [isRefreshingLocation, setIsRefreshingLocation] = useState(false);

  const [telemetry, setTelemetry] = useState<AirQualityTelemetry>(mockCitiesAirQuality.delhi);
  const [solarStatus, setSolarStatus] = useState<SolarWindowStatus>(() => getSolarWindowStatus());
  const [vulnerabilities, setVulnerabilities] = useState<string[]>(DEFAULT_VULNERABILITIES);

  const [aiPlan, setAiPlan] = useState<SmogDefensePlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingTelemetry, setIsLoadingTelemetry] = useState(false);
  const [promptCount, setPromptCount] = useState(0);

  /**
   * Auto-detects GPS/timezone coordinates and loads matching atmospheric telemetry.
   */
  const handleAutoDetectLocation = useCallback(async () => {
    setIsRefreshingLocation(true);
    try {
      const detected = await detectDeviceLocation();
      setLocationData(detected);

      const liveData = await fetchLiveAirQuality('custom', {
        lat: detected.latitude,
        lon: detected.longitude
      });
      setTelemetry({
        ...liveData,
        city: detected.city || liveData.city,
        country: detected.country || liveData.country
      });
    } catch (error) {
      logWarning('useAirQuality', 'Geolocation detection fallback engaged', error);
    } finally {
      setIsRefreshingLocation(false);
    }
  }, []);

  useEffect(() => {
    void handleAutoDetectLocation();
  }, [handleAutoDetectLocation]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeContext(getDetailedTimeContext());
      setSolarStatus(getSolarWindowStatus());
    }, TELEMETRY_REFRESH_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  const personalizedIntel = useMemo(
    () =>
      generatePersonalizedIntelligence({
        timeContext,
        telemetry,
        vulnerabilities
      }),
    [timeContext, telemetry, vulnerabilities]
  );

  /**
   * Switches active monitoring station using a validated city catalog key.
   * @param cityKey - City identifier from preset catalog.
   */
  const handleManualCityChange = useCallback(async (cityKey: string) => {
    const safeKey = sanitizeCityKey(cityKey);
    setIsLoadingTelemetry(true);
    try {
      const cityPreset = MAJOR_CITIES_CATALOG[safeKey];
      const data = await fetchLiveAirQuality(
        safeKey,
        cityPreset ? { lat: cityPreset.lat, lon: cityPreset.lon } : null
      );
      setTelemetry({
        ...data,
        city: cityPreset?.city || data.city,
        country: cityPreset?.country || data.country
      });
      setLocationData({
        city: cityPreset?.city || data.city,
        country: cityPreset?.country || data.country,
        latitude: data.latitude,
        longitude: data.longitude,
        isAutoDetected: false
      });
    } catch (error) {
      logError('useAirQuality', 'Failed to switch city telemetry', error);
    } finally {
      setIsLoadingTelemetry(false);
    }
  }, []);

  /**
   * Generates a household smog defense plan via Gemini 2.5 Flash or Zero-Crash mock fallback.
   * @returns True if a valid plan payload was produced.
   */
  const handleGeneratePlan = useCallback(async () => {
    setIsGenerating(true);
    try {
      const result = await generateSmogDefensePlan({
        city: telemetry.city,
        aqi: telemetry.aqi,
        pm25: telemetry.pm2_5,
        vulnerabilities
      });
      if (result?.data) {
        setAiPlan(result.data);
        setPromptCount(getPromptLogs().length);
        return true;
      }
      setPromptCount(getPromptLogs().length);
      return false;
    } catch (error) {
      logError('useAirQuality', 'Error generating AI plan', error);
      return false;
    } finally {
      setIsGenerating(false);
    }
  }, [telemetry.city, telemetry.aqi, telemetry.pm2_5, vulnerabilities]);

  const handleToggleVulnerability = useCallback((id: string) => {
    setVulnerabilities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const clearAiPlan = useCallback(() => setAiPlan(null), []);

  return {
    locationData,
    timeContext,
    isRefreshingLocation,
    telemetry,
    solarStatus,
    vulnerabilities,
    aiPlan,
    isGenerating,
    isLoadingTelemetry,
    promptCount,
    personalizedIntel,
    handleAutoDetectLocation,
    handleManualCityChange,
    handleGeneratePlan,
    handleToggleVulnerability,
    clearAiPlan
  };
}
