<template>
    <header>
        <div class="container-header">
            <h1>Lista de Compras</h1>
            <button @click="$emit('handleModal')" class="btns">Adicionar Produto</button>
        </div>
        
    </header>
    
</template>

<script>
 
 export default{
    name: 'HeaderApp',
    emits: ['handleModal']
  }
</script>

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
    header{

        gap: 20px;
        
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
    }    
</style>
