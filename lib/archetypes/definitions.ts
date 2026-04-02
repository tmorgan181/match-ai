export const ARCHETYPE_KEYS = [
  "advocate",
  "builder",
  "connector",
  "guardian",
  "moderator",
  "purist",
  "researcher",
  "skeptic",
] as const;

export type ArchetypeKey = (typeof ARCHETYPE_KEYS)[number];

export const ARCHETYPES: Record<
  ArchetypeKey,
  { name: string; tagline: string; description: string; strengths: string[] }
> = {
  builder: {
    name: "The Builder",
    tagline: "I want to create better AI systems.",
    description:
      "Driven by technical skill and constructive ambition. You see AI as a tool to improve and tend to move toward making things — prototypes, systems, solutions.",
    strengths: ["Prototyping", "Implementation", "Rapid iteration"],
  },
  guardian: {
    name: "The Guardian",
    tagline: "I want to protect people from AI harm.",
    description:
      "Protective instinct meets practical concern. You focus on the humans affected by AI — especially vulnerable populations — and your first question is always 'who could this hurt?'",
    strengths: ["Harm identification", "User safety review", "Ethical grounding"],
  },
  advocate: {
    name: "The Advocate",
    tagline: "I want to change AI policy and regulation.",
    description:
      "System-level thinker. You believe the problem isn't individual behavior but the structures that enable harm. Your toolkit is organizing, policy, and stakeholder engagement.",
    strengths: ["Policy writing", "Stakeholder engagement", "Organizing"],
  },
  researcher: {
    name: "The Researcher",
    tagline: "I want to understand AI before acting.",
    description:
      "Curiosity-driven and rigorous. You don't trust simple answers and you're comfortable sitting in uncertainty while you gather more evidence. Your contribution is asking the questions others skip.",
    strengths: ["Analysis", "Rigorous questioning", "Spotting assumptions"],
  },
  connector: {
    name: "The Connector",
    tagline: "I want to bring people together around AI.",
    description:
      "You see isolation as part of the problem. Your instinct is to introduce people, facilitate conversations, and create spaces where others can collaborate.",
    strengths: ["Facilitation", "Empathy", "Communication"],
  },
  skeptic: {
    name: "The Skeptic",
    tagline: "I doubt AI is net-good. Prove it to me.",
    description:
      "You're not convinced the benefits outweigh the risks. You're open to evidence but your default is doubt, and you think most people are too optimistic about what AI can or should do.",
    strengths: ["Critical analysis", "Risk assessment", "Challenging assumptions"],
  },
  purist: {
    name: "The Purist",
    tagline: "I value human creation above all.",
    description:
      "You believe there's something irreplaceable about human-made art, human learning, and human connection. AI feels like a threat to what makes us human, and you're actively working to preserve human-only spaces.",
    strengths: ["Cultural preservation", "Artistic integrity", "Human-centered values"],
  },
  moderator: {
    name: "The Moderator",
    tagline: "I fight AI misuse with AI tools.",
    description:
      "You're technically fluent and practically focused on cultural integrity. You use AI to combat bots, slop, and manipulation — not because you love AI, but because you know how it works and you're not willing to cede the internet to bad actors.",
    strengths: ["Counter-measures", "Platform literacy", "Authenticity enforcement"],
  },
};
