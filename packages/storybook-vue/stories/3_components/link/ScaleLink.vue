<template>
  <scale-link
    :href="href"
    :styles="styles"
    :disabled="disabled"
    :omit-underline="omitUnderline"
    :download="download"
    :icon-position="iconPosition"
    :anchor-attributes="anchorAttributes"
  >
    <slot></slot>
    <scale-icon-navigation-external-link
      size="16"
      accessibility-title="open link in new tab"
      slot="icon"
    ></scale-icon-navigation-external-link>
  </scale-link>
</template>

<script>
export default {
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
