export const ARCHETYPE_KEYS = [
  "antagonist",
  "builder",
  "doomer",
  "guardian",
  "optimist",
  "pragmatist",
  "purist",
  "skeptic",
  "student",
] as const;

export type ArchetypeKey = (typeof ARCHETYPE_KEYS)[number];

export const ARCHETYPES: Record<
  ArchetypeKey,
  { name: string; tagline: string; description: string; strengths: string[] }
> = {
  antagonist: {
    name: "The Antagonist",
    tagline: "AI is already hurting people, and I want it pushed back.",
    description:
      "Your opposition is grounded in present-day harm. Job displacement, surveillance, manipulation, spam, and creative erosion are not hypothetical to you. You do not need an abstract theory of AI danger to feel that this is already going badly.",
    strengths: ["Concrete realism", "Present-harm awareness", "Resistance to normalization"],
  },
  builder: {
    name: "The Builder",
    tagline: "I want to build better systems.",
    description:
      "You are technically oriented and solution-focused. When AI creates problems, your instinct is to improve the tools, redesign the system, or build something more responsible rather than stepping away from the work entirely.",
    strengths: ["Technical fluency", "Practical problem-solving", "Systems thinking"],
  },
  doomer: {
    name: "The Doomer",
    tagline: "We are underestimating how dangerous this could become.",
    description:
      "You are focused on existential or civilizational risk. The stakes are not only job disruption or junk content, but loss of control, irreversible catastrophe, or extinction. You think the conversation is still too small for the threat.",
    strengths: ["Long-range risk perception", "Systems awareness", "Seriousness about failure modes"],
  },
  guardian: {
    name: "The Guardian",
    tagline: "I want to protect people from harm.",
    description:
      "You focus first on who gets hurt. AI is not abstract to you. It lands in people's lives, especially vulnerable people's lives, and that moral reality shapes how you think about speed, safeguards, and responsibility.",
    strengths: ["Harm detection", "Moral clarity", "Human-centered judgment"],
  },
  optimist: {
    name: "The Optimist",
    tagline: "AI will be a net benefit if we let it grow.",
    description:
      "You see AI as a powerful positive force. Risks are real, but the wider conversation often feels too dominated by fear and cynicism. Your emotional baseline is hope, possibility, and confidence in human adaptation.",
    strengths: ["Vision", "Enthusiasm", "Future orientation"],
  },
  pragmatist: {
    name: "The Pragmatist",
    tagline: "We have to keep up, whether we like it or not.",
    description:
      "You think AI development is driven by competitive reality. Markets move, governments compete, and the technology will not wait for moral consensus. Even if there are risks, slowing down can itself feel dangerous.",
    strengths: ["Strategic realism", "Competitive awareness", "Decisiveness"],
  },
  purist: {
    name: "The Purist",
    tagline: "Some things should stay human.",
    description:
      "You think AI threatens something fundamental in human life: creativity, dignity, authorship, relationship, learning, or meaning. Your resistance is not only about risk. It is also about principle and boundaries.",
    strengths: ["Philosophical clarity", "Cultural preservation", "Norm-setting"],
  },
  skeptic: {
    name: "The Skeptic",
    tagline: "I'm not convinced AI is delivering what it promises.",
    description:
      "You resist hype. The benefits seem overstated, the marketing outpaces the evidence, and many grand claims collapse under scrutiny. You are open to persuasion, but enthusiasm is not enough for you.",
    strengths: ["Critical distance", "Evidence focus", "Hype resistance"],
  },
  student: {
    name: "The Student",
    tagline: "I want to understand AI before I decide what to do.",
    description:
      "You lead with learning. You do not trust easy narratives, whether optimistic or catastrophic, and you are comfortable saying you need more evidence. In a polarized environment, your patience and humility are a strength.",
    strengths: ["Curiosity", "Intellectual humility", "Careful reasoning"],
  },
};
