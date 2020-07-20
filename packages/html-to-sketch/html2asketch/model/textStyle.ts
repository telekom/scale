import { getFirstFont, makeColorFromCSS } from "../helpers/utils";

// Some websites or component libraries use font-family lists starting with OS-specific fonts.
// If the option 'skipSystemFonts' is enabled, we skip those fonts to choose a font
// Sketch is capable of.

class TextStyle {
  _color: any;
  _fontSize: any;
  _fontFamily: any;
  _fontWeight: string = '400';
  _textTransform: string = 'none';

  constructor({
    color,
    fontSize,
    fontFamily,
    skipSystemFonts,
    fontWeight,
    textTransform,
  }: any) {
    this._color = color;
    this._fontSize = fontSize;
    this._fontFamily = getFirstFont(fontFamily, skipSystemFonts);
    this._fontWeight = fontWeight || this._fontWeight;
    this._textTransform = textTransform || this._textTransform;
  }

  toJSON() {
    const result: any = {
      _class: "style",
      endMarkerType: 0,
      miterLimit: 10,
      startMarkerType: 0,
      windingRule: 1,
      blur: {
        _class: "blur",
        isEnabled: false,
        center: "{0.5, 0.5}",
        motionAngle: 0,
        radius: 10,
        saturation: 1,
        type: 0
      },
      borderOptions: {
        _class: "borderOptions",
        isEnabled: true,
        dashPattern: [],
        lineCapStyle: 0,
        lineJoinStyle: 0
      },
      borders: [],
      colorControls: {
        _class: "colorControls",
        isEnabled: false,
        brightness: 0,
        contrast: 1,
        hue: 0,
        saturation: 1
      },
      contextSettings: {
        _class: "graphicsContextSettings",
        blendMode: 0,
        opacity: 1
      },
      fills: [],
      innerShadows: [],
      shadows: [],
      textStyle: {
        _class: "textStyle",
        encodedAttributes: {
          MSAttributedStringColorAttribute: makeColorFromCSS(this._color),
          textStyleVerticalAlignmentKey: 0,
          MSAttributedStringTextTransformAttribute: (this._textTransform === 'uppercase' ? 1 : (this._textTransform === 'lowercase' ? 2 : 0)),
          MSAttributedStringFontAttribute: {
            _class: "fontDescriptor",
            attributes: {
              name: this._fontFamily,
              size: this._fontSize,
              weight: getFontWeight(this._fontWeight)
            }
          },
          paragraphStyle: {
            _class: "paragraphStyle",
            alignment: 0
          },
          kerning: 0
        },
        verticalAlignment: 0
      },
    }

    return result;
  }
}

function getFontWeight(s: string):number {
  if (s == 'normal') return 4;
  if (s == 'bold') return 7;
  if (/^\d\d\d$/.test(s)) return (parseInt(s) / 100);
  return 4;
}

export default TextStyle;
