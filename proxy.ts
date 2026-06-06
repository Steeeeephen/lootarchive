import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies"; // lightweight, no db imports

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const protectedRoutes = ["/admin"];

    if (pathname === "/admin/login") return NextResponse.next();

    const isProtected = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    if (!isProtected) return NextResponse.next();

    // Reads the session cookie without touching the database or adapter
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};