<script setup>
import { VMoney } from 'v-money'

defineProps({
  label: String,
  placeholder: String,
  type: { type: String, default: 'text' },
  modelValue: [String, Boolean, Number],
  messageError: String,
  id: String,
  inputmode: String,
  pattern: String,
  min: String,
  isRequired: Boolean,
  useMoney: {
    type: Boolean,
    default: false
  },
  hasError: [Boolean, String]
})

const money = {
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  precision: 2,
  masked: false,
  allowNegative: false
}

const emit = defineEmits(['update:modelValue'])

const handleInput = (event) => {
  if (event.target.type === 'checkbox') {
    emit('update:modelValue', event.target.checked)
    return
  }

  // Input normal
  emit('update:modelValue', event.target.value ?? '')
}

</script>

<template>
  <div class="container-field">
    <label :for="id">
      {{ label }}
      <span v-show="isRequired" class="asterisk">*</span>
    </label>

    <input
      :type="type"
      :id="id"
      :placeholder="placeholder"
      v-if="type !== 'checkbox' && !useMoney"
      :value="modelValue"
      @input="handleInput"
      :inputmode="inputmode"
      :pattern="pattern"
      :min="min"
      :class="{ 'field-error': hasError }"
    />

    <input
      :type="type"
      :id="id"
      v-if="useMoney"
      :value="modelValue"
      @input="handleInput"
      :class="{ 'field-error': hasError }"
      v-money="money"
    />

    <input
      type="checkbox"
      v-if="type === 'checkbox' && !useMoney"
      :id="id"
      :checked="!!modelValue"
      @change="handleInput"
      :class="{ 'field-error': hasError }"
    />

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
    color: #3d5cff;
  }

  label {
    padding-bottom: 4px;
    cursor: text;
  }

  .error-message {
    color: #ec3737;
    font-size: 12px;
    position: absolute;
    bottom: -20px;
  }
}
</style>
