# match.ai — Archetypes & Scoring

## Notes on Free Text Questions
Q1 (first word re: AI) and Q2 (what do you want to build/change) **cannot be auto-scored**.
They feed directly into the AI debrief prompt but play no role in archetype assignment.
All scoring is derived from Q3–Q20.

---

## The 5 Archetypes

### 1. The Builder
> "I want to create better AI systems."

Driven by technical skill and constructive ambition. Sees AI as a tool to improve.
**Strengths:** Prototyping, implementation, rapid iteration.
**Collaboration value:** Can build what others envision or diagnose.

---

### 2. The Guardian
> "I want to protect people from AI harm."

Driven by direct exposure to harm — personal, witnessed, or caregiving. Feels urgency around safety.
**Strengths:** Harm identification, user safety review, ethical grounding.
**Collaboration value:** Keeps the work tethered to real human consequences.

---

### 3. The Advocate
> "I want to change AI policy and regulation."

Driven by civic engagement and belief in systemic change through institutions.
**Strengths:** Policy writing, stakeholder engagement, organizing, legal reasoning.
**Collaboration value:** Can move work from product to law.

---

### 4. The Researcher
> "I want to understand AI before acting."

Driven by intellectual curiosity and commitment to truth. Asks the uncomfortable questions.
**Strengths:** Analysis, literature review, rigorous questioning, spotting assumptions.
**Collaboration value:** Prevents premature conclusions and groupthink.

---

### 5. The Connector
> "I want to bring people together around AI."

Driven by mental health awareness, community instinct, and the belief that relationships matter more than systems.
**Strengths:** Facilitation, empathy, communication, building trust.
**Collaboration value:** Ensures human relationships stay central to whatever gets built.

---

## Scoring Map

Free text Q1 and Q2 → **debrief only, not scored**.
Scale questions use raw answer value where relevant.
Yes/No/Sometimes questions: Yes = full weight, Sometimes = half weight (rounded down), No = 0.

| Q | Question | Builder | Guardian | Advocate | Researcher | Connector |
|---|---|---|---|---|---|---|
| 3 | Environmental concern (1–5 agree) | — | +1 if ≥4 | +1 if ≥4 | — | — |
| 4 | Exercise regularly (1–5 agree) | — | +1 if ≥4 | — | — | — |
| 5 | AI will be conscious by 2100 (1–5 agree) | +1 if ≥4 | +1 if ≤2 | — | +2 if ≥4 | — |
| 6 | Always want to know the truth (1–5 agree) | — | — | — | +2 if ≥4 | — |
| 7 | Religious or spiritual (1–5 agree) | — | — | — | — | +2 if ≥4 |
| 8 | Spend a lot of time in nature (1–5 agree) | — | +1 if ≥4 | — | — | +1 if ≥4 |
| 9 | Familiar: Sewell Setzer III (1–5) | — | +2 if ≥4 | +1 if ≥4 | +1 if ≥4 | — |
| 10 | Familiar: recommendation algorithms (1–5) | +1 if ≥4 | — | +1 if ≥4 | +1 if ≥4 | — |
| 11 | Use AI chatbots? (Y/N/S) | +2 | — | — | +1 | — |
| 12 | Vote regularly? (Y/N/S) | — | — | +1 | — | — |
| 13 | Experienced AI harm/psychosis? (Y/N/S) | — | +2 | — | — | +1 |
| 14 | Could write Fibonacci pseudocode? (Y/N/S) | +3 | — | — | +1 | — |
| 15 | Job involves writing emails? (Y/N/S) | — | — | +1 | — | +1 |
| 16 | Sits on political committee? (Y/N/S) | — | — | +3 | — | — |
| 17 | Handles legal/regulatory material? (Y/N/S) | — | — | +1 | +1 | — |
| 18 | CS/engineering/construction? (Y/N/S) | +2 | — | — | — | — |
| 19 | Children or guardians? (Y/N/S) | — | +1 | — | — | +1 |
| 20 | Last talked about mental health? | — | — | — | — | +3 past week / +2 past month / +1 past year |

### Maximum Possible Scores
| Archetype | Max |
|---|---|
| Builder | 9 |
| Guardian | 9 |
| Advocate | 9 |
| Researcher | 9 |
| Connector | 9 |

All archetypes have an equal ceiling of 9. Tie-breaking: alphabetical (silent).

---

## Questions Flagged for Review

- **Q4 (exercise regularly):** Weak signal. Only contributes +1 to Guardian. Consider dropping or swapping for a question with clearer archetype signal. Kept for now as a personality/groundedness texture question for the debrief.
- **Q15 (job involves writing emails):** Very broad — nearly everyone with an office job answers yes. Low discriminating power. Consider replacing with something more specific (e.g., "Do you write for an audience beyond your immediate team?").
- **Q5 (AI consciousness):** Disagreeing signals Guardian (skeptical, protective). Agreeing signals Researcher or Builder. This is intentional but worth watching — may cluster users oddly.

---

## Debrief Prompt Inputs

The AI debrief receives:
1. The user's archetype name + description
2. Their Q1 answer (first word re: AI)
3. Their Q2 answer (what they want to build/change)
4. Their top 3 highest-scoring questions (signals the model which themes were strongest)
5. Whether they answered Yes to Q13 (experienced harm) — flagged for sensitive framing

**Sensitive framing rule:** If Q13 = Yes or Sometimes, the debrief prompt must instruct the model to acknowledge this without dwelling on it, and to avoid any clinical or therapeutic language.
