import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  // const pathname = request.nextUrl.pathname;

  // Handle root path
  // if (pathname === "/") {
  //   return NextResponse.redirect(new URL("/en", request.url));
  // }

  // const cookieStore = await cookies();
  // const accessToken = cookieStore.get("token")?.value;
  // if (!accessToken) {
  //   return NextResponse.redirect(new URL(`/verify`, request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
