<script setup>
    const props = defineProps({
        label: String,
        placeholder: String,
        type: String,
        modelValue: String,
        id: String,
        isRequired: Boolean,
    })
</script>

<template>
    <div class="container-field">
        <label for="product-field">{{label}} <span v-show="isRequired" class="asterisk">*</span></label>
        <input :type="type" :id="id" :placeholder="placeholder" :value="modelValue"
            :class="{ 'field-error': fieldErrorProduct }">
            <span class="error-message" v-show="fieldErrorProduct">Preencha o campo obrigatório</span>
    </div>
</template>

<style lang="scss" scoped>
    .container-field {
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
