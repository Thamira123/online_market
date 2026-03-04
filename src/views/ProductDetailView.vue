<template>
  <section class="space-y-4">
    <RouterLink to="/" class="text-sm text-gray-600 hover:underline dark:text-gray-300">
      ← Back to Home
    </RouterLink>

    <div v-if="loading" class="rounded-2xl border bg-white p-6 dark:bg-gray-900 dark:border-gray-800">
      Loading…
    </div>

    <div
      v-else-if="error"
      class="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
    >
      {{ error }}
    </div>

    <div
      v-else-if="product"
      class="grid gap-6 rounded-2xl border bg-white p-6 shadow-sm dark:bg-gray-900 dark:border-gray-800 lg:grid-cols-2"
    >
      <!-- Image -->
      <div class="overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
        <img
          :src="product.images?.[0] || product.thumbnail"
          :alt="product.title"
          class="h-full w-full object-cover"
        />
      </div>

      <!-- Info -->
      <div class="space-y-3">
        <h1 class="text-2xl font-extrabold">{{ product.title }}</h1>

        <p class="text-gray-700 dark:text-gray-200">
          {{ product.description }}
        </p>

        <div class="flex flex-wrap gap-2 text-sm">
          <span class="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
            Category: {{ product.category }}
          </span>
          <span class="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
            Brand: {{ product.brand }}
          </span>
          <span class="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
            ⭐ Rating: {{ product.rating }}
          </span>
          <span class="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
            Stock: {{ product.stock }}
          </span>
        </div>

        <div class="pt-2">
          <div class="text-3xl font-extrabold text-orange-600">
            ${{ product.price }}
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Discount: {{ product.discountPercentage }}%
          </div>
        </div>

        <!-- ✅ Add to Cart Button -->
        <button
          class="mt-4 w-full rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
          type="button"
          @click="cart.add(product, 1)"
        >
          Add to Cart
        </button>

        <!-- Go to cart -->
        <RouterLink
          to="/cart"
          class="block text-center text-sm font-semibold text-orange-600 hover:underline"
        >
          Go to Cart →
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, RouterLink } from "vue-router"
import type { Product } from "../types/product"
import { getProduct } from "../lib/api"
import { useCartStore } from "../stores/cart"

const route = useRoute()
const cart = useCartStore()

const product = ref<Product | null>(null)
const loading = ref<boolean>(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const id = String(route.params.id)
    product.value = await getProduct(id)
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Failed to load product"
  } finally {
    loading.value = false
  }
})
</script>