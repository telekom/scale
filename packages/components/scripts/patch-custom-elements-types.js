/**
 * Post-build script: ensures the dist-custom-elements barrel
 * re-exports JSX types so that @stencil/react-output-target v1.5+
 * can import { JSX } from "@telekom/scale-components/dist/components".
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'dist', 'components', 'index.d.ts');
const reExport = `\nexport type { JSX } from '../types/components';\n`;

const content = fs.readFileSync(filePath, 'utf8');
if (!content.includes('export type { JSX }')) {
  fs.appendFileSync(filePath, reExport);
}
