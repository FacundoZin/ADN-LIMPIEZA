import type { Metadata } from "next"
import { getAllProducts, getAllCategories } from "@/lib/db/queries"
import { BarChart3, ExternalLink, Tag, Package, Info, Activity } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Analíticas — ADN Limpieza Admin",
}

export const revalidate = 0

export default async function AnaliticasAdminPage() {
    const [products, categories] = await Promise.all([
        getAllProducts(),
        getAllCategories(),
    ])

    // Agrupar productos por categoría
    const byCategory = categories.map((cat: any) => ({
        name: cat.name,
        count: products.filter((p: any) => p.categoryId === cat.id).length,
    })).sort((a: any, b: any) => b.count - a.count)

    const totalCount = products.length > 0 ? products.length : 1

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

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Analíticas</h1>
                <p className="text-sm mt-1" style={S.muted}>
                    Estadísticas del catálogo en Base de Datos Local
                </p>
            </div>

            {/* Resumen numérico */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                    { label: "Productos totales", value: products.length, color: "oklch(0.75 0.18 55)" },
                    { label: "Categorías", value: categories.length, color: "oklch(0.72 0.14 250)" },
                    {
                        label: "Sin categoría",
                        value: products.filter((p: any) => !p.categoryId).length,
                        color: "oklch(0.78 0.18 70)"
                    },
                ].map((stat) => (
                    <div key={stat.label} style={S.surface}>
                        <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>
                            {stat.value}
                        </div>
                        <div className="text-xs" style={S.muted}>{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Productos por categoría */}
            <div style={S.surface}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                    <BarChart3 style={{ width: 16, height: 16, color: "oklch(0.75 0.18 55)" }} />
                    <span className="text-sm font-semibold" style={{ color: "oklch(0.94 0.004 240 / 0.7)" }}>
                        Productos por categoría
                    </span>
                </div>

                {byCategory.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "32px 0", color: "oklch(0.94 0.004 240 / 0.3)" }}>
                        <Tag style={{ width: 40, height: 40, margin: "0 auto 12px", opacity: 0.3 }} />
                        <p className="text-sm">No hay categorías locales todavía</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {byCategory.map((cat) => (
                            <div key={cat.name}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                    <span className="text-sm" style={{ color: "oklch(0.94 0.004 240 / 0.8)" }}>
                                        {cat.name}
                                    </span>
                                    <span className="text-sm font-bold" style={{ color: "oklch(0.75 0.18 55)" }}>
                                        {cat.count} {cat.count === 1 ? "producto" : "productos"}
                                    </span>
                                </div>
                                <div style={{
                                    height: 8, borderRadius: 8,
                                    background: "oklch(0.19 0.012 255)",
                                    overflow: "hidden"
                                }}>
                                    <div style={{
                                        height: "100%",
                                        width: `${(cat.count / totalCount) * 100}%`,
                                        background: "linear-gradient(90deg, oklch(0.75 0.18 55), oklch(0.75 0.18 55 / 0.6))",
                                        borderRadius: 8,
                                        transition: "width 0.8s ease",
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Analytics externos */}
            <div style={S.surface}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <Info style={{ width: 16, height: 16, color: "oklch(0.72 0.14 250)" }} />
                    <span className="text-sm font-semibold" style={{ color: "oklch(0.94 0.004 240 / 0.7)" }}>
                        Analíticas de tráfico web
                    </span>
                </div>
                <p className="text-sm mb-4" style={S.muted}>
                    Para ver visitas, conversiones y métricas del sitio, conectá Google Analytics o Vercel Analytics:
                </p>
                <div className="flex flex-wrap gap-3">
                    <a
                        href="https://analytics.google.com"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            padding: "8px 14px", borderRadius: 10,
                            border: "1px solid oklch(0.26 0.012 255)",
                            color: "oklch(0.94 0.004 240 / 0.6)",
                            textDecoration: "none", fontSize: 13,
                            transition: "all 0.2s",
                        }}
                    >
                        <ExternalLink style={{ width: 13, height: 13 }} />
                        Google Analytics
                    </a>
                    <a
                        href="https://vercel.com/analytics"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            padding: "8px 14px", borderRadius: 10,
                            border: "1px solid oklch(0.26 0.012 255)",
                            color: "oklch(0.94 0.004 240 / 0.6)",
                            textDecoration: "none", fontSize: 13,
                        }}
                    >
                        <ExternalLink style={{ width: 13, height: 13 }} />
                        Vercel Analytics
                    </a>
                </div>
            </div>
        </div>
    )
}
