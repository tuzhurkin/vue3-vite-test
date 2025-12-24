<template>
  <div class="default-layout">
    <Header />
    <main>
      <slot />
    </main>
    <footer>
      <h2>Footer</h2>
    </footer>
  </div>
</template>

<script setup>
import Header from '@/components/Header/index.vue';
</script>

<style lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    flex: 1;
  }

  footer {
    background-color: #333;
    color: #fff;
    padding: 1rem;
  }
}
</style>
