<template>
  <div class="relative overflow-hidden rounded-3xl">
    <div
      class="relative h-[260px] sm:h-[320px] md:h-[420px] w-full bg-cover bg-center"
      :style="{ backgroundImage: `url(${activeSlide.img})` }"
    >
      <!-- overlay -->
      <div class="absolute inset-0 bg-black/30"></div>

      <!-- text -->
      <div class="relative mx-auto max-w-7xl px-6 py-10 md:py-16">
        <p class="text-white/90 text-sm font-semibold">THAMI-SITHU ONLINE MARKET</p>

        <h2 class="mt-2 text-white text-3xl md:text-5xl font-extrabold drop-shadow">
          {{ activeSlide.title }}
        </h2>

        <p class="mt-2 text-white/90 text-sm md:text-base max-w-xl">
          {{ activeSlide.subtitle }}
        </p>

        <button
          class="mt-5 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          type="button"
        >
          Shop now
        </button>
      </div>

      <!-- arrows -->
      <button
        class="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 px-3 py-2 text-xl font-bold hover:bg-white"
        type="button"
        @click="prev"
        aria-label="Previous"
      >
        ‹
      </button>

      <button
        class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 px-3 py-2 text-xl font-bold hover:bg-white"
        type="button"
        @click="next"
        aria-label="Next"
      >
        ›
      </button>

      <!-- dots -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <button
          v-for="(_, i) in slides"
          :key="i"
          class="h-2.5 w-2.5 rounded-full"
          :class="i === current ? 'bg-white' : 'bg-white/50'"
          type="button"
          @click="go(i)"
          aria-label="Go to slide"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue"

type Slide = { img: string; title: string; subtitle: string }

// ✅ Using online images so NO folder needed
const slides = ref<Slide[]>([
  {
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80",
    title: "Kitchen essentials",
    subtitle: "Under $50 — top quality picks",
  },
  {
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
    title: "Fashion & Style",
    subtitle: "New arrivals every week",
  },
  {
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    title: "Home & Living",
    subtitle: "Modern items for your home",
  },
])

const current = ref(0)

const activeSlide = computed(() => slides.value[current.value] ?? slides.value[0]!)

let timer: number | undefined

function next() {
  current.value = (current.value + 1) % slides.value.length
  restart()
}
function prev() {
  current.value = (current.value - 1 + slides.value.length) % slides.value.length
  restart()
}
function go(i: number) {
  current.value = i
  restart()
}

function start() {
  timer = window.setInterval(() => {
    current.value = (current.value + 1) % slides.value.length
  }, 3000) // ✅ changes every 3 seconds
}
function stop() {
  if (timer) window.clearInterval(timer)
  timer = undefined
}
function restart() {
  stop()
  start()
}

onMounted(start)
onBeforeUnmount(stop)
</script>