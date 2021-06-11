<template>
  <scale-badge
    :size="size"
    :color="color"
    :rotation="rotation"
  >
    <slot></slot>
  </scale-badge>
</template>

<script>
export default {
  props: {
    size: { type: String, default: "big" },
    color: {type: String, default: "primary"},
    rotation:{type: Number, default: 0},
  },
};
</script>

