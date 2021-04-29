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

class SymbolInstance extends Base {
  _class: any;
  _x: any;
  _y: any;
  _width: any;
  _height: any;
  _symbolID: any;

  constructor({ x, y, width, height, symbolID, id }: any) {
    super({ id });
    this._class = 'symbolInstance';
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._symbolID = symbolID;
  }

  setId(id: any) {
    this._symbolID = id;
  }

  toJSON() {
    const obj: any = super.toJSON();

    obj.frame = {
      _class: 'rect',
      constrainProportions: false,
      width: this._width,
      height: this._height,
      x: this._x,
      y: this._y,
    };

    obj.style = {
      _class: 'style',
      endDecorationType: 0,
      miterLimit: 10,
      startDecorationType: 0,
    };

    obj.symbolID = this._symbolID;

    return obj;
  }
}

export default SymbolInstance;
