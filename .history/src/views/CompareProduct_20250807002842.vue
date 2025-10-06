<script setup>
import Container from '../components/Container.vue'
import Subtitle from '../components/Subtitle.vue'
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'

import { VMoney } from 'v-money'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

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

const blockNegativeNumbers = (e) => {
  const keycode = e.key
  if (keycode === '-' || keycode === '+' || keycode === 'e') {
    e.preventDefault()
  }
}

</script>

<template>
    <Container>
        <Subtitle>Comparar produtos</Subtitle>
        <form @submit.prevent="addProduct">
            <div class="container-fields">
                <div class="container-product">
                    <span>Produto 01</span>

                    <Input
                    label="Nome"
                    placeholder="Ex: Coca-cola"
                    type="text"
                    v-model="product"
                    :isRequired="true"
                    :hasError="submitCount > 0 && productError ? true : false"
                    :messageError="productError"
                    />
                    
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
                    />

                    <Input
                    label="Nome"
                    placeholder="Ex: Coca-cola"
                    type="text"
                    v-model="product"
                    :isRequired="true"
                    :hasError="submitCount > 0 && productError ? true : false"
                    :messageError="productError"
                    />

                    <Input
                    label="Nome"
                    placeholder="Ex: Coca-cola"
                    type="text"
                    v-model="product"
                    :isRequired="true"
                    :hasError="submitCount > 0 && productError ? true : false"
                    :messageError="productError"
                    />
                    
                    <Input
                    label="Nome"
                    placeholder="Ex: Coca-cola"
                    type="text"
                    v-model="product"
                    :isRequired="true"
                    :hasError="submitCount > 0 && productError ? true : false"
                    :messageError="productError"
                    />
                </div>

                <div class="container-product">
                    <span>Produto 02</span>

                    <Input
                    label="Nome"
                    placeholder="Ex: Dolly"
                    type="text"
                    v-model="product"
                    :isRequired="true"
                    :hasError="submitCount > 0 && productError ? true : false"
                    :messageError="productError"
                    />

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
                    />
                </div>
            </div>

            <div class="container-checkboxs">
                <Input
                label="Unidade"
                type="checkbox"
                class="input-checkbox"
                id="unity"
                v-model="price"
                :isRequired="false"
                />

                <Input
                label="LT/ML"
                type="checkbox"
                id="lt-ml"
                class="input-checkbox"
                v-model="price"
                :isRequired="false"
                />

                <Input
                label="KG/G"
                type="checkbox"
                id="kg"
                class="input-checkbox"
                v-model="price"
                :isRequired="false"
                />
            </div>

            <div class="container-btns">
                <Button type="submit">Comparar</Button>
                <Button @click="resetForm">Limpar campos</Button>
                <router-link to="/">
                    <Button>Carrinho de compras</Button>
                </router-link>
            </div>
        </form>
    </Container>
</template>

<style lang="scss">

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .container-fields{
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        justify-content: center;

        .container-product{
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
    }
    .container-checkboxs{
        display: flex;
        gap: 20px;
        justify-content: center;
        flex-wrap: wrap;

            .input-checkbox{
            align-items: center;
            flex-direction: row-reverse;
            width: max-content;

            label{
                padding: 0;
            }
        }
    }
    .container-btns{
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
    }

    @media (max-width: 768px){
        .container-btns{
            flex-direction: column;

            button{
                width: 100%;
            }
        }
    }

</style>
