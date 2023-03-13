<template>
  <scale-telekom-footer-data-back-compat
    :footer-navigation="footerNavigation"
    :type="type"
    :copyright="copyright"
  >
  </scale-telekom-footer-data-back-compat>
</template>

<script>
export default {
  props: {
    footerNavigation: String,
    copyright: String,
    type: { type: String, default: 'standard' },
  },
};
</script>
