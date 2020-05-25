const env = require("./env")
const buildCmd = require("./build")
const developCmd = require("./develop")
const copyCmd = require("./copy")
const asyncHandler = fn => argv => {
  argv._promise = Promise.resolve(argv).then(fn)
  return argv._promise
}

const build = {
  command: "build",
  description: "Start the build",
  builder: yargs =>
    yargs
      .option("port", {
        alias: "p",
        type: "number",
        describe: "port to bind on",
        default: 3000,
      })
      .check(argv => {
        if (!Number.isInteger(argv.port)) {
          throw new Error("Argument check failed: port is not a valid number")
        }
        return true
      }),
  handler: asyncHandler(async argv => {
    await env.update(argv)
    await copyCmd(argv)
    await buildCmd()
  }),
}
const develop = {
  command: "develop",
  description: "Start the development server",
  builder: yargs =>
    yargs
      .option("port", {
        alias: "p",
        type: "number",
        describe: "port to bind on",
        default: 3000,
      })
      .check(argv => {
        if (!Number.isInteger(argv.port)) {
          throw new Error("Argument check failed: port is not a valid number")
        }
        return true
      }),
  handler: asyncHandler(async argv => {
    await env.update(argv)
    await copyCmd(argv)
    await developCmd(argv)
  }),
}

module.exports = {
  build,
  develop,
}
