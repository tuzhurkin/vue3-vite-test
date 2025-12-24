<template>
  <div class="pagination">
    <div class="controls">
      <div class="part">
        <BaseButton
          type="icony"
          icon="chevron-left-duo"
          @click="onFirstClick"
          :disabled="page === 1"
        />
        <BaseButton type="icony" icon="chevron-left" @click="onPrevClick" :disabled="page === 1" />
      </div>
      <div class="part">
        <PageCount :currentPage="page" :totalPages="totalPages" @update:page="onPageChange" />
      </div>
      <div class="part">
        <BaseButton
          type="icony"
          icon="chevron-right"
          @click="onNextClick"
          :disabled="page === totalPages"
        />
        <BaseButton
          type="icony"
          icon="chevron-right-duo"
          @click="onLastClick"
          :disabled="page === totalPages"
        />
      </div>
      <div class="part">
        <BaseButton type="icony" icon="reload" @click="onReloadClick" />
      </div>
    </div>
    <div class="display">{{ displayText }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import BaseButton from '@/components/Base/Button.vue';
import PageCount from '@/components/Pagination/PageCount.vue';

defineOptions({
  name: 'Pagination',
});

const props = defineProps({
  page: {
    type: Number,
    default: 1,
  },
  limit: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(['update:page', 'reload']);

const minCurrentLimit = computed(() => props.limit * (props.page - 1) + 1);
const maxCurrentLimit = computed(() =>
  props.limit * props.page > props.total ? props.total : props.limit * props.page
);
const totalPages = computed(() => Math.ceil(props.total / props.limit));

const onFirstClick = () => {
  emit('update:page', 1);
};
const onPrevClick = () => {
  emit('update:page', props.page - 1);
};
const onPageChange = value => {
  emit('update:page', value);
};
const onNextClick = () => {
  emit('update:page', props.page + 1);
};
const onLastClick = () => {
  emit('update:page', totalPages.value);
};
const onReloadClick = () => {
  emit('reload');
};

const displayText = computed(() => {
  return props.total > 0
    ? `Displaying ${minCurrentLimit.value} - ${maxCurrentLimit.value} of ${props.total} items`
    : 'No items found';
});
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border: 1px solid $color-grey-500;

  .controls {
    display: flex;
    align-items: center;
    gap: 8px;

    .part {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;

      &:not(:last-child) {
        padding-right: 8px;

        &::after {
          content: '';
          position: absolute;
          top: 20%;
          right: 0;
          width: 1px;
          height: 60%;
          border-right: 2px solid $color-grey-110;
        }
      }
    }
  }

  .display {
    font-size: 16px;
    line-height: 150%;
    color: $color-grey-text;
    white-space: nowrap;
  }
}
</style>
