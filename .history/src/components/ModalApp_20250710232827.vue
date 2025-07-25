<template>

    <section v-show="modalOpen" class="modal-add-product">
        <div class="background" @click="this.$emit('closeModal')"></div>
        <div class="container-content"
            :class="{ 'open-modal-animation': modalOpen, 'close-modal-animation': animationCloseModal }">

            <button @click="this.$emit('closeModal')" title="Fechar modal" class="close-button">
                <span class="material-symbols-outlined">close</span>
            </button>

            <h2>{{ modal === modalTypeEdit ? "Editar produto" : "Adicionar no carrinho" }}</h2>

            <!-- INPUTS PARA ADICIONAR PRODUTO -->
            <form>
                <div class="container-fields">
                    <label for="product-field">Produto <span class="asterisk">*</span></label>
                    <input type="text" id="product-field" placeholder="Ex: Refrigerante" v-model="valueInputProduct"
                        :class="{ 'field-error': fieldErrorProduct }">
                </div>

                <div class="container-fields">
                    <label for="value-field">Valor <span class="asterisk">*</span></label>
                    <input type="text" id="value-field" placeholder="Ex: R$ 5,00" v-model.lazy="valueInputPrice"
                        v-money="money" @keydown="blockNegativeNumbers" :class="{ 'field-error': fieldErrorPrice }">
                </div>

                <div class="container-fields">
                    <label for="quantity-field">Quantidade <span class="asterisk">*</span></label>
                    <input type="number" id="quantity-field" placeholder="Ex: 3" min="0" v-model="valueInputAmount"
                        @keydown="blockNegativeNumbers" :class="{ 'field-error': fieldErrorAmount }">
                </div>

                <div class="container-fields">
                    <label for="category-field">Categoria</label>
                    <input type="text" id="category-field" placeholder="Ex: Bebida" v-model="valueInputCategory">
                </div>

                <div class="container-fields">
                    <label for="brand-field">Marca</label>
                    <input type="text" id="brand-field" placeholder="Ex: Coca-cola" v-model="valueInputBrand">
                </div>

                <div class="container-fields">
                    <label for="flavor-field">Sabor</label>
                    <input type="text" id="flavor-field" placeholder="Ex: Morango" v-model="valueInputFlavor">
                </div>

                <div class="container-fields">
                    <label for="weight-field">Peso (KG/G)</label>
                    <input type="number" id="weight-field" placeholder="Ex: 2" v-model="valueInputWeight">
                </div>
            </form>

            <!-- BOTÕES QUANDO FOR EDITAR PRODUTO -->

            <div v-if="modal === modalTypeEdit" class="container-modal-edition">
                <button class="btns edit-button" @click="SaveProductEdit">Salvar alteração</button>
                <button class="btns cancel-button" @click="this.$emit('closeModal')">Cancelar</button>
                <button class="btns delete-button" @click="deleteProduct">Apagar produto</button>
            </div>
            <button v-else class="btns" ref="btnAdd" @click="addProduct">Adicionar</button>
        </div>

    </section>


</template>

<script>

import { VMoney } from 'v-money'
import {useCartStore} from '../stores/cart'

export default {
    name: 'ModalApp',
    props: ['modalOpen', 'sendProductData', 'indexProduct', 'animationCloseModal', 'modal', 'modalTypeAdd', 'modalTypeEdit', 'animationMessageError'],
    directives: { money: VMoney },

    data() {

        return {
            valueInputProduct: null,
            valueInputPrice: null,
            valueInputAmount: null,
            valueInputCategory: null,
            valueInputBrand: null,
            valueInputFlavor: null,
            valueInputWeight: null,
            fieldErrorProduct: false,
            fieldErrorPrice: false,
            fieldErrorAmount: false,
            cartProducts: null,

            products: [],

            inputValueConvertedPrice: 0,

            money: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                precision: 2,
                masked: false
            }
            
        }

        
    },

    mounted() {
        document.addEventListener('keydown', this.activateEventsButton)

    },

    created() {
    this.cartProducts = useCartStore()
  },

    watch: {

        valueInputProduct() {
            this.fieldErrorProduct = false

        },
        valueInputPrice() {
            this.fieldErrorPrice = false

        },
        valueInputAmount() {
            this.fieldErrorAmount = false

        },

        modal() {

            if (this.modal === this.modalTypeAdd) {
                this.clearFields();
            }
        },
    },

    methods: {

        addProduct() {

            if (this.fieldValidation()) {

                this.valueInputPriceConverted = parseFloat(this.valueInputPrice.slice(3).replace(",", "."))

                const product = {

                    productName: this.valueInputProduct,
                    price: this.valueInputPriceConverted,
                    amount: this.valueInputAmount,
                    totalValueProduct: this.valueInputPriceConverted * this.valueInputAmount,
                    category: this.valueInputCategory,
                    brand: this.valueInputBrand,
                    flavor: this.valueInputFlavor,
                    weight: this.valueInputWeight

                }
                
                this.cartProducts.addProduct(product)

                this.clearFields()

                this.$emit('closeModal', false);

            }
        },

        clearFields() {
            this.valueInputProduct = ''
            this.valueInputPrice = ''
            this.valueInputAmount = ''
            this.valueInputCategory = ''
            this.valueInputBrand = ''
            this.valueInputFlavor = ''
            this.valueInputWeight = ''
        },

        SaveProductEdit() {

            if (this.fieldValidation()) {
                this.valueInputPriceConverted = parseFloat(this.valueInputPrice.slice(3).replace(",", "."))

                var editedProduct = {
                    productName: this.valueInputProduct,
                    price: this.valueInputPriceConverted,
                    amount: this.valueInputAmount,
                    totalValueProduct: this.valueInputPriceConverted * this.valueInputAmount,
                    category: this.valueInputCategory,
                    brand: this.valueInputBrand,
                    flavor: this.valueInputFlavor,
                    weight: this.valueInputWeight
                }

                this.$emit('SaveProductEdit', editedProduct)
            }
        },

        blockNegativeNumbers(e) {

            const keycode = e.key

            if (keycode === '-' || keycode === '+' || keycode === 'e') {
                e.preventDefault()
            }
        },

        fieldValidation() {

            if (!this.valueInputProduct) {
                this.fieldErrorProduct = true;
            }
            if (this.valueInputPrice === 'R$ 0,00' || this.valueInputPrice === '' || this.valueInputPrice.length === 0) {
                this.fieldErrorPrice = true;

                console.log(this.valueInputPrice)
            }
            if (!this.valueInputAmount || this.valueInputAmount === null) {
                this.fieldErrorAmount = true;
            }
            if (!this.valueInputProduct || this.valueInputPrice === 'R$ 0,00' || this.valueInputPrice === '' || this.valueInputPrice.length === 0 || !this.valueInputAmount) {
                return false;
            } else {
                return true;
            }

        },

        setFieldsFromEditData(editProductData) {

            this.valueInputProduct = editProductData.productName
            this.valueInputPrice = editProductData.price.toFixed(2);
            this.valueInputAmount = editProductData.amount
            this.valueInputCategory = editProductData.category
            this.valueInputBrand = editProductData.brand
            this.valueInputFlavor = editProductData.flavor
            this.valueInputWeight = editProductData.weight

        },

        deleteProduct() {

            this.$emit('closeModal')

            this.cartProducts.removeProduct(this.indexProduct)

        },

        activateEventsButton(e) {

            if (e.key === 'Enter' && this.modal === this.modalTypeAdd) {
                this.addProduct()
            }
            if (e.key === 'Enter' && this.modal === this.modalTypeEdit) {
                this.SaveProductEdit()
            }
            if (e.key === 'Escape') {
                this.$emit('closeModal')
            }
        },
    },
}

</script>

<style lang="scss" scoped>
@mixin flexCenter() {
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-add-product {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    @include flexCenter();

    .container-content {
        background-color: white;
        width: 740px;
        padding: 20px 0;
        border-radius: 20px;
        @include flexCenter();
        flex-direction: column;
        position: relative;
        z-index: 2;

        h2 {
            padding-bottom: 15px;
        }

        .close-button {
            background: transparent;
            border: none;
            position: absolute;
            top: 10px;
            right: 5px;
            opacity: 0.7;

            &:hover {
                opacity: 1;
            }
        }

        form {
            @include flexCenter();
            flex-direction: row;
            flex-wrap: wrap;
            width: 503px;
            gap: 20px;

            .container-fields {
                display: flex;
                flex-direction: column;
                gap: 4px;
                align-items: center;

                .asterisk {
                    color: #3D5CFF;
                }

                label {
                    cursor: text;
                }
            }

        }

        .btns {
            width: 166px;
            height: 36px;
            margin-top: 34px;
            box-shadow: 3px 3px 4px rgba(0, 0, 0, 25%);
        }

        .container-modal-edition {
            display: flex;
            gap: 20px;

            .cancel-button,
            .delete-button {
                background-color: #EC3737;
                border: 1px solid #FEA2A2;
                opacity: 0.9;

                &:hover {
                    opacity: 1;
                }
            }

            .delete-button {
                display: none;
            }
        }


    }
}

// MOBILE

@media (max-width: 425px) {

    .modal-add-product {
        align-items: baseline;
        padding: 10px 0;

        .container-content {
            width: 90vw;

            form {
                width: auto;
                gap: 10px;
                height: 50vh;
                overflow: scroll;
            }

            .close-button {
                top: auto;
                bottom: -40px;
                right: auto;
                background-color: white;
                border-radius: 50%;
                display: flex;
                padding: 5px;
                opacity: 1;
            }

            .container-message-alert {
                top: -51px;
            }

            .container-modal-edition {
                gap: 10px;

                .btns {
                    margin-top: 25px;
                    width: auto;
                }

                .cancel-button {
                    display: none;
                }

                .delete-button {
                    display: block;
                }
            }
        }
    }
}
</style>