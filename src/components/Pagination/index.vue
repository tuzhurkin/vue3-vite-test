<template>
  <div class="pagination">
    <div class="controls">
      <div class="part">
        <BaseButton
          type="icony"
          icon="chevron-left-duo"
          @click="onFirstClick"
          :disabled="isPrevDisabled"
        />
        <BaseButton
          type="icony"
          icon="chevron-left"
          @click="onPrevClick"
          :disabled="isPrevDisabled"
        />
      </div>
      <div class="part count">
        <PageCount :currentPage="page" :totalPages="totalPages" @update:page="onPageChange" />
      </div>
      <div class="part">
        <BaseButton
          type="icony"
          icon="chevron-right"
          @click="onNextClick"
          :disabled="isNextDisabled"
        />
        <BaseButton
          type="icony"
          icon="chevron-right-duo"
          @click="onLastClick"
          :disabled="isNextDisabled"
        />
      </div>
      <div class="part">
        <BaseButton type="icony" icon="reload" @click="onReloadClick" />
      </div>
      <div class="part">
        <ShowLimit
          :options="limitOptions"
          :modelValue="limit"
          :disabled="total === 0"
          @update:modelValue="onLimitChange"
        />
      </div>
    </div>
    <div class="display">{{ displayText }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import BaseButton from '@/components/Base/Button.vue';
import PageCount from '@/components/Pagination/PageCount.vue';
import ShowLimit from '@/components/Pagination/ShowLimit.vue';

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

const emit = defineEmits(['update:page', 'update:limit', 'reload']);

const minCurrentLimit = computed(() => props.limit * (props.page - 1) + 1);
const maxCurrentLimit = computed(() =>
  props.limit * props.page > props.total ? props.total : props.limit * props.page
);
const totalPages = computed(() => Math.ceil(props.total / props.limit));
const isPrevDisabled = computed(() => props.page === 1 || props.total === 0);
const isNextDisabled = computed(() => props.page === totalPages.value || props.total === 0);

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

const limitOptions = computed(() => {
  const step = 5;
  const options = [];
  for (let i = step; i <= Math.max(props.total, props.total + step); i += step) {
    options.push({ value: i, text: i });
  }
  return options;
});

const onLimitChange = value => {
  emit('update:limit', value);
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 8px;
  border: 1px solid $color-grey-500;

  @media (max-width: $sm) {
    flex-direction: column;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 8px;

    @media (max-width: $sm) {
      flex-wrap: wrap;
      justify-content: center;
    }

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

      @media (max-width: $sm) {
        &.count {
          order: 1;
          flex-basis: 100%;
          justify-content: center;
          padding-right: 0;
          &::after {
            display: none;
          }
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
