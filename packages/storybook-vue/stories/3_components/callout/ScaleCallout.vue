<template>
  <scale-callout
    :size="size"
    :variant="variant"
    :rotation="rotation"
    :asterisk="asterisk"
  >
    <slot name="prefix" />
    <slot></slot>
  </scale-callout>
</template>

<script>
export default {
  props: {
    size: { type: String, default: "large" },
    variant: {type: String, default: "primary"},
    rotation:{type: Number, default: 0},
    asterisk: {type: String},
  },
};
</script>

