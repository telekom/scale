import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  signupForm = new FormGroup({
    username: new FormControl('admin'),
    password: new FormControl({ value: '', disabled: false }),
    consent: new FormControl()
  });

  onSubmit() {
    console.log(this.signupForm.value);
  }
}
