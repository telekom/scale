<template>
  <scale-alertbox
    :color="color"
    :variant="variant"
    :icon="icon"
    :hasclose="hasclose"
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
    color: { type: 'white' | 'black' | 'error', default: 'white' },
    variant: { type: 'floating' | 'outline' },
    icon: { type: Boolean, default: false },
    hasclose: { type: Boolean, default: false },
    opened: { type: Boolean },
    timeout: { type: Boolean | Number, default: false },
  },
};
</script>
