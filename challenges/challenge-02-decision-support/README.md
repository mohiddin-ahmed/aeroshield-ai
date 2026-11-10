# ⚡ Challenge 2: Real-Time Decision Support & Orchestration Agent

> **Cohort:** PromptWars Virtual — Challenge 2  
> **Theme:** Multi-Agent Intent Parsing, Constraint Balancing & Dynamic Trade-Off Optimization  

---

## 1. Problem Statement Overview
Participants were tasked with building an AI-powered real-time decision orchestration engine capable of ingesting high-stakes contextual inputs (e.g., medical triage, disaster management, or logistics bottlenecks) and producing actionable decision trees with risk-weighted pathways.

---

## 2. Winner Breakdown: Why Top Submissions Won Maximum Credits
* **Multi-Tier Decision Paths:** Winners did not offer just one answer. They generated **3 distinct pathways** (Conservative, Balanced, Aggressive) with risk/reward percentages.
* **Guardrail Enforcement:** High scorers included explicit failure mode handling (e.g. "What if hospital beds reach 100% capacity?" or "What if roads are flooded?").
* **Visual Telemetry:** Submissions with interactive trade-off sliders and visual decision charts received the highest marks from Google mentors.

---

## 3. Top 5 Killer Project Ideas for Challenge 2

| # | Project Name | Concept & USP | High-Credit Hook |
| :-: | :--- | :--- | :--- |
| **1** | **CrisisGrid AI** *(Recommended)* | Real-time disaster relief routing simulating resource dispatch (ambulances, food, rafts) during monsoon floods under dynamic road closures. | Multi-agent dispatch simulation with live mock telematics. |
| **2** | **TriageFlow Emergency** | Hospital emergency triage decision assistant calculating urgent admission scores based on vitals, bed capacity, and physician shifts. | Clinical priority scoring with strict safety guardrails. |
| **3** | **SupplyPulse OS** | Predictive supply-chain rerouter that calculates alternative air/sea/rail routes during port strikes and fuel spikes. | Multi-tier cost vs. time decision matrices. |
| **4** | **SmartSpend SMB** | Small-business runway protector dynamically calculating payroll buffers, vendor payment schedules, and cash-flow safety thresholds. | Financial survivability simulator. |
| **5** | **Agronomist Sentinel** | Agricultural decision matrix providing farmers with weather-conditioned pesticide spraying, irrigation schedules, and market pricing alerts. | Hyper-local weather-contingent advice. |

---

## 4. Production Prompt Specification

```json
{
  "task": "Contextual Decision Orchestration",
  "model": "gemini-2.5-flash",
  "temperature": 0.2,
  "systemInstruction": "You are a mission-critical Decision Intelligence Agent. Analyze emergency or operational constraints and generate 3 risk-stratified decision pathways with actionable trade-offs.",
  "outputSchema": {
    "situation_assessment": "string",
    "critical_bottlenecks": ["string"],
    "decision_pathways": [
      {
        "strategy": "Conservative / Balanced / High-Speed",
        "action_steps": ["string"],
        "risk_percentage": "number",
        "resource_impact": "string",
        "contingency_fallback": "string"
      }
    ],
    "optimal_recommendation": "string"
  }
}
```

---

## 5. LinkedIn "Build-in-Public" Post Angle
> *"In high-stakes emergencies, AI cannot afford to give vague advice. For Challenge 2 of #PromptWars Virtual, I built 'CrisisGrid AI'—an intent-driven decision engine using Google Antigravity and Gemini 2.5 Flash. It ingests dynamic operational constraints and produces 3 risk-stratified decision pathways with instant contingency fallbacks. Here is how vibe-coding solves real-world logistics challenges! 🚨💻 #BuildWithAI #VibeCoding"*

