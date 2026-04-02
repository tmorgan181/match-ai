# match.ai Archetype Quiz Rework Plan

## Current Product Direction

The current priority is **not** collaborator matching.

We are intentionally focusing on the archetype quiz first because it is:

1. Anonymous if desired
2. Simpler to implement
3. More broadly applicable than a matching product

This means the near-term goal is to ship a strong, shareable, well-differentiated AI archetype quiz that can stand on its own, even before any matching features return.

## Executive Summary

**Current state**

- Functional survey with roughly 38 inputs, 8 archetypes, result pages, and admin dashboard
- Core concept appears viable
- Main weakness: scoring does not reliably differentiate all archetypes, and the current model does not capture the full spectrum of AI positions

**Required changes**

- Consolidate and expand to 9 archetypes that better represent the AI discourse spectrum
- Add 15-20 new high-differentiation questions
- Reweight scoring to reduce overlap
- Add questions that better capture newcomers, strongly pro-AI positions, and strongly anti-AI positions

## What Seems Strong Already

### Keep

- Free-text warm-up questions
- Mixed survey formats: Likert, yes/no/sometimes, and multiple choice
- Current survey completion target in the 8-10 minute range
- Result page pattern
- Static debriefs that work without external AI dependencies
- Existing survey flow and admin dashboard foundation

### Archetypes That Already Separate Fairly Well

- Builder
- Guardian

These appear to be the clearest current archetypes and should remain foundational to the next version.

## Critical Issues Before Launch

### 1. The Archetype Set Needs To Change

Feedback on the current 8-archetype model:

- Skeptic and Purist overlap too heavily
- Researcher, Advocate, and Connector are underrepresented
- Moderator is too close to Builder
- Several meaningful AI stances are missing entirely

The recommendation is to move to a **9-archetype model**.

## Proposed 9 Archetypes

### Constructive

#### 1. Builder

**Tagline:** I want to modify, maintain, and design systems that provide practical benefit and ethical decisiveness.

**Description:** You're technically oriented and solution-focused. Whether you're building new AI systems, maintaining existing ones, or using AI tools to fight AI misuse, you see the path forward through better design and implementation.

**Strengths:** Technical skill · System design · Practical problem-solving

**Absorbs:** Current Builder + Moderator

#### 2. Guardian

**Tagline:** I want to protect individuals, communities, and the environment while advocating for positive change.

**Description:** Protective instinct meets practical concern. You focus on the humans and ecosystems affected by AI, especially vulnerable populations, and your first question is always "who could this hurt?" You combine care with action.

**Strengths:** Harm identification · Community care · Advocacy

**Absorbs:** Current Guardian + organizing aspects of Advocate

#### 3. Student

**Tagline:** I want to understand AI before taking action.

**Description:** You lead with questions and learning, not answers and action. Whether you're just starting to pay attention to AI or you've been studying it for years, your approach is the same: understand deeply first. You're comfortable with uncertainty and you don't trust simple explanations.

**Strengths:** Curiosity · Intellectual humility · Rigorous thinking

**Absorbs:** Current Researcher + observer/learner newcomer types

### Positive Outlook

#### 4. Optimist

**Tagline:** Things may be uncertain now, but long-term AI will be a net benefit to society.

**Description:** You see AI as fundamentally positive: a tool for human flourishing, creativity, and problem-solving. You're not naive about risks, but you think the pessimists are catastrophizing. You're frustrated by how much negativity surrounds AI development.

**Strengths:** Vision · Enthusiasm · Long-term thinking

**Status:** New archetype

#### 5. Pragmatist

**Tagline:** We need to keep up with AI development no matter what.

**Description:** You focus on competitive dynamics and practical necessity. Whether it's market forces, geopolitical competition, or technological inevitability, you believe slowing down isn't an option. The question isn't whether to build AI, but how to stay ahead.

**Strengths:** Strategic thinking · Urgency · Competitive awareness

**Absorbs:** Market-focused pragmatism + accelerationist urgency

### Negative Outlook

#### 6. Skeptic

**Tagline:** Tech is probably making things worse; I haven't seen much proof otherwise.

**Description:** You're not convinced the benefits outweigh the risks. The hype frustrates you, the promises seem overblown, and the evidence doesn't support the enthusiasm. You're open to being proven wrong, but so far you're not impressed.

**Strengths:** Critical thinking · Hype resistance · Evidence focus

**Absorbs:** Current Skeptic + cynic-style doubt about benefits and feasibility

#### 7. Purist

**Tagline:** We need to dump this technology before it outweighs humans.

**Description:** You believe there's something irreplaceable about human creation, human learning, and human connection. AI isn't just risky; it's fundamentally wrong. You're working to preserve human-only spaces before it's too late.

**Strengths:** Philosophical clarity · Cultural preservation · Principled resistance

**Absorbs:** Current Purist + stronger anti-AI principle-driven positions

#### 8. Antagonist

**Tagline:** This technology is net negative for society and I want it to go away.

**Description:** Based on what you've seen, job displacement, manipulation, surveillance, or concrete personal harm, you've concluded AI does more damage than good. This is not abstract philosophy. It is observed reality.

**Strengths:** Ground-level awareness · Direct observation · Action orientation

**Status:** New archetype

#### 9. Doomer

**Tagline:** This is an existential risk, or we're already past the breaking point.

**Description:** You're not mainly worried about chatbot addiction or job loss. You're worried about extinction-level or irreversible catastrophe. AGI timelines are short, alignment is unsolved, and most people do not grasp the scale of what is being built.

**Strengths:** Long-term thinking · Risk assessment · Systems awareness

**Status:** New archetype

## Question Gaps To Fix

Current feedback on the survey:

- It does not cleanly separate overlapping archetypes
- It underrepresents newcomers
- It lacks strong signals for pro-AI optimism and acceleration
- It does not distinguish between different forms of anti-AI sentiment

## Proposed New Question Areas

The following question clusters were recommended.

### Student Differentiation

- "I'm actively trying to learn more about AI right now."
- "I prefer to study a problem deeply before taking action on it."
- "I'm comfortable saying 'I don't know yet' when others want clear answers."
- "How long have you been paying attention to AI?"

### Optimist Differentiation

- "I'm genuinely excited about AI's potential."
- "I'm frustrated by how much negativity surrounds AI."
- "AI critics sound like people who opposed electricity or the printing press."

### Pragmatist Differentiation

- "The real harm is not building AI fast enough."
- "We can't afford to slow down, even if there are risks."
- "Regulation will hand advantage to less careful actors."

### Skeptic Differentiation

- "Most AI capabilities are overhyped and won't deliver on their promises."
- "I would support AI use if rigorous safety testing showed clear benefits."

### Purist Differentiation

- "There's something sacred about human creativity that AI can never replicate."
- "If I could push a button to uninvent AI, I would."

### Antagonist Differentiation

- "I have personally been harmed by AI, or someone I care about has."
- "AI is primarily a tool for corporate profit and control."
- "I've lost job opportunities or income due to AI."

### Doomer Differentiation

- "I believe AI poses an existential risk to humanity."
- "We're already past the point where we can safely control AI development."
- "Most people drastically underestimate how close we are to AGI."

### Builder Strengthening

- "I regularly use AI tools to solve practical problems."
- "When I see an AI problem, my first instinct is to build a solution."

### Cross-Cutting Forced Choice

- Add a "Which statement resonates most?" single-choice question to force separation across broad positions.

## Questions To Remove Or Reweight

### Remove

- Current consciousness question (`Q9`) because it tends to generate neutral responses and weak differentiation

### Lower Weight

- Current AI music legitimacy question (`Q14`) because it mainly separates Purist and does little for the rest

### Simplify Or Revisit

- Multiple familiarity questions may be too numerous relative to their discriminating value
- Some yes/no questions may work better as Likert-scale questions

## Scoring Changes Required

### Scoring Priorities

**High-signal questions**

- Primary concern
- Sewell Setzer familiarity for Guardian
- "Push button to uninvent AI"
- Existential-risk questions
- Student-learning questions
- New archetype differentiation questions

**Medium-signal questions**

- Most current opinion scales
- Technical ability
- Domain familiarity

**Low-signal questions**

- Generic questions that add texture but do not strongly separate archetypes

### More Negative Scoring

Recommended examples:

- Regular AI use should subtract from Purist and Antagonist
- Strong "benefits outweigh risks" agreement should subtract from Skeptic, Antagonist, and Doomer
- "Not concerned" should strongly subtract from Guardian and Doomer

### Validation Requirement

Create 9 idealized response profiles, one for each archetype, and keep tuning weights until:

- Every profile lands in the intended archetype
- Each winner beats the runner-up by a healthy margin
- Clear profiles produce strong confidence scores

## Result Page Improvements

Recommended additions:

- Secondary tendency if the runner-up is close
- Confidence visible in admin, even if hidden from end users
- Educational resources tailored to each archetype
- Stronger Open Graph metadata for sharing

## Recommended Implementation Order

### Phase 0: Content First

- Write the new differentiation questions
- Rewrite the 9 archetype definitions
- Create 9 validation response sets
- Draft educational resources per archetype

### Phase 1: Archetype System Rebuild

- Replace current 8-archetype model with 9 archetypes
- Rewrite scoring weights
- Add negative scoring
- Add validation tests
- Tune until all 9 archetypes are clearly reachable

### Phase 2: Survey Rework

- Add the strongest new questions
- Remove low-value questions
- Reorder for better pacing
- Keep the survey approachable and not overly long

### Phase 3: Result Pages

- Update archetype descriptions
- Add secondary tendency
- Add educational resources
- Improve social-sharing metadata

### Phase 4: Admin Improvements

- Show confidence
- Show runner-up archetype and score margin
- Flag low-confidence results
- Surface free text more prominently

### Phase 5: Testing

- Run all 9 validation profiles
- Test with real beta users
- Verify all archetypes are reachable
- Check sharing previews

## Explicitly Out Of Scope For This Stage

Do not prioritize these until the archetype quiz is strong and validated:

- Matching system work
- Automated matching
- Email template tooling
- User accounts
- reCAPTCHA
- Multi-language support
- Ollama-powered personalized debriefs

## Summary

The core takeaway from this feedback is that the current quiz handles some engaged, constructive positions fairly well, especially Builder and Guardian, but it does not yet map the full AI conversation. The proposed 9-archetype model is meant to fix that by explicitly representing:

- Builders
- Protectors
- Learners
- Optimists
- Acceleration-minded pragmatists
- Skeptics
- Principle-driven rejectors
- People reacting to concrete present harm
- People focused on existential risk

If this direction holds up, the quiz becomes a standalone map of AI positions, not just a prelude to matching.
