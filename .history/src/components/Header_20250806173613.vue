<script setup>
    import Button from './Button.vue'
    import Container from './Container.vue'
    import {useModalStore} from '../stores/modal'

    const modalStore = useModalStore()

</script>

<template>
    <Container>
        <h1>CheckMart</h1>
        <Button @click="modalStore.handleModal('adicionar')">Adicionar Produto</Button>
        <router-link to="/compare-product">
            <Button>Comparar produtos</Button>
        </router-link>
    </Container>
</template>

<style lang="scss" scoped>

  @import url('https://fonts.googleapis.com/css2?family=Bad+Script&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap');


</style>
