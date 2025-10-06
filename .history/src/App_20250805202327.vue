<template>
  <div class="container">
    <div class="img-background"></div>
    <router-view />
  </div>
</template>

<script setup>
</script>

<style lang="scss">
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
  
  .container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0;
    padding: 0;
    width: 100% !important;
    height: 100vh;
  }
</style>
