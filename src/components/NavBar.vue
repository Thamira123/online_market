<template>
  <header class="sticky top-0 z-40">
    <!-- Top bar -->
    <div class="bg-orange-500 text-white">
      <div class="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <div class="text-lg font-extrabold tracking-wide">
          TS Online Store
        </div>

        <!-- Search bar (desktop) -->
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

        <!-- Theme toggle -->
        <button
          class="rounded-full bg-white/15 px-3 py-2 text-sm font-semibold hover:bg-white/20"
          type="button"
          @click="onToggleTheme"
        >
          {{ themeLabel }}
        </button>

        <!-- Cart link -->
        <RouterLink
          to="/cart"
          class="rounded-full bg-white/15 px-3 py-2 text-sm font-semibold hover:bg-white/20"
        >
          Cart
          <span class="ml-2 rounded-full bg-black px-2 py-0.5 text-xs">{{ cart.count }}</span>
        </RouterLink>

        <!-- Login link -->
        <RouterLink
          to="/login"
          class="rounded-full bg-white/15 px-3 py-2 text-sm font-semibold hover:bg-white/20"
        >
          Login
        </RouterLink>
      </div>

      <!-- Search bar (mobile) -->
      <div class="mx-auto max-w-7xl px-4 pb-3 md:hidden">
        <div class="flex items-center gap-2 rounded-full bg-white px-3 py-2">
          <input
            v-model="q"
            class="w-full bg-transparent text-sm text-gray-900 outline-none"
            placeholder="Search products..."
            @keyup.enter="submitSearch"
          />
          <button
            class="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white"
            type="button"
            @click="submitSearch"
          >
            Go
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation with hover dropdown -->
    <div class="border-b bg-white dark:bg-gray-950 dark:border-gray-800">
      <div class="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3">
        <nav class="text-sm font-semibold text-gray-700 dark:text-gray-200 flex gap-6">
          <RouterLink class="hover:text-orange-600" to="/">Home</RouterLink>

          <!-- Categories -->
          <div v-for="cat in categories" :key="cat.name" class="relative group">
            <span class="cursor-pointer hover:text-orange-600">{{ cat.name }}</span>

            <!-- Dropdown -->
            <div
              class="absolute left-0 mt-2 hidden group-hover:block bg-white text-black rounded shadow-lg p-3 w-48 z-50"
            >
              <ul>
                <li
                  v-for="sub in cat.sub"
                  :key="sub"
                  class="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  @click="loadCategory(sub)"
                >
                  {{ sub }}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { RouterLink, useRouter } from "vue-router"
import { useCartStore } from "../stores/cart"
import { applyTheme, getTheme, toggleTheme, type ThemeMode } from "../lib/theme"

const emit = defineEmits<{
  (e: "search", q: string): void
}>()

const cart = useCartStore()
const q = ref("")
const theme = ref<ThemeMode>("light")
const router = useRouter()

const themeLabel = computed(() => (theme.value === "dark" ? "Light Mode" : "Dark Mode"))

function submitSearch() {
  emit("search", q.value.trim())
}

function onToggleTheme() {
  theme.value = toggleTheme()
}

function loadCategory(sub: string) {
  // Navigate to category page
  router.push(`/category/${sub.toLowerCase()}`)
}

onMounted(() => {
  theme.value = getTheme()
  applyTheme(theme.value)
})

// Categories data
const categories = [
  {
    name: "Food & Grocery",
    sub: ["Bakery", "Beverages", "Chilled", "Dairy", "Frozen", "Fruits", "Vegetables", "Meat", "Pet Foods"]
  },
  {
    name: "Electronics",
    sub: ["Phones", "Tablets", "Computers", "Gaming", "Accessories"]
  },
  {
    name: "Clothing & Fashion",
    sub: ["Mens", "Womens", "Kids", "Shoes", "Accessories"]
  }
]
</script>
