<template>
  <scale-link
    :href="href"
    :styles="styles"
    :disabled="disabled"
    :omit-underline="omitUnderline"
    :download="download"
    :icon-position="iconPosition"
    :anchor-attributes.prop="anchorAttributes"
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
    anchorAttributes: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
