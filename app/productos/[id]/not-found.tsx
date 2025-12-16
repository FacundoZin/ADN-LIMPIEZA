import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PackageX } from "lucide-react"

export default function ProductNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <PackageX className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Producto no encontrado</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Lo sentimos, el producto que buscas no existe o ha sido eliminado.
        </p>
        <Button asChild size="lg">
          <Link href="/productos">Ver todos los productos</Link>
        </Button>
      </div>
    </div>
  )
}
