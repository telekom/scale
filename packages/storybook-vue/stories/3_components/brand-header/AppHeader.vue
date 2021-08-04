<template>
  <scale-app-header
      :logo-click="logoClick"
      :logo-title="logoTitle"
      :logo-href="logoHref"
      :portal-name="portalName"
      :claim-lang="claimLang"
      :main-navigation="mainNavigation"
      :icon-navigation="iconNavigation"
      :sector-navigation="sectorNavigation"
      :addon-navigation="addonNavigation"
      :active-route-id="activeRouteId"
      :active-sector-id="activeRouteId"
  >
    <slot name="logo"></slot>
    <slot name="menu-main"></slot>
    <slot name="menu-icon"></slot>
    <slot name="menu-sector"></slot>
    <slot name="menu-mobile"></slot>
  </scale-app-header>
</template>

<script>
export default {
  props: {
    logoTitle: String,
    logoHref: String,
    logoClick: Function,
    portalName: String,
    claimLang: String,
    mainNavigation: String,
    iconNavigation: String,
    sectorNavigation: String,
    addonNavigation: String,
    activeRouteId: String,
    activeSectorId: String
  }
};
</script>
