
<script setup>
import Container from '../components/Container.vue'
import Subtitle from '../components/Subtitle.vue'
import CustomInput from '../components/CustomInput.vue'
import CustomButton from '../components/CustomButton.vue'

import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { ref } from 'vue'

const showResult = ref(false);
const comparedProducts = ref([]);

const schema = yup.object({
  // Produto 1
  product1: yup.string().required('Preencha o campo obrigatório'),

  price1: yup
    .string()
    .transform((value) => {
      if (!value) return ''
      const onlyNumbers = value.replace(/[^\d]/g, '')
      const withoutLeadingZeros = onlyNumbers.replace(/^0+/, '')
      return withoutLeadingZeros
    })
    .test('is-valid-price', 'Informe um valor maior que 0', (value) => {
      return value !== '' && Number(value) > 0
    })
    .required('Preencha o campo obrigatório'),

  // Checkboxes
  unitCheckbox: yup.boolean(),
  volumeLTCheckbox: yup.boolean(),
  volumeMLCheckbox: yup.boolean(),
  weightKGCheckbox: yup.boolean(),
  weightGCheckbox: yup.boolean(),

  // Produto 1 - medidas
  unit1: yup.number().nullable().when('unitCheckbox', {
    is: true,
    then: (schema) => schema.required('Preencha o campo obrigatório'),
    otherwise: (schema) => schema.notRequired()
  }),

  volumeLT1: yup.number().nullable().when('volumeLTCheckbox', {
    is: true,
    then: (schema) => schema.required('Preencha o campo obrigatório'),
    otherwise: (schema) => schema.notRequired()
  }),

  volumeML1: yup.number().nullable().when('volumeMLCheckbox', {
    is: true,
    then: (schema) => schema.required('Preencha o campo obrigatório'),
    otherwise: (schema) => schema.notRequired()
  }),

  weightKG1: yup.number().nullable().when('weightKGCheckbox', {
    is: true,
    then: (schema) => schema.required('Preencha o campo obrigatório'),
    otherwise: (schema) => schema.notRequired()
  }),

  weightG1: yup.number().nullable().when('weightGCheckbox', {
    is: true,
    then: (schema) => schema.required('Preencha o campo obrigatório'),
    otherwise: (schema) => schema.notRequired()
  }),

  // Produto 2
  product2: yup.string().required('Preencha o campo obrigatório'),

  price2: yup
    .string()
    .transform((value) => value.replace(/[^\d]/g, ''))
    .test('is-valid-price', 'Informe um valor maior que 0', (value) => Number(value) > 0)
    .required('Preencha o campo obrigatório'),

  unit2: yup.number().nullable().when('unitCheckbox', {
    is: true,
    then: (schema) => schema.required('Preencha o campo obrigatório'),
    otherwise: (schema) => schema.notRequired()
  }),

  volumeLT2: yup.number().nullable().when('volumeLTCheckbox', {
    is: true,
    then: (schema) => schema.required('Preencha o campo obrigatório'),
    otherwise: (schema) => schema.notRequired()
  }),

  volumeML2: yup.number().nullable().when('volumeMLCheckbox', {
    is: true,
    then: (schema) => schema.required('Preencha o campo obrigatório'),
    otherwise: (schema) => schema.notRequired()
  }),

  weightKG2: yup.number().nullable().when('weightKGCheckbox', {
    is: true,
    then: (schema) => schema.required('Preencha o campo obrigatório'),
    otherwise: (schema) => schema.notRequired()
  }),

  weightG2: yup.number().nullable().when('weightGCheckbox', {
    is: true,
    then: (schema) => schema.required('Preencha o campo obrigatório'),
    otherwise: (schema) => schema.notRequired()
  })
})

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  validateOnMount: false
})

// Produto 1
const { value: product1, errorMessage: product1Error } = useField('product1')
const { value: price1, errorMessage: price1Error } = useField('price1', undefined, { validateOnValueUpdate: false })
const { value: unit1, errorMessage: unit1Error } = useField('unit1')
const { value: volumeLT1, errorMessage: volumeLT1Error } = useField('volumeLT1')
const { value: volumeML1, errorMessage: volumeML1Error } = useField('volumeML1')
const { value: weightKG1, errorMessage: weightKG1Error } = useField('weightKG1')
const { value: weightG1, errorMessage: weightG1Error } = useField('weightG1')

// Produto 2
const { value: product2, errorMessage: product2Error } = useField('product2')
const { value: price2, errorMessage: price2Error } = useField('price2', undefined, { validateOnValueUpdate: false })
const { value: unit2, errorMessage: unit2Error } = useField('unit2')
const { value: volumeLT2, errorMessage: volumeLT2Error } = useField('volumeLT2')
const { value: volumeML2, errorMessage: volumeML2Error } = useField('volumeML2')
const { value: weightKG2, errorMessage: weightKG2Error } = useField('weightKG2')
const { value: weightG2, errorMessage: weightG2Error } = useField('weightG2')

// Checkboxes
const { value: unitCheckbox } = useField('unitCheckbox')
const { value: volumeLTCheckbox } = useField('volumeLTCheckbox')
const { value: volumeMLCheckbox } = useField('volumeMLCheckbox')
const { value: weightKGCheckbox } = useField('weightKGCheckbox')
const { value: weightGCheckbox } = useField('weightGCheckbox')

const blockNegativeNumbers = (e) => {
  const keycode = e.key
  if (keycode === '-' || keycode === '+' || keycode === 'e') {
    e.preventDefault()
  }
}

const calculatePricePerUnit = (product, { unitCheckbox, volumeLTCheckbox, volumeMLCheckbox, weightKGCheckbox, weightGCheckbox }) => {
  if (unitCheckbox && product.unit) {
    return product.price / product.unit
  }
  if (volumeLTCheckbox && product.volumeLT) {
    return product.price / product.volumeLT
  }
  if (volumeMLCheckbox && product.volumeML) {
    return product.price / (product.volumeML / 1000)
  }
  if (weightKGCheckbox && product.weightKG) {
    return product.price / product.weightKG
  }
  if (weightGCheckbox && product.weightG) {
    return product.price / (product.weightG / 1000)
  }
  return null
}

const compareProduct = handleSubmit((values) => {
  const priceParse1 = Number(values.price1.replace("R$ ", "").replace(/\./g, "").replace(",", "."))
  const priceParse2 = Number(values.price2.replace("R$ ", "").replace(/\./g, "").replace(",", "."))

  const products = [
    {
      name: values.product1,
      price: priceParse1,
      unit: values.unit1,
      volumeLT: values.volumeLT1,
      volumeML: values.volumeML1,
      weightKG: values.weightKG1,
      weightG: values.weightG1
    },
    {
      name: values.product2,
      price: priceParse2,
      unit: values.unit2,
      volumeLT: values.volumeLT2,
      volumeML: values.volumeML2,
      weightKG: values.weightKG2,
      weightG: values.weightG2
    }
  ]

  const withUnitPrice = products.map(p => ({
    ...p,
    pricePerUnit: calculatePricePerUnit(p, values)
  }))

  const [p1, p2] = withUnitPrice
  const cheapest = p1.pricePerUnit < p2.pricePerUnit ? p1 : p2

  const diffTotal = (Math.max(p1.price, p2.price) - Math.min(p1.price, p2.price)).toFixed(2)
  const diffUnit = (Math.max(p1.pricePerUnit, p2.pricePerUnit) - Math.min(p1.pricePerUnit, p2.pricePerUnit)).toFixed(2)

  comparedProducts.value = {
    products: withUnitPrice,
    cheapest,
    difference: { total: diffTotal, unit: diffUnit }
  }
  showResult.value = true
})
</script>

<template>
  <Container>
    <Subtitle>{{ !showResult ? 'Comparar produtos' : 'Resultado' }}</Subtitle>

    <form v-show="!showResult" @submit.prevent="compareProduct">
      <div class="container-fields">
        <!-- Produto 1 -->
        <div class="container-product">
          <span class="title-product">Produto 01</span>
          <CustomInput label="Nome" placeholder="Ex: Coca-cola" type="text" v-model="product1" :isRequired="true" :hasError="product1Error" :messageError="product1Error" />
          <CustomInput label="Preço" placeholder="Ex: R$ 5,00" type="text" v-model="price1" :useMoney="true" @keydown="blockNegativeNumbers" :isRequired="true" :hasError="price1Error" :messageError="price1Error" />

          <CustomInput v-show="unitCheckbox" label="Unidade" type="number" v-model="unit1" :isRequired="true" :hasError="unit1Error" :messageError="unit1Error" />
          <CustomInput v-show="volumeLTCheckbox" label="Litros" type="number" v-model="volumeLT1" :isRequired="true" :hasError="volumeLT1Error" :messageError="volumeLT1Error" />
          <CustomInput v-show="volumeMLCheckbox" label="Mililitros" type="number" v-model="volumeML1" :isRequired="true" :hasError="volumeML1Error" :messageError="volumeML1Error" />
          <CustomInput v-show="weightKGCheckbox" label="Quilos" type="number" v-model="weightKG1" :isRequired="true" :hasError="weightKG1Error" :messageError="weightKG1Error" />
          <CustomInput v-show="weightGCheckbox" label="Gramas" type="number" v-model="weightG1" :isRequired="true" :hasError="weightG1Error" :messageError="weightG1Error" />
        </div>

        <!-- Produto 2 -->
        <div class="container-product">
          <span class="title-product">Produto 02</span>
          <CustomInput label="Nome" placeholder="Ex: Dolly" type="text" v-model="product2" :isRequired="true" :hasError="product2Error" :messageError="product2Error" />
          <CustomInput label="Preço" placeholder="Ex: R$ 5,00" type="text" v-model="price2" :useMoney="true" @keydown="blockNegativeNumbers" :isRequired="true" :hasError="price2Error" :messageError="price2Error" />

          <CustomInput v-show="unitCheckbox" label="Unidade" type="number" v-model="unit2" :isRequired="true" :hasError="unit2Error" :messageError="unit2Error" />
          <CustomInput v-show="volumeLTCheckbox" label="Litros" type="number" v-model="volumeLT2" :isRequired="true" :hasError="volumeLT2Error" :messageError="volumeLT2Error" />
          <CustomInput v-show="volumeMLCheckbox" label="Mililitros" type="number" v-model="volumeML2" :isRequired="true" :hasError="volumeML2Error" :messageError="volumeML2Error" />
          <CustomInput v-show="weightKGCheckbox" label="Quilos" type="number" v-model="weightKG2" :isRequired="true" :hasError="weightKG2Error" :messageError="weightKG2Error" />
          <CustomInput v-show="weightGCheckbox" label="Gramas" type="number" v-model="weightG2" :isRequired="true" :hasError="weightG2Error" :messageError="weightG2Error" />
        </div>
      </div>

      <!-- Checkboxes -->
      <div class="container-checkboxs">
        <CustomInput label="Unidade" type="checkbox" id="unitCheckbox" class="input-checkbox" v-model="unitCheckbox" />
        <CustomInput label="Litros" type="checkbox" id="ltCheckbox" class="input-checkbox" v-model="volumeLTCheckbox" />
        <CustomInput label="Mililitros" type="checkbox" id="mlCheckbox" class="input-checkbox" v-model="volumeMLCheckbox" />
        <CustomInput label="Quilos" type="checkbox" id="kgCheckbox" class="input-checkbox" v-model="weightKGCheckbox" />
        <CustomInput label="Gramas" type="checkbox" id="gCheckbox" class="input-checkbox" v-model="weightGCheckbox" />
      </div>

      <div class="container-btns">
        <CustomButton type="submit">Comparar</CustomButton>
        <CustomButton type="button" @click="resetForm">Limpar campos</CustomButton>
        <router-link to="/">
          <CustomButton type="button">Carrinho de compras</CustomButton>
        </router-link>
      </div>
    </form>

    <section v-show="showResult" class="container-section-result">
      <div class="container-result">
        <div
          v-for="(p, i) in comparedProducts.products"
          :key="i"
          class="container-result-product"
        >
          <h3>{{ p.name }}</h3>
          <span><strong>Valor:</strong> R$ {{ p.price.toFixed(2) }}</span>
          <span v-if="p.unit"><strong>Valor por unidade:</strong> R$ {{ (p.pricePerUnit).toFixed(2) }}</span>
          <span v-if="p.volumeLT"><strong>Valor por LT:</strong> R$ {{ (p.pricePerUnit).toFixed(2) }}</span>
          <span v-if="p.volumeML"><strong>Valor por ML:</strong> R$ {{ (p.pricePerUnit).toFixed(2) }}</span>
          <span v-if="p.weightKG"><strong>Valor por KG:</strong> R$ {{ (p.pricePerUnit).toFixed(2) }}</span>
          <span v-if="p.weightG"><strong>Valor por G:</strong> R$ {{ (p.pricePerUnit).toFixed(2) }}</span>
          <Custo mButton>Adicionar no carrinho</Custo>
        </div>
      </div>

      <div class="container-best-option" v-if="comparedProducts.cheapest">
        <h3>Qual melhor opção?</h3>
        <span><strong>Produto:</strong> {{ comparedProducts.cheapest.name }}</span>
        <span><strong>Valor:</strong> R$ {{ comparedProducts.cheapest.price.toFixed(2) }}</span>
        <span><strong>Diferença de valor:</strong> R$ {{ comparedProducts.difference.total }}</span>
        <span><strong>Diferença por unidade:</strong> R$ {{ comparedProducts.difference.unit }}</span>
        <div class="container-best-option-btns">
          <CustomButton @click="() => { showResult = false; resetForm(); }">Comparar novos produtos</CustomButton>
          <router-link to="/">
            <CustomButton>Carrinho de compras</CustomButton>
          </router-link>
        </div>
      </div>
    </section>
  </Container>
</template>


<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.container-fields {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  overflow: auto;

  .container-product {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    .title-product {
      font-weight: bold;
      font-size: 20px;
    }
  }
}
.container-checkboxs {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;

  .input-checkbox {
    align-items: center;
    flex-direction: row-reverse;
    width: max-content;

    label {
      padding: 0;
    }

    input,
    label {
      cursor: pointer;
    }
  }
  @media (max-width: 425px) {    
    gap: 10px;
  }
  
}
.container-btns {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.container-section-result {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .container-result {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    border-bottom: 1px solid #dcdcdc;
    border-top: 1px solid #dcdcdc;
    padding: 20px 0;

    .container-result-product {
      display: flex;
      flex-direction: column;
      gap: 20px;
      text-transform: capitalize;
    }
  }

  .container-best-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    .container-best-option-btns {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
    }
  }
}

@media (max-width: 768px) {
  .container-fields {
    height: 400px;
  }
  .container-btns {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
}
</style>
