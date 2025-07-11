// src/stores/cart.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        products: []
    }),
    persist: true,
    actions: {
        addProduct(product) {
            this.products.push(product)
        },
        editProduct(index) {

            console.log(index)
            console.log(product)

            if (index !== -1) {
                this.products[index] = product;
            }
        },
    }
})
