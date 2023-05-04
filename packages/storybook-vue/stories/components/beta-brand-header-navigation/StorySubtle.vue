<template>
  <scale-telekom-header type="subtle"
    :app-name="appName" 
    :app-name-link="appNameLink"
    :meta-nav-aria-label="metaNavAriaLabel" 
    :meta-nav-external-aria-label="metaNavExternalAriaLabel"
    :lang-switcher-aria-label="langSwitcherAriaLabel"
    :main-nav-aria-label="mainNavAriaLabel"   
  >
    <SlotMetaNavExternal />
    <SlotMetaNav />
    <SlotLangSwitcher />
    <SlotFunctionsSubtle :app-name="appName" :app-name-link="appNameLink" />
  </scale-telekom-header>
</template>

<script>
import SlotMetaNavExternal from './SlotMetaNavExternal.vue';
import SlotMetaNav from './SlotMetaNav.vue';
import SlotMainNavWithFlyout from './SlotMainNavWithFlyout.vue';
import SlotLangSwitcher from './SlotLangSwitcher.vue';
import SlotFunctionsSubtle from './SlotFunctionsSubtle.vue';

export default {
  components: {
    SlotMetaNavExternal,
    SlotMetaNav,
    SlotMainNavWithFlyout,
    SlotLangSwitcher,
    SlotFunctionsSubtle,
  },
  props: {
    appName: String,
    appNameLink: String,
    metaNavAriaLabel: String,
    metaNavExternalAriaLabel: String,
    langSwitcherAriaLabel: String,
    mainNavAriaLabel: String,    
  },
};
</script>
