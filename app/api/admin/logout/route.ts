import { NextResponse } from "next/server"
import { cookies } from "next/headers"

/**
 * POST /api/admin/logout
 * Elimina las cookies de sesión del panel admin.
 */
export async function POST() {
    const cookieStore = await cookies()

    cookieStore.set("admin-token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,   // expira inmediatamente
        path: "/",
    })

    cookieStore.set("admin-role", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        path: "/",
    })

    return NextResponse.json({ ok: true })
}
