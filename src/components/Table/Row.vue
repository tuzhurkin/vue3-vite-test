<template>
  <tr :class="{ empty }">
    <TableCell
      v-for="(cell, index) in cells"
      :key="index"
      :value="cell.name"
      :tag="isBody ? 'td' : 'th'"
      :colspan="cell.colspan"
    />
  </tr>
</template>

<script setup>
import TableCell from '@/components/Table/Cell.vue';

defineOptions({
  name: 'TableRow',
});

defineProps({
  cells: {
    type: Array,
    default: () => [],
  },
  isBody: {
    type: Boolean,
    default: true,
  },
  empty: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
tr {
  border-top: 1px solid $color-grey-500;

  &.empty {
    height: 250px;
    background-color: $color-grey-500;
  }
}
</style>
