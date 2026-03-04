<template>
  <div class="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md dark:bg-gray-900 dark:border-gray-800">
    <RouterLink :to="`/product/${product.id}`" class="block">
      <div class="aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img :src="product.thumbnail" :alt="product.title" class="h-full w-full object-cover" loading="lazy" />
      </div>
    </RouterLink>

    <div class="p-4">
      <RouterLink :to="`/product/${product.id}`" class="block">
        <h3 class="line-clamp-1 font-semibold text-gray-900 dark:text-gray-100">{{ product.title }}</h3>
        <p class="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">{{ product.description }}</p>
      </RouterLink>

      <div class="mt-3 flex items-center justify-between">
        <span class="text-lg font-extrabold text-orange-600">${{ product.price }}</span>
        <span class="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700">
          ⭐ {{ product.rating }}
        </span>
      </div>

      <button
        class="mt-3 w-full rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        type="button"
        @click="$emit('add', product)"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import type { Product } from "../types/product"

defineProps<{ product: Product }>()
defineEmits<{ (e: "add", product: Product): void }>()
</script>