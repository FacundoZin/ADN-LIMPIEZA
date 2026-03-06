import prisma from "../db";

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  shortDescription?: string;
  longDescription?: string;
  imageUrl?: string;
  category?: Category;
  categoryId: string;
}

export interface CarouselImage {
  id: string;
  url: string;
  alt?: string;
}

// Mapping from Prisma to simplified types
function mapProduct(p: any): Product {
  return {
    id: p.id,
    name: p.name,
    shortDescription: p.shortDescription || undefined,
    longDescription: p.longDescription || undefined,
    imageUrl: p.imageUrl || undefined,
    category: p.category
      ? {
          id: p.category.id,
          name: p.category.name,
        }
      : undefined,
    categoryId: p.categoryId,
  };
}

function mapCategory(c: any): Category {
  return {
    id: c.id,
    name: c.name,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return products.map(mapProduct);
}

export async function getProductsWithCategories(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return products.map(mapProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
  return product ? mapProduct(product) : null;
}

export async function searchProducts(searchTerm: string): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: searchTerm } },
        { shortDescription: { contains: searchTerm } },
      ],
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return products.map(mapProduct);
}

export async function getAllCategories(): Promise<Category[]> {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
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
