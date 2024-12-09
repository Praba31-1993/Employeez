import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/sidebar", "/dashboard", "/timesheet"];

export default function middleware(req: NextRequest) {
  // Get the 'auth' cookie from the request headers
  const authCookie = req.cookies.get("auth");
  

  // If the 'auth' cookie is not present and the user is trying to access a protected route
  if (authCookie?.value !== "true" && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  

  return NextResponse.next();
}
