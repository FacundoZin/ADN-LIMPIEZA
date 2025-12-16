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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => {
        const category = product.category as any
        const imageUrl = product.image 
          ? urlFor(product.image).width(600).height(600).url() 
          : null

        return (
          <article
            key={product._id}
            className={cn(
              "group relative bg-card rounded-2xl overflow-hidden",
              "border border-border/50 hover:border-primary/30",
              "shadow-soft hover:shadow-soft-xl",
              "transition-all duration-500 hover:-translate-y-1",
              "animate-fade-up"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5 transition-opacity duration-500 pointer-events-none z-10" />
            
            {/* Image Container */}
            <Link href={`/productos/${product._id}`} className="block">
              <div className="relative aspect-square overflow-hidden bg-muted/30">
                {imageUrl ? (
                  <>
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    
                    {/* Dark gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                )}
                
                {/* Category Badge */}
                {category && (
                  <Badge 
                    className={cn(
                      "absolute top-4 left-4 z-20",
                      "bg-white/90 dark:bg-black/70 text-foreground",
                      "backdrop-blur-sm border-0 shadow-sm",
                      "font-medium"
                    )}
                  >
                    {category.name}
                  </Badge>
                )}
                
                {/* Quick action button on hover */}
                <div className="absolute inset-x-4 bottom-4 z-20 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                  <Button 
                    size="sm" 
                    className="w-full shadow-lg gap-2"
                  >
                    Ver Detalles
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Link>

            {/* Content */}
            <div className="p-5">
              <Link href={`/productos/${product._id}`} className="block group/title">
                <h3 className="heading-md mb-2 line-clamp-2 group-hover/title:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
              </Link>
              
              <p className="body-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
