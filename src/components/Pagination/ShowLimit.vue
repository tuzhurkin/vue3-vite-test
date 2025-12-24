<template>
  <div class="show-limit">
    <BaseSelect
      :options="options"
      :modelValue="modelValue"
      direction="top"
      triggerText="Show"
      :disabled="disabled"
      @update:modelValue="onModelValueChange"
    />
  </div>
</template>

<script setup>
import BaseSelect from '@/components/Base/Select.vue';

defineOptions({
  name: 'ShowLimit',
});

defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Number,
    default: 1,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const onModelValueChange = value => {
  emit('update:modelValue', value);
};
</script>

<style scoped lang="scss"></style>
