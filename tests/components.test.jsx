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
    expect(screen.getByText(/Solar Convective Lift Window Active/i)).toBeInTheDocument();
  });

  it('toggles household vulnerability profiles with accessible aria-pressed states', () => {
    const onToggle = vi.fn();
    render(
      <VulnerabilityToggles selected={['toddler']} onToggle={onToggle} currentLang="en" />
    );

    const toddlerBtn = screen.getByRole('button', { name: /Toddler/i });
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
});
