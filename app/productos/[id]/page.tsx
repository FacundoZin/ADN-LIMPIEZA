import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import {
  getProductById,
  getProductsWithCategories,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import { WHATSAPP_MESSAGES } from "@/lib/whatsapp";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  return {
    title: `${product.name} - Limpieza Profesional`,
    description: product.description,
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const category = product.category as any;
  const imageUrl = product.image
    ? urlFor(product.image).width(800).height(800).url()
    : null;

  // Obtener productos relacionados de la misma categoría
  const allProducts = await getProductsWithCategories();
  const relatedProducts = allProducts
    .filter(
      (p) => p._id !== product._id && (p.category as any)?._id === category?._id
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/productos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Productos
          </Link>
        </Button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="aspect-square relative overflow-hidden rounded-xl bg-muted">
            {imageUrl ? (
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="h-32 w-32 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {category && (
              <Badge variant="secondary" className="w-fit mb-4">
                <Tag className="mr-1 h-3 w-3" />
                {category.name}
              </Badge>
            )}

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              {product.name}
            </h1>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                {product.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <WhatsAppButton
                message={WHATSAPP_MESSAGES.product(product.name)}
                size="lg"
                className="flex-1"
              >
                Consultar por WhatsApp
              </WhatsAppButton>
              <Button variant="outline" size="lg" asChild>
                <Link href="/productos">Ver más productos</Link>
              </Button>
            </div>

            {/* Product Features */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">
                  Características del producto
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Calidad profesional garantizada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Fórmula efectiva y segura</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Resultados visibles desde el primer uso</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Ideal para uso doméstico y profesional</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Productos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const relatedImageUrl = relatedProduct.image
                  ? urlFor(relatedProduct.image).width(400).height(400).url()
                  : null;

                return (
                  <Link
                    key={relatedProduct._id}
                    href={`/productos/${relatedProduct._id}`}
                    className="group"
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                      <div className="aspect-square relative overflow-hidden bg-muted">
                        {relatedImageUrl ? (
                          <img
                            src={relatedImageUrl || "/placeholder.svg"}
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-16 w-16 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedProduct.name}
                        </h3>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
