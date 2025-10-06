<template>
    <Header/>
    <main>
      <Modal/>
      <Cart/>
    </main>
</template>

<script setup>
  import Header from '../components/Header.vue';
  import Cart from '../components/Cart.vue';
  import Modal from '../components/Modal.vue';
</script>

<style lang="scss">

// ---ANIMAÇÕES---
    @keyframes slide-bottom {
        0% {
            transform: translateY(-100px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
    @keyframes slide-top {
        0% {
            transform: translateY(0);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px);
            opacity: 0;
        }
    }
    @keyframes opacity-entrances {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes opacity-exits {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    .open-modal-animation{
        animation-name: slide-bottom;
        animation-duration: 0.5s;
    }
    .close-modal-animation{
        animation-name: slide-top;
        animation-duration: 0.5s;
    }
    .open-message-alert-warning{
      animation-name: opacity-entrances;
      animation-duration: 0.3s;
    }
    .close-message-alert-warning{
      animation-name: opacity-exits;
      animation-duration: 0.3s;
    }

    // ---ANIMAÇÕES---

  body, html{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Outfit', sans-serif !important;
  }

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
  h1,h2{
    font-family: 'Bad Script', cursive;
    font-weight: bold !important;
  }
  
  input, select{
    padding: 0 10px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid black;
    outline: none;
    @media (max-width: 425px) {    
      padding: 5px;
      width: 100%;
    }
  }
  .background{
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 1;
  }
  .field-error{
    border: 1px solid red;
    background-color: rgba(255, 0, 0, 0.2);
  }
  
</style>
