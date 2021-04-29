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

  traverse(obj: any) {
    if (obj instanceof Array) {
      obj.forEach((v) => this.traverse(v));
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
