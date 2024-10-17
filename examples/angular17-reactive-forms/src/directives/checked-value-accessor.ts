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

import { Directive, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseValueAccessorDirective } from './base-value-accessor';

@Directive({
  standalone: true,
  selector: 'scale-checkbox[formControlName],scale-switch[formControlName],[sclCheckedControl]',
  host: {
    '(scaleChange)': '_handleInput($event.target.checked)',
    '(blur)': 'onTouched()'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckedValueAccessorDirective,
      multi: true
    }
  ]
})
export class CheckedValueAccessorDirective extends BaseValueAccessorDirective {

  constructor(el: ElementRef) {
    super(el);
  }

  override writeValue(value: any) {
    this.el.nativeElement.checked = value;
  }

}
