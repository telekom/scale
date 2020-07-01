const findUserConfig = require("./find-user-config")
const { logger } = require("./logger")
const path = require("path")
const fs = require("fs-extra")
const spawn = require("child_process").spawn

const copy = async argv => {
  try {
    const config = require(await findUserConfig(argv))
    const monumentRootPath = path.join(__dirname, "..")
    const stencilRootPath = process.env.CWD

    const psClean = spawn(
      "cd",
      [
        path.join(__dirname, "../"),
        "&&",
        "yarn",
        "gatsby",
        "clean",
      ],
      {
        shell: true,
      }
    )


    psClean.on("close", () => {
      return Promise.all([
        fs.copy(
          `${stencilRootPath}${config.docsFilePath}`,
          `${monumentRootPath}/components.json`
        ),

        fs.copy(
          `${stencilRootPath}/dist/${config.namespace}`,
          `${monumentRootPath}/public/components/`
        ),

        fs.copy(
          `${stencilRootPath}/dist`,
          `${monumentRootPath}/dist`
        ),

        fs.copy(
          `${stencilRootPath}/loader`,
          `${monumentRootPath}/loader`
        ),

        fs.copy(
          `${stencilRootPath}${config.themeFilePath}`,
          `${monumentRootPath}/public/theme.js`
        ),
      ])
    })


  } catch (error) {
    logger.error(error)
  }
}
module.exports = copy
