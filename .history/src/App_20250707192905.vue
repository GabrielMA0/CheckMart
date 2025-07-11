<template>
  <div class="container">
    <div class="img-background"></div>
    <HeaderApp @openModal="openModal"/>
    <ModalApp ref="setFieldsFromEditData" :modalOpen="modalOpen" :animationCloseModal="animationCloseModal" :sendProductData="receiveProductData" :modal="modal" :indexProduct="indexProduct" :modalTypeAdd="modalTypeAdd" :modalTypeEdit="modalTypeEdit" :showAlertMessage="showAlertMessage" :showErrorMessage="showErrorMessage" :titleError="titleError" :errorMessage="errorMessage" :animationMessageError="animationMessageError" @removeProduct="removeProduct" @closeModal="closeModal" @SaveProductEdit="SaveProductEdit"/>
    <MainApp :productData="productData" :animationMessageWarning="animationMessageWarning" :totalPurchaseValue="totalPurchaseValue" @removeProduct="removeProduct" @editProduct="editProduct" @cleanShoppingCart="cleanShoppingCart"/>
  </div>
</template>

<script>
  import HeaderApp from './components/HeaderApp.vue';
  import MainApp from './components/MainApp.vue';
  import ModalApp from './components/ModalApp.vue';

  export default{
    name: 'app',
    components: {
      HeaderApp,
      MainApp,
      ModalApp
    },
    data(){
      return{
        modalOpen: false,
        productData: '',
        totalPurchaseValue: 0,
        productValue: 0,
        modalTypeAdd: 'adicionar',
        modalTypeEdit: 'editar',
        modal: '',
        editProductData: null,
        indexProduct: null,
        animationCloseModal: false,
        animationMessageWarning: false,
        titleError: 'Erro:',
        errorMessage: 'preencha os campos obrigatórios.',
        animationMessageError: false,
      }
    },

    methods: {

      openModal(){
        this.modalOpen = true
        this.animationCloseModal = false
        this.modal = this.modalTypeAdd
      },

      closeModal(){
        setTimeout(() => {
          this.modalOpen = false
        }, 450);
          
          this.animationCloseModal = true
          this.showErrorMessage = false
      },

      receiveProductData(data){

        this.productData = data

        this.calculateTotal()

      },

      removeProduct(index){

        this.productData.splice(index, 1)

        this.calculateTotal()

      },

      editProduct(product, index){

        this.openModal()
        this.modal = this.modalTypeEdit
        this.editProductData = product
        this.indexProduct = index

        this.$refs.setFieldsFromEditData.setFieldsFromEditData(this.editProductData)

      },

      SaveProductEdit(editedProduct){

        this.productData[this.indexProduct] = editedProduct
        this.modal = this.modalTypeEdit
        this.closeModal()

        this.calculateTotal()
  
      },

      cleanShoppingCart(){
          this.showAlertMessage('clear')
          this.productData.length = 0
          this.calculateTotal()
      },
      
      calculateTotal(){

        this.totalPurchaseValue = this.productData.reduce(function(accumulator,product){ 
        return accumulator + product.totalValueProduct
        },0); 

      },

      showAlertMessage(typeMessage){

        if(typeMessage === 'warning'){
          this.animationMessageWarning = true

          setTimeout(() => {
            this.animationMessageWarning = false
          }, 2400);

          setTimeout(() => {
          }, 2500);
        } 

        if(typeMessage === 'clear'){
          
          this.animationMessageWarning = true
          this.showClearMessage = true

          setTimeout(() => {
            this.animationMessageWarning = false
          }, 2400);

          setTimeout(() => {
            this.showClearMessage = false
          }, 2500);
        
        }

        if(typeMessage === 'error'){

          this.showErrorMessage = true
          this.animationMessageError = true

          setTimeout(() => {
            this.animationMessageError = false
          }, 2400);

          setTimeout(() => {
            this.showErrorMessage = false
          }, 2500);
        }
      }
      
    }
  }
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

  @mixin flexCenter(){
    display: flex;
    align-items: center;
  }

  body, html{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Outfit', sans-serif !important;
  }

  .img-background{
    background-image: url("./assets/Background.png");
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
  
  header{
    margin-top: 10px;
  }
  h1,h2{
    font-family: 'Bad Script', cursive;
    font-weight: bold !important;
  }
  h2{
    font-size: 30px;
    margin: 0;
  }
  button{
    cursor: pointer;
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
  label{
    padding-bottom: 4px;
    cursor: text;
  }
  .container{
    @include flexCenter();
    flex-direction: column;
    margin: 0;
    padding: 0;
    width: 100% !important;
    height: 100vh;
    justify-content: center;
  }
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
