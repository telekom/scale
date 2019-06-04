import * as fs from 'fs';
import { button } from './button';
import { alert } from './alert';
import { card } from './card';

const destination = './dist';

const files = {
	button,
	alert,
	card
}

console.log('Writing css files')
console.log('-----------------')
Object.keys(files).forEach(file => {
	const filePath = `${destination}/${file}.css`;
	console.log('write file: ', filePath)
	fs.writeFileSync(filePath, files[file], 'utf8');
});
console.log('-----------------')
console.log('Done writing css files')
