import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { urlFor } from "@/lib/sanity/client"
import type { Product } from "@/lib/sanity/types"
import { Package } from "lucide-react"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const category = product.category as any
        const imageUrl = product.image ? urlFor(product.image).width(400).height(400).url() : null

        return (
          <Card
            key={product._id}
            className="group overflow-hidden border-2 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <CardHeader className="p-0">
              <Link href={`/productos/${product._id}`}>
                <div className="aspect-square relative overflow-hidden bg-muted">
                  {imageUrl ? (
                    <>
                      <img
                        src={imageUrl || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-20 w-20 text-muted-foreground" />
                    </div>
                  )}
                  {category && (
                    <div className="absolute top-3 right-3">
                      <Badge className="shadow-lg bg-primary/90 backdrop-blur-sm">{category.name}</Badge>
                    </div>
                  )}
                </div>
              </Link>
            </CardHeader>

            <CardContent className="p-4">
              <Link href={`/productos/${product._id}`}>
                <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                  {product.name}
                </h3>
              </Link>

              <p className="text-sm text-muted-foreground line-clamp-3 text-pretty leading-relaxed">
                {product.description}
              </p>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button
                asChild
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground bg-transparent"
                variant="outline"
              >
                <Link href={`/productos/${product._id}`}>Ver Detalles</Link>
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
