<template>
  <div class="border-b bg-white dark:bg-gray-950 dark:border-gray-800">
    <div class="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
      <!-- All Categories dropdown -->
      <div class="relative" @mouseenter="open = true" @mouseleave="open = false">
        <button
          class="flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50 dark:bg-gray-950 dark:border-gray-800 dark:hover:bg-gray-800"
          type="button"
        >
          ☰ All Categories
          <span class="text-xs opacity-70">▼</span>
        </button>

        <div
          v-if="open"
          class="absolute left-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border bg-white shadow-lg dark:bg-gray-950 dark:border-gray-800"
        >
          <button
            class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
            :class="active === '' ? 'bg-orange-50 text-orange-700 dark:bg-gray-800' : ''"
            type="button"
            @click="$emit('select', '')"
          >
            All products
          </button>

          <button
            v-for="c in categories"
            :key="categoryToSlug(c)"
            class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
            :class="active === categoryToSlug(c) ? 'bg-orange-50 text-orange-700 dark:bg-gray-800' : ''"
            type="button"
            @click="$emit('select', categoryToSlug(c))"
          >
            {{ categoryToLabel(c) }}
          </button>
        </div>
      </div>

      <!-- Quick category chips (top 8) -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="c in topCats"
          :key="categoryToSlug(c)"
          class="rounded-full px-3 py-1.5 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
          :class="active === categoryToSlug(c) ? 'bg-orange-100 text-orange-700 dark:bg-gray-800' : 'bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-200'"
          type="button"
          @click="$emit('select', categoryToSlug(c))"
        >
          {{ categoryToLabel(c) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from "../lib/api"
import { categoryToLabel, categoryToSlug } from "../lib/api"
import { computed, ref } from "vue"

const props = defineProps<{
  categories: Category[]
  active: string
}>()

defineEmits<{
  (e: "select", categorySlug: string): void
}>()

const open = ref(false)

const topCats = computed(() => props.categories.slice(0, 8))
</script>