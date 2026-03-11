"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { generateSessionToken } from "@/lib/admin-auth"

export type LoginFormState = {
    error?: string
}

// ── Credenciales del panel administrador ──────────────────────────────────────
const ADMIN_EMAIL = "diegoattar@gmail.com"
const ADMIN_PASSWORD = "Familiaattar"

/**
 * Server Action — Login del panel administrativo.
 * Verifica email y contraseña y establece cookie de sesión.
 */
export async function loginAction(
    prevState: LoginFormState,
    formData: FormData
): Promise<LoginFormState> {
    const email = formData.get("email")?.toString().trim() ?? ""
    const password = formData.get("password")?.toString() ?? ""
    const redirectTo = formData.get("redirectTo")?.toString() ?? "/admin/dashboard"

    if (!email || !password) {
        return { error: "Completá todos los campos" }
    }

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        await new Promise((r) => setTimeout(r, 400))
        return { error: "Email o contraseña incorrectos" }
    }

    // Credenciales correctas — crear sesión
    const token = generateSessionToken()
    const store = cookies()

    store.set("admin-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 días
        path: "/",
    })

    redirect(redirectTo)
}
