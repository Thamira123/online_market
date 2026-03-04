<template>
  <section class="space-y-6">
    <!-- Banner -->
    <HeroCarousel />

    <!-- Category bar under banner -->
    <CategoryBar
      :categories="categories"
      :active="selectedCategory"
      @select="onSelectCategory"
    />

    <!-- Products section -->
    <div class="mx-auto max-w-7xl space-y-4 px-4">
      <div
        class="flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:flex-row md:items-center md:justify-between"
      >
        <div class="text-sm text-gray-700 dark:text-gray-200">
          <span class="font-semibold">Showing:</span>
          <span v-if="selectedCategory" class="ml-1">{{ selectedCategory }}</span>
          <span v-else class="ml-1">All products</span>
        </div>

        <div class="flex items-center gap-2">
          <label class="text-sm font-semibold">Sort:</label>
          <select
            v-model="sortMode"
            class="rounded-xl border bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950"
          >
            <option value="default">Default</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="rating_desc">Rating: High → Low</option>
          </select>

          <button
            class="rounded-xl border bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800"
            type="button"
            @click="resetAll"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- error -->
      <div
        v-if="error"
        class="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
      >
        {{ error }}
      </div>

      <!-- loading -->
      <div v-if="loading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="n in 8"
          :key="n"
          class="h-72 animate-pulse rounded-2xl border bg-white dark:border-gray-800 dark:bg-gray-900"
        ></div>
      </div>

      <!-- products -->
      <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="p in sortedProducts"
          :key="p.id"
          class="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
        >
          <RouterLink :to="`/product/${p.id}`" class="block">
            <div class="aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                :src="p.thumbnail"
                :alt="p.title"
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </RouterLink>

          <div class="p-4">
            <RouterLink :to="`/product/${p.id}`" class="block">
              <h3 class="line-clamp-1 font-semibold text-gray-900 dark:text-gray-100">
                {{ p.title }}
              </h3>
              <p class="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                {{ p.description }}
              </p>
            </RouterLink>

            <div class="mt-3 flex items-center justify-between">
              <span class="text-lg font-extrabold text-orange-600">${{ p.price }}</span>
              <span class="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700">
                ⭐ {{ p.rating }}
              </span>
            </div>

            <button
              class="mt-3 w-full rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              type="button"
              @click="cart.add(p, 1)"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mixed deals section (scroll down more items) -->
    <div class="mx-auto max-w-7xl px-4 pb-10">
      <MixedDeals />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { RouterLink } from "vue-router"

import HeroCarousel from "../components/HeroCarousel.vue"
import CategoryBar from "../components/CategorySidebar.vue"
import MixedDeals from "../components/MixedDeals.vue"

import type { Product } from "../types/product"
import type { Category } from "../lib/api"
import { getCategories, getProducts, getProductsByCategory } from "../lib/api"
import { useCartStore } from "../stores/cart"

const cart = useCartStore()

const categories = ref<Category[]>([])
const products = ref<Product[]>([])
const selectedCategory = ref<string>("")

const loading = ref(false)
const error = ref<string | null>(null)

const sortMode = ref<"default" | "price_asc" | "price_desc" | "rating_desc">("default")

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
    if (selectedCategory.value) {
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

function onSelectCategory(slug: string) {
  selectedCategory.value = slug
  sortMode.value = "default"
  loadProducts()
}

function resetAll() {
  selectedCategory.value = ""
  sortMode.value = "default"
  loadProducts()
}

onMounted(async () => {
  await loadCategories()
  await loadProducts()
})
</script>