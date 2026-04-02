# match.ai Survey v2 Question Set Draft

## Goal

This draft is a revised question set designed to fit the actual product constraints:

- roughly 25-30 total inputs
- broad public usability
- stronger archetype separation
- lower dependence on niche familiarity

This is not every interesting question. It is a curated V1.5/V2-lite set that is realistic to ship.

## Recommended Survey Shape

- 2 free-text questions
- 10 agree/disagree questions
- 4 familiarity questions
- 7 yes/no/sometimes questions
- 5 multiple-choice questions
- 3 contact/consent inputs

That yields 28 substantive survey questions plus 3 contact/consent fields.

## Section 1: Free Text

### Q1

What is the first word that comes to mind when you hear "AI"?

### Q2

What do you most want to build, change, protect, or understand about AI?

## Section 2: Agree / Disagree (1-5)

These should do most of the archetype separation work.

### Q3

The benefits of AI outweigh the risks.

### Q4

I am actively trying to learn more about AI right now.

### Q5

I prefer to understand a problem deeply before taking action on it.

### Q6

I am genuinely excited about AI's potential.

### Q7

We cannot afford to slow down AI development, even if there are serious risks.

### Q8

Most AI capabilities are overhyped and will not deliver on their promises.

### Q9

There is something important about human creativity that AI can never replicate.

### Q10

I would push a button to uninvent AI if I could.

### Q11

AI is already causing serious harm in everyday life.

### Q12

I believe AI poses an existential risk to humanity.

## Section 3: Familiarity (1-5)

Keep this section shorter than the current survey.

### Q13

The suicide of Sewell Setzer III

### Q14

The EU AI Act

### Q15

AI alignment research

### Q16

The concept of "AI slop"

## Section 4: Yes / No / Sometimes

### Q17

Do you use AI tools regularly in your daily life?

### Q18

When I see an AI-related problem, is my first instinct to build or improve a system?

Recommended response options:

- Yes
- Sometimes
- No

### Q19

Have you or someone you care about been harmed by AI systems or AI-generated content?

### Q20

Have you lost opportunities, income, or creative confidence because of AI?

### Q21

Do you create art, music, writing, or other creative work?

### Q22

Have you used AI to generate art, images, writing, or music?

### Q23

Do you regularly read articles, essays, or research about AI?

## Section 5: Multiple Choice

### Q24

How long have you been seriously paying attention to AI?

Options:

- Less than 6 months
- 6 months to 2 years
- 2 to 5 years
- More than 5 years

### Q25

What is your primary concern about AI?

Options:

- Mental health and emotional harm
- Environmental and social costs
- Job displacement and labor impacts
- Misinformation and manipulation
- Privacy and surveillance
- Loss of human creativity
- Existential or catastrophic risk
- I am not especially concerned

### Q26

Who should be primarily responsible for governing AI?

Options:

- Governments
- Tech companies
- International bodies
- Open-source communities
- No one should control it

### Q27

Which statement resonates with you most?

Options:

- We need better tools and systems
- We need to protect people from harm
- We need to understand it better first
- We should embrace the opportunities
- We cannot afford to fall behind
- The promises are exaggerated
- We need to protect what makes us human
- We need to push this technology back
- We are underestimating an existential threat

### Q28

How much technical knowledge do you have about how AI works?

Options:

- Expert
- Advanced
- Intermediate
- Basic
- Very little

## Section 6: Contact And Consent

### Q29

Name

### Q30

Email

### Q31

Choose one:

- Save my responses for this beta project
- Compute my result anonymously and do not store my responses

Optional extra checkbox if email is provided:

- Notify me about future versions

## Archetype Coverage Notes

### Builder

Strong signals:

- Q3
- Q6
- Q17
- Q18
- Q22
- Q27 "better tools and systems"
- Q28 expert / advanced

### Guardian

Strong signals:

- Q9
- Q11
- Q13
- Q19
- Q25 mental health / environmental / privacy
- Q27 "protect people from harm"

### Student

Strong signals:

- Q4
- Q5
- Q23
- Q24 newer but engaged, or long-term learner
- Q27 "understand it better first"

### Optimist

Strong signals:

- Q3
- Q6
- low Q8
- low Q10
- low Q12
- Q27 "embrace the opportunities"

### Pragmatist

Strong signals:

- Q7
- Q17
- Q26 tech companies / no one should control it
- Q27 "cannot afford to fall behind"

### Skeptic

Strong signals:

- low Q3
- high Q8
- medium or low Q10
- low Q6
- Q27 "promises are exaggerated"

### Purist

Strong signals:

- high Q9
- high Q10
- high Q21
- low Q22
- Q25 loss of human creativity
- Q27 "protect what makes us human"

### Antagonist

Strong signals:

- high Q11
- high Q19
- high Q20
- high Q10
- Q25 labor / surveillance / manipulation
- Q27 "push this technology back"

### Doomer

Strong signals:

- high Q12
- high Q10
- Q15
- Q25 existential or catastrophic risk
- Q27 "underestimating an existential threat"

## Questions Explicitly Removed From The Current Survey

- AI consciousness by 2100
- Exercise regularly
- Religious or spiritual
- Spend a lot of time in nature
- Vote in municipal and state elections
- Political committee seat
- Legal/regulatory material handling
- Construction / engineering / computer science as a direct yes-no
- Last time you talked about your mental health

These are not bad questions, but they are either weak differentiators, too indirect, or better suited to a deeper optional mode later.

## Questions Explicitly Deferred To Future Versions

- AI companion / romantic relationship questions
- AI rights / protections
- Tradeoff scenario questions
- Job in 5 years because of AI
- Do builders share your values
- Foreign travel / languages / vehicle age

These may be excellent future additions, but they are not needed for the next public-facing revision.

## Implementation Notes

### Why this set is better than the current one

- It directly separates adjacent archetypes
- It gives pro-AI respondents more ways to identify themselves
- It gives anti-AI respondents more than one bucket
- It is more welcoming to newcomers
- It keeps some domain grounding without overloading on niche familiarity

### What to validate before shipping

- Every archetype must be reachable in synthetic test profiles
- No two archetypes should collapse under obvious idealized responses
- The public copy should still feel approachable, not ideological
- Completion time should stay reasonable

## Next Step After This Doc

Translate this question set into:

1. `lib/survey/questions.ts`
2. a new scoring config
3. 9 validation test fixtures
