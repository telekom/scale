import { Directive, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from './value-accessor';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'scale-input[type=checkbox]',
  host: {
    '(scaleChange)': 'handleChangeEvent($event.target.checked)'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BooleanValueAccessor,
      multi: true
    }
  ],
  standalone: false
})
export class BooleanValueAccessor extends ValueAccessor {
  constructor(el: ElementRef) {
    super(el);
  }
  writeValue(value: any) {
    this.el.nativeElement.checked = this.lastValue = value == null ? false : value;
  }
}
