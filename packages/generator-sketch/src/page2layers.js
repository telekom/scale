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

import { nodeTreeToSketchPage } from '@telekom/scale-html-to-sketch';

export function run(mainNode = document.body) {
  const artboards = Array.from(
    mainNode.querySelectorAll('*[data-sketch-artboard]')
  );
  if (artboards.length === 0) {
    artboards.push(mainNode);
  }
  if (typeof window.onBeforePage2Layers === 'function')
    window.onBeforePage2Layers();
  var res = {
    name: document.title,
    artboards: artboards.map((mainNode) => {
      const artboard = nodeTreeToSketchPage(mainNode);
      artboard.setName(mainNode.dataset.sketchArtboard || document.title);
      artboard._x = mainNode.getBoundingClientRect().left;
      artboard._y = mainNode.getBoundingClientRect().top;
      artboard._layers
        .splice(0)
        .forEach((v) => v._layers.forEach((l) => artboard._layers.push(l)));
      return artboard.toJSON();
    }),
  };
  if (document.title === 'Tab-nav' || document.title === 'Sidebar-nav') {
    res = {
      name: document.title,
      artboards: artboards.map((mainNode) => {
        const artboard = nodeTreeToSketchPage(mainNode);
        artboard.setName(mainNode.dataset.sketchArtboard || document.title);
        artboard._x = mainNode.getBoundingClientRect().left;
        artboard._y = mainNode.getBoundingClientRect().top;
        artboard._layers
          .splice(0)
          .forEach((v) => v._layers.forEach((l) => artboard._layers.push(l)));
        return artboard.toJSON();
      }),
    };
  }
  return res;
}
