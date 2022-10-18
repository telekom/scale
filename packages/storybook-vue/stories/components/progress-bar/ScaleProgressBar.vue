<template>
  <scale-progress-bar
    :custom-color="customColor"
    :disabled="disabled"
    :label="label"
    :has-error="hasError"
    :status-description="statusDescription"
    :show-status="showStatus"
    :percentage="percentage"
    :percentageStart="percentageStart"
    :styles="styles"
  >
  </scale-progress-bar>
</template>

<script>
export default {
  props: {
    customColor: String,
    disabled: { type: Boolean, default: false },
    label: String,
    hasError: Boolean,
    statusDescription: String,
    styles: String,
    showStatus: Boolean,
    percentage: Number,
    percentageStart: {type: Number, default: 0} 
  },
};
</script>
