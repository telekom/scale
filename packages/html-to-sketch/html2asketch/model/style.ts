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

import {
  makeImageFill,
  makeColorFromCSS,
  makeColorFill,
} from '../helpers/utils';
import convertAngleToFromAndTo from '../helpers/convertAngleToFromAndTo';

class Style {
  _fills: any;
  _borders: any;
  _shadows: any;
  _innerShadows: any;
  _opacity: any;
  _borderOptions: any;
  _miterLimit: number = 10;
  _windingRule: number = 0;

  constructor() {
    this._fills = [];
    this._borders = [];
    this._shadows = [];
    this._innerShadows = [];
    this._opacity = '1';
  }

  addColorFill(color: any, alpha: number = 1) {
    this._fills.push(makeColorFill(color, alpha));
  }

  addGradientFill({ angle, stops }: any) {
    const { from, to } = convertAngleToFromAndTo(angle);

    this._fills.push({
      _class: 'fill',
      isEnabled: true,
      fillType: 1,
      gradient: {
        _class: 'gradient',
        ellipseLength: 0,
        from: `{${from.x}, ${from.y}}`,
        gradientType: 0,
        shouldSmoothenOpacity: false,
        stops: stops.map((color: any, index: any) => {
          return {
            _class: 'gradientStop',
            color: makeColorFromCSS(color),
            position: index,
          };
        }),
        to: `{${to.x}, ${to.y}}`,
      },
      noiseIndex: 0,
      noiseIntensity: 0,
      patternFillType: 1,
      patternTileScale: 1,
    });
  }

  addSVGGradientFill(fill: any, alpha: number = 1) {
    this._fills.push({
      _class: 'fill',
      isEnabled: true,
      fillType: 1,
      gradient: {
        _class: 'gradient',
        ellipseLength: 0,
        from: `{${fill.gradient.from.x}, ${fill.gradient.from.y}}`,
        gradientType: fill.gradient.gradientType,
        shouldSmoothenOpacity: false,
        stops: fill.gradient.stops.map(
          ({ color, position }: { color: string; position: number }) => {
            return {
              _class: 'gradientStop',
              color: makeColorFromCSS(color, alpha),
              position,
            };
          }
        ),
        to: `{${fill.gradient.to.x}, ${fill.gradient.to.y}}`,
      },
      noiseIndex: 0,
      noiseIntensity: 0,
      patternFillType: 1,
      patternTileScale: 1,
    });
  }

  addImageFill(image: any) {
    const fill = makeImageFill(image);

    this._fills.push(fill);
  }

  addBorder({
    color,
    thickness,
    alpha,
    position,
  }: {
    color: any;
    thickness: number;
    alpha?: number;
    position?: number;
  }) {
    position = position || 1;
    this._borders.push({
      _class: 'border',
      isEnabled: true,
      color: makeColorFromCSS(color, alpha),
      fillType: 0,
      position,
      thickness,
    });
  }

  addShadow({
    color = '#000',
    blur = 1,
    offsetX = 0,
    offsetY = 0,
    spread = 0,
  }: any) {
    this._shadows.push({
      _class: 'shadow',
      isEnabled: true,
      blurRadius: blur,
      color: makeColorFromCSS(color),
      contextSettings: {
        _class: 'graphicsContextSettings',
        blendMode: 0,
        opacity: 1,
      },
      offsetX,
      offsetY,
      spread,
    });
  }

  addInnerShadow({
    color = '#000',
    blur = 0,
    offsetX = 0,
    offsetY = 0,
    spread = 0,
  }: any) {
    this._innerShadows.push({
      _class: 'innerShadow',
      isEnabled: true,
      blurRadius: blur,
      color: makeColorFromCSS(color),
      contextSettings: {
        _class: 'graphicsContextSettings',
        blendMode: 0,
        opacity: 1,
      },
      offsetX,
      offsetY,
      spread,
    });
  }

  addOpacity(opacity: any) {
    this._opacity = opacity;
  }

  toJSON() {
    return {
      _class: 'style',
      fills: this._fills,
      borders: this._borders,
      borderOptions: this._borderOptions,
      shadows: this._shadows,
      innerShadows: this._innerShadows,
      endDecorationType: 0,
      miterLimit: this._miterLimit,
      windingRule: this._windingRule,
      startDecorationType: 0,
      contextSettings: {
        _class: 'graphicsContextSettings',
        blendMode: 0,
        opacity: this._opacity,
      },
    };
  }
}

export default Style;
