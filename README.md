# 🛡️ AeroShield AI (VayuMitra OS) — Urban Air Quality Defense Companion

[![ESLint](https://img.shields.io/badge/ESLint-0%20Errors%20%7C%200%20Warnings-emerald?style=for-the-badge&logo=eslint)](./eslint.config.js)
[![Tests](https://img.shields.io/badge/Vitest-34%20Passing%20Tests-indigo?style=for-the-badge&logo=vitest)](./tests)
[![AI Engine](https://img.shields.io/badge/Gemini%20API-2.5%20Flash-blue?style=for-the-badge&logo=google)](https://aistudio.google.com)
[![Accessibility](https://img.shields.io/badge/WCAG%202.1%20AA-Compliant-teal?style=for-the-badge)](./src/App.jsx)
[![Security](https://img.shields.io/badge/CSP%20%26%20HSTS-Hardened-amber?style=for-the-badge)](./vercel.json)
[![Live Deployment](https://img.shields.io/badge/Live%20App-Vercel-emerald?style=for-the-badge&logo=vercel)](https://aeroshield-ai-sandy.vercel.app/)
[![Demo Video](https://img.shields.io/badge/Demo%20Video-Watch%20HD-rose?style=for-the-badge&logo=googledrive)](https://drive.google.com/file/d/18vHHx8OvH3ZrenDX-60WtGm0OsJ_NTD7/view?usp=sharing)

> **PromptWars Virtual [Challenge 6: Urban Air Quality Assistant]**  
> *Turn Winter Smog Anxiety into Daily Clean-Air Strategy.*  
> **Live App:** [https://aeroshield-ai-sandy.vercel.app/](https://aeroshield-ai-sandy.vercel.app/) • **Demo Video:** [Watch 01:45 HD Walkthrough](https://drive.google.com/file/d/18vHHx8OvH3ZrenDX-60WtGm0OsJ_NTD7/view?usp=sharing) • **LinkedIn:** [Launch Announcement](https://www.linkedin.com/posts/mohiddin-ahmed-motiya-19ba06393_promptwars-hack2skill-googlefordevelopers-activity-7531098612081061888-a7pz)  
> Built with **Google Antigravity**, **Gemini 2.5 Flash API**, **Open-Meteo Copernicus CAMS Atmospheric Telemetry**, and **Tailwind CSS v4**.

---

## 🌟 The Crisis & Our Solution

Every winter across the Indo-Gangetic Plains (Delhi NCR, Patna, Lucknow, Kolkata, Lahore), **over 300 million citizens breathe toxic particulate matter equivalent to smoking 25 to 30 cigarettes a day**. Commercial HEPA purifiers cost ₹20,000–₹40,000+, while conventional weather dashboards merely display static red AQI numbers without providing actionable, low-cost harm reduction.

**AeroShield AI (VayuMitra OS)** is a production-grade GenAI clean-air defense companion delivering:
1. ☀️ **1–3 PM Diurnal Solar Convective Lift Detector:** Computes when afternoon solar heating breaks the nocturnal cold-pool inversion boundary, unlocking a safe 15-minute cross-ventilation window.
2. 🚬 **Berkeley Earth Inhaled Dosimetry Engine:** Converts ambient $\text{PM}_{2.5}$ ($\mu\text{g/m}^3$) directly into daily cigarette equivalence ($22\,\mu\text{g/m}^3 \approx 1\text{ cigarette}$) calibrated to 9 household vulnerability profiles (toddlers, asthmatics, elderly, commuters, pregnant mothers, students, athletes, pets, renters).
3. 🛠️ **₹1,250 Desi Jugaad Clean-Air Lab & CADR Calculator:** Fluid-dynamics simulator computing Clean Air Delivery Rate (CFM), Air Changes per Hour (ACH), and 90% particulate clean-time for a DIY Box-Fan + MERV 13/HEPA build at 19.2x lower cost than commercial ₹24,000 purifiers.
4. 📊 **Zero-Login Daily Clean-Air Check-In & Streak:** Local-first daily action checklist (`localStorage`) calculating blocked $\text{PM}_{2.5}$ dust (μg), cigarette equivalents avoided, and daily comeback streaks without any blocking login wall.
5. 🤖 **One-Click Multi-AI Prompt Synthesizer:** Auto-crafts context-synchronized clinical prompts injected with live weather, AQI, time phase, and vulnerability profiles for instant execution across Google Gemini, OpenAI ChatGPT, and Anthropic Claude.
6. 🔬 **Judges Live Prompt Inspector (DevTools):** Audits Gemini 2.5 Flash system instructions, sanitized user payloads, token counts, temperature, and latency in real time.
7. 🛡️ **Non-Recursive Zero-Crash Fallback Engine:** Guarantees zero blank screens during evaluator reviews when API keys are omitted, offline, or rate-limited (`429`).
8. 🌐 **Cross-Device Responsive & WCAG 2.1 AA Accessible:** Engineered for iOS (`viewport-fit=cover`, notch safe-area insets), Android Chrome, tablets, and desktops across 7 Indian languages with high-contrast Dark/Light themes.

---

## 🎯 Chosen Vertical
**[Challenge 6] Urban Air Quality Assistant**  
Architected for multi-generational households, renters, commuters, and vulnerable respiratory demographics experiencing winter particulate smog.

---

## 🧠 Approach and Atmospheric Logic

1. **Atmospheric Physics over Static AQI:** Models winter boundary-layer inversion trapping versus the `13:00–15:00` local convective thermal lift slot (`solarWindowEngine.js`).
2. **Epidemiological Dosimetry:** Adheres strictly to Berkeley Earth's peer-reviewed rule ($22\,\mu\text{g/m}^3\ \text{PM}_{2.5}$ over 24 hours $\equiv 1\text{ cigarette}$ smoked) alongside citations from *The Lancet Planetary Health*, *IIT Kanpur*, *Harvard T.H. Chan*, and *WHO* (`researchArticlesData.js`).
3. **Frugal Fluid Dynamics:** Implements ANSI/AHAM AC-1 & EPA airflow equations ($\text{Required CFM} = (\text{Volume} \times \text{Target ACH}) / 60$ and $t_{90} = \ln(10)/\text{ACH}$) with bounded dimension clamping (`cadrCalculator.js`).
4. **Structured GenAI Synthesis:** Enforces `temperature: 0.3` and strict JSON output parsing (`parseSafeAiPlan`) paired with deterministic fallback synthesis (`buildFallbackDefensePlan`) preventing recursive retry failures.

---

## ⚙️ Modular Code Quality & Engineering Standards

The codebase follows strict modular separation of concerns with static enforcement:
- **ESLint 9 Flat Config (`--max-warnings=0`):** Enforces `@eslint/js` recommended rules, `eslint-plugin-react`, `eslint-plugin-react-hooks`, and `eslint-plugin-jsx-a11y` across every file (`eslint.config.js`).
- **Custom Hook Decomposition (`src/hooks/`):** Decouples state management from presentation across `useAirQuality`, `useTheme`, `useLanguage`, `useDailyChecklist`, and shared modal keyboard hook `useModalAccessibility`.
- **Decomposed UI Components (`src/components/`):** `App.jsx` orchestrates focused modules (`LocationHeroBanner`, `CitySelector`, `AiPlanSpotlight`, `CommandCenterTab`, `RotaryAqiDial`, `VulnerabilityToggles`, `TelemetryGrid`, `DailyDefenseChecklist`, etc.) with one-click Home return via header logo.
- **Explicit Runtime Contracts:** All UI components enforce runtime `PropTypes` validation alongside JSDoc `@param`/`@returns` contracts on services, hooks, and utilities.
- **Centralized Constants (`src/constants/airQuality.js`):** Eliminates magic numbers and encodes declarative `AQI_THRESHOLDS`.

```mermaid
flowchart TD
    A["Device GPS & Diurnal Clock (useAirQuality)"] --> B["Open-Meteo CAMS Grid (15-min TTL Cache + Timeout)"]
    B --> C["Input Sanitizer & Bounds Validator (inputValidator.js)"]
    C --> D["Diurnal Inversion & Solar Lift Engine"]
    C --> E{"Gemini API Key Active?"}
    E -->|"Live Mode"| F["Gemini 2.5 Flash (Strict JSON Schema + parseSafeAiPlan)"]
    E -->|"Offline / Rate Limited"| G["Non-Recursive Deterministic Fallback Engine"]
    F --> H["Prompt Logger & Token Auditor (MAX 50 Entries)"]
    G --> H
    H --> I["Judges Live Prompt Inspector (DevTools)"]
    H --> J["Lazy-Loaded VayuMitra OS Command Center"]
```

---

## 🔒 Security & Privacy Hardening

- **HTTP Security Headers (`vercel.json`):** Enforces `Content-Security-Policy` (restricting scripts to `'self'`, telemetry endpoints cleanly allowlisted, `frame-ancestors 'none'`), `Strict-Transport-Security`, `Referrer-Policy`, `Permissions-Policy`, `X-Content-Type-Options: nosniff`, and `X-Frame-Options: DENY`.
- **Input Sanitization & Guardrails (`src/utils/inputValidator.js`):** Sanitizes free-text labels against angle brackets/control chars, normalizes city keys against traversal strings, validates WGS84 latitude/longitude bounds, clamps slider bounds, and safely strips markdown fences before parsing LLM JSON.
- **Secret Isolation:** `.env` files are excluded via `.gitignore` and documented via `.env.example`. `npm audit` reports **0 vulnerabilities**.

---

## ⚡ Performance & Bundle Optimization

- **Code Splitting (`React.lazy` + `Suspense`) & Zero-Flash Navigation:** All 6 modal dialogs load lazily on demand while primary tabs switch instantaneously in memory, keeping initial JS lean (~182 kB raw / ~53 kB gzip) and separating vendor chunks (`vendor-react`, `vendor-genai`, `vendor-icons`) via Vite 8 with zero build size warnings.
- **Resilient Networking:** Uses `AbortController` 4-second timeouts on Open-Meteo and Nominatim requests plus 15-minute in-memory coordinate caching.

---

## ♿ WCAG 2.1 AA Accessibility

- **Keyboard Navigation & Focus Management:** Includes a `Skip to main content` landmark link (`#main-content`), high-contrast `:focus-visible` emerald outlines, and shared Escape-key dismissal across all modals (`useModalAccessibility`) and header menus.
- **Semantic Landmarks & ARIA:** Every modal implements `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`. Stateful toggles expose `aria-pressed`, sensor progress bars expose `role="progressbar"` with `aria-valuenow`/`min`/`max`, and inline SVGs provide descriptive `<title>` + `aria-label` text.
- **Error Resilience:** Wrapped cleanly in `ErrorBoundary` with `role="alert"` safe recovery UI.

---

## 🧪 Automated Testing & Pre-Flight QA

All checks are automated across unit tests, security guardrails, GenAI failover tests, UI accessibility tests, and end-to-end flows (**5 test files, 34 passing tests**):

| Suite File | Focus Areas Covered | Environment |
|---|---|---|
| `tests/airQuality.test.js` | CADR math, Solar Window boundaries, Berkeley Earth rule, AQI classification, Open-Meteo caching & 503 fallback | Node |
| `tests/inputValidator.test.js` | HTML/control-char sanitization, key normalization, coordinate validation, numeric clamping, AI JSON schema parser | Node |
| `tests/geminiService.test.js` | Offline fallback, injected live client token logging, non-recursive `429` error failover verification, log buffer bounds | Node |
| `tests/components.test.jsx` | Rotary dial ARIA gauge, Vulnerability slider & toggles, CitySelector search, Daily checklist, Modal Escape keys, ErrorBoundary alert | jsdom + RTL |
| `tests/integration.test.jsx` | Onboarding dismissal, Plan generation -> Judges DevTools, BottomNav `aria-current`, App icon Home navigation, Hindi language switch | jsdom + RTL |

### Local Verification Commands
```bash
npm install
npm run lint       # ESLint (--max-warnings=0 across src, tests, scripts)
npm test           # Runs all 34 unit, security, component, and integration tests
npm run build      # Compiles code-split production bundle in dist/
npm run validate   # Executes the 10-point Submission Pre-Flight Auditor CLI
```

---

## 📌 Assumptions Made

1. **Boundary Layer Dynamics:** Nocturnal radiative cooling forms shallow winter cold-pool inversions that typically weaken under peak solar flux between 1:00 PM and 3:00 PM local time.
2. **Dosimetry Standard:** Adheres to the Berkeley Earth equivalence rule ($22\,\mu\text{g/m}^3$ ambient $\text{PM}_{2.5}$ over 24h $\approx 1$ smoked cigarette).
3. **DIY Box-Fan CADR Model:** Assumes a standard 20-inch box fan sealed cleanly against bypass gaps with MERV 13/H13 media yielding 86–94% single-pass fine particulate capture depending on fan speed.
4. **Evaluator Autonomy:** Without a `VITE_GEMINI_API_KEY` (or upon quota exhaustion), the system deterministically activates heuristic synthesis so interactive evaluation remains uninterrupted.

---

## 📁 Repository Structure

```text
aeroshield-ai/
├── docs/
│   ├── TECHNICAL_BLOG.md           # Full architectural narrative & prompt engineering writeup
│   ├── SUBMISSION_CHECKLIST.md     # Pre-flight verification checklist
│   ├── LINKEDIN_POST.md            # Build-in-public announcement template
│   └── DEMO_VIDEO_SCRIPT.md        # Walkthrough script synchronized to 01:45 HD demo
├── prompts/
│   ├── prompt-registry.json        # Machine-readable Challenge 6 schemas & guardrails
│   ├── README.md                   # Prompt engineering principles overview
│   └── templates/                  # 5-pillar clinical prompt structure
├── scripts/
│   └── validate-submission.mjs     # 10-point automated lint/test/security/build auditor CLI
├── src/
│   ├── components/                 # Accessible, PropTypes-validated React UI & lazy modals
│   ├── constants/                  # Centralized meteorological, AQI, and timing constants
│   ├── hooks/                      # Custom hooks (useAirQuality, useDailyChecklist, useTheme, useLanguage, useModalAccessibility)
│   ├── services/                   # Open-Meteo CAMS client, Gemini 2.5 Flash service, citations
│   └── utils/                      # CADR math, solar window, geolocation, input validator, i18n
├── tests/                          # Vitest + Testing Library suites (5 files, 34 passing tests)
├── eslint.config.js                # ESLint 9 flat config (React, Hooks, jsx-a11y)
├── vercel.json                     # Hardened security headers (CSP, HSTS, Referrer-Policy)
└── vite.config.js                  # Vite 8 + Rolldown vendor chunk optimization
```

---

## 🏅 Hackathon Details
* **Event:** [PromptWars Virtual Cohort 1](https://hack2skill.com/event/pwvirtual1)
* **Organized By:** Hack2skill × Google for Developers
* **Platform:** Google Antigravity
