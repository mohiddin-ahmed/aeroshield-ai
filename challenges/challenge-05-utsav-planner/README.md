# 🎉 Challenge 5: AI Celebration & Event Planner (UtsavPlan / Eventora AI)

> **Cohort:** PromptWars Virtual — Challenge 5  
> **Theme:** Dynamic Budget Splitting, Backward-Scheduled Timelines, Vendor Management & Cultural Personalization  

---

## 1. Problem Statement Overview
Planning celebrations, community festivals, tech summits, or multi-day weddings is notoriously chaotic. Users juggle scattered spreadsheets, volatile vendor budgets, and conflicting timelines. Participants were challenged to build an end-to-end AI-powered planner that takes high-level intent and auto-generates itemized budgets, backward-scheduled milestones, vendor tasks, and cultural theme recommendations.

---

## 2. Winner Breakdown: Why Top Submissions Won Maximum Credits
* **Exact Mathematical Budgeting:** The #1 reason developers lost points was generating vague budgets. Winners ensured every line item explicitly totaled **100% of the user-defined budget** with zero calculation drift.
* **Backward-Scheduled Gantt Timelines:** Top submissions generated milestones counting backward from T-0 (Event Day): e.g., T-90 Days (Venue & Advance), T-30 Days (Invitations & Catering), T-7 Days (Final Headcount), T-1 Day (Rehearsal).
* **Cultural Localization:** Deep customization for Indian cultural celebrations (Haldi, Mehendi, Sangeet, Nikah, Pheras) as well as modern corporate tech summits.

---

## 3. Top 5 Killer Project Ideas for Challenge 5

| # | Project Name | Concept & USP | High-Credit Hook |
| :-: | :--- | :--- | :--- |
| **1** | **UtsavPlan OS** *(Recommended)* | The complete Indian wedding & celebration command center featuring backward ritual timelines, itemized rupee budget allocation, and vendor task checklists. | Backward ritual scheduling + zero-drift budget calculator. |
| **2** | **SummitForge AI** | Tech conference orchestrator calculating call-for-papers (CFP) deadlines, speaker logistics, keynote prep, and swag production lead times. | Strict developer event milestones & sponsor deliverables. |
| **3** | **CommunityKalyan** | Non-profit festival & charity gala planner managing volunteer shifts, crowd flow permits, and transparent donation allocation. | Volunteer shift optimization with public transparency ledger. |
| **4** | **MilestoneCraft** | Personalized milestone birthday and silver jubilee planner generating nostalgic theme concepts, curated era playlists, and low-budget decor hacks. | Nostalgia-driven theme ideas with budget decor hacks. |
| **5** | **CampusFest Command** | College cultural and tech festival planner balancing student council budgets, celebrity artist riders, security permits, and stage audio logistics. | Student-friendly budget constraints & sponsor tracker. |

---

## 4. Production Prompt Specification

```json
{
  "task": "Comprehensive Celebration Planning",
  "model": "gemini-2.5-flash",
  "temperature": 0.6,
  "systemInstruction": "You are a master Celebration Architect and Event Financial Planner. Generate exhaustive, mathematically accurate event plans with backward-scheduled timelines, itemized budgets, and risk mitigations.",
  "outputSchema": {
    "event_summary": { "title": "string", "scale": "string", "total_budget": "string" },
    "itemized_budget_allocation": [
      { "category": "Venue & Catering / Decor / Tech / Misc", "percentage": "number", "estimated_cost": "string" }
    ],
    "backward_scheduled_timeline": [
      { "milestone": "string", "timeline_offset": "e.g. T-60 Days", "tasks": ["string"], "critical_dependencies": "string" }
    ],
    "vendor_checklist": [
      { "vendor_role": "string", "booking_lead_time": "string", "negotiation_tips": "string" }
    ],
    "cultural_themes_and_decor_hacks": ["string"]
  }
}
```

---

## 5. LinkedIn "Build-in-Public" Post Angle
> *"Planning a 500-person celebration shouldn't require 15 spreadsheets and endless stress. For Challenge 5 of #PromptWars Virtual, I built 'UtsavPlan OS' using Google Antigravity and Gemini. In one prompt, it auto-generates mathematically balanced budget breakdowns (to the exact rupee!), backward-scheduled ritual timelines, and vendor checklists. Watch the walkthrough! 🎉📊✨ #BuildWithAI #VibeCoding #GoogleForDevelopers"*

