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
  categoryId: string;
  category?: Category;
  images?: { url: string; isPrimary: boolean }[];
}

export interface CarouselImage {
  id: string;
  url: string;
  alt?: string;
}

// Mapping from Prisma to simplified types
function mapProduct(p: any): Product {
  const images =
    p.images?.map((img: any) => ({
      url: img.url,
      isPrimary: img.isPrimary,
    })) || [];

  // Find the primary image or use the first one as fallback for imageUrl
  const primaryImage = images.find((img: any) => img.isPrimary) || images[0];
  const imageUrl = primaryImage?.url || p.imageUrl || undefined;

  return {
    id: p.id,
    name: p.name,
    shortDescription: p.shortDescription || undefined,
    longDescription: p.longDescription || undefined,
    categoryId: p.categoryId,
    category: p.category
      ? {
          id: p.category.id,
          name: p.category.name,
        }
      : undefined,
    images: images,
    imageUrl: imageUrl,
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
    include: { category: true, images: true },
    orderBy: { createdAt: "desc" },
  });
  return products.map(mapProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true, images: true },
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
    include: { category: true, images: true },
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
  const products = await prisma.product.findMany({
    include: { images: true },
    orderBy: { createdAt: "desc" },
  });

  const carouselImages: CarouselImage[] = [];
  products.forEach((p: any) => {
    const primaryPics = p.images?.filter((img: any) => img.isPrimary) || [];
    primaryPics.forEach((img: any) => {
      carouselImages.push({
        id: img.id,
        url: img.url,
        alt: p.name,
      });
    });
  });

  return carouselImages;
}

export async function getAboutImages(): Promise<CarouselImage[]> {
  return [];
}
