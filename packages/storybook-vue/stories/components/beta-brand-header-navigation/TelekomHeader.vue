<template>
  <scale-telekom-header
    :app-name-click="appNameClick"
    :app-name-title="appNameTitle"
    :app-name="appName"
  >
    <slot name="meta-nav-ext"></slot>
    <slot name="meta-nav"></slot>
    <slot name="language-switch"></slot>
    <slot name="main-nav"></slot>
    <slot name="functions"></slot>
  </scale-telekom-header>
</template>

<script>
export default {
  props: {
    appNameClick: Function,
    appNameTitle: String,
    appName: String,
  },
};
</script>
