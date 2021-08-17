import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanillaExampleComponent } from './vanilla-example.component';

describe('VanillaExampleComponent', () => {
  let component: VanillaExampleComponent;
  let fixture: ComponentFixture<VanillaExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VanillaExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VanillaExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
