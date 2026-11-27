// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { RotaryAqiDial } from '../src/components/RotaryAqiDial';
import { VulnerabilityToggles } from '../src/components/VulnerabilityToggles';
import { DesiJugaadLab } from '../src/components/DesiJugaadLab';
import { TelemetryGrid } from '../src/components/TelemetryGrid';
import { DemoVideoModal } from '../src/components/DemoVideoModal';
import { SettingsModal } from '../src/components/SettingsModal';
import { ErrorBoundary } from '../src/components/ErrorBoundary';
import { SmogRoutineTimeline } from '../src/components/SmogRoutineTimeline';
import { DailyDefenseChecklist } from '../src/components/DailyDefenseChecklist';
import { CitySelector } from '../src/components/CitySelector';
import { DAILY_DEFENSE_ACTIONS } from '../src/hooks/useDailyChecklist';

const sampleTelemetry = {
  city: 'New Delhi (NCR)',
  aqi: 425,
  category: 'Hazardous',
  categoryColor: '#9B2226',
  cigaretteEquivDaily: 14.8,
  pm2_5: 324.5,
  pm10: 488.2,
  no2: 94.6,
  ozone: 42.1
};

describe('AeroShield AI: UI Components & WCAG 2.1 AA Accessibility Tests', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders RotaryAqiDial with accessible gauge role, PM2.5 reading, and solar badge', () => {
    render(
      <RotaryAqiDial telemetry={sampleTelemetry} isSolarActive={true} currentLang="en" isDarkMode={false} />
    );

    expect(screen.getByRole('img', { name: /AQI Rotary Gauge showing 425/i })).toBeInTheDocument();
    expect(screen.getByText('425')).toBeInTheDocument();
    expect(screen.getByText(/14\.8/)).toBeInTheDocument();
    expect(screen.getByText(/Safe to Open Windows Now/i)).toBeInTheDocument();
  });

  it('toggles household vulnerability profiles with accessible aria-pressed states', () => {
    const onToggle = vi.fn();
    render(
      <VulnerabilityToggles selected={['toddler']} onToggle={onToggle} currentLang="en" />
    );

    const toddlerBtn = screen.getByRole('button', { name: /Young Kids/i });
    const asthmaBtn = screen.getByRole('button', { name: /Asthma/i });

    expect(toddlerBtn).toHaveAttribute('aria-pressed', 'true');
    expect(asthmaBtn).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(asthmaBtn);
    expect(onToggle).toHaveBeenCalledWith('asthma');
  });

  it('recalculates CADR airflow in DesiJugaadLab when changing fan speed to high', () => {
    render(
      <DesiJugaadLab
        onOpenMultiAi={vi.fn()}
        personalizedIntel={{
          currentUrgentAdvisory: 'Seal windows during inversion.',
          customizedJugaadList: [
            {
              id: 'diy-box-fan',
              badge: '22x Cost Savings',
              cost: '₹1,250',
              title: 'DIY Box-Fan HEPA Purifier',
              impact: 'Cleans room in 28 minutes.',
              instruction: 'Tape MERV 13 filter to intake.'
            }
          ]
        }}
        timeContext={{ timeString: '08:00 AM', phaseLabel: 'Morning Inversion' }}
        onSelectJugaad={vi.fn()}
        currentLang="en"
      />
    );

    // Medium speed on 220 sq ft room yields 282 CFM
    expect(screen.getByText('282')).toBeInTheDocument();

    const highBtn = screen.getByRole('button', { name: 'high' });
    fireEvent.click(highBtn);

    expect(highBtn).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('361')).toBeInTheDocument();
  });

  it('renders TelemetryGrid with bounded ARIA progressbar semantics', () => {
    render(<TelemetryGrid telemetry={sampleTelemetry} currentLang="en" />);

    const bars = screen.getAllByRole('progressbar');
    expect(bars).toHaveLength(4);
    bars.forEach((bar) => {
      const value = Number(bar.getAttribute('aria-valuenow'));
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    });
  });

  it('renders DemoVideoModal with dialog semantics and closes on Escape key', () => {
    const onClose = vi.fn();
    render(<DemoVideoModal isOpen={true} onClose={onClose} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders SettingsModal with accessible language switches and Escape key close', () => {
    const onSelectLang = vi.fn();
    const onClose = vi.fn();
    render(
      <SettingsModal
        isOpen={true}
        onClose={onClose}
        currentLang="en"
        onSelectLang={onSelectLang}
        isDarkMode={false}
        onToggleDarkMode={vi.fn()}
        vulnerabilities={['toddler']}
        onToggleVulnerability={vi.fn()}
        onOpenDevTools={vi.fn()}
      />
    );

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    const hindiBtn = screen.getByRole('button', { name: 'हिन्दी' });
    fireEvent.click(hindiBtn);
    expect(onSelectLang).toHaveBeenCalledWith('hi');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('catches child rendering errors cleanly inside ErrorBoundary alert fallback', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    function Bomb() {
      throw new Error('Simulated UI Crash');
    }

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/Runtime Guard Triggered/i)).toBeInTheDocument();
    expect(screen.getByText(/Simulated UI Crash/i)).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('highlights only the single active nighttime slot in SmogRoutineTimeline without confusing 1-3 PM badge', () => {
    render(
      <SmogRoutineTimeline
        solarStatus={{ isWindowActive: false }}
        timeContext={{
          hour: 1,
          timeString: '01:00 AM',
          phaseLabel: 'Night • Keep Closed',
          slotTitle: 'Night Protection — Keep Bedroom Sealed',
          currentUrgentPrescription: 'Keep bedroom windows closed tight.'
        }}
        currentLang="en"
      />
    );

    const activeBadges = screen.getAllByText('Active Right Now');
    expect(activeBadges).toHaveLength(1);
    expect(screen.getByText(/Safe Window Tip/i)).toBeInTheDocument();
  });

  it('tracks checked actions and computes daily PM2.5 and cigarette savings in DailyDefenseChecklist', () => {
    const onToggle = vi.fn();
    render(
      <DailyDefenseChecklist
        actions={DAILY_DEFENSE_ACTIONS}
        completedIds={['seal_windows', 'run_purifier']}
        summary={{
          completedCount: 2,
          totalCount: 5,
          protectionPercent: 63,
          pm25SavedTodayUg: 139,
          cigarettesSavedToday: 6.3,
          streakDays: 3,
          householdName: 'Ahmed Family'
        }}
        onToggleAction={onToggle}
        onUpdateHouseholdName={vi.fn()}
      />
    );

    expect(screen.getByText(/Ahmed Family's Daily Clean-Air Score/i)).toBeInTheDocument();
    expect(screen.getByText('63%')).toBeInTheDocument();
    expect(screen.getByText('6.3')).toBeInTheDocument();
    expect(screen.getByText(/3 Day Streak/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Wet-mopped floors/i }));
    expect(onToggle).toHaveBeenCalledWith('wet_mop');
  });

  it('opens searchable CitySelector popover, filters cities, and selects chosen station', () => {
    const onSelectCity = vi.fn();
    render(
      <CitySelector
        currentCity="Bengaluru"
        onSelectCity={onSelectCity}
        onRefreshLocation={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Change monitoring city/i }));
    const searchBox = screen.getByPlaceholderText(/Search city or state/i);
    fireEvent.change(searchBox, { target: { value: 'mumbai' } });

    const mumbaiOption = screen.getByRole('option', { name: /Mumbai/i });
    fireEvent.click(mumbaiOption);
    expect(onSelectCity).toHaveBeenCalledWith('mumbai');
  });

  it('exposes accessible horizontal scroll arrow buttons on slidable VulnerabilityToggles', () => {
    render(
      <VulnerabilityToggles selected={['toddler']} onToggle={vi.fn()} currentLang="en" />
    );

    expect(screen.getByRole('button', { name: /Scroll family profiles left/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Scroll family profiles right/i })).toBeInTheDocument();
  });
});
