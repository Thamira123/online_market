import type { Product, ProductsResponse } from "../types/product"

const BASE = "https://dummyjson.com"

export type Category =
  | string
  | { slug: string; name: string; url?: string }

// -------------------------------
// Safe fetch helper
// -------------------------------
async function safeFetch<T>(url: string): Promise<T> {
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }

  return (await res.json()) as T
}

// -------------------------------
// Get all categories
// -------------------------------
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE}/products/categories`)

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }

  return (await res.json()) as Category[]
}

// -------------------------------
// Convert category to slug
// Example: "beauty"
// -------------------------------
export function categoryToSlug(c: Category): string {
  return typeof c === "string" ? c : c.slug
}

// -------------------------------
// Convert category to label
// Example: "Beauty"
// -------------------------------
export function categoryToLabel(c: Category): string {
  return typeof c === "string" ? c : c.name
}

// -------------------------------
// Get all products
// -------------------------------
export function getProducts(limit = 24): Promise<ProductsResponse> {
  return safeFetch<ProductsResponse>(
    `${BASE}/products?limit=${limit}`
  )
}

// -------------------------------
// Search products
// -------------------------------
export function searchProducts(q: string): Promise<ProductsResponse> {
  return safeFetch<ProductsResponse>(
    `${BASE}/products/search?q=${encodeURIComponent(q)}`
  )
}

// -------------------------------
// Get products by category
// Example: beauty / laptops
// -------------------------------
export function getProductsByCategory(
  categorySlug: string
): Promise<ProductsResponse> {
  return safeFetch<ProductsResponse>(
    `${BASE}/products/category/${encodeURIComponent(categorySlug)}`
  )
}

// -------------------------------
// Get single product
// -------------------------------
export function getProduct(id: string | number): Promise<Product> {
  return safeFetch<Product>(
    `${BASE}/products/${id}`
  )
}