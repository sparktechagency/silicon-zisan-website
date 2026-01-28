// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "./utils/getToken";
// import { myFetch } from "./utils/myFetch";

// export async function proxy(request: NextRequest) {
//   const path = request.nextUrl.pathname;

//   const isPublicPath =
//     path === "/login" ||
//     path === "/signup" ||
//     path === "/forgot-password" ||
//     path === "/verify-otp" ||
//     path === "/authentication-verify" ||
//     path === "/new-password";

//   const token = await getToken();

//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL("/login", request.nextUrl));
//   }

//   // get user profile
//   const res = await myFetch("/users/profile");
//   const userRole = res?.data?.role;
//   if (!isPublicPath && userRole !== "Employer") {
//     request.cookies.delete("accessToken");
//     return NextResponse.redirect(new URL("/login", request.nextUrl));
//   }
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "./utils/getToken";
import { myFetch } from "./utils/myFetch";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = [
    "/login",
    "/signup",
    "/forgot-password",
    "/verify-otp",
    "/authentication-verify",
    "/new-password",
  ].includes(path);

  const token = await getToken();

  // 🔐 Not logged in → redirect to login with callback
  if (!isPublicPath && !token) {
    const loginUrl = new URL("/login", request.nextUrl);
    loginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(loginUrl);
  }

  // 👤 Logged in but wrong role
  if (token && !isPublicPath) {
    const res = await myFetch("/users/profile");
    const userRole = res?.data?.role;

    if (userRole !== "Employer") {
      request.cookies.delete("accessToken");
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
