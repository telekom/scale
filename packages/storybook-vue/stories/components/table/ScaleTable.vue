<template>
  <scale-table :show-sort="showSort" :size="size" :striped="striped ? true : false">
    <slot></slot>
  </scale-table>
</template>

<script>
export default {
  props: {
    showSort: Boolean,
    size: String,
    striped: Boolean
  },
};
</script>
