<script setup>
    import Button from './Button.vue'
    import Container from './Container.vue'
    import {useModalStore} from '../stores/modal'

    const modalStore = useModalStore()

</script>

<template>
    <Container class="w-[388px]">
        <h1>CheckMart</h1>
        <Button @click="modalStore.handleModal('adicionar')">Adicionar Produto</Button>
        <router-link to="/compare-product">
            <Button>Comparar produtos</Button>
        </router-link>
    </Container>
</template>

<style lang="scss" scoped>
</style>
