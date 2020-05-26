const path = require("path")
const fs = require("fs-extra")
const { spawn } = require("child_process")
const { logger } = require("./logger")
const findUserConfig = require("./find-user-config")

const build = async argv => {
  try {
    const config = require(await findUserConfig(argv))
    const ps = spawn(
      "cd",
      [path.join(__dirname, "../"), "&&", "yarn", "gatsby", "build"],
      {
        shell: true,
      }
    )

    ps.stdout.on("data", data => {
      console.log(data.toString().trim())
    })

    return new Promise(resolve => {
      process.stdin.pipe(ps.stdin)

      ps.on("close", code => {
        fs.copy(
          path.join(__dirname, "../public"),
          path.join(process.env.CWD, config.outputDirName)
        ).then(() => {
          resolve()
        })
      })
    })
  } catch (error) {
    logger.error(error)
  }
}
module.exports = build
