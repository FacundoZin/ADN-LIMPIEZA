"use client"

import { useState, useTransition, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X, Loader2, Check, ChevronDown, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
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

  // Local state for categories (fetches on demand if not provided by server)
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [isLoadingCats, setIsLoadingCats] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "all")
  const [open, setOpen] = useState(false)

  // Fetch categories from the API only if we don't have them or haven't fetched yet
  const fetchCategories = useCallback(async () => {
    if (hasFetched) return

    setIsLoadingCats(true)
    try {
      const response = await fetch("/api/categories")
      if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data)
          setHasFetched(true)
        }
      }
    } catch (error) {
      console.error("Error al cargar categorías:", error)
    } finally {
      setIsLoadingCats(false)
    }
  }, [hasFetched])

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
    setOpen(false)

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

            {/* Category Selector with Dynamic Fetching */}
            <Popover
              open={open}
              onOpenChange={(isOpen) => {
                setOpen(isOpen)
                if (isOpen) fetchCategories()
              }}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full md:w-[260px] h-14 justify-between rounded-2xl px-5",
                    "hover:bg-muted/40 transition-all duration-300",
                    category !== "all" && "text-primary font-medium"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Filter className={cn("w-4 h-4", category !== "all" ? "text-primary" : "text-muted-foreground")} />
                    <span className="truncate text-sm">
                      {category === "all" ? "Todas las categorías" : selectedCategoryName}
                    </span>
                  </div>
                  {isLoadingCats ? (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin opacity-50" />
                  ) : (
                    <ChevronDown className={cn("ml-2 h-4 w-4 opacity-50 transition-transform duration-300", open && "rotate-180")} />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-1 rounded-2xl glass-subtle shadow-soft-xl" align="end" sideOffset={8}>
                <Command className="bg-transparent">
                  <CommandInput placeholder="Filtrar categorías..." className="h-10 border-none focus:ring-0" />
                  <CommandList className="scrollbar-thin max-h-[300px]">
                    <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                      No se encontraron resultados.
                    </CommandEmpty>
                    <CommandGroup heading="Categorías" className="p-1">
                      <CommandItem
                        value="all"
                        onSelect={() => handleCategoryChange("all")}
                        className="rounded-xl px-4 py-2 cursor-pointer mb-1"
                      >
                        <Check className={cn("mr-3 h-4 w-4", category === "all" ? "text-primary opacity-100" : "opacity-0")} />
                        Todas las categorías
                      </CommandItem>

                      {categories.map((cat) => (
                        <CommandItem
                          key={cat.id}
                          value={cat.name} // We use name for searching
                          onSelect={() => handleCategoryChange(cat.id)}
                          className="rounded-xl px-4 py-2 cursor-pointer mb-1"
                        >
                          <Check className={cn("mr-3 h-4 w-4", category === cat.id ? "text-primary opacity-100" : "opacity-0")} />
                          {cat.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

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
