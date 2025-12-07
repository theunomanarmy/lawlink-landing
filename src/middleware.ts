import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public API routes that should bypass auth middleware entirely
const publicApiRoutes = [
  "/api/auth",
  "/api/notify",
  "/api/register",
  "/api/logout",
];

// Create the auth middleware
const authMiddleware = auth((req) => {
  const session = req.auth;
  const userRole = session?.user?.role;
  const path = req.nextUrl.pathname;

  // Public pages - allow access
  if (
    path === "/" ||
    path.startsWith("/lawyers") ||
    path === "/login" ||
    path === "/register" ||
    path.startsWith("/privacy") ||
    path.startsWith("/terms") ||
    path.startsWith("/disclaimer")
  ) {
    // Redirect logged-in users away from auth pages
    if (session && (path === "/login" || path === "/register")) {
      if (userRole === "LAWYER") {
        return NextResponse.redirect(new URL("/dashboard/lawyer", req.url));
      } else if (userRole === "CLIENT") {
        return NextResponse.redirect(new URL("/dashboard/client", req.url));
      }
    }
    return NextResponse.next();
  }

  // Protected routes require auth
  if (path.startsWith("/dashboard")) {
    if (!session) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(loginUrl);
    }

    // Role-based route protection
    if (path.startsWith("/dashboard/lawyer") && userRole !== "LAWYER") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (path.startsWith("/dashboard/client") && userRole !== "CLIENT") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Protected API routes
  if (path.startsWith("/api/")) {
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
});

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Bypass middleware entirely for public API routes (especially /api/auth)
  if (publicApiRoutes.some((route) => path.startsWith(route))) {
    return NextResponse.next();
  }

  // For all other routes, use the auth middleware
  return authMiddleware(req);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/api/:path*",
  ],
};

