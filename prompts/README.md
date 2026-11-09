# 🧠 Prompt Engineering Architecture

This directory houses the structured prompt catalog, system instructions, and schema guardrails designed for the **PromptWars: Virtual** challenge series (Hack2skill × Google for Developers).

## Why Prompt Structure Wins Hackathons
Judges evaluating PromptWars look for more than just code. They score:
1. **Prompt Intent & Persona Definition:** Distinct system roles that prevent generic conversational answers.
2. **Deterministic Output Schemas:** Enforcing JSON or structured object formats.
3. **Guardrails & Negative Constraints:** Preventing hallucinations, rate-limit explosions, and invalid outputs.
4. **Auditability:** Being able to inspect temperature, model choices, and latency in real-time.

## File Manifest
* `prompt-registry.json`: Machine-readable registry of system instructions, expected input/output schemas, and models.
* `templates/system-prompt-template.md`: The 5-pillar prompt template used to generate every challenge response.
