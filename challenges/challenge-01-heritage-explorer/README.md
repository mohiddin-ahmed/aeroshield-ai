# 🏛️ Challenge 1: Cultural State & Heritage Explorer ("Which State Am I?")

> **Cohort:** PromptWars Virtual — Challenge 1  
> **Theme:** Cultural Synthesis, Anti-Hallucination Regional Knowledge & Intent Deduction  

---

## 1. Problem Statement Overview
Participants were tasked with using prompt engineering and AI generation techniques to create an interactive experience that visually, culturally, and culinarily captures the true essence of an Indian state.
* **The Strict Constraint:** Strict adherence to negative constraints (no generic North/South stereotypes, zero factual hallucinations, authentic vernacular terminology).

---

## 2. Winner Breakdown: Why Top Submissions Won Maximum Credits
* **The Winning Formula:** Winners did not just return a wall of text. They built **deductive, gamified experiences** (e.g. progressive clue unveiling, interactive maps, or regional language audio snippets).
* **Prompt Craft:** Top entries used few-shot calibration with verified regional datasets and negative prompts (`"Avoid generic bollywood imagery; focus on indigenous folklore and handloom traditions"`).
* **UI/UX:** Evaluators awarded bonus points for clean audio pronunciation widgets and state-specific color palettes.

---

## 3. Top 5 Killer Project Ideas for Challenge 1

| # | Project Name | Concept & USP | High-Credit Hook |
| :-: | :--- | :--- | :--- |
| **1** | **DeshDarpan AI** *(Recommended)* | 360° Cultural Portal synthesizing folk music, artisan handloom heritage, and indigenous recipes with local dialect voice snippets. | Multimodal dialect coach with zero hallucination. |
| **2** | **HeritageQuest 360** | Gamified "Which State Am I?" deduction game where the AI gives 4 progressive riddles (Geography -> Cuisine -> Craft -> Folklore) without revealing the name until the user guesses. | Dynamic deduction engine with prompt token scoring. |
| **3** | **SwadSanskriti** | Culinary heritage engine mapping regional recipes to historic trade routes, seasonal monsoons, and local spice availability. | Deep historic spice trade linkage. |
| **4** | **Shilpakar AI** | Artisan handicraft narrative engine connecting GI-tagged products (Pashmina, Kanjeevaram, Dokra craft) with folklore stories. | Direct artisan storytelling with GI-tag verification. |
| **5** | **UtsavParampara** | Living cultural calendar calculating astronomical / harvest celebrations with ritual checklists and local song lyrics. | Back-calculated seasonal festival logic. |

---

## 4. Production Prompt Specification

```json
{
  "task": "Cultural State Synthesis",
  "model": "gemini-2.5-flash",
  "temperature": 0.4,
  "systemInstruction": "You are a senior ethnographer and cultural historian specializing in Indian regional heritage. Provide authentic, nuanced, and factually grounded cultural syntheses with zero generic tropes.",
  "inputVariables": {
    "state": "Kerala / Assam / Rajasthan / Odisha",
    "focusAreas": ["artisan_crafts", "indigenous_cuisine", "folk_traditions", "regional_phrase"]
  },
  "outputSchema": {
    "state_title": "string",
    "cultural_identity_summary": "string",
    "indigenous_crafts": [
      { "craft_name": "string", "origin_community": "string", "technique_details": "string" }
    ],
    "signature_culinary_tradition": {
      "dish_name": "string",
      "seasonal_significance": "string",
      "authentic_ingredients": ["string"]
    },
    "regional_vernacular_phrase": {
      "phrase": "string",
      "literal_translation": "string",
      "cultural_context": "string"
    }
  }
}
```

---

## 5. LinkedIn "Build-in-Public" Post Angle
> *"Can Generative AI capture the soul of Indian heritage without generic stereotypes? For Challenge 1 of #PromptWars Virtual, I architected 'DeshDarpan AI' using Google Antigravity. By calibrating system prompts with strict negative constraints, the engine generates authentic folklore, GI-tagged artisan craft records, and regional phrases with zero hallucinations. Check out the 60-second walkthrough! 🇮🇳✨ #BuildWithAI #VibeCoding"*

