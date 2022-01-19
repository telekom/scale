<template>
  <div>
    <slot name="text" />
    <slot name="link" />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: 'toast',
      default: 'toast',
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
    toastAnimated: { type: Boolean, default: true },
    toastAlignment: {
      type: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left',
      default: 'top-right',
    },
    toastPositionVertical: { type: Number, default: 12 },
    toastPositionHorizontal: { type: Number, default: 12 },
    toastFadeDuration: { type: Number, default: 500 },
    toastStory: { type: Boolean },
  },
};
</script>
