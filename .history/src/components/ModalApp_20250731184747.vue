<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { VMoney } from 'v-money'
import { useCartStore } from '../stores/cart'
import Button from './Button.vue'
import Subtitle from './Subtitle.vue'
import Input from './Input.vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const props = defineProps({
  modalOpen: Boolean,
  indexProduct: Number,
  animationCloseModal: Function,
  modal: String,
  modalTypeAdd: String,
  modalTypeEdit: String
})

const emit = defineEmits(['closeModal', 'SaveProductEdit'])

const valueInputPrice = ref('')
const valueInputAmount = ref('')
const valueInputCategory = ref('')
const valueInputBrand = ref('')
const valueInputFlavor = ref('')
const valueInputWeight = ref('')

const cartProducts = useCartStore()

const money = {
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  precision: 2,
  masked: false
}

const schema = yup.object({
  product: yup.string().required('Preencha o campo obrigatório'),
  price: yup
  .string()
  .transform((value) => {
    // remove R$, espaços, pontos e vírgulas
    const numericValue = value.replace(/[^\d]/g, '');
    return numericValue;
  })
  .test('is-valid-price', 'Informe um valor maior que 0', (value) => {
    return Number(value) > 0;
  })
  .required('Preencha o campo obrigatório'),
  amount: yup.string().required('Preencha o campo obrigatório'),
  category: yup.string(),
  brand: yup.string(),
  flavor: yup.string(),
  weight: yup.string()
})

const {handleSubmit, submitCount,  resetForm } = useForm({
  validationSchema: schema,
  validateOnMount: false,
})

const { value: product, errorMessage: productError } = useField('product')
const { value: price, errorMessage: priceError } = useField('price')
const { value: amount, errorMessage: amountError } = useField('amount')
const { value: category, errorMessage: categoryError } = useField('category')
const { value: brand, errorMessage: brandError } = useField('brand')
const { value: flavor, errorMessage: flavorError } = useField('flavor')
const { value: weight, errorMessage: weightError } = useField('weight')

// watch(() => props.modal, (newVal) => {
//   if (newVal === props.modalTypeAdd) {
//     clearFields()
//   }
// })

watch(() => props.modalOpen, (isOpen) => {
  if (isOpen && props.modal === props.modalTypeEdit) {
    fillFieldsFromCart()
  }
})

onMounted(() => {
  document.addEventListener('keydown', activateEventsButton)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', activateEventsButton)
})

const fillFieldsFromCart = () => {
  const p = cartProducts.products[props.indexProduct]
  if (p) {
    product.value = p.productName
    price.value = p.price.toFixed(2).replace('.', ',')
    amount.value = p.amount
    category.value = p.category
    brand.value = p.brand
    flavor.value = p.flavor
    weight.value = p.weight
  }
}

const addProduct = handleSubmit((values) => {

  const priceParse = parseFloat(values.price.slice(3).replace(',', '.'))

  const product = {
    productName: values.product,
    price: priceParse,
    amount: values.amount,
    totalValueProduct: priceParse * values.amount,
    category: values.category,
    brand: values.brand,
    flavor: values.flavor,
    weight: values.weight
  }

  cartProducts.addProduct(product)
  resetForm()
  emit('closeModal', false)
})

const saveProductEdit = () => {

  const priceParse = parseFloat(price.value.slice(3).replace(',', '.'))

  const editedProduct = {
    productName: product.value,
    price: priceParse,
    amount: amount.value,
    totalValueProduct: price * amount.value,
    category: category.value,
    brand: brand.value,
    flavor: flavor.value,
    weight: weight.value
  }

  console.log(editedProduct)
  console.log(props.indexProduct)

  cartProducts.editProduct(editedProduct, props.indexProduct)
  cartProducts.calculateTotal()
  emit('closeModal', false)
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

            <Subtitle>{{ modal === modalTypeEdit ? "Editar produto" : "Adicionar no carrinho" }}</Subtitle>

            <form @submit.prevent="addProduct">
                <div class="container-fields">
                    <Input
                    label="Produto"
                    placeholder="Ex: Refrigerante"
                    type="text"
                    v-model="product"
                    :isRequired="true"
                    :hasError="submitCount > 0 && productError ? true : false"
                    :messageError="productError"
                    ></Input>

                    <Input
                    label="Preço"
                    placeholder="Ex: R$ 5,00"
                    type="text"
                    v-model.lazy="price"
                    v-money="money" 
                    @keydown="blockNegativeNumbers"
                    :isRequired="true"
                    :hasError="submitCount > 0 && priceError ? true : false"
                    :messageError="priceError"
                    ></Input>

                    <Input
                    label="Quantidade"
                    placeholder="Ex: 3"
                    type="number"
                    v-model="amount"
                    :isRequired="true"
                    id="quantity-field" 
                    inputmode="numeric" 
                    pattern="\d*" 
                    min="0"
                    @keydown="blockNegativeNumbers"
                    :hasError="submitCount > 0 && amountError ? true : false"
                    :messageError="amountError"
                    ></Input>

                    <Input
                    label="Categoria"
                    type="text" 
                    id="category-field" 
                    placeholder="Ex: Bebida" 
                    v-model="category"
                    :isRequired="false"
                    :hasError="submitCount > 0 && categoryError ? true : false"
                    :messageError="categoryError"
                    ></Input>

                    <Input
                    label="Marca"
                    type="text" 
                    id="brand-field" 
                    placeholder="Ex: Coca-cola" 
                    v-model="brand"
                    :isRequired="false"
                    :hasError="submitCount > 0 && brandError ? true : false"
                    :messageError="brandError"
                    ></Input>

                    <Input
                    label="Sabor"
                    type="text" 
                    id="flavor-field" 
                    placeholder="Ex: Morango" 
                    v-model="flavor"
                    :isRequired="false"
                    :hasError="submitCount > 0 && flavorError ? true : false"
                    :messageError="flavorError"
                    ></Input>

                    <Input
                    label="Peso (KG/G)"
                    type="number" 
                    id="weight-field" 
                    placeholder="Ex: 2" 
                    v-model="weight" 
                    inputmode="numeric" 
                    pattern="\d*"
                    :isRequired="false"
                    :hasError="submitCount > 0 && weightError ? true : false"
                    :messageError="weightError"
                    ></Input>
                </div>
                
                <div v-if="modal === modalTypeEdit" class="container-modal-edition">
                    <Button class="btns edit-button" @click="saveProductEdit">Salvar alteração</Button>
                    <Button class="btns cancel-button" @click="this.$emit('closeModal')">Cancelar</Button>
                    <Button class="btns delete-button" @click="deleteProduct">Apagar produto</Button>
                </div>
                
                <Button v-else class="btns" ref="btnAdd" type="submit">Adicionar</Button>
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
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;

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