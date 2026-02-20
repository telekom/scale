<template>
  <div>
    <slot name="text"></slot>
  </div>
</template>

<script>
export default {
  props: {
    heading: { type: String },
    type: { type: 'inline' | 'banner' | 'toast', default: 'inline' },
    variant: { type: 'danger' | 'warning' | 'success' | 'informational', default: 'informational' },
    opened: { type: Boolean },
    dismissible: { type: Boolean },
    delay: { type: Number },
    innerAriaLive: { type: String },
    innerRole: { type: String, default: 'alert' },
    closeButtonLabel: { type: String },
    closeButtonTitle: { type: String },
    styles: { type: String },
    ariaHeading: { type: String },  
    headingLevel: { type: Number, default: 2 },
  },
  render() {
    return this.$slots.default
  },
}
</script>