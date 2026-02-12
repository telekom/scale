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

const path = require('path');
const fg = require('fast-glob');
const fs = require('fs-extra');
const SVGO = require('svgo');
const Handlebars = require('handlebars'); // using Handlebars for consistency with components-sketch

const { parse } = require('svg-parser');

const svgo = new SVGO({
  plugins: [
    { removeViewBox: false },
    { removeXMLNS: true },
    { cleanupIDs: false },
  ],
});

const INPUT_GLOB = process.env.WHITELABEL
  ? './src/icons/**/*.svg'
  : './src/telekom/icons/**/*.svg';
const OUTPUT_PATH = './src/components/icons';
const ICON_TEMPLATE_PATH = './scripts/icon-component.hbs';
const EXT = '.svg';

main();

/**
 * Main function to generate icon components.
 * @returns {Promise<void>}
 */
async function main() {
  const { toHtml } = await import('hast-util-to-html');

  /** Get SVG data from source files @type {string[]} */
  const entries = await fg(INPUT_GLOB);

  /**
   * @typedef {object} SVGFile
   * @property {string} data
   * @property {string} filepath
   * @property {string} key
   * @property {string} category
   * @property {string} name
   * @property {string} state
   */

  /** @type {SVGFile[]} */
  const files = await Promise.all(
    entries.map(async (filepath) => {
      const file = await fs.readFile(filepath, { encoding: 'utf-8' });
      const item = await svgo.optimize(file);

      const state = path.basename(filepath, EXT);
      const cleanPath = path
        .dirname(filepath)
        .replace(INPUT_GLOB.replace('**/*.svg', ''), '');
      const pathParts = cleanPath.split('/');
      const key = nolo(cleanPath.replace(/\//gi, '-'));
      const category = nolo(pathParts[0]);
      const name = nolo(pathParts[pathParts.length - 1]);

      return {
        ...item,
        filepath,
        key,
        category,
        name,
        state,
      };
    })
  );

  /**
   * Replaces underscores with hyphens in a string.
   * @param {string} str
   * @returns {string}
   */
  function nolo(str) {
    return str.replace(/_/g, '-');
  }

  /**
   * Converts a string to camelCase.
   * @param {string} str
   * @returns {string}
   */
  function camelCase(str) {
    return str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
  }

  /**
   * Converts the first character of a string to uppercase.
   * @param {string} str
   * @returns {string}
   */
  function upperFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Groups an array of objects by a common property.
   * @template T
   * @param {T[]} array
   * @param {keyof T} key
   * @returns {Record<string, T[]>}
   */
  function groupBy(array, key) {
    return array.reduce((acc, obj) => {
      const value = obj[key];
      if (!acc[value]) {
        acc[value] = [];
      }
      acc[value].push(obj);
      return acc;
    }, {});
  }

  /**
   * Transforms an object's values using a mapping function.
   * @template T, U
   * @param {Record<string, T>} obj
   * @param {(value: T, key: string) => U} mapper
   * @returns {U[]}
   */
  function map(obj, mapper) {
    return Object.keys(obj).map((key) => mapper(obj[key], key));
  }

  /**
   * Finds an element in an array based on a predicate.
   * @template T
   * @param {T[]} array
   * @param {Partial<T>} predicate
   * @returns {T | undefined}
   */
  function find(array, predicate) {
    const keys = Object.keys(predicate);
    return array.find((item) =>
      keys.every((key) => item[key] === predicate[key])
    );
  }

  /**
   * Converts a string to start case.
   * @param {string} str
   * @returns {string}
   */
  function startCase(str) {
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
  }

  /** @type {Record<string, SVGFile[]>} */
  const groupedByState = groupBy(files, 'key');

  /**
   * @typedef {object} IconComponent
   * @property {string} key
   * @property {string} tagName
   * @property {string} className
   * @property {{ default: string; selected: string }} markup
   * @property {string} viewBox
   */

  /** @type {IconComponent[]} */
  const components = map(groupedByState, (item, key) => {
    const defaultItem = find(item, { state: 'default' });
    let selectedItem = find(item, { state: 'selected' });
    const tagName = 'scale-icon-' + key;
    const className = upperFirst(camelCase(key));

    if (selectedItem == null) {
      selectedItem = defaultItem;
      console.log(`Warning: icon with name '${key}' has no selected state`);
    }

    return {
      key,
      tagName,
      className,
      markup: {
        default: JSXify(toHtml(adaptTree(parse(defaultItem.data)))),
        selected: JSXify(toHtml(adaptTree(parse(selectedItem.data)))),
      },
      viewBox: getViewBox(parse(defaultItem.data)),
    };
  });

  /**
   * Converts HTML attributes to JSX attributes.
   * @param {string} html
   * @returns {string}
   */
  function JSXify(html) {
    return html.replace(/xlink:href/g, 'xlinkHref');
  }

  /**
   * Generate an "index" JSON file
   * @typedef {object} CategoryIndex
   * @property {string} label
   * @property {string} category
   * @property {string[]} items
   */

  /** @type {Record<string, SVGFile[]>} */
  const groupedByCategory = groupBy(files, 'category');
  /** @type {CategoryIndex[]} */
  const indexByCategory = [];

  Object.keys(groupedByCategory)
    .sort()
    .forEach((key) => {
      indexByCategory.push({
        label: startCase(key),
        category: key,
        items: groupedByCategory[key]
          .filter((x) => x.state === 'default')
          .map((x) => x.name),
      });
    });

  /* The "iconset" feature (sets) is commented out for now as we don't see any use in it. */

  /* const groupedByCategory = groupBy(files, 'category');

  const sets = map(groupedByCategory, (item, category) => {
    const tagName = 'scale-iconset-' + category;
    const className = 'Iconset' + upperFirst(camelCase(category));
    const defs = item.map((x) => {
      return {
        // append state to the name if not `default`
        key: x.state !== 'default' ? `${x.key}-${x.state}` : x.key,
        markup: toHTML(adaptTree(parse(x.data))),
      };
    });

    return {
      key: 'set-' + category,
      tagName,
      className,
      defs,
    };
  });
  sets.push({
    key: 'set-all',
    tagName: 'scale-iconset-all',
    className: 'IconsetAll',
    defs: flatMap(sets, 'defs'),
  }); */

  // HAST https://github.com/syntax-tree/hast
  /**
   * Extracts the viewBox attribute from an SVG tree.
   * @param {import('svg-parser').Node} tree
   * @returns {string}
   */
  function getViewBox(tree) {
    return tree.children[0].properties.viewBox || '0 0 24 24';
  }

  /**
   * Adapts the SVG tree by removing `fill` attributes.
   * @param {import('svg-parser').Node} tree
   * @returns {import('svg-parser').Node}
   */
  function adaptTree(tree) {
    // skip <svg> root
    const { children } = tree.children[0];
    /**
     * Removes `fill` attribute from a node if it's a path and not 'none'.
     * @param {import('svg-parser').Node} node
     * @returns {import('svg-parser').Node}
     */
    const removeFillAttr = (node) => {
      if (
        node.tagName === 'path' &&
        node.properties.fill != null &&
        node.properties.fill !== 'none'
      ) {
        delete node.properties.fill;
      }
      return node;
    };

    return {
      type: 'root',
      children: children.map(removeFillAttr),
    };
  }

  /* Get component templates */

  const iconTemplateText = fs.readFileSync(ICON_TEMPLATE_PATH, {
    encoding: 'utf-8',
  });
  const templateIcon = Handlebars.compile(iconTemplateText);
  /* const setTemplateText = fs.readFileSync(SET_TEMPLATE_PATH, {
    encoding: 'utf-8',
  });
  const templateSet = Handlebars.compile(setTemplateText); */

  /* Render and write files */

  try {
    await fs.emptyDir(OUTPUT_PATH);
    // Create dir for each component, render template into new file
    await Promise.all(
      components.map(async (component) => {
        const dir = path.join(OUTPUT_PATH, component.key);
        await fs.mkdirp(dir);
        return fs.writeFile(
          path.join(dir, component.key + '.tsx'),
          templateIcon(component)
        );
      })
    );
    // Create index.json file, useful for documentation
    await fs.writeFile(
      path.join(OUTPUT_PATH, './', 'scale-icons.json'),
      JSON.stringify(indexByCategory, null, 2)
    );
    // The same for sets
    /* await Promise.all(
      sets.map(async (set) => {
        const dir = path.join(OUTPUT_PATH, set.key);
        await fs.mkdirp(dir);
        return fs.writeFile(path.join(dir, set.key + '.tsx'), templateSet(set));
      })
    ); */
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
