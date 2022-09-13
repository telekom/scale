<template>
  <scale-interactive-icon
    :size="size"
    :active="active"
    :innerTabindex="innerTabindex"
    :download="download"
    :value="value"
    :name="name"
    :type="type"
  >
    <slot></slot>
  </scale-interactive-icon>
</template>

<script>

export default {
  props: {
    size: { type: String },
    type: { type: String },
    name: { type: String },
    value: { type: String },
    download: { type: String },
    innerTabindex: { type: String },
    active: { type: String },
  },
};
</script>
