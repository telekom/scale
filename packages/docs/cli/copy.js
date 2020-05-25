const findUserConfig = require("./find-user-config")
const { logger } = require("./logger")
const path = require("path")
const fs = require("fs-extra")

const copy = async argv => {
  try {
    const config = require(await findUserConfig(argv))
    const monumentRootPath = path.join(__dirname, "..")
    const stencilRootPath = process.env.CWD

    return Promise.all([
      fs.copy(
        `${stencilRootPath}${config.docsFilePath}`,
        `${monumentRootPath}/components.json`
      ),

      fs.copy(
        `${stencilRootPath}/dist/${config.namespace}`,
        `${monumentRootPath}/public/components/`
      ),

      config.themeFilePath &&
        fs.copy(
          `${stencilRootPath}${config.themeFilePath}`,
          `${monumentRootPath}/public/theme.js`
        ),
    ])
  } catch (error) {
    logger.error(error)
  }
}
module.exports = copy
