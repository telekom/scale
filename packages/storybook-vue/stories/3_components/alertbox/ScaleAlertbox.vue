<template>
  <scale-alertbox
    :variant="variant"
    :dismissable="dismissable"
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
    dismissable: { type: Boolean, default: false },
    opened: { type: Boolean },
    timeout: { type: Boolean | Number, default: false },
  },
};
</script>