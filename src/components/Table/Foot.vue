<template>
  <tfoot>
    <slot></slot>
  </tfoot>
</template>

<script setup>
defineOptions({
  name: 'TableFoot',
});
</script>

<style scoped lang="scss">
tfoot {
  background-color: $color-blue-light;
}
</style>
