import Base from './base';

class Group extends Base {
  _x: any;
  _y: any;
  _width: any;
  _height: any;
  _isSymbol: boolean;
  _stableSymbolName?: string;

  constructor({x, y, width, height, id, isSymbol = false}: any) {
    super({id});
    this._class = 'group';
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._isSymbol = isSymbol;
  }

  setIsSymbol(isSymbol: boolean = false) {
    this._isSymbol = isSymbol
  }

  setStableSymbolName(name: string) {
    this._stableSymbolName = name;
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

    obj.hasClickThrough = false;
    obj.clippingMaskMode = 0;
    obj.hasClippingMask = false;
    obj.windingRule = 1;
    obj.isSymbol = this._isSymbol;
    obj.stableSymbolName = this._stableSymbolName;

    return obj;
  }
}

export default Group;
