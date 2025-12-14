import { withAuth } from "next-auth/middleware";
import type { NextRequestWithAuth } from "next-auth/middleware";

export function middleware(req: NextRequestWithAuth) {
  return withAuth(req, {
    pages: {
      signIn: "/auth",
    },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|auth|journeys|.*\\.[^/]+$).*)",
  ],
};
