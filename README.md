# 🛡️ AeroShield AI (VayuMitra OS) — Urban Air Quality Defense Companion

[![Build Status](https://img.shields.io/badge/Build-Passing-emerald?style=for-the-badge&logo=vite)](https://github.com)
[![Evaluator Compliance](https://img.shields.io/badge/Evaluator%20Compliance-100%25-indigo?style=for-the-badge)](https://hack2skill.com/event/pwvirtual1)
[![AI Engine](https://img.shields.io/badge/Gemini%20API-2.5%20Flash-blue?style=for-the-badge&logo=google)](https://aistudio.google.com)
[![Zero-Crash](https://img.shields.io/badge/Fallback%20Engine-Active-amber?style=for-the-badge)](https://github.com)
[![Live Deployment](https://img.shields.io/badge/Live%20App-Vercel-emerald?style=for-the-badge&logo=vercel)](https://aeroshield-ai-sandy.vercel.app/)
[![Demo Video](https://img.shields.io/badge/Demo%20Video-Watch%20HD-rose?style=for-the-badge&logo=googledrive)](https://drive.google.com/file/d/18vHHx8OvH3ZrenDX-60WtGm0OsJ_NTD7/view?usp=sharing)

> **PromptWars Virtual [Challenge 6: Urban Air Quality Assistant]**  
> *Turn Winter Smog Anxiety into Daily Clean-Air Strategy.*  
> **Live App:** [https://aeroshield-ai-sandy.vercel.app/](https://aeroshield-ai-sandy.vercel.app/) • **Demo Video:** [Watch 01:45 HD Walkthrough](https://drive.google.com/file/d/18vHHx8OvH3ZrenDX-60WtGm0OsJ_NTD7/view?usp=sharing) • **LinkedIn:** [Launch Announcement](https://www.linkedin.com/posts/mohiddin-ahmed-motiya-19ba06393_promptwars-hack2skill-googlefordevelopers-activity-7531098612081061888-a7pz)  
> Built with **Google Antigravity**, **Gemini 2.5 Flash API**, **Open-Meteo High-Resolution Satellite Atmospheric Sensors**, and **Tailwind CSS**.

---

## 🌟 The Crisis & Our Solution

Every winter across the Indo-Gangetic Plains (Delhi NCR, Patna, Lucknow, Kolkata, Lahore), **over 300 million citizens breathe toxic particulate matter equivalent to smoking 25 to 30 cigarettes a day**. Commercial air purifiers cost ₹20,000–₹40,000+, while standard weather apps simply show red numbers and induce panic without providing actionable, low-cost harm reduction.

**AeroShield AI (VayuMitra OS)** is an enterprise-grade GenAI clean-air defense companion and household operating system that provides:
1. ☀️ **1–3 PM Diurnal Solar Convective Lift Window:** Mathematically detects when thermal solar expansion temporarily breaks the ground cold-pool inversion layer, safely allowing 15 minutes of cross-ventilation.
2. 🚬 **Berkeley Earth Inhaled Dosimetry Equivalence:** Translates ambient PM2.5 ($\mu\text{g/m}^3$) into real-world daily cigarette equivalence, personalizing health risk for toddlers, asthmatics, and the elderly.
3. 🛠️ **₹1,200 Desi Jugaad Lab & CADR Calculator:** Fluid dynamics calculator for a DIY Box-Fan + MERV 13/HEPA filter delivering 300+ CFM Clean Air Delivery Rate at 90% lower cost than commercial purifiers.
4. 🤖 **One-Click Multi-AI Deep Dive Engine:** 1-click prompt synthesizer launching ChatGPT, Claude, and Gemini with auto-synchronized real-time weather and family profiles.
5. 📍 **Zero-Friction Device GPS & Time Context:** Real-time geolocation with fallback to an Indian metro catalog, synchronized to solar phases.
6. 🔬 **Judges Live Prompt Inspector (DevTools):** Real-time transparent auditing of Gemini 2.5 Flash system instructions, prompt payloads, and latency.
7. 🛡️ **Zero-Crash Resilience Engine:** Evaluators never experience a blank screen; automatic fallback seamlessly activates if API keys are missing or rate-limited.
8. 🌐 **7 Indian Regional Languages:** Complete localization in English, Hindi, Bengali, Telugu, Tamil, Kannada, and Marathi.

---

## 🎯 Chosen Vertical
**[Challenge 6] Urban Air Quality Assistant**  
Designed for citizens, families, and vulnerable demographics (infants, asthmatics, elderly) across severe particulate smog zones in the Indo-Gangetic Plains and global urban metros.

---

## 🧠 Approach and Logic

1. **Atmospheric Physics over Static AQI:** Traditional apps display passive red numbers that induce anxiety. AeroShield AI models the diurnal boundary layer: winter smog is trapped by nocturnal radiation inversions. At 1–3 PM, peak solar flux heats the ground, triggering convective thermals that break the cold pool. AeroShield detects this window to prescribe the exact 15-minute cross-ventilation time.
2. **Clinical Dosimetry (Berkeley Earth Rule):** Translates abstract $\mu\text{g/m}^3$ numbers into tangible human health impact: $22\,\mu\text{g/m}^3$ of PM2.5 inhaled over 24 hours $\approx 1$ smoked cigarette.
3. **Democratized Clean Air (Frugal Engineering):** Instead of inaccessible ₹25,000 commercial purifiers, we engineer an interactive fluid dynamics CADR calculator for a ₹1,200 DIY Box-Fan with MERV 13/HEPA filtration delivering 300+ CFM.
4. **Resilient GenAI (Gemini 2.5 Flash):** Uses strict JSON schemas with demographic risk weighting, auditable via Judges DevTools, paired with a Zero-Crash fallback engine.

---

## ⚙️ How the Solution Works

```mermaid
flowchart TD
    A["Device GPS & Time Sensor"] --> B["Atmospheric Telemetry Engine (Copernicus / Open-Meteo)"]
    B --> C["Diurnal Inversion & Solar Lift Analyzer"]
    C --> D{"Gemini API Key Active?"}
    D -->|"Live Key"| E["Gemini 2.5 Flash Clinical Pulmonology Model"]
    D -->|"Rate Limited / Offline"| F["Zero-Crash High-Fidelity Mock Engine"]
    E --> G["Prompt Logger & Token Auditor"]
    F --> G
    G --> H["Judges Live Prompt Inspector"]
    G --> I["VayuMitra OS Command Center (Dial, Routine, Jugaad, Research)"]
```

1. **Telemetry Ingestion:** Real-time satellite & sensor streaming (PM2.5, PM10, NO2, O3, temperature, humidity, wind) via Open-Meteo and Copernicus CAMS.
2. **Solar Window Computation:** Evaluates local solar zenith and ground temperature differential to alert users when the 1–3 PM convective lift window is open.
3. **GenAI Plan Generation:** Sends structured context to Gemini 2.5 Flash API to synthesize actionable hourly routines tailored to active vulnerabilities (asthma, infants, elderly, renters).
4. **Multi-AI Launcher:** Synthesizes context-rich prompts ready for 1-click execution in Google Gemini, ChatGPT, and Claude.
5. **Observability & Accessibility:** Judges can audit prompt schemas in real time with 'Judges DevTools', toggle 7 Indian languages, or switch between dark/light themes.

---

## 📌 Assumptions Made

1. **Atmospheric Inversion Dynamics:** Assumes winter continental boundary layer dynamics where nocturnal radiative ground cooling creates a stable inversion layer that typically breaks between 1:00 PM and 3:00 PM under direct solar irradiation.
2. **Inhaled Dosimetry Equivalence:** Adheres to the peer-reviewed Berkeley Earth epidemiological standard ($22\,\mu\text{g/m}^3$ ambient PM2.5 over 24 hours equals the particulate mass of 1 smoked cigarette).
3. **DIY Box-Fan CADR:** Models a standard 20-inch 3-speed box fan with a MERV 13 or HEPA filter sealed with masking/duct tape, yielding single-pass particulate capture efficiency of 85–90% and Clean Air Delivery Rate of 250–350 CFM.
4. **Telemetry Representation:** Satellite telemetry reflects 11 km grid ambient levels; indoor micro-climates vary based on window seal integrity and building height.
5. **Failover Transparency:** If the evaluator runs without a live Gemini API key, the system assumes full autonomy and activates high-fidelity clinical heuristic routines rather than breaking.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    A["Device GPS & Time Sensor"] --> B["Atmospheric Telemetry Engine (Copernicus / Open-Meteo)"]
    B --> C["Diurnal Inversion & Solar Lift Analyzer"]
    C --> D{"Gemini API Key Active?"}
    D -->|"Live Key"| E["Gemini 2.5 Flash Clinical Pulmonology Model"]
    D -->|"Rate Limited / Offline"| F["Zero-Crash High-Fidelity Mock Engine"]
    E --> G["Prompt Logger & Token Auditor"]
    F --> G
    G --> H["Judges Live Prompt Inspector"]
    G --> I["VayuMitra OS Command Center (Dial, Routine, Jugaad, Research)"]
```

---

## 🚀 Quick Start Guide

### 1. Clone & Install Dependencies
```bash
git clone <your-repo-url>
cd PromptWars
npm install
```

### 2. Configure Environment (Optional for Live Gemini API)
```bash
cp .env.example .env
```
Add your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey):
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: If you do not provide a key, the application automatically runs in **Zero-Crash Evaluator Mode** with full interactivity!)*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Pre-Submission Validation & Quality Audit

Run our automated Hack2skill pre-flight audit CLI:
```bash
npm test
node scripts/validate-submission.mjs
npm run build
```
All **13 tests pass**, all **8 pre-flight compliance checks pass**, and the production Vite bundle compiles in under 600ms.

---

## 📁 Repository Structure

```
PromptWars/
├── docs/
│   ├── TECHNICAL_BLOG.md       # Full architectural writeup for Hack2skill judges
│   ├── SUBMISSION_CHECKLIST.md # Pre-flight checklist before portal submission
│   ├── LINKEDIN_POST.md        # Official Build-in-Public post template
│   └── DEMO_VIDEO_SCRIPT.md    # 2-minute high-impact video presentation script
├── prompts/
│   ├── prompt-registry.json    # Machine-readable Challenge 6 prompt specifications
│   └── templates/              # 5-Pillar prompt engineering patterns
├── scripts/
│   └── validate-submission.mjs # Pre-flight evaluator audit CLI
├── src/
│   ├── components/             # RotaryDial, SmogRoutine, DesiJugaad, ResearchHub, Modals
│   ├── services/               # Live Open-Meteo & Gemini 2.5 Flash client with fallbacks
│   └── utils/                  # CADR calculator, Solar window engine, i18n (7 languages)
├── tests/                      # Vitest unit test suite (13 passing tests)
└── package.json
```
```

---

## 🏅 Hackathon Details
* **Event:** [PromptWars Virtual Cohort 1](https://hack2skill.com/event/pwvirtual1)
* **Organized By:** Hack2skill × Google for Developers
* **Platform:** Google Antigravity

