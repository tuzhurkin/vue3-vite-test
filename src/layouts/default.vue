<template>
  <div class="default-layout">
    <!-- <Header /> -->
    <header>
      <h2>Header</h2>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <h2>Footer</h2>
    </footer>
    <!-- <Footer /> -->
  </div>
</template>

<script setup></script>

<style lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  header {
    background-color: #333;
    color: #fff;
    padding: 1rem;
  }

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
