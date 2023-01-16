const { defineCustomElements } = require("@telekom/scale-components-neutral/loader");

exports.onInitialClientRender = ({ element }, options) => {
  defineCustomElements(window);
};
