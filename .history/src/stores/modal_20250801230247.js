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
        handleModal(type) {
            if (this.modal) {
                setTimeout(() => {
                    this.modal = false
                }, 450);

            } else {
                this.modal = true
            }
            this.typeModal = type
            this.modalAnimation = !this.modalAnimation
        }
    }
})
