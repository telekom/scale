<template>
  <scale-pagination
    :hide-borders="hideBorders"
    :hide-border="hideBorder"
    :page-size="pageSize"
    :small="small"
    :size="size"
    :start-element="startElement"
    :total-elements="totalElements"
    :aria-label-first-page="ariaLabelFirstPage"
    :aria-label-last-page="ariaLabelLastPage"
    :aria-label-previous-page="ariaLabelPreviousPage"
    :aria-label-next-page="ariaLabelNextPage"
    :styles="styles"
    @scale-pagination="scalePagination"
  >
  </scale-pagination>
</template>

<script>
import { action } from '@storybook/addon-actions';
export default {
  props: {
    hideBorders: { type: Boolean, default: false },
    hideBorder: { type: Boolean, default: false },
    pageSize: { type: Number, default: 10 },
    startElement: { type: Number, default: 0 },
    totalElements: { type: Number, default: 1 },
    styles: { type: String },
    small: { type: Boolean, default: false },
    size: { type: String, default: 'large' },
    ariaLabelFirstPage: { type: String, default: 'Go to first page' },
    ariaLabelLastPage: { type: String, default: 'Go to last page' },
    ariaLabelPreviousPage: { type: String, default: 'Go to previous page' },
    ariaLabelNextPage: { type: String, default: 'Go to next page' },
  },
  methods: {
    scalePagination($event) {
      action('scale-pagination')($event.detail);
      this.$emit('scale-pagination', $event);
    },
  },
};
</script>
