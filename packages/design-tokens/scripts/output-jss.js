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

import camelCase from 'lodash/camelCase.js';
import prettier from 'prettier';
import { COLOR, SHADOW, TYPE_VARIANT } from '../src/tokens.js';
import { processValue } from './output-css.js';

const prettierOptions = {
  singleQuote: true,
  trailingComma: 'es5',
};
const fontKeyPropMap = {
  family: 'fontFamily',
  size: 'fontSize',
  weight: 'fontWeight',
  lineHeight: 'lineHeight',
  letterSpacing: 'letterSpacing',
};

const JSS = {};

export const outputJSS = {
  onCategory: ({ categoryName }) => {
    JSS[camelCase(categoryName)] = {};
  },
  onSection: ({ categoryName, sectionName }) => {
    if (sectionName !== 'DEFAULT') {
      JSS[camelCase(categoryName)][camelCase(sectionName)] = {};
    }
  },
  onValue: ({ categoryName, sectionName, key, value }) => {
    const camelCasedKey = camelCase(key);
    const val = processValue([categoryName, sectionName], key, value);
    const section =
      sectionName === 'DEFAULT'
        ? JSS[camelCase(categoryName)]
        : JSS[camelCase(categoryName)][camelCase(sectionName)];

    if (categoryName === COLOR) {
      section[camelCasedKey] = val.hsl().toString();
      return;
    }
    if (categoryName === TYPE_VARIANT) {
      section[fontKeyPropMap[key]] = val;
      return;
    }
    // Special shape for shadows
    if (categoryName === SHADOW) {
      if (key.length === 1) {
        section[camelCasedKey] = section[camelCasedKey] || {};
        section[camelCasedKey].standard = val;
      } else {
        const intKey = camelCasedKey.charAt(0);
        const state = camelCasedKey.slice(1).toLowerCase();
        section[intKey] = section[intKey] || {};
        section[intKey][state] = val;
      }
      return;
    }
    section[camelCasedKey] = val;
  },
  onComplete: () => {
    let output = '';
    for (const [name, props] of Object.entries(JSS)) {
      output = output.concat(
        `\n\nexport const ${name} = ${JSON.stringify(props)};`
      );
    }
    outputJSS.content = prettier.format(output, prettierOptions);
  },
  filename: `design-tokens${process.env.WHITELABEL ? '' : '-telekom'}`,
  ext: '.js',
  suffix: '',
  content: null,
};
