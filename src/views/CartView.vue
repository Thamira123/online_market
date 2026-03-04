<template>
  <section class="space-y-4">
    <div class="flex items-end justify-between">
      <div>
        <h1 class="text-2xl font-extrabold">Your Cart</h1>
        <p class="text-sm text-gray-600 dark:text-gray-300">Items saved in localStorage (persists after refresh).</p>
      </div>

      <button
        class="rounded-xl border bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50 dark:bg-gray-950 dark:border-gray-800 dark:hover:bg-gray-800"
        type="button"
        @click="cart.clear()"
        v-if="cart.items.length"
      >
        Clear
      </button>
    </div>

    <div v-if="!cart.items.length" class="rounded-2xl border bg-white p-6 dark:bg-gray-900 dark:border-gray-800">
      <p class="text-gray-700 dark:text-gray-200">Cart is empty.</p>
      <RouterLink to="/" class="mt-3 inline-block text-orange-600 font-semibold hover:underline">Go shopping →</RouterLink>
    </div>

    <div v-else class="grid gap-4 lg:grid-cols-3">
      <div class="lg:col-span-2 space-y-3">
        <div
          v-for="it in cart.items"
          :key="it.product.id"
          class="flex gap-4 rounded-2xl border bg-white p-4 dark:bg-gray-900 dark:border-gray-800"
        >
          <img :src="it.product.thumbnail" class="h-20 w-24 rounded-xl object-cover" />
          <div class="flex-1">
            <p class="font-semibold">{{ it.product.title }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300">${{ it.product.price }}</p>

            <div class="mt-2 flex items-center gap-2">
              <label class="text-sm">Qty:</label>
              <input
                type="number"
                min="1"
                class="w-20 rounded-xl border px-3 py-1 text-sm dark:bg-gray-950 dark:border-gray-800"
                :value="it.qty"
                @input="cart.setQty(it.product.id, Number(($event.target as HTMLInputElement).value))"
              />
              <button class="text-sm font-semibold text-red-600 hover:underline" @click="cart.remove(it.product.id)">
                Remove
              </button>
            </div>
          </div>

          <div class="font-extrabold text-orange-600">
            ${{ it.qty * it.product.price }}
          </div>
        </div>
      </div>

      <div class="rounded-2xl border bg-white p-4 shadow-sm dark:bg-gray-900 dark:border-gray-800">
        <h2 class="text-lg font-extrabold">Summary</h2>
        <div class="mt-3 flex items-center justify-between text-sm">
          <span>Items</span>
          <span class="font-semibold">{{ cart.count }}</span>
        </div>
        <div class="mt-2 flex items-center justify-between text-sm">
          <span>Total</span>
          <span class="text-lg font-extrabold text-orange-600">${{ cart.total }}</span>
        </div>

        <button
          class="mt-4 w-full rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          type="button"
        >
          Checkout (Demo)
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { useCartStore } from "../stores/cart"

const cart = useCartStore()
</script>