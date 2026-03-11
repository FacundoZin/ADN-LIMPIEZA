"use client"

import { useEffect, useState, useRef } from "react"
import { Package, Plus, Search, Trash2, Edit2, RefreshCw, Tag, X, Save, UploadCloud, Star, CheckCircle2, ChevronDown } from "lucide-react"
import Image from "next/image"
import { ConfirmModal } from "@/components/ui/confirm-modal"

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface Category { _id: string; name: string }

interface ProductImage { url: string; isPrimary: boolean; uploading?: boolean }

interface Product {
    _id: string
    name: string
    shortDescription?: string
    longDescription?: string
    categoryId?: string
    category?: { _id: string; name: string }
    imageUrl?: string
    images?: { url: string; isPrimary: boolean }[]
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function ProductosAdminPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [deleting, setDeleting] = useState<string | null>(null)

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isCatModalOpen, setIsCatModalOpen] = useState(false)
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [newCatName, setNewCatName] = useState("")

    const [confirmState, setConfirmState] = useState<{
        isOpen: boolean;
        title: string;
        description: string;
        onConfirm: () => void;
    }>({
        isOpen: false,
        title: "",
        description: "",
        onConfirm: () => {},
    })

    const closeConfirm = () => setConfirmState(p => ({ ...p, isOpen: false }))

    // Form data
    const [formData, setFormData] = useState({
        name: "",
        shortDescription: "",
        longDescription: "",
        categoryId: "",
    })
    const [images, setImages] = useState<ProductImage[]>([])
    const [isSaving, setIsSaving] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // ── Upload ────────────────────────────────────────────────────────────────

    const uploadFile = async (file: File) => {
        // Validations
        const allowed = ["image/jpeg", "image/png", "image/webp"]
        if (!allowed.includes(file.type)) { alert("Formato no permitido. Usá JPG, PNG o WEBP."); return }
        if (file.size > 2 * 1024 * 1024) { alert("El archivo supera los 2MB."); return }

        const tempId = Date.now().toString()
        // Optimistic: add a placeholder
        setImages(prev => [...prev, { url: tempId, isPrimary: prev.length === 0, uploading: true }])

        const fd = new FormData()
        fd.append("file", file)
        try {
            const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
            if (!res.ok) throw new Error("Error al subir")
            const data = await res.json()
            setImages(prev => prev.map(img => img.url === tempId ? { ...img, url: data.url, uploading: false } : img))
        } catch (e: any) {
            alert("Error al subir: " + e.message)
            setImages(prev => prev.filter(img => img.url !== tempId))
        }
    }

    const handleFiles = (files: FileList | null) => {
        if (!files) return
        Array.from(files).forEach(uploadFile)
    }

    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true) }
    const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false) }
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault(); setIsDragging(false)
        handleFiles(e.dataTransfer.files)
    }

    const removeImage = (url: string) =>
        setImages(prev => {
            const filtered = prev.filter(img => img.url !== url)
            if (filtered.length > 0 && !filtered.some(i => i.isPrimary)) filtered[0].isPrimary = true
            return filtered
        })

    const setPrimary = (url: string) =>
        setImages(prev => prev.map(img => ({ ...img, isPrimary: img.url === url })))

    // ── Data ──────────────────────────────────────────────────────────────────

    useEffect(() => { fetchData() }, [])

    async function fetchData() {
        setLoading(true)
        try {
            const [pRes, cRes] = await Promise.all([
                fetch("/api/admin/productos"),
                fetch("/api/admin/productos/categorias")
            ])
            setProducts(await pRes.json())
            setCategories(await cRes.json())
        } catch (e) { console.error(e) }
        finally { setLoading(false) }
    }

    function openModal(product: Product | null = null) {
        if (product) {
            setEditingProduct(product)
            setFormData({
                name: product.name,
                shortDescription: product.shortDescription || "",
                longDescription: product.longDescription || "",
                categoryId: product.categoryId || product.category?._id || "",
            })
            setImages(product.images || (product.imageUrl ? [{ url: product.imageUrl, isPrimary: true }] : []))
        } else {
            setEditingProduct(null)
            setFormData({ name: "", shortDescription: "", longDescription: "", categoryId: "" })
            setImages([])
        }
        setIsModalOpen(true)
    }

    function closeModal() { 
        setIsModalOpen(false)
        setEditingProduct(null)
        setIsCategoryDropdownOpen(false)
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault()
        setIsSaving(true)
        try {
            const primaryImg = images.find(i => i.isPrimary) ?? images[0]
            const cleanImages = images.map(i => ({ url: i.url, isPrimary: i.isPrimary }))
            const body = { ...formData, imageUrl: primaryImg?.url ?? "", images: cleanImages }
            const method = editingProduct ? "PUT" : "POST"
            const url = editingProduct ? `/api/admin/productos/${editingProduct._id}` : "/api/admin/productos"
            const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
            if (!res.ok) throw new Error("Error al guardar")
            await fetchData()
            closeModal()
        } catch (e: any) { alert(e.message) }
        finally { setIsSaving(false) }
    }

    async function handleCreateCategory() {
        if (!newCatName.trim()) return
        try {
            const res = await fetch("/api/admin/productos/categorias", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newCatName })
            })
            if (!res.ok) throw new Error()
            setNewCatName(""); await fetchData()
        } catch { alert("Error al crear categoría") }
    }

    async function handleDeleteCategory(id: string, name: string) {
        setConfirmState({
            isOpen: true,
            title: "Eliminar categoría",
            description: `¿Estás seguro de que querés eliminar la categoría "${name}"?`,
            onConfirm: async () => {
                try {
                    const res = await fetch(`/api/admin/productos/categorias?id=${id}`, { method: "DELETE" })
                    if (!res.ok) throw new Error()
                    await fetchData()
                } catch { alert("Error al eliminar") }
                finally { closeConfirm() }
            }
        });
    }

    async function handleDelete(id: string, name: string) {
        setConfirmState({
            isOpen: true,
            title: "Eliminar producto",
            description: `¿Estás seguro de que querés eliminar el producto "${name}"? Esta acción no se puede deshacer.`,
            onConfirm: async () => {
                setDeleting(id)
                try {
                    const res = await fetch(`/api/admin/productos/${id}`, { method: "DELETE" })
                    if (!res.ok) throw new Error()
                    setProducts(prev => prev.filter(p => p._id !== id))
                } catch { alert("Error al eliminar") }
                finally { 
                    setDeleting(null)
                    closeConfirm() 
                }
            }
        });
    }

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.category?.name ?? "").toLowerCase().includes(search.toLowerCase())
    )

    const isUploading = images.some(i => i.uploading)

    // ── Styles ────────────────────────────────────────────────────────────────

    const C = {
        card: "rounded-2xl border border-white/[0.07] bg-[#111114]",
        input: "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white text-sm outline-none focus:border-orange-500/50 focus:bg-white/[0.05] transition-all placeholder:text-white/20",
        label: "block text-[11px] font-semibold uppercase tracking-widest text-white/40 mb-1.5",
        sectionTitle: "text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2",
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Render
    // ─────────────────────────────────────────────────────────────────────────

    return (
        <div className="space-y-6" style={{ color: "var(--admin-text)" }}>

            {/* ── Header ─────────────────────────────────────────────────────────── */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-2xl font-bold">Productos</h1>
                    <p className="text-sm mt-1 text-white/40">
                        {loading ? "Cargando…" : `${products.length} productos en catálogo`}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button type="button" onClick={fetchData}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-transparent text-white/50 text-sm font-semibold hover:text-white hover:border-white/20 transition-all">
                        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                        Actualizar
                    </button>
                    <button type="button" onClick={() => setIsCatModalOpen(true)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-transparent text-white/50 text-sm font-semibold hover:text-white hover:border-white/20 transition-all">
                        <Tag className="w-4 h-4" />
                        Categorías
                    </button>
                    <button type="button" onClick={() => openModal()}
                        className="admin-btn-primary flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold">
                        <Plus className="w-5 h-5" />
                        Agregar Producto
                    </button>
                </div>
            </div>

            {/* ── Search ─────────────────────────────────────────────────────────── */}
            <div className={`${C.card} p-3`}>
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                    <input className={C.input} style={{ paddingLeft: 40 }}
                        placeholder="Buscar por nombre o categoría..."
                        value={search} onChange={e => setSearch(e.target.value)} />
                </div>
            </div>

            {/* ── Product List ────────────────────────────────────────────────────── */}
            <div className={C.card}>
                {loading ? (
                    <div className="py-20 flex flex-col items-center gap-4 text-white/25">
                        <RefreshCw className="w-8 h-8 animate-spin" />
                        <span className="text-sm">Cargando productos…</span>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="py-20 flex flex-col items-center gap-4 text-white/25">
                        <Package className="w-12 h-12 opacity-25" />
                        <p className="text-sm">{search ? `Sin resultados para "${search}"` : "No hay productos registrados"}</p>
                        <button type="button" onClick={() => openModal()} className="admin-btn-primary flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold mt-2">
                            <Plus className="w-4 h-4" /> Agregar primero
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Table head */}
                        <div className="grid px-5 py-3 border-b border-white/[0.06]"
                            style={{ gridTemplateColumns: "1fr 150px 200px 90px" }}>
                            {["Producto", "Categoría", "Descripción", ""].map(h => (
                                <span key={h} className="text-[10px] font-bold uppercase tracking-widest text-white/25">{h}</span>
                            ))}
                        </div>

                        {/* Rows */}
                        {filtered.map(p => (
                            <div key={p._id}
                                className="grid px-5 py-3.5 border-b border-white/[0.04] items-center hover:bg-white/[0.02] transition-colors"
                                style={{ gridTemplateColumns: "1fr 150px 200px 90px" }}>

                                {/* Thumbnail + name */}
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className="w-14 h-14 rounded-xl border border-white/[0.08] bg-[#0a0a0c] flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                                        {p.imageUrl ? (
                                            <Image src={p.imageUrl} alt={p.name} fill className="object-contain p-1" />
                                        ) : (
                                            <Package className="w-6 h-6 opacity-20" />
                                        )}
                                    </div>
                                    <span className="text-sm font-semibold text-white truncate">{p.name}</span>
                                </div>

                                {/* Category */}
                                <div>
                                    {p.category ? (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-500/10 text-orange-400">
                                            <Tag className="w-2.5 h-2.5" />
                                            {p.category.name}
                                        </span>
                                    ) : (
                                        <span className="text-xs text-white/20">Sin categoría</span>
                                    )}
                                </div>

                                {/* Description */}
                                <span className="text-xs text-white/35 truncate">{p.shortDescription ?? "—"}</span>

                                {/* Actions */}
                                <div className="flex items-center justify-end gap-1.5">
                                    <button type="button" onClick={() => openModal(p)}
                                        className="p-2 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 transition-all">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button type="button" onClick={() => handleDelete(p._id, p.name)} disabled={deleting === p._id}
                                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all disabled:opacity-40">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* ══════════════════════════════════════════════════════════════════════
                MODAL — Crear / Editar Producto
            ══════════════════════════════════════════════════════════════════════ */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)" }}>
                    <div className="w-full max-w-3xl flex flex-col max-h-[92vh] rounded-3xl border border-white/[0.1] bg-[#0e0e11] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.07] flex-shrink-0">
                            <div>
                                <h2 className="text-lg font-bold text-white">
                                    {editingProduct ? "Editar Producto" : "Nuevo Producto"}
                                </h2>
                                <p className="text-xs text-white/30 mt-0.5">
                                    {editingProduct ? "Modificá los datos del producto" : "Completá la información para agregar un producto"}
                                </p>
                            </div>
                            <button type="button" onClick={closeModal}
                                className="p-2 rounded-xl text-white/30 hover:text-white hover:bg-white/[0.06] transition-all">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body — scrollable */}
                        <div className="overflow-y-auto flex-1 px-8 py-7">
                            <form onSubmit={handleSave} id="product-form" className="space-y-8">

                                {/* ─── SECCIÓN 1: IMÁGENES ──────────────────────────────────────────── */}
                                <section className="space-y-4">
                                    <div className={C.sectionTitle}>
                                        <span className="w-5 h-px bg-white/20 block" />
                                        Imágenes del Producto
                                    </div>

                                    {/* Drop Zone — only show when no images OR as append area */}
                                    {images.filter(i => !i.uploading || i.url).length < 8 && (
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            className={`
                                                relative flex flex-col items-center justify-center gap-3
                                                rounded-2xl border-2 border-dashed cursor-pointer
                                                py-10 px-6 text-center transition-all duration-200
                                                ${isDragging
                                                    ? "border-orange-500 bg-orange-500/[0.05]"
                                                    : "border-white/10 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.03]"
                                                }
                                            `}
                                        >
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isDragging ? "bg-orange-500/20" : "bg-white/[0.04]"}`}>
                                                <UploadCloud className={`w-7 h-7 transition-all ${isDragging ? "text-orange-400" : "text-white/25"}`} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-white/70">
                                                    {isDragging ? "Soltá para subir" : "Arrastrar imágenes o hacer click para subir"}
                                                </p>
                                                <p className="text-xs text-white/30 mt-1">JPG, PNG, WEBP</p>
                                            </div>
                                            <div className="flex items-center gap-4 mt-1">
                                                <span className="text-[11px] text-white/20">Tamaño recomendado: 1200 × 1200 px</span>
                                                <span className="text-white/10">·</span>
                                                <span className="text-[11px] text-white/20">Máx. 2 MB por imagen</span>
                                            </div>
                                        </div>
                                    )}

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        multiple
                                        className="hidden"
                                        onChange={e => { handleFiles(e.target.files); e.target.value = "" }}
                                    />

                                    {/* Image Grid */}
                                    {images.length > 0 && (
                                        <div className="grid grid-cols-4 gap-3">
                                            {images.map((img, idx) => (
                                                <div key={img.url}
                                                    className={`relative rounded-xl overflow-hidden border-2 transition-all group aspect-square
                                                        ${img.isPrimary ? "border-orange-500" : "border-white/[0.08] hover:border-white/20"}`}
                                                    style={{ background: "#0a0a0c" }}>

                                                    {img.uploading ? (
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0a0a0c]">
                                                            <RefreshCw className="w-5 h-5 text-orange-400 animate-spin" />
                                                            <span className="text-[10px] text-white/30 uppercase tracking-wider">Subiendo…</span>
                                                        </div>
                                                    ) : (
                                                        <Image src={img.url} alt={`Imagen ${idx + 1}`} fill className="object-contain p-2 transition-transform duration-300 group-hover:scale-105" />
                                                    )}

                                                    {/* Primary badge */}
                                                    {img.isPrimary && (
                                                        <div className="absolute top-1.5 left-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-orange-500 text-white text-[9px] font-bold uppercase tracking-wider">
                                                            <Star className="w-2.5 h-2.5 fill-white" />
                                                            Principal
                                                        </div>
                                                    )}

                                                    {/* Hover controls */}
                                                    {!img.uploading && (
                                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                                                            {!img.isPrimary && (
                                                                <button type="button" onClick={() => setPrimary(img.url)}
                                                                    className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider hover:bg-orange-400 transition-all">
                                                                    <Star className="w-3 h-3 fill-white" />
                                                                    Principal
                                                                </button>
                                                            )}
                                                            <button type="button" onClick={() => removeImage(img.url)}
                                                                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-red-500/80 text-white text-[10px] font-bold uppercase tracking-wider hover:bg-red-500 transition-all">
                                                                <Trash2 className="w-3 h-3" />
                                                                Eliminar
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}

                                            {/* Add more tile */}
                                            {images.length < 8 && (
                                                <button type="button" onClick={() => fileInputRef.current?.click()}
                                                    className="aspect-square rounded-xl border-2 border-dashed border-white/10 hover:border-white/20 hover:bg-white/[0.03] flex flex-col items-center justify-center gap-2 text-white/25 hover:text-white/50 transition-all">
                                                    <Plus className="w-6 h-6" />
                                                    <span className="text-[10px] font-semibold uppercase tracking-wider">Agregar</span>
                                                </button>
                                            )}
                                        </div>
                                    )}

                                    {images.length === 0 && (
                                        <p className="text-[11px] text-white/20 text-center">
                                            Sin imágenes — la imagen principal se usará en la tienda
                                        </p>
                                    )}
                                </section>

                                {/* ─── SECCIÓN 2: INFORMACIÓN BÁSICA ───────────────────────────────── */}
                                <section className="space-y-4">
                                    <div className={C.sectionTitle}>
                                        <span className="w-5 h-px bg-white/20 block" />
                                        Información Básica
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <label className={C.label}>Nombre del producto *</label>
                                            <input className={C.input}
                                                type="text" required placeholder="Ej. Desengrasante Industrial XL"
                                                value={formData.name}
                                                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
                                        </div>
                                        <div className="col-span-2 relative">
                                            <label className={C.label}>Categoría *</label>
                                            
                                            <button 
                                                type="button" 
                                                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                                className={`${C.input} flex items-center justify-between text-left relative z-10 w-full focus:outline-none`}
                                            >
                                                <span className={formData.categoryId ? "text-white" : "text-white/40"}>
                                                    {formData.categoryId 
                                                        ? categories.find(c => c._id === formData.categoryId)?.name 
                                                        : "Seleccionar categoría…"}
                                                </span>
                                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 text-white/40 ${isCategoryDropdownOpen ? "rotate-180" : ""}`} />
                                            </button>
                                            
                                            {/* Backdrop para cerrar haciendo click afuera (básico) */}
                                            {isCategoryDropdownOpen && (
                                                <div 
                                                    className="fixed inset-0 z-40" 
                                                    onClick={() => setIsCategoryDropdownOpen(false)} 
                                                />
                                            )}

                                            {/* Dropdown flotante */}
                                            {isCategoryDropdownOpen && (
                                                <div className="absolute top-full left-0 w-full mt-2 z-50 rounded-xl border border-white/10 bg-[#16161a] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                                                    <div className="max-h-60 overflow-y-auto w-full p-2 flex flex-col gap-1">
                                                        {categories.length === 0 ? (
                                                            <div className="px-3 py-4 text-sm text-white/30 text-center flex flex-col items-center gap-2">
                                                                <Tag className="w-5 h-5 opacity-20" />
                                                                No hay categorías
                                                            </div>
                                                        ) : (
                                                            categories.map(c => (
                                                                <button
                                                                    key={c._id}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setFormData(p => ({ ...p, categoryId: c._id }));
                                                                        setIsCategoryDropdownOpen(false);
                                                                    }}
                                                                    className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all flex items-center justify-between ${
                                                                        formData.categoryId === c._id 
                                                                            ? "bg-orange-500/10 text-orange-400 font-bold" 
                                                                            : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                                                                    }`}
                                                                >
                                                                    {c.name}
                                                                    {formData.categoryId === c._id && <CheckCircle2 className="w-4 h-4" />}
                                                                </button>
                                                            ))
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>

                                {/* ─── SECCIÓN 3: DESCRIPCIÓN ──────────────────────────────────────── */}
                                <section className="space-y-4">
                                    <div className={C.sectionTitle}>
                                        <span className="w-5 h-px bg-white/20 block" />
                                        Descripción
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className={C.label}>Descripción corta</label>
                                            <input className={C.input}
                                                type="text" placeholder="Ej. Perfecto para pisos industriales"
                                                value={formData.shortDescription}
                                                onChange={e => setFormData(p => ({ ...p, shortDescription: e.target.value }))} />
                                        </div>
                                        <div>
                                            <label className={C.label}>Descripción larga</label>
                                            <textarea className={C.input}
                                                style={{ height: 120, resize: "none" }}
                                                placeholder="Descripción detallada del producto, características técnicas, modo de uso…"
                                                value={formData.longDescription}
                                                onChange={e => setFormData(p => ({ ...p, longDescription: e.target.value }))} />
                                        </div>
                                    </div>
                                </section>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-between px-8 py-5 border-t border-white/[0.07] flex-shrink-0 bg-[#0e0e11]">
                            <div className="flex items-center gap-2 text-xs text-white/20">
                                {isUploading && (
                                    <>
                                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-orange-400" />
                                        <span className="text-orange-300/60">Subiendo imágenes…</span>
                                    </>
                                )}
                                {!isUploading && images.length > 0 && (
                                    <>
                                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                                        <span>{images.length} imagen{images.length !== 1 ? "es" : ""} lista{images.length !== 1 ? "s" : ""}</span>
                                    </>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                <button type="button" onClick={closeModal}
                                    className="px-5 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-semibold hover:text-white hover:border-white/20 transition-all">
                                    Cancelar
                                </button>
                                <button type="submit" form="product-form" disabled={isSaving || isUploading}
                                    className="admin-btn-primary flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed">
                                    <Save className="w-4 h-4" />
                                    {isSaving ? "Guardando…" : editingProduct ? "Guardar Cambios" : "Crear Producto"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ══════════════════════════════════════════════════════════════════════
                MODAL — Gestionar Categorías
            ══════════════════════════════════════════════════════════════════════ */}
            {isCatModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4"
                    style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)" }}>
                    <div className="w-full max-w-sm rounded-2xl border border-white/[0.1] bg-[#0e0e11] shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07]">
                            <h2 className="text-base font-bold text-white flex items-center gap-2">
                                <Tag className="w-4 h-4 text-orange-400" />
                                Gestionar Categorías
                            </h2>
                            <button type="button" onClick={() => setIsCatModalOpen(false)}
                                className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] transition-all">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex gap-2">
                                <input className={C.input} placeholder="Nueva categoría…"
                                    value={newCatName}
                                    onChange={e => setNewCatName(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && handleCreateCategory()} />
                                <button type="button" onClick={handleCreateCategory}
                                    className="admin-btn-primary px-4 rounded-xl flex-shrink-0">
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="rounded-xl border border-white/[0.07] overflow-hidden max-h-64 overflow-y-auto">
                                {categories.length === 0 ? (
                                    <p className="text-center py-8 text-sm text-white/25">No hay categorías</p>
                                ) : (
                                    categories.map(cat => (
                                        <div key={cat._id}
                                            className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02] transition-colors">
                                            <span className="text-sm font-medium text-white/80">{cat.name}</span>
                                            <button type="button" onClick={() => handleDeleteCategory(cat._id, cat.name)}
                                                className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Modal Reutilizable */}
            <ConfirmModal
                isOpen={confirmState.isOpen}
                onClose={closeConfirm}
                onConfirm={confirmState.onConfirm}
                title={confirmState.title}
                description={confirmState.description}
            />
        </div>
    )
}