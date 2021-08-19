import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  testingForm = new FormGroup({
    username: new FormControl('me'),
    message: new FormControl(''),
    consent: new FormControl(false),
    superpowers: new FormControl(true),
    points: new FormControl(10),
    power: new FormControl(42),
    size: new FormControl('large')
  });

  onSubmit() {
    console.log(this.testingForm.value);
  }

}
