import { db } from "@/lib/db";
import { notifySignups, responses } from "@/lib/db/schema";
import { assignArchetype, computeConfidence, scoreAnswers } from "@/lib/archetypes/scoring";
import { eq } from "drizzle-orm";
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
  q15: scale.optional(), q16: scale.optional(), q29: scale.optional(),
  q30: scale.optional(), q31: scale.optional(), q32: scale.optional(),
  q33: scale.optional(), q34: scale.optional(), q35: scale.optional(),

  // Yes/No/Sometimes — all optional
  q17: yns.optional(), q18: yns.optional(), q19: yns.optional(),
  q20: yns.optional(), q21: yns.optional(), q22: yns.optional(),
  q23: yns.optional(),

  // Multiple choice — all optional
  q24: z.enum(["direct_harm", "research", "useful_tools", "human_values", "economic_harm", "catastrophic_risk", "policy_leverage"]).optional(),
  q25: z.enum(["mental_health", "environment", "job_displacement", "misinformation",
               "privacy", "creativity_loss", "existential", "not_concerned"]).optional(),
  q26: z.enum(["government", "companies", "international", "open_source", "no_one"]).optional(),
  q27: z.enum(["learn_more", "build_better", "set_guardrails", "push_back", "take_xrisk_seriously"]).optional(),
  q28: z.enum(["expert", "advanced", "intermediate", "basic", "very_little"]).optional(),

  // Contact & consent
  name: z.string().min(1).optional(),
  email: z.string().email("Valid email required").optional(),
  consentResearch: z.literal(true, { message: "You must agree to data storage to participate" }),
  consentMatching: z.boolean().optional(), // opt-in for V2 update notifications
  confirmOverwrite: z.boolean().optional(),
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

  const { name, email, consentResearch, consentMatching, confirmOverwrite, q1, q2, ...answers } = parsed.data;

  const scores = scoreAnswers(answers);
  const archetype = assignArchetype(scores);
  const confidence = computeConfidence(scores, archetype);
  const normalizedEmail = email?.trim().toLowerCase();

  const [existingResponse] = normalizedEmail
    ? await db
        .select({ id: responses.id })
        .from(responses)
        .where(eq(responses.email, normalizedEmail))
        .limit(1)
    : [];

  if (existingResponse && !confirmOverwrite) {
    return NextResponse.json(
      {
        error: "A saved response already exists for this email.",
        duplicate: true,
        message: "Submitting again will overwrite your existing saved response. If you prefer, you can delete your data instead of replacing it.",
      },
      { status: 409 }
    );
  }

  const id = existingResponse?.id ?? nanoid();
  const payload = {
    name: name ?? null,
    email: normalizedEmail ?? null,
    consentResearch,
    consentMatching: consentMatching ?? false,
    archetype,
    scoreData: JSON.stringify({ scores, confidence }),
    answers: JSON.stringify({ q1, q2, ...answers }),
  };

  if (existingResponse) {
    db.update(responses).set(payload).where(eq(responses.id, existingResponse.id)).run();
  } else {
    db.insert(responses).values({
      id,
      ...payload,
    }).run();
  }

  if (normalizedEmail) {
    db.delete(notifySignups).where(eq(notifySignups.email, normalizedEmail)).run();
    if (consentMatching) {
      db.insert(notifySignups).values({ id: nanoid(), email: normalizedEmail, consent: true }).run();
    }
  }

  return NextResponse.json({ id, archetype, scores, confidence });
}
