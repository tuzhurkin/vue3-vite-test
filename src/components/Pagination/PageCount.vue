<template>
  <label for="page-count" class="page-count">
    <span>Page</span>
    <BaseInput
      type="number"
      id="page-count"
      name="page-count"
      :modelValue="currentPage"
      @update:modelValue="onPageChange"
      :min="1"
      :max="totalPages"
    />
    <span>of {{ totalPages }}</span>
  </label>
</template>

<script setup>
import BaseInput from '@/components/Base/Input.vue';

defineOptions({
  name: 'PageCount',
});

defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  totalPages: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(['update:page']);

const onPageChange = value => {
  emit('update:page', Number(value));
};
</script>

<style scoped lang="scss">
.page-count {
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 16px;
    line-height: 150%;
    color: $color-grey-text;
    white-space: nowrap;
    user-select: none;
  }

  :deep(input) {
    min-width: 36px;
    padding: 0 8px;
    border: 1px solid $color-grey-170;
  }
}
</style>
