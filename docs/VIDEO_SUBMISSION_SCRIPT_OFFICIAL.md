# 🎥 Official Video Submission Script & Recording Blueprint (Under 4 Minutes)

> **Event:** PromptWars Virtual (Hack2skill × Google for Developers)  
> **Challenge 5:** Celebration & Event Planner (UtsavPlan OS)  
> **Official Constraint:** Under 4 minutes | Public Google Drive or Unlisted YouTube link | Tested in Incognito.

---

## ⏱️ Video Timeline & Screen Actions (Minute-by-Minute)

### [0:00 – 0:30] Section 1: Intro & Problem Statement
* **Screen View:** Web app homepage (`http://localhost:3000` or deployed Vercel link) showing the hero header **"UtsavPlan OS: AI Celebration Architect"**.
* **Spoken Script / On-Screen Text:**
  > *"Hello judges! My name is [Your Name], presenting my project for PromptWars Virtual Challenge 5: Celebration & Event Planner. Planning large events—weddings, birthdays, or community summits—is chaotic due to messy spreadsheets, mathematical budget drift, and vague AI advice. Here is how UtsavPlan OS solves this with intent-driven vibe-coding on Google Antigravity and Gemini."*

---

### [0:30 – 1:45] Section 2: Live Testing (Success Case — Typing Inputs Live)
* **Screen View:** Zoom in slightly on the left-side input form.
* **Important Guideline from H2S:** *Do NOT use pre-filled forms. Type live on screen and pause for 1-2 seconds so evaluators can read the exact values!*
* **Live Actions to Perform on Screen:**
  1. Click the **Event Type** field and type: `Royal Destination Wedding` *(pause briefly)*.
  2. In **Target Location**, type: `Jaipur, Rajasthan`.
  3. In **Currency**, keep `₹ INR`.
  4. In **Total Budget**, clear and type: `1500000` *(₹15 Lakhs)*.
  5. In **Expected Guests**, type: `300`.
  6. In **Theme & Traditions**, type: `Traditional Rajputana Royal wedding with Haldi, Sangeet & Pheras, late-night DJ, pure vegetarian catering`.
  7. Click the **"Generate Complete Event Blueprint"** button.
* **Spoken Script / On-Screen Text:**
  > *"Notice how we enter real data live. We are planning a 300-guest Royal Wedding in Jaipur with a ₹15 Lakh budget. As we click Generate, our engine orchestrates the intent prompt through the Gemini model."*

---

### [1:45 – 2:30] Section 3: Highlighting GenAI in Action (Core Feature Walkthrough)
* **Screen View:** The generated plan appears on the right panel.
* **Live Actions to Show:**
  1. **Tab 1: Budgets:** Point cursor to the progress bars. Show that Venue (35%), Catering (30%), Decor (15%), Photo (10%), Audio/AV (5%), and Contingency (5%) **sum to exactly 100% of the ₹15,00,000 budget with zero drift**.
  2. **Tab 2: Timelines:** Click **"Timelines"** tab. Show milestones counting backward from T-0: `T-90 Days`, `T-60 Days`, `T-30 Days`, `T-7 Days`, `T-1 Day`, `Event Day`.
  3. **Tab 3: Vendors:** Click **"Vendors"** tab. Highlight booking lead times and negotiation tips for banquet venues and caterers.
  4. **Tab 4: Ideas:** Click **"Ideas"** tab. Highlight personalized cultural ideas (signature welcome drinks, live QR guestbook).

---

### [2:30 – 3:15] Section 4: Live Testing Edge Case (Low-Budget Guardrail)
* **Screen View:** Back to the left panel to demonstrate edge cases (as required by Section 2 of the H2S guide).
* **Live Actions to Show:**
  1. Click the quick preset button: **"⚠️ Edge Case: Extreme Thrift Budget"** (or manually type: Budget = `4500`, Guests = `60`).
  2. Click **"Generate Complete Event Blueprint"**.
  3. Show the dynamic AI response: The app triggers **"⚠️ Budget Guardrail Alert: Low-Budget Birthday Party"** and automatically switches to *Ultra-Thrift & Community Potluck Mode* with DIY decor and potluck checklists.
* **Spoken Script / On-Screen Text:**
  > *"Judges also asked to see how the app handles edge cases. If a user inputs an extreme low budget—like ₹4,500 for 60 guests—the AI doesn't crash or give unrealistic commercial venues. It triggers our safety guardrail and shifts to community potluck checklists and thrift decor hacks."*

---

### [3:15 – 3:45] Section 5: The Secret Weapon (In-App Prompt Inspector)
* **Screen View:** Top-right corner of the app.
* **Live Actions to Show:**
  1. Click **"Inspect Prompts"** button. The drawer slides open.
  2. Point out:
     - The **System Persona** used.
     - The **Input Prompt Payload**.
     - The **Model (Gemini 2.5 Flash)** and **Execution Latency (<600ms)**.
     - Click **"Export JSON"** to show full auditability.
* **Spoken Script / On-Screen Text:**
  > *"To prove our GenAI integration is fully dynamic and not hardcoded, we built an embedded Live Prompt Inspector. Evaluators can audit the exact system instructions, temperature, token latency, and JSON schemas live in real-time."*

---

### [3:45 – 4:00] Section 6: Wrap-Up & Submission Check
* **Spoken Script:**
  > *"All code is tested with automated test suites, fully open-source, and deployed live. Thank you Hack2skill and Google for Developers for hosting PromptWars Virtual!"*

---

## ⚠️ Pre-Upload Checklist Before Submitting Video Link
- [ ] Total video duration is **under 4 minutes** (e.g. 3m 40s).
- [ ] Uploaded to **YouTube as Unlisted** (or Google Drive as "Anyone with link can view").
- [ ] **Crucial Test:** Open the video link in an **Incognito / Private browser window** to ensure it plays immediately without prompting for Google login!
