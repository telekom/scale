<template>
  <scale-telekom-header
    :app-name-click="appNameClick"
    :app-name-title="appNameTitle"
    :app-name="appName"
    :main-navigation="mainNavigation"
    :icon-navigation="iconNavigation"
    :sector-navigation="sectorNavigation"
    :addon-navigation="addonNavigation"
    :user-navigation="userNavigation"
    :active-route-id="activeRouteId"
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
    mainNavigation: String,
    iconNavigation: String,
    sectorNavigation: String,
    userNavigation: String,
    addonNavigation: String,
    activeRouteId: String,
  },
};
</script>
