<template>
  <scale-breadcrumb
    :separator="separator"
    :styles="styles"
  >
    <slot></slot>
    <slot name="separator"></slot>
  </scale-breadcrumb>
</template>

<script>
export default {
  props: {
    separator: String,
    styles: { type: String }
  },
}
</script>
