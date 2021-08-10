<template>
  <scale-pagination
    :hide-borders="hideBorders"
    :page-size="pageSize"
    :small="small"
    :start-element="startElement"
    :total-elements="totalElements"
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
  },
};
</script>
