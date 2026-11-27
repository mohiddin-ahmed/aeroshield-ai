import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  buildFallbackDefensePlan,
  type GeminiClientLike,
  generateSmogDefensePlan
} from '../src/services/gemini';
import { getPromptLogs, promptLogger } from '../src/utils/promptLogger';

describe('AeroShield AI: Gemini GenAI Service & Prompt Telemetry Tests', () => {
  beforeEach(() => {
    promptLogger.clear();
    vi.restoreAllMocks();
  });

  it('builds consistent deterministic fallback defense plans with Berkeley Earth dosimetry math', () => {
    const plan = buildFallbackDefensePlan({
      city: 'Patna',
      pm25: 220,
      vulnSummary: 'toddler, elderly'
    });

    expect(plan.assessment).toContain('Patna');
    expect(plan.daily_routine).toHaveLength(4);
    expect(plan.jugaad_prescriptions).toHaveLength(2);
    expect(plan.dosimetry_impact?.pm25_avoided_ug).toBe(396);
    expect(plan.dosimetry_impact?.cigarettes_avoided).toBe(18);
  });

  it('runs cleanly without API key in offline evaluator mode and logs telemetry', async () => {
    const result = await generateSmogDefensePlan({
      city: 'New Delhi',
      aqi: 425,
      pm25: 320,
      vulnerabilities: ['toddler', 'asthma']
    });

    expect(result.success).toBe(true);
    expect(result.isMock).toBe(true);
    expect(result.data.daily_routine).toHaveLength(4);

    const logs = getPromptLogs();
    expect(logs).toHaveLength(1);
    expect(logs[0].isMock).toBe(true);
    expect(logs[0].tokenCount).toBe(420);
    expect(logs[0].userPrompt).toContain('New Delhi');
  });

  it('executes live Gemini client cleanly and preserves exact tokenCount & isMock=false', async () => {
    const mockClient: GeminiClientLike = {
      models: {
        generateContent: vi.fn().mockResolvedValue({
          text: JSON.stringify({
            assessment: 'High particulate density requires indoor HEPA circulation.',
            daily_routine: [
              {
                time: '01:00 PM - 03:00 PM',
                action: 'Ventilate rooms briefly',
                scientific_reason: 'Thermal convective mixing lowers street smog concentration.'
              }
            ]
          }),
          usageMetadata: { totalTokenCount: 612 }
        })
      }
    };

    const result = await generateSmogDefensePlan(
      { city: 'Kolkata', aqi: 280, pm25: 185, vulnerabilities: ['elderly'] },
      mockClient
    );

    expect(mockClient.models.generateContent).toHaveBeenCalledTimes(1);
    expect(result.success).toBe(true);
    expect(result.isMock).toBe(false);
    expect(result.data.assessment).toContain('HEPA circulation');

    const logs = getPromptLogs();
    expect(logs[0].isMock).toBe(false);
    expect(logs[0].tokenCount).toBe(612);
  });

  it('falls back gracefully without infinite recursion when Gemini API throws or returns invalid JSON', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const failingClient: GeminiClientLike = {
      models: {
        generateContent: vi.fn().mockRejectedValue(new Error('429 Quota exceeded'))
      }
    };

    const result = await generateSmogDefensePlan(
      { city: 'Lucknow', aqi: 340, pm25: 250, vulnerabilities: ['asthma'] },
      failingClient
    );

    expect(failingClient.models.generateContent).toHaveBeenCalledTimes(1);
    expect(result.success).toBe(true);
    expect(result.isMock).toBe(true);
    expect(result.data.daily_routine).toHaveLength(4);

    const logs = getPromptLogs();
    expect(logs[0].isMock).toBe(true);
    expect(logs[0].error).toContain('429 Quota exceeded');

    const invalidSchemaClient: GeminiClientLike = {
      models: {
        generateContent: vi.fn().mockResolvedValue({ text: '{"invalid": true}' })
      }
    };
    const schemaFallback = await generateSmogDefensePlan({ city: 'Patna' }, invalidSchemaClient);
    expect(schemaFallback.isMock).toBe(true);
  });

  it('enforces 50-entry bounded log history and notifies subscribers', () => {
    const listener = vi.fn();
    const unsubscribe = promptLogger.subscribe(listener);

    for (let i = 0; i < 55; i += 1) {
      promptLogger.log({
        taskName: `Run ${i}`,
        userPrompt: `Prompt ${i}`,
        response: '{}',
        isMock: true,
        latencyMs: 100
      });
    }

    expect(getPromptLogs()).toHaveLength(50);
    expect(listener).toHaveBeenCalled();
    unsubscribe();
  });
});
