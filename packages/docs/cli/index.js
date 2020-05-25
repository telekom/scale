#!/usr/bin/env node
const commands = require("./commands")

module.exports = yargs => {
  // register all commands
  Object.keys(commands).forEach(name => {
    const cmd = commands[name]
    yargs.command(cmd)
  })

  return yargs
    .option("verbose", {
      alias: "v",
      type: "boolean",
      description: "Run with verbose logging",
    })
    .option("config", {
      alias: "c",
      type: "string",
      description: "Path to the config file",
    })
    .demandCommand(1, "No command provided")
    .showHelpOnFail(true)
    .strict()
    .help()
}
