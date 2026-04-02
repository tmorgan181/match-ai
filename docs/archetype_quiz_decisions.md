# match.ai Archetype Quiz Decisions

## Purpose

This document converts the broader rework feedback into actual product decisions for the next archetype-quiz iteration.

It is intentionally opinionated. The goal is not to preserve every idea. The goal is to decide what we will build.

## Product Positioning

### Accepted

- The archetype quiz is the primary product for now
- Matching is deferred
- Anonymous participation remains a first-class mode
- The quiz should work as a standalone public-facing experience, not merely as intake for a future matching system
- The tone should stay humble: useful self-reflection tool, not a validated psychological instrument

### Rejected

- Framing the current version as formal research
- Framing the current version as a matching platform
- Promising personalized AI debriefs in V1

### Notes

The strongest honest framing is:

> An independent AI archetype quiz built to help people locate themselves in the AI conversation.

That is stronger and more credible than over-claiming "research."

## Archetype Model

### Accepted

- Move from 8 archetypes to 9
- Merge `Moderator` into `Builder`
- Replace `Researcher` with `Student`
- Remove `Connector` as a primary archetype
- Remove `Advocate` as a primary archetype
- Add `Optimist`
- Add `Pragmatist`
- Add `Antagonist`
- Add `Doomer`

### Why

- `Builder` and `Moderator` are too close in practice
- `Researcher` was too expert-coded; `Student` can cover both newcomers and rigorous learners
- `Connector` and `Advocate` are real orientations, but currently work better as secondary tendencies or score features than as dominant public-facing archetypes
- The old model underrepresented strongly pro-AI and strongly anti-AI positions

### Deferred

- Showing secondary tendencies to users
- Multi-axis results instead of a single winner

## Survey Length

### Accepted

- Target 25-30 total survey inputs, including free text and contact/consent
- Keep 2 free-text questions
- Keep mixed formats
- Prefer fewer, higher-signal questions over broad coverage

### Rejected

- Shipping a 40+ question V1
- Adding every interesting question now

### Notes

The survey should feel thoughtful, not exhaustive. Curiosity is good. fatigue is not.

## Question Strategy

### Accepted

- Add more questions that distinguish similar archetypes
- Add pro-AI questions, not just risk-focused ones
- Add anti-AI questions that distinguish skepticism, principled opposition, concrete harm, and existential concern
- Add a trust/governance question
- Add at least one forced-choice "resonates most" question
- Reduce overreliance on familiarity questions

### Rejected

- Heavy use of demographic proxy questions in V1
- Overly sensational relationship-to-AI questions in V1
- Off-topic worldview proxies that create noise or comment-thread derailment

### Specific Calls

#### Include in the near-term pool

- Actively learning about AI
- Prefer understanding before action
- Excited about AI's potential
- Can't afford to slow down
- AI is overhyped
- Would uninvent AI if possible
- Personally harmed by AI / concrete harm
- Existential-risk questions
- Institution-trust question
- Forced-choice directional question

#### Defer to V2

- AI girlfriend / boyfriend / partner questions
- Fallen in love with an AI
- Gun-rights proxy question
- Vehicle age
- Foreign travel
- Multiple languages
- Comfort being alone
- Plants conscious
- Does ChatGPT have good memory

#### Keep but lower priority

- Nature / spirituality / lifestyle texture questions
- Some current familiarity questions
- Some broad yes/no background questions

## Current Question Removals

### Remove

- `Q9` consciousness by 2100

### Lower weight substantially

- `Q14` AI music is legitimate art

### Reevaluate for necessity

- Large cluster of familiarity questions
- Some weak proxy/background questions that do not clearly move archetype separation

## Scoring Strategy

### Accepted

- Introduce stronger negative scoring
- Create explicit archetype validation profiles
- Tune scoring until all 9 archetypes are reachable with meaningful margins
- Track winner, runner-up, and confidence in admin

### Rejected

- Treating the first scoring pass as final
- Shipping without validation profiles

### Working Rules

- High-signal questions should be able to move an archetype by 3-5 points
- Medium-signal questions should mostly move by 2 points
- Low-signal questions should be 1-point texture only
- Negative scoring should be used sparingly but deliberately to create real distance

## Result Experience

### Accepted

- Keep the static debrief model for V1
- Update result copy to match the new archetypes
- Improve social sharing metadata
- Add educational resource links if lightweight enough

### Deferred

- AI-generated personalized debriefs
- Displaying confidence directly to users
- Displaying runner-up archetype directly to users

## Admin Experience

### Accepted

- Show confidence
- Show runner-up archetype
- Flag low-confidence assignments
- Surface free text more prominently

### Deferred

- Matching-specific admin workflows
- Email tooling

## Documentation and Messaging

### Accepted

- Update docs to reflect quiz-first direction
- Be explicit that archetypes are interpretive, not validated scientific categories
- Present the project as exploratory and independent

### Rejected

- Marketing the quiz like a formal diagnostic
- Overselling representativeness of response data

## Build Order

### Next decisions already made

1. Adopt the 9-archetype direction
2. Rewrite archetype definitions
3. Curate a revised 25-30 question set
4. Rebuild scoring and validation tests
5. Update result/admin surfaces

## Open Questions

- Whether `Guardian` should still absorb some policy/action energy, or whether a lighter `Advocate` secondary trait should remain visible in copy
- Whether V1 should ship with educational links or leave that for a fast follow
- Whether the strongest harm questions should use yes/no/sometimes or more nuanced choices

## Final Position

The quiz should become a better map of AI stances, not a longer quiz and not a more complicated app. If a proposed change does not improve archetype separation or public usefulness, it should probably wait.
