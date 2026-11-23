# 🎨 AeroShield AI: Visual System, Structure & Color Architecture
## Based on Home.ai Wireframes, Sora Typography & Tactile Color Palette

> **Reference Images Analyzed:**
> 1. `media_..._2edce5f8.jpg`: "Structuring The Experience" (Wireframes & Screen Flows)
> 2. `media_..._a407f975.jpg`: "Home.ai Visual System" (Mobile Screens & Segmented Controls)
> 3. `media_..._c6e7ecc9.png`: "Typography And Color" (Sora Font & 5 Core Color Hex Codes)

---

## 1. Official Color Architecture & Tokens

Matching the exact palette from your uploaded specification:

| Color Name | Hex Code | Role in AeroShield AI | UI Implementation |
| :--- | :---: | :--- | :--- |
| **Lunar Shadow** | `#282828` | **Primary Brand / Text** | Dark tactile buttons, typography headers, dark mode card bases, active segmented pill indicators. |
| **Clean White** | `#FFFFFF` | **Background Color 1** | Primary card surfaces, glassmorphic card fill, modal overlays, high-contrast badges. |
| **Gray Whisper** | `#F7F7F7` | **Background Color 2** | App background canvas, secondary container fills, inactive tab bars. |
| **Gentle Olive** | `#CBD77E` | **Accent Color 1 (Eco-Safe)** | Good AQI indicators (0–50), primary action buttons, toggle switches, clean air scorecards, active solar window badges. |
| **Winter Hazel** | `#E6CA9A` | **Accent Color 2 (Inversion / Warm)** | Moderate AQI indicators (51–100), thermal inversion warning cards, sunset countdowns, Desi Jugaad highlight badges. |

### Dynamic AQI Severity Scale (Harmonized with the Palette):
* **AQI 0–50 (Good):** `#CBD77E` (Gentle Olive)
* **AQI 51–100 (Moderate):** `#E6CA9A` (Winter Hazel)
* **AQI 101–200 (Poor / Unhealthy):** `#E07A5F` (Soft Terracotta)
* **AQI 201–300 (Very Poor):** `#F26419` (Vivid Coral)
* **AQI 301–500+ (Hazardous Winter Smog):** `#9B2226` / `#7F1D1D` (Deep Lunar Crimson)

---

## 2. Typography System

* **Primary Font:** **Sora** (Google Fonts: 300, 400, 500, 600, 700)
  * *H1 / Hero Titles:* `Sora SemiBold / Bold (32px – 44px)` with tight letter-spacing (`tracking-tight`).
  * *Card Headings:* `Sora SemiBold (16px – 20px)`.
  * *Body & UI Labels:* `Sora Regular / Medium (12px – 14px)`.
* **Telemetry & Numeric Font:** **JetBrains Mono**
  * *AQI Values, Latency, μg Counts, Timestamps:* `JetBrains Mono Medium / Bold` for technical precision.

---

## 3. Screen Structure & User Flow (Wireframe Mapping)

Matching the 4 interconnected wireframes from `Structuring The Experience`:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SCREEN 1: Air Defense Command Center (Dashboard & Rotary Dial)              │
│ • Rotary Circular Gauge (like 23° dial in wireframe) -> Displays AQI 425    │
│ • Location Switcher: Delhi NCR, Mumbai, Lahore, New York, or Live GPS       │
│ • Segmented Pill Bar: [All] [Toddler] [Elderly] [Asthma] [Commuter]        │
│ • Live Quick Action Pills: "N95 Mask Needed" • "Seal Windows"               │
│ • Live Telemetry Cards: PM2.5 (μg/m³), PM10, NO2, O3 via Open-Meteo         │
├─────────────────────────────────────────────────────────────────────────────┤
│ SCREEN 2: Smog-Safe Automations & Daily Routine (Wireframe Screen 2 & 4)    │
│ • Stepped Milestone Timeline (like Automations & 17:30 timer dial)          │
│ • Step 1 (07:00 AM): Morning Inversion Peak — Windows Sealed, Air Filter High│
│ • Step 2 (01:00 PM - 03:00 PM): ☀️ The Solar Lift Safe Ventilation Window    │
│ • Step 3 (05:30 PM): Staggered Evening Commute & Mask Protocol              │
│ • Step 4 (09:00 PM): Night Clean-Room Positive Pressure Protocol            │
├─────────────────────────────────────────────────────────────────────────────┤
│ SCREEN 3: Desi Jugaad & Indoor Air Quality (IAQ) Lab (Wireframe Screen 3)   │
│ • Grid Cards for Household Solutions (like Video Surveillance Cards):       │
│   1. ₹1,200 DIY Box-Fan HEPA Purifier (300 CFM CADR Calculator)             │
│   2. "Parda-Geela" Damp Cotton Curtain Soot Shield                          │
│   3. "Rock-Salted Pochha" Wet-Mopping Particle Suppressor                   │
│   4. Ayurvedic Anti-Smog Kadha & Eucalyptus Steam Protocol                  │
│   5. Raw Jaggery (Gur) Bronchial Cleanser                                   │
│   6. Window AC Seal & Positive Pressure Hack                                │
├─────────────────────────────────────────────────────────────────────────────┤
│ SCREEN 4: Scientific Research & Evidence Hub (Professional Reading Page)   │
│ • Peer-Reviewed Academic Papers:                                            │
│   - The Lancet (2023): Winter Inversion Particulate Surge in Northern India  │
│   - IIT Kanpur Atmospheric Sciences: Boundary Layer Inversion Study         │
│   - Harvard T.H. Chan: Wet-Mopping vs. Dry Sweeping Resuspension Rates      │
│   - WHO Air Quality Guidelines (2021): 24-hr PM2.5 Safety Thresholds        │
│ • Category Filter: [All Papers] [Epidemiology] [Atmospheric Physics] [Hacks]│
│ • Direct Impact Scorecard: Inhaled μg PM2.5 Avoided + kg CO2 Offset         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Mobile & Desktop Responsive Harmony

* **Mobile Frame View:** Sleek rounded mobile container (`max-w-md mx-auto`) with a floating bottom pill navigation bar (`[Dashboard] [Routines] [Desi Jugaad] [Research]`), thumb-friendly controls, and tactile feedback.
* **Desktop Command Center View:** Automatically unfolds into an expansive widescreen dashboard on desktop while preserving the exact same rounded tactile card design and color tokens.
* **Judges In-App Prompt Inspector:** Slide-over telemetry drawer accessible via top-right DevTools button, auditing Gemini 2.5 Flash token counts, prompt payloads, and execution latencies.
