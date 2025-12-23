<template>
  <table>
    <TableHead v-if="slots.head">
      <slot name="head"></slot>
    </TableHead>
    <TableBody v-if="slots.body">
      <slot name="body"></slot>
    </TableBody>
    <TableFoot v-if="slots.foot">
      <slot name="foot"></slot>
    </TableFoot>
  </table>
</template>

<script setup>
import TableHead from '@/components/Table/Head.vue';
import TableBody from '@/components/Table/Body.vue';
import TableFoot from '@/components/Table/Foot.vue';

defineOptions({
  name: 'BaseTable',
});

const slots = defineSlots();
</script>

<style scoped lang="scss">
table {
  width: max-content;
  min-width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}
</style>
