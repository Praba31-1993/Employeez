import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/sidebar", "/dashboard", "/timesheet"];

export default function middleware(req: NextRequest) {
  const authCookie = req.cookies.get("auth");

  if (
    authCookie?.value !== "true" &&
    protectedRoutes.includes(req.nextUrl.pathname)
  ) {
    const absoluteUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }

  return NextResponse.next();
}
