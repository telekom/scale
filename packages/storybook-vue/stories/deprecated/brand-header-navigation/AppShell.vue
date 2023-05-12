<template>
  <scale-app-shell
    :logo-click="logoClick"
    :logo-title="logoTitle"
    :logo-hide-title="logoHideTitle"
    :logo-href="logoHref"
    :logo-aria-described-by="logoAriaDescribedBy"
    :portal-name="portalName"
    :claim-lang="claimLang"
    :main-navigation="mainNavigation"
    :icon-navigation="iconNavigation"
    :sector-navigation="sectorNavigation"
    :addon-navigation="addonNavigation"
    :user-navigation="userNavigation"
    :active-route-id="activeRouteId"
    :active-sector-id="activeRouteId"
    :user-menu-aria-label="userMenuAriaLabel"
  >
    <slot></slot>
    <slot name="header"></slot>
    <slot name="footer"></slot>
  </scale-app-shell>
</template>

<script>
export default {
  props: {
    logoTitle: String,
    logoHideTitle: Boolean,
    logoHref: String,
    logoAriaDescribedBy: String,
    logoClick: Function,
    portalName: String,
    claimLang: String,
    mainNavigation: String,
    iconNavigation: String,
    sectorNavigation: String,
    userNavigation: String,
    addonNavigation: String,
    activeRouteId: String,
    activeSectorId: String,
    userMenuAriaLabel: String,
  },
};
</script>
