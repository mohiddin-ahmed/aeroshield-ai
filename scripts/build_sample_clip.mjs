import ffmpeg from 'ffmpeg-static';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const BRAIN_DIR = 'C:/Users/ajmal/.gemini/antigravity/brain/8a497c8f-ee82-4341-a038-c6273096c7e4';
const bg1 = path.join(BRAIN_DIR, 'aeroshield_keyframe1_prismatic_hero_1795442640772.jpg');
const bg2 = path.join(BRAIN_DIR, 'aeroshield_keyframe2_macro_jugaad_1795442666857.jpg');
const avatar = path.join(BRAIN_DIR, 'aerobot_presenter_speaking_1795443683543.jpg');
const audio = 'D:/PROJECTS/PromptWars/scripts/aeroshield_narration.wav';
const outputMp4 = path.join(BRAIN_DIR, 'aeroshield_sample_clip_10s.mp4');

console.log('Building 10s video with ffmpeg at:', ffmpeg);
console.log('Assets:', { bg1, bg2, avatar, audio, outputMp4 });

// Let's verify all assets exist
for (const [name, p] of Object.entries({ bg1, bg2, avatar, audio })) {
  if (!fs.existsSync(p)) {
    throw new Error(`Missing asset ${name} at ${p}`);
  }
}

/**
 * Filter graph logic:
 * [0:v] bg1: looped 5s, zoom in
 * [1:v] bg2: looped 5s, zoom in
 * concat bg1 and bg2 -> [bg] (10s total, 1920x1080)
 * [2:v] avatar: scaled down to 320x320, overlayed on bottom right (x=W-w-60, y=H-h-60)
 * [3:a] audio narration trimmed/padded to 10s
 */

const filterComplex = [
  // 1. First 5s clip from bg1 with slow subtle zoom
  `[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0015,1.15)':d=150:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080[v1]`,
  // 2. Second 5s clip from bg2 with subtle zoom
  `[1:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0015,1.15)':d=150:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080[v2]`,
  // 3. Concatenate backgrounds into a seamless 10s background
  `[v1][v2]concat=n=2:v=1:a=0[bg]`,
  // 4. Scale avatar to circular/rounded PIP badge (340x340)
  `[2:v]scale=340:340:force_original_aspect_ratio=increase,crop=340:340[avatar_badge]`,
  // 5. Overlay avatar badge on bottom right
  `[bg][avatar_badge]overlay=W-w-50:H-h-50:format=auto[v_composite]`,
  // 6. Draw clean Apple Keynote style title banner
  `[v_composite]drawtext=text='AeroShield AI • Option A Prismatic Glass':fontcolor=white:fontsize=42:box=1:boxcolor=black@0.65:boxborderw=18:x=60:y=60,` +
  `drawtext=text='VayuBot AI Presenter • Desi Jugaad & Smog Defense':fontcolor=0x38BDF8:fontsize=28:box=1:boxcolor=black@0.6:boxborderw=12:x=60:y=130[vout]`
].join(';');

const cmd = `"${ffmpeg}" -y ` +
  `-loop 1 -t 5 -i "${bg1}" ` +
  `-loop 1 -t 5 -i "${bg2}" ` +
  `-loop 1 -t 10 -i "${avatar}" ` +
  `-i "${audio}" ` +
  `-filter_complex "${filterComplex}" ` +
  `-map "[vout]" -map 3:a ` +
  `-c:v libx264 -pix_fmt yuv420p -r 30 -c:a aac -b:a 192k -t 10 "${outputMp4}"`;

console.log('Running ffmpeg command...');
try {
  execSync(cmd, { stdio: 'inherit' });
  console.log('SUCCESS! Video generated at:', outputMp4);
} catch (err) {
  console.error('FFmpeg execution error:', err.message);
  process.exit(1);
}
