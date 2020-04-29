const { useTheme } = require("@scaleds/components/dist/theme");

exports.onInitialClientRender = ({ element }, options) => {
  useTheme(options.theme);
};
