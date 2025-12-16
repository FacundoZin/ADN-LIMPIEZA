"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { Category } from "@/lib/sanity/types"
import { cn } from "@/lib/utils"

interface ProductSearchProps {
  categories: Category[]
}

export function ProductSearch({ categories }: ProductSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "all")

  const handleSearch = () => {
    startTransition(() => {
      const params = new URLSearchParams()
      if (search) params.set("search", search)
      if (category !== "all") params.set("category", category)

      const queryString = params.toString()
      router.push(`/productos${queryString ? `?${queryString}` : ""}`)
    })
  }

  const handleCategoryChange = (categoryId: string) => {
    setCategory(categoryId)
    startTransition(() => {
      const params = new URLSearchParams()
      if (search) params.set("search", search)
      if (categoryId !== "all") params.set("category", categoryId)

      const queryString = params.toString()
      router.push(`/productos${queryString ? `?${queryString}` : ""}`)
    })
  }

  const handleClearFilters = () => {
    setSearch("")
    setCategory("all")
    startTransition(() => {
      router.push("/productos")
    })
  }

  const hasFilters = search || category !== "all"

  return (
    <div className="sticky top-20 z-40 -mx-4 px-4 py-6 mb-8 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container-wide">
        <div className="flex flex-col gap-6">
          
          {/* Search Input Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className={cn(
                  "pl-12 pr-4 h-12 rounded-xl",
                  "bg-muted/50 border-border/50",
                  "focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20",
                  "transition-all duration-300"
                )}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleSearch} 
                disabled={isPending}
                className="h-12 px-6 rounded-xl shadow-soft hover:shadow-glow transition-all duration-300"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Buscando...
                  </>
                ) : (
                  "Buscar"
                )}
              </Button>
              
              {hasFilters && (
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleClearFilters} 
                  disabled={isPending}
                  className="h-12 w-12 rounded-xl"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Limpiar filtros</span>
                </Button>
              )}
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange("all")}
              className={cn(
                "px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                category === "all"
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                  : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              Todos
            </button>
            
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleCategoryChange(cat._id)}
                className={cn(
                  "px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                  category === cat._id
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                    : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  )
}
