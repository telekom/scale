import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ComponentLibraryModule } from '@telekom/scale-components-angular-neutral';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ComponentLibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
