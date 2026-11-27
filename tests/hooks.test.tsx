// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useAirQuality } from '../src/hooks/useAirQuality';
import { useDailyChecklist } from '../src/hooks/useDailyChecklist';
import { useLanguage } from '../src/hooks/useLanguage';
import { useModalAccessibility } from '../src/hooks/useModalAccessibility';
import { useTheme } from '../src/hooks/useTheme';
import { clearTelemetryCache } from '../src/services/airQualityService';
import { promptLogger } from '../src/utils/promptLogger';

describe('AeroShield AI: Custom Hooks Coverage Suite', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    promptLogger.clear();
    clearTelemetryCache();

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn()
    }));
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('useTheme persists dark/light mode changes to document root and localStorage', () => {
    localStorage.setItem('theme', 'dark');
    const { result } = renderHook(() => useTheme());

    expect(result.current.isDarkMode).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    act(() => {
      result.current.toggleDarkMode();
    });

    expect(result.current.isDarkMode).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('useLanguage selects supported regional locales and falls back safely on unknown codes', () => {
    const { result } = renderHook(() => useLanguage());
    expect(result.current.currentLang).toBe('en');

    act(() => {
      result.current.selectLanguage('ta');
    });
    expect(result.current.currentLang).toBe('ta');
    expect(localStorage.getItem('lang')).toBe('ta');

    act(() => {
      result.current.selectLanguage('xx');
    });
    expect(result.current.currentLang).toBe('en');
  });

  it('useDailyChecklist toggles daily defense tasks, computes savings, and sanitizes household name', () => {
    const { result } = renderHook(() => useDailyChecklist(220));
    expect(result.current.completedIds).toEqual(['seal_windows', 'run_purifier']);

    act(() => {
      result.current.toggleAction('wear_n95');
      result.current.updateHouseholdName('<b>Verma</b> Family');
    });

    expect(result.current.completedIds).toContain('wear_n95');
    expect(result.current.summary.householdName).toBe('bVerma/b Family');
    expect(result.current.summary.protectionPercent).toBeGreaterThan(63);
    expect(result.current.summary.pm25SavedTodayUg).toBeGreaterThan(0);

    act(() => {
      result.current.toggleAction('wear_n95');
    });
    expect(result.current.completedIds).not.toContain('wear_n95');
  });

  it('useDailyChecklist increments streak when previous local calendar day has completed actions', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
    localStorage.setItem(
      'aeroshield_daily_defense_v1',
      JSON.stringify({
        householdName: 'Kiran Home',
        lastActiveDate: yKey,
        completedIds: ['seal_windows'],
        streakDays: 4,
        totalLifetimeUgSaved: 500
      })
    );

    const { result } = renderHook(() => useDailyChecklist(180));
    expect(result.current.summary.streakDays).toBe(5);
    expect(result.current.summary.householdName).toBe('Kiran Home');
    expect(result.current.completedIds).toEqual([]);
  });

  it('useModalAccessibility dismisses dialog on Escape key and restores focus on close', () => {
    function ModalHarness({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
      useModalAccessibility(isOpen, onClose);
      return (
        <div>
          <button type="button">Launcher</button>
          {isOpen && <div role="dialog">Open Dialog</div>}
        </div>
      );
    }

    const onClose = vi.fn();
    const { rerender } = render(<ModalHarness isOpen={false} onClose={onClose} />);
    const launcher = screen.getByRole('button', { name: 'Launcher' });
    launcher.focus();
    expect(document.activeElement).toBe(launcher);

    rerender(<ModalHarness isOpen={true} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);

    const unrelated = document.createElement('input');
    document.body.appendChild(unrelated);
    unrelated.focus();

    rerender(<ModalHarness isOpen={false} onClose={onClose} />);
    expect(document.activeElement).toBe(launcher);
    unrelated.remove();
  });

  it('useAirQuality orchestrates city switching, vulnerability toggles, and AI plan lifecycle', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        current: {
          us_aqi: 145,
          pm2_5: 55.0,
          pm10: 98.0,
          nitrogen_dioxide: 40.0,
          sulphur_dioxide: 12.0,
          ozone: 36.0
        }
      })
    } as Response);

    const { result } = renderHook(() => useAirQuality());

    await waitFor(() => {
      expect(result.current.isRefreshingLocation).toBe(false);
    });

    await act(async () => {
      await result.current.handleManualCityChange('mumbai');
    });
    expect(result.current.locationData.city).toBe('Mumbai');
    expect(result.current.telemetry.aqi).toBe(145);

    act(() => {
      result.current.handleToggleVulnerability('elderly');
    });
    expect(result.current.vulnerabilities).toContain('elderly');

    let ok = false;
    await act(async () => {
      ok = await result.current.handleGeneratePlan();
    });
    expect(ok).toBe(true);
    expect(result.current.aiPlan).not.toBeNull();
    expect(result.current.promptCount).toBe(1);

    act(() => {
      result.current.clearAiPlan();
    });
    expect(result.current.aiPlan).toBeNull();
  });
});
