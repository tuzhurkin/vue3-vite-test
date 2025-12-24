<template>
  <div class="filters">
    <div class="fields">
      <FiltersField v-for="(filter, index) in localFilters" :key="index">
        <BaseSearch
          v-if="filter.filterType === 'search'"
          v-bind="filter"
          :modelValue="filter.value"
          @update:modelValue="onSearchUpdate"
        />
        <BaseSorting
          v-else-if="filter.filterType === 'sorting'"
          v-bind="filter"
          :modelValue="filter.value"
          @update:modelValue="onSortingUpdate"
        />
      </FiltersField>
    </div>
    <div class="buttons">
      <BaseButton
        v-for="button in buttons"
        :key="button.text"
        :text="button.text"
        type="primary"
        :icon="button.icon"
        :disabled="isButtonDisabled(button.slug)"
        @click="onButtonClick(button.slug)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import BaseButton from '@/components/Base/Button.vue';
import BaseSearch from '@/components/Base/Search.vue';
import BaseSorting from '@/components/Base/Sorting.vue';
import FiltersField from '@/components/Filters/Field/index.vue';

defineOptions({
  name: 'Filters',
});

const props = defineProps({
  filters: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['applyFilters', 'resetFilters', 'resetSortings']);

// local state for temporary filters values
const localFilters = ref([]);

// update local filters when props change
watch(
  () => props.filters,
  newFilters => {
    localFilters.value = newFilters.map(filter => ({ ...filter }));
  },
  { immediate: true, deep: true }
);

const onSearchUpdate = (value, idx) => {
  const filter = localFilters.value.find(f => f.idx === idx);
  if (filter) filter.value = value;
};

const onSortingUpdate = (value, idx) => {
  const filter = localFilters.value.find(f => f.idx === idx);
  if (filter) filter.value = value;
};

const isFilterApplied = (filterType = null) => {
  const hasLocalValues = localFilters.value.some(filter =>
    filterType ? filter.filterType === filterType && filter.value : filter.value
  );
  const hasAppliedValues = props.filters.some(filter =>
    filterType ? filter.filterType === filterType && filter.value : filter.value
  );
  return hasLocalValues || hasAppliedValues;
};

const isButtonDisabled = slug => {
  switch (slug) {
    case 'apply': {
      return !isFilterApplied();
    }
    case 'reset-filters': {
      return !isFilterApplied('search');
    }
    case 'reset-sortings': {
      return !isFilterApplied('sorting');
    }
    default:
      return true; // temporarily disable another buttons due to the lack of their functionality
  }
};

const onButtonClick = slug => {
  switch (slug) {
    case 'apply':
      applyFilters();
      break;
    case 'reset-filters':
      resetFilters();
      break;
    case 'reset-sortings':
      resetSortings();
      break;
    default:
      break;
  }
};

const applyFilters = () => {
  emit('applyFilters', localFilters.value);
};

const resetFilters = () => {
  localFilters.value.forEach(filter => {
    if (filter.filterType === 'search') filter.value = '';
  });
  emit('resetFilters');
};

const resetSortings = () => {
  localFilters.value.forEach(filter => {
    if (filter.filterType === 'sorting') filter.value = '';
  });
  emit('resetSortings');
};

const buttons = [
  {
    text: 'Найти',
    slug: 'apply',
  },
  {
    text: 'Сбросить фильтр',
    slug: 'reset-filters',
  },
  {
    text: 'Сбросить сортировку',
    slug: 'reset-sortings',
  },
  {
    text: 'Назначить',
    slug: 'assign',
  },
  {
    text: 'Назначить из файла',
    slug: 'assign-from-file',
  },
  {
    text: 'Сгенерировать документы',
    slug: 'create-documents',
  },
  {
    text: 'Скачать документы',
    slug: 'download-documents',
  },
];
</script>

<style scoped lang="scss">
.filters {
  .fields {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    column-gap: 32px;
    row-gap: 12px;

    @media (max-width: $md) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: $sm) {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  .buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;

    @media (max-width: $sm) {
      flex-direction: column;
    }
  }
}
</style>
