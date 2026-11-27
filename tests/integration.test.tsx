// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../src/App';
import { clearTelemetryCache } from '../src/services/airQualityService';
import { promptLogger } from '../src/utils/promptLogger';

describe('AeroShield AI: End-to-End Application Flow Integration Tests', () => {
  beforeEach(() => {
    promptLogger.clear();
    clearTelemetryCache();
    localStorage.clear();
    window.scrollTo = vi.fn();
    Element.prototype.scrollIntoView = vi.fn();

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

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        current: {
          us_aqi: 318,
          pm2_5: 224.0,
          pm10: 340.0,
          nitrogen_dioxide: 72.0,
          sulphur_dioxide: 19.0,
          ozone: 38.0
        }
      })
    } as Response);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders skip-to-content link, dismisses onboarding, generates an AI smog plan, and opens Judges DevTools', async () => {
    render(<App />);

    expect(screen.getByText(/Skip to main content/i)).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(/Home air quality overview/i);

    const skipBtn = await screen.findByRole('button', { name: /Skip onboarding tour/i });
    fireEvent.click(skipBtn);
    expect(localStorage.getItem('aeroshield_onboarded')).toBe('true');

    const generateBtn = screen.getByRole('button', { name: /Get AI Plan/i });
    fireEvent.click(generateBtn);

    const planHeading = await screen.findByText(/Generated Smog Defense Plan for Your Family/i);
    expect(planHeading).toBeInTheDocument();

    const devToolsBtn = screen.getByRole('button', { name: /Judges DevTools/i });
    fireEvent.click(devToolsBtn);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(await screen.findByText(/PROMPT RUNS \(1\)/i)).toBeInTheDocument();
  });

  it('switches navigation tabs smoothly using FloatingBottomNav with aria-current and live region updates', async () => {
    localStorage.setItem('aeroshield_onboarded', 'true');
    render(<App />);

    const homeNav = screen.getByRole('button', { name: 'Home' });
    const routineNav = screen.getByRole('button', { name: 'Routine' });
    const hacksNav = screen.getByRole('button', { name: 'Hacks' });
    const scienceNav = screen.getByRole('button', { name: 'Science' });

    expect(homeNav).toHaveAttribute('aria-current', 'page');

    fireEvent.click(routineNav);
    await waitFor(() => {
      expect(screen.getByText(/Simple 24-Hour Clean-Air Routine/i)).toBeInTheDocument();
    });
    expect(routineNav).toHaveAttribute('aria-current', 'page');

    fireEvent.click(hacksNav);
    await waitFor(() => {
      expect(screen.getByText(/Simple DIY Clean-Air Hacks for Any Home/i)).toBeInTheDocument();
    });
    expect(hacksNav).toHaveAttribute('aria-current', 'page');

    fireEvent.click(scienceNav);
    await waitFor(() => {
      expect(screen.getByText(/How Clean-Air Steps Protect Your Lungs/i)).toBeInTheDocument();
    });
    expect(scienceNav).toHaveAttribute('aria-current', 'page');

    const brandHomeBtn = screen.getByRole('button', { name: /Return to AeroShield AI Home/i });
    fireEvent.click(brandHomeBtn);
    expect(homeNav).toHaveAttribute('aria-current', 'page');
  });

  it('switches language localized labels and toggles theme mode', async () => {
    localStorage.setItem('aeroshield_onboarded', 'true');
    render(<App />);

    const langTrigger = screen.getByRole('button', { name: /Change application language/i });
    fireEvent.click(langTrigger);

    const hindiOption = screen.getByRole('option', { name: /हिन्दी/i });
    fireEvent.click(hindiOption);

    await waitFor(() => {
      expect(screen.getByText(/वायुमित्र OS/i)).toBeInTheDocument();
    });

    const themeBtn = screen.getByRole('button', { name: /Switch to Dark Mode/i });
    fireEvent.click(themeBtn);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
