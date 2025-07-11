// src/stores/cart.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        products: [],
        totalPurchaseValue: 0
    }),
    persist: true,
    actions: {
        addProduct(product) {
            this.products.push(product)
        },
        editProduct(product, index) {

            if (index !== -1) {
                this.products[index] = product;
            }
        },
        removeProduct(index) {
            this.products.splice(index, 1)
            this.calculateTotal()
        },
        calculateTotal() {

            this.totalPurchaseValue = this.products.reduce(function (accumulator, product) {
                return accumulator + product.totalValueProduct
            }, 0);

        },
    }
})
