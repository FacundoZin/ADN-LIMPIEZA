import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No se encontró ningún archivo" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generar nombre de archivo único
        const ext = file.name.split(".").pop();
        const fileName = `${uuidv4()}.${ext}`;

        // Ruta absoluta para guardar el archivo
        const uploadDir = join(process.cwd(), "public", "uploads");
        const path = join(uploadDir, fileName);

        await writeFile(path, buffer);
        console.log(`Archivo guardado en: ${path}`);

        // Devolver la URL relativa para guardar en la DB
        return NextResponse.json({ url: `/uploads/${fileName}` });
    } catch (error) {
        console.error("Error al subir archivo:", error);
        return NextResponse.json({ error: "No se pudo subir la imagen" }, { status: 500 });
    }
}
