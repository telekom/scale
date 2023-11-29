<template>
  <scale-telekom-header
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
    <SlotMainNav />
    <SlotFunctionsProfile
      :app-name="appName"
      :app-name-link="appNameLink"
      :user-info="userInfo"
      :service-links="serviceLinks"
      :logged-in="loggedIn" />
  </scale-telekom-header>
</template>

<script>
import SlotMetaNavExternal from './SlotMetaNavExternal.vue';
import SlotMetaNav from './SlotMetaNav.vue';
import SlotLangSwitcher from './SlotLangSwitcher.vue';
import SlotFunctionsProfile from './SlotFunctionsProfile.vue';
import SlotMainNav from "./SlotMainNav.vue";

export default {
  components: {
    SlotMetaNavExternal,
    SlotMetaNav,
    SlotMainNav,
    SlotLangSwitcher,
    SlotFunctionsProfile,
  },
  props: {
    appName: String,
    appNameLink: String,
    metaNavAriaLabel: String,
    metaNavExternalAriaLabel: String,
    langSwitcherAriaLabel: String,
    mainNavAriaLabel: String,
    userInfo: String,
    serviceLinks: String,
    loggedIn: Boolean,
  },
};
</script>
