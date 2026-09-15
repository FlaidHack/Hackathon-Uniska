import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

// Next.js 16+ renamed the "middleware" file convention to "proxy".
// A file named middleware.ts is silently ignored on this Next version (no
// build error, no warning) — it MUST be named proxy.ts or this protection
// layer does nothing and every "Owner only" route becomes public.
// See: https://nextjs.org/docs/messages/middleware-to-proxy
export default withAuth(
  function proxy(req: NextRequest) {
    // @ts-expect-error - nextauth is injected by withAuth wrapper
    const token = req.nextauth?.token;
    const ownerOnlyPaths = ["/dashboard", "/simulator", "/settings"];

    if (
      ownerOnlyPaths.some((p) => req.nextUrl.pathname.startsWith(p)) &&
      token?.role !== "OWNER"
    ) {
      return NextResponse.redirect(new URL("/transactions", req.url));
    }

    return NextResponse.next();
  },
  { callbacks: { authorized: ({ token }) => !!token } }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/simulator/:path*",
    "/settings/:path*",
    "/transactions/:path*",
    "/products/:path*",
  ],
};
