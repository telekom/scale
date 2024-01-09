import { Directive, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseValueAccessorDirective } from './base-value-accessor';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'scale-date-picker[formControlName],[sclDateControl]',
  host: {
    '(scale-change)': '_handleDatePickerSelect($event.target)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateValueAccessorDirective,
      multi: true
    }
  ]
})
export class DateValueAccessorDirective extends BaseValueAccessorDirective {
  constructor(el: ElementRef) {
    super(el);
  }
}
