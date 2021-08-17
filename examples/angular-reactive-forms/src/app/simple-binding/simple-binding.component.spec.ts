import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleBindingComponent } from './simple-binding.component';

describe('SimpleBindingComponent', () => {
  let component: SimpleBindingComponent;
  let fixture: ComponentFixture<SimpleBindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleBindingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
