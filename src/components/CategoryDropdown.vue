<template>
  <div class="relative" ref="root">
    <button
      class="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
      @click="toggle"
      type="button"
    >
      <Menu class="h-4 w-4" />
      All Categories
      <ChevronDown class="h-4 w-4" />
    </button>

    <div
      v-if="open"
      class="absolute left-0 top-12 z-50 w-72 overflow-hidden rounded-2xl border bg-white shadow-xl"
    >
      <div class="border-b px-4 py-3">
        <p class="text-sm font-semibold">Categories</p>
        <p class="text-xs text-gray-500">Click to filter products</p>
      </div>

      <div class="max-h-80 overflow-auto p-2">
        <button
          class="w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-gray-100"
          @click="pick('')"
        >
          All products
        </button>

        <button
          v-for="c in categories"
          :key="c"
          class="w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-gray-100"
          @click="pick(c)"
        >
          {{ c }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"
import { ChevronDown, Menu } from "lucide-vue-next"
import { getCategories } from "../lib/api"

const emit = defineEmits<{
  (e: "select", category: string): void
}>()

const categories = ref<string[]>([])
const open = ref(false)
const root = ref<HTMLElement | null>(null)

function toggle() {
  open.value = !open.value
}

function pick(category: string) {
  emit("select", category)
  open.value = false
}

async function load() {
  try {
    categories.value = await getCategories()
  } catch {
    categories.value = []
  }
}

function onDocClick(e: MouseEvent) {
  if (!open.value) return
  const target = e.target as Node
  if (root.value && !root.value.contains(target)) open.value = false
}

onMounted(() => {
  load()
  document.addEventListener("click", onDocClick)
})

onBeforeUnmount(() => {
  document.removeEventListener("click", onDocClick)
})
</script>