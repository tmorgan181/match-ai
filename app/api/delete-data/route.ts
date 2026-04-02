import { db } from "@/lib/db";
import { notifySignups, responses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
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
    return NextResponse.json({ error: "Enter a valid email" }, { status: 422 });
  }

  const { email } = parsed.data;

  const deletedResponses = db.delete(responses).where(eq(responses.email, email)).run();
  const deletedSignups = db.delete(notifySignups).where(eq(notifySignups.email, email)).run();

  const total = (deletedResponses.changes ?? 0) + (deletedSignups.changes ?? 0);

  return NextResponse.json({ deleted: total });
}
