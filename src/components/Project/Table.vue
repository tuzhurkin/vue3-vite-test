<template>
  <div class="table">
    <Table>
      <template #head>
        <TableRow :cells="head" :isBody="false" />
      </template>
      <template #body>
        <template v-if="!empty">
          <TableRow v-for="(row, index) in body" :key="index" :cells="row" :isBody="true" />
        </template>
        <TableRow v-else :cells="emptyRowCells" :isBody="true" :empty="true" />
      </template>
      <template #foot>
        <TableRow :cells="foot" :isBody="false" />
      </template>
    </Table>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Table from '@/components/Table/index.vue';
import TableRow from '@/components/Table/Row.vue';

defineOptions({
  name: 'ProjectTable',
});

const props = defineProps({
  head: {
    type: Array,
    default: () => [],
  },
  body: {
    type: Array,
    default: () => [],
  },
  foot: {
    type: Array,
    default: () => [],
  },
  empty: {
    type: Boolean,
    default: false,
  },
});

const emptyRowCells = computed(() => {
  return [{ name: 'No data found', colspan: props.head.length }];
});
</script>

<style scoped lang="scss">
.table {
  width: 100%;
  padding-bottom: 6px;
  overflow-x: auto;
  overflow-y: visible;
  border: 1px solid $color-grey-500;

  @include styledScrollbar(
    $trackbg: transparent,
    $thumbbg: #8b8b8b,
    $thumbbgactive: #8b8b8b,
    $radius: 6px,
    $height: 8px
  );
}
</style>
