<template>
  <section class="space-y-4">
    <div class="flex items-end justify-between">
      <div>
        <h2 class="text-xl font-extrabold">More deals for you</h2>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          Mixed categories (beauty, groceries, furniture, laptops…)
        </p>
      </div>

      <button
        class="rounded-xl border bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50 dark:bg-gray-950 dark:border-gray-800 dark:hover:bg-gray-800"
        type="button"
        @click="load"
      >
        Refresh
      </button>
    </div>

    <div v-if="error" class="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
      {{ error }}
    </div>

    <div v-if="loading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="n in 8" :key="n" class="h-72 animate-pulse rounded-2xl border bg-white dark:bg-gray-900 dark:border-gray-800"></div>
    </div>

    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="p in mixed"
        :key="p.id"
        class="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md dark:bg-gray-900 dark:border-gray-800"
      >
        <RouterLink :to="`/product/${p.id}`" class="block">
          <div class="aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img :src="p.thumbnail" :alt="p.title" class="h-full w-full object-cover" loading="lazy" />
          </div>
        </RouterLink>

        <div class="p-4">
          <RouterLink :to="`/product/${p.id}`" class="block">
            <h3 class="line-clamp-1 font-semibold text-gray-900 dark:text-gray-100">{{ p.title }}</h3>
            <p class="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">{{ p.description }}</p>
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
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { RouterLink } from "vue-router"
import type { Product } from "../types/product"
import { getProductsByCategory } from "../lib/api"
import { useCartStore } from "../stores/cart"

const cart = useCartStore()

const loading = ref(false)
const error = ref<string | null>(null)
const mixed = ref<Product[]>([])

// ✅ choose categories you want to mix
const PICKED = ["beauty", "groceries", "furniture", "laptops"]

function shuffle<T>(arr: T[]) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]] as [T, T]
  }
  return a
}

async function load() {
  loading.value = true
  error.value = null

  try {
    const results = await Promise.all(
      PICKED.map(async (cat) => {
        const res = await getProductsByCategory(cat)
        return res.products.slice(0, 6) // take 6 from each category
      })
    )

    // mix them
    mixed.value = shuffle(results.flat()).slice(0, 16) // show 16 mixed cards
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Failed to fetch mixed deals"
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>