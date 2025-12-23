<template>
  <tbody>
    <slot></slot>
  </tbody>
</template>

<script setup>
defineOptions({
  name: 'TableBody',
});
</script>

<style scoped lang="scss">
tbody {
  background-color: $color-grey-200;
}
</style>
