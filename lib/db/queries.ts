import prisma from "../db";
import type { Product, Category, CarouselImage } from "../sanity/types";

// Mapping from Prisma to Sanity-compatible types
function mapProduct(p: any): Product {
    return {
        _id: p.id,
        _type: "product",
        name: p.name,
        shortDescription: p.shortDescription || undefined,
        longDescription: p.longDescription || undefined,
        // If it's a Sanity ref style, we keep it, otherwise we could store a URL
        image: p.imageUrl ? { asset: { _ref: p.imageUrl, _type: "reference" } } : undefined,
        category: p.category ? { _ref: p.categoryId, _type: "reference", name: p.category.name } as any : { _ref: p.categoryId, _type: "reference" }
    };
}

function mapCategory(c: any): Category {
    return {
        _id: c.id,
        _type: "category",
        name: c.name
    };
}

export async function getAllProducts(): Promise<Product[]> {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
    });
    return products.map(mapProduct);
}

export async function getProductsWithCategories(): Promise<Product[]> {
    const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' }
    });
    return products.map(mapProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
        where: { id },
        include: { category: true }
    });
    return product ? mapProduct(product) : null;
}

export async function searchProducts(searchTerm: string): Promise<Product[]> {
    const products = await prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: searchTerm } },
                { shortDescription: { contains: searchTerm } }
            ]
        },
        include: { category: true },
        orderBy: { createdAt: 'desc' }
    });
    return products.map(mapProduct);
}

export async function getAllCategories(): Promise<Category[]> {
    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' }
    });
    return categories.map(mapCategory);
}

// Stubs for now
export async function getHomeCarouselImages(): Promise<CarouselImage[]> {
    return [];
}

export async function getAboutImages(): Promise<CarouselImage[]> {
    return [];
}
