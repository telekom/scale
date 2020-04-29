const React = require("react")
const { useTheme } = require("@scaleds/components/dist/theme");
const jss = require('jss').default
const jssPluginGlobal = require('jss-plugin-global').default
const jssPluginCamelCase = require('jss-plugin-camel-case').default

jss.use(jssPluginCamelCase())
jss.use(jssPluginGlobal())

exports.onRenderBody = (
  { setHeadComponents, setHtmlAttributes, setBodyAttributes },
  options
) => {
  const { typography } = useTheme(options.theme)
  const { variants, body } = typography
  const styles = jss.createStyleSheet({'@global': { body, ...variants }})

  setHeadComponents([
    <style type="text/css" id="scale-global-styles">
      {styles.toString()}
    </style>
  ])
}
