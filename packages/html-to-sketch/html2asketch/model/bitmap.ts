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
import { generateID } from '../helpers/utils';

class Bitmap extends Base {
  _class: any;
  _url: any;
  _x: any;
  _y: any;
  _width: any;
  _height: any;

  constructor({ url, x, y, width, height, id }: any) {
    super({ id });
    this._class = 'bitmap';
    this._url = url;
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
  }

  toJSON() {
    const obj = super.toJSON();

    obj.frame = {
      _class: 'rect',
      constrainProportions: false,
      x: this._x,
      y: this._y,
      height: this._height,
      width: this._width,
    };

    obj.image = {
      _class: 'MSJSONOriginalDataReference',
      _ref_class: 'MSImageData',
      _ref: `images/${generateID()}`,
      url: this._url,
    };

    return obj;
  }
}

export default Bitmap;
