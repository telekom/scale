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
    timeout: { type: Boolean | Number, default: false },
  },
};
</script>
