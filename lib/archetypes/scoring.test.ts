import { describe, expect, it } from "vitest";
import { assignArchetype, computeConfidence, scoreAnswers } from "./scoring";

describe("scoreAnswers", () => {
  it("returns zero scores for empty answers", () => {
    const scores = scoreAnswers({});
    for (const value of Object.values(scores)) expect(value).toBe(0);
  });

  it("advocate profile lands on advocate", () => {
    const scores = scoreAnswers({
      q7: 2,
      q13: 5,
      q14: 3,
      q25: "privacy",
      q24: "policy_leverage",
      q26: "government",
      q27: "set_guardrails",
      q28: "basic",
    });
    expect(assignArchetype(scores)).toBe("advocate");
  });

  it("antagonist profile lands on antagonist", () => {
    const scores = scoreAnswers({
      q3: 1,
      q10: 4,
      q11: 5,
      q16: 4,
      q19: "sometimes",
      q24: "direct_harm",
      q25: "misinformation",
      q27: "push_back",
    });
    expect(assignArchetype(scores)).toBe("antagonist");
  });

  it("builder profile lands on builder", () => {
    const scores = scoreAnswers({
      q3: 4,
      q6: 4,
      q17: "yes",
      q18: "yes",
      q22: "yes",
      q24: "useful_tools",
      q27: "build_better",
      q28: "expert",
      q29: 5,
      q30: 2,
    });
    expect(assignArchetype(scores)).toBe("builder");
  });

  it("displaced profile lands on displaced", () => {
    const scores = scoreAnswers({
      q3: 1,
      q10: 4,
      q20: "yes",
      q21: "yes",
      q24: "economic_harm",
      q25: "job_displacement",
      q27: "push_back",
      q22: "no",
    });
    expect(assignArchetype(scores)).toBe("displaced");
  });

  it("doomer profile lands on doomer", () => {
    const scores = scoreAnswers({
      q7: 1,
      q10: 5,
      q12: 5,
      q15: 4,
      q24: "catastrophic_risk",
      q25: "existential",
      q27: "take_xrisk_seriously",
    });
    expect(assignArchetype(scores)).toBe("doomer");
  });

  it("guardian profile lands on guardian", () => {
    const scores = scoreAnswers({
      q7: 1,
      q9: 4,
      q11: 5,
      q31: 5,
      q19: "yes",
      q24: "direct_harm",
      q25: "mental_health",
      q27: "set_guardrails",
    });
    expect(assignArchetype(scores)).toBe("guardian");
  });

  it("optimist profile lands on optimist", () => {
    const scores = scoreAnswers({
      q3: 5,
      q6: 5,
      q8: 1,
      q10: 1,
      q12: 1,
      q17: "yes",
      q23: "no",
      q24: "useful_tools",
      q25: "not_concerned",
      q27: "build_better",
    });
    expect(assignArchetype(scores)).toBe("optimist");
  });

  it("pragmatist profile lands on pragmatist", () => {
    const scores = scoreAnswers({
      q3: 4,
      q7: 5,
      q13: 1,
      q10: 1,
      q17: "yes",
      q18: "no",
      q29: 3,
      q30: 2,
      q26: "companies",
      q27: "build_better",
      q28: "advanced",
    });
    expect(assignArchetype(scores)).toBe("pragmatist");
  });

  it("purist profile lands on purist", () => {
    const scores = scoreAnswers({
      q9: 5,
      q10: 5,
      q16: 5,
      q17: "no",
      q21: "yes",
      q22: "no",
      q24: "human_values",
      q25: "creativity_loss",
      q27: "push_back",
    });
    expect(assignArchetype(scores)).toBe("purist");
  });

  it("researcher profile lands on researcher", () => {
    const scores = scoreAnswers({
      q5: 5,
      q12: 4,
      q14: 5,
      q15: 5,
      q24: "research",
      q27: "learn_more",
      q28: "expert",
      q29: 4,
      q30: 5,
    });
    expect(assignArchetype(scores)).toBe("researcher");
  });

  it("skeptic profile lands on skeptic", () => {
    const scores = scoreAnswers({
      q3: 1,
      q6: 2,
      q8: 5,
      q10: 3,
      q16: 4,
      q11: 4,
      q17: "no",
      q24: "research",
      q25: "environment",
      q27: "learn_more",
    });
    expect(assignArchetype(scores)).toBe("skeptic");
  });

  it("student profile lands on student", () => {
    const scores = scoreAnswers({
      q4: 5,
      q5: 4,
      q12: 3,
      q32: 5,
      q24: "research",
      q27: "learn_more",
      q28: "basic",
      q14: 2,
    });
    expect(assignArchetype(scores)).toBe("student");
  });

  it("breaks ties alphabetically", () => {
    const tiedScores = {
      advocate: 10,
      antagonist: 10,
      builder: 10,
      displaced: 10,
      doomer: 10,
      guardian: 10,
      optimist: 10,
      pragmatist: 10,
      purist: 10,
      researcher: 10,
      skeptic: 10,
      student: 10,
    };
    expect(assignArchetype(tiedScores)).toBe("advocate");
  });

  it("yns sometimes auto-computes floor(yes / 2) when not explicit", () => {
    const yesScores = scoreAnswers({ q21: "yes" });
    const sometimesScores = scoreAnswers({ q21: "sometimes" });
    expect(sometimesScores.purist).toBe(Math.floor(yesScores.purist / 2));
  });

  it("negative scoring can reduce an archetype total", () => {
    const before = scoreAnswers({ q21: "yes" });
    const after = scoreAnswers({ q21: "yes", q22: "yes" });
    expect(after.purist).toBeLessThan(before.purist);
  });

  it("confidence stays non-negative with negative scoring", () => {
    const scores = scoreAnswers({
      q3: 1,
      q10: 5,
      q12: 5,
      q25: "existential",
      q27: "take_xrisk_seriously",
    });
    const winner = assignArchetype(scores);
    expect(computeConfidence(scores, winner)).toBeGreaterThanOrEqual(0);
  });
});
