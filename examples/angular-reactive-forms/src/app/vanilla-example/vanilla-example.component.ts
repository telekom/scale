import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-vanilla-example',
  templateUrl: './vanilla-example.component.html',
  styleUrls: ['./vanilla-example.component.css']
})
export class VanillaExampleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  signupForm = new UntypedFormGroup({
    username: new UntypedFormControl('admin'),
    password: new UntypedFormControl({ value: '', disabled: false }),
    consent: new UntypedFormControl(),
    spam: new UntypedFormControl()
  });

  onSubmit() {
    console.log(this.signupForm.value);
  }

}
