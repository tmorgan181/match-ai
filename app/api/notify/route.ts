import { db } from "@/lib/db";
import { notifySignups } from "@/lib/db/schema";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  consent: z.literal(true, { message: "Consent is required" }),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  db.insert(notifySignups).values({
    id: nanoid(),
    email: parsed.data.email,
    consent: true,
  }).run();

  return NextResponse.json({ ok: true });
}
