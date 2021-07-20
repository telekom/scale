<template>
  <div style="height: 80px; position: relative">
    <div style="position: absolute; bottom: 20px; left: 200px">
    <scale-tooltip 
      :content="content"
      :placement="placement"
      :disabled="disabled"
      :distance="distance"
      :open="open"
      :skidding="skidding"
      :trigger="trigger"
      :flip="flip"
      :preventOverflow="preventOverflow"
    >
      <scale-tooltip slot="content">
        <slot></slot>
      </scale-tooltip>
      <scale-button>
        Hover for Tooltip
      </scale-button>
    </scale-tooltip>  
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: String,
    placement: String,
    disabled: Boolean,
    distance: Number,
    open: Boolean,
    skidding: Boolean,
    trigger: String,
    flip: Boolean,
    preventOverflow: Boolean
  },
}
</script>