// src/stores/cart.js
import { defineStore } from 'pinia'

import { useCartStore } from './cart'

export const useModalStore = defineStore('modal', {
    state: () => ({
        modal: false,
        typeModal: 'adicionar',
        modalAnimation: false
    }),
    actions: {
        editProduct(index) {
            openModal()
            this.typeModal = 'editar'
            const cartStore = useCartStore()
            cartStore.indexProduct = index
        },
        closeModal() {
            setTimeout(() => {
                this.modal = false
            }, 450);

            this.modalAnimation = true
        },

        openModal() {
            this.modal = true
            this.typeModal = 'adicionar'
            this.modalAnimation = true
        },

        handleModal(type) {
            this.modal = !this.modal
            this.typeModal = type
            this.modalAnimation = !this.modalAnimation
        }
    }
})
