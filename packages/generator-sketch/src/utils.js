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

const Resize = {
  NONE: 0,
  TOP_LEFT_FIXED_SIZE: 9,
  TOP_LEFT_RIGHT_FIXED_HEIGHT: 10,
  TOP_LEFT_FIXED_HEIGHT: 11,
  TOP_RIGHT_FIXED_SIZE: 12,

  TOP_RIGHT_FIXED_HEIGHT: 14,

  FILL_SPACE: 18,
  BOTTOM_LEFT_RIGHT_FIXED_HEIGHT: 34,

  RIGHT_FIXED_SIZE: 44,
  FIXED_SIZE: 45,

  FIXED_HEIGHT: 47,
  FIXED_WIDTH: 61,

  LEFT_RIGHT: 58,
  LEFT: 59,
};

function setResizingConstraints(symbol, ...predicateActionPairs) {
  for (var i = 0; i < predicateActionPairs.length; i += 2) {
    const predicate = predicateActionPairs[i];
    const action = predicateActionPairs[i + 1];
    if (typeof action === 'function') {
      findLayers(symbol, predicateActionPairs[i], action);
    } else {
      findLayers(
        symbol,
        predicateActionPairs[i],
        (l) => (l.resizingConstraint = action)
      );
    }
  }
}

const searchObject = function (
  object,
  matchCallback,
  currentPath,
  result,
  searched
) {
  currentPath = currentPath || '';
  result = result || [];
  searched = searched || [];
  if (searched.indexOf(object) !== -1 && object === Object(object)) {
    return;
  }
  searched.push(object);
  if (matchCallback(object)) {
    result.push({ path: currentPath, value: object });
  }
  try {
    if (object === Object(object)) {
      for (var property in object) {
        if (property.indexOf('$') !== 0) {
          searchObject(
            object[property],
            matchCallback,
            currentPath + '.' + property,
            result,
            searched
          );
        }
      }
    }
  } catch (e) {
    console.log(object);
    throw e;
  }
  return result;
};

module.exports = {
  findLayer,
  findLayers,
  searchObject,
  printSymbolStructure,
  setResizingConstraints,
  Resize,
};
