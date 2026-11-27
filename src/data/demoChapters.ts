/**
 * @module data/demoChapters
 * Official hackathon walkthrough video links and chapter timestamps.
 */

export interface DemoVideoChapter {
  time: string;
  title: string;
  detail: string;
}

export const DEMO_VIDEO_VIEW_URL =
  'https://drive.google.com/file/d/18vHHx8OvH3ZrenDX-60WtGm0OsJ_NTD7/view?usp=sharing';

export const DEMO_VIDEO_EMBED_URL =
  'https://drive.google.com/file/d/18vHHx8OvH3ZrenDX-60WtGm0OsJ_NTD7/preview';

export const LINKEDIN_POST_URL =
  'https://www.linkedin.com/posts/mohiddin-ahmed-motiya-19ba06393_promptwars-hack2skill-googlefordevelopers-activity-7531098612081061888-a7pz';

export const VIDEO_CHAPTERS: DemoVideoChapter[] = [
  {
    time: '00:00 – 00:30',
    title: 'Crisis & AI Smog Defense Plan',
    detail: 'Rotary cigarette dosimetry dial, Delhi NCR winter smog switch & Gemini plan generator.'
  },
  {
    time: '00:30 – 00:55',
    title: 'Copernicus Telemetry & Solar Window',
    detail: 'Open-Meteo live particulate sensors & 1–3 PM convective cross-ventilation detector.'
  },
  {
    time: '00:55 – 01:22',
    title: '₹1,200 Desi Jugaad CADR & Multi-AI',
    detail:
      'Interactive 361 CFM Box-Fan fluid-dynamics calculator & 1-click ChatGPT/Claude/Gemini prompts.'
  },
  {
    time: '01:22 – 01:45',
    title: 'Judges DevTools & 7 Languages',
    detail: 'Live Gemini 2.5 Flash prompt auditing, latency readout & instant regional translation.'
  }
];
