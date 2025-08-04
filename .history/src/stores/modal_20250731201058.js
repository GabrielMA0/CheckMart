// src/stores/cart.js
import { defineStore } from 'pinia'
import useCartStore from './cart'

export const useModalStore = defineStore('modal', {
    state: () => ({
        modal: false,
        typeModal: 'adicionar'
    }),
    actions: {
        editProduct(index) {
            handleModal()
            this.typeModal = 'editar'
            const cartStore = useCartStore()
            cartStore.indexProduct = index
        },
        closeModal() {
            setTimeout(() => {
                this.modal = false
            }, 450);

            animationCloseModal.value = true
        },

        handleModal() {
            this.modal = true
            this.typeModal = 'adicionar'
        }
    }
})
