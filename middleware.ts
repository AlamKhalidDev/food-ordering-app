import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let token = request.cookies.get("session_token")?.value;
  const session = await prisma.session.findUnique({
    where: {
      token: token,
    },
    include: {
      user: true,
    },
  });

  if(!session || !session.user || new Date(session.expires) < new Date()) {
    request.cookies.delete("session_token");
    token = "";
  }

  const isAuthRoute = pathname === "/login" || pathname === "/register";

  if (!token && !isAuthRoute && pathname !== "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && (isAuthRoute || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/dashboard",
    "/dashboard/:path*",
    "/orders",
    "/orders/:path*",
    "/cart",
    "/restaurants",
    "/restaurants/:path*",
    "/payment-methods",
  ],
  runtime: "nodejs",
};
