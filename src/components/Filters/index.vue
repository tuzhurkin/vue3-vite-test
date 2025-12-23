<template>
  <div class="filters">
    <div class="fields">
      <FiltersField v-for="filter in filters" :key="filter.type">
        <BaseSearch v-if="filter.filterType === 'search'" v-bind="filter" />
        <BaseSorting v-else-if="filter.filterType === 'sorting'" v-bind="filter" />
      </FiltersField>
    </div>
    <div class="buttons">
      <BaseButton
        v-for="button in buttons"
        :key="button.text"
        :text="button.text"
        type="primary"
        :icon="button.icon"
      />
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/Base/Button.vue';
import BaseSearch from '@/components/Base/Search.vue';
import BaseSorting from '@/components/Base/Sorting.vue';
import FiltersField from '@/components/Filters/Field/index.vue';

defineOptions({
  name: 'Filters',
});

defineProps({
  filters: {
    type: Array,
    default: () => [],
  },
});

const buttons = [
  {
    text: 'Найти',
    type: 'reset',
  },
  {
    text: 'Сбросить фильтр',
    type: 'primary',
  },
  {
    text: 'Сбросить сортировку',
    type: 'primary',
  },
  {
    text: 'Назначить',
    type: 'primary',
  },
  {
    text: 'Назначить из файла',
    type: 'primary',
  },
  {
    text: 'Сгенерировать документы',
    type: 'primary',
  },
  {
    text: 'Скачать документы',
    type: 'primary',
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
  }
  .buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }
}
</style>
