import { db } from "@/lib/db";
import { notifySignups } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await db.delete(notifySignups).where(eq(notifySignups.id, id));
  return NextResponse.json({ ok: true });
}
