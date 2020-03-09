const tinycolor = require("tinycolor2");

const enhancedStyle = (text, fontSize, fontFamily = "Arial-BoldMT", color) => ({
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
      MSAttributedStringColorAttribute: {
        _class: "color",
        ...color
      },
      textStyleVerticalAlignmentKey: 0,
      MSAttributedStringFontAttribute: {
        _class: "fontDescriptor",
        attributes: {
          name: fontFamily,
          size: fontSize
        }
      },
      paragraphStyle: {
        _class: "paragraphStyle",
        alignment: 0
      },
      kerning: 0
    },
    verticalAlignment: 0
  }
});

const enhancedAttributedString = (
  text,
  fontSize,
  fontFamily = "Arial-BoldMT",
  color
) => ({
  _class: "attributedString",
  string: text,
  attributes: [
    {
      _class: "stringAttribute",
      location: 0,
      length: text.length,
      attributes: {
        MSAttributedStringFontAttribute: {
          _class: "fontDescriptor",
          attributes: {
            name: fontFamily,
            size: fontSize
          }
        },
        MSAttributedStringColorAttribute: {
          _class: "color",
          ...color
        },
        kerning: 0,
        textStyleVerticalAlignmentKey: 0,
        paragraphStyle: {
          _class: "paragraphStyle",
          alignment: 0
        }
      }
    }
  ]
});

const enhancedTypoStyle = (
  text,
  fontSize,
  fontFamily = undefined,
  color = undefined
) => ({
  style: enhancedStyle(text, fontSize, fontFamily, color),
  attributedString: enhancedAttributedString(text, fontSize, fontFamily, color)
});

function enhanceText(json) {
	return {
		...json,
		...enhancedTypoStyle(
			json.text,
			json.style.fontSize,
			json.style.fontFamily,
			json.style.color
		)
	}
}

module.exports = {
	enhanceText
}
