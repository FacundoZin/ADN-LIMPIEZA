import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { urlFor } from "@/lib/sanity/client"
import type { Product } from "@/lib/sanity/types"
import { Package, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {products.map((product, index) => {
        const category = product.category as any
        const imageUrl = product.image
          ? urlFor(product.image).width(400).height(400).url()
          : null

        return (
          <article
            key={product._id}
            className={cn(
              "group flex flex-col h-full bg-card rounded-xl overflow-hidden",
              "border border-border/40 hover:border-primary/40",
              "shadow-sm hover:shadow-md",
              "transition-all duration-300",
              "animate-fade-up"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Image Container */}
            <Link href={`/productos/${product._id}`} className="block relative aspect-square overflow-hidden bg-muted/20">
              {imageUrl ? (
                <>
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-10 w-10 text-muted-foreground/30" />
                </div>
              )}

              {/* Category Badge - Minimalist */}
              {category && (
                <div className="absolute top-2 left-2 z-10">
                  <Badge
                    variant="secondary"
                    className="bg-background/90 backdrop-blur text-xs font-normal px-2 py-0.5 shadow-sm border-0"
                  >
                    {category.name}
                  </Badge>
                </div>
              )}
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-1 p-3.5">
              <Link href={`/productos/${product._id}`} className="block group/title">
                <h3 className="font-medium text-sm sm:text-base leading-tight mb-1.5 text-foreground group-hover/title:text-primary transition-colors">
                  {product.name}
                </h3>
              </Link>

              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {product.shortDescription || product.longDescription}
              </p>

              {/* Optional: Add price or CTA here if needed specifically, otherwise keep clean */}
            </div>
          </article>
        )
      })}
    </div>
  )
}
