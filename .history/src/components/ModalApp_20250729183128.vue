<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { VMoney } from 'v-money'
import { useCartStore } from '../stores/cart'
import Button from './Button.vue'
import Input from './Input.vue'

// Props
const props = defineProps({
  modalOpen: Boolean,
  indexProduct: Number,
  animationCloseModal: Function,
  modal: String,
  modalTypeAdd: String,
  modalTypeEdit: String
})

const emit = defineEmits(['closeModal', 'SaveProductEdit'])

// Refs para inputs e campos
const productField = ref(null)
const valueField = ref(null)
const quantityField = ref(null)

// Reactive States
const valueInputProduct = ref('')
const valueInputPrice = ref('')
const valueInputAmount = ref('')
const valueInputCategory = ref('')
const valueInputBrand = ref('')
const valueInputFlavor = ref('')
const valueInputWeight = ref('')
const fieldErrorProduct = ref(false)
const fieldErrorPrice = ref(false)
const fieldErrorAmount = ref(false)

const cartProducts = useCartStore()

const money = {
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  precision: 2,
  masked: false
}

// Watchers
watch(valueInputProduct, () => fieldErrorProduct.value = false)
watch(valueInputPrice, () => fieldErrorPrice.value = false)
watch(valueInputAmount, () => fieldErrorAmount.value = false)

watch(() => props.modal, (newVal) => {
  if (newVal === props.modalTypeAdd) {
    clearFields()
  }
})

watch(() => props.modalOpen, (isOpen) => {
  if (isOpen && props.modal === props.modalTypeEdit) {
    fillFieldsFromCart()
  }
  productField.value?.focus()
})

// Lifecycle
onMounted(() => {
  document.addEventListener('keydown', activateEventsButton)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', activateEventsButton)
})

// Functions
const fillFieldsFromCart = () => {
  const p = cartProducts.products[props.indexProduct]
  if (p) {
    valueInputProduct.value = p.productName
    valueInputPrice.value = p.price.toFixed(2).replace('.', ',')
    valueInputAmount.value = p.amount
    valueInputCategory.value = p.category
    valueInputBrand.value = p.brand
    valueInputFlavor.value = p.flavor
    valueInputWeight.value = p.weight
  }
}

const clearFields = () => {
  valueInputProduct.value = ''
  valueInputPrice.value = ''
  valueInputAmount.value = ''
  valueInputCategory.value = ''
  valueInputBrand.value = ''
  valueInputFlavor.value = ''
  valueInputWeight.value = ''
}

const fieldValidation = () => {
  if (!valueInputProduct.value) {
    fieldErrorProduct.value = true
    productField.value?.focus()
  }

  if (!valueInputPrice.value || valueInputPrice.value === 'R$ 0,00') {
    fieldErrorPrice.value = true
    valueField.value?.focus()
  }

  if (!valueInputAmount.value) {
    fieldErrorAmount.value = true
    quantityField.value?.focus()
  }

  return (
    valueInputProduct.value &&
    valueInputPrice.value &&
    valueInputPrice.value !== 'R$ 0,00' &&
    valueInputAmount.value
  )
}

const addProduct = () => {
  if (!fieldValidation()) return

  const price = parseFloat(valueInputPrice.value.slice(3).replace(',', '.'))

  const product = {
    productName: valueInputProduct.value,
    price,
    amount: valueInputAmount.value,
    totalValueProduct: price * valueInputAmount.value,
    category: valueInputCategory.value,
    brand: valueInputBrand.value,
    flavor: valueInputFlavor.value,
    weight: valueInputWeight.value
  }

  cartProducts.addProduct(product)
  clearFields()
  emit('closeModal', false)
}

const saveProductEdit = () => {
  if (!fieldValidation()) return

  const price = parseFloat(valueInputPrice.value.slice(3).replace(',', '.'))

  const editedProduct = {
    productName: valueInputProduct.value,
    price,
    amount: valueInputAmount.value,
    totalValueProduct: price * valueInputAmount.value,
    category: valueInputCategory.value,
    brand: valueInputBrand.value,
    flavor: valueInputFlavor.value,
    weight: valueInputWeight.value
  }

  emit('SaveProductEdit', editedProduct)
}

const deleteProduct = () => {
  emit('closeModal')
  cartProducts.removeProduct(props.indexProduct)
}

const blockNegativeNumbers = (e) => {
  const keycode = e.key
  if (keycode === '-' || keycode === '+' || keycode === 'e') {
    e.preventDefault()
  }
}

const activateEventsButton = (e) => {
  if (e.key === 'Enter') {
    if (props.modal === props.modalTypeAdd) addProduct()
    if (props.modal === props.modalTypeEdit) saveProductEdit()
  }
  if (e.key === 'Escape') {
    emit('closeModal')
  }
}
</script>


<template>

    <section v-show="modalOpen" class="modal-add-product">
        <div class="background" @click="this.$emit('closeModal')"></div>
        <div class="container-content"
            :class="{ 'open-modal-animation': modalOpen, 'close-modal-animation': animationCloseModal }">

            <button @click="this.$emit('closeModal')" title="Fechar modal" class="close-button">
                <span class="material-symbols-outlined">close</span>
            </button>

            <h2>{{ modal === modalTypeEdit ? "Editar produto" : "Adicionar no carrinho" }}</h2>

            <form>
                <div class="container-fields">
                    <Input
                    label="Produto"
                    placeholder="Ex: Refrigerante"
                    type="text"
                    v-model="valueInputProduct"
                    :isRequired="true"
                    ></Input>

                    <Input
                    label="Valor"
                    placeholder="Ex: R$ 5,00"
                    type="text"
                    v-model.lazy="valueInputPrice"
                    v-money="money" 
                    @keydown="blockNegativeNumbers"
                    :isRequired="true"
                    ></Input>

                    <Input
                    label="Quantidade"
                    placeholder="Ex: 3"
                    type="number"
                    v-model="valueInputAmount"
                    :isRequired="true"
                    ref="quantityField" 
                    id="quantity-field" 
                    inputmode="numeric" 
                    pattern="\d*" 
                    min="0"
                    @keydown="blockNegativeNumbers"
                    ></Input>

                    <Input
                    label="Categoria"
                    type="text" 
                    id="category-field" 
                    placeholder="Ex: Bebida" 
                    v-model="valueInputCategory"
                    :isRequired="true"
                    ></Input>

                    <Input
                    label="Marca"
                    type="text" 
                    id="brand-field" 
                    placeholder="Ex: Coca-cola" 
                    v-model="valueInputBrand"
                    :isRequired="true"
                    ></Input>

                    <Input
                    label="Sabor"
                    type="text" 
                    id="flavor-field" 
                    placeholder="Ex: Morango" 
                    v-model="valueInputFlavor"
                    :isRequired="true"
                    ></Input>

                    <Input
                    label="Peso (KG/G)"
                    type="number" 
                    id="weight-field" 
                    placeholder="Ex: 2" 
                    v-model="valueInputWeight" 
                    inputmode="numeric" 
                    pattern="\d*"
                    :isRequired="true"
                    ></Input>
                </div>
                
                <div v-if="modal === modalTypeEdit" class="container-modal-edition">
                    <Button class="btns edit-button" @click="SaveProductEdit">Salvar alteração</Button>
                    <Button class="btns cancel-button" @click="this.$emit('closeModal')">Cancelar</Button>
                    <Button class="btns delete-button" @click="deleteProduct">Apagar produto</Button>
                </div>
                
                <Button v-else class="btns" ref="btnAdd" @click="addProduct" type="submit">Adicionar</Button>
            </form>

            <!-- BOTÕES QUANDO FOR EDITAR PRODUTO -->

            
        </div>

    </section>


</template>

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

        form{
            .container-fields {
                @include flexCenter();
                flex-direction: row;
                flex-wrap: wrap;
                width: 503px;
                gap: 25px;
            }
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
        padding: 10px 0;

        .container-content {
            width: 90vw;

            form {
                width: auto;
                gap: 20px;
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
                gap: 5px;

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

@media (max-width: 320px) {

    .container-modal-edition {
        flex-direction: column;
    }
}
    

</style>