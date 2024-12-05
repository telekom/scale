<template>
  <scale-breadcrumb
    :separator="separator"
    :styles="styles"
  >
    <slot></slot>
  </scale-breadcrumb>
</template>

<script>
export default {
  props: {
    separator: { type: String},
    styles: { type: String }
  },
}
</script>
