<template>
  <input
    ref="inputRef"
    :class="{ error }"
    :id="idx"
    :name="name"
    :type="type"
    :autocomplete="autocomplete"
    :placeholder="placeholder"
    :disabled="disabled"
    :value="modelValue"
    :min="min"
    :max="max"
    @input="input"
    @focus="focus"
    @blur="blur"
  />
</template>

<script setup>
import { ref } from 'vue';

defineOptions({
  name: 'BaseInput',
});

const props = defineProps({
  idx: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  placeholder: {
    type: String,
    default: '',
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
  min: {
    type: [Number, undefined],
    default: undefined,
  },
  max: {
    type: [Number, undefined],
    default: undefined,
  },
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur']);

const inputRef = ref(null);

const isNumberInputValid = value => {
  if (!(props.type === 'number' && value !== '')) return false;

  const numValue = Number(value);
  if (isNaN(numValue)) return false;
  if (props.max !== undefined && numValue > props.max) return false;
  if (props.min !== undefined && numValue < props.min) return false;
  return true;
};

const input = event => {
  const target = event.target;
  let value = target.value;

  if (props.type === 'number') {
    if (!isNumberInputValid(value)) {
      target.value = props.modelValue;
      return;
    }
  }

  emit('update:modelValue', value);
};
const focus = () => {
  emit('focus');
};
const blur = () => {
  emit('blur');
};
</script>

<style scoped lang="scss">
input {
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
  // border-bottom: 1.5px solid $color-black;
  background-color: transparent;
  transition: border-color $transition ease;

  // // reset autocomplete styles
  // &:-webkit-autofill,
  // &:-webkit-autofill:hover,
  // &:-webkit-autofill:focus,
  // &:-webkit-autofill:active {
  //   // background-color: $color-grey-750;
  //   -webkit-text-fill-color: $color-grey-500;
  //   -webkit-box-shadow: 0 0 0px 1000px $color-grey-500 inset;
  //   // transition: background-color 5000s ease-in-out 0s;
  //   font-family: $main-font;
  //   font-weight: 400;
  //   font-size: 16px;
  //   line-height: 120%;
  //   letter-spacing: -0.28px;
  // }

  // &.error {
  //   border-color: $color-error;
  // }
}
</style>
