const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = async ({ config }) => {
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [{ from: '../../node_modules/@telekom/design-tokens/dist/assets/telekom/fonts', to: "fonts" }],
    })
  );
  return config;
};
