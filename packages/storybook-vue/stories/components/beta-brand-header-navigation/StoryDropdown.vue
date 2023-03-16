<template>
  <scale-telekom-header :app-name="appName" :app-name-link="appNameLink">
    <SlotMetaNavExternal />
    <SlotMetaNav />
    <SlotLangSwitcher />
    <SlotDropdown />
    <SlotFunctions :app-name="appName" :app-name-link="appNameLink" />
  </scale-telekom-header>
</template>

<script>
import SlotMetaNavExternal from './SlotMetaNavExternal.vue';
import SlotMetaNav from './SlotMetaNav.vue';
import SlotDropdown from './SlotDropdown.vue';
import SlotLangSwitcher from './SlotLangSwitcher.vue';
import SlotFunctions from './SlotFunctions.vue';

export default {
  components: {
    SlotMetaNavExternal,
    SlotMetaNav,
    SlotLangSwitcher,
    SlotFunctions,
    SlotDropdown
},
  props: {
    appName: String,
    appNameLink: String,
  },
};
</script>
