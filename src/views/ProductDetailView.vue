<template>
  <div v-if="loading" class="text-gray-600">Loading…</div>

  <div v-else-if="error" class="text-red-600">
    {{ error }}
  </div>

  <div v-else-if="product" class="bg-white p-6 rounded-xl shadow">
    <h1 class="text-2xl font-bold">{{ product.title }}</h1>
    <img :src="product.thumbnail" class="w-full max-w-md rounded-lg mt-4" />
    <p class="text-gray-700 mt-4">{{ product.description }}</p>
    <p class="text-orange-500 text-xl font-bold mt-4">${{ product.price }}</p>

    <router-link to="/" class="inline-block mt-5 underline text-blue-600">
      Back to Home
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import type { Product } from "../types/product"

const route = useRoute()
const product = ref<Product | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const id = String(route.params.id)
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    if (!res.ok) throw new Error("Failed to load product")
    product.value = (await res.json()) as Product
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Unknown error"
  } finally {
    loading.value = false
  }
})
</script>