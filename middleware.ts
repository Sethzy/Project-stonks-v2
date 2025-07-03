import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase-middleware";

// Define public routes that should be accessible without authentication.
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/signup",
  "/verify-email",
  "/reset-password",
  "/update-password",
];

/**
 * Middleware to handle route protection and session management.
 *
 * @param {NextRequest} request The incoming request.
 * @returns {Promise<NextResponse>} The response to send.
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // 1. If user is not authenticated and is trying to access a private route,
  //    redirect them to the login page with a redirect URL.
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // 2. If user is authenticated and is trying to access a public route (e.g., login),
  //    redirect them to the main dashboard.
  if (user && isPublicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/library";
    redirectUrl.search = ""; // Clear any query params like ?redirect=
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

// Configure the middleware to run on all paths except for static assets
// and API routes, to avoid interfering with their functionality.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/ (API routes)
     * Feel free to modify this pattern to fit your needs.
     */
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
}; 