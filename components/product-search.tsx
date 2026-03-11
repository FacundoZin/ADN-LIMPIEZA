"use client"

import { useState, useTransition, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X, Loader2, Check, ChevronDown, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { Category } from "@/lib/db/queries"
import { cn } from "@/lib/utils"

interface ProductSearchProps {
  initialCategories: Category[]
}

export function ProductSearch({ initialCategories }: ProductSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // Local state for categories
  const [categories, setCategories] = useState<Category[]>(initialCategories)

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "all")

  // Sync with initial props if they change
  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      setCategories(initialCategories)
    }
  }, [initialCategories])

  // If component is on client, we can try a simple fetch if empty
  useEffect(() => {
    if (categories.length === 0) {
      fetch("/api/categories")
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setCategories(data)
        })
        .catch(err => console.error("Error simple fetch:", err))
    }
  }, [])

  // Función de búsqueda sincronizada con la URL
  const handleSearch = (searchTerm = search, catId = category) => {
    startTransition(() => {
      const params = new URLSearchParams()
      if (searchTerm) params.set("search", searchTerm)
      if (catId !== "all") params.set("category", catId)

      const queryString = params.toString()
      router.push(`/productos${queryString ? `?${queryString}` : ""}`, { scroll: false })
    })
  }

  // Debounced search for name input
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentSearch = searchParams.get("search") || ""
      if (search !== currentSearch) {
        handleSearch(search, category)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  const handleCategoryChange = (currentValue: string) => {
    const newCategory = currentValue
    setCategory(newCategory)

    startTransition(() => {
      const params = new URLSearchParams()
      if (search) params.set("search", search)
      if (newCategory !== "all") params.set("category", newCategory)

      const queryString = params.toString()
      router.push(`/productos${queryString ? `?${queryString}` : ""}`, { scroll: false })
    })
  }

  const handleClearFilters = () => {
    setSearch("")
    setCategory("all")
    startTransition(() => {
      router.push("/productos", { scroll: false })
    })
  }

  const hasFilters = search || category !== "all"
  const selectedCategoryName = categories.find((c) => c.id === category)?.name || "Todas las categorías"

  return (
    <div className="relative z-20 -mt-10 mb-12 animate-fade-up">
      <div className="container mx-auto px-4 lg:px-8">
        <div className={cn(
          "max-w-5xl mx-auto p-2 md:p-3 rounded-3xl",
          "glass shadow-soft-xl border border-white/20 dark:border-white/10",
          "transition-all duration-500 hover:shadow-glow/10"
        )}>
          {/* Unified Search Bar Container */}
          <div className="flex flex-col md:flex-row gap-2 justify-center items-center w-full">

            {/* Search Input with modern glass feel */}
            <div className="relative flex-1 w-full group">
              <Search className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
                "transition-colors group-focus-within:text-primary"
              )} />
              <Input
                type="text"
                placeholder="Buscar por nombre o descripción..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className={cn(
                  "pl-12 pr-10 h-14 rounded-2xl text-sm border-transparent",
                  "bg-muted/30 focus:bg-background/80 focus:border-primary/30 focus:ring-4 focus:ring-primary/5",
                  "transition-all duration-300 placeholder:text-muted-foreground/60"
                )}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Separator on desktop */}
            <div className="hidden md:block w-px h-10 bg-border/50" />

            {/* Category Selector */}
            <Select
              value={category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger
                className={cn(
                  "w-full md:w-[260px] h-14 justify-between rounded-2xl px-5",
                  "bg-muted/30 border-transparent hover:bg-muted/40 transition-all duration-300",
                  "focus:ring-4 focus:ring-primary/5 focus:border-primary/30",
                  category !== "all" && "text-primary font-medium"
                )}
              >
                <div className="flex items-center gap-3">
                  <Filter className={cn("w-4 h-4", category !== "all" ? "text-primary" : "text-muted-foreground")} />
                  <span className="truncate text-sm">
                    <SelectValue placeholder="Todas las categorías" />
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent className="w-[280px] rounded-2xl bg-popover shadow-soft-xl border p-1" align="end">
                <SelectGroup>
                  <SelectItem 
                    value="all" 
                    className="rounded-xl px-4 py-3 cursor-pointer mb-1 hover:bg-accent focus:bg-accent transition-colors"
                  >
                    Todas las categorías
                  </SelectItem>
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat.id}
                      value={cat.id}
                      className="rounded-xl px-4 py-3 cursor-pointer mb-1 hover:bg-accent focus:bg-accent transition-colors"
                    >
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Clear Filters (Dynamic) */}
            {hasFilters && (
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="h-14 px-6 rounded-2xl border-border/40 hover:bg-muted font-medium transition-all w-full md:w-auto text-muted-foreground"
              >
                Limpiar
              </Button>
            )}

            {/* Principal Search Button */}
            <Button
              onClick={() => handleSearch()}
              disabled={isPending}
              className={cn(
                "h-14 px-8 rounded-2xl w-full md:w-auto font-semibold shadow-soft hover:shadow-glow transition-all duration-300",
                "gradient-primary text-primary-foreground"
              )}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Cargando...
                </>
              ) : (
                "Ver Resultados"
              )}
            </Button>

          </div>
        </div>

        {/* Filters Summary / Status */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {category !== "all" && (
            <div className="badge-primary animate-fade-in py-1 px-4 cursor-default">
              Categoría: {selectedCategoryName}
              <button onClick={() => handleCategoryChange("all")} className="ml-2 hover:text-foreground">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {search && (
            <div className="badge-accent animate-fade-in py-1 px-4 cursor-default">
              Búsqueda: "{search}"
              <button onClick={() => setSearch("")} className="ml-2 hover:text-foreground">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
