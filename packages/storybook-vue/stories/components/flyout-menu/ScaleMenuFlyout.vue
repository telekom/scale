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
    methods: {
      emit() {
        this.$emit('scale-open')
        this.$emit('scale-close')
        this.$emit('scale-select')
      }
    }
  };
</script>
