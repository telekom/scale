const chokidar = require('chokidar');
const shell = require('child_process').execSync;

// TODO: This is the 'watch' mode, sync dist folder after `build` command is executed
const docs = `./src/docs`;

const watcher = chokidar.watch(docs, { ignored: /^\./, persistent: true });

function markdownToHtml(mode) {
	console.log(`${mode} detected`)
	shell(`node ./scripts/markdown-to-html`);
}

watcher
	.on('add', () => markdownToHtml('add'))
	.on('change', () => markdownToHtml('change'))
	.on('remove', () => markdownToHtml('remove'))
	.on('error', (fileName) => console.log('error', fileName))
