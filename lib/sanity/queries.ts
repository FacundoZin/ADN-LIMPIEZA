import { sanityClient } from "./client";
import type { Product, Category, CarouselImage } from "./types";

// Obtener todos los productos
export async function getAllProducts(): Promise<Product[]> {
  try {
    const query = `*[_type == "product"] | order(_createdAt desc) {
      _id,
      _type,
      name,
      shortDescription,
      longDescription,
      image,
      category
    }`;
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

// Obtener productos con información de categoría expandida
export async function getProductsWithCategories(): Promise<Product[]> {
  try {
    const query = `*[_type == "product"] | order(_createdAt desc) {
      _id,
      _type,
      name,
      shortDescription,
      longDescription,
      image,
      "category": category->{
        _id,
        "name": title
      }
    }`;
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching products with categories:", error);
    return [];
  }
}

// Obtener un producto por ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const query = `*[_type == "product" && _id == $id][0] {
      _id,
      _type,
      name,
      shortDescription,
      longDescription,
      image,
      "category": category->{
        _id,
        "name": title
      }
    }`;
    return await sanityClient.fetch(query, { id });
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
}

// Buscar productos por nombre
export async function searchProducts(searchTerm: string): Promise<Product[]> {
  const query = `*[_type == "product" && name match $searchTerm] | order(_createdAt desc) {
    _id,
    _type,
    name,
    shortDescription,
    longDescription,
    image,
    "category": category->{
      _id,
      "name": title
    }
  }`;
  return await sanityClient.fetch(query, { searchTerm: `*${searchTerm}*` });
}

// Obtener productos por categoría
export async function getProductsByCategory(
  categoryId: string
): Promise<Product[]> {
  const query = `*[_type == "product" && category._ref == $categoryId] | order(_createdAt desc) {
    _id,
    _type,
    name,
    shortDescription,
    longDescription,
    image,
    "category": category->{
      _id,
      "name": title
    }
  }`;
  return await sanityClient.fetch(query, { categoryId });
}

// Obtener todas las categorías
export async function getAllCategories(): Promise<Category[]> {
  try {
    const query = `*[_type == "category"] | order(title asc) {
      _id,
      _type,
      "name": title
    }`;
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
}

// Obtener imágenes del carrusel para la página de inicio
export async function getHomeCarouselImages(): Promise<CarouselImage[]> {
  try {
    const query = `*[_type == "carouselImage" && showInHome == true] | order(_createdAt desc) {
      _id,
      _type,
      title,
      image
    }`;
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching home carousel images:", error);
    return [];
  }
}

// Obtener imágenes para la página "Sobre Nosotros"
export async function getAboutImages(): Promise<CarouselImage[]> {
  try {
    const query = `*[_type == "carouselImage" && showInAbout == true] | order(_createdAt desc) {
      _id,
      _type,
      title,
      image
    }`;
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching about images:", error);
    return [];
  }
}
