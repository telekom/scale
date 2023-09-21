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
const {
  // kebabCase,
  camelCase,
  startCase,
  upperFirst,
  groupBy,
  map,
  find,
  // flatMap,
} = require('lodash');
const Handlebars = require('handlebars'); // using Handlebars for consistency with components-sketch

const { parse } = require('svg-parser');
// const toHTML = require('hast-util-to-html');

const svgo = new SVGO({
  plugins: [{ removeViewBox: false }, { removeXMLNS: true }, {cleanupIDs: false}],
});

const INPUT_GLOB = process.env.WHITELABEL
  ? './src/icons/**/*.svg'
  : './src/telekom/icons/**/*.svg';
const OUTPUT_PATH = './src/components/icons';
const ICON_TEMPLATE_PATH = './scripts/icon-component.hbs';
// const SET_TEMPLATE_PATH = './scripts/set.hbs';
const EXT = '.svg';

main();

async function main() {
  const { toHtml } = await import('hast-util-to-html');

  /* Get SVG data from source files */

  const entries = await fg(INPUT_GLOB);

  /* Read file, optimized svg, extract "state" (default or selected) */

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

  /* Replace low dashes with normal dashes */
  function nolo(str) {
    return str.replace(/_/g, '-');
  }

  /* Parse, define names and markup */

  const groupedByState = groupBy(files, 'key');

  const components = map(groupedByState, (item, key) => {
    const defaultItem = find(item, { state: 'default' });
    let selectedItem = find(item, { state: 'selected' });
    const tagName = 'scale-icon-' + key;
    const className = upperFirst(camelCase(key));

    // Fallback to default when no `selected` is found
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

  function JSXify(html) {
    if (html.indexOf('xlink:href')) {
      return html.replace(/xlink:href/g, 'xlinkHref');
    }
    return html;
  }

  /* Generate an "index" JSON file */

  const groupedByCategory = groupBy(files, 'category');
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
  function getViewBox(tree) {
    return tree.children[0].properties.viewBox || '0 0 24 24';
  }
  function adaptTree(tree) {
    // skip <svg> root
    const { children } = tree.children[0];
    // remove `fill` attributes
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
