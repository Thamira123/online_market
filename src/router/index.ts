import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import ProductDetailView from "../views/ProductDetailView.vue"
import CartView from "../views/CartView.vue"

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/product/:id", name: "product", component: ProductDetailView },
    { path: "/cart", name: "cart", component: CartView },
  ],
})