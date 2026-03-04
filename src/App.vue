<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
    <NavBar @search="onSearch" @openCategories="sidebarOpen = true" />

    <main class="mx-auto max-w-7xl px-4 py-6">
      <RouterView :search-q="searchQ" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import NavBar from "./components/NavBar.vue"
import { RouterView } from "vue-router"

const searchQ = ref("")
const sidebarOpen = ref(false) // (home page will manage actual sidebar UI)

function onSearch(q: string) {
  searchQ.value = q
}
</script>