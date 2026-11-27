// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { App } from '../src/App';
import { promptLogger } from '../src/utils/promptLogger';
import { clearTelemetryCache } from '../src/services/airQualityService';

describe('AeroShield AI: End-to-End Application Flow Integration Tests', () => {
  beforeEach(() => {
    promptLogger.clear();
    clearTelemetryCache();
    localStorage.clear();
    window.scrollTo = vi.fn();
    Element.prototype.scrollIntoView = vi.fn();

    window.matchMedia = vi.fn().mockImplementation((query) => ({
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
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders skip-to-content link, dismisses onboarding, generates an AI smog plan, and opens Judges DevTools', async () => {
    render(<App />);

    // Skip-to-main-content WCAG landmark link is present
    expect(screen.getByText(/Skip to main content/i)).toBeInTheDocument();

    // Wait for lazy OnboardingModal to mount and skip it
    const skipBtn = await screen.findByRole('button', { name: /Skip onboarding tour/i });
    fireEvent.click(skipBtn);
    expect(localStorage.getItem('aeroshield_onboarded')).toBe('true');

    // Generate AI Smog Defense Plan
    const generateBtn = screen.getByRole('button', { name: /Get AI Plan/i });
    fireEvent.click(generateBtn);

    const planHeading = await screen.findByText(/Generated Smog Defense Plan for Your Family/i);
    expect(planHeading).toBeInTheDocument();

    // Open Judges DevTools and verify logged execution appears
    const devToolsBtn = screen.getByRole('button', { name: /Judges DevTools/i });
    fireEvent.click(devToolsBtn);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(await screen.findByText(/PROMPT RUNS \(1\)/i)).toBeInTheDocument();
  });

  it('switches navigation tabs smoothly using FloatingBottomNav with aria-current page semantics', async () => {
    localStorage.setItem('aeroshield_onboarded', 'true');
    render(<App />);

    const homeNav = screen.getByRole('button', { name: 'Home' });
    const hacksNav = screen.getByRole('button', { name: 'Hacks' });
    const scienceNav = screen.getByRole('button', { name: 'Science' });

    expect(homeNav).toHaveAttribute('aria-current', 'page');

    fireEvent.click(hacksNav);
    await waitFor(() => {
      expect(screen.getByText(/Simple DIY Clean-Air Hacks for Any Home/i)).toBeInTheDocument();
    });
    expect(hacksNav).toHaveAttribute('aria-current', 'page');

    fireEvent.click(scienceNav);
    await waitFor(() => {
      expect(
        screen.getByText(/How Clean-Air Steps Protect Your Lungs/i)
      ).toBeInTheDocument();
    });
    expect(scienceNav).toHaveAttribute('aria-current', 'page');

    // Clicking the header App Icon / Brand button navigates right back to Home
    const brandHomeBtn = screen.getByRole('button', { name: /Return to AeroShield AI Home/i });
    fireEvent.click(brandHomeBtn);
    expect(homeNav).toHaveAttribute('aria-current', 'page');
  });

  it('switches language localized labels when selecting हिन्दी from Navbar dropdown', async () => {
    localStorage.setItem('aeroshield_onboarded', 'true');
    render(<App />);

    const langTrigger = screen.getByRole('button', { name: /Change application language/i });
    fireEvent.click(langTrigger);

    const hindiOption = screen.getByRole('option', { name: /हिन्दी/i });
    fireEvent.click(hindiOption);

    await waitFor(() => {
      expect(screen.getByText(/वायुमित्र OS/i)).toBeInTheDocument();
    });
  });
});
