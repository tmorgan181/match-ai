import type { ArchetypeKey } from "./definitions";

export type ArchetypeScores = Partial<Record<ArchetypeKey, number>>;

export type ScaleCondition =
  | { gte: number }
  | { lte: number }
  | { eq: number }
  | { between: [number, number] }
  | { any: true };

export type ScaleRule = { when: ScaleCondition; add: ArchetypeScores };
export type ScaleConfig = { type: "scale"; rules: ScaleRule[] };

export type YNSConfig = {
  type: "yns";
  yes?: ArchetypeScores;
  sometimes?: ArchetypeScores;
  no?: ArchetypeScores;
};

export type ChoiceConfig = {
  type: "choice";
  options: Record<string, ArchetypeScores>;
};

export type QuestionConfig = ScaleConfig | YNSConfig | ChoiceConfig;
export type ScoringConfig = Record<string, QuestionConfig>;

export const SCORING_CONFIG: ScoringConfig = {
  q3: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { optimist: 3, builder: 1, pragmatist: 1, skeptic: -2, antagonist: -2, doomer: -2 } },
      { when: { eq: 3 }, add: { student: 1 } },
      { when: { lte: 2 }, add: { skeptic: 2, antagonist: 1, purist: 1, displaced: 1 } },
    ],
  },
  q4: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { student: 4, researcher: 1 } },
      { when: { lte: 2 }, add: { pragmatist: 1 } },
    ],
  },
  q5: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { student: 3, researcher: 2, skeptic: 1 } },
      { when: { lte: 2 }, add: { builder: 1, pragmatist: 1 } },
    ],
  },
  q6: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { optimist: 4, builder: 1 } },
      { when: { lte: 2 }, add: { skeptic: 1, purist: 1 } },
    ],
  },
  q7: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { pragmatist: 5, optimist: 1, guardian: -2, advocate: -1 } },
      { when: { lte: 2 }, add: { guardian: 2, advocate: 1, student: 1, doomer: 1 } },
    ],
  },
    q31: {
      type: "scale",
      rules: [
        { when: { gte: 4 }, add: { guardian: 5, advocate: 1, antagonist: 1, pragmatist: -1 } },
        { when: { eq: 3 }, add: { guardian: 1 } },
      ],
    },
  q32: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { student: 5, guardian: 1, researcher: -1, builder: -1, pragmatist: -1 } },
      { when: { eq: 3 }, add: { student: 1 } },
      { when: { lte: 2 }, add: { researcher: 1, builder: 1, pragmatist: 1 } },
    ],
  },
  q8: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { skeptic: 6, antagonist: 2, displaced: 1, doomer: -1 } },
      { when: { lte: 2 }, add: { optimist: 2, builder: 1 } },
    ],
  },
  q9: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { purist: 4, guardian: 1 } },
      { when: { lte: 2 }, add: { builder: 1, optimist: 1 } },
    ],
  },
  q10: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { purist: 4, antagonist: 3, displaced: 2, doomer: 4, optimist: -2, builder: -1 } },
      { when: { eq: 3 }, add: { skeptic: 1 } },
      { when: { lte: 2 }, add: { optimist: 2, builder: 1, pragmatist: 1 } },
    ],
  },
  q11: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { antagonist: 4, guardian: 2, advocate: 2, displaced: 2, skeptic: 3 } },
      { when: { lte: 2 }, add: { optimist: 1 } },
    ],
  },
  q12: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { doomer: 5, researcher: 1, student: 1, pragmatist: -1 } },
      { when: { eq: 3 }, add: { skeptic: 1 } },
      { when: { lte: 2 }, add: { optimist: 1, pragmatist: 1 } },
    ],
  },
  q13: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { advocate: 5, guardian: 1, builder: -1 } },
      { when: { eq: 3 }, add: { advocate: 1 } },
    ],
  },
  q14: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { researcher: 3, student: 1, skeptic: 1, doomer: 1 } },
      { when: { eq: 3 }, add: { researcher: 1 } },
    ],
  },
  q15: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { doomer: 2, researcher: 3, builder: 1, student: 1 } },
      { when: { eq: 3 }, add: { researcher: 1, student: 1, doomer: 1 } },
    ],
  },
  q16: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { purist: 3, skeptic: 3, antagonist: 2, guardian: 1, optimist: -2, builder: -1 } },
      { when: { eq: 3 }, add: { skeptic: 1, student: 1 } },
      { when: { lte: 2 }, add: { optimist: 1, builder: 1 } },
    ],
  },
    q17: {
      type: "yns",
      yes: { builder: 1, optimist: 2, pragmatist: 2, purist: -2, antagonist: -2, skeptic: -1 },
      sometimes: { student: 1, optimist: 1, pragmatist: 1, purist: -1, antagonist: -1 },
      no: { purist: 2, skeptic: 1, antagonist: 1, displaced: 1 },
    },
    q18: {
      type: "yns",
      yes: { builder: 3, pragmatist: 1, student: -1, researcher: 1 },
      sometimes: { builder: 1, pragmatist: 1, student: 1, researcher: 1 },
      no: { student: 1, guardian: 1, advocate: 1 },
    },
    q19: {
      type: "yns",
      yes: { guardian: 4, antagonist: 3, advocate: 1, displaced: 1 },
      sometimes: { guardian: 2, antagonist: 2, displaced: 1 },
    },
  q20: {
    type: "yns",
    yes: { displaced: 6, antagonist: 2, guardian: 1, pragmatist: -1 },
    sometimes: { displaced: 3, antagonist: 1, skeptic: 1 },
  },
  q21: {
    type: "yns",
    yes: { purist: 4, antagonist: 1, displaced: 1 },
    sometimes: { purist: 2, skeptic: 1 },
    no: { optimist: 1 },
  },
    q22: {
      type: "yns",
      yes: { builder: 1, optimist: 1, purist: -2, antagonist: -1, displaced: -1 },
      sometimes: { purist: -1 },
      no: { purist: 1, antagonist: 1, displaced: 1 },
    },
    q23: {
      type: "yns",
      yes: { guardian: 2, antagonist: 2, skeptic: 3, advocate: 1 },
      sometimes: { guardian: 1, antagonist: 1, skeptic: 1, student: 1 },
      no: { optimist: 1, builder: 1 },
    },
  q24: {
    type: "choice",
    options: {
      direct_harm: { guardian: 3, antagonist: 3, displaced: 1 },
      research: { researcher: 3, skeptic: 3, student: 1 },
      useful_tools: { builder: 2, optimist: 2, pragmatist: 2 },
      human_values: { purist: 4, guardian: 1 },
      economic_harm: { displaced: 5, antagonist: 1 },
      catastrophic_risk: { doomer: 5, researcher: 1 },
      policy_leverage: { advocate: 4, guardian: 1 },
    },
  },
  q25: {
    type: "choice",
    options: {
      mental_health: { guardian: 4, antagonist: 1 },
      environment: { guardian: 2, advocate: 2, skeptic: 1 },
      job_displacement: { displaced: 5, antagonist: 1 },
      misinformation: { antagonist: 2, advocate: 2, skeptic: 1 },
      privacy: { advocate: 3, guardian: 1, antagonist: 1 },
      creativity_loss: { purist: 4, displaced: 1 },
      existential: { doomer: 5, researcher: 1 },
      not_concerned: { optimist: 3, pragmatist: 1, guardian: -3, doomer: -3 },
    },
  },
  q26: {
    type: "choice",
    options: {
      government: { advocate: 3, guardian: 1 },
      companies: { pragmatist: 4, optimist: 1 },
      international: { advocate: 2, doomer: 1, researcher: 1 },
      open_source: { builder: 2, optimist: 1, researcher: 1 },
      no_one: { pragmatist: 4, skeptic: 1 },
    },
  },
  q27: {
    type: "choice",
    options: {
      learn_more: { student: 3, researcher: 1, skeptic: 2 },
        build_better: { builder: 1, optimist: 2, pragmatist: 3 },
      set_guardrails: { guardian: 3, advocate: 3, antagonist: 1 },
      push_back: { purist: 3, displaced: 3, antagonist: 3, skeptic: 2 },
      take_xrisk_seriously: { doomer: 4, researcher: 1, guardian: 1 },
    },
  },
  q28: {
    type: "choice",
    options: {
      expert: { builder: 2, researcher: 3, pragmatist: 2, optimist: 1 },
      advanced: { builder: 1, researcher: 2, student: 1, pragmatist: 2 },
      intermediate: { builder: 1, student: 2 },
      basic: { student: 2, guardian: 1, advocate: 1 },
      very_little: { student: 3, purist: 1 },
    },
  },
    q29: {
      type: "scale",
      rules: [
        { when: { gte: 4 }, add: { builder: 4, researcher: 1, pragmatist: 1, student: -1 } },
        { when: { eq: 3 }, add: { builder: 1, researcher: 1 } },
        { when: { lte: 2 }, add: { student: 1, advocate: 1, guardian: 1 } },
      ],
  },
  q30: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { researcher: 3, skeptic: 1, student: 1, builder: -2 } },
      { when: { eq: 3 }, add: { researcher: 1, student: 1 } },
      { when: { lte: 2 }, add: { builder: 2, pragmatist: 1 } },
    ],
  },
  q33: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { guardian: 1, advocate: 2, skeptic: 1, pragmatist: -1, optimist: -1 } },
      { when: { eq: 3 }, add: { guardian: 1 } },
    ],
  },
  q34: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { researcher: 2, advocate: 2, skeptic: 1 } },
      { when: { eq: 3 }, add: { researcher: 1, skeptic: 1 } },
    ],
  },
  q35: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { advocate: 2, antagonist: 2, skeptic: 1 } },
      { when: { eq: 3 }, add: { advocate: 1 } },
    ],
  },
};
