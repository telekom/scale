#!/usr/bin/env node

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

import { join } from 'path';
import fs from 'fs-extra';
import each from 'lodash/each.js';

import { outputCSS } from './output-css.js';
import { outputJSS } from './output-jss.js';

const isWhitelabel = !!process.env.WHITELABEL;
const DEFAULT_FILENAME = `design-tokens${isWhitelabel ? '' : '-telekom'}`;
const OUTPUT_PATH = './dist';

main();

async function main() {
  const { default: getTokens } = await import(
    isWhitelabel ? '../src/tokens.js' : '../src/telekom/tokens.js'
  );

  const tokens = getTokens();
  await fs.emptyDir(OUTPUT_PATH);
  await fs.mkdirp(OUTPUT_PATH);

  const outputs = [outputCSS, outputJSS];

  try {
    // Loop through categories (level 1)
    each(tokens, (section, categoryName) => {
      outputs.forEach(({ onCategory }) => {
        onCategory({ categoryName, tokens });
      });

      // Loop through sections (level 2)
      each(section, (values, sectionName) => {
        if (values == null) {
          return;
        }

        outputs.forEach(({ onSection }) => {
          onSection({ categoryName, sectionName, tokens });
        });

        // Loop through values (level 3)
        each(values, (value, key) => {
          outputs.forEach(({ onValue }) => {
            onValue({ categoryName, sectionName, key, value, tokens });
          });
        });
      });
    });

    outputs.forEach(({ onComplete }) => onComplete());

    // Write a file for each output
    await Promise.all(outputs.map(write));

    async function write({
      filename = DEFAULT_FILENAME,
      ext = '',
      suffix = '',
      content,
    }) {
      await fs.writeFile(
        join(OUTPUT_PATH, `${filename}${suffix}${ext}`),
        content
      );
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
