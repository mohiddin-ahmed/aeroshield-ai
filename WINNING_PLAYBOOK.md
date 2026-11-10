# 🏆 The PromptWars Winning Playbook: Evaluator Rubrics, Reddit Pitfalls & Strategy

> **Target:** Win PromptWars Virtual (`pwvirtual1`) on [Hack2skill](https://hack2skill.com/event/pwvirtual1) & maximize Prompt Credits for Swag Store redemption.

---

## 1. The Official Evaluation Rubric (What Judges Look For)

Hack2skill and Google for Developers evaluators use a 4-pillar grading matrix:

| Pillar | Weight | What Judges Score |
| :--- | :---: | :--- |
| **Functional Execution & Prototype** | **30%** | Does the live app work cleanly without console errors? Is it responsive, intuitive, and deployed publicly? |
| **Prompt Engineering Craft** | **25%** | Did the developer use structured system prompts, guardrails, and role calibration, or just lazy generic prompts? |
| **Technical Blog & Build-in-Public** | **25%** | Is the technical blog thorough? Does it show architecture diagrams, prompt logs, and AI debugging steps? |
| **UI/UX & Video Demonstration** | **20%** | Is the video demo concise (under 2 minutes) with clear audio and a live demonstration of features? |

---

## 2. The 7 Deadliest Mistakes Made by Developers (Learned from Reddit & Past H2S Cohorts)

### ❌ Mistake 1: The "Private Repository" Disaster (Instant 0 Points)
* **What happens:** Developers push their code to a GitHub repository set to "Private". When judges click the link to review the code, they get a 404 page and give an automatic 0.
* **Our Guardrail:** Verified via `npm run validate` and pre-flight checklists. Always test in an incognito window!

### ❌ Mistake 2: The "Blank Screen" API Rate-Limit Crash
* **What happens:** Judges test 100+ projects in a single evening. The developer's free-tier Gemini API key hits a `429 Too Many Requests` or quota exhaustion. The app crashes with a blank white screen.
* **Our Guardrail:** Built-in **Zero-Crash Mock Fallback Mode**. If the API fails or is unconfigured, the app falls back to realistic simulated data. Judges can test 100% of the UI without an error!

### ❌ Mistake 3: Treating PromptWars Like a Standard Coding Hackathon
* **What happens:** Developers spend 90% of their time writing React/Node boilerplates and leave prompt engineering as a simple single-line string.
* **Our Guardrail:** Evaluators are looking for **Intent-Driven Vibe-Coding**. We provided the **Live Prompt Inspector (Judges DevTools)** right in the UI so evaluators can inspect system instructions and prompt schemas live.

### ❌ Mistake 4: Writing a 3-Sentence Technical Blog
* **What happens:** The developer submits a functional app but writes a tiny 50-word description on the portal. They immediately lose 25% of their total points!
* **Our Guardrail:** We generated `docs/TECHNICAL_BLOG.md`, a rubric-compliant, pre-formatted technical blog template with Mermaid diagrams, architecture flows, and debugging stories.

### ❌ Mistake 5: Accidental API Key Leaks on GitHub
* **What happens:** Developers push their `.env` file containing secret Google Gemini API keys. Google's automated scanners immediately revoke the key, rendering the live app broken.
* **Our Guardrail:** `.gitignore` strictly blocks `.env` files, and `.env.example` is provided for safe distribution.

### ❌ Mistake 6: Unwatchable Video Demos (Private or Broken Links)
* **What happens:** Submitting a YouTube video marked as "Private" or taking 5 minutes to start showing the actual app.
* **Our Guardrail:** We provide `docs/DEMO_VIDEO_SCRIPT.md`—a crisp, 2-minute pitch structure that hooks the judge in the first 20 seconds.

### ❌ Mistake 7: Submitting in the Final 5 Minutes
* **What happens:** Hack2skill portal traffic spikes in the last 15 minutes before the deadline, causing upload timeouts.
* **Our Guardrail:** Always submit at least **2 hours before the countdown timer expires**!

---

## 3. How to Maximize Prompt Credits (PC) & Win Swag

1. **Submit Every Single Challenge:**  
   Points are cumulative. Even if you placed #20 in one round, submitting across rounds compounds your Prompt Credits on the main leaderboard.
2. **Quality over Raw Quantity:**  
   Top 10 submissions in any single round earn disproportionately higher Prompt Credits and special spotlight recognition.
3. **LinkedIn Social Multiplier:**  
   Use `docs/LINKEDIN_POST.md` to post video walkthroughs with `#PromptWars` and tag `@Hack2skill` and `@Google for Developers`. Community visibility often catches the eyes of the organizing jury.
4. **Redeeming Swag:**  
   Keep an eye on the official **Swag Store** announcement on your Hack2skill dashboard. As soon as redemption opens, trade your accumulated Prompt Credits for developer merchandise, hoodies, and tech kits.

---

*With sincere effort, high aspirations, and divine support, you have everything needed to build, rank top, and win!*

