import { describe, expect, it } from "vitest";
import { assignArchetype, scoreAnswers } from "./scoring";

describe("scoreAnswers", () => {

  it("returns zero scores for empty answers", () => {
    const scores = scoreAnswers({});
    for (const v of Object.values(scores)) expect(v).toBe(0);
  });

  it("skipped questions contribute zero", () => {
    const scores = scoreAnswers({ q3: undefined, q20: undefined });
    for (const v of Object.values(scores)) expect(v).toBe(0);
  });

  it("scores builder via technical questions", () => {
    const scores = scoreAnswers({
      q3: 5,        // benefits outweigh risks → builder +2
      q20: "yes",   // uses AI chatbots → builder +2
      q23: "yes",   // can write fibonacci → builder +3
      q27: "yes",   // CS/engineering → builder +2
      q35: "expert",// tech knowledge → builder +3
    });
    expect(scores.builder).toBeGreaterThan(scores.guardian);
    expect(scores.builder).toBeGreaterThan(scores.skeptic);
    expect(assignArchetype(scores)).toBe("builder");
  });

  it("scores guardian via harm-awareness questions", () => {
    const scores = scoreAnswers({
      q5: 5,        // environmental concern → guardian +2
      q6: 1,        // AI can't provide emotional support → guardian +2
      q11: 5,       // should be regulated → guardian +2
      q15: 5,       // knows Sewell Setzer → guardian +3
      q22: "yes",   // experienced AI harm → guardian +3
      q28: "yes",   // has children → guardian +2
    });
    expect(scores.guardian).toBeGreaterThan(scores.builder);
    expect(assignArchetype(scores)).toBe("guardian");
  });

  it("scores advocate via civic engagement questions", () => {
    const scores = scoreAnswers({
      q11: 5,       // should be regulated → advocate +3
      q18: 5,       // knows EU AI Act → advocate +3
      q21: "yes",   // votes → advocate +2
      q25: "yes",   // political committee → advocate +3
      q26: "yes",   // legal material → advocate +2
    });
    expect(scores.advocate).toBeGreaterThan(scores.builder);
    expect(assignArchetype(scores)).toBe("advocate");
  });

  it("scores researcher via curiosity signals", () => {
    const scores = scoreAnswers({
      q7: 5,        // wants truth → researcher +3
      q9: 3,        // engages with consciousness question → researcher +1
      q19: 5,       // AI alignment research → researcher +2
      q23: "yes",   // can code → researcher +1
      q35: "advanced", // advanced tech knowledge → researcher +1
    });
    expect(scores.researcher).toBeGreaterThan(scores.connector);
    expect(assignArchetype(scores)).toBe("researcher");
  });

  it("scores skeptic via doubt signals", () => {
    const scores = scoreAnswers({
      q3: 1,        // benefits don't outweigh risks → skeptic +2
      q8: 5,        // AI making humanity dumber → skeptic +2
      q9: 1,        // AI won't be conscious → skeptic +2
      q11: 5,       // should be regulated → skeptic +2
      q13: 5,       // pace too fast → skeptic +2
      q20: "no",    // doesn't use AI → skeptic +2
    });
    expect(scores.skeptic).toBeGreaterThan(scores.builder);
    expect(assignArchetype(scores)).toBe("skeptic");
  });

  it("scores purist via creative-preservation signals", () => {
    const scores = scoreAnswers({
      q4: 5,        // human creativity more valuable → purist +3
      q8: 5,        // AI making humanity dumber → purist +2
      q10: 5,       // traditional education better → purist +3
      q14: 1,       // AI music is not art → purist +3
      q20: "no",    // doesn't use AI → purist +2
      q31: "yes",   // creates art → purist +2
      q32: "no",    // hasn't used AI for art → purist +1
    });
    expect(scores.purist).toBeGreaterThan(scores.builder);
    expect(assignArchetype(scores)).toBe("purist");
  });

  it("scores moderator via platform-literacy signals", () => {
    const scores = scoreAnswers({
      q12: 5,       // AI content should be labeled → moderator +2
      q16: 5,       // knows recommendation algorithms → moderator +2
      q17: 5,       // knows AI slop → moderator +3
      q23: "yes",   // can code → moderator +2
      q27: "yes",   // CS/engineering → moderator +1
      q29: "yes",   // reported misinformation → moderator +3
      q30: "yes",   // moderates community → moderator +2
    });
    expect(scores.moderator).toBeGreaterThan(scores.builder);
    expect(assignArchetype(scores)).toBe("moderator");
  });

  it("breaks ties alphabetically (advocate < builder)", () => {
    const tiedScores = {
      advocate: 10, builder: 10, connector: 10,
      guardian: 10, moderator: 10, purist: 10,
      researcher: 10, skeptic: 10,
    };
    expect(assignArchetype(tiedScores)).toBe("advocate");
  });

  it("yns sometimes auto-computes floor(yes / 2) when not explicit", () => {
    // q21 yes → advocate +2, guardian +1; sometimes not specified → advocate +1, guardian +0
    const scoresYes = scoreAnswers({ q21: "yes" });
    const scoresSometimes = scoreAnswers({ q21: "sometimes" });
    expect(scoresSometimes.advocate).toBe(Math.floor(scoresYes.advocate / 2));
  });

  it("yns sometimes uses explicit config when provided (q20)", () => {
    // q20 sometimes is explicit: researcher +1, moderator +1 (not half of yes)
    const scores = scoreAnswers({ q20: "sometimes" });
    expect(scores.researcher).toBe(1);
    expect(scores.moderator).toBe(1);
    expect(scores.builder).toBe(0); // yes gives builder +2, sometimes override doesn't
  });

  it("negative scoring reduces archetype score (q32 purist)", () => {
    const before = scoreAnswers({ q31: "yes" }); // purist +2
    const after = scoreAnswers({ q31: "yes", q32: "yes" }); // purist +2 then -2
    expect(after.purist).toBeLessThan(before.purist);
  });

  it("stacking scale rules work (q4: purist gets +3 at 5)", () => {
    const scores = scoreAnswers({ q4: 5 });
    expect(scores.purist).toBe(3); // gte:4 → +2, then eq:5 → +1 more
  });

  it("any-condition fires for any non-null answer (q9 researcher)", () => {
    const at1 = scoreAnswers({ q9: 1 });
    const at5 = scoreAnswers({ q9: 5 });
    expect(at1.researcher).toBeGreaterThan(0);
    expect(at5.researcher).toBeGreaterThan(0);
  });

  it("choice q34 primary concern routes correctly", () => {
    expect(scoreAnswers({ q34: "mental_health" }).guardian).toBe(3);
    expect(scoreAnswers({ q34: "creativity_loss" }).purist).toBe(3);
    expect(scoreAnswers({ q34: "misinformation" }).moderator).toBe(3);
    expect(scoreAnswers({ q34: "not_concerned" }).builder).toBe(2);
  });
});
