import type { Metadata } from "next"
import {
    Package, BarChart3, TrendingUp, ArrowUpRight, Activity, Eye, Tag
} from "lucide-react"
import Link from "next/link"
import { getProductsWithCategories, getAllCategories } from "@/lib/db/queries"

export const metadata: Metadata = {
    title: "Dashboard — ADN Limpieza Admin",
}

export const revalidate = 0 // Sin caché — siempre datos frescos

export default async function DashboardPage() {
    const [products, categories] = await Promise.all([
        getProductsWithCategories(),
        getAllCategories(),
    ])

    const quickLinks = [
        { label: "Gestionar productos", href: "/admin/productos", icon: Package },
        { label: "Ver analíticas", href: "/admin/analiticas", icon: Tag },
        { label: "Sitio público", href: "/", icon: Eye },
    ]

    return (
        <div className="space-y-8 animate-fade-up">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold" style={{ color: "var(--admin-text)" }}>
                    Dashboard
                </h1>
                <p className="text-sm mt-1" style={{ color: "oklch(0.94 0.004 240 / 0.4)" }}>
                    Bienvenido al panel — ADN Limpieza (Base de Datos Local)
                </p>
            </div>

            {/* KPIs reales */}
            <section>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    <Link
                        href="/admin/productos"
                        className="admin-kpi-card group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div style={{ width: 44, height: 44, borderRadius: 14, background: "oklch(0.75 0.18 55 / 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Package style={{ width: 20, height: 20, color: "oklch(0.75 0.18 55)" }} />
                            </div>
                        </div>
                        <div className="admin-kpi-value">{products.length}</div>
                        <div className="admin-kpi-label">Productos en catálogo</div>
                    </Link>

                    <Link
                        href="/admin/analiticas"
                        className="admin-kpi-card group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div style={{ width: 44, height: 44, borderRadius: 14, background: "oklch(0.68 0.16 250 / 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Tag style={{ width: 20, height: 20, color: "oklch(0.72 0.14 250)" }} />
                            </div>
                        </div>
                        <div className="admin-kpi-value">{categories.length}</div>
                        <div className="admin-kpi-label">Categorías</div>
                    </Link>

                    <Link
                        href="/"
                        target="_blank"
                        className="admin-kpi-card group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div style={{ width: 44, height: 44, borderRadius: 14, background: "oklch(0.65 0.18 155 / 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Eye style={{ width: 20, height: 20, color: "oklch(0.65 0.18 155)" }} />
                            </div>
                        </div>
                        <div className="admin-kpi-value">↗</div>
                        <div className="admin-kpi-label">Ver sitio público</div>
                    </Link>
                </div>
            </section>

            {/* Grid */}
            <div className="grid lg:grid-cols-3 gap-6">

                {/* Últimos productos */}
                <div className="lg:col-span-2 admin-panel">
                    <div className="admin-panel-header">
                        <div className="flex items-center gap-2">
                            <Activity style={{ width: 16, height: 16, color: "oklch(0.75 0.18 55)" }} />
                            <span>Últimos productos en base de datos</span>
                        </div>
                        <Link
                            href="/admin/productos"
                            className="text-xs flex items-center gap-1"
                            style={{ color: "oklch(0.75 0.18 55 / 0.7)" }}
                        >
                            Ver todos <ArrowUpRight style={{ width: 12, height: 12 }} />
                        </Link>
                    </div>

                    {products.length === 0 ? (
                        <div className="py-12 text-center" style={{ color: "oklch(0.94 0.004 240 / 0.3)" }}>
                            <Package style={{ width: 40, height: 40, margin: "0 auto 12px", opacity: 0.3 }} />
                            <p className="text-sm">Todavía no agregaste productos propios</p>
                            <Link
                                href="/admin/productos"
                                className="text-xs mt-2 inline-block"
                                style={{ color: "oklch(0.75 0.18 55)" }}
                            >
                                Gestionar catálogo →
                            </Link>
                        </div>
                    ) : (
                        <div style={{ borderTop: "1px solid oklch(0.26 0.012 255 / 0.5)" }}>
                            {products.slice(0, 6).map((p: any) => (
                                <div
                                    key={p._id}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 12,
                                        padding: "12px 4px",
                                        borderBottom: "1px solid oklch(0.26 0.012 255 / 0.3)",
                                    }}
                                >
                                    <div style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 10,
                                        background: "oklch(0.19 0.012 255)",
                                        border: "1px solid oklch(0.26 0.012 255)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}>
                                        <Package style={{ width: 16, height: 16, color: "oklch(0.75 0.18 55 / 0.6)" }} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p className="text-sm font-medium truncate" style={{ color: "oklch(0.94 0.004 240 / 0.9)" }}>
                                            {p.name}
                                        </p>
                                        <p className="text-xs truncate" style={{ color: "oklch(0.94 0.004 240 / 0.35)" }}>
                                            {p.category?.name ?? "Sin categoría"} — {p.shortDescription ?? "Sin descripción"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Accesos rápidos */}
                <div className="admin-panel">
                    <div className="admin-panel-header">
                        <div className="flex items-center gap-2">
                            <TrendingUp style={{ width: 16, height: 16, color: "oklch(0.75 0.18 55)" }} />
                            <span>Accesos rápidos</span>
                        </div>
                    </div>
                    <div className="space-y-2 mt-1">
                        {quickLinks.map((link) => {
                            const Icon = link.icon
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl group hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
                                    style={{ color: "oklch(0.94 0.004 240 / 0.6)" }}
                                >
                                    <div className="group-hover:bg-orange-500/10 group-hover:text-orange-400 transition-colors" style={{
                                        width: 32, height: 32, borderRadius: 10,
                                        background: "oklch(0.19 0.012 255)",
                                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                                    }}>
                                        <Icon style={{ width: 16, height: 16 }} />
                                    </div>
                                    <span className="text-sm font-medium group-hover:text-white transition-colors">{link.label}</span>
                                    <ArrowUpRight className="ml-auto w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-orange-400 transition-all duration-300" />
                                </Link>
                            )
                        })}
                    </div>

                    {/* Estado BD */}
                    <div
                        className="mt-6 p-4 rounded-xl"
                        style={{
                            background: "oklch(0.65 0.18 155 / 0.1)",
                            border: "1px solid oklch(0.65 0.18 155 / 0.2)",
                        }}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <span className="relative flex" style={{ width: 8, height: 8 }}>
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full"
                                    style={{ background: "oklch(0.65 0.18 155)", opacity: 0.75 }} />
                                <span className="relative inline-flex rounded-full"
                                    style={{ width: 8, height: 8, background: "oklch(0.65 0.18 155)" }} />
                            </span>
                            <span className="text-xs font-semibold" style={{ color: "oklch(0.65 0.18 155)" }}>
                                Panel Local Activo
                            </span>
                        </div>
                        <p className="text-[11px]" style={{ color: "oklch(0.94 0.004 240 / 0.4)" }}>
                            SQLite DB funcionando · {products.length} productos registrados
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
