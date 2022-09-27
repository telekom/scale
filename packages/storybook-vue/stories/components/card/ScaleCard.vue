<template>
  <scale-card
    :label="label"
    :to="to"
    :target="target"
    :rel="rel"
    :movable="movable"
  >
    <slot></slot>
  </scale-card>
</template>

<script>
export default {
  props: {
    label: String,
    to: String,
    movable: Boolean,
    target: { type: String, default: "_self" },
    rel: { type: String, default: "_self" },
  }
};
</script>
