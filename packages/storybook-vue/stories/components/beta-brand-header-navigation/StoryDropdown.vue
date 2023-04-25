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
    <SlotDropdown />
    <SlotMobileDropdown :app-name="appName" :app-name-link="appNameLink" />
  </scale-telekom-header>
</template>

<script>
import SlotMetaNavExternal from './SlotMetaNavExternal.vue';
import SlotMetaNav from './SlotMetaNav.vue';
import SlotDropdown from './SlotDropdown.vue';
import SlotLangSwitcher from './SlotLangSwitcher.vue';
import SlotMobileDropdown from './SlotMobileDropdown.vue'

export default {
  components: {
    SlotMetaNavExternal,
    SlotMetaNav,
    SlotLangSwitcher,
    SlotDropdown,
    SlotMobileDropdown
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
