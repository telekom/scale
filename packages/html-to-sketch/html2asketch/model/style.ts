import {makeImageFill, makeColorFromCSS, makeColorFill} from '../helpers/utils';
import convertAngleToFromAndTo from '../helpers/convertAngleToFromAndTo';

class Style {
  _fills: any;
  _borders: any;
  _shadows: any;
  _innerShadows: any;
  _opacity: any;
  _borderOptions: any;

  constructor() {
    this._fills = [];
    this._borders = [];
    this._shadows = [];
    this._innerShadows = [];
    this._opacity = '1';
  }

  addColorFill(color: any) {
    this._fills.push(makeColorFill(color));
  }

  addGradientFill({angle, stops}: any) {
    const {from, to} = convertAngleToFromAndTo(angle);

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
          }
        }),
        to: `{${to.x}, ${to.y}}`,
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

  addBorder({color, thickness}: any) {
    this._borders.push({
      _class: 'border',
      isEnabled: true,
      color: makeColorFromCSS(color),
      fillType: 0,
      position: 1,
      thickness,
    });
  }

  addShadow({color = '#000', blur = 1, offsetX = 0, offsetY = 0, spread = 0}: any) {
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

  addInnerShadow({color = '#000', blur = 0, offsetX = 0, offsetY = 0, spread = 0}: any) {
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
      miterLimit: 10,
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
