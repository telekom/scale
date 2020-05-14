import { generateID } from '../helpers/utils';
import Group from './group';

class Ref {
  _obj: any;
  _hasClippingMask: boolean = false;
  parent: Group;

  constructor(obj: any, parent: Group, hasClippingMask: boolean = false) {
    this._obj = obj;
    this.parent = parent;
    this._hasClippingMask = hasClippingMask;
  }

  traverse(obj:any) {
    if (obj instanceof Array) {
      obj.forEach(v => this.traverse(v));
    } else if (typeof obj === 'object') {
      for (const k in obj) {
        if (k === 'do_objectID') {
          obj[k] = generateID();
        } else if (k === 'fills' || k === 'borders') {
          obj[k] = [];
        } else {
          this.traverse(obj[k]);
        }
      }
    }
  }

  toJSON() {
    const obj: any = this._obj.toJSON();
    this.traverse(obj);
    obj.hasClippingMask = this._hasClippingMask;
    obj.frame.x -= this.parent._x;
    obj.frame.y -= this.parent._y;
    return obj;
  }
}

export default Ref;
