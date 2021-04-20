<template>
  <div>
    <scale-icon-action-favorite
      :color="color"
      :size="size"
      :selected="selected"
      :decorative="decorative"
      :accessibility-title="accessibilityTitle"
    />
  </div>
</template>

<script>
export default {
  props: {
    color: { type: String, default: 'currentColor' },
    size: { type: Number, default: 24 },
    selected: { type: Boolean, default: false },
    decorative: { type: Boolean, default: false },
    accessibilityTitle: { type: String },
  }
}
</script>