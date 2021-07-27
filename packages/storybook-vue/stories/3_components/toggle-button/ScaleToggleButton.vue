<template>
  <scale-toggle-button
    :size="size"
    :variant="variant"
    :color-scheme="colorScheme"
    :disabled="disabled"
    :selected="selected"
    :icon-only="iconOnly"
    :radius="radius"
    :aria-label="ariaLabel"
    :aria-description-translation="ariaDescriptionTranslation"
    :aria-lang-selected="ariaLangSelected"
    :aria-lang-deselected="ariaLangDeselected"
    :styles="styles"
  >
    <slot></slot>
  </scale-toggle-button>
</template>

<script>
export default {
  props: {
    size: { type: String, default: 'large' },
    variant: { type: String, default: 'primary' },
    colorScheme: { type: String, default: 'magenta' },
    disabled: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
    iconOnly: { type: Boolean, default: false },
    radius: { type: String },
    ariaLabel: { type: String },
    ariaLangSelected: { type: String, default: 'selected' },
    ariaLangDeselected: { type: String, default: 'deselected' },
    styles: { type: String },
  },
};
</script>
