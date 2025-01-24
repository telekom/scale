<template>
  <scale-telekom-header
    :app-name="appName"
    :app-name-link="appNameLink"
    :app-name-click="appNameClick"
    :logo-ref="logoHref"
    :logo-title="logoTitle"
    :logo-hide-title="logoHideTitle"
    :meta-nav-aria-label="metaNavAriaLabel" 
    :meta-nav-external-aria-label="metaNavExternalAriaLabel"
    :lang-switcher-aria-label="langSwitcherAriaLabel"
    :main-nav-aria-label="mainNavAriaLabel"      
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
    logoHref: String,
    logoTitle: String,
    logoHideTitle: String,
    metaNavAriaLabel: String,
    metaNavExternalAriaLabel: String,
    langSwitcherAriaLabel: String,
    mainNavAriaLabel: String,   
  },
};
</script>
