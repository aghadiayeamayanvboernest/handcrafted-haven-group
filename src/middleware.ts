import { auth } from "@/auth";

/**
 * Protects seller routes: unauthenticated users hitting /sell are redirected
 * to the login page with a callback back to where they were headed.
 */
export default auth((req) => {
  if (!req.auth) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/sell/:path*"],
};
