const findUserConfig = require('./find-user-config');

const update = async argv => {
  process.env = {
    ...process.env,
    ...{
      CWD: process.cwd(),
      PORT: argv.port,
      MONUMENT_CONFIG_FILE: await findUserConfig(argv),
    },
  };
};

module.exports = {
  update,
};
