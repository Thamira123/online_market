<template>
  <section class="space-y-5">
    <!-- Top controls -->
    <div class="rounded-2xl bg-white p-4 shadow-sm">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl font-extrabold">Flash Deals</h1>
          <p class="text-sm text-gray-600">Search, filter, and click any item to see details.</p>
        </div>

        <div class="flex w-full flex-col gap-2 md:w-auto md:flex-row">
          <input
            v-model="searchText"
            type="text"
            placeholder="Search products…"
            class="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring md:w-72"
            @keyup.enter="doSearch"
          />
          <button
            class="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            @click="doSearch"
          >
            Search
          </button>
          <button
            class="rounded-xl border bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50"
            @click="resetAll"
          >
            Reset
          </button>
        </div>
      </div>

      <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-2">
          <span class="text-sm font-semibold">Category</span>
          <select
            v-model="selectedCategory"
            class="rounded-xl border bg-white px-3 py-2 text-sm"
            @change="filterByCategory"
          >
            <option value="">All</option>
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <div class="text-sm text-gray-600">
          <span v-if="loading">Loading…</span>
          <span v-else>{{ products.length }} items</span>
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-if="error" class="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
      {{ error }}
    </div>

    <!-- Loading skeletons -->
    <div v-if="loading" class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="n in 8" :key="n" class="h-72 animate-pulse rounded-2xl border bg-white"></div>
    </div>

    <!-- Product grid -->
    <div v-else class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import ProductCard from "../components/ProductCard.vue"
import type { Product, ProductsResponse } from "../types/product"

const products = ref<Product[]>([])
const categories = ref<string[]>([])
const selectedCategory = ref<string>("")
const searchText = ref<string>("")
const loading = ref<boolean>(false)
const error = ref<string | null>(null)

async function safeFetch<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return (await res.json()) as T
}

async function loadInitial() {
  loading.value = true
  error.value = null
  try {
    const [cats, prod] = await Promise.all([
      safeFetch<string[]>("https://dummyjson.com/products/categories"),
      safeFetch<ProductsResponse>("https://dummyjson.com/products?limit=40"),
    ])
    categories.value = cats
    products.value = prod.products
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Failed to load products"
  } finally {
    loading.value = false
  }
}

async function doSearch() {
  const q = searchText.value.trim()
  if (!q) return
  loading.value = true
  error.value = null
  try {
    selectedCategory.value = ""
    const res = await safeFetch<ProductsResponse>(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}`
    )
    products.value = res.products
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Search failed"
  } finally {
    loading.value = false
  }
}

async function filterByCategory() {
  loading.value = true
  error.value = null
  try {
    searchText.value = ""
    if (!selectedCategory.value) {
      await loadInitial()
      return
    }
    const res = await safeFetch<ProductsResponse>(
      `https://dummyjson.com/products/category/${encodeURIComponent(selectedCategory.value)}`
    )
    products.value = res.products
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Filter failed"
  } finally {
    loading.value = false
  }
}

async function resetAll() {
  selectedCategory.value = ""
  searchText.value = ""
  await loadInitial()
}

onMounted(loadInitial)
</script>