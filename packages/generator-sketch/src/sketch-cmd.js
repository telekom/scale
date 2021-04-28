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

const ChildProcess = require('child_process');

if (process.argv.includes('--help')) {
  console.log('USAGE: yarn sketch [document-name] [list of URLs]');
  process.exit(0);
}

if (process.argv[2]) {
  ChildProcess.spawnSync(`yarn`, ['inject', ...process.argv.slice(3)], {
    stdio: [0, 1, 2],
  });
} else {
  ChildProcess.spawnSync(`yarn`, ['inject'], { stdio: [0, 1, 2] });
}

ChildProcess.spawnSync(`yarn`, ['sketch.json', ...process.argv.slice(2, 3)], {
  stdio: [0, 1, 2],
});
