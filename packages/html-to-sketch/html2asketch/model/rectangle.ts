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

class Rectangle extends Base {
  _class: any;
  _width: any;
  _height: any;
  _cornerRadius: any;
  _x: number;
  _y: number;

  constructor({
    width,
    height,
    cornerRadius = { topLeft: 0, bottomLeft: 0, topRight: 0, bottomRight: 0 },
    x,
    y,
    id,
  }: any) {
    super({ id });
    this._class = 'rectangle';
    this._width = width;
    this._height = height;
    this._cornerRadius = cornerRadius;
    this._x = x || 0;
    this._y = y || 0;
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

    obj.path = {
      _class: 'path',
      isClosed: true,
      pointRadiusBehaviour: 1,
    };

    obj.points = [
      {
        _class: 'curvePoint',
        cornerRadius: this._cornerRadius.topLeft,
        curveFrom: '{0, 0}',
        curveMode: 1,
        curveTo: '{0, 0}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: this._cornerRadius.topRight,
        curveFrom: '{1, 0}',
        curveMode: 1,
        curveTo: '{1, 0}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{1, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: this._cornerRadius.bottomRight,
        curveFrom: '{1, 1}',
        curveMode: 1,
        curveTo: '{1, 1}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{1, 1}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: this._cornerRadius.bottomLeft,
        curveFrom: '{0, 1}',
        curveMode: 1,
        curveTo: '{0, 1}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0, 1}',
      },
    ];

    obj.hasConvertedToNewRoundCorners = true;
    obj.fixedRadius = 0;
    obj.edited = false;
    obj.booleanOperation = -1;

    return obj;
  }
}

export default Rectangle;
