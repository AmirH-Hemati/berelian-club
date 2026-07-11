import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "./lib/axiosInstance";

export async function middleware(req: NextRequest) {
  // return NextResponse.next();
  // const url = req.nextUrl.clone();
  // const pathName = url.pathname;
  // if (
  //   pathName.startsWith("/login") ||
  //   pathName.startsWith("/_next") ||
  //   pathName.startsWith("/favicon.ico")
  // ) {
  //   return NextResponse.next();
  // }
  // const cookie = req.headers.get("cookie") || "";
  // const token = cookie
  //   .split(";")
  //   .find((c) => c.trim().startsWith("token="))
  //   ?.split("=")[1];
  // if (!token) {
  //   url.pathname = "/login";
  //   return NextResponse.redirect(url);
  // }
  // try {
  //   const { data } = await axiosInstance.get("/users/me", {
  //     headers: { authorization: `Bearer ${token}` },
  //   });
  //   console.log(data);
  //   if (data?.data?.role === "admin") {
  //     return NextResponse.next();
  //   } else {
  //     url.pathname = "/login";
  //     return NextResponse.redirect(url);
  //   }
  // } catch (error: any) {
  //   url.pathname = "/login";
  //   return NextResponse.redirect(url);
  // }
}
