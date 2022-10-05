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

const fs = require('fs');

const documentName = process.argv[2];
if (!documentName) {
  console.log(`USAGE: diff-builds <documentName> [version_1] [version_2]`);
  process.exit(1);
}
const version1 = process.argv[3];
const version2 = process.argv[4];

const fileRE = new RegExp(`^${documentName}\\.\\d+\\.symbols\\.json$`);
var files = fs.readdirSync('./sketch').filter((f) => fileRE.test(f));
files.sort();

var file1 = files[files.length - 2];
var file2 = files[files.length - 1];

if (version1) {
  const v1re = new RegExp(`\\.${version1}\\.symbols\\.json$`);
  file1 = files.find((f) => v1re.test(f));
}

if (version2) {
  const v2re = new RegExp(`\\.${version2}\\.symbols\\.json$`);
  file2 = files.find((f) => v2re.test(f));
}

if (!file1) {
  console.error(
    `File not found: ${version1} - ${documentName}.${version1}.symbols.json`
  );
  process.exit(1);
}
if (!file2) {
  console.error(
    `File not found: ${version2} - ${documentName}.${version2}.symbols.json`
  );
  process.exit(1);
}

const doc1 = JSON.parse(fs.readFileSync('./sketch/' + file1));
const doc2 = JSON.parse(fs.readFileSync('./sketch/' + file2));

const ignoreSymbolRe =
  /^(overrideName|do_objectID|variantName|changeIdentifier|sharedStyleID)$/;
const ignoreIdNumRe = /(\#.*-)\d+/;

function compare(a, b, symbolPath, keyPath, changes) {
  if (a._class === 'symbolMaster') {
    symbolPath = a.name;
    keyPath = '';
  }
  if (symbolPath.startsWith('/Unnamed Components / icon-')) return;
  for (const key in a) {
    if (ignoreSymbolRe.test(key)) continue;
    if (typeof a[key] !== typeof b[key]) {
      changes.push({
        symbolPath,
        key: keyPath + '/' + key,
        old: a[key],
        new: b[key],
      });
    } else if (a[key] instanceof Array || typeof a[key] === 'object') {
      compare(a[key], b[key], symbolPath, keyPath + '/' + key, changes);
    } else if (a[key] !== b[key]) {
      // Ignore changes in auto-generated element ids.
      if (
        key === 'name' &&
        a[key].replace(ignoreIdNumRe, '$1') ===
          b[key].replace(ignoreIdNumRe, '$1')
      ) {
        continue;
      }
      changes.push({
        symbolPath,
        key: keyPath + '/' + key,
        old: a[key],
        new: b[key],
      });
    }
  }
  for (const key in b) {
    if (ignoreSymbolRe.test(key)) continue;
    if (typeof a[key] === undefined && b[key] !== undefined) {
      changes.push({
        symbolPath,
        key: keyPath + '/' + key,
        old: a[key],
        new: b[key],
      });
    }
  }
}

var changes = [];
compare(doc1, doc2, '', '', changes);
console.log(changes);
