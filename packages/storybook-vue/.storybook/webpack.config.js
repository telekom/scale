const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = async ({ config }) => {
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        { from: "../components/src/telekom/fonts", to: "fonts" },
        {
          from: "./stories/3_components",
          to: "assets/components",
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ["**/*.md", "**/*.vue", "**/*.mdx"],
          },
        },
      ],
    })
  );

  return config;
};
