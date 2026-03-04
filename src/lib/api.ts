import type { Product, ProductsResponse } from "../types/product"

const BASE_URL = "https://dummyjson.com"

async function safeFetch<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`)
  }
  return (await res.json()) as T
}

export function fetchProducts(limit = 30): Promise<ProductsResponse> {
  return safeFetch<ProductsResponse>(`${BASE_URL}/products?limit=${limit}`)
}

export function searchProducts(query: string): Promise<ProductsResponse> {
  return safeFetch<ProductsResponse>(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`)
}

export function fetchProductById(id: number): Promise<Product> {
  return safeFetch<Product>(`${BASE_URL}/products/${id}`)
}

export function fetchCategories(): Promise<string[]> {
  return safeFetch<string[]>(`${BASE_URL}/products/categories`)
}

export function fetchProductsByCategory(category: string): Promise<ProductsResponse> {
  return safeFetch<ProductsResponse>(`${BASE_URL}/products/category/${encodeURIComponent(category)}`)
}