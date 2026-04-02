import type { ArchetypeKey } from "./definitions";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ArchetypeScores = Partial<Record<ArchetypeKey, number>>;

/** Conditions for scale (1–5) questions. All matching rules stack additively. */
export type ScaleCondition =
  | { gte: number }            // answer >= value
  | { lte: number }            // answer <= value
  | { eq: number }             // answer === value
  | { between: [number, number] } // inclusive range
  | { any: true };             // any non-null answer (engagement signal)

export type ScaleRule = { when: ScaleCondition; add: ArchetypeScores };

export type ScaleConfig = { type: "scale"; rules: ScaleRule[] };

/**
 * Yes / No / Sometimes question.
 * If `sometimes` is omitted the engine auto-computes floor(yes[key] / 2) for each archetype.
 * Negative values are allowed (e.g. purist: -2).
 */
export type YNSConfig = {
  type: "yns";
  yes?: ArchetypeScores;
  sometimes?: ArchetypeScores; // omit to use auto-half of yes weights
  no?: ArchetypeScores;
};

/** Multiple-choice question keyed by option value. */
export type ChoiceConfig = {
  type: "choice";
  options: Record<string, ArchetypeScores>;
};

export type QuestionConfig = ScaleConfig | YNSConfig | ChoiceConfig;

/** Map from question id → scoring config. Add/remove/edit rules here. */
export type ScoringConfig = Record<string, QuestionConfig>;

// ---------------------------------------------------------------------------
// Config
// Edit weights here. No changes to scoring.ts needed.
// ---------------------------------------------------------------------------

export const SCORING_CONFIG: ScoringConfig = {

  // Q3 — The benefits of AI outweigh the risks (agree/disagree)
  q3: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { builder: 2 } },
      { when: { eq: 3 },  add: { builder: 1, skeptic: 1, researcher: 1 } },
      { when: { lte: 2 }, add: { skeptic: 2, purist: 2 } },
    ],
  },

  // Q4 — Human creativity is inherently more valuable than AI-generated content
  q4: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { purist: 2, moderator: 1 } },
      { when: { eq: 5 },  add: { purist: 1 } },  // stacks: eq5 → total +3
      { when: { lte: 2 }, add: { builder: 2 } },
    ],
  },

  // Q5 — I am concerned about the environmental impacts of AI datacenters
  q5: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { guardian: 2, advocate: 1 } },
      { when: { lte: 2 }, add: { builder: 1 } },
    ],
  },

  // Q6 — AI chatbots can provide meaningful emotional support
  q6: {
    type: "scale",
    rules: [
      { when: { lte: 2 }, add: { guardian: 2, skeptic: 2 } },
      { when: { gte: 4 }, add: { connector: 1, builder: 1 } },
    ],
  },

  // Q7 — I always want to know the truth, even if it means I was wrong
  q7: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { researcher: 2, advocate: 1 } },
      { when: { eq: 5 },  add: { researcher: 1 } }, // stacks: eq5 → total +3
    ],
  },

  // Q8 — AI is making humanity dumber
  q8: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { skeptic: 2, purist: 2 } },
      { when: { lte: 2 }, add: { builder: 2 } },
    ],
  },

  // Q9 — AI will become conscious before the year 2100
  q9: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { builder: 2 } },
      { when: { lte: 2 }, add: { skeptic: 2 } },
      { when: { any: true }, add: { researcher: 1 } }, // engagement signal
    ],
  },

  // Q10 — Traditional education is better than AI-assisted learning
  q10: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { purist: 3, guardian: 1 } },
      { when: { lte: 2 }, add: { builder: 2 } },
    ],
  },

  // Q11 — AI should be regulated more strictly than it currently is
  q11: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { advocate: 3, guardian: 2, skeptic: 2 } },
      { when: { lte: 2 }, add: { builder: 1 } },
    ],
  },

  // Q12 — AI-generated content should be clearly labeled
  q12: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { moderator: 2, guardian: 2, purist: 2 } },
    ],
  },

  // Q13 — The current pace of AI development is too fast
  q13: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { guardian: 2, skeptic: 2, purist: 2 } },
      { when: { lte: 2 }, add: { builder: 1 } },
    ],
  },

  // Q14 — AI music is legitimate art
  q14: {
    type: "scale",
    rules: [
      { when: { lte: 2 }, add: { purist: 3 } },
      { when: { gte: 4 }, add: { builder: 2 } },
    ],
  },

  // Q15 — Familiarity: the suicide of Sewell Setzer III
  q15: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { guardian: 3 } },
      { when: { eq: 3 },  add: { guardian: 1 } },
    ],
  },

  // Q16 — Familiarity: social media recommendation algorithms
  q16: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { moderator: 2, advocate: 1, researcher: 1 } },
    ],
  },

  // Q17 — Familiarity: the concept of "AI slop"
  q17: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { moderator: 3, purist: 2 } },
    ],
  },

  // Q18 — Familiarity: the EU AI Act
  q18: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { advocate: 3, researcher: 1 } },
    ],
  },

  // Q19 — Familiarity: AI alignment research
  q19: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { researcher: 2, builder: 1 } },
    ],
  },

  // Q20 — Do you use AI chatbots?
  q20: {
    type: "yns",
    yes:       { builder: 2, connector: 1 },
    sometimes: { researcher: 1, moderator: 1 }, // explicit override of auto-half
    no:        { skeptic: 2, purist: 2 },
  },

  // Q21 — Do you regularly vote in municipal and state elections?
  q21: {
    type: "yns",
    yes:       { advocate: 2, guardian: 1 },
    sometimes: { advocate: 1 },
    // no: no points
  },

  // Q22 — Have you or someone you know experienced harm from AI chatbot interactions?
  q22: {
    type: "yns",
    yes:       { guardian: 3 },
    sometimes: { guardian: 1 }, // explicit (not auto-half)
    // no: no points
  },

  // Q23 — Could you write Fibonacci in pseudocode/code?
  q23: {
    type: "yns",
    yes:       { builder: 3, moderator: 2, researcher: 1 },
    sometimes: { builder: 1, researcher: 1 }, // explicit override
    // no: no points
  },

  // Q24 — Does your job involve writing emails or communication?
  q24: {
    type: "yns",
    yes:       { connector: 2, advocate: 1 },
    sometimes: { connector: 1 },
  },

  // Q25 — Do you or have you ever occupied a seat on any political committee?
  q25: {
    type: "yns",
    yes:       { advocate: 3 },
    sometimes: { advocate: 1 },
  },

  // Q26 — Do you handle legal documents or regulatory material?
  q26: {
    type: "yns",
    yes:       { advocate: 2 },
    sometimes: { advocate: 1 },
  },

  // Q27 — Are you involved in construction, engineering, or computer science?
  q27: {
    type: "yns",
    yes:       { builder: 2, moderator: 1 },
    sometimes: { builder: 1 },
  },

  // Q28 — Do you have children or other individuals for whom you are a guardian?
  q28: {
    type: "yns",
    yes:       { guardian: 2 },
    sometimes: { guardian: 1 },
  },

  // Q29 — Have you reported AI-generated misinformation or bot accounts online?
  q29: {
    type: "yns",
    yes:       { moderator: 3, guardian: 1 },
    sometimes: { moderator: 2 },
  },

  // Q30 — Do you moderate or administer an online community?
  q30: {
    type: "yns",
    yes:       { moderator: 2, connector: 2 },
    sometimes: { moderator: 1, connector: 1 },
  },

  // Q31 — Do you create art, music, or other creative work?
  q31: {
    type: "yns",
    yes:       { purist: 2 },
    sometimes: { purist: 1 },
  },

  // Q32 — Have you used AI to generate images or art? (negative scoring for purist)
  q32: {
    type: "yns",
    yes:       { builder: 2, purist: -2 },
    sometimes: { builder: 1, purist: -1 },
    no:        { purist: 1 },
  },

  // Q33 — When was the last time you talked to someone about your mental health?
  q33: {
    type: "choice",
    options: {
      week:     { guardian: 2, connector: 2 },
      month:    { guardian: 1, connector: 1 },
      year:     { guardian: 1 },
      over_year: {},
      never:    {},
    },
  },

  // Q34 — What is your primary concern about AI?
  q34: {
    type: "choice",
    options: {
      mental_health:    { guardian: 3 },
      environment:      { advocate: 2, guardian: 1 },
      job_displacement: { advocate: 2, skeptic: 1 },
      misinformation:   { moderator: 3, advocate: 1 },
      privacy:          { advocate: 2, guardian: 1 },
      creativity_loss:  { purist: 3 },
      existential_risk: { researcher: 2 },
      not_concerned:    { builder: 2 },
    },
  },

  // Q35 — How much technical knowledge do you have about how AI works?
  q35: {
    type: "choice",
    options: {
      expert:       { builder: 3, moderator: 2, researcher: 2 },
      advanced:     { builder: 2, moderator: 2, researcher: 1 },
      intermediate: { builder: 1, moderator: 1, researcher: 1 },
      basic:        { connector: 1, guardian: 1, advocate: 1 },
      elementary:   { connector: 1, purist: 1 },
      none:         { purist: 1, connector: 1 },
    },
  },
};
