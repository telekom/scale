<template>
  <scale-alertbox
    :variant="variant"
    :has-close="hasClose"
    :timeout="timeout"
    :opened="opened"
  >
    <slot name="header"></slot>
    <slot name="text"></slot>
  </scale-alertbox>
</template>
<script>
export default {
  props: {
    variant: { type: 'error' | 'warning'| 'success'| 'informational', default: 'informational' },
    hasClose: { type: Boolean, default: false },
    opened: { type: Boolean },
    timeout: { type: Boolean | Number, default: false },
  },
};
</script>