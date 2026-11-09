# 📋 PromptWars Virtual Submission Pre-Flight Checklist

Before clicking **"Submit Project"** on the [Hack2skill Portal](https://hack2skill.com/event/pwvirtual1), verify every single item below.

---

### Phase 1: Code & Deployment Checks
- [ ] **GitHub Repository Visibility:** Set to **PUBLIC** (Never Private! Private repos result in an automatic 0).
- [ ] **Working Live Preview URL:** Tested in an incognito window without login required.
- [ ] **Zero-Crash Fallback Verified:** App works even if `VITE_GEMINI_API_KEY` is empty (tested via mock mode).
- [ ] **Build Check Passed:** Run `npm run build` and ensure `dist/` builds with 0 errors.
- [ ] **Security Check:** `.env` is NOT committed to GitHub (`git status` shows no `.env`).

---

### Phase 2: Deliverable Links Check
- [ ] **Live Web App Link:** Working (Vercel / Cloud Run / Netlify).
- [ ] **Public GitHub Repo Link:** Correct URL and accessible.
- [ ] **Technical Blog Link:** Published on Dev.to / Hashnode / Medium or linked as a public markdown file.
- [ ] **Demo Video Link:** YouTube video set to **Public** or **Unlisted** (NOT Private!).

---

### Phase 3: Automated Script Verification
Run the automated validator in your terminal:
```bash
npm run validate
```
Ensure all 6 checks show **✔ PASS** before submitting.
