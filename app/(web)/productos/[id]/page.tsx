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
} from "@/lib/db/queries";
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
    description: product.shortDescription || product.longDescription,
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
    <div className="min-h-screen pb-12 pt-28 lg:pt-32">
      <div className="container mx-auto px-4">

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20">
          {/* Product Image */}
          <div className="lg:col-span-5 aspect-square relative overflow-hidden rounded-2xl bg-muted shadow-sm">
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
          <div className="flex flex-col lg:col-span-7 h-full">
            <div>
              <div className="flex items-center justify-between mb-6">
                {category ? (
                  <Badge variant="secondary" className="w-fit px-3 py-1">
                    <Tag className="mr-1 h-3 w-3" />
                    {category.name}
                  </Badge>
                ) : <div />}

                <Link
                  href="/productos"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  Volver a Productos
                  <ArrowLeft className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 rotate-180" />
                </Link>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance tracking-tight text-foreground/90">
                {product.name}
              </h1>

              <div className="prose prose-lg max-w-none prose-neutral dark:prose-invert">
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {product.longDescription}
                </p>
              </div>
            </div>

            {/* CTA Buttons & Features */}
            <div className="mt-auto space-y-8 pt-8">
              <div className="flex flex-col sm:flex-row gap-4">
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

              {/* Product Features moved below */}
            </div>
          </div>
        </div>

        {/* Product Features */}
        <Card className="mt-12 mb-8 border-none shadow-sm bg-muted/30">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">
              Características del producto
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-muted-foreground text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1 min-w-[1rem]">✓</span>
                <span>Calidad profesional garantizada</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1 min-w-[1rem]">✓</span>
                <span>Fórmula efectiva y segura</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1 min-w-[1rem]">✓</span>
                <span>Resultados visibles desde el primer uso</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1 min-w-[1rem]">✓</span>
                <span>Ideal para uso doméstico y profesional</span>
              </li>
            </ul>
          </CardContent>
        </Card>


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
