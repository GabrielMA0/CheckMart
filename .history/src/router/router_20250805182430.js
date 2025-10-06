import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CompareProduct from '../views/CompareProduct.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/compare-product', component: Home },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
