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
import { ControlValueAccessor } from '@angular/forms';

@Directive()
export class BaseValueAccessorDirective implements ControlValueAccessor {
  onChange = (_: any) => {};
  
  onTouched = () => {};

  constructor(protected el: ElementRef) {}

  writeValue(value: any) {
    this.el.nativeElement.value = value;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }

  _handleInput(value: any): void {
    this.onChange(value);
  }

  _handleDatePickerSelect(target: any): void {
    const value = target.querySelector('duet-date-picker').value;
    this.onChange(value);
  }
}
