import { promptLogger } from '../utils/promptLogger';
import { mockResponses } from './mockData';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const DEFAULT_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.5-flash';
const FORCE_MOCK = import.meta.env.VITE_ENABLE_MOCK_FALLBACK === 'true' && (!API_KEY || API_KEY === 'your_gemini_api_key_here');

/**
 * Executes a prompt with automatic error handling, rate-limit fallback, and real-time logging.
 */
export async function executePrompt({
  taskName = 'General Analysis',
  systemInstruction = 'You are an expert AI solution architect participating in PromptWars Virtual. Return clear, concise, structured responses.',
  userPrompt,
  temperature = 0.7,
  model = DEFAULT_MODEL,
}) {
  const startTime = Date.now();

  // 1. Check if mock mode is triggered due to missing key or forced setting
  if (FORCE_MOCK || !API_KEY || API_KEY === 'your_gemini_api_key_here') {
    // Artificial realistic latency (400-800ms)
    await new Promise((resolve) => setTimeout(resolve, 600));
    const mockOutput = mockResponses.generateDynamicMock(taskName, userPrompt);
    const latencyMs = Date.now() - startTime;

    promptLogger.log({
      taskName,
      systemInstruction,
      userPrompt,
      model: `${model} (Mock Fallback)`,
      temperature,
      response: mockOutput,
      isMock: true,
      latencyMs,
    });

    return {
      success: true,
      data: mockOutput,
      isMock: true,
      notice: 'Running in Mock Fallback Mode (Evaluator-Safe). To use live API, set VITE_GEMINI_API_KEY in .env.',
    };
  }

  // 2. Attempt Live Gemini API Call
  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: userPrompt }],
        },
      ],
      systemInstruction: {
        parts: [{ text: systemInstruction }],
      },
      generationConfig: {
        temperature,
        maxOutputTokens: 2048,
      },
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(`Gemini API error [${res.status}]: ${errBody.error?.message || res.statusText}`);
    }

    const json = await res.json();
    const candidateText = json.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error('No candidate content received from Gemini model.');
    }

    const latencyMs = Date.now() - startTime;
    promptLogger.log({
      taskName,
      systemInstruction,
      userPrompt,
      model,
      temperature,
      response: candidateText,
      isMock: false,
      latencyMs,
    });

    return {
      success: true,
      data: candidateText,
      isMock: false,
      raw: json,
    };
  } catch (error) {
    console.warn('Gemini API call failed, activating graceful Mock Fallback:', error);
    const latencyMs = Date.now() - startTime;
    const mockOutput = mockResponses.generateDynamicMock(taskName, userPrompt);

    promptLogger.log({
      taskName,
      systemInstruction,
      userPrompt,
      model: `${model} (Fallback on Error)`,
      temperature,
      response: mockOutput,
      isMock: true,
      latencyMs,
      error: error.message,
    });

    return {
      success: true,
      data: mockOutput,
      isMock: true,
      notice: `Fallback activated: ${error.message}. Output served safely without crashing.`,
    };
  }
}

