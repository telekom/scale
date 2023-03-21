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
import StoryMegaMenu from './StoryMegaMenu.vue';
import StoryDropdown from './StoryDropdown.vue';
import StorySlim from './StorySlim.vue';
import StorySubtle from './StorySubtle.vue';

export default {
  components: {
    StoryStandard,
    StoryMegaMenu,
    StoryDropdown,
    StorySlim,
    StorySubtle
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
