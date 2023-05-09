<template>
  <div>
    <slot name="text" />
    <slot name="link" />
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
    autoHide: { type: Boolean, default: false },
    autoHideDuration: { type: Number, default: 3000 },
    closeButtonLabel: { type: String, default: 'close' },
    closeButtonTitle: { type: String, default: 'close' },
  },
};
</script>
