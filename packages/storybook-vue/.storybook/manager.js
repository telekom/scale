import { addons } from "@storybook/addons";
import scaleTheme from "./scaleTheme.js";

addons.setConfig({
  theme: scaleTheme,
});

addons.setConfig({
  previewTabs: {
    // the order of the tabs is configured by the order here
    // null means no override for the title
    'storybook/docs/panel': null,
    '@telekom/scale-usage-addon': null,
    canvas: null,
  },
});
