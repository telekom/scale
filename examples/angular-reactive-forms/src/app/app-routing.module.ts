import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VanillaExampleComponent } from './vanilla-example/vanilla-example.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { SimpleBindingComponent } from './simple-binding/simple-binding.component';
import { TestingComponent } from './testing/testing.component';

const routes: Routes = [
  { path: 'vanilla-example', component: VanillaExampleComponent },
  { path: 'simple-binding', component: SimpleBindingComponent },
  { path: 'testing', component: TestingComponent },
  { path: '', component: ReactiveFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }
