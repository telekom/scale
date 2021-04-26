/**
 * @license
 * Scale https://github.com/telekom/scale
 *
 * Copyright (c) 2021 Egor Kirpichev and contributors, Deutsche Telekom AG
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const cp = require('child_process');
const fs = require('fs');
const { SIGKILL } = require('constants');

// Starts the components-sketch server
console.log('Starting dev server');
const cwd = process.cwd();
process.chdir('../components-sketch');
const server = cp.execFile('node', ['app.js']);
process.chdir(cwd);
setTimeout(() => {
  console.log('Scraping component page links');
  const urls = cp.execSync('sh scrape.sh').toString().trim().split('\n');
  console.log('Got URLs', urls);
  console.log('Generating Sketch document');
  cp.execFileSync(
    'yarn',
    ['sketch', 'scale-components-telekom', ...process.argv.slice(2), ...urls],
    { stdio: [0, 1, 2] }
  );
  const latestDiff = cp.execFileSync('yarn', [
    'diff',
    'scale-components-telekom',
  ]);
  fs.appendFileSync('ChangeLog', '\n' + latestDiff.toString());
  server.kill(SIGKILL);
}, 1000);
