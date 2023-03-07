<template>
  <scale-telekom-header :app-name="appName" :app-name-link="appNameLink" type="slim">
    <SlotMetaNavExternal />
    <SlotMetaNav />
    <SlotLangSwitcher />
    <SlotMainNavWithFlyout />
    <SlotFunctions :app-name="appName" :app-name-link="appNameLink" />
  </scale-telekom-header>
</template>

<script>
import SlotMetaNavExternal from './SlotMetaNavExternal.vue';
import SlotMetaNav from './SlotMetaNav.vue';
import SlotMainNavWithFlyout from './SlotMainNavWithFlyout.vue';
import SlotLangSwitcher from './SlotLangSwitcher.vue';
import SlotFunctions from './SlotFunctions.vue';

export default {
  components: {
    SlotMetaNavExternal,
    SlotMetaNav,
    SlotMainNavWithFlyout,
    SlotLangSwitcher,
    SlotFunctions,
  },
  props: {
    appName: String,
    appNameLink: String,
  },
};
</script>
