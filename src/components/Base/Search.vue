<template>
  <label :for="idx" class="search" :class="{ focused }">
    <BaseInput
      :idx="idx"
      :name="name"
      :type="type"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :disabled="disabled"
      :error="error"
      :modelValue="modelValue"
      @update:modelValue="updateModelValue"
      @focus="focus"
      @blur="blur"
    />
    <BaseButton type="texted" icon="search" />
  </label>
</template>

<script setup>
import { ref } from 'vue';
import BaseInput from '@/components/Base/Input.vue';
import BaseButton from '@/components/Base/Button.vue';

defineOptions({
  name: 'BaseSearch',
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
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur']);
const focused = ref(false);

const updateModelValue = value => {
  emit('update:modelValue', value);
};

const focus = () => {
  focused.value = true;
};

const blur = () => {
  focused.value = false;
};
</script>

<style scoped lang="scss">
.search {
  display: flex;
  align-items: center;
  height: 38px;
  border-radius: 6px;
  border: 1px solid $color-grey-500;
  transition: border-color $transition ease;

  &.focused {
    border-color: $color-black;

    :deep(.btn) {
      border-color: $color-black;
    }
  }

  :deep(.btn) {
    width: 36px;
    height: 36px;
    border-left: 1px solid $color-grey-500;
    transition: border-color $transition ease;
  }
}
</style>
