<script setup>
    import Button from './Button.vue'
    import {useModalStore} from '../stores/modal'

    const modalStore = useModalStore()

</script>

<template>
    <header class="container-header">
        <h1>CheckMart</h1>
        <Button @click="modalStore.openModal">Adicionar Produto</Button>
        <Button>Comparar produto</Button>
    </header>
</template>

<style lang="scss" scoped>

  @import url('https://fonts.googleapis.com/css2?family=Bad+Script&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap');

    .container-header{
        display: flex;
        align-items: center;
        flex-direction: column;
        background-color: white;
        box-shadow: 5px 8px 21px rgba(0,0,0,0.2);
        width: 388px;
        padding: 20px;
        border-radius: 20px;
        gap: 20px;

        @media (max-width: 425px) {    
            width: 90vw;
            gap: 5px;
            height: auto;
            padding: 20px 0;
        }
    }
</style>
