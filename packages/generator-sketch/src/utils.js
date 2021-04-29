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

function printSymbolStructure(symbol, indent = 0) {
  console.log(''.padStart(indent) + symbol.name);
  if (symbol.layers)
    symbol.layers.forEach((s) => printSymbolStructure(s, indent + 2));
}

function _findLayer(symbol, predicate, action) {
  if (predicate(symbol)) {
    if (action) action(symbol);
    return symbol;
  }
  if (symbol.layers) {
    for (let i = 0; i < symbol.layers.length; i++) {
      const result = _findLayer(symbol.layers[i], predicate, action);
      if (result) return result;
    }
  }
  return undefined;
}

function findLayer(symbol, predicate, action = undefined) {
  if (typeof predicate === 'string') {
    var str = predicate;
    predicate = (l) => l.name === str;
  } else if (predicate instanceof RegExp) {
    var re = predicate;
    predicate = (l) => re.test(l.name);
  }
  return _findLayer(symbol, predicate, action);
}

function _findLayers(symbol, predicate, action, results) {
  if (predicate(symbol)) {
    if (action) action(symbol);
    results.push(symbol);
  }
  if (symbol.layers) {
    for (let i = 0; i < symbol.layers.length; i++) {
      _findLayers(symbol.layers[i], predicate, action, results);
    }
  }
  return results;
}

function findLayers(symbol, predicate, action = undefined) {
  if (typeof predicate === 'string') {
    var str = predicate;
    predicate = (l) => l.name === str;
  } else if (predicate instanceof RegExp) {
    var re = predicate;
    predicate = (l) => re.test(l.name);
  }
  return _findLayers(symbol, predicate, action, []);
}

module.exports = {
  findLayer,
  findLayers,
  printSymbolStructure,
};
