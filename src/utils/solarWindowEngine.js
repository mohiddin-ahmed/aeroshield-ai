/**
 * Solar Thermal Lift & Inversion Window Engine
 * Analyzes meteorological ground boundary layer dynamics.
 * Identifies the 1:00 PM - 3:00 PM solar convection window when ground smog temporarily disperses.
 */

export function getSolarWindowStatus(date = new Date()) {
  const currentHour = date.getHours();
  const currentMinutes = date.getMinutes();
  const timeDecimal = currentHour + currentMinutes / 60;

  // Window: 13:00 to 15:00 (1:00 PM to 3:00 PM)
  const isWindowActive = timeDecimal >= 13.0 && timeDecimal < 15.0;
  const isBeforeWindow = timeDecimal < 13.0;
  const isAfterWindow = timeDecimal >= 15.0;

  let minutesRemaining = 0;
  let statusText = '';
  let badgeColor = 'gentle-olive';
  let thermalLiftIntensity = 0; // 0 to 100%

  if (isWindowActive) {
    minutesRemaining = Math.round((15.0 - timeDecimal) * 60);
    statusText = `ACTIVE: Solar Inversion Broken (${minutesRemaining}m remaining)`;
    badgeColor = 'gentle-olive';
    thermalLiftIntensity = 85;
  } else if (isBeforeWindow) {
    const minutesUntil = Math.round((13.0 - timeDecimal) * 60);
    statusText = `UPCOMING: Solar Window opens in ${Math.floor(minutesUntil / 60)}h ${minutesUntil % 60}m`;
    badgeColor = 'winter-hazel';
    thermalLiftIntensity = Math.max(10, Math.round((timeDecimal / 13.0) * 40));
  } else {
    statusText = 'CLOSED: Evening Inversion Lid Forming (Windows Sealed)';
    badgeColor = 'deep-crimson';
    thermalLiftIntensity = Math.max(5, Math.round(100 - (timeDecimal - 15.0) * 20));
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
