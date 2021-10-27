<template>
  <scale-callout
    :size="size"
    :color="color"
    :rotation="rotation"
  >
    <slot></slot>
  </scale-callout>
</template>

<script>
export default {
  props: {
    size: { type: String, default: "large" },
    color: {type: String, default: "primary"},
    rotation:{type: Number, default: 0},
  },
};
</script>

