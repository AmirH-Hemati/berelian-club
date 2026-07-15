import { NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  if (!token || !token.value) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*"],
};
