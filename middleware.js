import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PASSWORD_RESET } from "./lib/utils";

export const middleware = async (req) => {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;
  const publicRoutes = [
    "/auth/create-account",
    "/auth/login",
    "/auth/recover-password",
    "/auth/set-password",
  ];

  if (pathname === "/login" || pathname === "/create-account") {
    return NextResponse.redirect(new URL(`/auth${pathname}`, req.url));
  }
  // checking for token and verifying
  if (pathname.startsWith("/auth/set-password")) {
    const tokenParams = req.nextUrl.searchParams.get("token");
    if (!tokenParams)
      return NextResponse.redirect(new URL("/auth/login", req.url));
    else {
      NextResponse.next();
    }
  }

  // prevent to visit public pages after login
  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // prevent to visit proctected pages without login
  if ((!token && !publicRoutes.includes(pathname)) || pathname === "/auth") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
