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

import { generateID, makeColorFromCSS } from '../helpers/utils';

function pageToPageReference(page: any) {
  return {
    _class: 'MSJSONFileReference',
    _ref_class: 'MSImmutablePage',
    _ref: `pages/${page.getID()}`,
  };
}

function layerToSharedStyle(layer: any, id: any) {
  return {
    _class: 'sharedStyle',
    do_objectID: id || generateID(),
    name: layer._name,
    style: layer._style.toJSON(),
  };
}

class Document {
  _objectID: any;
  _colors: any;
  _textStyles: any;
  _layerStyles: any;
  _pages: any;
  _name: any;

  constructor() {
    this._objectID = generateID();
    this._colors = [];
    this._textStyles = [];
    this._layerStyles = [];
    this._pages = [];
  }

  setName(name: any) {
    this._name = name;
  }

  setObjectID(id: any) {
    this._objectID = id;
  }

  addPage(page: any) {
    this._pages.push(page);
  }

  addTextStyle(textLayer: any, id: any) {
    this._textStyles.push(layerToSharedStyle(textLayer, id));
  }

  addLayerStyle(layer: any, id: any) {
    this._layerStyles.push(layerToSharedStyle(layer, id));
  }

  addColor(color: any) {
    this._colors.push(makeColorFromCSS(color));
  }

  toJSON() {
    return {
      _class: 'document',
      do_objectID: this._objectID,
      assets: {
        _class: 'assetCollection',
        colors: this._colors,
      },
      currentPageIndex: 0,
      enableLayerInteraction: true,
      enableSliceInteraction: true,
      foreignSymbols: [],
      layerStyles: {
        _class: 'sharedStyleContainer',
        objects: this._layerStyles,
      },
      layerSymbols: {
        _class: 'symbolContainer',
        objects: [],
      },
      layerTextStyles: {
        _class: 'sharedTextStyleContainer',
        objects: this._textStyles,
      },
      pages: this._pages.map(pageToPageReference),
    };
  }
}

export default Document;
