<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />
    <main class="mx-auto max-w-7xl px-4 py-6">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue"
import { RouterView } from "vue-router"
</script>