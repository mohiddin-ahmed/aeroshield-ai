# 📋 Product Requirements Document (PRD): AeroShield AI (VayuMitra OS)
## Enterprise SDLC Framework (Microsoft, IBM & SAP Best Practices)

> **Document Version:** 1.0.0-RELEASE  
> **Target Challenge:** [Challenge 6] Urban Air Quality Assistant (PromptWars Virtual)  
> **Architectural Standard:** ISO/IEC/IEEE 29148:2018 & Microsoft Application Lifecycle Management  

---

### 1. Idea Identification
* **Product Name:** AeroShield AI (VayuMitra OS)
* **What we are building:** An intent-driven, fullstack air defense assistant and clean air command center.
* **Why we are building it:** Existing platforms report air pollution but fail to tell families what concrete decisions to make throughout the day. AeroShield AI turns smog anxiety into an actionable, science-backed defense strategy.

---

### 2. Problem Statement
During winter months, meteorological thermal inversion traps toxic particulate matter ($\text{PM}_{2.5}$, $\text{PM}_{10}$, $\text{NO}_2$) at breathing height across dense urban corridors. Families and communities face severe health risks but lack:
1. Knowledge of the exact meteorological solar window (1:00 PM – 3:00 PM) when ground smog temporarily disperses.
2. Awareness that dry broom sweeping causes a 340% spike in indoor particulate resuspension.
3. Access to affordable indoor filtration (assuming clean air requires ₹25,000+ commercial appliances).

---

### 3. Target Audience Research (User Personas)
* **Persona 1 (Multigenerational Household):** Parents with infants (developing lungs) and grandparents (hypertension/COPD).
* **Persona 2 (Daily Open-Air Commuter):** Two-wheeler and pedestrian commuters facing heavy direct road exhaust.
* **Persona 3 (Budget-Conscious Renter):** Apartment dwellers requiring low-cost indoor filtration and draft sealing.
* **Persona 4 (Community & School Coordinator):** School administrators and Resident Welfare Association (RWA) leads managing morning assemblies and preventing dry-leaf burning.

---

### 4. Market Research & Competitive Benchmarking
* **IQAir (AirVisual):** Strong global sensor network, but pushes expensive hardware and lacks daily lifestyle coaching.
* **Plume Labs (AccuWeather):** Good clean design, but lacks low-cost household hacks and localized regional smog protocols.
* **BreezoMeter (Google Weather):** Provides hyper-local data, but limits guidance to generic one-liners.
* **CPCB Sameer (India):** Official regulatory ground-truth, but has an outdated, non-responsive interface with zero AI capability.

---

### 5. Feature Research (Essential vs. Advanced)
* **P0 (Essential MVP):**
  * Live Open-Meteo Air Quality telemetry (PM2.5, PM10, $\text{NO}_2$, $\text{O}_3$, AQI).
  * 4-Screen Home.ai tactile layout (Command Center, Daily Routine, Desi Jugaad Lab, Research Hub).
  * Dynamic Solar Thermal Lift Window Calculator (1:00 PM – 3:00 PM).
  * Zero-Crash Mock Fallback Engine (evaluator-safe).
* **P1 (Advanced Differentiators):**
  * Direct Particulate Dosimetry ($\mu\text{g}$ PM2.5 lung exposure avoided).
  * Desi Jugaad Smog Survival Lab (₹1,200 Box-Fan CADR Calculator, Parda-Geela, Wet Pochha).
  * Scientific Research & Evidence Hub (Peer-reviewed citations from Lancet, WHO, IIT Kanpur).
  * In-App Live Prompt Inspector (Judges DevTools auditing Gemini 2.5 Flash tokens and latency).
  * Video Demo "Coming Soon" interactive modal.

---

### 6. Unique Value Proposition (UVP)
> *"The only environmental health assistant that combines live atmospheric telemetry with localized Desi Jugaad survival engineering and peer-reviewed science—delivering affordable clean air protection to every household."*

---

### 7. Project Scope
* **In-Scope:**
  * Cross-platform responsive Single Page Application (Mobile-first iPhone 15 Pro frame + Desktop Command Center).
  * 100% Free architecture: Open-Meteo API (no key required) + Google Gemini 2.5 Flash free tier + Local Mock Fallback.
  * Public GitHub repository under 10 MB on a single `main` branch.
  * Automated test suites via Vitest (`npm test`) and Pre-Flight Validator (`npm run validate`).
* **Out-of-Scope:**
  * Proprietary hardware manufacturing.
  * Paid third-party API subscriptions.

---

### 8. MVP Planning (Release 1.0)
* **Release Artifacts:**
  1. Complete tactile web application in `src/`.
  2. Automated test suite in `tests/airQuality.test.js`.
  3. Pre-flight evaluator verification CLI (`scripts/validate-submission.mjs`).
  4. Video demo modal with "Coming Soon" preview placeholder.
  5. Comprehensive documentation in `docs/` and `challenges/challenge-06-urban-air-quality/`.

---

### 9. Requirement Documentation (Technical Contracts)
* **Design System Tokens:**
  * Primary: Lunar Shadow (`#282828`)
  * Backgrounds: Clean White (`#FFFFFF`) & Gray Whisper (`#F7F7F7`)
  * Accents: Gentle Olive (`#CBD77E`), Winter Hazel (`#E6CA9A`), Deep Crimson (`#9B2226`)
  * Typography: Sora (Google Font) + JetBrains Mono (Data)
* **Data Contracts:**
  * Real-time AQI JSON from Open-Meteo.
  * Deterministic output schema from Gemini 2.5 Flash (`routine`, `desi_jugaad`, `impact_scorecard`).

---

### 10. Success Metrics
* **Performance:** Execution latency $< 600\text{ms}$; production build $< 1\text{s}$.
* **Quality & Reliability:** 100% passing tests (`npm test`); 0 console warnings; zero-crash fallback operational.
* **Compliance:** 100% score on the 6 official Hack2skill AI code evaluation parameters.
