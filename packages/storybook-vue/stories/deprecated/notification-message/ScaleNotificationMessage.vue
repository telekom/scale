<template>
  <div>
    <slot name="text" />
  </div>
</template>

<script>
export default {
  props: {
    variant: {
      type: 'error' | 'warning' | 'success' | 'informational',
      default: 'informational',
    },
    dismissible: { type: Boolean, default: false },
    opened: { type: Boolean },
    autoHideDuration: { type: Number, default: 3000 },
    autoHide: { type: Boolean, default: false },
    closeButtonLabel: { type: String, default: 'close' },
    closeButtonTitle: { type: String, default: 'close' },
  },
};
</script>
