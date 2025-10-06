<script setup>
    import CustomButton from './CustomButton.vue'
    import Container from './Container.vue'
    import {useModalStore} from '../stores/modal'

    const modalStore = useModalStore()

</script>

<template>
    <Container>
        <h1>CheckMart</h1>
        <CustomButton @click="modalStore.handleModal('adicionar')">Adicionar Produto</CustomButton>
        <router-link to="/compare-product">
            <CustomButton>Comparar produtos</CustomButton>
        </router-link>
    </Container>
</template>

<style lang="scss" scoped>
</style>
