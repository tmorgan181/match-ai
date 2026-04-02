import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let the login page and auth API through
  if (pathname === "/admin/login" || pathname === "/api/admin/auth") {
    return NextResponse.next();
  }

  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    // No secret configured — block access entirely
    return new NextResponse("Admin not configured", { status: 503 });
  }

  const cookie = request.cookies.get("admin_session")?.value;
  if (cookie !== secret) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
