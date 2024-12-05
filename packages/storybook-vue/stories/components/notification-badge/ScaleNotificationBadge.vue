<template>
  <scale-notification-badge 
    :label="label" 
    :type="type"
    :max-characters="maxCharacters"
    :click-handler="clickHandler"
    >
    <!-- this has the slots show up in ArgsTable -->
    <slot></slot>
  </scale-notification-badge>
</template>

<script>
export default {
  props: {
    label: { type: String },
    type: { type: 'icon' | 'text', default: 'icon' },
    maxCharacters: { type: Number},
    clickHandler: { type: Function }
  },
};
</script>
‚
