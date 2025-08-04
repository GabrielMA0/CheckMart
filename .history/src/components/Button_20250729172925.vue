<template>
    <button @click="$emit('handleModal')" class="btns">Adicionar Produto</button>
</template>

<script>
 
 export default{
    name: 'HeaderApp',
    emits: ['handleModal']
  }
</script>

<style lang="scss" scoped>

  .btns{
    background-color: #3D5CFF;
    border: 1px solid #5F79FF;
    padding: 10px 20px;
    color: white;
    border-radius: 10px;
    height: auto !important;

    &:hover{
    background-color: #0023D8;
    }
  }
</style>
