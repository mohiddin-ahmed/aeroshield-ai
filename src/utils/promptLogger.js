/**
 * @module utils/promptLogger
 * Live Prompt Execution Telemetry & Audit Logger for Judges DevTools.
 * Captures system instructions, user prompts, model metadata, latency, and token usage.
 */

import { DEFAULT_GEMINI_MODEL, MAX_PROMPT_LOGS } from '../constants/airQuality';

class PromptLogger {
  constructor() {
    this.logs = [];
    this.listeners = new Set();
  }

  /**
   * Appends a prompt execution record and broadcasts updates to subscribers.
   * @param {object} entryData - Execution telemetry details.
   * @returns {object} Stored prompt log entry.
   */
  log({
    taskName,
    systemInstruction,
    userPrompt,
    model,
    temperature,
    response,
    isMock = false,
    latencyMs = 0,
    tokenCount = null,
    error = null
  }) {
    const entry = {
      id: `prompt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      taskName: taskName || 'Smog Defense Planning',
      systemInstruction: systemInstruction || 'Default AI Assistant',
      userPrompt,
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
   * @returns {object[]} Array of logged prompt runs.
   */
  getLogs() {
    return [...this.logs];
  }

  /**
   * Registers a UI listener for live DevTools updates.
   * @param {(logs: object[]) => void} listener - Callback invoked on log mutation.
   * @returns {() => void} Unsubscribe cleanup function.
   */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /** Notifies all subscribed listeners with the latest logs array. */
  notify() {
    const snapshot = this.getLogs();
    this.listeners.forEach((listener) => listener(snapshot));
  }

  /** Clears all recorded logs from memory. */
  clear() {
    this.logs = [];
    this.notify();
  }
}

export const promptLogger = new PromptLogger();

/**
 * Convenience helper to record a GenAI prompt invocation.
 * @param {object} params - Prompt execution parameters.
 * @returns {object} Created telemetry record.
 */
export function logPromptExecution(params) {
  return promptLogger.log({
    taskName: params.taskName || 'Smog Defense Planning',
    userPrompt: params.prompt || params.userPrompt,
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
 * @returns {object[]} Recorded execution history.
 */
export function getPromptLogs() {
  return promptLogger.getLogs();
}
