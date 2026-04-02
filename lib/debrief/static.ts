import type { ArchetypeKey } from "@/lib/archetypes/definitions";

export const STATIC_DEBRIEFS: Record<ArchetypeKey, string> = {
  builder:
    "Your responses paint a picture of someone who is deeply embedded in the technical fabric of AI — you use it, you understand it, and your instinct is to improve it rather than step back from it. That's a rare and valuable starting point. The risk for Builders is sometimes moving faster than the humans around them can follow. Your best collaborators are people who can slow you down with the right question at the right moment — and who trust you enough to let you build once that question is answered.",

  guardian:
    "Your profile reflects someone for whom AI is not abstract — it touches something real, whether that's a person you care for, a harm you've witnessed, or a future you're not willing to accept passively. That kind of grounded urgency is exactly what AI ethics work tends to lack. The people building these systems need voices like yours in the room early, not as a corrective after the fact. Your best collaborators are people who share your care but bring complementary tools: a Builder who can translate concern into design, or a Researcher who can help you document what you already know.",

  advocate:
    "Your responses suggest someone who operates at the level of systems and institutions — you vote, you engage, and you understand that lasting change requires more than a good product. That's a perspective genuinely underrepresented in AI conversations, which tend to be dominated by technologists. The challenge for Advocates is that policy moves slowly while technology moves fast. Your best collaborators are people who can keep one foot in the technical present while you work on the longer arc — a Builder who can show you what's actually possible, or a Researcher who can give you the evidence base you need.",

  researcher:
    "Your answers suggest someone driven by the need to understand before acting — you're curious about hard questions, you care about truth, and you're familiar with the mechanisms that make these systems work. That disposition is the foundation of good analysis. The tension for Researchers is that understanding can become a reason to delay. Your best collaborators are people who can push toward action without abandoning rigor — a Guardian who reminds you what's at stake, or an Advocate who knows how to move the levers once you've mapped them.",

  connector:
    "Your responses point to someone who thinks about AI through the lens of human relationships — mental health, community, the texture of daily life. That's not a soft concern; it's arguably the most underdeveloped dimension of AI ethics work. Most AI conversations don't include people who think the way you do, and that gap shows in the products that get built. Your best collaborators are people who can take your relational intelligence and build it into something durable — a Builder who respects the human side, or an Advocate who can carry your perspective into policy rooms.",

  skeptic:
    "Your profile reflects someone who isn't willing to accept the standard pitch — that AI's benefits are obvious, that progress is inevitable, that the concerned are just afraid of change. That skepticism is a form of intellectual integrity, and it's in short supply in conversations about AI. The risk for Skeptics is that doubt without direction can become its own kind of paralysis. Your best collaborators are people who share your critical instincts but have found a specific lever to pull — a Guardian working on a concrete harm, or a Researcher building the evidence base you'd need to be persuaded.",

  purist:
    "Your responses reflect someone who believes something important is being lost — in art, in learning, in the way humans relate to one another — and who is willing to say so clearly. That's a harder position to hold than it sounds in a culture that defaults to enthusiasm about new technology. The challenge for Purists is that preservation without engagement can leave the field to people with different values. Your best collaborators are people who share your commitment to what's irreplaceable but are willing to work inside the systems you're skeptical of — a Moderator who fights from within, or an Advocate who can write the protections you want into law.",

  moderator:
    "Your profile reflects someone who understands the tools well enough not to be naive about them — you know how recommendation algorithms work, you've seen AI slop up close, and you're not willing to cede the internet to bad actors just because fighting back requires using similar tools. That's a practically important and underappreciated position. The risk for Moderators is burning out on defensive work without building toward something. Your best collaborators are people who can take what you've learned and point it at a longer-term goal — a Builder who can systemize what you do manually, or an Advocate who can turn your field experience into policy.",
};

export function getStaticDebrief(archetype: ArchetypeKey): string {
  return STATIC_DEBRIEFS[archetype];
}
