<template>
  <thead>
    <slot></slot>
  </thead>
</template>

<script setup>
defineOptions({
  name: 'TableHead',
});
</script>

<style scoped lang="scss">
thead {
  :deep(tr) {
    border-top: none;
  }
}
</style>
