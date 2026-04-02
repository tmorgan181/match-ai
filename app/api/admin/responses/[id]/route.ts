import { db } from "@/lib/db";
import { responses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const patchSchema = z.object({
  matchNotes: z.string().optional(),
  matched: z.boolean().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const parsed = patchSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 422 });
  }

  const updates: Record<string, unknown> = {};

  if (parsed.data.matchNotes !== undefined) {
    updates.matchNotes = parsed.data.matchNotes;
  }

  if (parsed.data.matched !== undefined) {
    updates.matchedAt = parsed.data.matched
      ? new Date().toISOString()
      : null;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ ok: true });
  }

  await db.update(responses).set(updates).where(eq(responses.id, id));

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await db.delete(responses).where(eq(responses.id, id));
  return NextResponse.json({ ok: true });
}
