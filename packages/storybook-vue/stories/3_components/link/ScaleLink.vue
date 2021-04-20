<template>
  <scale-link
    :block="block"
    :disabled="JSON.stringify(disabled)"
    :href="href"
    :target="target"
    :variant="variant"
    :styles="styles"
  >
    <slot></slot>
    <scale-icon-navigation-external-link
        size="16"
        accessibility-title="open link in new tab"
        slot="icon"
        v-if="target === '_blank'"
    ></scale-icon-navigation-external-link>
  </scale-link>
</template>

<script>
export default {
  props: {
    block: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    href: String,
    target: { type: String, default: "_self" },
    variant: String,
    styles: String,
  },
};
</script>
