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
    >
      <slot name="content"></slot>
      <scale-button :disabled="disabled">Hover me</scale-button>
    </scale-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    content: { type: String },
    placement: { type: String },
    disabled: { type: Boolean },
    distance: { type: Number },
    opened: { type: Boolean },
    trigger: { type: String },
    flip: { type: Boolean },
    styles: String,
  },
  methods: {
    'scale-show'($event) {
      action('scale-show');
      this.$emit('scale-show', $event);
    },
    'scale-before-show'($event) {
      action('scale-before-show');
      this.$emit('scale-before-show', $event);
    },
    'scale-before-hide'($event) {
      action('scale-before-hide');
      this.$emit('scale-before-hide', $event);
    },
    'scale-hide'($event) {
      action('scale-hide');
      this.$emit('scale-hide', $event);
    },
  },
};
</script>
