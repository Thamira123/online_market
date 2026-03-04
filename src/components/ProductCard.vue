<template>
  <router-link
    :to="`/product/${product.id}`"
    class="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
  >
    <img
      :src="product.thumbnail"
      class="w-full h-48 object-cover"
    />

    <div class="p-4">
      <h3 class="font-semibold text-lg line-clamp-1">
        {{ product.title }}
      </h3>

      <p class="text-gray-500 text-sm line-clamp-2">
        {{ product.description }}
      </p>

      <div class="flex justify-between items-center mt-3">
        <span class="text-orange-500 font-bold text-lg">
          ${{ product.price }}
        </span>

        <span class="text-yellow-500">
          ⭐ {{ product.rating }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Product } from "../types/product"

defineProps<{
  product: Product
}>()
</script>