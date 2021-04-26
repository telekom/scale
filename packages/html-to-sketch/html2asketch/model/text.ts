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
import { RESIZING_CONSTRAINTS } from '../helpers/utils';

class Text extends Base {
  _x: any;
  _y: any;
  _width: any;
  _height: any;
  _text: any;
  _name: any;
  _style: any;
  _multiline: any;
  _attributedString: any;

  constructor({
    x,
    y,
    width,
    height,
    text,
    style,
    multiline,
    id,
    attributedString,
  }: any) {
    super({ id });
    this._class = 'text';
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._text = text;
    this._name = text;
    this._style = style;
    this._multiline = multiline;
    this._attributedString = attributedString;
    this.setResizingConstraint(RESIZING_CONSTRAINTS.HEIGHT);
  }

  toJSON() {
    const obj = super.toJSON();

    obj.frame = {
      _class: 'rect',
      constrainProportions: false,
      height: this._height,
      width: this._width,
      x: this._x,
      y: this._y,
    };

    obj.text = this._text;
    obj.style = this._style.toJSON();
    obj.attributedString = this._attributedString.toJSON();

    // text nodes don't have child layers
    delete obj.layers;

    obj.automaticallyDrawOnUnderlyingPath = false;
    obj.dontSynchroniseWithSymbol = false;
    obj.lineSpacingBehaviour = 2;
    // 1 - width is set to Fixed
    // 0 - width is set to Auto - this helps us avoid issues with browser setting too small width causing line to break
    obj.textBehaviour = this._multiline ? 1 : 0;

    return obj;
  }
}

export default Text;
