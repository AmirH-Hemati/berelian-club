import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  return NextResponse.next();
  //   const url = request.nextUrl.clone();
  //   const pathName = url.pathname;

  //   if (
  //     pathName.startsWith("/login") ||
  //     pathName.startsWith("/_next") ||
  //     pathName.startsWith("/favicon.ico")
  //   ) {
  //     return NextResponse.next();
  //   }

  //   const token = request.cookies.get("token")?.value;

  //   if (!token) {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }

  //   try {
  //     const { data } = await axios.get(
  //       "https://api.berelianbg.ir/api/v1/users/me",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         timeout: 5000,
  //       },
  //     );
  //     const allowedRoles = ["admin", "consultant", "reception"];

  //     if (allowedRoles.includes(data?.data?.role)) {
  //       return NextResponse.next();
  //     }

  //     return NextResponse.redirect(new URL("/login", request.url));
  //   } catch {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }
}
