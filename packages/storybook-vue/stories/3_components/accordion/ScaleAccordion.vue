<template>
  <scale-accordion :styles="styles" :dependent="dependent" :expanded="expanded">
    <slot></slot>
  </scale-accordion>
</template>

<script>
export default {
  props: {
    styles: { type: String },
    dependent: { type: Boolean, default: false },
    expanded: { type: Boolean, default: false },
  },
};
</script>