#!/usr/bin/env node

/**
 * ==============================================================================
 * PROMPTWARS SUBMISSION AUDITOR & VALIDATION CLI
 * ==============================================================================
 * Automates pre-flight verification against official Hack2skill & Google evaluator
 * rubrics to ensure 100% compliance and prevent disqualification or point losses.
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
  gray: '\x1b[90m',
};

const checks = [];

function addCheck(name, category, testFn) {
  checks.push({ name, category, testFn });
}

console.log(`\n${COLORS.bold}${COLORS.cyan}==============================================================================${COLORS.reset}`);
console.log(`${COLORS.bold}${COLORS.magenta}           🚀 PROMPTWARS VIRTUAL — SUBMISSION PRE-FLIGHT AUDITOR             ${COLORS.reset}`);
console.log(`${COLORS.bold}${COLORS.cyan}==============================================================================${COLORS.reset}\n`);

// -----------------------------------------------------------------------------
// CHECK 1: Git & Repository Security
// -----------------------------------------------------------------------------
addCheck('Git Repository Initialized', 'Repository', () => {
  const gitDir = path.join(ROOT_DIR, '.git');
  if (!fs.existsSync(gitDir)) {
    return { pass: false, error: 'Git is not initialized. Run "git init".' };
  }
  return { pass: true, detail: 'Valid .git repository detected' };
});

addCheck('No Leaked API Keys in Git (.gitignore Check)', 'Security', () => {
  const gitignorePath = path.join(ROOT_DIR, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    return { pass: false, error: 'Missing .gitignore file.' };
  }
  const content = fs.readFileSync(gitignorePath, 'utf8');
  if (!content.includes('.env')) {
    return { pass: false, error: '.gitignore does NOT exclude .env! Risk of leaking API keys.' };
  }
  return { pass: true, detail: '.env properly excluded from version control' };
});

addCheck('.env.example Available for Evaluators', 'Security', () => {
  const envExample = path.join(ROOT_DIR, '.env.example');
  if (!fs.existsSync(envExample)) {
    return { pass: false, error: 'Missing .env.example. Evaluators need to know what env variables are needed.' };
  }
  return { pass: true, detail: '.env.example template present' };
});

// -----------------------------------------------------------------------------
// CHECK 2: Build & Production Readiness
// -----------------------------------------------------------------------------
addCheck('Production Build Passes Without Errors', 'Build Quality', () => {
  try {
    execSync('npm run build', { cwd: ROOT_DIR, stdio: 'pipe' });
    const distHtml = path.join(ROOT_DIR, 'dist', 'index.html');
    if (!fs.existsSync(distHtml)) {
      return { pass: false, error: 'Build ran but dist/index.html was not generated.' };
    }
    return { pass: true, detail: 'Build generated successfully in dist/' };
  } catch (err) {
    return { pass: false, error: `Build failed: ${err.message}` };
  }
});

// -----------------------------------------------------------------------------
// CHECK 3: Prompt Engineering Artifacts
// -----------------------------------------------------------------------------
addCheck('Prompt Registry & Templates Present', 'Prompt Engineering', () => {
  const registryPath = path.join(ROOT_DIR, 'prompts', 'prompt-registry.json');
  if (!fs.existsSync(registryPath)) {
    return { pass: false, error: 'prompts/prompt-registry.json missing. Judges require prompt strategy logs.' };
  }
  return { pass: true, detail: 'Prompt registry catalog found' };
});

// -----------------------------------------------------------------------------
// CHECK 4: Technical Documentation & Blog
// -----------------------------------------------------------------------------
addCheck('Technical Blog Post Drafted (docs/TECHNICAL_BLOG.md)', 'Documentation', () => {
  const blogPath = path.join(ROOT_DIR, 'docs', 'TECHNICAL_BLOG.md');
  if (!fs.existsSync(blogPath)) {
    return { pass: false, error: 'docs/TECHNICAL_BLOG.md is missing. Required for Hack2skill submissions!' };
  }
  const content = fs.readFileSync(blogPath, 'utf8');
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  
  if (wordCount < 150) {
    return { pass: false, error: `Technical blog is too short (${wordCount} words). Elaborate on architecture & prompts.` };
  }

  const requiredSections = [
    'Problem Statement',
    'Architecture',
    'Prompt Strategy',
  ];

  for (const section of requiredSections) {
    if (!content.toLowerCase().includes(section.toLowerCase())) {
      return { pass: false, error: `Technical blog is missing mandatory section: "${section}".` };
    }
  }

  return { pass: true, detail: `Blog verified (${wordCount} words, all key sections present)` };
});

// -----------------------------------------------------------------------------
// CHECK 5: Social & Submission Artifacts
// -----------------------------------------------------------------------------
addCheck('Submission Pre-Flight Checklist (docs/SUBMISSION_CHECKLIST.md)', 'Submission', () => {
  const checklistPath = path.join(ROOT_DIR, 'docs', 'SUBMISSION_CHECKLIST.md');
  if (!fs.existsSync(checklistPath)) {
    return { pass: false, error: 'docs/SUBMISSION_CHECKLIST.md missing.' };
  }
  return { pass: true, detail: 'Pre-flight checklist ready' };
});

addCheck('LinkedIn Build-in-Public Post Prepared', 'Social & Community', () => {
  const postPath = path.join(ROOT_DIR, 'docs', 'LINKEDIN_POST.md');
  if (!fs.existsSync(postPath)) {
    return { pass: false, error: 'docs/LINKEDIN_POST.md missing.' };
  }
  const content = fs.readFileSync(postPath, 'utf8');
  if (!content.includes('#PromptWars') || !content.includes('#BuildWithAI')) {
    return { pass: false, error: 'LinkedIn template missing official hashtags (#PromptWars, #BuildWithAI).' };
  }
  return { pass: true, detail: 'LinkedIn template configured with official tags' };
});

// -----------------------------------------------------------------------------
// EXECUTE CHECKS & DISPLAY REPORT
// -----------------------------------------------------------------------------
let passedCount = 0;
let failedCount = 0;

checks.forEach((item, index) => {
  const result = item.testFn();
  const num = `[${index + 1}/${checks.length}]`;
  if (result.pass) {
    passedCount++;
    console.log(`${COLORS.green}✔ PASS${COLORS.reset} ${num.padEnd(8)} ${COLORS.bold}${item.name}${COLORS.reset}`);
    console.log(`       ${COLORS.gray}↳ ${result.detail}${COLORS.reset}`);
  } else {
    failedCount++;
    console.log(`${COLORS.red}✖ FAIL${COLORS.reset} ${num.padEnd(8)} ${COLORS.bold}${item.name}${COLORS.reset}`);
    console.log(`       ${COLORS.yellow}↳ Fix: ${result.error}${COLORS.reset}`);
  }
});

console.log(`\n${COLORS.cyan}------------------------------------------------------------------------------${COLORS.reset}`);
if (failedCount === 0) {
  console.log(`${COLORS.bold}${COLORS.green}🎉 ALL ${passedCount} CHECKS PASSED! Your project is 100% compliant and ready for submission.${COLORS.reset}`);
  console.log(`${COLORS.gray}You can now deploy to Vercel/Cloud Run and submit on https://hack2skill.com/event/pwvirtual1${COLORS.reset}\n`);
  process.exit(0);
} else {
  console.log(`${COLORS.bold}${COLORS.red}⚠️  ${failedCount} CHECK(S) FAILED. Address the fixes above before submitting to ensure maximum points!${COLORS.reset}\n`);
  process.exit(1);
}

