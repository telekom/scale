<template>
  <scale-grid-item
    :size="size"
    :offset="offset"
  >
    <slot></slot>
  </scale-grid-item>
</template>

<script>
export default {
  props: {
    size: String,
    offset: String,
  },
};
</script>
