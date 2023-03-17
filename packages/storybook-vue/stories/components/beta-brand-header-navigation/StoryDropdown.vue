<template>
  <scale-telekom-header :app-name="appName" :app-name-link="appNameLink">
    <SlotMetaNavExternal />
    <SlotMetaNav />
    <SlotLangSwitcher />
    <SlotDropdown />
    <SlotMobileDropdown />
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
  },
};
</script>
