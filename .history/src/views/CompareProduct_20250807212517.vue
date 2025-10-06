<script setup>
import Container from '../components/Container.vue'
import Subtitle from '../components/Subtitle.vue'
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'

import { VMoney } from 'v-money'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import {ref} from 'vue'

const money = {
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  precision: 2,
  masked: false
}

const teste = ref(false);

const schema = yup.object({
  // Produto 1
  product1: yup.string().required('Preencha o campo obrigatório'),

  price1: yup.string()
    .transform(value => value.replace(/[^\d]/g, ''))
    .test('is-valid-price', 'Informe um valor maior que 0', value => Number(value) > 0)
    .required('Preencha o campo obrigatório'),

  unityCheckbox: yup.boolean(),
  volumeCheckbox: yup.boolean(),
  weightCheckbox: yup.boolean(),

  unit1: yup.string().when('unityCheckbox', {
    is: true,
    then: schema => schema.required('Preencha o campo obrigatório'),
    otherwise: schema => schema.notRequired(),
  }),

  volume1: yup.string().when('volumeCheckbox', {
    is: true,
    then: schema => schema.required('Preencha o campo obrigatório'),
    otherwise: schema => schema.notRequired(),
  }),

  weight1: yup.string().when('weightCheckbox', {
    is: true,
    then: schema => schema.required('Preencha o campo obrigatório'),
    otherwise: schema => schema.notRequired(),
  }),

  // Produto 2
  product2: yup.string().required('Preencha o campo obrigatório'),

  price2: yup.string()
    .transform(value => value.replace(/[^\d]/g, ''))
    .test('is-valid-price', 'Informe um valor maior que 0', value => Number(value) > 0)
    .required('Preencha o campo obrigatório'),

  unit2: yup.string().when('unityCheckbox', {
    is: true,
    then: schema => schema.required('Preencha o campo obrigatório'),
    otherwise: schema => schema.notRequired(),
  }),

  volume2: yup.string().when('volumeCheckbox', {
    is: true,
    then: schema => schema.required('Preencha o campo obrigatório'),
    otherwise: schema => schema.notRequired(),
  }),

  weight2: yup.string().when('weightCheckbox', {
    is: true,
    then: schema => schema.required('Preencha o campo obrigatório'),
    otherwise: schema => schema.notRequired(),
  }),
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

const { value: unityCheckbox } = useField('unityCheckbox');
const { value: volumeCheckbox } = useField('volumeCheckbox');
const { value: weightCheckbox } = useField('weightCheckbox');

const blockNegativeNumbers = (e) => {
  const keycode = e.key
  if (keycode === '-' || keycode === '+' || keycode === 'e') {
    e.preventDefault()
  }
}

const compareProduct = handleSubmit((values) => {

  const products = {
    product1: {
      name: values.product1,
      price: values.price1,
      unit: values.unit1,
      volume: values.volume1,
      weight: values.weight1
    },
    product2: {
      name: values.product2,
      price: values.price2,
      unit: values.unit2,
      volume: values.volume2,
      weight: values.weight2
    }
  }

  console.log(products);

})
</script>

<template>
    <Container>
        <Subtitle>{{!teste ? 'Comparar produtos' : 'Resultado'}}</Subtitle>
        <form v-show="!teste" @submit.prevent="compareProduct">
            <div class="container-fields">
                <div class="container-product">
                    <span class="title-product">Produto 01</span>

                    <Input
                    label="Nome"
                    placeholder="Ex: Coca-cola"
                    type="text"
                    v-model="product1"
                    :isRequired="true"
                    :hasError="submitCount > 0 && product1Error"
                    :messageError="product1Error"
                    />

                    <Input
                    label="Preço"
                    placeholder="Ex: R$ 5,00"
                    type="text"
                    v-model.lazy="price1"
                    v-money="money" 
                    @keydown="blockNegativeNumbers"
                    :isRequired="true"
                    :hasError="submitCount > 0 && price1Error"
                    :messageError="price1Error"
                    />

                    <Input
                    v-show="unityCheckbox"
                    label="Unidade"
                    placeholder="Ex: 5"
                    type="text"
                    v-model="unit1"
                    :isRequired="true"
                    :hasError="submitCount > 0 && unit1Error"
                    :messageError="unit1Error"
                    />

                    <Input
                    v-show="volumeCheckbox"
                    label="LT/ML"
                    placeholder="Ex: 500"
                    type="text"
                    v-model="volume1"
                    :isRequired="true"
                    :hasError="submitCount > 0 && volume1Error"
                    :messageError="volume1Error"
                    />

                    <Input
                    v-show="weightCheckbox"
                    label="KG/G"
                    placeholder="Ex: 1"
                    type="text"
                    v-model="weight1"
                    :isRequired="true"
                    :hasError="submitCount > 0 && weight1Error"
                    :messageError="weight1Error"
                    />
                </div>

                <div class="container-product">
                    <span class="title-product">Produto 02</span>

                    <Input
                    label="Nome"
                    placeholder="Ex: Dolly"
                    type="text"
                    v-model="product2"
                    :isRequired="true"
                    :hasError="submitCount > 0 && product2Error"
                    :messageError="product2Error"
                    />

                    <Input
                    label="Preço"
                    placeholder="Ex: R$ 5,00"
                    type="text"
                    v-model.lazy="price2"
                    v-money="money" 
                    @keydown="blockNegativeNumbers"
                    :isRequired="true"
                    :hasError="submitCount > 0 && price2Error"
                    :messageError="price2Error"
                    />

                    <Input
                    v-show="unityCheckbox"
                    label="Unidade"
                    placeholder="Ex: 5"
                    type="text"
                    v-model="unit2"
                    :isRequired="true"
                    :hasError="submitCount > 0 && unit2Error"
                    :messageError="unit2Error"
                    />

                    <Input
                    v-show="volumeCheckbox"
                    label="LT/ML"
                    placeholder="Ex: 500"
                    type="text"
                    v-model="volume2"
                    :isRequired="true"
                    :hasError="submitCount > 0 && volume2Error"
                    :messageError="volume2Error"
                    />

                    <Input
                    v-show="weightCheckbox"
                    label="KG/G"
                    placeholder="Ex: 1"
                    type="text"
                    v-model="weight2"
                    :isRequired="true"
                    :hasError="submitCount > 0 && weight2Error"
                    :messageError="weight2Error"
                    />
                </div>
            </div>

            <div class="container-checkboxs">
                <Input
                label="Unidade"
                type="checkbox"
                class="input-checkbox"
                id="unityCheckbox"
                v-model="unityCheckbox"
                :isRequired="false"
                />

                <Input
                label="LT/ML"
                type="checkbox"
                id="lt-ml"
                class="input-checkbox"
                v-model="volumeCheckbox"
                :isRequired="false"
                />

                <Input
                label="KG/G"
                type="checkbox"
                id="kg"
                class="input-checkbox"
                v-model="weightCheckbox"
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

        <section v-show="teste" class="container-section-result">
          <div class="container-result">
            <div class="container-result-product">
              <h3>Papel Higiênico Personal 12R</h3>
              <span><strong>Valor:</strong> R$ 19,99</span>
              <span><strong>Valor por unidade:</strong> R$ 1,66</span>
              <span><strong>Valor por LT/ML:</strong> R$ 1,66</span>
              <span><strong>Valor por KG/G:</strong> R$ 1,66</span>
              <Button>Adicionar no carrinho</Button>
            </div>

            <div class="container-result-product">
              <h3>Papel Higiênico Personal 12R</h3>
              <span><strong>Valor: </strong>R$ 19,99</span>
              <span><strong>Valor por unidade:</strong> R$ 1,66</span>
              <span><strong>Valor por LT/ML:</strong> R$ 1,66</span>
              <span><strong>Valor por KG/G:</strong> R$ 1,66</span>
              <Button>Adicionar no carrinho</Button>
            </div>
          </div>

          <div class="container-best-option">
            <h3>Qual melhor opção?</h3>
            <span><strong>Produto:</strong> Papel Higiênico Folha Dupla Deluxe Cotton 12 Rolos</span>
            <span><strong>Valor:</strong> -R$ 3,36</span>
            <span><strong>Valor por unidade:</strong> R$ 1,36</span>
            <span><strong>Valor por LT/ML:</strong> R$ 1,36</span>
            <span><strong>Valor por KG/G:</strong> R$ 1,36</span>
            <div class="container-best-option-btns">
              <Button>Comparar novos produtos</Button>
              <router-link to="/">
                <Button>Carrinho de compras</Button>
              </router-link>
            </div>
          </div>
          
        </section>

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

            input, label {
              cursor: pointer;
            }
        }
    }
    .container-btns{
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
    }

    .container-section-result{
      display: flex;
      flex-direction: column;
      gap: 20px;

      .container-result{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        border-bottom: 1px solid #DCDCDC;
        border-top: 1px solid #DCDCDC;
        padding: 20px 0;

        .container-result-product{
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
      }
    
      .container-best-option{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;

        .container-best-option-btns{
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }
      }
    }

    @media (max-width: 768px){

      .container-fields{
        height: 400px;
      }
      .container-btns{
        flex-direction: column;

        button{
            width: 100%;
        }
      }
    }

</style>
