<template>
  <scale-telekom-header :app-name="appName" :app-name-link="appNameLink" type="subtle">
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
  },
};
</script>
