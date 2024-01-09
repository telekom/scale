import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  signupForm = new UntypedFormGroup({
    username: new UntypedFormControl('admin'),
    password: new UntypedFormControl({ value: '', disabled: false }),
    consent: new UntypedFormControl(),
    select: new UntypedFormControl('foo'),
    date: new UntypedFormControl(),
  });

  onSubmit() {
    console.log(this.signupForm.value);
  }
}
