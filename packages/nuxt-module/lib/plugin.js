const { useTheme } = require("@scaleds/components/dist/theme");

export default async function(moduleOptions) {
  if (process.client) {
    const {
      defineCustomElements,
      applyPolyfills
    } = require("@scaleds/components/loader");

    // Bind the custom elements to the window object
    applyPolyfills().then(() => {
      defineCustomElements(window);
      useTheme(<%= serialize(options.theme) %>);
    });
  }
}
