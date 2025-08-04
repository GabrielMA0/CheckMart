<script setup>
  import Button from './Button.vue'
</script>

<template>
    <header class="container-header">
        <div>
            <h1>CheckMart</h1>
            <Button @click="$emit('handleModal')" class="btns">Adicionar Produto</Button>
            <Button class="btns">Comparar produto</Button>
        </div>
    </header>
</template>

<style lang="scss" scoped>

  @import url('https://fonts.googleapis.com/css2?family=Bad+Script&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap');

    $shadowContainer: 5px 8px 21px rgba(0,0,0,0.2);

    @mixin flexCenter(){
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
        
        .container-header{
            @include flexCenter();
            background-color: white;
            box-shadow: $shadowContainer;
            width: 388px;
            height: 191px;
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
