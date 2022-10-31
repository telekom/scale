module.exports = {
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-controls",
    '@storybook/addon-viewport',
    "./usage-addon/register.js",
    "./language-addon/register.js",
    "./sidebar-links-addon/register.js",
    "./color-mode-switch-addon/register.js",
  ],
  stories: ["../stories/**/**/*.stories.mdx"]
};
