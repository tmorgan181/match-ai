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
      q11: 4,
      q14: 5,
      q25: "privacy",
      q26: "government",
      q27: "advocate",
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
      q25: "misinformation",
      q27: "antagonist",
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
      q27: "builder",
      q28: "expert",
    });
    expect(assignArchetype(scores)).toBe("builder");
  });

  it("displaced profile lands on displaced", () => {
    const scores = scoreAnswers({
      q3: 1,
      q10: 4,
      q20: "yes",
      q21: "yes",
      q25: "job_displacement",
      q27: "displaced",
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
      q23: "yes",
      q25: "existential",
      q27: "doomer",
    });
    expect(assignArchetype(scores)).toBe("doomer");
  });

  it("guardian profile lands on guardian", () => {
    const scores = scoreAnswers({
      q7: 1,
      q9: 4,
      q11: 5,
      q13: 5,
      q19: "yes",
      q25: "mental_health",
      q27: "guardian",
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
      q25: "not_concerned",
      q27: "optimist",
    });
    expect(assignArchetype(scores)).toBe("optimist");
  });

  it("pragmatist profile lands on pragmatist", () => {
    const scores = scoreAnswers({
      q3: 4,
      q7: 5,
      q10: 1,
      q17: "yes",
      q18: "yes",
      q26: "companies",
      q27: "pragmatist",
      q28: "advanced",
    });
    expect(assignArchetype(scores)).toBe("pragmatist");
  });

  it("purist profile lands on purist", () => {
    const scores = scoreAnswers({
      q9: 5,
      q10: 5,
      q17: "no",
      q21: "yes",
      q22: "no",
      q25: "creativity_loss",
      q27: "purist",
    });
    expect(assignArchetype(scores)).toBe("purist");
  });

  it("researcher profile lands on researcher", () => {
    const scores = scoreAnswers({
      q5: 5,
      q12: 4,
      q15: 5,
      q23: "yes",
      q24: "gt_5y",
      q27: "researcher",
      q28: "expert",
    });
    expect(assignArchetype(scores)).toBe("researcher");
  });

  it("skeptic profile lands on skeptic", () => {
    const scores = scoreAnswers({
      q3: 1,
      q6: 2,
      q8: 5,
      q10: 3,
      q11: 4,
      q17: "no",
      q25: "environment",
      q27: "skeptic",
    });
    expect(assignArchetype(scores)).toBe("skeptic");
  });

  it("student profile lands on student", () => {
    const scores = scoreAnswers({
      q4: 5,
      q5: 4,
      q12: 3,
      q23: "sometimes",
      q24: "lt_6m",
      q27: "student",
      q28: "basic",
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
      q27: "doomer",
    });
    const winner = assignArchetype(scores);
    expect(computeConfidence(scores, winner)).toBeGreaterThanOrEqual(0);
  });
});
