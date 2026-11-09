/**
 * PromptWars Live Prompt Logger
 * 
 * Captures all prompt executions with parameters, tokens, and system instructions.
 * Judges can inspect this live in the UI or via exported logs.
 */

class PromptLogger {
  constructor() {
    this.logs = [];
    this.listeners = new Set();
  }

  log({ taskName, systemInstruction, userPrompt, model, temperature, response, isMock = false, latencyMs = 0, error = null }) {
    const entry = {
      id: 'prompt-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
      taskName,
      systemInstruction: systemInstruction || 'Default AI Assistant',
      userPrompt,
      model: model || 'gemini-2.5-flash',
      temperature: temperature ?? 0.7,
      response,
      isMock,
      latencyMs,
      error: error ? String(error) : null,
    };

    this.logs.unshift(entry);
    // Keep last 50 logs in memory
    if (this.logs.length > 50) {
      this.logs.pop();
    }

    this.notify();
    return entry;
  }

  getLogs() {
    return [...this.logs];
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.getLogs()));
  }

  clear() {
    this.logs = [];
    this.notify();
  }
}

export const promptLogger = new PromptLogger();
