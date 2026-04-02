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
      { when: { gte: 4 }, add: { student: 4, researcher: 1, builder: 1 } },
      { when: { lte: 2 }, add: { pragmatist: 1 } },
    ],
  },
  q5: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { student: 3, researcher: 3, skeptic: 1 } },
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
  q8: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { skeptic: 4, antagonist: 1, displaced: 1, doomer: -1 } },
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
      { when: { gte: 4 }, add: { antagonist: 3, guardian: 3, advocate: 2, displaced: 1, skeptic: 1 } },
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
      { when: { gte: 4 }, add: { guardian: 4, antagonist: 1, advocate: 1 } },
      { when: { eq: 3 }, add: { guardian: 1 } },
    ],
  },
  q14: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { advocate: 3, researcher: 1 } },
      { when: { eq: 3 }, add: { advocate: 1 } },
    ],
  },
  q15: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { doomer: 2, researcher: 4, builder: 1 } },
      { when: { eq: 3 }, add: { researcher: 1, student: 1 } },
    ],
  },
  q16: {
    type: "scale",
    rules: [
      { when: { gte: 4 }, add: { antagonist: 2, builder: 1, skeptic: 1, researcher: 1 } },
    ],
  },
  q17: {
    type: "yns",
    yes: { builder: 3, optimist: 2, pragmatist: 1, purist: -2, antagonist: -2, skeptic: -1 },
    sometimes: { builder: 1, student: 1, optimist: 1, purist: -1, antagonist: -1 },
    no: { purist: 2, skeptic: 1, antagonist: 1, displaced: 1 },
  },
  q18: {
    type: "yns",
    yes: { builder: 5, pragmatist: 1, student: -1, researcher: 1 },
    sometimes: { builder: 2, student: 1, researcher: 1 },
    no: { student: 1, guardian: 1, advocate: 1 },
  },
  q19: {
    type: "yns",
    yes: { guardian: 4, antagonist: 2, advocate: 1 },
    sometimes: { guardian: 2, antagonist: 1 },
  },
  q20: {
    type: "yns",
    yes: { displaced: 5, antagonist: 2, guardian: 1, pragmatist: -1 },
    sometimes: { displaced: 2, antagonist: 1, skeptic: 1 },
  },
  q21: {
    type: "yns",
    yes: { purist: 3, displaced: 1 },
    sometimes: { purist: 1 },
  },
  q22: {
    type: "yns",
    yes: { builder: 2, optimist: 1, purist: -2, antagonist: -1, displaced: -1 },
    sometimes: { builder: 1, purist: -1 },
    no: { purist: 1, antagonist: 1, displaced: 1 },
  },
  q23: {
    type: "yns",
    yes: { researcher: 4, student: 2, doomer: 1, skeptic: 1 },
    sometimes: { researcher: 2, student: 1 },
  },
  q24: {
    type: "choice",
    options: {
      lt_6m: { student: 3 },
      "6m_2y": { student: 2, researcher: 1 },
      "2y_5y": { builder: 1, skeptic: 1, optimist: 1, researcher: 1 },
      gt_5y: { researcher: 3, builder: 1, pragmatist: 1, skeptic: 1, doomer: 1 },
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
      companies: { pragmatist: 2, optimist: 1 },
      international: { advocate: 2, doomer: 1, researcher: 1 },
      open_source: { builder: 2, optimist: 1, researcher: 1 },
      no_one: { pragmatist: 2, skeptic: 1 },
    },
  },
  q27: {
    type: "choice",
    options: {
      advocate: { advocate: 5 },
      antagonist: { antagonist: 5 },
      builder: { builder: 5 },
      displaced: { displaced: 5 },
      doomer: { doomer: 5 },
      guardian: { guardian: 5 },
      optimist: { optimist: 5 },
      pragmatist: { pragmatist: 5 },
      purist: { purist: 5 },
      researcher: { researcher: 5 },
      skeptic: { skeptic: 5 },
      student: { student: 5 },
    },
  },
  q28: {
    type: "choice",
    options: {
      expert: { builder: 3, researcher: 3, pragmatist: 1, optimist: 1 },
      advanced: { builder: 2, researcher: 2, student: 1, pragmatist: 1 },
      intermediate: { builder: 1, researcher: 1, student: 1 },
      basic: { student: 2, guardian: 1, advocate: 1 },
      very_little: { student: 3, purist: 1 },
    },
  },
};
