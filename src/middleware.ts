import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get(".AuthBearer");

  const { pathname } = request.nextUrl;

  // Allowed pages without authentication
  const allowedPages = [
    "/Component/Accounts/Login",
    "/Component/Accounts/Register",
    "/Component/Accounts/ForgotPassword",
    "/Component/Accounts/ResetPassword",
  ];

  if (allowedPages.includes(pathname)) {
    return NextResponse.next();
  }

  // If no authToken, redirect to login page
  if (!authToken) {
    return NextResponse.redirect(
      new URL("/Component/Accounts/Login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Component/:path*"],
};
