<script setup>
import Container from '../components/Container.vue'
import Subtitle from '../components/Subtitle.vue'
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'

import { VMoney } from 'v-money'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import {ref, watch} from 'vue'

const money = {
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  precision: 2,
  masked: false
}

const unity = ref(false);

const schema = yup.object({
  product1: yup.string().required('Preencha o campo obrigatório'),
  price1: yup.string()
    .transform((value) => value.replace(/[^\d]/g, ''))
    .test('is-valid-price', 'Informe um valor maior que 0', (value) => Number(value) > 0)
    .required('Preencha o campo obrigatório'),
  unit1: yup.string().required('Preencha o campo obrigatório'),
  volume1: yup.string().required('Preencha o campo obrigatório'),
  weight1: yup.string().required('Preencha o campo obrigatório'),

  product2: yup.string().required('Preencha o campo obrigatório'),
  price2: yup.string()
    .transform((value) => value.replace(/[^\d]/g, ''))
    .test('is-valid-price', 'Informe um valor maior que 0', (value) => Number(value) > 0)
    .required('Preencha o campo obrigatório'),
  unit2: yup.string().required('Preencha o campo obrigatório'),
  volume2: yup.string().required('Preencha o campo obrigatório'),
  weight2: yup.string().required('Preencha o campo obrigatório'),
});

const {handleSubmit, submitCount,  resetForm } = useForm({
  validationSchema: schema,
  validateOnMount: false,
})

const { value: product1, errorMessage: product1Error } = useField('product1');
const { value: price1, errorMessage: price1Error } = useField('price1');
const { value: unit1, errorMessage: unit1Error } = useField('unit1');
const { value: volume1, errorMessage: volume1Error } = useField('volume1');
const { value: weight1, errorMessage: weight1Error } = useField('weight1');

const { value: product2, errorMessage: product2Error } = useField('product2');
const { value: price2, errorMessage: price2Error } = useField('price2');
const { value: unit2, errorMessage: unit2Error } = useField('unit2');
const { value: volume2, errorMessage: volume2Error } = useField('volume2');
const { value: weight2, errorMessage: weight2Error } = useField('weight2');

watch(() => unity.value, (value) => {
    console.log(value);
})

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
                    <span class="title-product">Produto 01</span>

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
                    v-show="unity"
                    label="Unidade"
                    placeholder="Ex: 5"
                    type="text"
                    v-model="product"
                    :isRequired="true"
                    :hasError="submitCount > 0 && productError ? true : false"
                    :messageError="productError"
                    />

                    <Input
                    label="LT/ML"
                    placeholder="Ex: 500"
                    type="text"
                    v-model="product"
                    :isRequired="true"
                    :hasError="submitCount > 0 && productError ? true : false"
                    :messageError="productError"
                    />

                    <Input
                    label="KG/G"
                    placeholder="Ex: 1"
                    type="text"
                    v-model="product"
                    :isRequired="true"
                    :hasError="submitCount > 0 && productError ? true : false"
                    :messageError="productError"
                    />
                </div>

                <div class="container-product">
                    <span class="title-product">Produto 02</span>

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

                    <Input
                    v-show="unity"
                    label="Unidade"
                    placeholder="Ex: 5"
                    type="text"
                    v-model="product"
                    :isRequired="true"
                    :hasError="submitCount > 0 && productError ? true : false"
                    :messageError="productError"
                    />

                    <Input
                    label="LT/ML"
                    placeholder="Ex: 500"
                    type="text"
                    v-model="product"
                    :isRequired="true"
                    :hasError="submitCount > 0 && productError ? true : false"
                    :messageError="productError"
                    />

                    <Input
                    label="KG/G"
                    placeholder="Ex: 1"
                    type="text"
                    v-model="product"
                    :isRequired="true"
                    :hasError="submitCount > 0 && productError ? true : false"
                    :messageError="productError"
                    />
                </div>
            </div>

            <div class="container-checkboxs">
                <Input
                label="Unidade"
                type="checkbox"
                class="input-checkbox"
                id="unity"
                v-model="unity"
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
        height: 400px;
        overflow: auto;

        .container-product{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;

            .title-product{
                font-weight: bold;
                font-size: 20px;
            }
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
