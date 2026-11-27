import { useCallback, useEffect, useMemo, useState } from 'react';
import { BERKELEY_EARTH_PM25_PER_CIGARETTE } from '../constants/airQuality';
import type { DailyChecklistSummary, DailyDefenseAction } from '../types/airQuality';
import { sanitizeText } from '../utils/inputValidator';

const STORAGE_KEY = 'aeroshield_daily_defense_v1';

export const DAILY_DEFENSE_ACTIONS: DailyDefenseAction[] = [
  {
    id: 'seal_windows',
    label: 'Kept windows closed during morning & night smog',
    hint: 'Blocks cold outdoor smog from entering bedrooms',
    reductionShare: 0.18
  },
  {
    id: 'run_purifier',
    label: 'Ran DIY Box-Fan / HEPA filter indoors',
    hint: 'Removes fine dust continuously inside living rooms',
    reductionShare: 0.45
  },
  {
    id: 'solar_ventilation',
    label: 'Opened windows 15 min between 1:00 PM – 3:00 PM',
    hint: 'Safest sunny window to let fresh air in and CO2 out',
    reductionShare: 0.12
  },
  {
    id: 'wet_mop',
    label: 'Wet-mopped floors instead of dry broom sweeping',
    hint: 'Stops 340% settled dust re-floating into the air',
    reductionShare: 0.15
  },
  {
    id: 'wear_n95',
    label: 'Wore a snug N95 mask outdoors',
    hint: 'Filters diesel exhaust and road soot during travel',
    reductionShare: 0.25
  }
];

interface StoredDailyState {
  householdName: string;
  lastActiveDate: string;
  completedIds: string[];
  streakDays: number;
  totalLifetimeUgSaved: number;
}

export interface UseDailyChecklistResult {
  actions: DailyDefenseAction[];
  completedIds: string[];
  summary: DailyChecklistSummary;
  toggleAction: (actionId: string) => void;
  updateHouseholdName: (rawName: string) => void;
}

function getLocalDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getYesterdayKey(date: Date = new Date()): string {
  const prev = new Date(date);
  prev.setDate(prev.getDate() - 1);
  return getLocalDateKey(prev);
}

function loadInitialState(): StoredDailyState {
  const todayKey = getLocalDateKey();
  const fallback: StoredDailyState = {
    householdName: '',
    lastActiveDate: todayKey,
    completedIds: ['seal_windows', 'run_purifier'],
    streakDays: 1,
    totalLifetimeUgSaved: 0
  };

  if (typeof window === 'undefined') return fallback;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<StoredDailyState> | null;
    if (!parsed || typeof parsed !== 'object') return fallback;

    const validIds = new Set(DAILY_DEFENSE_ACTIONS.map((a) => a.id));
    const savedCompleted = Array.isArray(parsed.completedIds)
      ? parsed.completedIds.filter((id): id is string => typeof id === 'string' && validIds.has(id))
      : [];

    if (parsed.lastActiveDate === todayKey) {
      return {
        householdName: sanitizeText(parsed.householdName || '', 32),
        lastActiveDate: todayKey,
        completedIds: savedCompleted,
        streakDays: Math.max(1, Number(parsed.streakDays) || 1),
        totalLifetimeUgSaved: Math.max(0, Number(parsed.totalLifetimeUgSaved) || 0)
      };
    }

    const continuedStreak =
      parsed.lastActiveDate === getYesterdayKey() && savedCompleted.length > 0;
    return {
      householdName: sanitizeText(parsed.householdName || '', 32),
      lastActiveDate: todayKey,
      completedIds: [],
      streakDays: continuedStreak ? (Number(parsed.streakDays) || 1) + 1 : 1,
      totalLifetimeUgSaved: Math.max(0, Number(parsed.totalLifetimeUgSaved) || 0)
    };
  } catch {
    return fallback;
  }
}

/**
 * Manages zero-login daily clean-air check-ins, daily PM2.5/cigarette savings,
 * optional local household greeting, and streak persistence in `localStorage`.
 * @param pm25 - Current ambient PM2.5 reading in μg/m³.
 * @returns Daily savings metrics, completion state, and toggle handlers.
 */
export function useDailyChecklist(pm25 = 180): UseDailyChecklistResult {
  const [state, setState] = useState<StoredDailyState>(loadInitialState);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage error when browser privacy mode blocks localStorage
    }
  }, [state]);

  const toggleAction = useCallback((actionId: string) => {
    setState((prev) => {
      const exists = prev.completedIds.includes(actionId);
      const nextCompleted = exists
        ? prev.completedIds.filter((id) => id !== actionId)
        : [...prev.completedIds, actionId];
      return {
        ...prev,
        lastActiveDate: getLocalDateKey(),
        completedIds: nextCompleted
      };
    });
  }, []);

  const updateHouseholdName = useCallback((rawName: string) => {
    const clean = sanitizeText(rawName, 32);
    setState((prev) => ({ ...prev, householdName: clean }));
  }, []);

  const summary = useMemo<DailyChecklistSummary>(() => {
    const safePm25 = Number.isFinite(pm25) && pm25 > 0 ? pm25 : 40;
    const completedSet = new Set(state.completedIds);

    const totalShareBlocked = DAILY_DEFENSE_ACTIONS.reduce(
      (sum, item) => (completedSet.has(item.id) ? sum + item.reductionShare : sum),
      0
    );

    // Cap indoor combined mitigation realistically at 92% of ambient intake
    const protectionPercent = Math.min(92, Math.round(totalShareBlocked * 100));
    const pm25SavedTodayUg = Math.round(safePm25 * (protectionPercent / 100));
    const cigarettesSavedToday = Number(
      (pm25SavedTodayUg / BERKELEY_EARTH_PM25_PER_CIGARETTE).toFixed(1)
    );

    return {
      completedCount: state.completedIds.length,
      totalCount: DAILY_DEFENSE_ACTIONS.length,
      protectionPercent,
      pm25SavedTodayUg,
      cigarettesSavedToday,
      streakDays: state.streakDays,
      householdName: state.householdName
    };
  }, [state.completedIds, state.streakDays, state.householdName, pm25]);

  return {
    actions: DAILY_DEFENSE_ACTIONS,
    completedIds: state.completedIds,
    summary,
    toggleAction,
    updateHouseholdName
  };
}
