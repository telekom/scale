<template>
  <scale-link
    :href="href"
    :styles="styles"
    :disabled="disabled"
    :omit-underline="omitUnderline"
    :icon-position="iconPosition"
    :download="download"
    :hreflang="hreflang"
    :referrerpolicy="referrerpolicy"
    :rel="rel"
    :target="target"
    :type="type"
    :inner-tabindex="innerTabindex"
  >
    <slot></slot>
    <slot name="icon"></slot>
  </scale-link>
</template>

<script>
export default {
  data() {
    return {
      withIcon: false,
    };
  },
  props: {
    href: String,
    styles: String,
    iconPosition: { type: String, default: 'after' },
    omitUnderline: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    download: { type: Boolean, default: false },
    hreflang: { type: String, default: null },
    ping: { type: String, default: null },
    referrerpolicy: { type: String, default: null },
    rel: { type: String, default: null },
    target: { type: String, default: null },
    type: { type: String, default: null },
    innerTabindex: Number,
  },
};
</script>
