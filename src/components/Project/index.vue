<template>
  <div class="project">
    <div class="header">
      <h1 class="title">Займы</h1>
    </div>
    <div class="content">
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
        @update:limit="setLimit"
      />
      <transition name="fade">
        <BaseLoading v-if="loading" :fixed="true" />
      </transition>
    </div>
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
  setLimit,
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
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 16px;
  border: 1px solid $color-grey-500;
  border-radius: 8px 8px 0 0;

  .header {
    padding: 8px 16px;
    background-color: $color-grey-100;
    border-bottom: 1px solid $color-grey-500;

    .title {
      font-weight: 700;
      font-size: 20px;
      line-height: 150%;
      color: $color-black;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    padding: 16px;
  }

  .filters {
    margin-bottom: 12px;
  }

  .pagination {
    border-top: none;
  }
}
</style>
