<template>
  <div>
    <slot name="text" />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: 'inline',
      default: 'inline',
    },
    variant: {
      type: 'error' | 'warning' | 'success' | 'informational',
      default: 'informational',
    },
    dismissible: { type: Boolean, default: false },
    opened: { type: Boolean },
    autoHide: { type: Boolean, default: false },
    autoHideDuration: { type: Number, default: 3000 },
    href: { type: String },
    styles: { type: String },
  },
};
</script>
