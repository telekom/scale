<template>
  <scale-alertbox
    :color="color"
    :variant="variant"
    :icon="icon"
    :close="close"
    :content="content"
  >
    <slot></slot>
  </scale-alertbox>
</template>

<script>
export default {
  props: {
    color: {type: String, default: "black"},
    variant: {type: String},
    icon: {type: Boolean, default: "false"}, 
    close: {type: Boolean, default: "false"},
    content: {type: Boolean, default: "true"},
  },
};
</script>