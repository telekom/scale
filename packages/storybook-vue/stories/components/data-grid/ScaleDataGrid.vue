<template>
  <scale-data-grid
    ref="dataGrid"
    :freeze-header="freezeHeader"
    :visible="visible"
    :heading="heading"
    :sortable-column-title="sortableColumnTitle"
    :height="height"
    :hide-border="hideBorder"
    :hide-header="hideHeader"
    :hide-info="hideInfo"
    :hide-menu="hideMenu"
    :numbered="numbered"
    :page-size="pageSize"
    :selectable="selectable"
    :shade-alternate="shadeAlternate"
    :styles="styles"
    @scale-edit="scaleEdit"
    @scale-sort="scaleSort"
    @scale-selection="scaleSelection"
  >
    <slot></slot>
    <slot name="menu"></slot>
  </scale-data-grid>
</template>

<script>
import { action } from '@storybook/addon-actions';

export default {
  props: {
    fields: { type: Array },
    rows: { type: Array },
    freezeHeader: { type: Boolean },
    visible: { type: Boolean },
    heading: { type: String },
    sortableColumnTitle: { type: String },
    height: { type: String },
    hideBorder: { type: Boolean },
    hideHeader: { type: Boolean },
    hideInfo: { type: Boolean },
    hideMenu: { type: Boolean },
    numbered: { type: Boolean },
    pageSize: { type: Number },
    selectable: { type: Boolean },
    localization: { type: Object },
    shadeAlternate: { type: Boolean },
    styles: { type: String },
    selection: { type: Array },
  },
  mounted() {
    this.updateComplexProps();
  },
  watch: {
    fields: 'updateComplexProps',
    rows: 'updateComplexProps',
    localization: 'updateComplexProps',
  },
  methods: {
    updateComplexProps() {
      const el = this.$refs.dataGrid;
      if (el) {
        if (this.fields) {
          el.fields = this.fields;
        }
        if (this.rows) {
          el.rows = this.rows;
        }
        if (this.localization) {
          el.localization = this.localization;
        }
      }
    },
    scaleEdit($event) {
      action('scale-edit')($event.detail);
      this.$emit('scale-edit', $event);
    },
    scaleSort($event) {
      action('scale-sort')($event.detail);
      this.$emit('scale-sort', $event);
    },
    scaleSelection($event) {
      action('scale-selection')($event.detail);
      this.$emit('scale-selection', $event);
    },
  },
};
</script>
