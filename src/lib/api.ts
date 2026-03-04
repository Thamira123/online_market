import type { Product, ProductsResponse } from "../types/product"

const BASE = "https://dummyjson.com"

export type Category =
  | string
  | { slug: string; name: string; url?: string }

async function safeFetch<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return (await res.json()) as T
}

// ✅ Categories can be string[] OR object[] (new API format)
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE}/products/categories`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return (await res.json()) as Category[]
}

// ✅ Convert category to slug for URL (beauty, furniture, groceries...)
export function categoryToSlug(c: Category): string {
  return typeof c === "string" ? c : c.slug
}

// ✅ Convert category to display label (Beauty, Furniture, Groceries...)
export function categoryToLabel(c: Category): string {
  return typeof c === "string" ? c : c.name
}

export function getProducts(limit = 24): Promise<ProductsResponse> {
  return safeFetch<ProductsResponse>(`${BASE}/products?limit=${limit}`)
}

export function searchProducts(q: string): Promise<ProductsResponse> {
  return safeFetch<ProductsResponse>(`${BASE}/products/search?q=${encodeURIComponent(q)}`)
}

export function getProductsByCategory(categorySlug: string): Promise<ProductsResponse> {
  return safeFetch<ProductsResponse>(
    `${BASE}/products/category/${encodeURIComponent(categorySlug)}`
  )
}

export function getProduct(id: string | number): Promise<Product> {
  return safeFetch<Product>(`${BASE}/products/${id}`)
}