import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();
  const secret = process.env.ADMIN_SECRET;

  if (!secret || password !== secret) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_session", secret, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    // No maxAge = session cookie; expires when browser closes
  });
  return response;
}
