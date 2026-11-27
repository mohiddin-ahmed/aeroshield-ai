import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { promptLogger } from '../utils/promptLogger';
import { Terminal, Copy, Check, X, Cpu, Sparkles, Clock } from 'lucide-react';
import { useModalAccessibility } from '../hooks/useModalAccessibility';

/**
 * Real-time Hackathon Judges DevTools Drawer inspecting Gemini 2.5 Flash system instructions,
 * sanitized user prompt payloads, structured JSON responses, latency, and token metrics.
 * @param {object} props - Component props.
 * @returns {JSX.Element|null} DevTools drawer dialog or null when closed.
 */
export function PromptInspector({ isOpen, onClose }) {
  const [logs, setLogs] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [selectedLog, setSelectedLog] = useState(null);

  useModalAccessibility(isOpen, onClose);

  useEffect(() => {
    const initialLogs = promptLogger.getLogs();
    setLogs(initialLogs);
    if (initialLogs.length > 0) {
      setSelectedLog((current) => current || initialLogs[0]);
    }

    const unsubscribe = promptLogger.subscribe((updatedLogs) => {
      setLogs(updatedLogs);
      setSelectedLog((current) => current || updatedLogs[0] || null);
    });
    return unsubscribe;
  }, []);

  const handleCopy = (log) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(JSON.stringify(log, null, 2));
    }
    setCopiedId(log.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="prompt-inspector-title"
    >
      <div className="w-full max-w-3xl bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center space-x-3">
            <div
              className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-400"
              aria-hidden="true"
            >
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="prompt-inspector-title"
                className="text-lg font-bold text-white flex items-center gap-2"
              >
                Live Prompt Inspector
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Judges DevTools
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Audits real-time prompt engineering, system instructions, and token flows
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Live Prompt Inspector"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Logs List Sidebar */}
          <div className="w-2/5 border-r border-slate-800 overflow-y-auto p-3 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 px-2 py-1 font-medium">
              <span>PROMPT RUNS ({logs.length})</span>
              <button
                type="button"
                onClick={() => {
                  promptLogger.clear();
                  setSelectedLog(null);
                }}
                className="text-slate-500 hover:text-slate-300 transition text-[11px] cursor-pointer"
              >
                Clear
              </button>
            </div>

            {logs.length === 0 ? (
              <div className="text-center py-12 px-4 text-slate-500 text-xs">
                No prompt executions logged yet. Generate a smog defense plan from the home dashboard.
              </div>
            ) : (
              logs.map((log) => {
                const isSelected = selectedLog?.id === log.id;
                return (
                  <button
                    key={log.id}
                    type="button"
                    onClick={() => setSelectedLog(log)}
                    aria-pressed={isSelected}
                    className={`w-full text-left p-3 rounded-xl border transition text-xs space-y-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600/10 border-indigo-500/50 text-white'
                        : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold truncate text-slate-200">{log.taskName}</span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {log.latencyMs}ms
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 truncate font-mono">
                      {log.userPrompt}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                          log.isMock
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {log.isMock ? 'Mock Fallback' : 'Live API'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">{log.model}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Detailed Inspector View */}
          <div className="w-3/5 overflow-y-auto p-5 bg-slate-950/60 space-y-5 text-xs">
            {selectedLog ? (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="font-bold text-sm text-white">{selectedLog.taskName}</h3>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {selectedLog.timestamp}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(selectedLog)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition cursor-pointer"
                  >
                    {copiedId === selectedLog.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                        <span>Copied JSON</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Export JSON</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block mb-1">Model:</span>
                    <span className="font-mono text-slate-200 font-medium">{selectedLog.model}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block mb-1">Temperature:</span>
                    <span className="font-mono text-slate-200 font-medium">
                      {selectedLog.temperature}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block mb-1">Tokens:</span>
                    <span className="font-mono text-slate-200 font-medium">
                      {selectedLog.tokenCount ?? 'N/A'}
                    </span>
                  </div>
                </div>

                {/* System Instruction */}
                <div>
                  <span className="font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
                    System Instruction / Persona:
                  </span>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl font-mono text-slate-300 whitespace-pre-wrap text-[11px]">
                    {selectedLog.systemInstruction}
                  </div>
                </div>

                {/* Input Payload */}
                <div>
                  <span className="font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                    Input Prompt Payload:
                  </span>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl font-mono text-slate-300 whitespace-pre-wrap text-[11px]">
                    {selectedLog.userPrompt}
                  </div>
                </div>

                {/* Output Payload */}
                <div>
                  <span className="font-semibold text-slate-300 block mb-1.5">Output Response:</span>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl font-mono text-emerald-300 whitespace-pre-wrap text-[11px] max-h-60 overflow-y-auto">
                    {typeof selectedLog.response === 'object'
                      ? JSON.stringify(selectedLog.response, null, 2)
                      : selectedLog.response}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-20 text-slate-500">
                Select a prompt run to inspect its breakdown.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

PromptInspector.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
