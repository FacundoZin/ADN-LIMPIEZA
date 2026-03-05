import prisma from "./lib/db";

async function main() {
    const categories = ["Limpieza de Hogar", "Lavandería", "Desinfectantes", "Accesorios"];

    for (const name of categories) {
        await prisma.category.upsert({
            where: { id: name },
            update: {},
            create: { name, id: name },
        });
    }

    console.log("Categorías base creadas.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
