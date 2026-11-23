# ⚙️ Development Environment, Project Setup & Engineering Standards
## Enterprise SDLC Specification (Microsoft, IBM & SAP Application Standards)

> **Document Version:** 1.0.0-PROD  
> **Target Challenge:** [Challenge 6] Urban Air Quality Assistant (PromptWars Virtual)  
> **Production Target:** `https://aeroshield.ummeedlabs.com` (Vercel Edge)  
> **Commercial Target:** Google Play Console (TWA/PWA) & Apple App Store  
> **Compliance Standard:** ISO/IEC 25010 Quality Model, OWASP Top 10, WCAG 2.1 AA  

---

### 1. Git Repository Setup
* **Repository State:** Initialized at `D:\PROJECTS\PromptWars`.
* **Branch Strategy:** Standard trunk-based development on a single `main` branch (Hack2skill evaluation requirement).
* **Commit Standards:** Conventional Commits specification:
  * `feat(air-quality): ...` for new user-facing features
  * `fix(cadr): ...` for bug fixes or mathematical corrections
  * `docs(architecture): ...` for PRD and SDLC specs
  * `test(vitest): ...` for automated test suites
* **Repository Size Control:** Strict `.gitignore` policy excluding `node_modules`, `dist`, `.env`, raw media binaries (`.mp4`, `.wav`), keeping total Git tree under **10 MB** (currently **~143 KB**).

---

### 2. Folder Structure (Clean Architecture & Modular Domain Design)

```
D:\PROJECTS\PromptWars/
├── .github/
│   └── workflows/
│       └── ci.yml                     # Automated GitHub Actions test, lint, and build pipeline
├── challenges/
│   └── challenge-06-urban-air-quality/# Complete SDLC & PRD documentation
│       ├── PRODUCT_REQUIREMENTS_DOCUMENT.md
│       ├── STRUCTURE_AND_COLOR_SYSTEM.md
│       ├── MASTER_KNOWLEDGE_BASE_AND_DESIGN.md
│       ├── TECHNICAL_ARCHITECTURE.md
│       ├── UI_UX_DESIGN_AND_PROTOTYPING.md
│       ├── PROJECT_SETUP_AND_STANDARDS.md
│       └── SUBMISSION_PORTAL_DRAFT.md
├── docs/                              # Submission artifacts & public documentation
│   ├── TECHNICAL_BLOG.md              # In-depth technical architecture writeup
│   ├── LINKEDIN_POST.md               # Viral public launch post
│   ├── DEMO_VIDEO_SCRIPT.md           # Option A Prismatic Glass script with VayuBot
│   └── SUBMISSION_CHECKLIST.md        # Pre-flight evaluation checklist
├── scripts/
│   └── validate-submission.mjs        # Evaluator automated pre-flight audit tool
├── src/                               # Application Source Code
│   ├── assets/                        # SVG icons, logos, brand illustrations
│   ├── components/                    # Reusable tactile & glassmorphic UI components
│   │   ├── Navbar.jsx                 # Header with live CAMS badge, video modal & devtools triggers
│   │   ├── SegmentedNav.jsx           # Home.ai 4-view tactile navigation
│   │   ├── RotaryAqiDial.jsx          # Circular rotary gauge with ambient severity glow
│   │   ├── TelemetryGrid.jsx          # Real-time PM2.5, PM10, NO2, O3 cards
│   │   ├── VulnerabilityToggles.jsx   # Toddler, Elderly, Asthma, Commuter filters
│   │   ├── SmogRoutineTimeline.jsx    # 24-hr stepped timeline (1-3 PM solar lift)
│   │   ├── DesiJugaadLab.jsx          # ₹1,200 Box-Fan CADR calculator, wet-mop, kadha
│   │   ├── MultiAiConsultation.jsx    # 1-Click prompt launcher (ChatGPT, Claude, Gemini)
│   │   ├── ResearchHub.jsx            # Lancet, WHO, IIT Kanpur papers + Dosimetry calculator
│   │   ├── DemoVideoModal.jsx         # Apple Keynote Option A preview modal
│   │   └── PromptInspector.jsx        # Judges DevTools slide-over telemetry drawer
│   ├── services/                      # Data Access & API Layer
│   │   ├── airQualityService.js       # Live Open-Meteo REST client with SWR cache
│   │   ├── mockAirQualityData.js      # Zero-crash high-fidelity offline fallback
│   │   ├── gemini.js                  # Google Gemini 2.5 Flash GenAI engine
│   │   └── researchArticlesData.js    # Academic citation dataset with DOI & PubMed links
│   ├── utils/                         # Pure helper functions
│   │   ├── cadrCalculator.js          # Room Sq Ft to CFM & ACH mathematical formulas
│   │   ├── solarWindowEngine.js       # Atmospheric thermal inversion calculation
│   │   └── promptLogger.js            # Telemetry audit logger for judges
│   ├── App.jsx                        # Root application component & screen coordinator
│   ├── index.css                      # Tailwind v4 configuration, Sora fonts, glassmorphism tokens
│   └── main.jsx                       # React 19 application entry point
├── tests/                             # Automated Test Suites
│   ├── airQuality.test.js             # Telemetry parsing, API reliability & CADR tests
│   └── eventPlanner.test.js           # Multi-challenge compatibility tests
├── .env.example                       # Committed environment variable template
├── .gitignore                         # Strict exclusion rules
├── index.html                         # Semantic HTML5, Sora font, OpenGraph & JSON-LD schema
├── package.json                       # Scripts, dependencies, and lock metadata
└── vite.config.js                     # Vite 8 bundler configuration
```

---

### 3. Development Environment
* **Node.js Runtime:** Node.js v20.x or v22.x LTS.
* **Package Manager:** npm (v10.x).
* **Bundler & Dev Server:** Vite 8 with `@vitejs/plugin-react`.
* **CSS Processor:** Tailwind CSS v4 with `@tailwindcss/vite` plugin.
* **Operating System Support:** Windows, macOS, Linux (cross-platform compatible).

---

### 4. Package Management & Dependency Governance
* Strict lockfile (`package-lock.json`) committed to guarantee 100% reproducible builds.
* Zero bloated dependencies:
  * Pure lightweight SVG rendering (Lucide React) instead of bulky icon packs.
  * Native JavaScript Canvas/SVG for circular rotary dials instead of heavy charting libraries.
  * Direct fetch API with timeout controls instead of Axios.

---

### 5. Environment Variables & Secret Management
* **Strict Rule:** Never commit active secrets or keys to Git.
* `.env.example` committed with documented keys:
  ```bash
  # Google Gemini API Key (Optional for free tier; app auto-falls back to local engine if missing)
  VITE_GEMINI_API_KEY=your_gemini_api_key_here

  # Deployment Domain & Tracking
  VITE_APP_URL=https://aeroshield.ummeedlabs.com
  VITE_ENABLE_MOCK_FALLBACK=true
  ```
* In production on Vercel, `VITE_GEMINI_API_KEY` is injected securely through the Vercel Dashboard Environment Variables.

---

### 6. Code Standards & Naming Conventions
* **Components:** PascalCase (`RotaryAqiDial.jsx`, `MultiAiConsultation.jsx`).
* **Utilities & Services:** camelCase (`airQualityService.js`, `cadrCalculator.js`).
* **Constants & Tokens:** UPPER_SNAKE_CASE (`LUNAR_SHADOW`, `MAX_AQI_HAZARDOUS`).
* **Clean Code Practices:**
  * Functions adhere to Single Responsibility Principle (SRP).
  * Strict prop validation and fallback defaults.
  * Zero dead code or unreferenced imports.

---

### 7. Linting & Formatting
* Clean ESLint & Prettier compatible code style.
* Standardized 2-space indentation and single-line semicolons.
* Automated pre-flight submission validator (`node scripts/validate-submission.mjs`) checking for:
  1. Zero hardcoded secrets in source files.
  2. Complete documentation and test coverage.
  3. Valid build without warnings.

---

### 8. Testing Framework Setup (Vitest 3.x)
* **Runner:** Vitest (`npm test`).
* **Test Coverage:**
  * Unit tests for mathematical CADR and ACH calculations.
  * Solar thermal lift window determination (hour checks between 13:00 and 15:00).
  * Real-time Open-Meteo telemetry parser and edge-case handling (AQI 0 clean air vs. AQI 500+ emergency smog).
  * Zero-crash fallback validation.

---

### 9. CI/CD Pipeline (GitHub Actions & Vercel Edge)
* **GitHub Actions Workflow (`.github/workflows/ci.yml`):**
  * Triggered on every `push` and `pull_request` to `main`.
  * Runs:
    1. Dependency installation (`npm ci`).
    2. Automated test suite (`npm test`).
    3. Hack2skill submission validator (`npm run validate`).
    4. Production build check (`npm run build`).
* **Vercel Edge Deployment:**
  * Connected to GitHub repo `main` branch.
  * Auto-deploys to `https://aeroshield.ummeedlabs.com` upon passing CI checks.

---

### 10. Documentation Setup
* Complete technical documentation suite established:
  * `README.md`: High-impact GitHub repository landing page with badges, screenshots, architecture diagram, and quickstart commands.
  * `challenges/challenge-06-urban-air-quality/`: Complete SDLC specs (PRD, Technical Architecture, UI/UX, Setup).
  * `docs/TECHNICAL_BLOG.md`: 1,500+ word engineering article ready for Hashnode, Dev.to, and Medium.
  * `docs/LINKEDIN_POST.md`: Formatted social launch post adhering to hackathon requirements.
