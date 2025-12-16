import { Suspense } from "react"
import { ProductSearch } from "@/components/product-search"
import { ProductGrid } from "@/components/product-grid"
import { getProductsWithCategories, getAllCategories } from "@/lib/sanity/queries"
import { Loader2 } from "lucide-react"

export const metadata = {
  title: "Productos - Limpieza Profesional",
  description: "Explora nuestra amplia gama de productos de limpieza profesional.",
}

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>
}) {
  const [products, categories] = await Promise.all([getProductsWithCategories(), getAllCategories()])
  const { search, category } = await searchParams

  // Filtrar productos según búsqueda
  const filteredProducts = products.filter((product) => {
    const matchesSearch = search
      ? product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      : true

    const matchesCategory = category && category !== "all" ? (product.category as any)?._id === category : true

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Nuestros Productos</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Encuentra los mejores productos de limpieza para tu hogar o negocio
          </p>
        </div>

        {/* Search and Filter */}
        <ProductSearch categories={categories} />

        {/* Products Grid */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }
        >
          <ProductGrid products={filteredProducts} />
        </Suspense>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground mb-4">No se encontraron productos</p>
            <p className="text-muted-foreground">Intenta ajustar tus filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  )
}
