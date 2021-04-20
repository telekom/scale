<template>
  <scale-app-footer
    :claim-lang="claimLang"
    :footer-navigation="footerNavigation"
    :variant="variant"
  ></scale-app-footer>
</template>

<script>
export default {
  props: {
    claimLang: String,
    footerNavigation: String,
    variant: String
  }
};
</script>
