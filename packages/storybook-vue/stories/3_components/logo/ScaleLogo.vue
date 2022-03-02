<template>
  <scale-logo
    :variant="variant"
    :transparent="transparent"
    :language="language"
    :size="size"
    :styles="styles"
    :href="href"
    :logo-title="logoTitle"
    :logo-aria-described-by="logoAriaDescribedBy"
    :accessibility-title="accessibilityTitle"
    :focusable="focusable"
    :scroll-into-view-on-focus="scrollIntoViewOnFocus"
  >
  </scale-logo>
</template>

<script>
export default {
  props: {
    variant: { type: 'magenta' | 'white', default: 'magenta' },
    transparent: { type: Boolean, default: false },
    focusable: { type: Boolean, default: false },
    scrollIntoViewOnFocus: { type: Boolean, default: false },
    language: {
      type:
        'de' |
        'en' |
        'cz' |
        'hr' |
        'hu' |
        'me' |
        'mk_kyr' |
        'mk_lat' |
        'ro' |
        'sk' |
        '',
      default: 'de',
    },
    size: { type: Number, default: 36 },
    href: { type: String },
    styles: { type: String },
    logoTitle: { type: String },
    logoAriaDescribedBy: { type: String },
    accessibilityTitle: { type: String, default: 'Telekom Logo' },
  },
};
</script>
