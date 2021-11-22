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
    size: { type: String },
    variant: {
      type: 'error' | 'warning' | 'success' | 'informational',
      default: 'informational',
    },
    opened: { type: Boolean, default: false },
    animated: { type: Boolean, default: false },
    positionTop: { type: Number, default: 12 },
    positionRight: { type: Number, default: 12 },
    fadeDuration: { type: Number, default: 500 },
    styles: { type: String },
    story: { type: Boolean, default: false },
  },
};
</script>
