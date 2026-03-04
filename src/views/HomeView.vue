<template>
  <section class="space-y-6">
    <!-- Hero -->
    <div
      class="overflow-hidden rounded-3xl bg-gradient-to-r from-pink-200 via-orange-100 to-pink-100 p-6 shadow-sm dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
    >
      <h1 class="text-3xl font-extrabold tracking-tight">Today’s deals</h1>
      <p class="mt-2 text-sm text-gray-700 dark:text-gray-300">
        Search, filter by category, sort products, and add to cart.
      </p>
    </div>

    <div class="grid gap-6 lg:grid-cols-12">
      <!-- Sidebar -->
      <div class="lg:col-span-3 lg:sticky lg:top-28 h-fit">
        <CategorySidebar
          :categories="categories"
          :active="selectedCategory"
          @select="onSelectCategory"
        />
      </div>

      <!-- Main -->
      <div class="lg:col-span-9 space-y-4">
        <!-- Controls -->
        <div
          class="flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-sm dark:bg-gray-900 dark:border-gray-800 md:flex-row md:items-center md:justify-between"
        >
          <div class="text-sm text-gray-600 dark:text-gray-300">
            <span v-if="activeLabel"><span class="font-semibold">Showing:</span> {{ activeLabel }}</span>
            <span v-else>Showing: All products</span>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <label class="text-sm font-semibold">Sort:</label>
            <select
              v-model="sortMode"
              class="rounded-xl border bg-white px-3 py-2 text-sm dark:bg-gray-950 dark:border-gray-800"
            >
              <option value="default">Default</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
              <option value="rating_desc">Rating: High → Low</option>
            </select>

            <button
              class="rounded-xl border bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50 dark:bg-gray-950 dark:border-gray-800 dark:hover:bg-gray-800"
              type="button"
              @click="resetAll"
            >
              Reset
            </button>
          </div>
        </div>

        <!-- Error -->
        <div
          v-if="error"
          class="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {{ error }}
        </div>

        <!-- Loading -->
        <div v-if="loading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="n in 9"
            :key="n"
            class="h-72 animate-pulse rounded-2xl border bg-white dark:bg-gray-900 dark:border-gray-800"
          ></div>
        </div>

        <!-- Products -->
        <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCard
            v-for="p in sortedProducts"
            :key="p.id"
            :product="p"
            @add="addToCart"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import CategorySidebar from "../components/CategorySidebar.vue"
import ProductCard from "../components/ProductCard.vue"
import type { Product } from "../types/product"
import { getCategories, getProducts, getProductsByCategory, searchProducts } from "../lib/api"
import type { Category } from "../lib/api"
import { useCartStore } from "../stores/cart"

const props = defineProps<{ searchQ?: string }>()

const cart = useCartStore()

const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const selectedCategory = ref<string>("")

const sortMode = ref<"default" | "price_asc" | "price_desc" | "rating_desc">("default")

const loading = ref(false)
const error = ref<string | null>(null)

const activeLabel = computed(() => {
  if (props.searchQ) return `Search: "${props.searchQ}"`
  if (selectedCategory.value) return `Category: ${selectedCategory.value}`
  return ""
})

const sortedProducts = computed(() => {
  const arr = [...products.value]
  switch (sortMode.value) {
    case "price_asc":
      return arr.sort((a, b) => a.price - b.price)
    case "price_desc":
      return arr.sort((a, b) => b.price - a.price)
    case "rating_desc":
      return arr.sort((a, b) => b.rating - a.rating)
    default:
      return arr
  }
})

async function loadCategories() {
  try {
    categories.value = await getCategories()
  } catch {
    categories.value = []
  }
}

async function loadProducts() {
  loading.value = true
  error.value = null
  try {
    if (props.searchQ && props.searchQ.trim()) {
      selectedCategory.value = ""
      const res = await searchProducts(props.searchQ.trim())
      products.value = res.products
    } else if (selectedCategory.value) {
      const res = await getProductsByCategory(selectedCategory.value)
      products.value = res.products
    } else {
      const res = await getProducts(24)
      products.value = res.products
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Failed to fetch"
  } finally {
    loading.value = false
  }
}

function onSelectCategory(catSlug: string) {
  selectedCategory.value = catSlug
  loadProducts()
}

function resetAll() {
  selectedCategory.value = ""
  sortMode.value = "default"
  loadProducts()
}

function addToCart(p: Product) {
  cart.add(p, 1)
}

onMounted(async () => {
  await loadCategories()
  await loadProducts()
})

watch(
  () => props.searchQ,
  () => {
    sortMode.value = "default"
    loadProducts()
  }
)
</script>