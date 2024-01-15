import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TextValueAccessorDirective } from 'src/directives/text-value-accessor';
import { CheckedValueAccessorDirective } from 'src/directives/checked-value-accessor';
import { NumberValueAccessorDirective } from 'src/directives/number-value-accessor';
import { SelectValueAccessorDirective } from 'src/directives/select-value-accessor';
import { DateValueAccessorDirective } from 'src/directives/date-value-accessor';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { SimpleBindingComponent } from './simple-binding/simple-binding.component';
import { TestingComponent } from './testing/testing.component';
import { VanillaExampleComponent } from './vanilla-example/vanilla-example.component';

@NgModule({
  declarations: [
    AppComponent,
    TextValueAccessorDirective,
    SelectValueAccessorDirective,
    DateValueAccessorDirective,
    CheckedValueAccessorDirective,
    NumberValueAccessorDirective,
    ReactiveFormComponent,
    SimpleBindingComponent,
    TestingComponent,
    VanillaExampleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
