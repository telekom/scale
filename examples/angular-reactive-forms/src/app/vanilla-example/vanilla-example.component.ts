import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vanilla-example',
  templateUrl: './vanilla-example.component.html',
  styleUrls: ['./vanilla-example.component.css']
})
export class VanillaExampleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  signupForm = new FormGroup({
    username: new FormControl('admin'),
    password: new FormControl({ value: '', disabled: false }),
    consent: new FormControl(),
    spam: new FormControl()
  });

  onSubmit() {
    console.log(this.signupForm.value);
  }

}
