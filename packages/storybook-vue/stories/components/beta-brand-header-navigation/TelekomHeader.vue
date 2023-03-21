<template>
  <scale-telekom-header
    :app-name="appName"
    :app-name-link="appNameLink"
    :app-name-click="appNameClick"
  >
    <slot name="logo"></slot>
    <slot name="meta-nav-external"></slot>
    <slot name="meta-nav"></slot>
    <slot name="lang-switcher"></slot>
    <slot name="main-nav"></slot>
    <slot name="functions"></slot>
  </scale-telekom-header>
</template>

<script>
export default {
  props: {
    appName: String,
    appNameLink: String,
    appNameClick: Function,
  },
};
</script>
