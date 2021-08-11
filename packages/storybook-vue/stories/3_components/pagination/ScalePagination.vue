<template>
  <scale-pagination
    :hide-borders="hideBorders"
    :page-size="pageSize"
    :small="small"
    :start-element="startElement"
    :total-elements="totalElements"
    :lang-go-first="langGoFirst"
    :lang-go-last="langGoLast"
    :lang-go-previous="langGoPrevious"
    :lang-go-next="langGoNext"
    :styles="styles"
  >
  </scale-pagination>
</template>

<script>
export default {
  props: {
    hideBorders: { type: Boolean, default: false },
    pageSize: { type: Number, default: 10 },
    startElement: { type: Number, default: 0 },
    totalElements: { type: Number, default: 1 },
    styles: { type: String },
    small: { type: Boolean, default: false },
    langGoFirst: { type: String, default: 'Go to first page'},
    langGoLast: { type: String, default: 'Go to last page'},
    langGoPrevious: { type: String, default: 'Go to previous page'},
    langGoNext: { type: String, default: 'Go to next page'},
  },
};
</script>
