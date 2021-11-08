<template>
  <scale-notification-badge :label="label" :type="type">
    <!-- this has the slots show up in ArgsTable -->
    <slot></slot>
  </scale-notification-badge>
</template>

<script>
export default {
  props: {
    label: { type: String },
    type: { type: 'icon' | 'text', default: 'icon' },
  },
};
</script>
‚
