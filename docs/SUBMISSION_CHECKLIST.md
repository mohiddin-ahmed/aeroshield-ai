# 📋 PromptWars Virtual Submission Pre-Flight Checklist

Before clicking **"Submit Project"** on the [Hack2skill Portal](https://hack2skill.com/event/pwvirtual1), verify every item below.

---

### Phase 1: Code Quality, Security & Deployment Checks
- [ ] **GitHub Repository Visibility:** Set to **PUBLIC** (under 10 MB, single `main` branch, MIT LICENSE).
- [ ] **Strict TypeScript & Formatting:** Run `npm run typecheck` (`0` errors) and `npm run format:check`.
- [ ] **Zero-Warning Linting Passed:** Run `npm run lint` (`0` ESLint errors and `0` warnings).
- [ ] **Automated Test Suite Passed:** Run `npm run test:coverage` (all 6 Vitest suites / 43 tests pass).
- [ ] **Clean Production Build:** Run `npm run build` (`dist/` compiles cleanly with code-split chunks and zero warnings).
- [ ] **Security Hygiene:** `.env` is excluded by `.gitignore` and strict zero-`'unsafe-inline'` CSP, COOP, HSTS, and Referrer-Policy headers are present in `vercel.json`.
- [ ] **Working Live Preview URL:** Tested in an incognito window with Zero-Crash fallback verified.

---

### Phase 2: Deliverable Links Check
- [ ] **Public GitHub Repo Link:** `https://github.com/mohiddin-ahmed/aeroshield-ai`
- [ ] **Live Web App Link:** `https://aeroshield-ai-sandy.vercel.app/`
- [ ] **Demo Video Link:** Accessible publicly on Google Drive or Unlisted YouTube.
- [ ] **LinkedIn Launch Post:** Includes required `#PromptWars` and `#BuildWithAI` tags.

---

### Phase 3: Automated Auditor Verification
Run the automated submission auditor CLI in your terminal:
```bash
npm run validate
```
Ensure every check reports **✔ PASS** before submitting.
