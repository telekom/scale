import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { defineCustomElements } from '@telekom/scale-components-neutral/loader';

if (environment.production) {
  enableProdMode();
}

defineCustomElements(window);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
