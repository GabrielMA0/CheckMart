<template>
    <main>
      <div class="container-cart">
        <h2>Carrinho</h2>

        <div class="container-search-fields">

          <div class="container-field-label">
            <label for="search">Pesquise por produto</label>
            <input type="text" id="search" placeholder="Ex: Refrigerante" v-model="searchFieldValue" :disabled="fieldDisabled">
          </div>

          <div class="container-field-label">
            <label for="filter">Filtrar por</label>
            <select id="filter" v-model="selectValueOrganize" @change="organizeProducts" :disabled="fieldDisabled">
              <option value="1">Selecione um filtro</option>
              <option value="Menor preço">Menor preço</option>
              <option value="Maior preço">Maior preço</option>
              <option value="Ordem Alfabética A-Z">Ordem Alfabética A-Z</option>
              <option value="Ordem Alfabética Z-A">Ordem Alfabética Z-A</option>
            </select>
          </div>
          
          <div class="container-clear-cart-button">
            <button class="clear-cart-button" @click="$emit('cleanShoppingCart')"><span class="material-symbols-outlined">clear_all</span>Limpar carrinho</button>
          </div>

          <AlertMessages v-show="showWarningMessage" :class="{'open-message-alert-warning': animationMessageWarning, 'close-message-alert-warning': !animationMessageWarning }" :warningMessage="warningMessage" :titleWarning="titleWarning"/>
          
          <AlertMessages v-show="showClearMessage" :class="{'open-message-alert-warning': animationMessageWarning, 'close-message-alert-warning': !animationMessageWarning }" :titleClear="titleClear" :clearMessage="clearMessage"/>
        </div>

        <div class="container-table">
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor</th>
                <th>Qtda</th>
                <th>Valor Total</th>
                <th>Categoria</th>
                <th>Marca</th>
                <th>Sabor</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
                <tr v-for="(product, index) in productsToDisplay" :key="index">
                  <td>{{ product.productName }}</td>
                  <td> R$ {{ product.price }}</td>
                  <td>{{ product.amount }}</td>
                  <td> R$ {{ product.totalValueProduct}}</td>
                  <td class="product-category">{{ product.category }}</td>
                  <td>{{ product.brand }}</td>
                  <td>{{ product.flavor }}</td>
                  <td class="container-actions-btns">
                    <button class="edit-button"><span class="material-symbols-outlined" title="Editar produto" @click="$emit('editProduct', product, index)">edit</span></button> 
                    <button class="delete-button" @click="openModalWarning(product, index)" title="Apagar produto"><span class="material-symbols-outlined">delete</span></button>
                    <button class="eye-button" @click="$emit('editProduct', product, index)"><span class="material-symbols-outlined">visibility</span></button>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
        <span class="text-total-value">TOTAL DA COMPRA:<span>R$ {{ totalPurchaseValue }}</span></span>
      </div>
      
      <!-- MODAL BOOTSTRAP -->
      <div v-show="modalWarning" class="modal" tabindex="-1" ref="modalWarning">
        <div class="modal-dialog">
          <div class="modal-content" :class="{'open-modal-animation': modalWarning, 'close-modal-animation': modalWarningclose}">
            <div class="modal-header">
              <h5 class="modal-title">Exclusão de produto</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModalWarning"></button>
            </div>
            <div class="modal-body">
              <p>Tem certeza que deseja remover esse produto do seu carrinho? </p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModalWarning">Cancelar</button>
              <button type="button" class="btn btn-primary" @click="confirmDeletion">Sim</button>
            </div>
          </div>
        </div>
      </div>
    </main>

  </template>
  
  <script>

  import AlertMessages from './AlertMessages.vue';

    export default {
      name: 'MainApp',
      props: ['productData', 'totalPurchaseValue', 'showWarningMessage', 'animationMessageWarning', 'showClearMessage'],
      components:{
        AlertMessages
      },

      data(){
        return{
          searchedProducts: null,
          fieldDisabled: true,
          modalWarning: false,
          modalWarningclose: false,
          indexProduct: 0,
          searchFieldValue: '',
          selectValueOrganize: '1',
          titleWarning: 'Carrinho vazio!',
          titleClear: 'Sucesso!',
          warningMessage: 'coloque algum produto para poder limpar.',
          clearMessage: 'Carrinho esvaziado'
        }
      },
      methods:{ 

        organizeProducts(){

          if (this.selectValueOrganize === 'Menor preço') {
              return this.productData.sort(function (x, y) {
                  return x.price - y.price
              });
          }
          if(this.selectValueOrganize === 'Maior preço'){
            return this.productData.sort(function (x, y) {
                  return y.price - x.price;
              });
          }
          if(this.selectValueOrganize === 'Ordem Alfabética A-Z'){
            return this.productData.sort((a,b) => {
              if (a.productName < b.productName)
              return -1
              if (a.productName > b.productName)
                return 1;

            return 0
            })
          }
          if(this.selectValueOrganize === 'Ordem Alfabética Z-A'){
            return this.productData.sort((a,b) => {
              if (a.productName > b.productName)
              return -1
              if (a.productName < b.productName)
                return 1;

            return 0
            })
          }
        },

        openModalWarning(product, index){

          this.indexProduct = index
          this.modalWarning = true
          this.modalWarningclose = false
        },

        closeModalWarning(){

          this.modalWarningclose = true

          setTimeout(() => {
            this.modalWarning = false
          }, 450);
        },

        confirmDeletion(e){

          this.closeModalWarning()
          this.$emit('removeProduct', this.indexProduct)
        }

      },

      computed: {

        productsToDisplay(){

          if(!this.productData.length){
            this.fieldDisabled = true
          } else{
            this.fieldDisabled = false
          }

          if(this.searchFieldValue === ''){

            return this.productData

          } else {

            return this.searchedProducts = this.productData.filter(product =>
            product.productName.toLowerCase().includes(this.searchFieldValue.toLowerCase()) || product.category.toLowerCase().includes(this.searchFieldValue.toLowerCase()) || product.brand.toLowerCase().includes(this.searchFieldValue.toLowerCase())
            );
          }
        }

      },
    }
  </script>

  <style lang="scss" scoped>

  // --BOOTSTRAP--

    .modal{
      display: block;
      z-index: 3;

      &::before{
      content: '';
      width: 100vw;
      height: 100vh;
      position: absolute;
      background-color: rgba(0,0,0,0.5);
      }
    }
    .modal-dialog{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container-message-warning{
      position: absolute;
      top: -10px;
      right: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      
      .alert{
        box-shadow: 5px 8px 21px rgba(0,0,0,0.2);
      }

    }

    // --BOOTSTRAP--
    .container-cart{
      background-color: white;
      border-radius: 20px;
      box-shadow: 5px 8px 21px rgba(0,0,0,0.2);
      padding: 20px;
      width: 1000px;
      height: 600px;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      h2{
        padding-bottom: 30px;
      }

      .container-search-fields{
        display: flex;
        gap: 32px;
        margin-bottom: 30px;
        align-items: end;

        .container-field-label{
          display: flex;
          align-items: center;
          flex-direction: column;

          #search, #filter{
            &:disabled{
              cursor: not-allowed;
              background-color: rgba(0,0,0,0.2);
              opacity: 0.3;
            }
          }
        }

        .clear-cart-button{
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid gray;
          border-radius: 5px;
          padding: 10px;
          gap: 5px;

            &:hover{
              background-color: #efefef;
            }
        }
      }
      .container-table{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;

        table{
          border-collapse: collapse;
          width: 100%;
          margin: 0;
          padding: 0;

          th{
            text-align: left;
            text-decoration: underline;
            font-size: 25px;
            padding-bottom: 30px;
            text-align: center;
            border-bottom: 1px solid #DCDCDC;
          }

          tbody > tr{
            border-bottom: 1px solid #DCDCDC;

            td {
              font-size: 20px;
              padding: 20px 10px;
              text-align: center;
              text-transform: capitalize;
            }
            .container-actions-btns{
              padding: 0;
              .edit-button, .delete-button, .eye-button{
                  border: none;
                  background: transparent;
                  padding: 10px;
                  opacity: 0.8;

                  &:hover{
                    opacity: 1;
                  }
              }
              .eye-button{
                display: none;
                border: 1px solid rgba(0, 0, 0, 0.3);
                border-radius: 50%;
              }
            }
          }
        }
      }
      .text-total-value{
        font-size: 25px;
        padding-top: 20px;

        span{
          padding-left: 5px;
          font-weight: bold;
        }
      }

    }

    // MOBILE

    @media (max-width: 425px) {
        thead {
          display: none;
        }

        .container-cart {
          width: 90vw;
          height: 580px;

          h2{
            padding-bottom: 15px;
          }

          .container-search-fields {
            flex-direction: column;
            align-items: center;
            gap: 20px;
            width: 100%;

            .container-field-label{
              width: 100%;
            }

            .container-clear-cart-button{
              width: 100%;
              .clear-cart-button{
                width: 100%;
              }
            }
          }
          .text-total-value{
            font-size: 15px;
          }
          
          .container-table{
            table{
              
              tbody{
                
                tr{

                  display: flex;
                  align-items: center;
                  justify-content: center;

                  td:first-child{
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                  
                  td{
                    width: 33%;
                    text-align: left;
                    &:nth-child(n+3) {
                      display: none;
                    }
                  }

                  .container-actions-btns{
                    display: flex !important;
                    padding: 20px 10px;

                    .edit-button, .delete-button{
                      display: none;
                    }
                    .eye-button{
                      opacity: 1;
                      display: flex;  
                      justify-content: center;
                      align-items: center;
                    }
                  }
                }

                tr:first-child{
                  border-top: 1px solid #DCDCDC;
                }
              }
            }
          }
        }

        
      }
  </style>
