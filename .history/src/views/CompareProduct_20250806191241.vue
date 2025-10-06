<script setup>
import Container from '../components/Container.vue'
import Subtitle from '../components/Subtitle.vue'
import Input from '../components/Input.vue'
</script>

<template>
    <Container>
        <Subtitle>Comparar produtos</Subtitle>
        <div>
            <div>
                <span>Produto 01</span>
                <div>
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
                    <Input/>
                </div>
            </div>
        <div>
            <span>Produto 02</span>
            <div>
                <Input/>
                <Input/>
            </div>
        </div>
        </div>
    </Container>
</template>

<style lang="scss">
</style>
