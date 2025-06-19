<template>
  <scale-sidebar-nav>
    :arial-label-sidebar-nav="ariaLabelSiderbarNav"
    :collapsible="collapsible"
    :collapsible-label="collapsibleLabel"
    :collapsible-media-query="collapsibleMediaQuery"
    :styles="styles"
    :collapsed="collapsed"
    >
  </scale-sidebar-nav>
</template>

<script>
export default {
  name: 'scale-sidebar-nav',
  props: {
    ariaLabelSiderbarNav: { type: String, default: "COMMENT: A brief description of the purpose of the navigation, omitting the term navigation, as the screen reader will read both the role and the contents of the label." },
    collapsible: { type: Boolean, default: false },
    collapsibleMediaQuery: { type: String },
    collapsibleLabel: { type: String, default: 'Menu' },
    styles: { type: String },
    collapsed: { type : Boolean }
  }
}
</script>
