<template>
  <scale-logo
    :variant="variant"
    :transparent="transparent"
    :language="language"
    :size="size"
    :styles="styles"
    :href="href"
    :accessibility-title="accessibilityTitle"
     @click-handler="clickHandler"
  >
  </scale-logo>
</template>

<script>
import { action } from "@storybook/addon-actions";

export default {
  props: {
    variant: { type: "magenta" | "white", default: "magenta" },
    transparent: { type: Boolean, default: false },
    language: {
      type:
        "de" |
        "en" |
        "cz" |
        "hr" |
        "hu" |
        "me" |
        "mk_kyr" |
        "mk_lat" |
        "ro" |
        "sk" |
        "",
      default: "de",
    },
    size: { type: Number, default: 36 },
    href: { type: String },
    accessibilityTitle: { type: String, default: "Telekom Logo" },
    styles: { type: String }
  },
  methods: {
    clickHandler($event) {
      action("clickHandler");
      this.$emit("clickHandler", $event);
    },
  },
};
</script>
