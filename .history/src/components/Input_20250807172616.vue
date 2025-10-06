<script setup>
    const props = defineProps({
        label: String,
        placeholder: String,
        type: String,
        modelValue: String | Boolean,
        messageError: String,
        id: String,
        inputmode: String,
        pattern: String,
        min: String,
        ref: String,
        isRequired: Boolean,
        hasError: Boolean,
    })

    
const handleInput = (event) => {
  const { value, checked, type } = event.target

  // Para checkbox, envia `checked`, para outros, envia `value`
  emit('update:modelValue', type === 'checkbox' ? checked : value)
}
</script>

<template>
    <div class="container-field">
        <label :for="id">{{label}} <span v-show="isRequired" class="asterisk">*</span></label>
        <input 
        :type="type" 
        :id="id" 
        :placeholder="placeholder" 
        :value="modelValue" 
        :checked="modelValue"
        :inputmode="inputmode"
        :pattern="pattern"
        :min="min"
        @input="$emit('update:modelValue', $event.target.value)"
        @change="$emit('update:modelValue', $event.target.checked)"
        :class="{ 'field-error': hasError }"
        :ref="ref">
        

        <span class="error-message" v-show="hasError">{{ messageError }}</span>
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
            padding-bottom: 4px;
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
