import { db } from "@/lib/db";
import { notifySignups, responses } from "@/lib/db/schema";
import { assignArchetype, computeConfidence, scoreAnswers } from "@/lib/archetypes/scoring";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { z } from "zod";

const scale = z.number().int().min(1).max(5);
const yns = z.enum(["yes", "no", "sometimes"]);

const submitSchema = z.object({
  // Free text — optional
  q1: z.string().optional(),
  q2: z.string().optional(),

  // Agree/disagree + familiarity (scale) — all optional (skippable)
  q3: scale.optional(), q4: scale.optional(), q5: scale.optional(),
  q6: scale.optional(), q7: scale.optional(), q8: scale.optional(),
  q9: scale.optional(), q10: scale.optional(), q11: scale.optional(),
  q12: scale.optional(), q13: scale.optional(), q14: scale.optional(),
  q15: scale.optional(), q16: scale.optional(),

  // Yes/No/Sometimes — all optional
  q17: yns.optional(), q18: yns.optional(), q19: yns.optional(),
  q20: yns.optional(), q21: yns.optional(), q22: yns.optional(),
  q23: yns.optional(),

  // Multiple choice — all optional
  q24: z.enum(["lt_6m", "6m_2y", "2y_5y", "gt_5y"]).optional(),
  q25: z.enum(["mental_health", "environment", "job_displacement", "misinformation",
               "privacy", "creativity_loss", "existential", "not_concerned"]).optional(),
  q26: z.enum(["government", "companies", "international", "open_source", "no_one"]).optional(),
  q27: z.enum(["builder", "guardian", "student", "optimist", "pragmatist", "skeptic",
               "purist", "antagonist", "doomer"]).optional(),
  q28: z.enum(["expert", "advanced", "intermediate", "basic", "very_little"]).optional(),

  // Contact & consent
  name: z.string().min(1).optional(),
  email: z.string().email("Valid email required").optional(),
  consentResearch: z.literal(true, { message: "You must agree to data storage to participate" }),
  consentMatching: z.boolean().optional(), // opt-in for V2 update notifications
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = submitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { name, email, consentResearch, consentMatching, q1, q2, ...answers } = parsed.data;

  const scores = scoreAnswers(answers);
  const archetype = assignArchetype(scores);
  const confidence = computeConfidence(scores, archetype);
  const id = nanoid();

  db.insert(responses).values({
    id,
    name: name ?? null,
    email: email ?? null,
    consentResearch,
    consentMatching: consentMatching ?? false,
    archetype,
    scoreData: JSON.stringify({ scores, confidence }),
    answers: JSON.stringify({ q1, q2, ...answers }),
  }).run();

  if (consentMatching && email) {
    db.insert(notifySignups).values({ id: nanoid(), email, consent: true }).run();
  }

  return NextResponse.json({ id, archetype, scores, confidence });
}
