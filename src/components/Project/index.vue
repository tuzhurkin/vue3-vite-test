<template>
  <div class="project">
    <Filters
      :filters="filtersData"
      @applyFilters="onApplyFilters"
      @resetFilters="onResetFilters"
      @resetSortings="onResetSortings"
    />
    <ProjectTable :head="tableHead" :body="tableBody" :foot="tableFoot" :empty="isDataEmpty" />
    <Pagination
      :page="page"
      :limit="limit"
      :total="total"
      @update:page="setPage"
      @reload="resetPage"
    />
    <transition name="fade">
      <BaseLoading v-if="loading" :fixed="true" />
    </transition>
  </div>
</template>

<script setup>
import Filters from '@/components/Filters/index.vue';
import ProjectTable from '@/components/Project/Table.vue';
import Pagination from '@/components/Pagination/index.vue';
import BaseLoading from '@/components/Base/Loading.vue';
import { useProcessUsers } from '@/composables/useProcessUsers';
import { useTableContents } from '@/composables/useTableContents';

defineOptions({
  name: 'Project',
});

const {
  loading,
  page,
  limit,
  total,
  currentPageCount,
  isDataEmpty,
  setPage,
  resetPage,
  filtersData,
  paginatedUsers,
  onApplyFilters,
  onResetFilters,
  onResetSortings,
} = useProcessUsers();

const { tableHead, tableBody, tableFoot } = useTableContents(
  paginatedUsers,
  currentPageCount,
  total
);
</script>

<style scoped lang="scss">
.project {
  padding: 16px;
  display: flex;
  flex-direction: column;

  .filters {
    margin-bottom: 20px;
  }
}
</style>
