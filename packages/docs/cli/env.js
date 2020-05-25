const findUserConfig = require('./find-user-config');

// Update process environments variables based on cli options/arguments
// and set defaults values for the rest.
// The env variables are used by server and server configuration modules.
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
