import { sanityClient } from "./client";
import type { Product, Category, CarouselImage } from "./types";

// Obtener todos los productos
export async function getAllProducts(): Promise<Product[]> {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    _type,
    name,
    description,
    image,
    category
  }`;
  return await sanityClient.fetch(query);
}

// Obtener productos con información de categoría expandida
export async function getProductsWithCategories(): Promise<Product[]> {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    _type,
    name,
    description,
    image,
    "category": category->{
      _id,
      "name": title
    }
  }`;
  return await sanityClient.fetch(query);
}

// Obtener un producto por ID
export async function getProductById(id: string): Promise<Product | null> {
  const query = `*[_type == "product" && _id == $id][0] {
    _id,
    _type,
    name,
    description,
    image,
    "category": category->{
      _id,
      "name": title
    }
  }`;
  return await sanityClient.fetch(query, { id });
}

// Buscar productos por nombre
export async function searchProducts(searchTerm: string): Promise<Product[]> {
  const query = `*[_type == "product" && name match $searchTerm] | order(_createdAt desc) {
    _id,
    _type,
    name,
    description,
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
    description,
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
  const query = `*[_type == "category"] | order(title asc) {
    _id,
    _type,
    "name": title
  }`;
  return await sanityClient.fetch(query);
}

// Obtener imágenes del carrusel para la página de inicio
export async function getHomeCarouselImages(): Promise<CarouselImage[]> {
  const query = `*[_type == "carouselImage" && showInHome == true] | order(_createdAt desc) {
    _id,
    _type,
    title,
    image
  }`;
  return await sanityClient.fetch(query);
}

// Obtener imágenes para la página "Sobre Nosotros"
export async function getAboutImages(): Promise<CarouselImage[]> {
  const query = `*[_type == "carouselImage" && showInAbout == true] | order(_createdAt desc) {
    _id,
    _type,
    title,
    image
  }`;
  return await sanityClient.fetch(query);
}
