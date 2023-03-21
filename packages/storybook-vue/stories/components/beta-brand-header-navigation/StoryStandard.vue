<template>
  <scale-telekom-header :app-name="appName" :app-name-link="appNameLink">
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
  },
};
</script>
