import { describe, it, expect } from 'vitest';
import { mockResponses } from '../src/services/mockData';
import { promptLogger } from '../src/utils/promptLogger';

describe('Challenge 5: Celebration & Event Planner Logic & Guardrails', () => {
  it('should generate a plan with all required event planning pillars', () => {
    const plan = mockResponses.defaultPlan;
    expect(plan).toHaveProperty('title');
    expect(plan).toHaveProperty('summary');
    expect(plan).toHaveProperty('pillars');
    expect(plan).toHaveProperty('timeline');
    expect(plan).toHaveProperty('recommendations');
    expect(plan.timeline.length).toBeGreaterThanOrEqual(4);
  });

  it('should generate structured event plan with 100% budget math', () => {
    const plan = mockResponses.generateEventPlan('Wedding', 1000000, '₹', 250, 'Jaipur', 'Royal');
    expect(plan).toHaveProperty('budgetBreakdown');
    expect(plan).toHaveProperty('timeline');
    expect(plan).toHaveProperty('vendorChecklist');
    expect(plan).toHaveProperty('personalizedIdeas');

    // Verify mathematical allocation sums to 100%
    const totalPercentage = plan.budgetBreakdown.reduce((sum, item) => sum + item.percentage, 0);
    expect(totalPercentage).toBe(100);
  });

  it('should accurately log prompt execution and telemetry for judges', () => {
    promptLogger.clear();
    const entry = promptLogger.log({
      taskName: 'Challenge 5: Celebration Planner',
      systemInstruction: 'You are an expert event planner',
      userPrompt: 'Plan an anniversary party',
      model: 'gemini-2.5-flash',
      temperature: 0.7,
      response: { status: 'success' },
      isMock: true,
      latencyMs: 350
    });

    expect(entry.id).toBeDefined();
    expect(entry.latencyMs).toBe(350);
    expect(promptLogger.getLogs().length).toBe(1);
  });

  it('should trigger thrift mode guardrail for extreme low budget edge cases', () => {
    const edgeCasePlan = mockResponses.generateEventPlan('Party', 3000, '₹', 50, 'Delhi', 'DIY');
    expect(edgeCasePlan.isThriftMode).toBe(true);
    expect(edgeCasePlan.title).toContain('Guardrail Alert');
    const totalPercentage = edgeCasePlan.budgetBreakdown.reduce((sum, item) => sum + item.percentage, 0);
    expect(totalPercentage).toBe(100);
  });
});
