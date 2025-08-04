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
        closeModal() {
            setTimeout(() => {
                modalOpen.value = false
            }, 450);

            animationCloseModal.value = true
        },

        handleModal() {
            this.modal = true
            this.typeModal = 'adicionar'
        }
    }
})
