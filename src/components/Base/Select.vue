<template>
  <select
    :class="{ error }"
    :id="idx"
    :name="name"
    :disabled="disabled"
    :value="modelValue"
    @change="change"
    @focus="focus"
    @blur="blur"
  >
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>

<script setup>
defineOptions({
  name: 'BaseSelect',
});

defineProps({
  idx: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: [String, Number, null],
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur']);

const change = event => {
  const target = event.target;
  emit('update:modelValue', target.value);
};
const focus = () => {
  emit('focus');
};
const blur = () => {
  emit('blur');
};
</script>

<style scoped lang="scss">
select {
  position: relative;
  display: block;
  width: 100%;
  height: 36px;
  padding: 8px;
  font-family: $main-font;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  letter-spacing: -0.28px;
  color: $color-black;
  outline: none;
  border: none;
  background-color: transparent;
  transition: border-color $transition ease;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  // &.error {
  //   border-color: $color-error;
  // }
}
</style>
