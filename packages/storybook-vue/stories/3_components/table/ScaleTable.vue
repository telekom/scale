<template>
  <scale-table :show-sort="showSort" :size="size">
    <slot></slot>
  </scale-table>
</template>

<script>
export default {
  props: {
    showSort: Boolean,
    size: String,
  },
};
</script>
