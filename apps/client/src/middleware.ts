import { NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest) {
  console.log("middlewares");
  const token = request.cookies.get("token");
  console.log("token", token);
  if (!token || !token.value) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*"],
};
