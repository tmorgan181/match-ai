import type { ArchetypeKey } from "@/lib/archetypes/definitions";

export const STATIC_DEBRIEFS: Record<ArchetypeKey, string> = {
  antagonist:
    "Your responses suggest that AI is not just a debate topic for you. It is already showing up as harm in work, culture, trust, or everyday life. That present-day grounding matters. A lot of AI discourse jumps straight to abstraction, but you are paying attention to what is happening now. The challenge for Antagonists is that opposition can become totalizing. Your strongest contribution comes when you can point to concrete harms clearly enough that other people can no longer pretend not to see them.",

  builder:
    "Your responses paint a picture of someone who wants to move from opinion to implementation. You tend to see AI as something people build, shape, and fix, not just react to. That practical instinct is valuable because a lot of ethical conversation stalls out before it reaches design decisions. The challenge for Builders is that technical momentum can outrun human consequences. Your best work usually happens when you stay close to people who force the hard moral questions early.",

  doomer:
    "Your profile reflects someone who is looking far beyond surface-level AI debates. You are not mainly worried about convenience, hype, or short-term disruption. You are worried about whether humanity is building something it may not be able to govern. That seriousness can sound extreme in ordinary conversation, but it also keeps attention on stakes that are easy to minimize. The challenge for Doomers is avoiding a sense that every smaller intervention is pointless. Your strongest contribution is translating existential concern into pressure for concrete caution now.",

  guardian:
    "Your answers suggest that your first instinct is protection. You notice the people who could be manipulated, displaced, isolated, or overlooked when systems scale too quickly. That kind of moral attention is easy to claim and much harder to actually practice. The challenge for Guardians is that care can turn into exhaustion if you are always responding after harm appears. Your strongest contribution comes when you move concern upstream, into design, policy, and boundaries before damage becomes normal.",

  optimist:
    "Your profile reflects real confidence in AI's upside. You seem more interested in possibility than panic, and you are likely frustrated by how much of the public conversation defaults to fear. That optimism is not trivial. It can be a real counterweight to cynicism and paralysis. The challenge for Optimists is making room for criticism without treating it as mere negativity. Your strongest contribution comes when you can articulate why progress is worth pursuing while still taking harm seriously.",

  pragmatist:
    "Your responses suggest someone who sees AI through pressure, incentives, and competition. Whether the force is markets, geopolitics, or technological inevitability, your instinct is that the world will not pause for perfect moral clarity. That realism can be clarifying in a conversation that sometimes confuses ideals with strategy. The challenge for Pragmatists is that inevitability can become an excuse for almost anything. Your strongest contribution comes when you ask not only what is necessary, but what guardrails are still possible under pressure.",

  purist:
    "Your answers reflect a strong sense that some parts of human life should not be handed over so easily. Creativity, authorship, learning, and human-to-human presence seem to matter to you in ways that cannot be reduced to productivity. That stance can sound old-fashioned in highly technical spaces, but it often names losses others can feel without knowing how to describe them. The challenge for Purists is that principled resistance can harden into disengagement. Your strongest contribution comes when you defend human value with enough clarity that others have to reckon with it.",

  skeptic:
    "Your profile suggests someone who is not impressed by grand claims without strong evidence. You seem alert to hype, oversimplification, and the gap between what AI is promised to do and what it actually does. That skepticism is healthy. It protects against a culture that too often treats marketing language as proof. The challenge for Skeptics is that doubt can become its own default worldview. Your strongest contribution comes when you use your standards to sharpen the conversation, not just to dismiss it.",

  student:
    "Your responses point to someone who wants to understand before rushing to a conclusion. You seem comfortable with uncertainty, and that is rarer than it sounds in AI conversations. A lot of people want a side to join immediately. You seem more interested in learning what is true, what is exaggerated, and what still needs to be figured out. The challenge for Students is staying in observation mode too long while others set the agenda. Your strongest contribution comes when your curiosity turns into a clearer sense of where you want to stand.",
};

export function getStaticDebrief(archetype: ArchetypeKey): string {
  return STATIC_DEBRIEFS[archetype];
}
