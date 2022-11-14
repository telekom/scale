import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  testingForm = new UntypedFormGroup({
    username: new UntypedFormControl('me'),
    message: new UntypedFormControl(''),
    consent: new UntypedFormControl(false),
    superpowers: new UntypedFormControl(true),
    points: new UntypedFormControl(10),
    power: new UntypedFormControl(42),
    size: new UntypedFormControl('large')
  });

  onSubmit() {
    console.log(this.testingForm.value);
  }

}
