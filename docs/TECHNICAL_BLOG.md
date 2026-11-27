# Building AeroShield AI (VayuMitra OS): Engineering a Resilient, Accessible GenAI Clean-Air Operating System

> **Event:** PromptWars Virtual (Hack2skill × Google for Developers)  
> **Challenge:** Challenge 6: Urban Air Quality Assistant  
> **Live Demo App:** [https://aeroshield-ai-sandy.vercel.app/](https://aeroshield-ai-sandy.vercel.app/)  
> **Demo Video (01:45 HD):** [Watch Walkthrough on Google Drive](https://drive.google.com/file/d/18vHHx8OvH3ZrenDX-60WtGm0OsJ_NTD7/view?usp=sharing)  
> **GitHub Repository:** [https://github.com/mohiddin-ahmed/aeroshield-ai](https://github.com/mohiddin-ahmed/aeroshield-ai)  

---

## 1. Abstract & Problem Statement

Every winter across the Indo-Gangetic Plains, over **300 million citizens breathe toxic air equivalent to smoking 25 to 30 cigarettes a day**. Thermal boundary-layer inversions trap $\text{PM}_{2.5}$, $\text{NO}_2$, and volatile organic compounds near ground level.

Commercial solutions create a stark affordability divide: branded HEPA air purifiers cost ₹20,000–₹40,000+, while conventional weather dashboards simply flash red AQI warnings without delivering low-cost harm-reduction protocols.

Our mission with **AeroShield AI (VayuMitra OS)** is to **turn winter smog anxiety into daily clean-air strategy** using **Google Antigravity**, the **Gemini 2.5 Flash API**, **Open-Meteo European Copernicus CAMS telemetry**, fluid-dynamics calculators, and production engineering guardrails.

---

## 2. System Architecture & Tech Stack

```mermaid
flowchart TD
    A["Auto-Detected Device GPS & Diurnal Clock"] --> B["Open-Meteo CAMS Satellite Grid (15-min TTL Cache)"]
    B --> C["Input Sanitization & Diurnal Solar Thermal Lift Engine"]
    C --> D{"Gemini API Key Available?"}
    D -->|"Live Mode"| E["Gemini 2.5 Flash Clinical Model (Strict JSON + parseSafeAiPlan)"]
    D -->|"Quota Limit / Offline"| F["Non-Recursive Zero-Crash Fallback Engine"]
    E --> G["Bounded Prompt Telemetry Logger"]
    F --> G
    G --> H["Judges Live Prompt Inspector (DevTools)"]
    G --> I["Code-Split VayuMitra OS UI (WCAG 2.1 AA)"]
```

### Engineering Stack:
* **Agentic Orchestration:** Google Antigravity
* **Foundation Model:** Google Gemini 2.5 Flash API (`temperature: 0.3`, strict `application/json` schema validation)
* **Atmospheric Data Pipeline:** Open-Meteo Copernicus CAMS 11km model grid ($\text{PM}_{2.5}$, $\text{PM}_{10}$, $\text{NO}_2$, $\text{O}_3$) with 4s `AbortController` timeouts
* **Frontend Platform:** React 19 with strict **TypeScript (`tsc --noEmit`)**, Prettier formatting, decomposed single-responsibility modules, lazy-loaded modals, Tailwind CSS v4, and Vite 8 (Rolldown vendor chunk splitting)
* **Quality, Security & Accessibility:** ESLint 9 (`typescript-eslint` + `jsx-a11y` zero-warning enforcement), strict zero-`'unsafe-inline'` CSP/COOP/HSTS security headers (`vercel.json`), iOS/Android safe-area responsiveness, and **43 automated Vitest + Testing Library tests across 6 suites (89.05% line coverage)**

---

## 3. Prompt Strategy & Engineering Framework

We engineered a specialized **5-Pillar Clinical Prompt Architecture**:

1. **Role & Clinical Persona Calibration:** Strictly constrains the model as *VayuMitra AI*, prescribing boundary-layer timing and frugal household interventions grounded in epidemiology rather than generic platitudes.
2. **Deterministic Schema Guardrails (`parseSafeAiPlan`):** Strips accidental Markdown wrappers and validates mandatory keys (`assessment`, 4-phase `daily_routine`, `jugaad_prescriptions`, `dosimetry_impact`) before UI rendering.
3. **Input Sanitization Prior to Prompt Interpolation (`src/utils/inputValidator.ts`):** Sanitizes city names, coordinate bounds, and vulnerability arrays prior to building LLM prompts or external links.
4. **Live Prompt Inspector (Judges DevTools):** Records every live or offline execution in memory (`src/utils/promptLogger.ts`) with system instructions, payloads, response JSON, latency, and token metrics.

---

## 4. Key Engineering Challenges & How We Solved Them

### Challenge 1: Eliminating Evaluator "Blank Screen" & Fallback Recursion Risks
* **The Problem:** External API keys in public reviews frequently encounter `429 Quota Exceeded` or network timeouts. Calling the primary API function recursively inside `catch` risks infinite retry loops.
* **Our Solution:** Separated deterministic heuristic synthesis (`buildFallbackDefensePlan`) from `generateSmogDefensePlan`, ensuring single-pass non-recursive failover backed by a top-level React `ErrorBoundary` and `AbortController` API timeouts.

### Challenge 2: Bundle Bloat, Strict CSP & Cross-Device Accessibility
* **The Problem:** Loading all heavy modals upfront bloated initial page load, while dynamic inline styles force lax `'unsafe-inline'` CSP directives.
* **Our Solution:** Code-split all 6 modal dialogs using `React.lazy()` + `<Suspense>` and configured Vite 8 `codeSplitting.groups`, separating vendor chunks while keeping entry JS at **179.91 kB raw / 53.84 kB gzip**. Replaced all inline `style={{...}}` attributes with Tailwind utility maps and SVG vector geometry so `vercel.json` enforces `style-src 'self' https://fonts.googleapis.com` with zero `'unsafe-inline'`. Added `viewport-fit=cover`, `useModalAccessibility` Escape-key dismissal with trigger focus restoration, `aria-live="polite"` navigation announcements, and `prefers-reduced-motion: reduce`.

---

## 5. Verification & Conclusion

Running `npm run validate` verifies every automated gate end to end: strict TypeScript (`tsc --noEmit`), Prettier formatting, ESLint (`--max-warnings=0`), all **43 Vitest tests across 6 suites**, code-split Vite compilation, MIT license compliance, strict zero-`'unsafe-inline'` CSP/HSTS headers, and prompt registry integrity.

AeroShield AI (VayuMitra OS) demonstrates how intent-driven engineering with Google Antigravity and Gemini 2.5 Flash can deliver clinically grounded, accessible environmental protection software at zero household cost.
