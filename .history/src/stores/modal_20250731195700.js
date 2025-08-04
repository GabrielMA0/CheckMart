// src/stores/cart.js
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
    state: () => ({
        modal: false,
        typeModal: 'adicionar'
    }),
    actions: {
        addProduct(product) {
            this.products.push(product)
            this.calculateTotal()
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

        handleModal() {
            this.modal = true
            modal.value = modalTypeAdd.value
        }
    }
})
