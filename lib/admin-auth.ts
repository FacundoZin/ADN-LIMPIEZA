/**
 * lib/admin-auth.ts — Autenticación por PIN
 */

const ADMIN_PIN = "2550"
const SESSION_KEY = "adn-admin-2026"

export function verifyPin(pin: string): boolean {
    return pin === ADMIN_PIN
}

export function generateSessionToken(): string {
    return btoa(`admin:${SESSION_KEY}`)
}

export function verifySessionToken(token: string): boolean {
    try {
        return atob(token) === `admin:${SESSION_KEY}`
    } catch {
        return false
    }
}
