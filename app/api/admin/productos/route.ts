import { NextResponse } from "next/server";
import prisma from "@/lib/db";

/** GET /api/admin/productos — devuelve todos los productos de la base de datos local */
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true, images: true },
      orderBy: { createdAt: "desc" },
    });

    // Mapeamos al formato que espera el frontend
    const mappedProducts = products.map((p) => ({
      _id: p.id,
      name: p.name,
      shortDescription: p.shortDescription,
      longDescription: p.longDescription,
      category: p.category
        ? { _id: p.categoryId, name: p.category.name }
        : null,
      images:
        p.images?.map((img: any) => ({
          url: img.url,
          isPrimary: img.isPrimary,
        })) || [],
      imageUrl:
        p.images?.find((img: any) => img.isPrimary)?.url ||
        p.images?.[0]?.url ||
        null,
    }));

    return NextResponse.json(mappedProducts);
  } catch (error) {
    console.error("Error leyendo productos de la DB:", error);
    return NextResponse.json([], { status: 200 });
  }
}

/** POST /api/admin/productos — crea un nuevo producto en la DB local */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      shortDescription,
      longDescription,
      categoryId,
      images,
      imageUrl,
    } = body;

    if (!name || !categoryId) {
      return NextResponse.json(
        { error: "Nombre y Categoría son obligatorios" },
        { status: 400 },
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        shortDescription,
        longDescription,
        categoryId,
        images:
          images && images.length > 0
            ? {
                create: images.map((img: any) => ({
                  url: img.url,
                  isPrimary: img.isPrimary,
                })),
              }
            : undefined,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creando producto:", error);
    return NextResponse.json(
      { error: "No se pudo crear el producto" },
      { status: 500 },
    );
  }
}
