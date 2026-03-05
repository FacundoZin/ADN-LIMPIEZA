"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Package,
    Users,
    BarChart3,
    ChevronLeft,
    ChevronRight,
    Bell,
    Search,
    Settings,
    LogOut,
    Menu,
    X,
    Sparkles,
    Shield,
} from "lucide-react"

// ─────────────────────────────────────────────────────────────────────────────
//  Navegación del Sidebar
// ─────────────────────────────────────────────────────────────────────────────

const navItems = [
    {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
        description: "Resumen general",
    },
    {
        label: "Productos",
        href: "/admin/productos",
        icon: Package,
        description: "Gestionar catálogo",
    },
    {
        label: "Usuarios",
        href: "/admin/usuarios",
        icon: Users,
        description: "Administrar accesos",
    },
    {
        label: "Analíticas",
        href: "/admin/analiticas",
        icon: BarChart3,
        description: "Métricas y reportes",
    },
]

// ─────────────────────────────────────────────────────────────────────────────
//  Logout Button — llama a /api/admin/logout
// ─────────────────────────────────────────────────────────────────────────────

function LogoutButton({ collapsed }: { collapsed?: boolean }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleLogout = async () => {
        setLoading(true)
        await fetch("/api/admin/logout", { method: "POST" })
        router.push("/admin/login")
        router.refresh()
    }

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            title="Cerrar sesión"
            className="flex items-center justify-center gap-2 p-2 rounded-lg text-white/30 hover:text-red-400/80 hover:bg-red-500/10 transition-all duration-200 disabled:opacity-50"
        >
            {loading ? (
                <span className="w-4 h-4 border-2 border-white/20 border-t-red-400 rounded-full animate-spin" />
            ) : (
                <LogOut className="w-4 h-4 shrink-0" />
            )}
            {!collapsed && <span className="text-xs">Salir</span>}
        </button>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
//  Admin Sidebar
// ─────────────────────────────────────────────────────────────────────────────

function AdminSidebar({
    collapsed,
    onToggle,
}: {
    collapsed: boolean
    onToggle: () => void
}) {
    const pathname = usePathname()

    return (
        <aside
            className={cn(
                "admin-sidebar group/sidebar",
                collapsed ? "w-[72px]" : "w-[240px]"
            )}
        >
            {/* Logo y branding */}
            <div className="admin-sidebar-logo">
                <Link
                    href="/admin/dashboard"
                    className="flex items-center gap-3 min-w-0"
                >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shrink-0 shadow-[0_0_16px_-4px_var(--admin-primary)]">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    {!collapsed && (
                        <div className="flex flex-col min-w-0 animate-fade-in">
                            <span className="text-sm font-bold text-white tracking-tight truncate">
                                ADN Panel
                            </span>
                            <span className="text-[10px] text-white/40 font-medium uppercase tracking-widest">
                                Administración
                            </span>
                        </div>
                    )}
                </Link>

                {/* Toggle colapso */}
                <button
                    onClick={onToggle}
                    aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
                    className="ml-auto p-1.5 rounded-lg text-white/30 hover:text-white/80 hover:bg-white/10 transition-all duration-200 shrink-0"
                >
                    {collapsed ? (
                        <ChevronRight className="w-4 h-4" />
                    ) : (
                        <ChevronLeft className="w-4 h-4" />
                    )}
                </button>
            </div>

            {/* Línea divisoria */}
            <div className="admin-sidebar-divider" />

            {/* Navegación principal */}
            <nav className="admin-sidebar-nav">
                {!collapsed && (
                    <span className="px-3 mb-3 text-[10px] font-semibold tracking-widest uppercase text-white/25 block">
                        Menú principal
                    </span>
                )}
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive =
                            pathname === item.href ||
                            (item.href !== "/admin/dashboard" &&
                                pathname.startsWith(item.href))

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "admin-nav-item group/item",
                                        isActive && "active"
                                    )}
                                    title={collapsed ? item.label : undefined}
                                >
                                    <Icon
                                        className={cn(
                                            "w-5 h-5 shrink-0 transition-all duration-200",
                                            isActive
                                                ? "text-primary"
                                                : "text-white/40 group-hover/item:text-white/80"
                                        )}
                                    />
                                    {!collapsed && (
                                        <div className="flex flex-col min-w-0 animate-fade-in">
                                            <span className="text-sm font-medium leading-tight">
                                                {item.label}
                                            </span>
                                            <span
                                                className={cn(
                                                    "text-[11px] leading-tight transition-colors",
                                                    isActive
                                                        ? "text-primary/70"
                                                        : "text-white/30 group-hover/item:text-white/50"
                                                )}
                                            >
                                                {item.description}
                                            </span>
                                        </div>
                                    )}
                                    {/* Indicador activo */}
                                    {isActive && (
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r-full" />
                                    )}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            {/* Footer del sidebar */}
            <div className="mt-auto">
                <div className="admin-sidebar-divider" />

                {/* User info */}
                {!collapsed && (
                    <div className="px-3 py-3 animate-fade-in">
                        <div className="admin-sidebar-user-card">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                <Shield className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs font-semibold text-white/80 truncate">
                                    Diego Attar
                                </span>
                                <span className="text-[10px] text-white/30 truncate">
                                    diegoattar@gmail.com
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Acciones */}
                <div
                    className={cn(
                        "px-3 pb-4 flex gap-2",
                        collapsed ? "flex-col items-center" : "items-center"
                    )}
                >
                    <Link
                        href="/admin/usuarios"
                        className="flex items-center justify-center gap-2 p-2 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/10 transition-all duration-200"
                        title="Configuración"
                    >
                        <Settings className="w-4 h-4 shrink-0" />
                        {!collapsed && <span className="text-xs">Configuración</span>}
                    </Link>
                    <LogoutButton collapsed={collapsed} />
                </div>
            </div>
        </aside>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
//  Admin Header
// ─────────────────────────────────────────────────────────────────────────────

function AdminHeader({ onMobileMenuOpen }: { onMobileMenuOpen: () => void }) {
    const pathname = usePathname()
    const currentPage = navItems.find((item) => pathname.startsWith(item.href))

    return (
        <header className="admin-header">
            {/* Mobile menu toggle */}
            <button
                onClick={onMobileMenuOpen}
                className="lg:hidden p-2 rounded-lg text-admin-text/50 hover:text-admin-text hover:bg-white/5 transition-all"
                aria-label="Abrir menú"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb */}
            <div className="hidden lg:flex items-center gap-2 text-sm">
                <span className="text-admin-text/30">Panel Admin</span>
                <span className="text-admin-text/20">/</span>
                <span className="text-admin-text/80 font-medium">
                    {currentPage?.label ?? "Dashboard"}
                </span>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Actions */}
            <div className="flex items-center gap-2">
                {/* Search */}
                <button
                    className="p-2 rounded-lg text-admin-text/40 hover:text-admin-text/80 hover:bg-white/5 transition-all"
                    aria-label="Buscar"
                >
                    <Search className="w-4 h-4" />
                </button>

                {/* Notificaciones */}
                <button
                    className="relative p-2 rounded-lg text-admin-text/40 hover:text-admin-text/80 hover:bg-white/5 transition-all"
                    aria-label="Notificaciones"
                >
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
                </button>

                {/* Divider */}
                <div className="w-px h-5 bg-white/10 mx-1" />

                {/* Avatar compacto */}
                <div className="flex items-center gap-2.5 pl-1 pr-3 py-1.5 rounded-full">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shrink-0">
                        <Shield className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="hidden sm:flex flex-col items-start">
                        <span className="text-xs font-semibold text-admin-text/80 leading-none">
                            Diego Attar
                        </span>
                        <span className="text-[10px] text-admin-text/30 leading-none mt-0.5">
                            Administrador
                        </span>
                    </div>
                </div>

                {/* Ir al sitio público */}
                <Link
                    href="/"
                    target="_blank"
                    className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-admin-text/50 hover:text-primary hover:bg-primary/10 border border-white/10 hover:border-primary/30 transition-all duration-200"
                >
                    <Sparkles className="w-3.5 h-3.5" />
                    Ver sitio
                </Link>
            </div>
        </header>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
//  Mobile Sidebar Overlay
// ─────────────────────────────────────────────────────────────────────────────

function MobileSidebar({
    open,
    onClose,
}: {
    open: boolean
    onClose: () => void
}) {
    const pathname = usePathname()

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300",
                    open
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-72 admin-sidebar lg:hidden transition-transform duration-300",
                    open ? "translate-x-0" : "-translate-x-full"
                )}
                style={{ display: "flex" }}
            >
                {/* Header del drawer */}
                <div className="admin-sidebar-logo">
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-3"
                        onClick={onClose}
                    >
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shrink-0">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white">ADN Panel</span>
                            <span className="text-[10px] text-white/40 uppercase tracking-widest">
                                Admin
                            </span>
                        </div>
                    </Link>
                    <button
                        onClick={onClose}
                        className="ml-auto p-1.5 rounded-lg text-white/30 hover:text-white/80 hover:bg-white/10 transition-all"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="admin-sidebar-divider" />

                {/* Nav items */}
                <nav className="admin-sidebar-nav flex-1">
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive =
                                pathname === item.href ||
                                (item.href !== "/admin/dashboard" &&
                                    pathname.startsWith(item.href))
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={onClose}
                                        className={cn(
                                            "admin-nav-item relative",
                                            isActive && "active"
                                        )}
                                    >
                                        <Icon
                                            className={cn(
                                                "w-5 h-5 shrink-0",
                                                isActive ? "text-primary" : "text-white/40"
                                            )}
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{item.label}</span>
                                            <span
                                                className={cn(
                                                    "text-[11px]",
                                                    isActive ? "text-primary/70" : "text-white/30"
                                                )}
                                            >
                                                {item.description}
                                            </span>
                                        </div>
                                        {isActive && (
                                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r-full" />
                                        )}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                {/* Footer móvil */}
                <div className="mt-auto p-4 border-t border-admin-border/50">
                    <LogoutButton />
                </div>
            </div>
        </>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
//  AdminLayout — Layout raíz del panel administrativo
// ─────────────────────────────────────────────────────────────────────────────

export default function AdminLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="admin-shell">
            {/* Sidebar — Desktop */}
            <div className="hidden lg:flex">
                <AdminSidebar
                    collapsed={sidebarCollapsed}
                    onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                />
            </div>

            {/* Sidebar — Mobile */}
            <MobileSidebar
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />

            {/* Área principal */}
            <div
                className="admin-main"
                style={{
                    marginLeft: sidebarCollapsed
                        ? "var(--admin-sidebar-w-collapsed)"
                        : "var(--admin-sidebar-w)",
                }}
            >
                <AdminHeader onMobileMenuOpen={() => setMobileMenuOpen(true)} />
                <main className="admin-content">{children}</main>
            </div>
        </div>
    )
}
