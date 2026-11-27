/**
 * @module utils/logger
 * Centralized diagnostic logger keeping production telemetry warnings structured and clean.
 */

/**
 * Emits a structured warning for recoverable network or sensor fallbacks.
 * @param scope - Originating subsystem tag.
 * @param message - Diagnostic summary.
 * @param detail - Optional error context.
 */
export function logWarning(scope: string, message: string, detail?: unknown): void {
  if (detail !== undefined) {
    console.warn(`[${scope}] ${message}:`, detail);
  } else {
    console.warn(`[${scope}] ${message}`);
  }
}

/**
 * Emits a structured error for captured exceptions inside ErrorBoundary or hooks.
 * @param scope - Originating subsystem tag.
 * @param message - Diagnostic summary.
 * @param error - Caught error value.
 */
export function logError(scope: string, message: string, error?: unknown): void {
  if (error !== undefined) {
    console.error(`[${scope}] ${message}:`, error);
  } else {
    console.error(`[${scope}] ${message}`);
  }
}
