import { Suspense } from "react"
import { ProductSearch } from "@/components/product-search"
import { ProductGrid } from "@/components/product-grid"
import { getProductsWithCategories, getAllCategories } from "@/lib/db/queries"
import { Loader2, Package } from "lucide-react"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "Productos — ADN Limpieza",
  description: "Explora nuestra amplia gama de productos de limpieza profesional para hogares y negocios.",
}

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>
}) {
  const [products, categories] = await Promise.all([
    getProductsWithCategories(),
    getAllCategories()
  ])
  const { search, category } = await searchParams

  // Filtrar productos según búsqueda
  const filteredProducts = products.filter((product) => {
    const matchesSearch = search
      ? product.name.toLowerCase().includes(search.toLowerCase()) ||
      (product.shortDescription ?? "").toLowerCase().includes(search.toLowerCase())
      : true

    const matchesCategory = category && category !== "all"
      ? (product.category as any)?._ref === category
      : true

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen pt-20">

      {/* Page Header */}
      <section className="section-padding pb-0 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            {/* Section Label */}
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-border" />
              <span className="label-text text-muted-foreground">Catálogo</span>
              <div className="w-12 h-px bg-border" />
            </div>

            <h1 className="display-xl mb-4 text-balance">
              Nuestros Productos
            </h1>
            <p className="body-lg text-muted-foreground text-pretty">
              Encuentra los mejores productos de limpieza para tu hogar o negocio.
              Calidad profesional para resultados excepcionales.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter - Now sticky */}
      <ProductSearch categories={categories} />

      {/* Products Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Cargando productos...</p>
              </div>
            }
          >
            <ProductGrid products={filteredProducts} />
          </Suspense>

          {/* No Results State */}
          {filteredProducts.length === 0 && (
            <div className={cn(
              "flex flex-col items-center justify-center py-20",
              "text-center animate-fade-up"
            )}>
              <div className="w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mb-6">
                <Package className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="heading-lg mb-2">No se encontraron productos</h3>
              <p className="body-md text-muted-foreground max-w-md">
                Intenta ajustar tus filtros de búsqueda o explora todas nuestras categorías.
              </p>
            </div>
          )}

          {/* Results count */}
          {filteredProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border/50 text-center">
              <p className="text-sm text-muted-foreground">
                Mostrando <span className="font-semibold text-foreground">{filteredProducts.length}</span> producto{filteredProducts.length !== 1 ? "s" : ""}
                {category && category !== "all" && (
                  <span> en la categoría seleccionada</span>
                )}
              </p>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
