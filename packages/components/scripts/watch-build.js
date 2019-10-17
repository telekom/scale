var chokidar = require('chokidar');
const shell = require('child_process').execSync;

// TODO: This is the 'watch' mode, sync dist folder after `build` command is executed
const build= `./www/build`;
const dist= `./docs/dist`;

var watcher = chokidar.watch(build, {ignored: /^\./, persistent: true});

// TODO: optimise so only affected files are copied, currently
// on every file change the whole folder ist being copied
function copyDistFolder(action, fileName) {
  console.log(action, fileName)
	shell(`mkdir -p ${dist}`);
	shell(`cp -r ${build}/* ${dist}`);
}

watcher
  .on('add', (fileName) => copyDistFolder('add', fileName))
  .on('change', (fileName) => copyDistFolder('change', fileName))
  .on('remove', (fileName) => copyDistFolder('remove', fileName))
  .on('error', (fileName) => console.log('error', fileName))
