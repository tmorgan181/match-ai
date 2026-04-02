import { assignArchetype, scoreAnswers } from "@/lib/archetypes/scoring";
import { NextResponse } from "next/server";
import { z } from "zod";

const scale = z.number().int().min(1).max(5);
const yns = z.enum(["yes", "no", "sometimes"]);

const computeSchema = z.object({
  q1: z.string().optional(),
  q2: z.string().optional(),
  q3: scale.optional(), q4: scale.optional(), q5: scale.optional(),
  q6: scale.optional(), q7: scale.optional(), q8: scale.optional(),
  q9: scale.optional(), q10: scale.optional(), q11: scale.optional(),
  q12: scale.optional(), q13: scale.optional(), q14: scale.optional(),
  q15: scale.optional(), q16: scale.optional(), q17: scale.optional(),
  q18: scale.optional(), q19: scale.optional(),
  q20: yns.optional(), q21: yns.optional(), q22: yns.optional(),
  q23: yns.optional(), q24: yns.optional(), q25: yns.optional(),
  q26: yns.optional(), q27: yns.optional(), q28: yns.optional(),
  q29: yns.optional(), q30: yns.optional(), q31: yns.optional(),
  q32: yns.optional(),
  q33: z.enum(["week", "month", "year", "over_year", "never"]).optional(),
  q34: z.enum(["mental_health", "environment", "job_displacement", "misinformation",
               "privacy", "creativity_loss", "existential_risk", "not_concerned"]).optional(),
  q35: z.enum(["expert", "advanced", "intermediate", "basic", "elementary", "none"]).optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = computeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { q1, q2, ...answers } = parsed.data;
  void q1; void q2; // free text not used for scoring

  const scores = scoreAnswers(answers);
  const archetype = assignArchetype(scores);

  return NextResponse.json({ archetype });
}
