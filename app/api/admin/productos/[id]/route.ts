import { NextResponse } from "next/server";
import prisma from "@/lib/db";

/** DELETE /api/admin/productos/[id] — elimina un producto de la base de datos local */
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    await prisma.product.delete({
      where: { id },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error eliminando producto de la DB:", error);
    return NextResponse.json(
      { ok: false, error: "No se pudo eliminar" },
      { status: 500 },
    );
  }
}

/** PUT /api/admin/productos/[id] — actualiza un producto en la base de datos local */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    const body = await req.json();
    const { name, shortDescription, longDescription, categoryId, images, imageUrl } =
      body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        shortDescription,
        longDescription,
        categoryId,
        images: images ? {
          deleteMany: {},
          create: images.map((img: any) => ({ url: img.url, isPrimary: img.isPrimary }))
        } : undefined,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error actualizando producto en la DB:", error);
    return NextResponse.json(
      { error: "No se pudo actualizar el producto" },
      { status: 500 },
    );
  }
}
