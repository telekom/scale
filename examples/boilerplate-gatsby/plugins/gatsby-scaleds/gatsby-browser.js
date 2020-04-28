const { useTheme } = require("@scaleds/components/dist/theme")

exports.onInitialClientRender = ({ element }, options) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useTheme(options.theme)
}
