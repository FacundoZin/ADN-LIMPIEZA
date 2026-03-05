import { NextResponse } from "next/server"
import { verifyPin, generateSessionToken } from "@/lib/admin-auth"

export async function POST(request: Request) {
    const formData = await request.formData()
    const pin = formData.get("pin")?.toString().trim() ?? ""
    const from = formData.get("from")?.toString() ?? "/admin/dashboard"

    if (!verifyPin(pin)) {
        const url = new URL("/admin/login", request.url)
        url.searchParams.set("error", "1")
        if (from !== "/admin/dashboard") url.searchParams.set("from", from)
        return NextResponse.redirect(url, 303)
    }

    const token = generateSessionToken()
    const dest = new URL(request.url)
    dest.pathname = from.startsWith("/admin") && from !== "/admin/login"
        ? from
        : "/admin/dashboard"
    dest.search = ""

    const response = NextResponse.redirect(dest, 303)
    response.cookies.set("admin-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    })
    return response
}
