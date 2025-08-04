<script setup>
const props = defineProps({
    label: String,
    placeholder: String,
    type: String
})

</script>

<template>
    <div class="container-fields">
        <label for="product-field">{{label}} <span class="asterisk">*</span></label>
        <input ref="productField" :type="type" id="product-field" :placeholder="placeholder" v-model="valueInputProduct"
            :class="{ 'field-error': fieldErrorProduct }">
            <span class="error-message" v-show="fieldErrorProduct">Preencha o campo obrigatório</span>
    </div>
</template>

<style lang="scss" scoped>
    .container-fields {
        display: flex;
        flex-direction: column;
        gap: 4px;
        align-items: center;
        position: relative;

        .asterisk {
            color: #3D5CFF;
        }

        label {
            cursor: text;
        }

        .error-message{
            color: #EC3737;
            font-size: 12px;
            position: absolute;
            bottom: -20px;
        }
    }
</style>
