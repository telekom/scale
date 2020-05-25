const path = require("path")
const fs = require("fs")
const pkgUp = require("pkg-up")
const { logger } = require("./logger")

const DEFAULT_FILE_NAME = ".monument"
const SUPPORTED_FILE_EXT = ["yaml", "yml", "json", "js"]

const getPkgJSONPath = async () => {
  try {
    return await pkgUp()
  } catch (error) {
    logger.error(error)
    return undefined
  }
}

const findUserConfig = async (argv = {}) => {
  if (argv.config) {
    return path.resolve(process.cwd(), argv.config)
  }

  const pkgJSONPath = await getPkgJSONPath()
  if (!pkgJSONPath) {
    return undefined
  }

  const userCWD = path.dirname(pkgJSONPath)
  const userFile = SUPPORTED_FILE_EXT.map(
    ext => `${userCWD}/${DEFAULT_FILE_NAME}.${ext}`
  ).find(file => fs.existsSync(file))

  if (userFile) {
    return userFile
  }
  return undefined
}

module.exports = findUserConfig
