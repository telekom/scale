<template>
  <div>
    <slot name="trigger" />
    <slot />
  </div>
</template>

<script>
  export default {
    props: {
      closeOnSelect: { type: Boolean, default: true },
      direction: { type: String, default: 'bottom-right' },
      styles: { type: String },
    },
  };
</script>
