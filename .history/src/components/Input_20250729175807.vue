<script>

</script>

<template>
    <div class="container-fields">
                        <label for="product-field">Produto <span class="asterisk">*</span></label>
                        <input ref="productField" type="text" id="product-field" placeholder="Ex: Refrigerante" v-model="valueInputProduct"
                            :class="{ 'field-error': fieldErrorProduct }">
                            <span class="error-message" v-show="fieldErrorProduct">Preencha o campo obrigatório</span>
                    </div>
</template>

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
