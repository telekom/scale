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

import { getFirstFont, makeColorFromCSS } from '../helpers/utils';

// Some websites or component libraries use font-family lists starting with OS-specific fonts.
// If the option 'skipSystemFonts' is enabled, we skip those fonts to choose a font
// Sketch is capable of.

class TextStyle {
  _color: any;
  _fontSize: any;
  _fontFamily: any;
  _fontWeight: string = '400';
  _fontStyle: string = '';
  _textTransform: string = 'none';

  constructor({
    color,
    fontSize,
    fontFamily,
    skipSystemFonts,
    fontWeight,
    fontStyle,
    textTransform,
  }: any) {
    this._color = color;
    this._fontSize = fontSize;
    this._fontFamily = getFirstFont(fontFamily, skipSystemFonts);
    this._fontWeight = fontWeight || this._fontWeight;
    this._fontStyle = fontStyle || this._fontStyle;
    this._textTransform = textTransform || this._textTransform;
  }

  toJSON() {
    const result: any = {
      _class: 'style',
      endMarkerType: 0,
      miterLimit: 10,
      startMarkerType: 0,
      windingRule: 1,
      blur: {
        _class: 'blur',
        isEnabled: false,
        center: '{0.5, 0.5}',
        motionAngle: 0,
        radius: 10,
        saturation: 1,
        type: 0,
      },
      borderOptions: {
        _class: 'borderOptions',
        isEnabled: true,
        dashPattern: [],
        lineCapStyle: 0,
        lineJoinStyle: 0,
      },
      borders: [],
      colorControls: {
        _class: 'colorControls',
        isEnabled: false,
        brightness: 0,
        contrast: 1,
        hue: 0,
        saturation: 1,
      },
      contextSettings: {
        _class: 'graphicsContextSettings',
        blendMode: 0,
        opacity: 1,
      },
      fills: [],
      innerShadows: [],
      shadows: [],
      textStyle: {
        _class: 'textStyle',
        encodedAttributes: {
          MSAttributedStringColorAttribute: makeColorFromCSS(this._color),
          textStyleVerticalAlignmentKey: 0,
          MSAttributedStringTextTransformAttribute:
            this._textTransform === 'uppercase'
              ? 1
              : this._textTransform === 'lowercase'
              ? 2
              : 0,
          MSAttributedStringFontAttribute: {
            _class: 'fontDescriptor',
            attributes: {
              name: this.getFontFamily(),
              size: this._fontSize,
            },
          },
          paragraphStyle: {
            _class: 'paragraphStyle',
            alignment: 0,
          },
          kerning: 0,
        },
        verticalAlignment: 0,
      },
    };

    if (this.getFontFamily() === 'TeleNeoWeb-Regular-Bold') {
      console.log('WHAT NO ' + document.location.toString());
    }

    return result;
  }

  getFontFamily(): string {
    return (
      this._fontFamily +
      getFontWeight(this._fontFamily, this._fontWeight, this._fontStyle)
    );
  }
}

/**
 * Gets the font weight for a weight string and a style string.
 *
 * The Sketch fontWeight property seems to do nothing, so we use font variant names here.
 * These are for the TeleNeoWeb font, other fonts will require changes.
 *
 * TODO Make this configurable in config.js
 */
function getFontWeight(
  fontFamily: string,
  fontWeight: string,
  fontStyle: string
): string {
  if (/\-/.test(fontFamily)) return '';
  fontWeight = fontWeight.trim().toLowerCase();
  if (/\d+/.test(fontWeight)) {
    const weight = Math.round(parseInt(fontWeight) / 100) * 100;
    if (weight === 900 && fontStyle === 'italic') {
      return '-ExtraBoldItalic';
    }
    if (weight === 900) {
      return '-ExtraBold';
    }
    if (weight === 700 && fontStyle === 'italic') {
      return '-BoldItalic';
    }
    if (weight === 700) {
      return '-Bold';
    }
    if (weight === 800 && fontStyle === 'italic') {
      return '-BoldItalic';
    }
    if (weight === 800) {
      return '-Bold';
    }
    if (weight === 600 && fontStyle === 'italic') {
      return '-MediumItalic';
    }
    if (weight === 600) {
      return '-Medium';
    }
    if (weight === 500 && fontStyle === 'italic') {
      return '-MediumItalic';
    }
    if (weight === 500) {
      return '-Medium';
    }
    if (weight === 400 && fontStyle === 'italic') {
      return '-RegularItalic';
    }
    if (weight === 400) {
      return '-Medium';
    }
    if (weight <= 300 && fontStyle === 'italic') {
      return '-ThinItalic';
    }
    if (weight <= 300) {
      return '-Thin';
    }
  }
  if (fontWeight === 'bold') return '-Bold';
  return '-Regular';
}

export default TextStyle;
