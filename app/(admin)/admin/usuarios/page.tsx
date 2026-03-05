import type { Metadata } from "next"
import { Shield, Key, ExternalLink, Settings } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Configuración — ADN Limpieza Admin",
}

export default function UsuariosAdminPage() {
    const S = {
        surface: {
            background: "oklch(0.16 0.013 255)",
            border: "1px solid oklch(0.26 0.012 255)",
            borderRadius: 16,
            padding: 20,
        },
        muted: { color: "oklch(0.94 0.004 240 / 0.4)" },
        text: { color: "oklch(0.94 0.004 240)" },
    }

    return (
        <div className="space-y-6 animate-fade-up" style={S.text}>
            <div>
                <h1 className="text-2xl font-bold">Usuarios y acceso</h1>
                <p className="text-sm mt-1" style={S.muted}>
                    Gestión del acceso al panel administrativo
                </p>
            </div>

            {/* Admin actual */}
            <div style={S.surface}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <Shield style={{ width: 16, height: 16, color: "oklch(0.75 0.18 55)" }} />
                    <span className="text-sm font-semibold" style={{ color: "oklch(0.94 0.004 240 / 0.7)" }}>
                        Administrador actual
                    </span>
                </div>
                <div style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 16px", borderRadius: 12,
                    background: "oklch(0.19 0.012 255)",
                    border: "1px solid oklch(0.26 0.012 255)",
                }}>
                    <div style={{
                        width: 44, height: 44, borderRadius: "50%",
                        background: "oklch(0.75 0.18 55 / 0.2)",
                        border: "2px solid oklch(0.75 0.18 55 / 0.4)",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                        <Shield style={{ width: 20, height: 20, color: "oklch(0.75 0.18 55)" }} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Diego Attar</p>
                        <p className="text-xs" style={S.muted}>diegoattar@gmail.com · Administrador</p>
                    </div>
                    <span style={{
                        marginLeft: "auto",
                        padding: "3px 10px", borderRadius: 9999,
                        background: "oklch(0.65 0.18 155 / 0.12)",
                        border: "1px solid oklch(0.65 0.18 155 / 0.3)",
                        color: "oklch(0.65 0.18 155)",
                        fontSize: 11, fontWeight: 700,
                    }}>
                        ACTIVO
                    </span>
                </div>
            </div>

            {/* PIN */}
            <div style={S.surface}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <Key style={{ width: 16, height: 16, color: "oklch(0.72 0.14 250)" }} />
                    <span className="text-sm font-semibold" style={{ color: "oklch(0.94 0.004 240 / 0.7)" }}>
                        PIN de acceso
                    </span>
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                    {["●", "●", "●", "●"].map((d, i) => (
                        <div key={i} style={{
                            width: 44, height: 44, borderRadius: 12,
                            background: "oklch(0.19 0.012 255)",
                            border: "1px solid oklch(0.26 0.012 255)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 20, color: "oklch(0.75 0.18 55)",
                        }}>{d}</div>
                    ))}
                </div>
                <p className="text-xs" style={S.muted}>
                    Para cambiar el PIN, editá el archivo <code style={{ color: "oklch(0.75 0.18 55)", fontFamily: "monospace" }}>lib/admin-auth.ts</code> y modificá la constante <code style={{ color: "oklch(0.75 0.18 55)", fontFamily: "monospace" }}>ADMIN_PIN</code>.
                </p>
            </div>

            {/* Base de Datos */}
            <div style={S.surface}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <Settings style={{ width: 16, height: 16, color: "oklch(0.78 0.18 70)" }} />
                    <span className="text-sm font-semibold" style={{ color: "oklch(0.94 0.004 240 / 0.7)" }}>
                        Base de Datos Local
                    </span>
                </div>
                <p className="text-sm mb-4" style={S.muted}>
                    El panel ahora utiliza una base de datos <strong>SQLite</strong> local a través de <strong>Prisma</strong>.
                    Esto te da control total y mayor velocidad.
                </p>
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "10px 18px", borderRadius: 12,
                    background: "oklch(0.65 0.18 155 / 0.15)",
                    border: "1px solid oklch(0.65 0.18 155 / 0.3)",
                    color: "oklch(0.65 0.18 155)",
                    fontSize: 13, fontWeight: 600,
                }}>
                    ✓ Sistema Autónomo Activo
                </div>
            </div>
        </div>
    )
}
