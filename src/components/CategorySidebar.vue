<template>
  <aside class="rounded-2xl border bg-white p-4 shadow-sm dark:bg-gray-900 dark:border-gray-800">
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-extrabold text-gray-900 dark:text-gray-100">
        Categories
      </h2>

      <button
        class="text-xs font-semibold text-orange-600 hover:underline"
        type="button"
        @click="$emit('select', '')"
      >
        Reset
      </button>
    </div>

    <div class="mt-3 space-y-1">
      <button
        class="w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
        :class="active === '' ? 'bg-orange-50 text-orange-700 dark:bg-gray-800' : 'text-gray-700 dark:text-gray-100'"
        type="button"
        @click="$emit('select', '')"
      >
        All products
      </button>

      <button
        v-for="c in categories"
        :key="categoryToSlug(c)"
        class="w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
        :class="active === categoryToSlug(c) ? 'bg-orange-50 text-orange-700 dark:bg-gray-800' : 'text-gray-700 dark:text-gray-100'"
        type="button"
        @click="$emit('select', categoryToSlug(c))"
      >
        {{ categoryToLabel(c) }}
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Category } from "../lib/api"
import { categoryToLabel, categoryToSlug } from "../lib/api"

defineProps<{
  categories: Category[]
  active: string
}>()

defineEmits<{
  (e: "select", categorySlug: string): void
}>()
</script>