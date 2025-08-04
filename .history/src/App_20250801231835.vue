<template>
  <div class="container">
    <div class="img-background"></div>
    <Header />
    <main>
      <Modal/>
      <Cart/>
    </main>
   
  </div>
</template>

<script setup>
  import Header from './components/Header.vue';
  import Cart from './components/Cart.vue';
  import Modal from './components/Modal.vue';
  
  import {ref} from 'vue'

  const modalOpen = ref(false)
  const modalTypeAdd = ref('adicionar')
  const modalTypeEdit = ref('editar')
  const modal = ref('')
  const indexProduct = ref(null) 
  const animationCloseModal = ref(false) 

  const closeModal = () =>{
    setTimeout(() => {
      modalOpen.value = false
    }, 450);
      
      animationCloseModal.value = true
  }

  const editProduct = (index) => {

    openModal()
    modal.value = modalTypeEdit.value
    indexProduct.value = index
  }
  
</script>

<style lang="scss">

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
  
  .container{
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0;
    padding: 0;
    width: 100% !important;
    height: 100vh;
    justify-content: center;
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
