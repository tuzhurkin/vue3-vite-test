<template>
  <div class="table">
    <Table>
      <template #head>
        <TableRow :cells="head" :isBody="false" />
      </template>
      <template #body>
        <TableRow v-for="(row, index) in body" :key="index" :cells="row" :isBody="true" />
      </template>
      <template #foot>
        <TableRow :cells="foot" :isBody="false" />
      </template>
    </Table>
  </div>
</template>

<script setup>
import Table from '@/components/Table/index.vue';
import TableRow from '@/components/Table/Row.vue';

defineOptions({
  name: 'ProjectTable',
});

defineProps({
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
