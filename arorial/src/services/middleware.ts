import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/profile"];

const unprotectedRoutes = ["/", "/login", "/signout"];

export default async function middleware(request: NextRequest) {
    const session = await auth();

    const isProtectedRoute = protectedRoutes.some((prefix) =>
        request.nextUrl.pathname.startsWith(prefix)
    );

    if (!session && isProtectedRoute) {
        const absoluteURL = new URL("/", request.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }

    if (session && unprotectedRoutes.includes(request.nextUrl.pathname)) {
        const absoluteURL = new URL("/dashboard", request.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }
}
