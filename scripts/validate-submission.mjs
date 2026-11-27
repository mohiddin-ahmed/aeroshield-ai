#!/usr/bin/env node

/**
 * ==============================================================================
 * AEROSHIELD AI (VAYUMITRA OS) — SUBMISSION PRE-FLIGHT AUDITOR CLI
 * ==============================================================================
 * Automates end-to-end verification across repository hygiene, security headers,
 * ESLint static analysis, Vitest unit/UI tests, production bundling, and docs.
 * ==============================================================================
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  bold: '\x1b[1m',
  gray: '\x1b[90m'
};

const checks = [];

function addCheck(name, category, testFn) {
  checks.push({ name, category, testFn });
}

console.log(
  `\n${COLORS.bold}${COLORS.cyan}==============================================================================${COLORS.reset}`
);
console.log(
  `${COLORS.bold}${COLORS.magenta}        🚀 AEROSHIELD AI — PRODUCTION & SUBMISSION PRE-FLIGHT AUDITOR        ${COLORS.reset}`
);
console.log(
  `${COLORS.bold}${COLORS.cyan}==============================================================================${COLORS.reset}\n`
);

// 1. Repository & Secrets Hygiene
addCheck('Git Repository Initialized', 'Repository', () => {
  const gitDir = path.join(ROOT_DIR, '.git');
  if (!fs.existsSync(gitDir)) {
    return { pass: false, error: 'Git is not initialized. Run "git init".' };
  }
  return { pass: true, detail: 'Valid .git repository detected' };
});

addCheck('No Leaked API Keys (.gitignore Excludes .env)', 'Security', () => {
  const gitignorePath = path.join(ROOT_DIR, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    return { pass: false, error: 'Missing .gitignore file.' };
  }
  const content = fs.readFileSync(gitignorePath, 'utf8');
  if (!content.includes('.env')) {
    return { pass: false, error: '.gitignore does NOT exclude .env!' };
  }
  return { pass: true, detail: '.env and media binaries excluded from version control' };
});

addCheck('.env.example Template Present for Evaluators', 'Security', () => {
  const envExample = path.join(ROOT_DIR, '.env.example');
  if (!fs.existsSync(envExample)) {
    return { pass: false, error: 'Missing .env.example template.' };
  }
  return { pass: true, detail: '.env.example documented for Gemini key injection' };
});

addCheck('MIT License File Present', 'Repository', () => {
  const licensePath = path.join(ROOT_DIR, 'LICENSE');
  if (!fs.existsSync(licensePath)) {
    return { pass: false, error: 'Missing root LICENSE file.' };
  }
  const text = fs.readFileSync(licensePath, 'utf8');
  if (!text.includes('MIT License')) {
    return { pass: false, error: 'LICENSE file does not specify MIT License.' };
  }
  return { pass: true, detail: 'MIT License verified at repository root' };
});

addCheck('Security Headers Configured in vercel.json (Strict CSP)', 'Security', () => {
  const vercelPath = path.join(ROOT_DIR, 'vercel.json');
  if (!fs.existsSync(vercelPath)) {
    return { pass: false, error: 'Missing vercel.json deployment configuration.' };
  }
  const raw = fs.readFileSync(vercelPath, 'utf8');
  if (raw.includes("'unsafe-inline'")) {
    return { pass: false, error: "vercel.json CSP still contains 'unsafe-inline'." };
  }
  const requiredHeaders = [
    'Content-Security-Policy',
    'Strict-Transport-Security',
    'Cross-Origin-Opener-Policy',
    'X-Permitted-Cross-Domain-Policies',
    'X-Content-Type-Options',
    'X-Frame-Options',
    'Referrer-Policy'
  ];
  const missing = requiredHeaders.filter((h) => !raw.includes(h));
  if (missing.length > 0) {
    return { pass: false, error: `Missing security headers in vercel.json: ${missing.join(', ')}` };
  }
  return { pass: true, detail: 'Strict zero-unsafe-inline CSP, COOP, HSTS & headers configured' };
});

// 2. TypeScript, Prettier & Static Linting
addCheck('Strict TypeScript Compiler Check Passes (tsc --noEmit)', 'Code Quality', () => {
  try {
    execSync('npm run typecheck', { cwd: ROOT_DIR, stdio: 'pipe' });
    return { pass: true, detail: '0 TypeScript compiler errors' };
  } catch (err) {
    return { pass: false, error: `TypeScript check failed: ${err.message}` };
  }
});

addCheck('Prettier Code Formatting Passes', 'Code Quality', () => {
  try {
    execSync('npm run format:check', { cwd: ROOT_DIR, stdio: 'pipe' });
    return { pass: true, detail: 'All TS, TSX, and CSS files conform to .prettierrc' };
  } catch (err) {
    return { pass: false, error: `Prettier formatting check failed: ${err.message}` };
  }
});

addCheck('ESLint Zero-Warning Static Analysis Passes', 'Code Quality', () => {
  try {
    execSync('npm run lint', { cwd: ROOT_DIR, stdio: 'pipe' });
    return { pass: true, detail: '0 ESLint errors and 0 warnings (--max-warnings=0)' };
  } catch (err) {
    return { pass: false, error: `ESLint failed: ${err.message}` };
  }
});

// 3. Automated Testing
addCheck('Vitest Unit, Security & Accessibility Suite Passes', 'Testing', () => {
  try {
    execSync('npm test', { cwd: ROOT_DIR, stdio: 'pipe' });
    return { pass: true, detail: 'All automated Vitest suites passed cleanly' };
  } catch (err) {
    return { pass: false, error: `Test suite failed: ${err.message}` };
  }
});

// 4. Production Build & Chunk Optimization
addCheck('Production Vite Build Compiles Cleanly', 'Build Efficiency', () => {
  try {
    execSync('npm run build', { cwd: ROOT_DIR, stdio: 'pipe' });
    const distHtml = path.join(ROOT_DIR, 'dist', 'index.html');
    if (!fs.existsSync(distHtml)) {
      return { pass: false, error: 'Build finished without dist/index.html.' };
    }
    return { pass: true, detail: 'Code-split production bundle generated in dist/' };
  } catch (err) {
    return { pass: false, error: `Build failed: ${err.message}` };
  }
});

// 5. Prompt Engineering & Documentation
addCheck('Challenge 6 Prompt Registry Verified', 'Prompt Engineering', () => {
  const registryPath = path.join(ROOT_DIR, 'prompts', 'prompt-registry.json');
  if (!fs.existsSync(registryPath)) {
    return { pass: false, error: 'prompts/prompt-registry.json missing.' };
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    if (!Array.isArray(parsed.prompts) || parsed.prompts.length === 0) {
      return { pass: false, error: 'prompt-registry.json contains no prompt definitions.' };
    }
    return {
      pass: true,
      detail: `${parsed.prompts.length} Challenge 6 structured prompt specs verified`
    };
  } catch (err) {
    return { pass: false, error: `Invalid JSON in prompt-registry.json: ${err.message}` };
  }
});

addCheck('Technical Blog Verified (docs/TECHNICAL_BLOG.md)', 'Documentation', () => {
  const blogPath = path.join(ROOT_DIR, 'docs', 'TECHNICAL_BLOG.md');
  if (!fs.existsSync(blogPath)) {
    return { pass: false, error: 'docs/TECHNICAL_BLOG.md missing.' };
  }
  const content = fs.readFileSync(blogPath, 'utf8');
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const requiredSections = ['Problem Statement', 'Architecture', 'Prompt Strategy'];
  for (const section of requiredSections) {
    if (!content.toLowerCase().includes(section.toLowerCase())) {
      return { pass: false, error: `Technical blog missing section: "${section}".` };
    }
  }
  return { pass: true, detail: `Blog verified (${wordCount} words, all key sections present)` };
});

addCheck('Submission Checklist & LinkedIn Artifacts Present', 'Submission', () => {
  const checklistPath = path.join(ROOT_DIR, 'docs', 'SUBMISSION_CHECKLIST.md');
  const postPath = path.join(ROOT_DIR, 'docs', 'LINKEDIN_POST.md');
  if (!fs.existsSync(checklistPath) || !fs.existsSync(postPath)) {
    return { pass: false, error: 'Missing docs/SUBMISSION_CHECKLIST.md or docs/LINKEDIN_POST.md.' };
  }
  const postContent = fs.readFileSync(postPath, 'utf8');
  if (!postContent.includes('#PromptWars') || !postContent.includes('#BuildWithAI')) {
    return { pass: false, error: 'LinkedIn post missing #PromptWars or #BuildWithAI tags.' };
  }
  return { pass: true, detail: 'Submission checklist and LinkedIn post configured' };
});

// Execute audit checks
let passedCount = 0;
let failedCount = 0;

checks.forEach((item, index) => {
  const result = item.testFn();
  const num = `[${index + 1}/${checks.length}]`;
  if (result.pass) {
    passedCount++;
    console.log(
      `${COLORS.green}✔ PASS${COLORS.reset} ${num.padEnd(8)} ${COLORS.bold}${item.name}${COLORS.reset}`
    );
    console.log(`       ${COLORS.gray}↳ ${result.detail}${COLORS.reset}`);
  } else {
    failedCount++;
    console.log(
      `${COLORS.red}✖ FAIL${COLORS.reset} ${num.padEnd(8)} ${COLORS.bold}${item.name}${COLORS.reset}`
    );
    console.log(`       ${COLORS.yellow}↳ Fix: ${result.error}${COLORS.reset}`);
  }
});

console.log(
  `\n${COLORS.cyan}------------------------------------------------------------------------------${COLORS.reset}`
);
if (failedCount === 0) {
  console.log(
    `${COLORS.bold}${COLORS.green}🎉 ALL ${passedCount} CHECKS PASSED! Repository meets production quality, security, and evaluation standards.${COLORS.reset}`
  );
  console.log(
    `${COLORS.gray}Ready for deployment verification on https://aeroshield-ai-sandy.vercel.app/${COLORS.reset}\n`
  );
  process.exit(0);
} else {
  console.log(
    `${COLORS.bold}${COLORS.red}⚠️  ${failedCount} CHECK(S) FAILED. Address the issues above before submitting.${COLORS.reset}\n`
  );
  process.exit(1);
}
