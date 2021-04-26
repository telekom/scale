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

import Base from './base';

class SVG extends Base {
  _rawSVGString: any;
  _width: any;
  _height: any;
  _x: any;
  _y: any;

  constructor({ x, y, width, height, rawSVGString, id }: any) {
    super({ id });
    this._rawSVGString = rawSVGString;
    this._width = width;
    this._height = height;
    this._x = x;
    this._y = y;
  }

  toJSON() {
    // NOTE: this is a non-standard extension of the .sketch format
    return {
      _class: 'svg',
      rawSVGString: this._rawSVGString,
      width: this._width,
      height: this._height,
      x: this._x,
      y: this._y,
      resizingConstraint: this._resizingConstraint,
      hasClippingMask: this._hasClippingMask,
    };
  }
}

export default SVG;
