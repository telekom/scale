import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'angular17-reactive-forms' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular17-reactive-forms');
  });

  it('should render the Scale form', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('scale-text-field[formControlName="username"]')).toBeTruthy();
  });

  it('should update form values from native Scale events', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    for (const [name, eventName, detail, expected] of [
      ['username', 'scale-input', { value: 'native-user' }, 'native-user'],
      ['consent', 'scale-change', { checked: false }, false],
      ['select', 'scale-change', { value: 'bar' }, 'bar'],
      ['date', 'scale-change', { value: '2026-10-06' }, '2026-10-06'],
    ] as const) {
      const element = compiled.querySelector(`[formControlName="${name}"]`)!;
      element.dispatchEvent(new CustomEvent(eventName, { detail }));
      expect(fixture.componentInstance.signupForm.get(name)?.value).toEqual(expected);
    }
  });

  it('should mark controls as touched on scale-blur', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    for (const name of ['username', 'select', 'date']) {
      const control = fixture.componentInstance.signupForm.get(name)!;
      expect(control.touched).toBeFalse();
      compiled.querySelector(`[formControlName="${name}"]`)!
        .dispatchEvent(new CustomEvent('scale-blur'));
      expect(control.touched).toBeTrue();
    }
  });
});
