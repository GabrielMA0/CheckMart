// src/stores/cart.js
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
    state: () => ({
        modal: false,
        typeModal: 'adicionar'
    }),
    actions: {
        editProduct(index) {

            handleModal()
            modal.value = modalTypeEdit.value
            indexProduct.value = index
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
