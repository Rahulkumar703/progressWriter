import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;
  const publicRoutes = [
    "/auth/create-account",
    "/auth/login",
    "/auth/recover-password",
    "/auth/set-password",
  ];

  // redirecting to correct auth urls
  if (
    pathname === "/login" ||
    pathname === "/create-account" ||
    pathname === "/recover-password" ||
    pathname === "/set-password" ||
    pathname === "/logout"
  ) {
    return NextResponse.redirect(new URL(`/auth${pathname}`, req.url));
  }

  // checking for token in set-password route
  if (pathname.startsWith("/auth/set-password")) {
    const tokenParams = req.nextUrl.searchParams.get("token");
    if (!tokenParams)
      return NextResponse.redirect(new URL("/auth/login", req.url));
    else {
      NextResponse.next();
    }
  }

  // prevent to visit public pages after login
  if ((token && publicRoutes.includes(pathname)) || pathname === "/project") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // prevent to visit proctected pages without login
  if ((!token && !publicRoutes.includes(pathname)) || pathname === "/auth") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Setting Headers
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-url", req.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
