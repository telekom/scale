<template>
  <scale-bottom-bar
    :icon="icon"
    :label="label"
    :styles="styles"
  >
    <slot></slot>
    <slot name="separator"></slot>
  </scale-bottom-bar>
</template>

<script>
export default {
  props: {
    separator: String,
    label: String,
    styles: { type: String }
  },
}
</script>
