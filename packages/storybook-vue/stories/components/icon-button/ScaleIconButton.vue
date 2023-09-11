
<template>
  <scale-icon-button
    :size="size"
    :active="active" 
    :disabled="disabled"
    :label="label"
    :label-placement="labelPlacement"
    :type="type"
  >
    <slot></slot>
  </scale-icon-button>
</template>

<script>

export default {
  props: {
    size: { type: 'small' | 'standard' | 'large', default: 'standard' },
    type: { type: 'toggle' | 'standard' | 'activate'},
    // name: { type: String },
    // value: { type: String },
    // download: { type: String },
    // innerTabindex: { type: String },
    active: { type: String },
    disabled: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    label: {type: String},
    labelPlacement: {type: 'bottom' | 'right'},
  },
};
</script>
