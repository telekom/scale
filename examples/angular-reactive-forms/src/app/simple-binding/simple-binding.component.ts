import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-binding',
  templateUrl: './simple-binding.component.html',
  styleUrls: ['./simple-binding.component.css']
})
export class SimpleBindingComponent implements OnInit {
  val: number = 42;

  constructor() { }

  ngOnInit(): void {
  }

  setValue(event: any) {
    this.val = event.target.value
  }

}
