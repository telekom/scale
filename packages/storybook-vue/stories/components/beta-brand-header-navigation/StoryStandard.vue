<template>
  <scale-telekom-header
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
    <SlotMainNav />
    <SlotFunctions :app-name="appName" :app-name-link="appNameLink" />
  </scale-telekom-header>
</template>

<script>
import SlotMetaNavExternal from './SlotMetaNavExternal.vue';
import SlotMetaNav from './SlotMetaNav.vue';
import SlotMainNav from './SlotMainNav.vue';
import SlotLangSwitcher from './SlotLangSwitcher.vue';
import SlotFunctions from './SlotFunctions.vue';

export default {
  components: {
    SlotMetaNavExternal,
    SlotMetaNav,
    SlotMainNav,
    SlotLangSwitcher,
    SlotFunctions,
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
