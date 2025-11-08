import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get(".AuthBearer");

  const { pathname } = request.nextUrl;

  // Allowed pages without authentication
  const allowedPages = [
    "/component/accounts/login",
    "/component/accounts/register",
    "/component/accounts/forgotPassword",
    "/component/accounts/resetPassword",
  ];

  if (allowedPages.includes(pathname)) {
    return NextResponse.next();
  }

  // If no authToken, redirect to login page
  if (!authToken) {
    return NextResponse.redirect(
      new URL("/component/accounts/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/component/:path*"],
};
