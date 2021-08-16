<template>
  <scale-app-footer
    :claim-lang="claimLang"
    :footer-navigation="footerNavigation"
    :variant="variant"
    :copyright="copyright"
  >
    <slot name="logo"></slot>
    <slot name="navigation"></slot>
  </scale-app-footer>
</template>

<script>
export default {
  props: {
    claimLang: String,
    footerNavigation: String,
    variant: String,
    copyright: String,
  },
};
</script>
