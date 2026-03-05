import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifySessionToken } from "@/lib/admin-auth"

const ADMIN_LOGIN = "/admin/login"
const ADMIN_DASHBOARD = "/admin/dashboard"

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (!pathname.startsWith("/admin")) {
        return NextResponse.next()
    }

    if (pathname === ADMIN_LOGIN) {
        const token = request.cookies.get("admin-token")?.value
        if (token && verifySessionToken(token)) {
            return NextResponse.redirect(new URL(ADMIN_DASHBOARD, request.url))
        }
        return NextResponse.next()
    }

    const token = request.cookies.get("admin-token")?.value
    if (!token || !verifySessionToken(token)) {
        const loginUrl = new URL(ADMIN_LOGIN, request.url)
        loginUrl.searchParams.set("from", pathname)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)$).*)"],
}
