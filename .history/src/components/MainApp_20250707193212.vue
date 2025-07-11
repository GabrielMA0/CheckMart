<template>
  <main v-show="this.productData.length">
    <div class="container-cart">
      <h2>Carrinho</h2>

      <div class="container-search-fields">

        <div class="container-field-label">
          <label for="search">Pesquise por</label>
          <input type="text" id="search" placeholder="Produto, categoria ou marca" v-model="searchFieldValue">
        </div>

        <div class="container-field-label">
          <label for="filter">Filtrar por</label>
          <select id="filter" v-model="selectValueOrganize" @change="organizeProducts">
            <option value="1">Selecione um filtro</option>
            <option value="Menor preço">Menor preço</option>
            <option value="Maior preço">Maior preço</option>
            <option value="Ordem Alfabética A-Z">Ordem Alfabética A-Z</option>
            <option value="Ordem Alfabética Z-A">Ordem Alfabética Z-A</option>
          </select>
        </div>

        <div class="container-clear-cart-button">
          <button class="clear-cart-button" @click="$emit('cleanShoppingCart')"><span
              class="material-symbols-outlined">clear_all</span>Limpar carrinho</button>
        </div>
       
      </div>

      <div class="grid-container-title">
        <span class="grid-title">Produto</span>
        <span class="grid-title">Valor</span>
        <span class="grid-title">Qtda</span>
        <span class="grid-title">Valor Total</span>
        <span class="grid-title">Categoria</span>
        <span class="grid-title">Marca</span>
        <span class="grid-title">Sabor</span>
        <span class="grid-title">Peso: KG/G</span>
        <span class="grid-title">Ações</span>
      </div>

      <div class="container-products">
        <div class="grid-container" v-for="(product, index) in productsToDisplay" :key="index">

          <span class="grid-items">{{ product.productName }}</span>
          <span class="grid-items">R$ {{ product.price }}</span>
          <span class="grid-items">{{ product.amount }}</span>
          <span class="grid-items">R$ {{ product.totalValueProduct }}</span>
          <span class="grid-items">{{ product.category }}</span>
          <span class="grid-items">{{ product.brand }}</span>
          <span class="grid-items">{{ product.flavor }}</span>
          <span class="grid-items">{{ product.flavor }}</span>

          <div class="container-actions-btns">
            <button class="edit-button"><span class="material-symbols-outlined" title="Editar produto"
                @click="$emit('editProduct', product, index)">edit</span></button>
            <button class="delete-button" @click="openModalWarning(product, index)" title="Apagar produto"><span
                class="material-symbols-outlined">delete</span></button>
            <button class="eye-button" @click="$emit('editProduct', product, index)"><span
                class="material-symbols-outlined">visibility</span></button>
          </div>

        </div>
      </div>

      <span class="text-total-value">TOTAL DA COMPRA:<span>R$ {{ totalPurchaseValue }}</span></span>
    </div>

    <!-- MODAL BOOTSTRAP -->
    <div v-show="modalWarning" class="modal" tabindex="-1" ref="modalWarning">
      <div class="modal-dialog">
        <div class="modal-content"
          :class="{ 'open-modal-animation': modalWarning, 'close-modal-animation': modalWarningclose }">
          <div class="modal-header">
            <h5 class="modal-title">Exclusão de produto</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
              @click="closeModalWarning"></button>
          </div>
          <div class="modal-body">
            <p>Tem certeza que deseja remover esse produto do seu carrinho? </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
              @click="closeModalWarning">Cancelar</button>
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
  components: {
    AlertMessages
  },

  data() {
    return {
      searchedProducts: null,
      fieldDisabled: true,
      modalWarning: false,
      modalWarningclose: false,
      indexProduct: 0,
      searchFieldValue: '',
      selectValueOrganize: '1',
    }
  },
  methods: {

    organizeProducts() {

      if (this.selectValueOrganize === 'Menor preço') {
        return this.productData.sort(function (x, y) {
          return x.price - y.price
        });
      }
      if (this.selectValueOrganize === 'Maior preço') {
        return this.productData.sort(function (x, y) {
          return y.price - x.price;
        });
      }
      if (this.selectValueOrganize === 'Ordem Alfabética A-Z') {
        return this.productData.sort((a, b) => {
          if (a.productName < b.productName)
            return -1
          if (a.productName > b.productName)
            return 1;

          return 0
        })
      }
      if (this.selectValueOrganize === 'Ordem Alfabética Z-A') {
        return this.productData.sort((a, b) => {
          if (a.productName > b.productName)
            return -1
          if (a.productName < b.productName)
            return 1;

          return 0
        })
      }
    },

    openModalWarning(product, index) {

      this.indexProduct = index
      this.modalWarning = true
      this.modalWarningclose = false
    },

    closeModalWarning() {

      this.modalWarningclose = true

      setTimeout(() => {
        this.modalWarning = false
      }, 450);
    },

    confirmDeletion(e) {

      this.closeModalWarning()
      this.$emit('removeProduct', this.indexProduct)
    }

  },

  computed: {

    productsToDisplay() {

      if (!this.productData.length) {
        this.fieldDisabled = true
      } else {
        this.fieldDisabled = false
      }

      if (this.searchFieldValue === '') {

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
.grid-container,
.grid-container-title {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  width: 100%;
  height: 65px;
  border-bottom: 1px solid #ddd;
  align-content: center;

  .grid-items,
  .grid-title {
    padding: 10px;
    text-align: center;
    text-transform: capitalize;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .grid-title {
    font-weight: bold;
    font-size: 20px;
  }
}

// --BOOTSTRAP--

.modal {
  display: block;
  z-index: 3;

  &::before {
    content: '';
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
  }
}

.modal-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
}

// --BOOTSTRAP--
.container-cart {
  background-color: white;
  border-radius: 20px;
  box-shadow: 5px 8px 21px rgba(0, 0, 0, 0.2);
  padding: 20px;
  max-width: 1200px;
  height: 70vh;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  h2 {
    padding-bottom: 30px;
  }

  .container-search-fields {
    display: flex;
    gap: 32px;
    margin-bottom: 30px;
    align-items: end;
    flex-wrap: wrap;

    .container-field-label {
      display: flex;
      align-items: center;
      flex-direction: column;

      #search,
      #filter {
        &:disabled {
          cursor: not-allowed;
          background-color: rgba(0, 0, 0, 0.2);
          opacity: 0.3;
        }
      }
    }

    .clear-cart-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: 1px solid gray;
      border-radius: 5px;
      padding: 10px;
      gap: 5px;

      &:hover {
        background-color: #efefef;
      }
    }
  }

  .container-products {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    .container-actions-btns {
      display: flex;
      align-items: center;
      justify-content: center;

      .edit-button,
      .delete-button,
      .eye-button {
        border: none;
        background: transparent;
        padding: 10px;
        opacity: 0.8;

        &:hover {
          opacity: 1;
        }
      }

      .eye-button {
        display: none;
        border: 1px solid rgba(0, 0, 0, 0.3);
        border-radius: 50%;
      }
    }
  }
}

.text-total-value {
  font-size: 25px;
  padding-top: 20px;

  span {
    padding-left: 5px;
    font-weight: bold;
  }
}

// MOBILE

@media (max-width: 767px) {

  .container-cart {
    width: 90vw;
    margin-top: 10px;
    min-height: auto;
    max-height: 100vh;

    h2 {
      padding-bottom: 0;
    }

    .grid-container-title {
      display: none;
    }

    .grid-container {
      grid-template-columns: repeat(3, 1fr);

      span:nth-child(n+3) {
        display: none;
      }
    }

    .container-search-fields {
      flex-direction: column;
      align-items: center;
      gap: 10px;
      width: 100%;
      margin-bottom: 15px;

      .container-field-label {
        width: 100%;
        flex-direction: row;
        font-size: 15px;

        input,
        select {
          width: 100%;
        }
      }

      .container-clear-cart-button {
        width: 100%;

        .clear-cart-button {
          width: 100%;
        }
      }
    }

    .text-total-value {
      font-size: 15px;
      padding: 0;
      margin-top: 20px;
    }

    .container-products {
      .container-actions-btns {
        display: flex !important;
        width: 100%;

        .edit-button,
        .delete-button {
          display: none;
        }

        .eye-button {
          opacity: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}

// TABLET

@media only screen and (min-width: 768px) and (max-width: 1440px) {
  .container-cart {
    width: 95vw;

    .container-search-fields {
      .container-clear-cart-button {
        .clear-cart-button {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
