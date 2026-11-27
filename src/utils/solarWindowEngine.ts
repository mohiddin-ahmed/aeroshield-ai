/**
 * @module utils/solarWindowEngine
 * Diurnal Solar Thermal Lift & Boundary Layer Inversion Analyzer.
 * Identifies the 1:00 PM – 3:00 PM solar convection window when ground cold pools disperse.
 */

import { SOLAR_WINDOW_END_HOUR, SOLAR_WINDOW_START_HOUR } from '../constants/airQuality';
import type { SolarWindowStatus } from '../types/airQuality';

/**
 * Evaluates whether the 1:00 PM – 3:00 PM convective ventilation window is active, upcoming, or closed.
 * @param date - Local device date/time to analyze.
 * @returns Solar window diagnostics and ventilation directive.
 */
export function getSolarWindowStatus(date: Date = new Date()): SolarWindowStatus {
  const validDate = date instanceof Date && !Number.isNaN(date.getTime()) ? date : new Date();
  const currentHour = validDate.getHours();
  const currentMinutes = validDate.getMinutes();
  const timeDecimal = currentHour + currentMinutes / 60;

  const isWindowActive =
    timeDecimal >= SOLAR_WINDOW_START_HOUR && timeDecimal < SOLAR_WINDOW_END_HOUR;
  const isBeforeWindow = timeDecimal < SOLAR_WINDOW_START_HOUR;
  const isAfterWindow = timeDecimal >= SOLAR_WINDOW_END_HOUR;

  let statusText = '';
  let badgeColor = 'gentle-olive';
  let thermalLiftIntensity = 0;

  if (isWindowActive) {
    const minutesRemaining = Math.round((SOLAR_WINDOW_END_HOUR - timeDecimal) * 60);
    statusText = `ACTIVE: Solar Inversion Broken (${minutesRemaining}m remaining)`;
    badgeColor = 'gentle-olive';
    thermalLiftIntensity = 85;
  } else if (isBeforeWindow) {
    const minutesUntil = Math.round((SOLAR_WINDOW_START_HOUR - timeDecimal) * 60);
    statusText = `UPCOMING: Solar Window opens in ${Math.floor(minutesUntil / 60)}h ${minutesUntil % 60}m`;
    badgeColor = 'winter-hazel';
    thermalLiftIntensity = Math.max(10, Math.round((timeDecimal / SOLAR_WINDOW_START_HOUR) * 40));
  } else {
    statusText = 'CLOSED: Evening Inversion Lid Forming (Windows Sealed)';
    badgeColor = 'deep-crimson';
    thermalLiftIntensity = Math.max(
      5,
      Math.round(100 - (timeDecimal - SOLAR_WINDOW_END_HOUR) * 20)
    );
  }

  return {
    isWindowActive,
    isBeforeWindow,
    isAfterWindow,
    currentHour,
    statusText,
    badgeColor,
    thermalLiftIntensity,
    safeAction: isWindowActive
      ? 'Perform 15-minute cross-ventilation now. Sun radiation has lifted the ground inversion layer.'
      : 'Keep windows and doors sealed. Ground-level cold air is trapping heavy particulates.'
  };
}
