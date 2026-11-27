/**
 * @module utils/promptLogger
 * Live Prompt Execution Telemetry & Audit Logger for Judges DevTools.
 * Captures system instructions, user prompts, model metadata, latency, and token usage.
 */

import { DEFAULT_GEMINI_MODEL, MAX_PROMPT_LOGS } from '../constants/airQuality';
import type { PromptLogEntry } from '../types/airQuality';

export interface LogPromptInput {
  taskName?: string;
  systemInstruction?: string;
  userPrompt?: string;
  prompt?: string;
  model?: string;
  temperature?: number;
  response: unknown;
  isMock?: boolean;
  latencyMs?: number;
  tokenCount?: number | null;
  error?: string | null;
}

type PromptLogListener = (logs: PromptLogEntry[]) => void;

class PromptLogger {
  private logs: PromptLogEntry[] = [];
  private listeners = new Set<PromptLogListener>();

  /**
   * Appends a prompt execution record and broadcasts updates to subscribers.
   * @param entryData - Execution telemetry details.
   * @returns Stored prompt log entry.
   */
  log({
    taskName,
    systemInstruction,
    userPrompt,
    prompt,
    model,
    temperature,
    response,
    isMock = false,
    latencyMs = 0,
    tokenCount = null,
    error = null
  }: LogPromptInput): PromptLogEntry {
    const entry: PromptLogEntry = {
      id: `prompt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      taskName: taskName || 'Smog Defense Planning',
      systemInstruction: systemInstruction || 'Default AI Assistant',
      userPrompt: userPrompt || prompt || '',
      model: model || DEFAULT_GEMINI_MODEL,
      temperature: temperature ?? 0.3,
      response,
      isMock: Boolean(isMock),
      latencyMs,
      tokenCount,
      error: error ? String(error) : null
    };

    this.logs.unshift(entry);
    if (this.logs.length > MAX_PROMPT_LOGS) {
      this.logs.pop();
    }

    this.notify();
    return entry;
  }

  /**
   * Returns a shallow immutable snapshot of stored prompt runs.
   * @returns Array of logged prompt runs.
   */
  getLogs(): PromptLogEntry[] {
    return [...this.logs];
  }

  /**
   * Registers a UI listener for live DevTools updates.
   * @param listener - Callback invoked on log mutation.
   * @returns Unsubscribe cleanup function.
   */
  subscribe(listener: PromptLogListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /** Notifies all subscribed listeners with the latest logs array. */
  notify(): void {
    const snapshot = this.getLogs();
    this.listeners.forEach((listener) => listener(snapshot));
  }

  /** Clears all recorded logs from memory. */
  clear(): void {
    this.logs = [];
    this.notify();
  }
}

export const promptLogger = new PromptLogger();

/**
 * Convenience helper to record a GenAI prompt invocation.
 * @param params - Prompt execution parameters.
 * @returns Created telemetry record.
 */
export function logPromptExecution(params: LogPromptInput): PromptLogEntry {
  return promptLogger.log({
    taskName: params.taskName || 'Smog Defense Planning',
    userPrompt: params.prompt || params.userPrompt || '',
    systemInstruction: params.systemInstruction,
    response: params.response,
    model: params.model,
    temperature: params.temperature,
    latencyMs: params.latencyMs,
    tokenCount: params.tokenCount,
    isMock: params.isMock !== undefined ? Boolean(params.isMock) : true,
    error: params.error
  });
}

/**
 * Returns all currently logged prompt runs.
 * @returns Recorded execution history.
 */
export function getPromptLogs(): PromptLogEntry[] {
  return promptLogger.getLogs();
}
