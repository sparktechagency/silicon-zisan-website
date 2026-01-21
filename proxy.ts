import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "./utils/getToken";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/forgot-password" ||
    path === "/verify-otp" ||
    path === "/authentication-verify";

  const token = await getToken();

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
