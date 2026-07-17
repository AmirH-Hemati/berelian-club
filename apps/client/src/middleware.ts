import { NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("token")?.value;
//  if (!token) {
//       console.log("🔴 No token, redirecting to /");
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/account/:path*"],
// };

export async function middleware() {
  return NextResponse.next();
}
