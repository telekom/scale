const { logger } = require("./logger")
const path = require("path")
const spawn = require("child_process").spawn

const develop = async (argv) => {
  try {
    const ps = spawn(
      "cd",
      [
        path.join(__dirname, "../"),
        "&&",
        "yarn",
        "gatsby",
        "develop",
        "-p",
        argv.port,
      ],
      {
        shell: true,
      }
    )

    logger.output(`Starting server on http://localhost:${argv.port}`)

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
module.exports = develop
