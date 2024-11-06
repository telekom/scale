import { Directive, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseValueAccessorDirective } from './base-value-accessor';

@Directive({
  standalone: true,
  /* tslint:disable-next-line:directive-selector */
  selector: 'scale-dropdown-select[formControlName],[sclSelectControl]',
  host: {
    '(scale-change)': '_handleInput($event.target.value)'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectValueAccessorDirective,
      multi: true
    }
  ]
})
export class SelectValueAccessorDirective extends BaseValueAccessorDirective {
  constructor(el: ElementRef) {
    super(el);
  }
}
