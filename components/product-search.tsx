"use client"

import { useState, useTransition, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X, Loader2, Check, ChevronsUpDown } from "lucide-react"
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
  const [open, setOpen] = useState(false)

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
      // Only trigger if the search actually changed from the URL param
      const currentSearch = searchParams.get("search") || ""
      if (search !== currentSearch) {
        handleSearch(search, category)
      }
    }, 400) // 400ms delay

    return () => clearTimeout(timer)
  }, [search])

  const handleCategoryChange = (currentValue: string) => {
    // If clicking the already selected category, don't toggle it off, just keep it.
    // Or if we want toggle behavior: currentValue === category ? "all" : currentValue
    // But typically a combobox selects exactly what you click.
    const newCategory = currentValue
    setCategory(newCategory)
    setOpen(false)

    startTransition(() => {
      const params = new URLSearchParams()
      if (search) params.set("search", search)
      if (newCategory !== "all") params.set("category", newCategory)

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
  const selectedCategoryName = categories.find((c) => c._id === category)?.name || "Todas las categorías"

  return (
    <div className="-mx-4 px-4 py-8 mb-4 mt-4">
      <div className="container-wide">

        {/* Unified Search Bar */}
        <div className="flex flex-col md:flex-row gap-3 justify-center items-center w-full max-w-4xl mx-auto">

          {/* Search Input */}
          <div className="relative flex-1 w-full md:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className={cn(
                "pl-10 pr-4 h-11 rounded-full text-sm",
                "bg-muted/50 border-border/50",
                "focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20",
                "transition-all duration-300"
              )}
            />
          </div>

          {/* Category Combobox */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  "w-full md:w-[240px] h-11 justify-between rounded-full border-border/50 bg-muted/50 hover:bg-background hover:border-primary/50 transition-all duration-300",
                  category !== "all" && "border-primary text-primary bg-primary/5"
                )}
              >
                <span className="truncate text-sm font-normal">
                  {category === "all" ? "Todas las categorías" : selectedCategoryName}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-0 rounded-xl" align="end">
              <Command>
                <CommandInput placeholder="Buscar categoría..." />
                <CommandList>
                  <CommandEmpty>No se encontraron categorías.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      value="all"
                      onSelect={() => handleCategoryChange("all")}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          category === "all" ? "opacity-100" : "opacity-0"
                        )}
                      />
                      Todas las categorías
                    </CommandItem>
                    {categories.map((cat) => (
                      <CommandItem
                        key={cat._id}
                        value={cat.name} // Command uses value for search filtering usually, but we want ID for logic. 
                        // Actually CommandItem value is what is searchable. Layout: name.
                        // We need to pass a callback to handleCategoryChange with ID.
                        onSelect={() => handleCategoryChange(cat._id)}
                        className="cursor-pointer"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            category === cat._id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {cat.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Actions */}
          <div className="flex gap-2 w-full md:w-auto">
            <Button
              onClick={() => handleSearch()}
              disabled={isPending}
              className="h-11 px-6 rounded-full shadow-soft hover:shadow-glow transition-all duration-300 w-full md:w-auto"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Buscando
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
                className="h-11 w-11 rounded-full shrink-0 border-border/50"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Limpiar filtros</span>
              </Button>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
