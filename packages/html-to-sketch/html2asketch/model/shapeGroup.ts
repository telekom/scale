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

class ShapeGroup extends Base {
  _class: any;
  _width: any;
  _height: any;
  _x: any;
  _y: any;

  constructor({ x, y, width, height, id }: any) {
    super({ id });
    this._class = 'shapeGroup';
    this._width = width;
    this._height = height;
    this.setPosition({ x, y });
  }

  setPosition({ x, y }: any) {
    this._x = x;
    this._y = y;
  }

  toJSON() {
    const obj: any = super.toJSON();

    obj.frame = {
      _class: 'rect',
      constrainProportions: false,
      height: this._height,
      width: this._width,
      x: this._x,
      y: this._y,
    };

    obj.hasClickThrough = false;
    obj.windingRule = 1;

    return obj;
  }
}

export default ShapeGroup;
