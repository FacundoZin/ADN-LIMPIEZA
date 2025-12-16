"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Category } from "@/lib/sanity/types"

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

  const handleClearFilters = () => {
    setSearch("")
    setCategory("all")
    startTransition(() => {
      router.push("/productos")
    })
  }

  const hasFilters = search || category !== "all"

  return (
    <div className="mb-12">
      <div className="bg-card rounded-xl p-6 shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar productos por nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-[250px]">
              <SelectValue placeholder="Todas las categorías" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat._id} value={cat._id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={handleSearch} disabled={isPending} className="flex-1 md:flex-initial">
              {isPending ? "Buscando..." : "Buscar"}
            </Button>
            {hasFilters && (
              <Button variant="outline" size="icon" onClick={handleClearFilters} disabled={isPending}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
