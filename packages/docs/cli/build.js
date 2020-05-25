const path = require("path")
const { spawn } = require("child_process")
const { logger } = require("./logger")

const build = async () => {
  try {
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
        resolve()
      })
    })
  } catch (error) {
    logger.error(error)
  }
}
module.exports = build
