<template>
  <component :is="tag" :title="value" class="cell">
    <span>{{ value }}</span>
  </component>
</template>

<script setup>
defineOptions({
  name: 'TableCell',
});

defineProps({
  value: {
    type: String,
    default: '',
  },
  tag: {
    type: String,
    default: 'td', // 'th' | 'td'
  },
});
</script>

<style scoped lang="scss">
th,
td {
  position: relative;
  min-width: 150px;
  max-width: 150px;
  height: 36px;
  padding: 0 16px;
  white-space: nowrap;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  text-align: left;
  color: $color-grey-text;

  span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:not(:last-child) {
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      width: 1px;
      height: 100%;
      border-right: 1px solid $color-grey-500;
    }
  }
}
</style>
