const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = async ({ config }) => {
  config.module.rules.forEach((rule) => {
    if (!Array.isArray(rule.use)) return;
    rule.use.forEach((loader) => {
      if (!loader.loader || !loader.loader.includes("babel-loader")) return;
      loader.options.plugins = [
        [require.resolve("@babel/plugin-transform-class-properties"), { loose: true }],
        ...(loader.options.plugins || []),
      ];
    });
  });

  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [{ from: "../components/src/telekom/fonts", to: "fonts" }],
    })
  );

  return config;
};
