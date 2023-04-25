<template>
  <scale-telekom-header 
    type="slim"
    :app-name="appName" 
    :app-name-link="appNameLink"
    :meta-nav-aria-label="metaNavAriaLabel" 
    :meta-nav-external-aria-label="metaNavExternalAriaLabel"
    :language-switcher-aria-label="languageSwitcherAriaLabel"
    :main-nav-aria-label="mainNavAriaLabel"    
    >
    <SlotMetaNavExternal />
    <SlotMetaNav />
    <SlotLangSwitcher />
    <SlotMainNavWithFlyout />
    <SlotFunctionsSlim :app-name="appName" :app-name-link="appNameLink" />
  </scale-telekom-header>
</template>

<script>
import SlotMetaNavExternal from './SlotMetaNavExternal.vue';
import SlotMetaNav from './SlotMetaNav.vue';
import SlotMainNavWithFlyout from './SlotMainNavWithFlyout.vue';
import SlotLangSwitcher from './SlotLangSwitcher.vue';
import SlotFunctionsSlim from './SlotFunctionsSlim.vue';

export default {
  components: {
    SlotMetaNavExternal,
    SlotMetaNav,
    SlotMainNavWithFlyout,
    SlotLangSwitcher,
    SlotFunctionsSlim,
  },
  props: {
    appName: String,
    appNameLink: String,
    metaNavAriaLabel: String,
    metaNavExternalAriaLabel: String,
    languageSwitcherAriaLabel: String,
    mainNavAriaLabel: String,    
  },
};
</script>
