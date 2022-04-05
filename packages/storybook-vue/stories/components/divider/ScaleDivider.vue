<template>
  <scale-divider
    :vertical="vertical"
    :styles="styles"
  >
  </scale-divider>
</template>

<script>
export default {
  props: {
    vertical: Boolean,
    styles: String
  }
};
</script>
