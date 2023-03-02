<template>
  <div class="wrapper">
    <scale-telekom-app-shell>
      <component slot="header" :is="storyName" :app-name="appName" :app-name-link="appNameLink"></component>
      <!-- content goes here -->
    </scale-telekom-app-shell>
  </div>
</template>

<script>
import StoryStandard from './StoryStandard.vue';
import StoryFlyoutNav from './StoryFlyoutNav.vue';
import StoryFlyoutNav2 from './StoryFlyoutNav2.vue';


export default {
  components: {
    StoryStandard,
    StoryFlyoutNav,
    StoryFlyoutNav2
  },
  props: {
    appName: String,
    appNameLink: String,
    appNameClick: Function,
    storyName: String,
  },
};
</script>

<style>
.wrapper {
  margin: -1rem;
}

scale-telekom-app-shell {
  --min-height: 200vh;
  --background: var(--telekom-color-background-surface-subtle);
}
</style>
