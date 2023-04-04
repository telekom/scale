<template>
  <div>
    <slot name="header" />
    <slot name="body" />
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
    alignment: {
      type: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left',
      default: 'top-right',
    },
    opened: { type: Boolean, default: false },
    animated: { type: Boolean, default: true },
    positionVertical: { type: Number, default: 12 },
    positionHorizontal: { type: Number, default: 12 },
    fadeDuration: { type: Number, default: 500 },
    autoHideDuration: { type: Number, default: 3000 },
    autoHide: { type: Boolean, default: false },
    styles: { type: String },
    closeButtonLabel: { type: String, default: 'close' },
    closeButtonTitle: { type: String, default: 'close' },
  },
  methods: {
    scaleClose($event) {
      action('scaleClose');
      this.$emit('scaleClose', $event);
    },
    scaleClosing($event) {
      action('scaleClosing');
      this.$emit('scaleClosing', $event);
    },
  },
};
</script>
