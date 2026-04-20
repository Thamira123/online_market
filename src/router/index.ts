import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import ProductDetailView from "../views/ProductDetailView.vue"
import CartView from "../views/CartView.vue"
import LoginView from "../views/LoginView.vue"

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/product/:id", name: "product", component: ProductDetailView },
  { path: "/cart", name: "cart", component: CartView },
  { path: "/login", name: "login", component: LoginView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
