<template>
  <header>
    <h2>Header</h2>
    <nav>
      <BaseButton tag="router-link" to="/" type="texted">Project</BaseButton>
      <BaseButton tag="router-link" to="/description" type="texted">Description</BaseButton>
    </nav>
  </header>
</template>

<script setup>
import BaseButton from '@/components/Base/Button.vue';

defineOptions({
  name: 'HeaderComponent',
});
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #333;
  color: #fff;

  nav {
    display: flex;
    align-items: center;
    gap: 16px;

    :deep(.btn.texted) {
      @include hover {
        color: $color-white;
      }

      &.router-link-exact-active {
        pointer-events: none;
        cursor: default;
        opacity: 0.5;
      }
    }
  }
}
</style>
