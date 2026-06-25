/**
 * Post-build script: ensures the dist-custom-elements barrel
 * re-exports the JSX and Components types so that
 * @stencil/react-output-target v1.5+ can import them from
 * "@telekom/scale-components/dist/components".
 *
 * Without the `Components` re-export, the generated React wrappers
 * import an undefined member, which (under `skipLibCheck`) silently
 * resolves to `any` and strips the TypeScript types from every prop.
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'dist', 'components', 'index.d.ts');
const reExports = [
  `export type { JSX } from '../types/components';`,
  `export type { Components } from '../types/components';`,
];

let content = fs.readFileSync(filePath, 'utf8');
for (const reExport of reExports) {
  if (!content.includes(reExport)) {
    content += `\n${reExport}\n`;
  }
}
fs.writeFileSync(filePath, content);
