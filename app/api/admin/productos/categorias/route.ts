import { NextResponse } from "next/server";
import prisma from "@/lib/db";

/** GET /api/admin/productos/categorias — devuelve todas las categorías */
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    // Mapeamos al formato que espera el frontend
    const mappedCategories = categories.map((c) => ({
      _id: c.id,
      name: c.name,
    }));

    return NextResponse.json(mappedCategories);
  } catch (error) {
    console.error("Error leyendo categorías de la DB:", error);
    return NextResponse.json([], { status: 200 });
  }
}

/** POST /api/admin/productos/categorias — crea una nueva categoría */
export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name)
      return NextResponse.json(
        { error: "Nombre es obligatorio" },
        { status: 400 },
      );

    const category = await prisma.category.create({
      data: { name },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error creando categoría:", error);
    return NextResponse.json({ error: "No se pudo crear" }, { status: 500 });
  }
}

/** DELETE /api/admin/productos/categorias?id=XXX — elimina una categoría */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json({ error: "ID faltante" }, { status: 400 });

    // Primero verificamos si hay productos usando esta categoría
    const count = await prisma.product.count({ where: { categoryId: id } });
    if (count > 0) {
      return NextResponse.json(
        { error: "Hay productos usando esta categoría" },
        { status: 400 },
      );
    }

    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error eliminando categoría:", error);
    return NextResponse.json({ error: "No se pudo eliminar" }, { status: 500 });
  }
}
