<template>
  <div class="container-main">
    <div class="img-background"></div>
    <router-view />
  </div>
</template>

<script setup>
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Bad+Script&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap');

  .img-background{
    background-position: center;
    background-image: url("./assets/Background.svg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
  
  .container-main{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 100% !important;
    height: 100vh;
  }
</style>
