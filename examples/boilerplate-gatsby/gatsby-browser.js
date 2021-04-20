const { defineCustomElements } = require("@telekom/scale-components/loader");

exports.onInitialClientRender = ({ element }, options) => {
  defineCustomElements(window);
};
