const logger = {
  verbose(argv, ...args) {
    if (argv.verbose) {
      console.debug(...["[CLI]", ...args])
    }
  },
  output(...args) {
    console.log(...args)
  },
  error(...args) {
    console.error(...args)
  },
}

module.exports = {
  logger,
}
