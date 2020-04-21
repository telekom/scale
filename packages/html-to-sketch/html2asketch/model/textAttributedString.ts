import { getFirstFont, makeColorFromCSS } from "../helpers/utils";

// Some websites or component libraries use font-family lists starting with OS-specific fonts.
// If the option 'skipSystemFonts' is enabled, we skip those fonts to choose a font
// Sketch is capable of.

class TextAttributedString {
	_text: any;
	_fontSize: any;
	_fontFamily: any;
	_color: any;

  constructor({
		text,
    color,
    fontSize,
    fontFamily,
    skipSystemFonts,
  }: any) {
    this._text = text;
    this._color = color;
    this._fontSize = fontSize;
    this._fontFamily = getFirstFont(fontFamily, skipSystemFonts);
  }

  toJSON() {
    const result: any = {
      _class: "attributedString",
			string: this._text,
			attributes: [
				{
					_class: "stringAttribute",
					location: 0,
					length: this._text.length,
					attributes: {
						MSAttributedStringFontAttribute: {
							_class: "fontDescriptor",
							attributes: {
								name: 'Helvetica',
								size: this._fontSize
							}
						},
						MSAttributedStringColorAttribute: makeColorFromCSS(this._color),
						kerning: 0,
						textStyleVerticalAlignmentKey: 0,
						paragraphStyle: {
							_class: "paragraphStyle",
							alignment: 0
						}
					}
				}
			]
    }

    return result;
  }
}

export default TextAttributedString;
