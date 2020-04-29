import {generateID, RESIZING_CONSTRAINTS, calculateResizingConstraintValue} from '../helpers/utils';

const DEFAULT_USER_INFO_SCOPE = 'html-sketchapp';

class Base {
  _class: any;
  _layers: any;
  _style: any;
  _objectID: any;
  _name: any;
  _userInfo: any;
  _resizingConstraint: any;
  _hasClippingMask: any;
  _isLocked: any;
  _points: any;
  _isClosed: any;

  constructor({id}: any = {}) {
    this._class = null;
    this._layers = [];
    this._style = null;
    this._objectID = id || generateID();
    this._name = '';
    this._userInfo = null;
    this.setResizingConstraint(RESIZING_CONSTRAINTS.NONE);
    this.setHasClippingMask(false);
    this.setIsLocked(false);
  }

  setFixedWidthAndHeight() {
    this.setResizingConstraint(RESIZING_CONSTRAINTS.WIDTH, RESIZING_CONSTRAINTS.HEIGHT);
  }

  setResizingConstraint(...constraints: any) {
    this._resizingConstraint = calculateResizingConstraintValue(...constraints);
  }

  getID() {
    return this._objectID;
  }

  setObjectID(id: any) {
    this._objectID = id;
  }

  // scope defines which Sketch plugin will have access to provided data via Settings.setLayerSettingForKey
  // you should set it to the plugin ID e.g. "com.bohemiancoding.sketch.testplugin"
  // by default however we use "html-sketchapp" here which won't work directly with any plugin
  // but can still be accessed via native API: layer.userInfo()['html-sketchapp']
  setUserInfo(key: any, value: any, scope = DEFAULT_USER_INFO_SCOPE) {
    this._userInfo = this._userInfo || {};
    this._userInfo[scope] = this._userInfo[scope] || {};
    this._userInfo[scope][key] = value;
  }

  getUserInfo(key: any, scope = DEFAULT_USER_INFO_SCOPE) {
    return this._userInfo && this._userInfo[scope] && this._userInfo[scope][key];
  }

  setName(name: any) {
    this._name = name;
  }

  addLayer(layer: any) {
    this._layers.push(layer);
  }

  setStyle(style: any) {
    this._style = style;
  }

  setHasClippingMask(hasClippingMask: any) {
    this._hasClippingMask = hasClippingMask;
  }

  setIsLocked(isLocked: any) {
    this._isLocked = isLocked;
  }

  toJSON() {
    if (!this._class) {
      throw new Error('Class not set.');
    }

    const result: any = {
      _class: this._class,
      do_objectID: this._objectID,
      exportOptions: {
        _class: 'exportOptions',
        exportFormats: [],
        includedLayerIds: [],
        layerOptions: 0,
        shouldTrim: false,
      },
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isLocked: this._isLocked,
      isVisible: true,
      isClosed: !!this._isClosed,
      layerListExpandedType: 0,
      name: this._name || this._class,
      nameIsFixed: false,
      resizingConstraint: this._resizingConstraint,
      resizingType: 0,
      rotation: 0,
      shouldBreakMaskChain: false,
      layers: this._layers.map((layer: any) => layer.toJSON()),
      clippingMaskMode: 0,
      hasClippingMask: this._hasClippingMask,
    };

    if (this._userInfo) {
      result.userInfo = this._userInfo;
    }

    if (this._style) {
      result.style = this._style.toJSON();
    }

    if (this._points) {
      result.points = this._points;
    }

    return result;
  }
}

export default Base;
