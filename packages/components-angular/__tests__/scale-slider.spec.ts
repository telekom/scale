import { async, ComponentFixture } from '@angular/core/testing';

import { Component, DebugElement } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ConfigureFn, configureTests } from '../src/config.testing';
import { ComponentLibraryModule } from '../src/index';

@Component({
  template: `<scale-slider
    [(ngModel)]="testNumber"
    (scaleChange)="onInput($event.target.value)"
  ></scale-slider>`,
})
class TestNumberValueAccessorComponent {
  testNumber: number = 0;

  onInput() {}
}

describe('ScaleSlider - Number Value', () => {
  let myInputEl: DebugElement;
  let fixture: ComponentFixture<TestNumberValueAccessorComponent>;

  beforeEach(async(() => {
    const configure: ConfigureFn = (testBed) => {
      testBed.configureTestingModule({
        imports: [FormsModule, ComponentLibraryModule],
        declarations: [TestNumberValueAccessorComponent],
      });
    };

    configureTests(configure).then((testBed) => {
      fixture = testBed.createComponent(TestNumberValueAccessorComponent);
      fixture.detectChanges();
      myInputEl = fixture.debugElement.query(By.css('scale-slider'));
    });
  }));

  it('on scaleChange the bound component attribute should update', () => {
    const { componentInstance: myAngularComponent } = fixture;
    myInputEl.nativeElement.value = 50;
    myInputEl.nativeElement.dispatchEvent(
      new CustomEvent('scale-change', { detail: { value: 50 } })
    );
    expect(myAngularComponent.testNumber).toEqual(50);
  });

  it('scale-change event should call local method', () => {
    const { componentInstance: myAngularComponent } = fixture;
    const fakeOnInput = jest.fn();
    myAngularComponent.onInput = fakeOnInput;
    myInputEl.triggerEventHandler('scale-change', {
      target: { value: 'fired' },
    });

    expect(fakeOnInput).toHaveBeenCalledTimes(1);
    expect(fakeOnInput).toHaveBeenCalledWith('fired');
  });
});

@Component({
  template: `<form [formGroup]="form">
    <scale-slider type="text" formControlName="test"></scale-slider>
  </form>`,
})
class TestDisabledValueAccessorComponent {
  form = this.formBuilder.group({
    // disabled state will be managed for us by angular
    // and now we can later call `this.form.controls.test.enable()`
    test: this.formBuilder.control({ value: 'test', disabled: true }),
  });

  constructor(private formBuilder: FormBuilder) {}
}

describe('ScaleSlider - Disabled state', () => {
  let myInputEl: DebugElement;
  let fixture: ComponentFixture<TestDisabledValueAccessorComponent>;

  beforeEach(async(() => {
    const configure: ConfigureFn = (testBed) => {
      testBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule, ComponentLibraryModule],
        declarations: [TestDisabledValueAccessorComponent],
      });
    };

    configureTests(configure).then((testBed) => {
      fixture = testBed.createComponent(TestDisabledValueAccessorComponent);
      fixture.detectChanges();
      myInputEl = fixture.debugElement.query(By.css('scale-slider'));
    });
  }));

  it('should support setting disabled state via the ValueAccessor', () => {
    expect(myInputEl.nativeElement.disabled).toBe(true);
  });
});
