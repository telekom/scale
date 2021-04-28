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

class TextAttributedString {
  _text: any;
  _fontSize: any;
  _fontFamily: any;
  _color: any;
  _textTransform: any;
  _alignment: 0 | 1 | 2 | 3;

  constructor({
    text,
    color,
    fontSize,
    fontFamily,
    skipSystemFonts,
    textTransform,
    alignment,
  }: {
    text: string;
    color: string;
    fontSize: number;
    fontFamily: string;
    skipSystemFonts: boolean;
    textTransform: string;
    alignment: 0 | 1 | 2 | 3;
  }) {
    this._text = text;
    this._color = color;
    this._fontSize = fontSize;
    this._fontFamily = getFirstFont(fontFamily, skipSystemFonts);
    this._alignment = alignment;
    this._textTransform = textTransform;
  }

  toJSON() {
    const result: any = {
      _class: 'attributedString',
      string: this._text,
      attributes: [
        {
          _class: 'stringAttribute',
          location: 0,
          length: this._text.length,
          attributes: {
            MSAttributedStringFontAttribute: {
              _class: 'fontDescriptor',
              attributes: {
                name: this._fontFamily,
                size: this._fontSize,
              },
            },
            MSAttributedStringTextTransformAttribute:
              this._textTransform === 'uppercase'
                ? 1
                : this._textTransform === 'lowercase'
                ? 2
                : 0,
            MSAttributedStringColorAttribute: makeColorFromCSS(this._color),
            kerning: 0,
            textStyleVerticalAlignmentKey: 0,
            paragraphStyle: {
              _class: 'paragraphStyle',
              alignment: this._alignment,
            },
          },
        },
      ],
    };

    return result;
  }
}

export default TextAttributedString;
