import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/sidebar", "/dashboard", "/timesheet"];

export default function middleware(req: NextRequest) {
  // Get the 'auth' cookie from the request headers
  const authCookie = req.cookies.get("auth");
  console.log('adfsd',authCookie);
  

  // If the 'auth' cookie is not present and the user is trying to access a protected route
  if ((authCookie?.value==='false' || authCookie?.value===undefined) && protectedRoutes.includes(req.nextUrl.pathname)) {
    // Redirect user to the login page
    const absoluteUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }

  return NextResponse.next();
}
