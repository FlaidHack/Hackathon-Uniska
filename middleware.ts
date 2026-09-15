import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
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
