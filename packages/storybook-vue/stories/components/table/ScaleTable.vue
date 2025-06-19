<template>
  <scale-table :show-sort="showSort" :styles="styles" :size="size" :striped="striped ? true : false">
    <slot></slot>
  </scale-table>
</template>

<script>
export default {
  props: {
    showSort: Boolean,
    size: String,
    striped: Boolean,
    styles: String,
  },
};
</script>
