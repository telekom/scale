import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {  ReactiveFormsModule, FormGroup, FormControl, UntypedFormControl } from '@angular/forms';
import { CheckedValueAccessorDirective } from '../directives/checked-value-accessor';
import { DateValueAccessorDirective } from '../directives/date-value-accessor';
import { SelectValueAccessorDirective } from '../directives/select-value-accessor';
import { NumberValueAccessorDirective } from '../directives/number-value-accessor';
import { RadioValueAccessorDirective } from '../directives/radio-value-accessor';
import { TextValueAccessorDirective } from '../directives/text-value-accessor';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, CheckedValueAccessorDirective, DateValueAccessorDirective, SelectValueAccessorDirective,TextValueAccessorDirective, RadioValueAccessorDirective, NumberValueAccessorDirective ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Telekom Scale
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular17-reactive-forms';
  signupForm = new FormGroup({
    username: new UntypedFormControl('admin'),
    password: new UntypedFormControl({ value: '', disabled: false }),
    consent: new UntypedFormControl(),
    select: new UntypedFormControl('foo'),
    date: new UntypedFormControl(),
  });


  onSubmit() {
    console.log('submitting ->', this.signupForm.value, this.signupForm);
  }
}
