import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_PANEL_URL = "https://admin.berelianbg.ir";
const API_URL = process.env.API_URL || "https://api.berelianbg.ir";

export async function middleware(request: NextRequest) {
  return NextResponse.next();
  // const token = request.cookies.get("token")?.value;

  // if (!token) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // try {
  //   const { data } = await axios.get(`${API_URL}/api/v1/users/me`, {
  //     headers: {
  //       Cookie: `token=${token}`,
  //     },
  //   });

  //   const user = data.data;

  //   if (!user) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  //   if (!user || user.role !== "investor") {
  //     return NextResponse.redirect(ADMIN_PANEL_URL);
  //   }

  //   return NextResponse.next();
  // } catch (error) {
  //   if (axios.isAxiosError(error) && error.response?.status === 401) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }

  //   console.error("Authentication middleware error:", error);

  //   return new NextResponse("خطا در برقراری ارتباط با سرور", {
  //     status: 503,
  //   });
  // }
}

export const config = {
  matcher: ["/account/:path*"],
};
