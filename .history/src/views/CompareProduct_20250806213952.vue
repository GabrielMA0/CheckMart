<script setup>
import Container from '../components/Container.vue'
import Subtitle from '../components/Subtitle.vue'
import Input from '../components/Input.vue'
</script>

<template>
    <Container>
        <Subtitle>Comparar produtos</Subtitle>
        <div class="container-fields">
            <div>
                <span>Produto 01</span>
                <Input
                label="Nome"
                placeholder="Ex: Refrigerante"
                type="text"
                v-model="product"
                :isRequired="true"
                :hasError="submitCount > 0 && productError ? true : false"
                :messageError="productError"
                id="productField"
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
            <div>
                <span>Produto 02</span>
                <Input
                label="Nome"
                placeholder="Ex: Refrigerante"
                type="text"
                v-model="product"
                :isRequired="true"
                :hasError="submitCount > 0 && productError ? true : false"
                :messageError="productError"
                id="productField"
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
                v-model="price"
                :isRequired="false"
                />
                <Input
                label="LT/ML"
                type="checkbox"
                class="input-checkbox"
                v-model="price"
                :isRequired="false"
                />
                <Input
                label="KG/G"
                type="checkbox"
                class="input-checkbox"
                v-model="price"
                :isRequired="false"
                />
            </div>
    </Container>
</template>

<style lang="scss">

    .container-fields{
        display: flex;
        gap: 20px;

        .container-checkboxs{
            display: flex;
            gap: 20px;

             .input-checkbox{
                align-items: center;
                flex-direction: row-reverse;

                label{
                    padding: 0;
                }
            }
        }
    }

</style>
