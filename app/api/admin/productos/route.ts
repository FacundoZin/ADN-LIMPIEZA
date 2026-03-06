import { NextResponse } from "next/server";
import prisma from "@/lib/db";

/** GET /api/admin/productos — devuelve todos los productos de la base de datos local */
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    // Mapeamos al formato que espera el frontend
    const mappedProducts = products.map((p) => ({
      _id: p.id,
      name: p.name,
      shortDescription: p.shortDescription,
      category: p.category
        ? { _id: p.categoryId, name: p.category.name }
        : null,
      imageUrl: p.imageUrl,
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
    const { name, shortDescription, longDescription, categoryId, imageUrl } =
      body;

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
        imageUrl,
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
