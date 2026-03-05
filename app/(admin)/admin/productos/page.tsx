"use client"

import { useEffect, useState, useCallback } from "react"
import { Package, Plus, Search, Trash2, Edit2, RefreshCw, Tag, X, Save, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Category {
    _id: string
    name: string
}

interface Product {
    _id: string
    name: string
    shortDescription?: string
    longDescription?: string
    categoryId?: string
    category?: { _id: string; name: string }
    imageUrl?: string
}

export default function ProductosAdminPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [deleting, setDeleting] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isCatModalOpen, setIsCatModalOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [newCatName, setNewCatName] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        shortDescription: "",
        longDescription: "",
        categoryId: "",
        imageUrl: ""
    })
    const [isSaving, setIsSaving] = useState(false)
    const [isUploading, setIsUploading] = useState(false)

    const fetchData = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const [prodRes, catRes] = await Promise.all([
                fetch("/api/admin/productos"),
                fetch("/api/admin/productos/categorias")
            ])

            if (!prodRes.ok) throw new Error("Error al obtener productos")
            const prods = await prodRes.json()
            setProducts(prods)

            if (catRes.ok) {
                const cats = await catRes.json()
                setCategories(cats)
            }
        } catch (e: any) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        const uploadFormData = new FormData()
        uploadFormData.append("file", file)

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: uploadFormData
            })
            if (!res.ok) throw new Error("Error al subir archivo")
            const data = await res.json()
            setFormData(prev => ({ ...prev, imageUrl: data.url }))
        } catch (e: any) {
            alert("Error al subir imagen: " + e.message)
        } finally {
            setIsUploading(false)
        }
    }

    const handleCreateCategory = async () => {
        if (!newCatName.trim()) return
        try {
            const res = await fetch("/api/admin/productos/categorias", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newCatName })
            })
            if (!res.ok) throw new Error("Error al crear categoría")
            setNewCatName("")
            fetchData() // Refresh
        } catch (e: any) {
            alert(e.message)
        }
    }

    const handleDeleteCategory = async (id: string, name: string) => {
        if (!confirm(`¿Eliminar la categoría "${name}"? solo si no tiene productos.`)) return
        try {
            const res = await fetch(`/api/admin/productos/categorias?id=${id}`, { method: "DELETE" })
            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || "No se pudo eliminar")
            }
            fetchData()
        } catch (e: any) {
            alert(e.message)
        }
    }

    const openModal = (product: Product | null = null) => {
        if (product) {
            setEditingProduct(product)
            setFormData({
                name: product.name,
                shortDescription: product.shortDescription || "",
                longDescription: product.longDescription || "",
                categoryId: product.category?._id || product.categoryId || "",
                imageUrl: product.imageUrl || ""
            })
        } else {
            setEditingProduct(null)
            setFormData({
                name: "",
                shortDescription: "",
                longDescription: "",
                categoryId: categories[0]?._id || "",
                imageUrl: ""
            })
        }
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingProduct(null)
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        setError(null)

        try {
            const url = editingProduct
                ? `/api/admin/productos/${editingProduct._id}`
                : "/api/admin/productos"

            const method = editingProduct ? "PATCH" : "POST"

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if (!res.ok) throw new Error("Error al guardar el producto")

            await fetchData() // Refresh list
            closeModal()
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsSaving(false)
        }
    }

    async function handleDelete(id: string, name: string) {
        if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return
        setDeleting(id)
        try {
            const res = await fetch(`/api/admin/productos/${id}`, { method: "DELETE" })
            if (!res.ok) throw new Error("No se pudo eliminar")
            setProducts((prev) => prev.filter((p) => p._id !== id))
        } catch (e: any) {
            alert("Error: " + e.message)
        } finally {
            setDeleting(null)
        }
    }

    const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.category?.name ?? "").toLowerCase().includes(search.toLowerCase())
    )

    // ─── Estilos inline para el dark theme ───────────────────────────────────────
    const S = {
        page: { color: "var(--admin-text)" },
        surface: { background: "oklch(0.16 0.013 255)", border: "1px solid oklch(0.26 0.012 255)", borderRadius: 16 },
        muted: { color: "oklch(0.94 0.004 240 / 0.4)" },
        icon: { background: "oklch(0.19 0.012 255)", border: "1px solid oklch(0.26 0.012 255)", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
        input: {
            width: "100%", padding: "10px 12px", background: "oklch(0.19 0.012 255)",
            border: "1px solid oklch(0.26 0.012 255)", borderRadius: 10, color: "white", outline: "none"
        },
        dropzone: {
            border: "2px dashed oklch(0.26 0.012 255)",
            borderRadius: 16,
            padding: 32,
            textAlign: "center" as const,
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            background: "oklch(0.19 0.012 255 / 0.5)",
            position: "relative" as const,
            overflow: "hidden" as const,
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "center",
            justifyContent: "center",
            minHeight: 180,
            gap: 12
        },
        previewContainer: {
            width: "100%",
            height: "100%",
            position: "absolute" as const,
            top: 0,
            left: 0,
            background: "oklch(0.16 0.013 255)"
        }
    } as const

    return (
        <div className="space-y-6 animate-fade-up" style={S.page}>

            {/* Header */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-2xl font-bold">Productos</h1>
                    <p className="text-sm mt-1" style={S.muted}>
                        {loading ? "Cargando…" : `${products.length} productos en catálogo local`}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={fetchData}
                        title="Actualizar"
                        style={{
                            padding: "8px 12px", borderRadius: 10,
                            border: "1px solid oklch(0.26 0.012 255)",
                            background: "transparent", cursor: "pointer", color: "oklch(0.94 0.004 240 / 0.5)",
                            display: "flex", alignItems: "center", gap: 6, fontSize: 13,
                        }}
                    >
                        <RefreshCw style={{ width: 14, height: 14 }} />
                        Actualizar
                    </button>
                    <button
                        title="Gestionar Categorías"
                        onClick={() => setIsCatModalOpen(true)}
                        style={{
                            padding: "8px 12px", borderRadius: 10,
                            border: "1px solid oklch(0.26 0.012 255)",
                            background: "transparent", cursor: "pointer", color: "oklch(0.94 0.004 240 / 0.5)",
                            display: "flex", alignItems: "center", gap: 6, fontSize: 13,
                        }}
                    >
                        <Tag style={{ width: 14, height: 14 }} />
                        Categorías
                    </button>
                    <button
                        className="admin-btn-primary"
                        onClick={() => openModal()}
                    >
                        <Plus style={{ width: 16, height: 16 }} />
                        Agregar Producto
                    </button>
                </div>
            </div>

            {/* Buscador */}
            <div style={{ ...S.surface, padding: 16 }}>
                <div style={{ position: "relative" }}>
                    <Search style={{
                        position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                        width: 16, height: 16, color: "oklch(0.94 0.004 240 / 0.3)",
                    }} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o categoría..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: "100%", height: 40, paddingLeft: 40, paddingRight: 16,
                            background: "oklch(0.19 0.012 255)", border: "1px solid oklch(0.26 0.012 255)",
                            borderRadius: 10, color: "oklch(0.94 0.004 240)", fontSize: 14, outline: "none",
                            boxSizing: "border-box",
                        }}
                    />
                </div>
            </div>

            {/* Error */}
            {error && (
                <div style={{
                    padding: 16, borderRadius: 12,
                    background: "oklch(0.55 0.22 25 / 0.1)", border: "1px solid oklch(0.55 0.22 25 / 0.3)",
                    color: "oklch(0.7 0.22 25)", fontSize: 14,
                }}>
                    ⚠ {error}
                </div>
            )}

            {/* Tabla / Lista */}
            <div style={{ ...S.surface, overflow: "hidden" }}>
                {loading ? (
                    <div style={{ padding: 64, textAlign: "center", color: "oklch(0.94 0.004 240 / 0.3)" }}>
                        <div style={{
                            width: 32, height: 32, borderRadius: "50%",
                            border: "3px solid oklch(0.26 0.012 255)",
                            borderTopColor: "oklch(0.75 0.18 55)",
                            animation: "spin 0.7s linear infinite", margin: "0 auto 12px",
                        }} />
                        Cargando productos…
                    </div>
                ) : filtered.length === 0 ? (
                    <div style={{ padding: 64, textAlign: "center", color: "oklch(0.94 0.004 240 / 0.3)" }}>
                        <Package style={{ width: 48, height: 48, margin: "0 auto 12px", opacity: 0.25 }} />
                        <p className="text-sm mb-3">
                            {search ? `Sin resultados para "${search}"` : "No hay productos registrados"}
                        </p>
                    </div>
                ) : (
                    <>
                        <div style={{
                            display: "grid", gridTemplateColumns: "1fr 160px 200px 100px",
                            padding: "10px 20px",
                            borderBottom: "1px solid oklch(0.26 0.012 255)",
                        }}>
                            {["Producto", "Categoría", "Descripción", ""].map((h) => (
                                <span key={h} style={{
                                    fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                                    letterSpacing: "0.08em", color: "oklch(0.94 0.004 240 / 0.3)",
                                }}>
                                    {h}
                                </span>
                            ))}
                        </div>

                        {filtered.map((p) => (
                            <div
                                key={p._id}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 160px 200px 100px",
                                    padding: "14px 20px",
                                    borderBottom: "1px solid oklch(0.26 0.012 255 / 0.5)",
                                    alignItems: "center",
                                    transition: "background 0.15s",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                                    <div style={S.icon}>
                                        {p.imageUrl ? (
                                            <div style={{ position: "relative", width: 20, height: 20 }}>
                                                <Image src={p.imageUrl} alt={p.name} fill className="object-contain" />
                                            </div>
                                        ) : (
                                            <Package style={{ width: 16, height: 16, color: "oklch(0.75 0.18 55 / 0.6)" }} />
                                        )}
                                    </div>
                                    <span style={{
                                        fontSize: 14, fontWeight: 500, color: "oklch(0.94 0.004 240 / 0.9)",
                                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                    }}>
                                        {p.name}
                                    </span>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    {p.category ? (
                                        <span style={{
                                            display: "inline-flex", alignItems: "center", gap: 4,
                                            padding: "2px 8px", borderRadius: 9999, fontSize: 11, fontWeight: 700,
                                            background: "oklch(0.75 0.18 55 / 0.12)", color: "oklch(0.75 0.18 55)",
                                        }}>
                                            <Tag style={{ width: 10, height: 10 }} />
                                            {p.category.name}
                                        </span>
                                    ) : (
                                        <span style={{ fontSize: 12, color: "oklch(0.94 0.004 240 / 0.25)" }}>Sin categoría</span>
                                    )}
                                </div>

                                <span style={{
                                    fontSize: 12, color: "oklch(0.94 0.004 240 / 0.4)",
                                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                }}>
                                    {p.shortDescription ?? "—"}
                                </span>

                                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4 }}>
                                    <button
                                        onClick={() => openModal(p)}
                                        style={{
                                            padding: 6, borderRadius: 8, border: "none",
                                            background: "transparent", cursor: "pointer",
                                            color: "oklch(0.94 0.004 240 / 0.3)",
                                            display: "flex", transition: "all 0.15s",
                                        }}
                                    >
                                        <Edit2 style={{ width: 15, height: 15 }} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p._id, p.name)}
                                        disabled={deleting === p._id}
                                        style={{
                                            padding: 6, borderRadius: 8, border: "none",
                                            background: "transparent", cursor: "pointer",
                                            color: "oklch(0.94 0.004 240 / 0.3)",
                                            display: "flex", transition: "all 0.15s",
                                        }}
                                    >
                                        {deleting === p._id ? <span className="animate-spin">◌</span> : <Trash2 style={{ width: 15, height: 15 }} />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* MODAL FORM */}
            {isModalOpen && (
                <div style={{
                    position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
                    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
                    padding: 20
                }}>
                    <div style={{
                        ...S.surface, width: "100%", maxWidth: 500, padding: 24,
                        position: "relative", maxHeight: "90vh", overflowY: "auto"
                    }}>
                        <button
                            onClick={closeModal}
                            style={{ position: "absolute", top: 16, right: 16, color: "white", padding: 4 }}
                        >
                            <X style={{ width: 20, height: 20 }} />
                        </button>

                        <h2 className="text-xl font-bold mb-6">
                            {editingProduct ? "Editar Producto" : "Nuevo Producto"}
                        </h2>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold mb-2 block uppercase opacity-50 tracking-wider">Imagen del Producto</label>
                                <div
                                    style={S.dropzone}
                                    className="group hover:border-primary/50 hover:bg-primary/5"
                                    onClick={() => document.getElementById("fileInput")?.click()}
                                >
                                    {isUploading ? (
                                        <div className="flex flex-col items-center gap-3 py-4 animate-pulse">
                                            <div className="animate-spin h-8 w-8 border-3 border-primary border-t-transparent rounded-full" />
                                            <span className="text-sm font-medium text-primary">Procesando imagen...</span>
                                        </div>
                                    ) : formData.imageUrl ? (
                                        <div style={S.previewContainer} className="group">
                                            <Image
                                                src={formData.imageUrl}
                                                alt="Preview"
                                                fill
                                                className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
                                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                                    <Plus className="w-6 h-6" />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-widest bg-primary px-3 py-1 rounded-full shadow-lg">Cambiar Imagen</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-3 py-4 transition-transform group-hover:scale-110 duration-300">
                                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors">
                                                <ImageIcon className="h-8 w-8 opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-semibold">Subir fotografía</p>
                                                <p className="text-[10px] opacity-40 uppercase tracking-tight">JPG, PNG o WEBP (Recomendado 800x800)</p>
                                            </div>
                                        </div>
                                    )}
                                    <input
                                        id="fileInput"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileUpload}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="text-xs font-bold mb-1 block uppercase opacity-50">Nombre</label>
                                    <input
                                        style={S.input}
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-xs font-bold mb-1 block uppercase opacity-50">Categoría</label>
                                    <select
                                        style={S.input}
                                        required
                                        value={formData.categoryId}
                                        onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                                    >
                                        <option value="">Seleccionar...</option>
                                        {categories.map(c => (
                                            <option key={c._id} value={c._id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold mb-1 block uppercase opacity-50">Descripción Corta</label>
                                <input
                                    style={S.input}
                                    type="text"
                                    value={formData.shortDescription}
                                    onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold mb-1 block uppercase opacity-50">Descripción Larga</label>
                                <textarea
                                    style={{ ...S.input, height: 80, resize: "none" }}
                                    value={formData.longDescription}
                                    onChange={e => setFormData({ ...formData, longDescription: e.target.value })}
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    style={{
                                        flex: 1, padding: "12px", borderRadius: 12, border: "1px solid oklch(0.26 0.012 255)",
                                        color: "white", fontWeight: 600
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving || isUploading}
                                    className="admin-btn-primary"
                                    style={{ flex: 1, padding: "12px", borderRadius: 12, justifyContent: "center" }}
                                >
                                    {isSaving ? "Guardando..." : (
                                        <span className="flex items-center gap-2">
                                            <Save style={{ width: 18, height: 18 }} />
                                            {editingProduct ? "Guardar Cambios" : "Crear Producto"}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL CATEGORIAS */}
            {isCatModalOpen && (
                <div style={{
                    position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
                    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 110,
                    padding: 20
                }}>
                    <div style={{
                        ...S.surface, width: "100%", maxWidth: 400, padding: 24,
                        position: "relative"
                    }}>
                        <button
                            onClick={() => setIsCatModalOpen(false)}
                            style={{ position: "absolute", top: 16, right: 16, color: "white", padding: 4 }}
                        >
                            <X style={{ width: 20, height: 20 }} />
                        </button>

                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Tag className="text-primary" />
                            Gestionar Categorías
                        </h2>

                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <input
                                    style={S.input}
                                    placeholder="Nueva categoría..."
                                    value={newCatName}
                                    onChange={e => setNewCatName(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && handleCreateCategory()}
                                />
                                <button
                                    onClick={handleCreateCategory}
                                    className="admin-btn-primary"
                                    style={{ padding: "0 16px", borderRadius: 10 }}
                                >
                                    <Plus style={{ width: 18, height: 18 }} />
                                </button>
                            </div>

                            <div style={{
                                maxHeight: 300, overflowY: "auto",
                                border: "1px solid oklch(0.26 0.012 255)", borderRadius: 12,
                                background: "oklch(0.19 0.012 255 / 0.3)"
                            }}>
                                {categories.length === 0 ? (
                                    <p className="text-center py-8 text-sm opacity-30">No hay categorías</p>
                                ) : (
                                    categories.map(cat => (
                                        <div
                                            key={cat._id}
                                            style={{
                                                display: "flex", alignItems: "center", justifyContent: "space-between",
                                                padding: "10px 16px", borderBottom: "1px solid oklch(0.26 0.012 255 / 0.5)"
                                            }}
                                        >
                                            <span className="text-sm font-medium">{cat.name}</span>
                                            <button
                                                onClick={() => handleDeleteCategory(cat._id, cat.name)}
                                                style={{ color: "oklch(0.7 0.22 25)", opacity: 0.6, padding: 4 }}
                                            >
                                                <Trash2 style={{ width: 14, height: 14 }} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )
}

