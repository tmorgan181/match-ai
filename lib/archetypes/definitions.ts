export const ARCHETYPE_KEYS = [
  "advocate",
  "antagonist",
  "builder",
  "displaced",
  "doomer",
  "guardian",
  "optimist",
  "pragmatist",
  "purist",
  "researcher",
  "skeptic",
  "student",
] as const;

export type ArchetypeKey = (typeof ARCHETYPE_KEYS)[number];

export const ARCHETYPES: Record<
  ArchetypeKey,
  { name: string; tagline: string; description: string; strengths: string[] }
> = {
  advocate: {
    name: "The Advocate",
    tagline: "I want to change the systems that shape AI.",
    description:
      "You focus on institutions, incentives, and rules. Where others respond to individual harms, you think about the policy, governance, and organizing work that could change the conditions producing those harms in the first place.",
    strengths: ["Policy", "Organizing", "Systems"],
  },
  antagonist: {
    name: "The Antagonist",
    tagline: "AI is already doing damage and I want it pushed back.",
    description:
      "Your opposition is grounded in observed harm at the societal level. Surveillance, manipulation, spam, degraded trust, cultural erosion, and platform damage are not abstract to you. You think the problem is already here.",
    strengths: ["Social harm", "Realism", "Pushback"],
  },
  builder: {
    name: "The Builder",
    tagline: "I want to build better systems.",
    description:
      "You are technically oriented and solution-focused. When AI creates problems, your instinct is to improve the tooling, redesign the system, or build something more responsible rather than stepping away from the work entirely.",
    strengths: ["Technical fluency", "Problem-solving", "Systems"],
  },
  displaced: {
    name: "The Displaced",
    tagline: "AI feels like a direct threat to my livelihood.",
    description:
      "Your relationship to AI is shaped by economic pressure. Job loss, shrinking opportunity, creative devaluation, or income instability feel immediate and personal. Your perspective is grounded in what this technology does to work and survival.",
    strengths: ["Economic clarity", "Material realism", "Urgency"],
  },
  doomer: {
    name: "The Doomer",
    tagline: "We are underestimating how dangerous this is.",
    description:
      "You are focused on existential or civilizational risk. The stakes are not only job disruption or junk content, but loss of control, irreversible catastrophe, or extinction. You think the conversation is still too small for the threat.",
    strengths: ["Long-range risk", "Systems awareness", "Precaution"],
  },
  guardian: {
    name: "The Guardian",
    tagline: "I want to protect people from harm.",
    description:
      "You focus first on who gets hurt. AI is not abstract to you. It lands in people's lives, especially vulnerable people's lives, and that moral reality shapes how you think about speed, safeguards, and responsibility.",
    strengths: ["Direct care", "Harm detection", "Judgment"],
  },
  optimist: {
    name: "The Optimist",
    tagline: "AI will be a net benefit if we let it grow.",
    description:
      "You see AI as a powerful positive force. Risks are real, but the wider conversation often feels too dominated by fear and cynicism. Your emotional baseline is hope, possibility, and confidence in human adaptation.",
    strengths: ["Vision", "Enthusiasm", "Hope"],
  },
  pragmatist: {
    name: "The Pragmatist",
    tagline: "We have to keep up, whether we like it or not.",
    description:
      "You think AI development is driven by competitive reality. Markets move, governments compete, and the technology will not wait for moral consensus. Even if there are risks, slowing down can itself feel dangerous.",
    strengths: ["Strategy", "Competition", "Decisiveness"],
  },
  purist: {
    name: "The Purist",
    tagline: "Some things should stay human.",
    description:
      "You think AI threatens something fundamental in human life: creativity, dignity, authorship, relationship, learning, or meaning. Your resistance is not only about risk. It is also about principle and boundaries.",
    strengths: ["Principle", "Preservation", "Boundaries"],
  },
  researcher: {
    name: "The Researcher",
    tagline: "Systematic investigation is how I make sense of AI.",
    description:
      "You are not just learning casually. Investigation is your primary mode. You are drawn to evidence, papers, frameworks, and rigorous analysis whether or not that work leads to immediate action.",
    strengths: ["Inquiry", "Evidence", "Analysis"],
  },
  skeptic: {
    name: "The Skeptic",
    tagline: "I'm not convinced AI is delivering what it promises.",
    description:
      "You resist hype. The benefits seem overstated, the marketing outpaces the evidence, and many grand claims collapse under scrutiny. You are open to persuasion, but enthusiasm is not enough for you.",
    strengths: ["Doubt", "Evidence", "Discernment"],
  },
  student: {
    name: "The Student",
    tagline: "I want to understand AI before I decide what to do.",
    description:
      "You lead with learning. You do not trust easy narratives, whether optimistic or catastrophic, and you are comfortable saying you need more evidence before committing to a position. Curiosity comes before certainty.",
    strengths: ["Curiosity", "Humility", "Openness"],
  },
};
