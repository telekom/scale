<template>
  <scale-modal
    :heading="heading"
    :size="size"
    :opened="opened"
    :duration="duration"
    :close-button-label="closeButtonLabel"
    :close-button-title="closeButtonTitle"
    :omit-close-button="omitCloseButton"
    :align-actions="alignActions"
    :styles="styles"
    :allow-injecting-style-to-body="allowInjectingStyleToBody"
    @scale-close="scaleClose"
    @scale-open="scaleOpen"
    @scale-before-close="scaleBeforeClose"
  >
    <slot name="close"></slot>
    <slot></slot>
    <slot name="actions"></slot>
  </scale-modal>
</template>

<script>
import { action } from '@storybook/addon-actions';

export default {
  props: {
    heading: { type: String, default: 'Today is your lucky day' },
    size: String,
    opened: Boolean,
    duration: { type: Number, default: 200 },
    closeButtonLabel: String,
    closeButtonTitle: String,
    omitCloseButton: { type: Boolean, default: false },
    alignActions: { type: String, default: 'right' },
    allowInjectingStyleToBody: Boolean,
    styles: { type: String },
  },
  methods: {
    scaleOpen($event) {
      action('scale-open')($event.detail);
      this.$emit('scale-open', $event);
    },
    scaleBeforeClose($event) {
      action('scale-before-close')($event.detail);
      this.$emit('scale-before-close', $event);
    },
    scaleClose($event) {
      action('scale-close')($event.detail);
      this.$emit('scale-close', $event);
    },
  },
};
</script>
