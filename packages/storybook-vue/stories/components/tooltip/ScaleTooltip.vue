<template>
  <div style="padding: 30px 30px 30px 70px">
    <scale-tooltip
      :content="content"
      :placement="placement"
      :disabled="disabled"
      :distance="distance"
      :opened="opened"
      :trigger="trigger"
      :flip="flip"
      :arrow-offset="arrowOffset"
      :arrow-padding="arrowPadding"
      @scale-show="scaleShow"
      @scale-before-show="scaleBeforeShow"
      @scale-before-hide="scaleBeforeHide"
      @scale-hide="scaleHide"
    >
      <slot name="content"></slot>
      <scale-button :disabled="disabled">Hover me</scale-button>
    </scale-tooltip>
  </div>
</template>

<script>
import { action } from "@storybook/addon-actions";
export default {
  props: {
    content: { type: String },
    placement: { type: String },
    disabled: { type: Boolean },
    distance: { type: Number },
    opened: { type: Boolean },
    trigger: { type: String },
    flip: { type: Boolean },
    arrowOffset: { type: Number },
    arrowPadding: { type: Number },
    styles: String,
  },
  methods: {
    scaleShow($event) {
      action('scale-show')($event);
      this.$emit('scale-show', $event);
    },
    scaleBeforeShow($event) {
      action('scale-before-show')($event);
      this.$emit('scale-before-show', $event);
    },
    scaleBeforeHide($event) {
      action('scale-before-hide')($event);
      this.$emit('scale-before-hide', $event);
    },
    scaleHide($event) {
      action('scale-hide')($event);
      this.$emit('scale-hide', $event);
    },
  },
};
</script>
