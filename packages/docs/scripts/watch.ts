const chokidar = require('chokidar');
const shell = require('child_process').execSync;
import { handleFile } from './markdown-to-html';

// TODO: This is the 'watch' mode, sync dist folder after `build` command is executed
const docs = `./src/docs`;

const watcher = chokidar.watch(docs, { ignored: /^\./, persistent: true });

function markdownToHtml(mode: string, fileName: string) {
	console.log(`${mode} detected`);
	console.log(`${fileName} detected`);
	shell(`node ./scripts/site-structure.js`);
	handleFile(fileName);
}

watcher
	// .on('add', (fileName: string) => markdownToHtml('add', fileName))
	.on('change', (fileName: string) => markdownToHtml('change', fileName))
	// .on('remove', (fileName: string) => markdownToHtml('remove', fileName))
	.on('error', (fileName) => console.log('error', fileName))
