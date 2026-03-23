import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicApiRoutes = [
  "/api/auth",
  "/api/notify",
  "/api/register",
  "/api/logout",
];

const authMiddleware = auth((req) => {
  const session = req.auth;
  const userRole = session?.user?.role;
  const path = req.nextUrl.pathname;

  if (
    path === "/" ||
    path.startsWith("/lawyers") ||
    path === "/login" ||
    path === "/register" ||
    path === "/for-lawyers" ||
    path.startsWith("/privacy") ||
    path.startsWith("/terms") ||
    path.startsWith("/disclaimer") ||
    path.startsWith("/waitlist")
  ) {
    if (session && (path === "/login" || path === "/register")) {
      if (userRole === "LAWYER") return NextResponse.redirect(new URL("/dashboard/lawyer", req.url));
      if (userRole === "CLIENT") return NextResponse.redirect(new URL("/dashboard/client", req.url));
    }
    return NextResponse.next();
  }

  if (path.startsWith("/dashboard")) {
    if (!session) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(loginUrl);
    }
    if (path.startsWith("/dashboard/lawyer") && userRole !== "LAWYER") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (path.startsWith("/dashboard/client") && userRole !== "CLIENT") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  if (path.startsWith("/platform")) {
    if (!session) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(loginUrl);
    }
    if (userRole !== "LAWYER") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  if (path.startsWith("/api/")) {
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
});

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (publicApiRoutes.some((route) => path.startsWith(route))) {
    return NextResponse.next();
  }
  // Main branch type cast fix — do not remove
  return (authMiddleware as (request: NextRequest) => Promise<Response>)(req);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/platform/:path*",
    "/login",
    "/register",
    "/api/:path*",
  ],
};
