<script setup>
import Container from '../components/Container.vue'
import Subtitle from '../components/Subtitle.vue'
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'
</script>

<template>
    <Container>
        <Subtitle>Comparar produtos</Subtitle>
        <form @submit.prevent="addProduct">
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
                <Button>Comparar</Button>
                <Button>Limpar campos</Button>
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
    }
    .container-checkboxs{
        display: flex;
        gap: 20px;
        justify-content: center;
        flex-wrap: wrap;

            .input-checkbox{
            align-items: center;
            flex-direction: row-reverse;

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

    }

</style>
