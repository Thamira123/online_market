<template>
  <header class="sticky top-0 z-40">
    <div class="bg-orange-500 text-white">
      <div class="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <div class="text-lg font-extrabold tracking-wide">
          THAMI-SITHU ONLINE MARKET
        </div>

        <div class="ml-auto hidden w-full max-w-2xl items-center gap-2 rounded-full bg-white px-3 py-2 md:flex">
          <input
            v-model="q"
            class="w-full bg-transparent text-sm text-gray-900 outline-none"
            placeholder="Search products..."
            @keyup.enter="submitSearch"
          />
          <button
            class="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            type="button"
            @click="submitSearch"
          >
            Search
          </button>
        </div>

        <button
          class="rounded-full bg-white/15 px-3 py-2 text-sm font-semibold hover:bg-white/20"
          type="button"
          @click="onToggleTheme"
        >
          {{ themeLabel }}
        </button>

        <RouterLink
          to="/cart"
          class="rounded-full bg-white/15 px-3 py-2 text-sm font-semibold hover:bg-white/20"
        >
          Cart
          <span class="ml-2 rounded-full bg-black px-2 py-0.5 text-xs">{{ cart.count }}</span>
        </RouterLink>
      </div>

      <div class="mx-auto max-w-7xl px-4 pb-3 md:hidden">
        <div class="flex items-center gap-2 rounded-full bg-white px-3 py-2">
          <input
            v-model="q"
            class="w-full bg-transparent text-sm text-gray-900 outline-none"
            placeholder="Search products..."
            @keyup.enter="submitSearch"
          />
          <button class="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white" type="button" @click="submitSearch">
            Go
          </button>
        </div>
      </div>
    </div>

    <div class="border-b bg-white dark:bg-gray-950 dark:border-gray-800">
      <div class="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <nav class="text-sm font-semibold text-gray-700 dark:text-gray-200">
          <RouterLink class="hover:text-orange-600" to="/">Home</RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { RouterLink } from "vue-router"
import { useCartStore } from "../stores/cart"
import { applyTheme, getTheme, toggleTheme, type ThemeMode } from "../lib/theme"

const emit = defineEmits<{
  (e: "search", q: string): void
}>()

const cart = useCartStore()
const q = ref("")
const theme = ref<ThemeMode>("light")

const themeLabel = computed(() => (theme.value === "dark" ? "Light Mode" : "Dark Mode"))

function submitSearch() {
  emit("search", q.value.trim())
}

function onToggleTheme() {
  theme.value = toggleTheme()
}

onMounted(() => {
  theme.value = getTheme()
  applyTheme(theme.value)
})
</script>