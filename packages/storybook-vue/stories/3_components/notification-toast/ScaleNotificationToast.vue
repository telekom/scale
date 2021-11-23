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
      type: 'top' | 'bottom',
      default: 'top',
    },
    opened: { type: Boolean, default: false },
    animated: { type: Boolean, default: true },
    positionVertical: { type: Number, default: 12 },
    positionHorizontal: { type: Number, default: 12 },
    fadeDuration: { type: Number, default: 500 },
    styles: { type: String },
    story: { type: Boolean, default: false },
  },
};
</script>
