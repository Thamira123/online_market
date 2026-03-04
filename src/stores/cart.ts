import { defineStore } from "pinia"
import type { Product } from "../types/product"

export interface CartItem {
  product: Product
  qty: number
}

function loadFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem("cart_items")
    if (!raw) return []
    return JSON.parse(raw) as CartItem[]
  } catch {
    return []
  }
}

function saveToStorage(items: CartItem[]) {
  localStorage.setItem("cart_items", JSON.stringify(items))
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: loadFromStorage() as CartItem[],
  }),

  getters: {
    count(state) {
      return state.items.reduce((sum, it) => sum + it.qty, 0)
    },
    total(state) {
      return state.items.reduce((sum, it) => sum + it.qty * it.product.price, 0)
    },
  },

  actions: {
    add(product: Product, qty = 1) {
      const found = this.items.find((x) => x.product.id === product.id)
      if (found) found.qty += qty
      else this.items.push({ product, qty })

      saveToStorage(this.items)
    },

    remove(productId: number) {
      this.items = this.items.filter((x) => x.product.id !== productId)
      saveToStorage(this.items)
    },

    setQty(productId: number, qty: number) {
      const item = this.items.find((x) => x.product.id === productId)
      if (!item) return
      item.qty = Math.max(1, Math.floor(qty))
      saveToStorage(this.items)
    },

    clear() {
      this.items = []
      saveToStorage(this.items)
    },
  },
})