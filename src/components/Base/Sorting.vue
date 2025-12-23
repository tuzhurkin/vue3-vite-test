<template>
  <label :for="idx" class="sorting" :class="{ focused }">
    <BaseSelect
      :idx="idx"
      :name="name"
      :options="options"
      :disabled="disabled"
      :error="error"
      :modelValue="modelValue"
      @update:modelValue="updateModelValue"
      @focus="focus"
      @blur="blur"
    />
    <BaseIcon name="chevron-down" />
  </label>
</template>

<script setup>
import { ref } from 'vue';
import BaseSelect from '@/components/Base/Select.vue';
import BaseIcon from '@/components/Base/Icon.vue';

defineOptions({
  name: 'BaseSorting',
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
.sorting {
  position: relative;
  display: flex;
  align-items: center;
  height: 38px;
  border-radius: 6px;
  border: 1px solid $color-grey-500;
  transition: border-color $transition ease;

  &.focused {
    border-color: $color-black;
  }

  :deep(select) {
    appearance: none;
  }

  :deep(.icon) {
    position: absolute;
    right: 8px;
    width: 20px;
    height: 20px;
    pointer-events: none;
  }
}
</style>
