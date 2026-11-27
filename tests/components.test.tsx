// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CitySelector } from '../src/components/CitySelector';
import { DailyDefenseChecklist } from '../src/components/DailyDefenseChecklist';
import { DemoVideoModal } from '../src/components/DemoVideoModal';
import { DesiJugaadLab } from '../src/components/DesiJugaadLab';
import { ErrorBoundary } from '../src/components/ErrorBoundary';
import { JugaadDetailModal } from '../src/components/JugaadDetailModal';
import { MultiAiModal } from '../src/components/MultiAiModal';
import { Navbar } from '../src/components/Navbar';
import { OnboardingModal } from '../src/components/OnboardingModal';
import { ResearchHub } from '../src/components/ResearchHub';
import { RotaryAqiDial } from '../src/components/RotaryAqiDial';
import { SettingsModal } from '../src/components/SettingsModal';
import { SmogRoutineTimeline } from '../src/components/SmogRoutineTimeline';
import { TelemetryGrid } from '../src/components/TelemetryGrid';
import { VulnerabilityToggles } from '../src/components/VulnerabilityToggles';
import { DAILY_DEFENSE_ACTIONS } from '../src/hooks/useDailyChecklist';
import type { JugaadProtocol } from '../src/types/airQuality';

const sampleTelemetry = {
  city: 'New Delhi (NCR)',
  aqi: 425,
  category: 'Hazardous' as const,
  categoryColor: '#9B2226',
  cigaretteEquivDaily: 14.8,
  pm2_5: 324.5,
  pm10: 488.2,
  no2: 94.6,
  ozone: 42.1
};

const sampleJugaadItem: JugaadProtocol = {
  id: 'diy-box-fan',
  badge: '19.2x Cost Savings',
  category: 'Filtration Core',
  cost: '₹1,250',
  commercialEquiv: '₹24,000',
  hindiTitle: 'देसी बॉक्स-फैन',
  title: 'DIY Box-Fan HEPA Purifier',
  impact: 'Cleans room in 28 minutes.',
  instruction: 'Tape MERV 13 filter to intake.',
  materialsNeeded: ['20-inch Box Fan', 'MERV 13 Filter'],
  detailedSteps: ['Attach filter on intake side', 'Seal perimeter gaps'],
  scientificMechanism: 'Electrostatic microfiber capture',
  safetyTips: 'Keep front grill clear'
};

describe('AeroShield AI: UI Components & WCAG 2.1 AA Accessibility Tests', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders RotaryAqiDial with accessible gauge role, PM2.5 reading, and solar badge', () => {
    render(
      <RotaryAqiDial
        telemetry={sampleTelemetry}
        isSolarActive={true}
        currentLang="en"
        isDarkMode={false}
      />
    );

    expect(screen.getByRole('img', { name: /AQI Rotary Gauge showing 425/i })).toBeInTheDocument();
    expect(screen.getByText('425')).toBeInTheDocument();
    expect(screen.getByText(/14\.8/)).toBeInTheDocument();
    expect(screen.getByText(/Safe to Open Windows Now/i)).toBeInTheDocument();
  });

  it('toggles household vulnerability profiles with accessible aria-pressed states and slider arrows', () => {
    const onToggle = vi.fn();
    render(<VulnerabilityToggles selected={['toddler']} onToggle={onToggle} currentLang="en" />);

    const toddlerBtn = screen.getByRole('button', { name: /Young Kids/i });
    const asthmaBtn = screen.getByRole('button', { name: /Asthma/i });

    expect(toddlerBtn).toHaveAttribute('aria-pressed', 'true');
    expect(asthmaBtn).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(asthmaBtn);
    expect(onToggle).toHaveBeenCalledWith('asthma');
    expect(
      screen.getByRole('button', { name: /Scroll family profiles left/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Scroll family profiles right/i })
    ).toBeInTheDocument();
  });

  it('recalculates CADR airflow in DesiJugaadLab when changing fan speed to high', () => {
    const onSelectJugaad = vi.fn();
    render(
      <DesiJugaadLab
        onOpenMultiAi={vi.fn()}
        personalizedIntel={{
          currentUrgentAdvisory: 'Seal windows during inversion.',
          customizedJugaadList: [sampleJugaadItem]
        }}
        timeContext={{ timeString: '08:00 AM', phaseLabel: 'Morning Inversion' }}
        onSelectJugaad={onSelectJugaad}
        currentLang="en"
      />
    );

    expect(screen.getByText('282')).toBeInTheDocument();

    const highBtn = screen.getByRole('button', { name: 'high' });
    fireEvent.click(highBtn);

    expect(highBtn).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('361')).toBeInTheDocument();
  });

  it('renders TelemetryGrid with bounded ARIA progressbar semantics and SVG bars without inline CSS', () => {
    render(<TelemetryGrid telemetry={sampleTelemetry} currentLang="en" />);

    const bars = screen.getAllByRole('progressbar');
    expect(bars).toHaveLength(4);
    bars.forEach((bar) => {
      const value = Number(bar.getAttribute('aria-valuenow'));
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
      expect(bar.querySelector('svg rect')).not.toBeNull();
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

  it('renders SettingsModal with accessible language switches, theme buttons, and Escape key close', () => {
    const onSelectLang = vi.fn();
    const onToggleDarkMode = vi.fn();
    const onClose = vi.fn();
    render(
      <SettingsModal
        isOpen={true}
        onClose={onClose}
        currentLang="en"
        onSelectLang={onSelectLang}
        isDarkMode={false}
        onToggleDarkMode={onToggleDarkMode}
        vulnerabilities={['toddler']}
        onToggleVulnerability={vi.fn()}
        onOpenDevTools={vi.fn()}
      />
    );

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'हिन्दी' }));
    expect(onSelectLang).toHaveBeenCalledWith('hi');

    fireEvent.click(screen.getByRole('button', { name: /Dark Mode/i }));
    expect(onToggleDarkMode).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('steps through OnboardingModal slides and completes cleanly', () => {
    const onClose = vi.fn();
    render(<OnboardingModal isOpen={true} onClose={onClose} />);

    expect(screen.getByText(/Step 1 of 4/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Next Step/i }));
    expect(screen.getByText(/Step 2 of 4/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Jump to step 4/i }));
    expect(screen.getByText(/Step 4 of 4/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Launch VayuMitra OS/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders MultiAiModal and JugaadDetailModal with context and Escape dismissal', () => {
    const onOpenMultiAi = vi.fn();
    const onCloseDetail = vi.fn();
    render(
      <JugaadDetailModal
        item={sampleJugaadItem}
        isOpen={true}
        onClose={onCloseDetail}
        onOpenMultiAi={onOpenMultiAi}
      />
    );

    expect(screen.getByText(/Electrostatic microfiber capture/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Ask AI to Guide Me/i }));
    expect(onCloseDetail).toHaveBeenCalledTimes(1);
    expect(onOpenMultiAi).toHaveBeenCalledTimes(1);

    const onCloseMulti = vi.fn();
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      configurable: true
    });
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

    render(
      <MultiAiModal
        isOpen={true}
        onClose={onCloseMulti}
        telemetry={sampleTelemetry}
        timeContext={{ timeString: '08:00 AM' }}
        vulnerabilities={['toddler']}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Copy Prompt/i }));
    expect(writeTextMock).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: /Ask Gemini/i }));
    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining('https://gemini.google.com/app?q='),
      '_blank',
      'noopener,noreferrer'
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onCloseMulti).toHaveBeenCalledTimes(1);
  });

  it('toggles mobile drawer menu in Navbar and invokes quick drawer actions', () => {
    const onOpenTour = vi.fn();
    const onOpenSettings = vi.fn();
    const onGoHome = vi.fn();
    render(
      <Navbar
        locationData={{
          city: 'Bengaluru',
          country: 'India',
          latitude: 12.97,
          longitude: 77.59,
          isAutoDetected: true
        }}
        timeContext={{
          hour: 10,
          minutes: 30,
          timeString: '10:30 AM',
          dateString: 'Sat, Nov 28',
          timePhase: 'late_morning',
          phaseLabel: 'Air Warming Up',
          slotTitle: 'Wait',
          phaseExplainer: 'Warming',
          currentUrgentPrescription: 'Filter on',
          solarVentilationWindow: false
        }}
        onGoHome={onGoHome}
        onRefreshLocation={vi.fn()}
        isRefreshingLocation={false}
        onOpenVideoModal={vi.fn()}
        onOpenInspector={vi.fn()}
        onOpenMultiAi={vi.fn()}
        onOpenSettings={onOpenSettings}
        onOpenTour={onOpenTour}
        onSelectLang={vi.fn()}
        isDarkMode={false}
        onToggleDarkMode={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Return to AeroShield AI Home/i }));
    expect(onGoHome).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: /Open navigation menu/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Interactive App Tour & Guide' }));
    expect(onOpenTour).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: /Open navigation menu/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Settings, Profiles & Languages' }));
    expect(onOpenSettings).toHaveBeenCalledTimes(1);
  });

  it('filters ResearchHub articles by category and updates dosimetry safeguards', () => {
    render(<ResearchHub telemetry={{ pm2_5: 220 }} currentLang="en" />);

    expect(
      screen.getByText(/Particulate Air Pollution and Cigarette Equivalence/i)
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Indoor Filtration' }));
    expect(screen.getByText(/Indoor Resuspension of Settled Dust/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/Particulate Air Pollution and Cigarette Equivalence/i)
    ).not.toBeInTheDocument();

    const moppingBtn = screen.getByRole('button', { name: /Rock-Salt Wet Mop/i });
    expect(moppingBtn).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(moppingBtn);
    expect(moppingBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('catches child rendering errors cleanly inside ErrorBoundary alert fallback', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    function Bomb(): never {
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
        solarStatus={{
          isWindowActive: false,
          isBeforeWindow: true,
          isAfterWindow: false,
          currentHour: 1,
          statusText: 'CLOSED',
          badgeColor: 'deep-crimson',
          thermalLiftIntensity: 10,
          safeAction: 'Keep windows closed.'
        }}
        timeContext={{
          hour: 1,
          minutes: 0,
          dateString: 'Sat, Nov 28',
          timeString: '01:00 AM',
          timePhase: 'night_inversion',
          phaseLabel: 'Night • Keep Closed',
          slotTitle: 'Night Protection — Keep Bedroom Sealed',
          phaseExplainer: 'Cold night air locks fine pollution close to street level.',
          currentUrgentPrescription: 'Keep bedroom windows closed tight.',
          solarVentilationWindow: false
        }}
        currentLang="en"
      />
    );

    const activeBadges = screen.getAllByText('Active Right Now');
    expect(activeBadges).toHaveLength(1);
    expect(screen.getByText(/Safe Window Tip/i)).toBeInTheDocument();
  });

  it('tracks checked actions and edits household name in DailyDefenseChecklist', () => {
    const onToggle = vi.fn();
    const onUpdateName = vi.fn();
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
        onUpdateHouseholdName={onUpdateName}
      />
    );

    expect(screen.getByText(/Ahmed Family's Daily Clean-Air Score/i)).toBeInTheDocument();
    expect(screen.getByText('63%')).toBeInTheDocument();
    expect(screen.getByText('6.3')).toBeInTheDocument();
    expect(screen.getByText(/3 Day Streak/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Personalize household name/i }));
    const nameInput = screen.getByLabelText(/Enter your family or household name/i);
    fireEvent.change(nameInput, { target: { value: 'Sharma Home' } });
    fireEvent.submit(nameInput.closest('form') as HTMLFormElement);
    expect(onUpdateName).toHaveBeenCalledWith('Sharma Home');

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
});
