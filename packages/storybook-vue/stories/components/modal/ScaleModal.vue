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
    @scaleClose="scaleClose"
    @scaleOpen="scaleOpen"
    @scaleBeforeClose="scaleBeforeClose"
  >
    <slot name="close"></slot>
    <slot></slot>
    <slot name="actions"></slot>
  </scale-modal>
</template>

<script>
import { action } from '@storybook/addon-actions';

const scaleCloseAction = action('scaleClose');

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
      action('scaleOpen');
      this.$emit('scaleOpen', $event);
    },
    'scale-open'($event) {
      action('scale-open');
      this.$emit('scale-open', $event);
    },
    scaleBeforeClose($event) {
      action('scaleBeforeClose');
      this.$emit('scaleBeforeClose', $event);
    },
    'scale-before-close'($event) {
      action('scale-before-close');
      this.$emit('scale-before-close', $event);
    },
    scaleClose($event) {
      action('scaleClose');
      this.$emit('scaleClose', $event);
    },
    'scale-close'($event) {
      action('scale-close');
      this.$emit('scale-close', $event);
    },
  },
};
</script>
