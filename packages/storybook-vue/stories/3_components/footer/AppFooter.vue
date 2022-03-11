<template>
  <scale-app-footer
    :footer-navigation="footerNavigation"
    :variant="variant"
    :copyright="copyright"
    :logo-title="logoTitle"
    :logo-href="logoHref"
    :logo-aria-described-by="logoAriaDescribedBy"
    @logo-click="logoClick"
  >
    <slot name="logo"></slot>
    <slot name="navigation"></slot>
  </scale-app-footer>
</template>

<script>
export default {
  props: {
    footerNavigation: String,
    variant: String,
    copyright: String,
    logoTitle: String,
    logoHref: String,
    logoAriaDescribedBy: String,
    logoClick: Function,
  }
};
</script>
