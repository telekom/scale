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

import postcss from 'postcss';
import map from 'lodash/map.js';
import kebabCase from 'lodash/kebabCase.js';
import {
  NAMESPACE_PREFIX,
  SPACING,
  TYPOGRAPHY,
  TYPE_VARIANT,
  COLOR,
  SHADOW,
  RADIUS,
  MOTION,
} from '../src/tokens.js';

const pxToRem = x => `${x / 16}rem`;
const pctToUnitless = x => `${parseFloat(x, 10) / 100}`;
const px = x => `${x}px`;
const ms = x => `${x}ms`;

const fontKeyPropMap = {
  family: 'font-family',
  size: 'font-size',
  weight: 'font-weight',
  lineHeight: 'line-height',
  letterSpacing: 'letter-spacing',
};

const rootSelector = postcss.rule({ selector: ':root' });
const variantComment = postcss.comment({ text: 'FONT VARIANT CLASSES' });
const variantSelectors = [];

export const outputCSS = {
  onCategory: ({ categoryName }) => {
    rootSelector.append(postcss.comment({ text: categoryName.toUpperCase() }));
  },
  onSection: ({ categoryName, sectionName, tokens }) => {
    // Create classes for type variants
    if (categoryName === TYPE_VARIANT) {
      const path = [categoryName, sectionName];
      const values = tokens[categoryName][sectionName];
      const selector = postcss.rule({
        selector: `.scl-font-variant-${kebabCase(sectionName)}`,
      });
      const declarations = getFontVariantDeclarations(path, values);
      selector.append(declarations);
      variantSelectors.push(selector);
    }
  },
  onValue: ({ categoryName, sectionName, key, value }) => {
    const path = [categoryName, sectionName];
    const declaration = getDeclaration(path, key, value);
    rootSelector.append(declaration);
  },
  onComplete: () => {
    outputCSS.content = postcss
      .root()
      .append([rootSelector, variantComment, ...variantSelectors])
      .toString();
  },
  ext: '.css',
  suffix: '',
  content: null,
};

/**
 * @typedef {Object} Declaration - A CSS declaration for postcss
 * @prop {string} prop
 * @prop {string|number} value
 */

/**
 * @param {array} path
 * @param {string} key
 * @param {any} val
 * @returns {Declaration}
 */
function getDeclaration(path, key, val) {
  const pathString = path
    .filter(x => x !== 'DEFAULT')
    .map(kebabCase)
    .join('-');

  return postcss.decl({
    prop: `--${NAMESPACE_PREFIX}-${pathString}-${kebabCase(key)}`,
    value: processValue(path, key, val),
  });
}

/**
 * @param {array} path
 * @param {Object} values
 * @returns {Declaration[]}
 */
function getFontVariantDeclarations(path, values) {
  return map(values, (value, key) => {
    const { prop: variableName, value: actualValue } = getDeclaration(
      path,
      key,
      value
    );
    return postcss.decl({
      prop: fontKeyPropMap[key],
      value: `var(${variableName}, ${actualValue})`,
    });
  });
}

/**
 * Transform a raw value into a CSS value.
 *
 * @param {string[]} path - [{category}, {section}] e.g. ['spacing', 'size']
 * @param {string} key
 * @param {any} val
 * @returns {string|number}
 */
export function processValue(path, key, val) {
  if (val == null) {
    return '';
  }
  const [categoryName, sectionName] = path;

  if (categoryName === SPACING) {
    return pxToRem(val);
  }

  if (categoryName === TYPOGRAPHY || categoryName === TYPE_VARIANT) {
    const nameOrKey = categoryName === TYPOGRAPHY ? sectionName : key;
    switch (nameOrKey) {
      case 'size':
        return pxToRem(val);
      case 'leading':
        return pctToUnitless(val);
      default:
        return val;
    }
  }

  if (categoryName === COLOR) {
    return val.hsl();
  }

  if (categoryName === SHADOW) {
    return Array.from(val)
      .map(({ x, y, blur, spread, color }) => {
        return `${px(x)} ${px(y)} ${px(blur)} ${px(spread)} ${color}`;
      })
      .join(', ');
  }

  if (categoryName === RADIUS) {
    return px(val);
  }

  if (categoryName === MOTION) {
    return sectionName === 'duration' ? ms(val) : val;
  }

  return val;
}
